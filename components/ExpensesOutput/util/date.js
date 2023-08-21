export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function getFormattedDate2(date) {
  var originalDate = new Date(date);

  var formattedDate = originalDate?.toISOString().split("T")[0];

  return formattedDate;
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
