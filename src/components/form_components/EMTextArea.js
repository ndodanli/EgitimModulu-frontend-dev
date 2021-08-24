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

/**
 * TextArea işlemleri için kullanılacak, (label, name, type) gönderilmesi zorunlu olan
 * ve eğer gönderilir ise (validationMethods:[method1, method2, ...]) ile input kontrol
 * işlemlerini gerçekleştiren TextArea componenti
 */
EMTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isNullable: PropTypes.bool,
  className: PropTypes.string,
  focusOnRender: PropTypes.bool,
  resizable: PropTypes.bool,
  getOtherInputsOnValidation: PropTypes.bool,
  validationMethods: PropTypes.arrayOf(PropTypes.func),
};

function EMTextArea({
  label,
  id,
  name,
  type,
  className = "form-control",
  placeholder = label + " giriniz",
  isNullable = false,
  focusOnRender,
  resizable = false,
  getOtherInputsOnValidation = false,
  validationMethods,
  value: sendedValue = "",
  ...props
}) {
  const inputRef = useRef(null);
  const firstRender = useRef(true);
  const [valueChange, setValueChange] = useState(sendedValue);
  const { formErrors, setFormErrors } = useContext(FormContext);
  const [instanceErrors, setInstanceErrors] = useState([]);
  const handleInputChange = (e) => {
    const { value } = e.target;
    setValueChange(value);
    if (!isNullable) {
      if (firstRender.current) firstRender.current = false;
      let otherInputs = {};
      if (getOtherInputsOnValidation) {
        otherInputs = getOtherInputs();
      }
      validationMethods != undefined &&
        validationMethods.forEach((valMethod) => {
          const { message, error } = valMethod(
            value,
            label,
            getOtherInputsOnValidation && otherInputs
          );
          const errorName = name + "_" + valMethod.name;
          if (error) {
            if (!checkIfExist(errorName)) {
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
    }
  };

  useEffect(() => {
    if (!isNullable && !firstRender.current) {
      if (instanceErrors.length) {
        inputRef.current.classList.remove("is-valid");
        inputRef.current.classList.add("is-invalid");
      } else {
        inputRef.current.classList.remove("is-invalid");
        inputRef.current.classList.add("is-valid");
      }
    }
  }, [instanceErrors]);

  useEffect(() => {
    if (!valueChange && !isNullable) {
      validationMethods != undefined &&
        validationMethods.forEach((valMethod) => {
          const { message, error } = valMethod(valueChange, label);
          if (error) {
            const errorName = name + "_" + valMethod.name;
            setFormErrors((prevErrors) => {
              return [...prevErrors, errorName];
            });
          }
        });
    }
  }, []);

  useLayoutEffect(() => {
    if (inputRef.current && focusOnRender === true) inputRef.current.focus();
    if (resizable) inputRef.current.classList.add("textarea-resizable");
    else inputRef.current.classList.add("textarea-not-resizable");
  }, []);

  const checkIfExist = (errorName) => {
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
        formInputs[formEl.elements[i].name] =
          formEl.elements[i].value || formEl.elements[i].checked;
      }
      return formInputs;
    }
  };
  return (
    <Fragment>
      <textarea
        id={id === undefined ? name : id}
        name={name}
        className={className}
        placeholder={placeholder}
        value={valueChange}
        onChange={handleInputChange}
        type={type}
        ref={inputRef}
        {...props}
      ></textarea>
      {instanceErrors.length ? (
        <div className="invalid-feedback">
          {instanceErrors.map((insErr) => (
            <div>{insErr[Object.keys(insErr)[0]]}</div>
          ))}
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default EMTextArea;
