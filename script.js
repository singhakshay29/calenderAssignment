const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");
const selectedDatesContainer = document.querySelector(".selected-dates");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();
let selectedDates = [];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const calendar = () => {
  const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let liTag = "";

  for (let i = 1; i <= lastDateofMonth; i++) {
    const isToday =
      i === date.getDate() &&
      currMonth === date.getMonth() &&
      currYear === date.getFullYear()
        ? "active"
        : "";
    const isSelected = selectedDates.includes(
      `${currYear}-${currMonth + 1}-${i}`
    )
      ? "selected"
      : "";
    liTag += `<li class="${isToday} ${isSelected}" data-date="${currYear}-${
      currMonth + 1
    }-${i}">${i}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  daysTag.querySelectorAll("li").forEach((day) => {
    day.addEventListener("click", toggleDateSelection);
  });
};

const toggleDateSelection = (event) => {
  const selectedDate = event.currentTarget.dataset.date;
  if (selectedDates.includes(selectedDate)) {
    selectedDates = selectedDates.filter((date) => date !== selectedDate);
  } else {
    selectedDates.push(selectedDate);
  }

  calendar();
  renderSelectedDates();
};

const renderSelectedDates = () => {
  selectedDatesContainer.innerText = selectedDates.join(", ");
};

const updateDate = (change) => {
  currMonth += change;
  if (currMonth < 0 || currMonth > 11) {
    date = new Date(currYear, currMonth, date.getDate());
    currYear = date.getFullYear();
    currMonth = date.getMonth();
  } else {
    date = new Date();
  }
  calendar();
};

calendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    updateDate(icon.id === "prev" ? -1 : 1);
  });
});
