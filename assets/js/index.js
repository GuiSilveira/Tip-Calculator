"use strict";

// HTML Elements
const bill = document.querySelector(".section__input--dolar");
const numPeople = document.querySelector(".section__input--person");
const tipButtons = document.querySelectorAll(".tip__buttons");
const customPercent = document.querySelector(".tip__input");
const reset = document.querySelector(".result__reset");
const tipResult = document.querySelector(".tip-amount");
const total = document.querySelector(".total");

// Variables
let selectedPercentage;

// Functions

const removeActiveBtn = function (elementClass) {
  const activeButton = document.querySelector(elementClass);
  if (activeButton) {
    activeButton.classList.remove("tip__buttons--active");
  }
};

const getTotal = function (bill, numPeople, tipPercentage) {
  const tipAmount = (bill / numPeople) * tipPercentage;
  const totalByPerson = bill / numPeople + tipAmount;

  if (!Number.isNaN(tipAmount) && Number.isFinite(tipAmount)) {
  }
  if (
    !Number.isNaN(totalByPerson) &&
    Number.isFinite(totalByPerson) &&
    !Number.isNaN(tipAmount) &&
    Number.isFinite(tipAmount)
  ) {
    tipResult.textContent = `$${tipAmount.toFixed(2)}`;
    total.textContent = `$${totalByPerson.toFixed(2)}`;
  } else {
    tipResult.textContent = "$0.00";
    total.textContent = "$0.00";
  }
};

// Event Handlers

tipButtons.forEach((element, _, array) => {
  element.addEventListener("click", () => {
    element.classList.add("tip__buttons--active");
    array.forEach((el, index) => {
      index !== _ ? el.classList.remove("tip__buttons--active") : el;
    });
    selectedPercentage = Number(element.textContent.replace("%", "")) / 100;

    getTotal(bill.value, numPeople.value, selectedPercentage);
  });
});

bill.addEventListener("input", () => {
  getTotal(bill.value, numPeople.value, selectedPercentage);
});

numPeople.addEventListener("input", () => {
  getTotal(bill.value, numPeople.value, selectedPercentage);
});

customPercent.addEventListener("input", () => {
  removeActiveBtn(".tip__buttons--active");

  selectedPercentage = Number(customPercent.value) / 100;

  getTotal(bill.value, numPeople.value, selectedPercentage);
});

reset.addEventListener("click", () => {
  bill.value = "0";
  numPeople.value = "0";
  removeActiveBtn(".tip__buttons--active");
  customPercent.value = "";
  tipResult.textContent = "$0.00";
  total.textContent = "$0.00";
});
