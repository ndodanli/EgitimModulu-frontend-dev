import React from "react";
import PropTypes from "prop-types";
import {
  EMWidgetBrand,
  EMRow,
  EMCol,
  EMIcon,
  EMChartLineSimple,
} from "../../../../components/index";

const WidgetsBrand = ({ withCharts }) => {
  return withCharts ? (
    <EMRow>
      <EMCol sm="6" lg="3">
        <EMWidgetBrand
          color="facebook"
          rightHeader="89k"
          rightFooter="friends"
          leftHeader="459"
          leftFooter="feeds"
        >
          <EMIcon name="cib-facebook" height="52" className="my-4" />
          <EMChartLineSimple
            className="position-absolute w-100 h-100"
            backgroundColor="rgba(255,255,255,.1)"
            dataPoints={[65, 59, 84, 84, 51, 55, 40]}
            label="Friends"
            labels="months"
          />
        </EMWidgetBrand>
      </EMCol>

      <EMCol sm="6" lg="3">
        <EMWidgetBrand
          color="twitter"
          rightHeader="973k"
          rightFooter="followers"
          leftHeader="1.792"
          leftFooter="tweets"
        >
          <EMIcon name="cib-twitter" height="52" className="my-4" />
          <EMChartLineSimple
            className="position-absolute w-100 h-100"
            backgroundColor="rgba(255,255,255,.1)"
            dataPoints={[1, 13, 9, 17, 34, 41, 38]}
            label="Followers"
            labels="months"
          />
        </EMWidgetBrand>
      </EMCol>

      <EMCol sm="6" lg="3">
        <EMWidgetBrand
          color="linkedin"
          rightHeader="500+"
          rightFooter="contracts"
          leftHeader="292"
          leftFooter="feeds"
        >
          <EMIcon name="cib-linkedin" height="52" className="my-4" />
          <EMChartLineSimple
            className="position-absolute w-100 h-100"
            backgroundColor="rgba(255,255,255,.1)"
            dataPoints={[78, 81, 80, 45, 34, 12, 40]}
            label="Contracts"
            labels="months"
          />
        </EMWidgetBrand>
      </EMCol>

      <EMCol sm="6" lg="3">
        <EMWidgetBrand
          rightHeader="12"
          rightFooter="events"
          leftHeader="4"
          leftFooter="meetings"
          color="gradient-warning"
        >
          <EMIcon name="cil-calendar" height="52" className="my-4" />
          <EMChartLineSimple
            className="position-absolute w-100 h-100"
            backgroundColor="rgba(255,255,255,.1)"
            dataPoints={[35, 23, 56, 22, 97, 23, 64]}
            label="Followers"
            labels="months"
          />
        </EMWidgetBrand>
      </EMCol>
    </EMRow>
  ) : (
    <EMRow>
      <EMCol sm="6" lg="3">
        <EMWidgetBrand
          color="facebook"
          rightHeader="89k"
          rightFooter="friends"
          leftHeader="459"
          leftFooter="feeds"
        >
          <EMIcon name="cib-facebook" height="56" className="my-4" />
        </EMWidgetBrand>
      </EMCol>

      <EMCol sm="6" lg="3">
        <EMWidgetBrand
          color="twitter"
          rightHeader="973k"
          rightFooter="followers"
          leftHeader="1.792"
          leftFooter="tweets"
        >
          <EMIcon name="cib-twitter" height="56" className="my-4" />
        </EMWidgetBrand>
      </EMCol>

      <EMCol sm="6" lg="3">
        <EMWidgetBrand
          color="linkedin"
          rightHeader="500+"
          rightFooter="contracts"
          leftHeader="292"
          leftFooter="feeds"
        >
          <EMIcon name="cib-linkedin" height="56" className="my-4" />
        </EMWidgetBrand>
      </EMCol>

      <EMCol sm="6" lg="3">
        <EMWidgetBrand
          rightHeader="12"
          rightFooter="events"
          leftHeader="4"
          leftFooter="meetings"
          color="gradient-warning"
        >
          <EMIcon name="cil-calendar" height="56" className="my-4" />
        </EMWidgetBrand>
      </EMCol>
    </EMRow>
  );
};

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
};

export default WidgetsBrand;
