const formatCurrency = (originalValue: number): string => {
  if (!originalValue) {
    return '0';
  }

  let decimalValue = '';

  const newValue = originalValue.toString().split('.');
  let intValue = newValue[0];
  if (newValue.length > 1) {
    const decValue = newValue[1].split('');
    intValue = intValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (decValue.length === 1) {
      decValue.push('0');
    }
    decimalValue = decValue.join('');
  } else {
    decimalValue = '00';
  }
  return `${intValue},${decimalValue}`;
};

export default formatCurrency;
