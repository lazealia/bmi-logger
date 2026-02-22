export function toMetric({ weight, height }, unit) {
  if (unit === 'metric') return { kg: weight, m: height / 100 };
  const kg = weight * 0.45359237;
  const m = (height * 2.54) / 100;
  return { kg, m };
}

export function calcBMI(kg, m) {
  if (!(kg > 0) || !(m > 0)) return NaN;
  return kg / (m * m);
}

export function category(bmi) {
  if (isNaN(bmi)) return '-';
  if (bmi < 18.5) return 'ต่ำกว่าเกณฑ์';
  if (bmi < 25) return 'ปกติ';
  if (bmi < 30) return 'น้ำหนักเกิน';
  return 'โรคอ้วน';
}

export function round(n, d = 2) {
  const x = Math.pow(10, d);
  return Math.round(n * x) / x;
}
