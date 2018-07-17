module.exports = data => {
  const errors = {};
  const { title, subject } = data;

  // Title validation
  if (!title) {
    errors.title = 'Title is required';
  }

  // Subject validation
  if (!subject) {
    errors.subject = 'Subject is required';
  }

  return errors;
};
