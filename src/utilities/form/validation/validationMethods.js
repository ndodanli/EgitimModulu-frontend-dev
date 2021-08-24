export const emptyValidation = ({ value, label }) => {
  const error = { message: "", error: false };
  if (!value || value.length <= 0) {
    error.message = `${label} giriniz`;
    error.error = true;
    return error;
  } else {
    return error;
  }
};

export const passwordValidation = ({
  value,
  label,
  name,
  otherInputs,
  setCheckOthers,
}) => {
  const dontCheckInput = "password";
  const error = { message: "", error: false };
  if (setCheckOthers) {
    setCheckOthers((prevState) => {
      return {
        checkState: !prevState.checkState,
        dontCheck: [dontCheckInput],
      };
    });
  }
  if (
    name !== dontCheckInput &&
    otherInputs !== undefined &&
    (value !== otherInputs.passwordRepeat || value !== otherInputs.password) &&
    value.length > 0
  ) {
    error.message = `${label} parola ile eşleşmiyor `;
    error.error = true;
    return error;
  } else {
    return error;
  }
};
export const emailValidation = ({ value, label }) => {
  const error = { message: "", error: false };
  if (!value) return error;
  //girdide bulunması ve bulunmaması gereken karakterler ve uzunluk regular expression ile belirlenmiştir
  const validRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!validRegex.test(value) && value.length > 0) {
    error.message = `Geçerli bir ${label} giriniz`;
    error.error = true;
    return error;
  } else {
    return error;
  }
};
export const minLengthValidation = (minLength, actual = null) =>
  function minLengthVal({ value, label }) {
    const error = { message: "", error: false };
    if (!value) return error;
    if (value.length < minLength) {
      error.message = `${label} uzunluğu en az ${
        actual ? actual : minLength
      } karakterden oluşmalıdır`;
      error.error = true;
      return error;
    } else {
      return error;
    }
  };
export const strongPasswordValidation = ({ value }) => {
  const error = { message: "", error: false };
  if (!value) return error;
  //girdide bulunması ve bulunmaması gereken karakterler ve uzunluk regular expression ile belirlenmiştir
  const validRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,}).{8,}$/g;
  if (!validRegex.test(value) && value.length > 0) {
    error.message = `Parolanız en az 1 büyük harf ve 1 küçük harf içermeli, 8 karakterden oluşmalıdır`;
    error.error = true;
    return error;
  } else {
    return error;
  }
};
export const telValidation = ({ value, label, selectionEnd, keyCode }) => {
  const error = {
    message: "",
    error: false,
    changedValue: undefined,
    cursor: selectionEnd,
  };
  if (!value) return error;
  const prefix = "(";
  const suffix = ")";
  const space = " ";
  const keyCodes = { space: 32, del: 46, backSpace: 8 };
  const isErasing = keyCode === keyCodes.backSpace || keyCode === keyCodes.del;
  let newValue;
  const valid = value.replace(/[^0-9\.]+/g, "");
  error.cursor = selectionEnd;
  if (valid.length > 0) {
    newValue = prefix + valid.substring(0, 3);
    if (!isErasing && selectionEnd === 1) error.cursor += 1;
    if (valid.length > 3) {
      newValue += suffix + space + valid.substring(3, 6);
      if (!isErasing && selectionEnd === 5) error.cursor += 2;
      if (valid.length > 6) {
        newValue += space + valid.substring(6, 8);
        if (!isErasing && selectionEnd === 10) error.cursor += 1;
        if (valid.length > 8) {
          newValue += space + valid.substring(8);
          if (!isErasing && selectionEnd === 13) error.cursor += 1;
          if (newValue[15]) {
            newValue = newValue.substring(0, 15);
          }
        }
      }
    }
  } else {
    newValue = "";
  }
  error.changedValue = newValue;
  if (
    valid.length > 0 &&
    (!(valid.length === 10 || valid.length === 11) || newValue[1] !== "5")
  ) {
    error.error = true;
    error.message = `Geçerli bir ${label} giriniz`;
  }
  return error;
};
export const usernameValidation = (value, label) => {
  // const error = { message: "", error: false };
  // if (!value) return error;
  // if (!validRegex.test(value)) {
  //   error.message = `Geçerli bir ${label} giriniz`;
  //   error.error = true;
  //   return error;
  // } else {
  //   return error;
  // }
};
