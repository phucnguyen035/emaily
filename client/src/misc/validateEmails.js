const isEmail = new RegExp(
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default (emails) => {
  const emailArray = emails.split(',').map(email => email.trim());

  const invalidEmails = emailArray.filter(email => isEmail.test(email) === false);

  if (!invalidEmails.length) {
    const duplicatedEmails = emailArray.filter((email, index) => email === emailArray[index - 1]);

    if (!duplicatedEmails.length) {
      return null;
    }

    return `This email is duplicated: ${duplicatedEmails[0]}`;
  }

  return `This emails is invalid: ${invalidEmails}`;
};
