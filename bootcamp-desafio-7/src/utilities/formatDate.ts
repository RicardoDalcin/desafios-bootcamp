const formatDate = (originalDate: Date): string => {
  if (!originalDate) {
    return '0';
  }

  const dateOnly = originalDate.toString().split('T')[0];

  const dateArray = dateOnly.split('-');

  const dateString = dateArray.reverse().join('/');

  return dateString;
};

export default formatDate;
