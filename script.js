const dayInput = document.getElementById('DayInput');
const monthInput = document.getElementById('monthInput');
const yearInput = document.getElementById('YearInput');
const spanDay = document.getElementById('DigitalLockDay');
const spanMonth = document.getElementById('DigitalLockMonth');
const spanYear = document.getElementById('DigitalLockYear');
const button = document.getElementById('Button');
const labels = document.querySelectorAll('label');
const pFieldElements = document.querySelectorAll('.pForField');
const pValidDay = document.getElementById('PvalidDay');
const pValidMonth = document.getElementById('PvalidMonth');
const pValidYear = document.getElementById('PvalidYear');

const currentDate = new Date();

console.log(currentDate.getMonth() + 1);

button.addEventListener('click', () => {
  const dayInputValue = parseInt(dayInput.value);
  const monthInputValue = parseInt(monthInput.value);
  const yearInputValue = parseInt(yearInput.value);

  if (isNaN(dayInputValue) || isNaN(monthInputValue) || isNaN(yearInputValue)) {
    showErrorStyles();
  } else {
    calculateDate(dayInputValue, monthInputValue, yearInputValue);
  }

  checkAndShowErrorMessage(dayInputValue > 31, pValidDay);
  checkAndShowErrorMessage(monthInputValue > 12, pValidMonth);
  checkAndShowErrorMessage(yearInputValue > currentDate.getFullYear(), pValidYear);

  setTimeout(() => {
    resetStyles();
  }, 1000);
});

function resetStyles() {
  dayInput.style.borderColor = '';
  monthInput.style.borderColor = '';
  yearInput.style.borderColor = '';
  labels.forEach(label => (label.style.color = ''));
  pFieldElements.forEach(pField => pField.classList.replace('d-block', 'd-none'));
}

function showErrorStyles() {
  dayInput.style.borderColor = 'red';
  monthInput.style.borderColor = 'red';
  yearInput.style.borderColor = 'red';
  labels.forEach(label => (label.style.color = 'red'));
  pFieldElements.forEach(pField => pField.classList.replace('d-none', 'd-block'));
}

function checkAndShowErrorMessage(condition, element) {
  if (condition) {
    element.classList.replace('d-none', 'd-block');
  }
}

function calculateDate(dayInputValue, monthInputValue, yearInputValue) {
  const birthDate = new Date(yearInputValue, monthInputValue - 1, dayInputValue);
  const ageDate = new Date(currentDate - birthDate);

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  const days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years == 1;
  }

  spanDay.innerHTML = days;
  spanMonth.innerHTML = months;
  spanYear.innerHTML = years;
}
