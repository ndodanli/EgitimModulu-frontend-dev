import React, { useEffect } from "react";
import { resizeListener } from "../../utilities/resizeListener";
import PropTypes from "prop-types";
import classNames from "classnames";
import EMButtonToolbar from "../button_components/EMButtonToolbar";
import EMButton from "../button_components/EMButton";
import { EMCard, EMCardBody, EMCardHeader, EMCol, EMRow } from "../index";
import useTabbed from "../utils/useTabbed";

EMTabbedCard.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.func).isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  header: PropTypes.object,
  closeButton: PropTypes.object,
  size: PropTypes.string,
  cardClasses: PropTypes.string,
  nextPrevButtons: PropTypes.bool,
  setOtherFormInputs: PropTypes.func,
};
EMTabbedCard.defaultProps = {
  nextPrevButtons: false,
  setOtherFormInputs: null,
  cardClasses: "",
};
function EMTabbedCard({
  tabs,
  buttons,
  header,
  size,
  cardClasses,
  nextPrevButtons,
  setOtherFormInputs,
}) {
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
  } = useTabbed({ tabs, setOtherFormInputs });

  useEffect(() => {
    if (contentRef.current !== null && typeof contentRef.current === "object") {
      resizeListener(contentRef.current, handleResize);
      setFormWidth({
        width: contentRef.current.offsetWidth * tabs.length,
        transitionDelay: false,
      });
    }
    firstRender.current = false;
  }, []);
  const h = React.createElement("h" + (header.h ? header.h : "4"), {
    children: header.text,
    className: header.className
      ? header.className
      : "ml-4 text-dark text-uppercase",
  });

  return (
    tabs.length === buttons.length && (
      <EMRow className="justify-content-center">
        <EMCol md={size}>
          <EMCard className={classNames("overflow-hidden", cardClasses)}>
            <EMCardBody className="p-0" innerRef={contentRef}>
              {header && <EMCardHeader>{h}</EMCardHeader>}
              <EMButtonToolbar className="mb-2">
                {buttons.map((button, idx) => {
                  return (
                    <EMButton
                      key={idx}
                      children={button.text}
                      tabbedButton={button.className ? false : true}
                      onClick={
                        !nextPrevButtons
                          ? () =>
                              handleTabChange(button.onClick, null, true, idx)
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
                        float: "left",
                        width: 100 / tabs.length + "%",
                      }}
                    >
                      {tabNodes.parent.state ? (
                        <tabNodes.parent.type
                          {...tabNodes.parent.props}
                          className={classNames(
                            tabNodes.parent.props.className
                          )}
                          children={[
                            tabNodes.parent?.children && [
                              ...tabNodes.parent.children,
                            ],
                            tabNodes.form && (
                              <tabNodes.form.type
                                onSubmit={(isValid, formInputs) =>
                                  handleTabChange(
                                    null,
                                    formInputs,
                                    isValid,
                                    idx + 1
                                  )
                                }
                                {...tabNodes.form.props}
                                id={"form-" + idx}
                                validateInside={
                                  nextPrevButtons && idx !== tabs.length - 1
                                    ? true
                                    : false
                                }
                                children={[...tabNodes.form.props.children]}
                              />
                            ),
                          ]}
                        />
                      ) : (
                        <tabNodes.form.type
                          onSubmit={(isValid, formInputs) =>
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
                      // visibility: formStatus !== idx && "hidden",
                    }}
                    onClick={() =>
                      handleTabChange(null, null, true, formStatus - 1)
                    }
                    tabbedButton
                    children={
                      <span className="d-flex align-items-center">
                        <i className="arrow left"></i>Geri
                      </span>
                    }
                    className="focused float-left mb-2 ml-4"
                  />
                )}

                {nextPrevButtons && formStatus < tabs.length - 1 && (
                  <EMButton
                    style={{
                      animation: "fade-in 900ms linear",
                      // visibility: formStatus !== idx && "hidden",
                    }}
                    type="submit"
                    form={"form-" + formStatus}
                    tabbedButton
                    children={
                      <span className="d-flex align-items-center">
                        İleri<i className="arrow right"></i>
                      </span>
                    }
                    className="focused float-right mb-2 mr-4"
                  />
                )}
              </div>
            </EMCardBody>
          </EMCard>
        </EMCol>
      </EMRow>
    )
  );
}

export default EMTabbedCard;
