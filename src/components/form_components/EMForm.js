import React, { useState } from "react";
import PropTypes, { bool } from "prop-types";
import { transformToValidTel } from "../../utilities/generalUtilityMethods";

/**
 * Form işlemleri için kullanılacak, onSubmit eventi ile (event, formInputs)
 * gönderen Form componenti.
 */
EMForm.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
  formRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  validateInside: PropTypes.bool,
};
EMForm.defaultProps = {
  validateInside: false,
};
export const FormContext = React.createContext({
  formErrors: [],
  setFormErrors: Function(),
  checkOthers: { checkState: false, dontCheck: [] },
  setCheckOthers: Function(),
  firstCheck: bool,
  setFirstCheck: Function(),
  reset: Function(),
});

function EMForm({
  onSubmit,
  children,
  formRef,
  className,
  style,
  validateInside,
  ...props
}) {
  const [formErrors, setFormErrors] = useState([]);
  const [firstCheck, setFirstCheck] = useState(true);
  const [checkOthers, setCheckOthers] = useState({
    checkState: false,
    dontCheck: [],
  });
  const reset = () => {
    setFirstCheck(true);
    setFormErrors([]);
  };
  const handleSubmit = (e, submitFunc) => {
    e.preventDefault();
    const isValid = !(Array.isArray(formErrors) && formErrors.length);
    if (isValid || validateInside) {
      let formInputs = {};
      for (let i = 0; i < e.target.elements.length - 1; i++) {
        const el = e.target.elements[i];
        if (el.nodeName === "INPUT") {
          switch (el.type) {
            case "number":
              formInputs[el.name] =
                el.valueAsNumber !== "" ? el.valueAsNumber : null;
              break;
            case "date":
              formInputs[el.name] = el.value !== "" ? el.value : null;
              break;
            case "tel":
              formInputs[el.name] =
                el.value !== "" ? transformToValidTel(el.value) : null;
              break;
            default:
              formInputs[el.name] = el.value !== "" ? el.value : null;
              break;
          }
        } else if (el.nodeName === "SELECT") {
          formInputs[el.name] =
            el.selectedOptions[0].value !== ""
              ? parseInt(el.selectedOptions[0].value)
              : null;
        } else if (el.nodeName === "TEXTAREA") {
          formInputs[el.name] = el.value !== "" ? el.value : null;
        }
      }
      if (submitFunc) {
        if (!isValid) {
          setFirstCheck(false);
          submitFunc(false, formInputs);
        } else if (validateInside) {
          submitFunc(true, formInputs);
        } else {
          submitFunc(e, formInputs);
        }
      }
    } else {
      setFirstCheck(false);
    }
  };
  return (
    <FormContext.Provider
      value={{
        formErrors: formErrors,
        setFormErrors: setFormErrors,
        checkOthers: checkOthers,
        setCheckOthers: setCheckOthers,
        firstCheck,
        reset,
      }}
    >
      <form
        onSubmit={(e) => handleSubmit(e, onSubmit)}
        className={className}
        style={style}
        ref={formRef}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

export default EMForm;
