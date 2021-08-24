import { CNav, CNavLink } from "@coreui/react";
import React from "react";
import {
  EMCard,
  EMCardBody,
  EMCardHeader,
  EMIcon,
  EMImg,
} from "../../../../components";

function LeftSidemenu() {
  return (
    <div>
      <EMCard className="border-0 stucard navcard ">
        <EMCardHeader className="nheader text-left">
          <EMImg src={"avatars/online.jpg"} className="img-fluid" />
        </EMCardHeader>
        <EMCardBody>
          <CNav vertical className="text-left ">
            <CNavLink className="mb-3 btn-block menubtn">
              <h5 className="mt-2 ">
                <EMIcon name="cil-book" className="mr-1 mb-1" size="lg" />
                Dersler
              </h5>
            </CNavLink>
            <CNavLink className="mb-3 btn-block menubtn">
              <h5 className="mt-2">
                <EMIcon name="cil-info" className="mr-1 mb-1" size="lg" />
                Ders Bilgileri
              </h5>
            </CNavLink>
            <CNavLink className="mb-3 btn-block menubtn">
              <h5 className="mt-2">
                <EMIcon name="cil-list" className="mr-1 mb-1" size="lg" />
                Ders Programı
              </h5>
            </CNavLink>
            <CNavLink className="mb-3 btn-block menubtn">
              <h5 className="mt-2">
                <EMIcon name="cil-task" className="mr-1 mb-1" size="lg" />
                Sınav Paneli
              </h5>
            </CNavLink>
            <CNavLink className="mb-3 btn-block menubtn">
              <h5 className="mt-2">
                <EMIcon
                  name="cil-calendar-check"
                  className="mr-1 mb-1"
                  size="lg"
                />
                Sınav Programı
              </h5>
            </CNavLink>
            <CNavLink className="mb-3 btn-block menubtn">
              <h5 className="mt-2">
                <EMIcon name="cil-bullhorn" className="mr-1 mb-1" size="lg" />
                Not Bilgisi
              </h5>
            </CNavLink>
            <CNavLink className="mb-4 btn-block menubtn">
              <h5 className="mt-2 ">
                <EMIcon name="cil-meh" className="mr-1 mb-1" size="lg" />
                Devamsızlık Bilgisi
              </h5>
            </CNavLink>
          </CNav>
        </EMCardBody>
      </EMCard>
    </div>
  );
}

export default React.memo(LeftSidemenu);
