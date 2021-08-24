import React, { useEffect } from "react";
import { EMModal, EMModalBody } from "./ModalComponents";
import { resizeListener } from "../../utilities/resizeListener";
import PropTypes from "prop-types";
import classNames from "classnames";
import EMButtonToolbar from "../button_components/EMButtonToolbar";
import EMModalHeader from "./EMModalHeader";
import EMButton from "../button_components/EMButton";
import EMButtonClose from "../button_components/EMButtonClose";
import useTabbed from "../utils/useTabbed";
import EMIcon from "../icon_components/EMIcon";
EMTabbedModal.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.func).isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  header: PropTypes.object,
  closeButton: PropTypes.object,
  size: PropTypes.string,
  modalClasses: PropTypes.string,
  nextPrevButtons: PropTypes.bool,
  otherFormInputs: PropTypes.object,
  toggle: PropTypes.func.isRequired,
  modalStatus: PropTypes.bool.isRequired,
};
EMTabbedModal.defaultProps = {
  size: "lg",
  nextPrevButtons: false,
  otherFormInputs: null,
  modalClasses: "",
};
function EMTabbedModal({
  tabs,
  buttons,
  header,
  closeButton,
  size,
  modalClasses,
  nextPrevButtons,
  otherFormInputs,
  toggle,
  modalStatus,
}) {
  // console.log("test");
  const {
    formStatus,
    formWidth,
    firstRender,
    contentRef,
    handleTabChange,
    handleResize,
    getForm,
    getParent,
    setFormWidth,
  } = useTabbed({ tabs, otherFormInputs });

  useEffect(() => {
    if (
      firstRender.current &&
      contentRef.current !== null &&
      typeof contentRef.current === "object"
    ) {
      resizeListener(contentRef.current, handleResize);
      setFormWidth({
        width: contentRef.current.offsetWidth * tabs.length,
        transitionDelay: false,
      });
      firstRender.current = false;
    }
  }, [modalStatus]);
  const h = React.createElement("h" + (header.h ? header.h : "4"), {
    children: header.text,
    className: header.className
      ? header.className
      : "ml-2 text-dark text-uppercase",
  });
  return (
    tabs.length === buttons.length && (
      <EMModal
        className={classNames("invisible-modal", modalClasses)}
        size={size}
        show={modalStatus}
        onClose={toggle}
        innerRef={contentRef}
        fade={false}
        addContentClass="overflow-hidden"
      >
        <EMModalBody className="mb-3">
          {header && (
            <EMModalHeader>
              {h}
              <EMButtonClose
                onClick={toggle}
                buttonClass={
                  !closeButton?.className
                    ? "text-danger close"
                    : closeButton.className
                }
                style={{ outline: 0 }}
              />
            </EMModalHeader>
          )}
          <EMButtonToolbar className="mt-2">
            {buttons.map((button, idx) => {
              return (
                <EMButton
                  key={idx}
                  children={button.text}
                  tabbedButton={button.className ? false : true}
                  onClick={
                    !nextPrevButtons
                      ? () => handleTabChange(button.onClick, null, true, idx)
                      : () => {}
                  }
                  className={classNames(
                    button.className,
                    idx === formStatus && "focused"
                  )}
                  style={button.style}
                />
              );
            })}
          </EMButtonToolbar>
          <div
            className="d-flex"
            style={{
              width: formWidth.width,
              transform: `translateX(${
                (-formWidth.width / tabs.length) * formStatus
              }px)`,
              transition: formWidth.transitionDelay
                ? "transform 0.8s ease"
                : "0s",
            }}
          >
            {tabs.map((tabbed, idx) => {
              const element = tabbed();
              const tabNodes = {
                parent: getParent(element),
                form: getForm(element),
              };
              return (
                <div
                  key={idx}
                  className="tabbed-form"
                  style={{
                    width: 100 / tabs.length + "%",
                    // overflowY: "auto",
                  }}
                >
                  {tabNodes.parent.state ? (
                    <tabNodes.parent.type
                      {...tabNodes.parent.props}
                      className={classNames(
                        tabNodes.parent.props.className,
                        "h-100"
                      )}
                      children={[
                        tabNodes.parent?.children && [
                          ...tabNodes.parent.children,
                        ],
                        <tabNodes.form.type
                          onSubmit={(isValid, formInputs) =>
                            nextPrevButtons &&
                            handleTabChange(null, formInputs, isValid, idx + 1)
                          }
                          {...tabNodes.form.props}
                          id={"form-" + idx}
                          validateInside={
                            nextPrevButtons && idx !== tabs.length - 1
                              ? true
                              : false
                          }
                          children={[...tabNodes.form.props.children]}
                        />,
                      ]}
                    />
                  ) : (
                    <tabNodes.form.type
                      onSubmit={(isValid, formInputs) =>
                        nextPrevButtons &&
                        handleTabChange(null, formInputs, isValid, idx + 1)
                      }
                      {...tabNodes.form.props}
                      className={classNames(
                        tabNodes.form.props.className,
                        "h-100"
                      )}
                      id={"form-" + idx}
                      validateInside={
                        nextPrevButtons && idx !== tabs.length - 1
                          ? true
                          : false
                      }
                      children={[...tabNodes.form.props.children]}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div
            style={{
              width: formWidth.width / tabs.length + "px",
            }}
          >
            {nextPrevButtons && formStatus > 0 && (
              <EMButton
                style={{
                  animation: "fade-in 900ms linear",
                  marginTop: 0,
                  // visibility: formStatus !== idx && "hidden",
                }}
                onClick={() =>
                  handleTabChange(null, null, true, formStatus - 1)
                }
                id={"button-" + formStatus}
                tabbedButton
                children={
                  <span className="d-flex align-items-center">
                    <EMIcon size="xl" name="cil-chevron-circle-left-alt" />
                  </span>
                }
                className="float-left mt-3 ml-3"
              />
            )}

            {nextPrevButtons && formStatus < tabs.length - 1 && (
              <EMButton
                style={{
                  animation: "fade-in 900ms linear",
                  marginTop: 0,
                }}
                type="submit"
                form={"form-" + formStatus}
                tabbedButton
                children={
                  <span className="d-flex align-items-center  ">
                    <EMIcon size="xl" name="cil-chevron-circle-right-alt" />
                  </span>
                }
                className="float-right mt-3 mr-3 "
              />
            )}
          </div>
        </EMModalBody>
      </EMModal>
    )
  );
}
//ayarlanacak
export default React.memo(EMTabbedModal, (prevInput, nextInput) => {
  // console.log("prevInput", prevInput);
  // console.log("nextInput", nextInput);
  return prevInput.modalStatus === nextInput.modalStatus;
});
