import dayjs, { Dayjs } from "dayjs";

export const formatDate = (date: Date | null) => {
  if (!date) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    date = currentDate;
  }
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  return formattedDate;
};

export const getDate = (date: string | string[] | undefined) => {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (typeof date === "string" && dateFormatRegex.test(date)) {
    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  } else {
    return new Date();
  }
};

export const formatDayjsDate = (date: Dayjs | null) => {
  if (!date) {
    return dayjs().format("YYYY-MM-DD");
  }
  return date.format("YYYY-MM-DD");
};

export const getDayjs = (date: string) => {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormatRegex.test(date)) {
    return dayjs();
  } else {
    return dayjs(date, { format: "YYYY-MM-DD" });
  }
};
