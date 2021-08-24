import React from "react";
import {
  EMCard,
  EMCardBody,
  EMCardHeader,
  EMCol,
  EMIcon,
  EMImg,
  EMRow,
} from "../../../../components";

function RightSideMenu() {
  return (
    <div>
      <EMCard className="border-0 stucard">
        <EMCardHeader className="sheader pb-0 bg-white">
          <h5 className="font-weight-bold mt-2 text-dark ">
            <EMIcon name="cil-pin" className="mr-1 mb-1" size="lg" /> Yaklaşan
            Etkinlikler
          </h5>
        </EMCardHeader>

        <EMCardBody>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <EMIcon name="cil-alarm" className="mr-2 " />
              Türkçe Ödev Teslimi-15 Mart 22.00
            </li>
            <li className="list-group-item">
              <EMIcon name="cil-alarm" className="mr-2 " />
              Matematik Dersi-18 Mart 10.00
            </li>
            <li className="list-group-item">
              <EMIcon name="cil-alarm" className="mr-2 " />
              Matematik Sınavı-24 Nisan 15.30
            </li>
            <li className="list-group-item">
              <EMIcon name="cil-alarm" className="mr-2 " />
              Quiz-25 Nisan 09.45
            </li>
          </ul>
        </EMCardBody>
      </EMCard>
      <EMCard className="stucard border-0">
        <EMCardHeader className="sheader pb-0 bg-white">
          <h5 className="font-weight-bold mt-2 text-dark ">
            <EMIcon name="cil-pin" className="mr-1 mb-1" size="lg" /> Ders
            Dökümanları
          </h5>
        </EMCardHeader>
        <EMCardBody>
          <p className="text-muted">
            Öğretmenlerin tarafından paylaşılan sana özel ve sınıfına ait tüm
            ders dökümanlarına buradan ulaşabilirsin.
          </p>
          <EMImg src={"avatars/document.jpg"} className="img-fluid" />
          <EMRow className="justify-content-center mt-4">
            <EMCol>
              <button
                type="button"
                className="btn btn-outline-secondary btn-block font-weight-bold text-dark"
              >
                Dökümanlarıma Git...
              </button>
            </EMCol>
          </EMRow>
        </EMCardBody>
      </EMCard>
    </div>
  );
}

export default React.memo(RightSideMenu);
