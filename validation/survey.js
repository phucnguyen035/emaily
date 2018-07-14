module.exports = data => {
  const errors = {};
  const { title, subject } = data;

  // Title validation
  if (!title) {
    errors.title = 'Title is required';
  } else if (title.length < 10) {
    errors.title = 'Title too short (at least 10 characters)';
  } else if (title.length > 255) {
    errors.title = 'Title too long (at most 255 characters)';
  }

  // Subject validation
  if (!subject) {
    errors.subject = 'Subject is required';
  } else if (subject.length < 10) {
    errors.subject = 'Subject too short (at least 10 characters)';
  }

  return errors;
};
