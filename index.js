const currentDate = document.querySelector('.month-year'),
daysTag = document.querySelector('.week-dates'),
prevNextIcons = document.querySelectorAll('.header span');

// Getting new date, current year and month

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const renderCalendar = () => {
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // Getting last date of current month.
  let FirstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // Getting first day of current month.
  let LastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(); // Getting last day of current month
  let lastDateLastMonth = new Date(currYear, currMonth, 0).getDate();   // Getting last date of last month
  let liTags = "";

  // Adding last days of last month
  for (let i = FirstDayOfMonth; i > 0; i--) {
    liTags += `<li class="inactive">${lastDateLastMonth - i + 1}</li>`;
  }
  // Adding days of current month
  for (let i = 1; i <= lastDateOfMonth; i++) {
    let isToday = i === date.getDate()  && currMonth === date.getMonth() && currYear === date.getFullYear() ? 'isToday' : ''
    
    liTags += `<li class="active ${isToday}">${i}</li>`;
  }
  // Adding first days of next month
  for (let i = LastDayOfMonth; i < 6; i++) {
      liTags += `<li class="inactive">${i - LastDayOfMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTags;
}
renderCalendar();

prevNextIcons.forEach( icon => {
    icon.addEventListener('click', () => {
        currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    })
})