const validateLink = (link) => {
  if (!link) return false;
  const res = link.match(
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
  );
  if (res == null) return false;
  else return true;
};

export { validateLink };
