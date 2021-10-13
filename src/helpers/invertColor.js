export function invertColor(hex) {
  let result = hex;

  if (result.indexOf('#') === 0) {
    result = result.slice(1);
  }

  if (result.length === 3) {
    result =
      result[0] + result[0] + result[1] + result[1] + result[2] + result[2];
  }

  if (result.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  const r = parseInt(result.slice(0, 2), 16),
    g = parseInt(result.slice(2, 4), 16),
    b = parseInt(result.slice(4, 6), 16);

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
}
