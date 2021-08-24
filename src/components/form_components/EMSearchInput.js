import React, { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { clipLoader } from "../table_components/Loader";
EMSearchInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  loadingEffect: PropTypes.bool,
  action: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  delay: PropTypes.number,
};
EMSearchInput.defaultProps = {
  maxLength: 500,
  delay: 0,
  loadingEffect: false,
};
function EMSearchInput({
  label,
  id,
  name,
  type,
  className,
  placeholder = label + " giriniz",
  defaultValue,
  maxLength,
  value: sendedValue = "",
  action,
  delay,
  loading,
  loadingEffect,
  ...props
}) {
  const [valueChange, setValueChange] = useState(sendedValue);
  const [responseLoading, setResponseLoading] = useState(false);

  const timeOut = useRef(null);
  const inputRef = useRef(null);
  let firstRender = useRef(true);

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value.length <= maxLength) {
      setValueChange(value);
      if (action) {
        if (loadingEffect) waitForResponse();
        checkValue(value);
      }
    }
  };
  const waitForResponse = () => {
    setResponseLoading(true);
  };
  const checkValue = async (value) => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      action(value);
    }, delay);
  };
  useEffect(() => {
    if (!firstRender.current && loadingEffect && loading === false) {
      setResponseLoading(false);
    } else {
      firstRender.current = false;
    }
  }, [loading]);
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
      {loadingEffect && responseLoading && <i className="ml-2">{clipLoader}</i>}
    </Fragment>
  );
}

export default EMSearchInput;
