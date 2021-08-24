import React, { lazy, useEffect } from "react";
import {
  EMButton,
  EMButtonGroup,
  EMCard,
  EMCardBody,
  EMCardFooter,
  EMCol,
  EMProgress,
  EMRow,
  EMIcon,
} from "../../../components/index";
import MainChartExample from "../../../components/chart_components/MainChartExample";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "../../../actions/school/dashboardActions";

const WidgetsDropdown = lazy(() => import("./components/WidgetsDropdown"));
const SchoolDashboardPage = () => {
  const dispatch = useDispatch();
  const {
    totalOnline,
    totalStudent,
    totalTeacher,
    totalActiveClassroom,
  } = useSelector((state) => state.dashboardStats);
  useEffect(() => {
    dispatch(getDashboardStats());
  }, []);
  return (
    <>
      <WidgetsDropdown
        stats={{
          totalOnline,
          totalStudent,
          totalTeacher,
          totalActiveClassroom,
        }}
      />
      <EMCard>
        <EMCardBody>
          <EMRow>
            <EMCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Kullanım İstatistiği
              </h4>
              <div className="small text-muted">Aralık 2020</div>
            </EMCol>
            <EMCol sm="7" className="d-none d-md-block">
              <EMButton color="primary" className="float-right">
                <EMIcon name="cil-cloud-download" />
              </EMButton>
              <EMButtonGroup className="float-right mr-3">
                {["Gün", "Ay", "Yıl"].map((value) => (
                  <EMButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === "Month"}
                  >
                    {value}
                  </EMButton>
                ))}
              </EMButtonGroup>
            </EMCol>
          </EMRow>
          <MainChartExample style={{ height: "300px", marginTop: "40px" }} />
        </EMCardBody>
        <EMCardFooter>
          <EMRow className="text-center">
            <EMCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Öğrenci Modülü Kullanım</div>
              <strong>29.703 Öğrenci (40%)</strong>
              <EMProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </EMCol>
            <EMCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Yeni İçerik</div>
              <strong>200 İçerik (20%)</strong>
              <EMProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </EMCol>
            <EMCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">İçerik Görüntüleme</div>
              <strong>78.706 Views (60%)</strong>
              <EMProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={40}
              />
            </EMCol>
            <EMCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Yeni Öğrenci</div>
              <strong>22.123 Users (80%)</strong>
              <EMProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={40}
              />
            </EMCol>
            <EMCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Veri Kullanımı</div>
              <strong>Average Rate (40.15%)</strong>
              <EMProgress
                className="progress-xs mt-2"
                precision={1}
                value={40}
              />
            </EMCol>
          </EMRow>
        </EMCardFooter>
      </EMCard>
    </>
  );
};

export default SchoolDashboardPage;
