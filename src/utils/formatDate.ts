export const formatDate = (date: Date | null) => {
  if (!date) {
    date = new Date();
  }
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  return formattedDate;
};
