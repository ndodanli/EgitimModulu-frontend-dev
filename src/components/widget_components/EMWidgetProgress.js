import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import EMProgress from "../progress_components/EMProgress";

//component - CoreUI / EMWidgetProgress
const EMWidgetProgress = (props) => {
  const {
    children,
    className,
    //
    header,
    text,
    footer,
    color,
    value,
    inverse,
    ...attributes
  } = props;

  const classes = classNames(
    "card",
    inverse ? [color && `bg-${color}`, "text-white"] : "",
    className
  );

  return (
    <div className={classes} {...attributes}>
      <div className="card-body">
        {header && <div className="h4 m-0">{header}</div>}
        {text && <div>{text}</div>}
        {children || (
          <EMProgress
            color={!inverse ? color : ""}
            value={value}
            className={`progress-xs my-3 mb-0 ${
              inverse ? "progress-white" : ""
            }`}
          />
        )}
        {footer && <small className="text-muted">{footer}</small>}
      </div>
    </div>
  );
};

EMWidgetProgress.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  header: PropTypes.string,
  text: PropTypes.string,
  footer: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.number,
  inverse: PropTypes.bool,
};

EMWidgetProgress.defaultProps = {
  value: 25,
};

export default EMWidgetProgress;
