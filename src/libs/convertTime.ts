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
export function convertTime(time: string) {
  const timeStamp = new Date(time);
  const day = timeStamp.getDate();
  const month = timeStamp.getMonth() + 1;
  return { day: day, month: months[month - 1] };
}

export function convertTimeWithHM(time: string) {
  const timeStamp = new Date(time);
  const day = addLeadingZero(timeStamp.getDate());
  const month = timeStamp.getMonth() + 1;
  const hours = addLeadingZero(timeStamp.getHours());
  const minutes = addLeadingZero(timeStamp.getMinutes());
  return { day: day, month: months[month - 1], hours: hours, minutes: minutes };
}

function addLeadingZero(value: number) {
  return value < 10 ? `0${value}` : `${value}`;
}
