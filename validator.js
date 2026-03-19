const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStudent(data) {
  const { name, email, course, year } = data;
  if (!name || !email || !course || year === undefined)
    return 'All fields (name, email, course, year) are required';
  if (!emailRegex.test(email))
    return 'Invalid email format';
  const y = Number(year);
  if (!Number.isInteger(y) || y < 1 || y > 4)
    return 'Year must be an integer between 1 and 4';
  return null;
}

module.exports = { validateStudent };
