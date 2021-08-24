import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
function useTabbed({ tabs, otherFormInputs }) {
  const [formStatus, setFormStatus] = useState(0);
  const [formWidth, setFormWidth] = useState({
    width: 0,
    transitionDelay: true,
  });
  // const [formHeight, setFormHeight] = useState(0);
  const contentRef = useRef(null);
  const firstRender = useRef(true);
  const clearInputs = useSelector((state) => state.toggleDetails.clearInputs);
  useEffect(() => {
    if (!firstRender.current) if (clearInputs) setFormStatus(0);
  }, [clearInputs]);
  function handleTabChange(buttonClickFunc, formInputs, isValid, idx) {
    if (isValid && idx < tabs.length && idx >= 0) {
      if (otherFormInputs) handleOtherInputs(formInputs);
      setFormStatus(idx);
      setFormWidth((prev) => {
        return {
          ...prev,
          transitionDelay: true,
        };
      });
      if (buttonClickFunc) buttonClickFunc();
    }
  }
  const handleOtherInputs = (formInputs) => {
    otherFormInputs.current = { ...otherFormInputs.current, ...formInputs };
  };
  const handleResize = () => {
    setFormWidth({
      width: contentRef.current.offsetWidth * tabs.length,
      transitionDelay: false,
    });
  };
  const getForm = (tab) => {
    const isArray = Array.isArray(tab);
    if (!isArray && !tab?.props?.children) {
      return null;
    }
    if (!isArray) {
      if (
        typeof tab["type"] === "function" &&
        tab["type"].name.toLowerCase().includes("form")
      ) {
        return tab;
      } else {
        return getForm(tab.props.children);
      }
    } else {
      let result;
      for (let i = 0; i < tab.length; i++) {
        result = getForm(tab[i]);
        if (result) {
          break;
        }
      }
      if (result) {
        return result;
      } else {
        return null;
      }
    }
  };
  const getParent = (tab) => {
    const isArray = Array.isArray(tab.props.children);
    if (
      typeof tab["type"] === "function" &&
      tab["type"].name.toLowerCase().includes("form")
    ) {
      return { state: false };
    }
    if (!isArray) {
      return {
        type: tab.type,
        props: getFilteredProps(tab.props),
        // children: [],
        state: true,
      };
    } else {
      return {
        type: tab.type,
        props: {
          ...getFilteredProps(tab.props),
        },
        children: tab.props.children.filter(
          (child) =>
            typeof child["type"] !== "function" &&
            !child["type"]?.name?.toLowerCase().includes("form")
        ),
        state: true,
      };
    }
  };
  const getFilteredProps = (props) => {
    let newProps = {};
    for (const key in props) {
      if (Object.hasOwnProperty.call(props, key)) {
        if (key !== "children") {
          newProps[key] = props[key];
        }
      }
    }
    return newProps;
  };
  // const handleHeight = (height) => {
  //   if (height < formHeight) {
  //     setFormHeight(height);
  //   }
  // };
  return {
    formStatus,
    formWidth,
    firstRender,
    contentRef,
    // formHeight,
    handleTabChange,
    handleResize,
    getForm,
    getParent,
    // handleHeight,
    setFormWidth,
  };
}

export default useTabbed;
