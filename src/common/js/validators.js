export const required = (value) => {
 return value ? undefined : "Field is required!";
};

export const maxLengthCreator = (maxLength) => (value) => {
  if (value) {
    return value.length > maxLength ? `Max length is ${maxLength} symbols!` : undefined;
  }
};