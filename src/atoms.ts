import { atom } from 'recoil';

export const totalAmount = atom({
  key: 'totalAmount',
  default: '0',
});

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const getNextMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  return [year, month];
};

export const todayValue = atom({
  key: 'todayValue',
  default: getNextMonth(),
});

export const goalByValue = atom({
  key: 'goalByValue',
  default: getNextMonth(),
});

export const monthSizeValue = atom({
  key: 'monthSizeValue',
  default: 1,
});

export const getMonths = atom({
  key: 'getMonths',
  default: months,
});
