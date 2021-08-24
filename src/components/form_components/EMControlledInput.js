import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { FormContext } from "./EMForm";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { clipLoader } from "../table_components/Loader";
EMControlledInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  updateEffect: PropTypes.bool,
  loadingEffect: PropTypes.bool,
  action: PropTypes.func.isRequired,
  delay: PropTypes.number,
};
EMControlledInput.defaultProps = {
  maxLength: 500,
  delay: 0,
  updateEffect: false,
  loadingEffect: true,
};
function EMControlledInput({
  label,
  id,
  name,
  type,
  className,
  placeholder = label + " giriniz",
  defaultValue,
  maxLength,
  value: sendedValue = "",
  loadingEffect,
  action,
  delay,
  updateEffect,
  invalidMessage,
  validationMethods,
  ...props
}) {
  const dispatch = useDispatch();
  const { formErrors, setFormErrors, firstCheck, reset } = useContext(
    FormContext
  );

  const [valueChange, setValueChange] = useState(sendedValue);
  const [instanceErrors, setInstanceErrors] = useState([]);
  const [oldValue, setOldValue] = useState({
    value: "",
    isChanged: false,
  });
  const [responseLoading, setResponseLoading] = useState(false);

  const errorNameWait = name + "_" + "wait";

  const timeOut = useRef(null);
  const inputRef = useRef(null);
  let firstRender = useRef(true);

  let anyError = false;
  console.log("loadingEffect", loadingEffect);

  const controlledInput = useSelector((state) => state.controlledInput);
  const clearInputs = useSelector((state) => state.toggleDetails.clearInputs);

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value.length <= maxLength) {
      if (updateEffect) {
        setOldValue((prev) => {
          return {
            ...prev,
            isChanged: value != oldValue.value,
          };
        });
      }
      setValueChange(value);
      validationMethods != undefined &&
        validationMethods.forEach((valMethod) => {
          const { message, error } = valMethod({
            value: value,
            label: label,
            name: name,
          });
          const errorName = name + "_" + valMethod.name;
          if (error) {
            anyError = true;
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
      if (value.length !== maxLength) {
        clearErrorsByName(name + "_" + "invalidUnique");
      }
      if (!anyError && action && value != oldValue.value) {
        if (loadingEffect) waitForResponse();
        checkIfExistInDb(value);
      }
    }
    firstRender.current = false;
  };
  const waitForResponse = () => {
    if (
      !checkIfExistInForm(errorNameWait) &&
      !checkIfExistInInstance(errorNameWait)
    ) {
      setFormErrors((prevInsErrors) => {
        return [...prevInsErrors, errorNameWait];
      });
      setInstanceErrors((prevInsErrors) => {
        return [...prevInsErrors, { [errorNameWait]: " " }];
      });
      setResponseLoading(true);
    }
  };
  const checkIfExistInDb = async (value) => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      dispatch(action(value));
    }, delay);
  };
  useEffect(() => {
    if (!firstRender.current && controlledInput.loading === false) {
      clearErrorsByName(errorNameWait);
      if (loadingEffect) setResponseLoading(false);
      const errorName = name + "_" + "invalidUnique";
      if (controlledInput[name]) {
        if (
          !checkIfExistInForm(errorName) &&
          !checkIfExistInInstance(errorName)
        ) {
          setInstanceErrors((prevInsErrors) => {
            return [...prevInsErrors, { [errorName]: invalidMessage }];
          });
          setFormErrors((prevErrors) => {
            return [...prevErrors, errorName];
          });
        }
      } else if (!controlledInput[name]) {
        clearErrorsByName(errorName);
      }
    }
  }, [controlledInput]);
  useEffect(() => {
    if (!firstRender.current) {
      if (instanceErrors.length) {
        inputRef.current.classList.remove("is-valid", "is-updated");
        inputRef.current.classList.add("is-invalid");
      } else if (updateEffect && oldValue.isChanged) {
        inputRef.current.classList.remove("is-valid", "is-invalid");
        inputRef.current.classList.add("is-updated");
      } else {
        inputRef.current.classList.remove("is-invalid", "is-updated");
        inputRef.current.classList.add("is-valid");
      }
    }
  }, [instanceErrors]);
  useEffect(() => {
    if (!firstCheck && !instanceErrors.length) {
      validationMethods != undefined &&
        validationMethods.forEach((valMethod) => {
          const { message, error } = valMethod({
            value: valueChange,
            label: label,
          });
          if (error) {
            const errorName = name + "_" + valMethod.name;
            setInstanceErrors((prevInsErrors) => {
              return [...prevInsErrors, { [errorName]: message }];
            });
          }
        });
      if (firstRender.current) firstRender.current = false;
    }
  }, [firstCheck]);
  useEffect(() => {
    if (clearInputs.status !== true) {
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
      setValueChange(sendedValue);
      removeClasses();
      reset();
      firstRender.current = true;
    }
  }, [clearInputs]);
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
  const clearErrorsByName = (errorName = "") => {
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
  };
  return (
    <Fragment>
      <input
        id={id === undefined ? name : id}
        name={name}
        className={classNames("form-control", className)}
        placeholder={placeholder}
        value={valueChange}
        onChange={handleInputChange}
        type={type}
        ref={inputRef}
        defaultValue={defaultValue}
        autoComplete="new-password"
        {...props}
      />
      {loadingEffect && responseLoading && (
        <div className="ml-2">{clipLoader}</div>
      )}
      {instanceErrors.length ? (
        <div className="invalid-feedback">
          {instanceErrors.map((insErr, idx) => (
            <div key={idx}>
              {insErr[Object.keys(insErr)[0]] !== errorNameWait &&
                insErr[Object.keys(insErr)[0]]}
            </div>
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

export default EMControlledInput;
