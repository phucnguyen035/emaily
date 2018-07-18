const isEmail = new RegExp(
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default (emails) => {
  const emailArray = emails.split(',').map(email => email.trim());

  const invalidEmails = emailArray.filter(email => email && isEmail.test(email) === false);

  if (!invalidEmails.length) {
    // Look for duplicated emails and return a unique set of duplicated emails
    const duplicatedEmails = emailArray.filter((email, index) => email === emailArray[index - 1]);
    const duplicatedEmailPointer = [...new Set(duplicatedEmails)];

    if (!duplicatedEmails.length) {
      return null;
    }

    if (duplicatedEmailPointer.length === 1) {
      return `This email is duplicated: ${duplicatedEmailPointer}`;
    }

    return `These emails are duplicated: ${duplicatedEmailPointer.join(', ')}`;
  }

  if (invalidEmails.length === 1) {
    return `This email is invalid: ${invalidEmails}`;
  }

  return `These emails are invalid: ${invalidEmails.join(', ')}`;
};
