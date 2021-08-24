import React from "react";
import {
  EMCardGroup,
  EMCardFooter,
  EMCol,
  EMLink,
  EMRow,
  EMWidgetProgress,
  EMWidgetIcon,
  EMWidgetProgressIcon,
  EMWidgetSimple,
  EMProgress,
  EMIcon,
  EMWidgetBrand,
  EMWidgetDropdown,
  EMChartLineSimple,
  EMChartBarSimple,
} from "../../../../components/index";

const Widgets = () => {
  return (
    <>
      <EMWidgetDropdown />
      <EMRow>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetProgress
            color="success"
            header="89.9%"
            text="Lorem ipsum..."
            footer="Lorem ipsum dolor sit amet enim."
          />
        </EMCol>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetProgress
            color="info"
            header="12.124"
            text="Lorem ipsum..."
            footer="Lorem ipsum dolor sit amet enim."
          />
        </EMCol>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetProgress
            color="warning"
            header="$98.111,00"
            text="Lorem ipsum..."
            footer="Lorem ipsum dolor sit amet enim."
          />
        </EMCol>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetProgress
            header="2 TB"
            text="Lorem ipsum..."
            footer="Lorem ipsum dolor sit amet enim."
          >
            <EMProgress
              color="danger"
              animated
              size="xs"
              className="my-3"
              value={75}
            />
          </EMWidgetProgress>
        </EMCol>

        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetProgress
            inverse
            color="success"
            variant="inverse"
            header="89.9%"
            text="Lorem ipsum..."
            footer="Lorem ipsum dolor sit amet enim."
          />
        </EMCol>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetProgress
            inverse
            color="info"
            variant="inverse"
            header="12.124"
            text="Lorem ipsum..."
            footer="Lorem ipsum dolor sit amet enim."
          />
        </EMCol>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetProgress
            inverse
            color="warning"
            variant="inverse"
            header="$98.111,00"
            text="Lorem ipsum..."
            footer="Lorem ipsum dolor sit amet enim."
          />
        </EMCol>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetProgress
            inverse
            color="danger"
            variant="inverse"
            value={95}
            header="2 TB"
            text="Lorem ipsum..."
            footer="Lorem ipsum dolor sit amet enim."
          />
        </EMCol>
      </EMRow>

      <EMRow>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetIcon text="income" header="$1.999,50" color="primary">
            <EMIcon width={24} name="cil-settings" />
          </EMWidgetIcon>
        </EMCol>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetIcon text="income" header="$1.999,50" color="info">
            <EMIcon width={24} name="cil-user" />
          </EMWidgetIcon>
        </EMCol>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetIcon text="income" header="$1.999,50" color="warning">
            <EMIcon width={24} name="cil-moon" />
          </EMWidgetIcon>
        </EMCol>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetIcon text="income" header="$1.999,50" color="danger">
            <EMIcon width={24} name="cil-bell" />
          </EMWidgetIcon>
        </EMCol>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetIcon
            text="income"
            header="$1.999,50"
            color="primary"
            iconPadding={false}
          >
            <EMIcon width={24} name="cil-settings" />
          </EMWidgetIcon>
        </EMCol>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetIcon
            text="income"
            header="$1.999,50"
            color="info"
            iconPadding={false}
          >
            <EMIcon width={24} name="cil-laptop" />
          </EMWidgetIcon>
        </EMCol>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetIcon
            text="income"
            header="$1.999,50"
            color="warning"
            iconPadding={false}
          >
            <EMIcon width={24} name="cil-moon" />
          </EMWidgetIcon>
        </EMCol>
        <EMCol xs="12" sm="6" lg="3">
          <EMWidgetIcon
            text="income"
            header="$1.999,50"
            color="danger"
            iconPadding={false}
          >
            <EMIcon width={24} name="cil-bell" />
          </EMWidgetIcon>
        </EMCol>
        <EMCol xs="12" sm="6" lg="4">
          <EMWidgetIcon
            text="income"
            header="$1.999,50"
            color="primary"
            iconPadding={false}
          >
            <EMIcon width={24} name="cil-settings" className="mx-5" />
          </EMWidgetIcon>
        </EMCol>
        <EMCol xs="12" sm="6" lg="4">
          <EMWidgetIcon
            text="income"
            header="$1.999,50"
            color="info"
            iconPadding={false}
          >
            <EMIcon width={24} name="cil-laptop" className="mx-5" />
          </EMWidgetIcon>
        </EMCol>
        <EMCol xs="12" sm="6" lg="4">
          <EMWidgetIcon
            text="income"
            header="$1.999,50"
            color="warning"
            iconPadding={false}
            footerSlot={
              <EMCardFooter className="card-footer px-3 py-2">
                <EMLink
                  className="font-weight-bold font-xs btn-block text-muted"
                  href="https://coreui.io/"
                  rel="noopener norefferer"
                  target="_blank"
                >
                  View more
                  <EMIcon
                    name="cil-arrow-right"
                    className="float-right"
                    width="16"
                  />
                </EMLink>
              </EMCardFooter>
            }
          >
            <EMIcon width={24} name="cil-moon" className="mx-5" />
          </EMWidgetIcon>
        </EMCol>
      </EMRow>
      <EMWidgetBrand />
      <EMWidgetBrand withCharts />
      <EMCardGroup className="mb-4">
        <EMWidgetProgressIcon
          header="87.500"
          text="Visitors"
          color="gradient-info"
        >
          <EMIcon name="cil-people" height="36" />
        </EMWidgetProgressIcon>
        <EMWidgetProgressIcon
          header="385"
          text="New Clients"
          color="gradient-success"
        >
          <EMIcon name="cil-userFollow" height="36" />
        </EMWidgetProgressIcon>
        <EMWidgetProgressIcon
          header="1238"
          text="Products sold"
          color="gradient-warning"
        >
          <EMIcon name="cil-basket" height="36" />
        </EMWidgetProgressIcon>
        <EMWidgetProgressIcon header="28%" text="Returning Visitors">
          <EMIcon name="cil-chartPie" height="36" />
        </EMWidgetProgressIcon>
        <EMWidgetProgressIcon
          header="5:34:11"
          text="Avg. Time"
          color="gradient-danger"
          progressSlot={
            <EMProgress
              color="danger"
              size="xs"
              value={75}
              animated
              className="my-3"
            />
          }
        >
          <EMIcon name="cil-speedometer" height="36" />
        </EMWidgetProgressIcon>
      </EMCardGroup>
      <EMCardGroup className="mb-4">
        <EMWidgetProgressIcon
          header="87.500"
          text="Visitors"
          color="gradient-info"
          inverse
        >
          <EMIcon name="cil-people" height="36" />
        </EMWidgetProgressIcon>
        <EMWidgetProgressIcon
          header="385"
          text="New Clients"
          color="gradient-success"
          inverse
        >
          <EMIcon name="cil-userFollow" height="36" />
        </EMWidgetProgressIcon>
        <EMWidgetProgressIcon
          header="1238"
          text="Products sold"
          color="gradient-warning"
          inverse
        >
          <EMIcon name="cil-basket" height="36" />
        </EMWidgetProgressIcon>
        <EMWidgetProgressIcon
          header="28%"
          text="Returning Visitors"
          color="gradient-primary"
          inverse
        >
          <EMIcon name="cil-chartPie" height="36" />
        </EMWidgetProgressIcon>
        <EMWidgetProgressIcon
          header="5:34:11"
          text="Avg. Time"
          color="gradient-danger"
          inverse
        >
          <EMIcon name="cil-speedometer" height="36" />
        </EMWidgetProgressIcon>
      </EMCardGroup>
      <EMRow>
        <EMCol sm="6" md="2">
          <EMWidgetProgressIcon
            header="87.500"
            text="Visitors"
            color="gradient-info"
          >
            <EMIcon name="cil-people" height="36" />
          </EMWidgetProgressIcon>
        </EMCol>
        <EMCol sm="6" md="2">
          <EMWidgetProgressIcon
            header="385"
            text="New Clients"
            color="gradient-success"
          >
            <EMIcon name="cil-userFollow" height="36" />
          </EMWidgetProgressIcon>
        </EMCol>
        <EMCol sm="6" md="2">
          <EMWidgetProgressIcon
            header="1238"
            text="Products sold"
            color="gradient-warning"
          >
            <EMIcon name="cil-basket" height="36" />
          </EMWidgetProgressIcon>
        </EMCol>
        <EMCol sm="6" md="2">
          <EMWidgetProgressIcon
            header="28%"
            text="Returning Visitors"
            color="gradient-primary"
          >
            <EMIcon name="cil-chartPie" height="36" />
          </EMWidgetProgressIcon>
        </EMCol>
        <EMCol sm="6" md="2">
          <EMWidgetProgressIcon
            header="5:34:11"
            text="Avg. Time"
            color="gradient-danger"
          >
            <EMIcon name="cil-speedometer" height="36" />
          </EMWidgetProgressIcon>
        </EMCol>
        <EMCol sm="6" md="2">
          <EMWidgetProgressIcon
            header="972"
            text="comments"
            color="gradient-info"
          >
            <EMIcon name="cil-speech" height="36" />
          </EMWidgetProgressIcon>
        </EMCol>
      </EMRow>
      <EMRow>
        <EMCol sm="6" md="2">
          <EMWidgetProgressIcon
            header="87.500"
            text="Visitors"
            color="gradient-info"
            inverse
          >
            <EMIcon name="cil-people" height="36" />
          </EMWidgetProgressIcon>
        </EMCol>
        <EMCol sm="6" md="2">
          <EMWidgetProgressIcon
            header="385"
            text="New Clients"
            color="gradient-success"
            inverse
          >
            <EMIcon name="cil-userFollow" height="36" />
          </EMWidgetProgressIcon>
        </EMCol>
        <EMCol sm="6" md="2">
          <EMWidgetProgressIcon
            header="1238"
            text="Products sold"
            color="gradient-warning"
            inverse
          >
            <EMIcon name="cil-basket" height="36" />
          </EMWidgetProgressIcon>
        </EMCol>
        <EMCol sm="6" md="2">
          <EMWidgetProgressIcon
            header="28%"
            text="Returning Visitors"
            color="gradient-primary"
            inverse
          >
            <EMIcon name="cil-chartPie" height="36" />
          </EMWidgetProgressIcon>
        </EMCol>
        <EMCol sm="6" md="2">
          <EMWidgetProgressIcon
            header="5:34:11"
            text="Avg. Time"
            color="gradient-danger"
            inverse
          >
            <EMIcon name="cil-speedometer" height="36" />
          </EMWidgetProgressIcon>
        </EMCol>
        <EMCol sm="6" md="2">
          <EMWidgetProgressIcon
            header="972"
            text="comments"
            color="gradient-info"
            inverse
          >
            <EMIcon name="cil-speech" height="36" />
          </EMWidgetProgressIcon>
        </EMCol>
      </EMRow>
      <EMRow>
        <EMCol sm="4" lg="2">
          <EMWidgetSimple header="title" text="1,123">
            <EMChartLineSimple
              style={{ height: "40px" }}
              borderColor="danger"
            />
          </EMWidgetSimple>
        </EMCol>
        <EMCol sm="4" lg="2">
          <EMWidgetSimple header="title" text="1,123">
            <EMChartLineSimple
              style={{ height: "40px" }}
              borderColor="primary"
            />
          </EMWidgetSimple>
        </EMCol>
        <EMCol sm="4" lg="2">
          <EMWidgetSimple header="title" text="1,123">
            <EMChartLineSimple
              style={{ height: "40px" }}
              borderColor="success"
            />
          </EMWidgetSimple>
        </EMCol>
        <EMCol sm="4" lg="2">
          <EMWidgetSimple header="title" text="1,123">
            <EMChartBarSimple
              style={{ height: "40px" }}
              backgroundColor="danger"
            />
          </EMWidgetSimple>
        </EMCol>
        <EMCol sm="4" lg="2">
          <EMWidgetSimple header="title" text="1,123">
            <EMChartBarSimple
              style={{ height: "40px" }}
              backgroundColor="primary"
            />
          </EMWidgetSimple>
        </EMCol>
        <EMCol sm="4" lg="2">
          <EMWidgetSimple header="title" text="1,123">
            <EMChartBarSimple
              style={{ height: "40px" }}
              backgroundColor="success"
            />
          </EMWidgetSimple>
        </EMCol>
      </EMRow>
    </>
  );
};

export default Widgets;
