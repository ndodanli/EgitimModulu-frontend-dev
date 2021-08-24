import React from "react";
import {
  EMWidgetDropdown,
  EMRow,
  EMCol,
  EMDropdown,
  EMDropdownMenu,
  EMDropdownItem,
  EMDropdownToggle,
  EMIcon,
  EMChartLineSimple,
  EMChartBarSimple,
} from "../../../../components/index";

const WidgetsDropdown = ({ stats }) => {
  // render
  return (
    <EMRow>
      <EMCol sm="6" lg="3">
        <EMWidgetDropdown
          color="gradient-primary"
          header={stats.totalOnline}
          text="Aktif Öğrenci"
          footerSlot={
            <EMChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        >
          <EMDropdown>
            <EMDropdownToggle color="transparent">
              <EMIcon name="cil-settings" />
            </EMDropdownToggle>
            <EMDropdownMenu className="pt-0" placement="bottom-end">
              <EMDropdownItem>Action</EMDropdownItem>
              <EMDropdownItem>Another action</EMDropdownItem>
              <EMDropdownItem>Something else here...</EMDropdownItem>
              <EMDropdownItem disabled>Disabled action</EMDropdownItem>
            </EMDropdownMenu>
          </EMDropdown>
        </EMWidgetDropdown>
      </EMCol>

      <EMCol sm="6" lg="3">
        <EMWidgetDropdown
          color="gradient-info"
          header={stats.totalStudent}
          text="Kayıtlı Öğrenci"
          footerSlot={
            <EMChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Members"
              labels="months"
            />
          }
        >
          <EMDropdown>
            <EMDropdownToggle caret={false} color="transparent">
              <EMIcon name="cil-location-pin" />
            </EMDropdownToggle>
            <EMDropdownMenu className="pt-0" placement="bottom-end">
              <EMDropdownItem>Action</EMDropdownItem>
              <EMDropdownItem>Another action</EMDropdownItem>
              <EMDropdownItem>Something else here...</EMDropdownItem>
              <EMDropdownItem disabled>Disabled action</EMDropdownItem>
            </EMDropdownMenu>
          </EMDropdown>
        </EMWidgetDropdown>
      </EMCol>

      <EMCol sm="6" lg="3">
        <EMWidgetDropdown
          color="gradient-warning"
          header={stats.totalTeacher}
          text="Kayıtlı Öğretmen"
          footerSlot={
            <EMChartLineSimple
              className="mt-3"
              style={{ height: "70px" }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >
          <EMDropdown>
            <EMDropdownToggle color="transparent">
              <EMIcon name="cil-settings" />
            </EMDropdownToggle>
            <EMDropdownMenu className="pt-0" placement="bottom-end">
              <EMDropdownItem>Action</EMDropdownItem>
              <EMDropdownItem>Another action</EMDropdownItem>
              <EMDropdownItem>Something else here...</EMDropdownItem>
              <EMDropdownItem disabled>Disabled action</EMDropdownItem>
            </EMDropdownMenu>
          </EMDropdown>
        </EMWidgetDropdown>
      </EMCol>

      <EMCol sm="6" lg="3">
        <EMWidgetDropdown
          color="gradient-danger"
          header={stats.totalActiveClassroom}
          text="Açık Sınıf"
          footerSlot={
            <EMChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        >
          <EMDropdown>
            <EMDropdownToggle caret className="text-white" color="transparent">
              <EMIcon name="cil-settings" />
            </EMDropdownToggle>
            <EMDropdownMenu className="pt-0" placement="bottom-end">
              <EMDropdownItem>Action</EMDropdownItem>
              <EMDropdownItem>Another action</EMDropdownItem>
              <EMDropdownItem>Something else here...</EMDropdownItem>
              <EMDropdownItem disabled>Disabled action</EMDropdownItem>
            </EMDropdownMenu>
          </EMDropdown>
        </EMWidgetDropdown>
      </EMCol>
    </EMRow>
  );
};

export default WidgetsDropdown;
