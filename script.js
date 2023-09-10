document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("calculate-total");
  const resetButton = document.getElementById("reset-form");
  const totalCostDiv = document.getElementById("total-cost");
  const roomCostSpan = document.getElementById("room-cost");
  const amenitiesCostSpan = document.getElementById("amenities-cost");
  const extraPersonCostSpan = document.getElementById("extra-person-cost");
  const additionalCostSpan = document.getElementById("additional-cost");
  const balanceSpan = document.getElementById("balance");
  const calculatedTotal = document.getElementById("calculated-total");
  const amenitiesAC = document.getElementById("amenities-ac");
  const amenitiesLocker = document.getElementById("amenities-locker");
  const advanceAmountInput = document.getElementById("advance-amount");
  const totalPersonsInput = document.getElementById("total-persons");
  const perDayCostForExtraPerson = 1000;

  calculateButton.addEventListener("click", function () {
    const totalDays = parseInt(document.getElementById("total-days").value);
    const roomType = document.getElementById("room-type").value;
    const totalPersons = parseInt(totalPersonsInput.value);

    let roomCost = 0;
    if (roomType === "Delux") {
      roomCost = 2500;
    } else if (roomType === "Suite") {
      roomCost = 4000;
    }

    const amenitiesCost = (amenitiesAC.checked ? 1000 : 0) + (amenitiesLocker.checked ? 300 : 0);
    const additionalCost = amenitiesCost * totalDays;
    let totalCost = roomCost * totalDays + additionalCost;

    let extraPersonCost = 0;
    if (totalPersons > 2) {
      const extraPersons = totalPersons - 2;
      extraPersonCost = extraPersons * perDayCostForExtraPerson * totalDays;
      totalCost += extraPersonCost;
    }

    totalCostDiv.classList.remove("hidden");
    roomCostSpan.textContent = (roomCost * totalDays).toFixed(2);
    amenitiesCostSpan.textContent = (amenitiesCost * totalDays).toFixed(2);
    extraPersonCostSpan.textContent = extraPersonCost.toFixed(2);
    additionalCostSpan.textContent = additionalCost.toFixed(2);
    calculatedTotal.textContent = totalCost.toFixed(2);

    calculateBalance();
  });

  
    resetButton.addEventListener("click", function () {
      document.getElementById("booking-form").reset();
      totalCostDiv.classList.add("hidden");
      balanceSpan.textContent = "";
    });
  
    function calculateBalance() {
      const totalCost = parseFloat(calculatedTotal.textContent);
      const advanceAmount = parseFloat(advanceAmountInput.value);
      const balance = totalCost - advanceAmount;
      balanceSpan.textContent = balance.toFixed(2);
    }
    
    advanceAmountInput.addEventListener("input", calculateBalance);
  });
  

  