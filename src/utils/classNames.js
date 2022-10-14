const classNames = (...className) => {
  if (className.length) return className.join(' ');
  return '';
};

export default classNames;