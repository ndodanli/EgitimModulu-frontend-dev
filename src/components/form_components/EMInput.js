import React, {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { FormContext } from "./EMForm";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useSelector } from "react-redux";
/**
 * Input işlemleri için kullanılacak, (label, name, type) gönderilmesi zorunlu olan
 * ve eğer gönderilir ise (validationMethods:[method1, method2, ...]) ile input kontrol
 * işlemlerini gerçekleştiren Input componenti
 */
EMInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  isNullable: PropTypes.bool,
  className: PropTypes.string,
  focusOnRender: PropTypes.bool,
  maxLength: PropTypes.number,
  updateEffect: PropTypes.bool,
  cssEffects: PropTypes.bool,
  prefix: PropTypes.string,
  onChange: PropTypes.func,
  getOtherInputsOnValidation: PropTypes.bool,
  setInputOnValidation: PropTypes.bool,
  validationMethods: PropTypes.arrayOf(PropTypes.func),
};
EMInput.defaultProps = {
  isNullable: false,
  getOtherInputsOnValidation: false,
  updateEffect: false,
  setInputOnValidation: false,
  maxLength: 500,
  cssEffects: true,
  onChange: null,
};
function EMInput({
  label,
  id,
  name,
  type,
  className,
  placeholder = label + " giriniz",
  defaultValue,
  isNullable,
  focusOnRender,
  maxLength,
  onChange,
  getOtherInputsOnValidation,
  setInputOnValidation,
  validationMethods,
  value: sendedValue = "",
  updateEffect,
  prefix,
  cssEffects,
  ...props
}) {
  const clearInputs = useSelector((state) => state.toggleDetails.clearInputs);
  const inputRef = useRef(null);
  const [valueChange, setValueChange] = useState(
    prefix ? prefix + sendedValue : sendedValue
  );
  const [instanceErrors, setInstanceErrors] = useState([]);
  let firstRender = useRef(true);
  let settedValue;
  let keyCode;
  const [oldValue, setOldValue] = useState({
    value: "",
    isChanged: false,
  });
  const [selectionEnd, setSelectionEnd] = useState(0);
  const supportedTypes = ["text", "search", "password", "tel", "url"];
  const {
    formErrors,
    setFormErrors,
    checkOthers,
    setCheckOthers,
    firstCheck,
    reset,
  } = useContext(FormContext);
  const handleInputChange = (e) => {
    const { value } = e.target;
    const selectionEndVal = supportedTypes.includes(type)
      ? e.target.selectionEnd
      : null;
    const nonPrefixValue = prefix ? value.substring(prefix.length) : value;
    if (nonPrefixValue.length <= maxLength) {
      if (!setInputOnValidation) {
        setSelectionEnd(selectionEndVal);
        setValueChange(prefix ? prefix + nonPrefixValue : nonPrefixValue);
        if (updateEffect) {
          setOldValue((prev) => {
            return {
              ...prev,
              isChanged: nonPrefixValue != oldValue.value,
            };
          });
        }
      }
      if (!isNullable) {
        let otherInputs = {};
        if (getOtherInputsOnValidation) {
          otherInputs = getOtherInputs();
        }
        validationMethods != undefined &&
          validationMethods.forEach((valMethod) => {
            const { message, error, changedValue, cursor } = valMethod({
              value: settedValue !== undefined ? settedValue : nonPrefixValue,
              label: label,
              selectionEnd: selectionEndVal,
              name: getOtherInputsOnValidation ? name : null,
              otherInputs: getOtherInputsOnValidation ? otherInputs : null,
              setCheckOthers: getOtherInputsOnValidation
                ? setCheckOthers
                : null,
              keyCode: keyCode,
            });
            if (setInputOnValidation) {
              if (changedValue !== undefined) {
                settedValue = changedValue;
                setValueChange(prefix ? prefix + changedValue : changedValue);
              }
              if (cursor !== undefined) {
                setSelectionEnd(cursor);
              }
              if (updateEffect) {
                setOldValue((prev) => {
                  return {
                    ...prev,
                    isChanged: prefix
                      ? changedValue.substring(prefix.length) != oldValue.value
                      : changedValue != oldValue.value &&
                        changedValue !== undefined,
                  };
                });
              }
            }
            const errorName = name + "_" + valMethod.name;
            if (error) {
              const formErr = checkIfExistInForm(errorName);
              const instanceErr = checkIfExistInInstance(errorName);
              if (!instanceErr) {
                if (!formErr)
                  setFormErrors((prevErrors) => {
                    return [...prevErrors, errorName];
                  });
                setInstanceErrors((prevInsErrors) => {
                  return [...prevInsErrors, { [errorName]: message }];
                });
              }
            } else {
              setFormErrors((prevErrors) => {
                for (var i = prevErrors.length - 1; i >= 0; --i) {
                  if (prevErrors[i] === errorName) {
                    prevErrors.splice(i, 1);
                    return [...prevErrors];
                  }
                }
                return [...prevErrors];
              });
              setInstanceErrors((prevInsErrors) => {
                for (var i = prevInsErrors.length - 1; i >= 0; --i) {
                  if (Object.keys(prevInsErrors[i])[0] === errorName) {
                    prevInsErrors.splice(i, 1);
                    return [...prevInsErrors];
                  }
                }
                return [...prevInsErrors];
              });
            }
          });

        settedValue = undefined;
        if (firstRender.current) firstRender.current = false;
      }
    }
  };
  const handleKeyDown = (e) => {
    keyCode = e.keyCode;
  };
  useEffect(() => {
    // // // console.log("useEffect [checkOthers.checkState]");
    if (
      !firstRender.current &&
      getOtherInputsOnValidation &&
      checkOthers.dontCheck.indexOf(name) === -1 &&
      !isNullable
    ) {
      let otherInputs = {};
      otherInputs = getOtherInputs();
      validationMethods != undefined &&
        validationMethods.forEach((valMethod) => {
          const { message, error } = valMethod({
            value: valueChange,
            label: label,
            name: name,
            otherInputs: otherInputs,
          });
          const errorName = name + "_" + valMethod.name;
          if (error) {
            const formErr = checkIfExistInForm(errorName);
            const instanceErr = checkIfExistInInstance(errorName);
            if (!instanceErr) {
              if (!formErr) {
                setFormErrors((prevErrors) => {
                  return [...prevErrors, errorName];
                });
              }
              setInstanceErrors((prevInsErrors) => {
                return [...prevInsErrors, { [errorName]: message }];
              });
            }
          } else {
            setFormErrors((prevErrors) => {
              for (var i = prevErrors.length - 1; i >= 0; --i) {
                if (prevErrors[i] === errorName) {
                  prevErrors.splice(i, 1);
                  return [...prevErrors];
                }
              }
              return [...prevErrors];
            });
            setInstanceErrors((prevInsErrors) => {
              for (var i = prevInsErrors.length - 1; i >= 0; --i) {
                if (Object.keys(prevInsErrors[i])[0] === errorName) {
                  prevInsErrors.splice(i, 1);
                  return [...prevInsErrors];
                }
              }
              return [...prevInsErrors];
            });
          }
        });
    }
  }, [checkOthers.checkState]);
  useEffect(() => {
    if (selectionEnd) inputRef.current.selectionEnd = selectionEnd;
    if (!isNullable && cssEffects && !firstRender.current) {
      if (instanceErrors.length) {
        inputRef.current.classList.remove("is-updated");
        inputRef.current.classList.add("is-invalid");
      } else if (updateEffect && oldValue.isChanged) {
        inputRef.current.classList.remove("is-invalid");
        inputRef.current.classList.add("is-updated");
      } else {
        inputRef.current.classList.remove("is-invalid", "is-updated");
      }
    }
  }, [instanceErrors]);
  useEffect(() => {
    if (!isNullable && !firstCheck && !instanceErrors.length) {
      const nonPrefixValue = prefix
        ? valueChange.substring(prefix.length)
        : valueChange;
      validationMethods != undefined &&
        validationMethods.forEach((valMethod) => {
          const { message, error, changedValue } = valMethod({
            value: settedValue !== undefined ? settedValue : nonPrefixValue,
            label: label,
          });
          if (setInputOnValidation && changedValue !== undefined) {
            settedValue = changedValue;
            setValueChange(prefix ? prefix + changedValue : changedValue);
          }
          if (error) {
            const errorName = name + "_" + valMethod.name;
            setInstanceErrors((prevInsErrors) => {
              return [...prevInsErrors, { [errorName]: message }];
            });
          }
        });
      settedValue = undefined;
      if (firstRender.current) firstRender.current = false;
    }
  }, [firstCheck]);
  useEffect(() => {
    // // // console.log("useEffect - [clearInputs]");
    if (!isNullable && clearInputs.status !== true) {
      validationMethods != undefined &&
        validationMethods.forEach((valMethod) => {
          const { error } = valMethod({ value: valueChange, label: label });
          if (error) {
            const errorName = name + "_" + valMethod.name;
            setFormErrors((prevErrors) => {
              return [...prevErrors, errorName];
            });
          }
        });
      setOldValue((prev) => {
        return { ...prev, value: valueChange };
      });
    } else if (clearInputs.status === true) {
      setOldValue({ value: sendedValue, isChanged: false });
      setInstanceErrors([]);
      setValueChange(prefix ? prefix + sendedValue : sendedValue);
      removeClasses();
      reset();
      firstRender.current = true;
    } else {
      firstRender.current = false;
    }
  }, [clearInputs]);
  useLayoutEffect(() => {
    // // // console.log("useLayoutEffect");
    if (inputRef.current && focusOnRender === true) inputRef.current.focus();
  }, []);
  const removeClasses = () => {
    inputRef.current.classList.remove("is-valid", "is-updated", "is-invalid");
  };
  const checkIfExistInInstance = (errorName) => {
    let isExist = false;
    instanceErrors.forEach((error) => {
      if (Object.keys(error)[0] === errorName) isExist = true;
    });
    return isExist;
  };
  const checkIfExistInForm = (errorName) => {
    let isExist = false;
    formErrors.forEach((error) => {
      if (error === errorName) isExist = true;
    });
    return isExist;
  };
  const getOtherInputs = () => {
    const formEl = inputRef.current.form;
    if (formEl) {
      let formInputs = {};
      for (let i = 0; i < formEl.elements.length - 1; i++) {
        const el = formEl.elements[i];
        if (el.nodeName === "INPUT") {
          switch (el.type) {
            case "number":
              formInputs[el.name] = el.valueAsNumber;
              break;
            case "date":
              formInputs[el.name] = el.value;
              break;
            default:
              formInputs[el.name] = el.value;
              break;
          }
        } else if (el.nodeName === "SELECT") {
          formInputs[el.name] = parseInt(el.selectedOptions[0].value);
        } else if (el.nodeName === "TEXTAREA") {
          formInputs[el.name] = el.value;
        }
      }
      return formInputs;
    }
  };
  return (
    <Fragment>
      {/* {console.log("INPUT inside render")} */}
      <input
        id={id === undefined ? name : id}
        name={name}
        className={classNames("form-control", className)}
        placeholder={placeholder}
        value={valueChange}
        onChange={!onChange ? handleInputChange : onChange}
        type={type}
        ref={inputRef}
        onKeyDown={setInputOnValidation ? (e) => handleKeyDown(e) : () => {}}
        defaultValue={defaultValue}
        autoComplete="new-password"
        {...props}
      />
      {instanceErrors.length ? (
        <div className="invalid-feedback" style={{ display: "block" }}>
          {instanceErrors.map((insErr, idx) => (
            <div key={idx}>{insErr[Object.keys(insErr)[0]]}</div>
          ))}
        </div>
      ) : (
        updateEffect &&
        oldValue.isChanged && (
          <div className={"is-updated-text"}>
            <b>{oldValue.value !== "" ? oldValue.value : label}</b>{" "}
            değiştirildi.
          </div>
        )
      )}
    </Fragment>
  );
}

export default EMInput;
