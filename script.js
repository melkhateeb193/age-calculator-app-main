"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Selectors
  const dayInput = document.getElementById('DayInput');
  const monthInput = document.getElementById('monthInput');
  const yearInput = document.getElementById('YearInput');
  const spanDay = document.getElementById('DigitalLockDay');
  const spanMonth = document.getElementById('DigitalLockMonth');
  const spanYear = document.getElementById('DigitalLockYear');
  const button = document.getElementById('Button');
  const labels = document.querySelectorAll('label');
  const errorDay = document.getElementById('PForFieldDay');
  const errorMonth = document.getElementById('PForFieldMonth');
  const errorYear = document.getElementById('PForFieldYear');
  const inputs = [dayInput, monthInput, yearInput];
  const errMessages = [errorDay, errorMonth, errorYear];

  // Functions & Events
  button.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();
  });

  function validateInputs() {
    const valueRequired = "This field is required";
    const validDayTxt = "Must be a valid day";
    const validMonthTxt = "Must be a valid month";
    const validYearTxt = "Must be in the past";

    function showError(element, message) {
      element.style.opacity = 1;
      element.innerHTML = message;
      element.classList.remove('d-none');
      labels.forEach((label) => (label.style.color = "hsl(0, 100%, 67%)"));
      inputs.forEach(
        (input) => (input.style.borderColor = "hsl(0, 100%, 67%)")
      );
    }

    function resetErrors() {
      errMessages.forEach((err) => {
        if (err) {  // Check if the element exists
          err.style.opacity = 0;
          err.innerHTML = "";
        }
      });
      labels.forEach((label) => (label.style.color = ""));
      inputs.forEach((input) => (input.style.borderColor = ""));
    }

    const day = parseInt(dayInput.value.trim());
    const month = parseInt(monthInput.value.trim());
    const year = parseInt(yearInput.value.trim());

    resetErrors();

    if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
      if (!day) showError(errorDay, valueRequired);
      if (!month) showError(errorMonth, valueRequired);
      if (!year) showError(errorYear, valueRequired);

      return;
    }

    if (!(1 <= day && day <= 31)) {
      showError(errorDay, validDayTxt);
    } else if (!(1 <= month && month <= 12)) {
      showError(errorMonth, validMonthTxt);
    } else if (!(1900 <= year && year <= new Date().getFullYear())) {
      showError(errorYear, validYearTxt);
    } else {
      resetErrors();

      const currentDate = new Date();
      const birthDate = new Date(year, month - 1, day);
      const timeDifference = currentDate - birthDate;
      const seconds = timeDifference / 1000;
      let days = Math.floor(
        (seconds % (30.44 * 24 * 60 * 60)) / (24 * 60 * 60)
      );
      let months = Math.floor(
        (seconds % (365.25 * 24 * 60 * 60)) / (30.44 * 24 * 60 * 60)
      );
      let years = Math.floor(seconds / (365.25 * 24 * 60 * 60));

      if (months === 0) {
        months++;
      }

      spanYear.textContent = years;
      spanMonth.textContent = months;
      spanDay.textContent = days + 1;
    }
  }
});
