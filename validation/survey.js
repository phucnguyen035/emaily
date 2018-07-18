module.exports = data => {
  const errors = {};
  const { title, subject, body, recipients } = data;
  const isEmail = new RegExp(
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  // Title validation
  if (!title) {
    errors.title = 'Title is required';
  }

  // Subject validation
  if (!subject) {
    errors.subject = 'Subject is required';
  }

  if (!body) {
    errors.body = 'Body is required';
  }

  const validateEmail = recipients => {
    const emailArray = recipients.split(',').map(email => email.trim());

    const invalidEmails = emailArray.filter(
      email => email && isEmail.test(email) === false
    );

    if (!invalidEmails.length) {
      // Look for duplicated emails and return a unique set of duplicated emails
      const duplicatedEmails = emailArray.filter(
        (email, index) => email === emailArray[index - 1]
      );
      const duplicatedEmailPointer = [...new Set(duplicatedEmails)];

      if (!duplicatedEmails.length) {
        return null;
      }

      if (duplicatedEmailPointer.length === 1) {
        return (errors.recipients = `This email is duplicated: ${duplicatedEmailPointer}`);
      }

      return (errors.recipients = `These emails are duplicated: ${duplicatedEmailPointer.join(
        ', '
      )}`);
    }

    if (invalidEmails.length === 1) {
      return (errors.recipients = `This email is invalid: ${invalidEmails}`);
    }

    return (errors.recipients = `These emails are invalid: ${invalidEmails.join(
      ', '
    )}`);
  };

  validateEmail(recipients);

  return errors;
};
