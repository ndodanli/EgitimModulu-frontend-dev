import React, { useEffect, useState } from "react";
import {
  EMInputGroup,
  EMInputGroupPrepend,
  EMButton,
  EMFormGroup,
  EMInputGroupText,
  EMIcon,
  EMForm,
  EMInput,
  EMLabel,
  EMRow,
  EMCol,
  EMCard,
  EMCardBody,
  EMCardHeader,
  EMTextArea,
} from "../../../components/index";
import {
  emptyValidation,
  minLengthValidation,
  telValidation,
} from "../../../utilities/form/validation/validationMethods";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { updateProps } from "../../../utilities/form/validation/updateProps";
import { putSchoolProfile } from "../../../actions/shared/userActions/profileActions";
import { swalWithBootstrapButtons } from "../../../utilities/alert/MySwal";
import {
  animateUpdatedElements,
  transformTel,
} from "../../../utilities/generalUtilityMethods";
import { CLEAR_INPUTS } from "../../../constants/generalConstants";
import { fireNoDataToUpdate } from "../../../utilities/alert/alerts";
function SchoolProfilePage() {
  const { userInfo, loading, error } = useSelector(
    (state) => state.userDetails
  );
  const [updatedElements, setUpdatedElements] = useState([]);
  const [passivePersonal, setPassivePersonal] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loading === false && error === undefined) {
      animateUpdatedElements(updatedElements);
      dispatch({ type: CLEAR_INPUTS, payload: true });
      setPassivePersonal(true);
    }
  }, [loading]);

  const handleSubmit = (e, formInputs) => {
    swalWithBootstrapButtons
      .fire({
        title: "Profil bilgileriniz güncellensin mi?",
        text: "Emin misiniz?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const updatedProps = updateProps(userInfo, formInputs);
          if (updatedProps) {
            setUpdatedElements([
              ...Object.keys(updatedProps).filter((item) => item !== "id"),
            ]);
            dispatch(putSchoolProfile(updatedProps, userInfo.id));
            swalWithBootstrapButtons.fire(
              "Başarılı",
              "Kayıt Edildi",
              "success"
            );
          } else {
            fireNoDataToUpdate();
          }
        }
      });
  };
  const formArgs = {
    userInfo,
    handleSubmit,
    error,
    passivePersonal,
    setPassivePersonal,
    dispatch,
  };
  return (
    <EMRow>
      <EMCol>
        <EMCard>
          <EMCardBody>
            <EMCardHeader>
              <h4>PROFILINIZ</h4>
            </EMCardHeader>
            <PersonalForm {...formArgs} />
          </EMCardBody>
        </EMCard>
      </EMCol>
    </EMRow>
  );
}

function PersonalForm({
  userInfo,
  handleSubmit,
  error,
  passivePersonal,
  setPassivePersonal,
  dispatch,
}) {
  return (
    <EMForm
      onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}
      className="w-100 h-100 pt-2 pb-2"
      style={{ pointerEvents: passivePersonal && "none" }}
    >
      <div className="form-row">
        <div className="col">
          <EMLabel text="Kurum adı:" />
          <EMInputGroup className="mb-1">
            <EMInputGroupPrepend>
              <EMInputGroupText>
                <EMIcon name="cil-chevron-right" />
              </EMInputGroupText>
            </EMInputGroupPrepend>
            <EMInput
              type="text"
              className={passivePersonal ? "input-passive" : "input-active"}
              placeholder="Kurum adı"
              name="name"
              label="Kurum adını"
              maxLength={50}
              value={userInfo?.name}
              updateEffect
              validationMethods={[emptyValidation]}
            />
            {error &&
              error.Name &&
              error.Name.map((errMessage) => (
                <div className="is-invalid-text">{errMessage}</div>
              ))}
          </EMInputGroup>
        </div>
      </div>
      <div className="form-row" style={{ paddingTop: "30px" }}>
        <div className="col">
          <EMLabel text="Telefon:" />
          <EMInputGroup className="mb-1">
            <EMInputGroupPrepend>
              <EMInputGroupText>
                <EMIcon name="cil-phone" />
              </EMInputGroupText>
            </EMInputGroupPrepend>
            <EMInput
              type="tel"
              className={passivePersonal ? "input-passive" : "input-active"}
              placeholder="(5XX) XXX XX XX"
              name="tel"
              label="Telefon"
              maxLength={16}
              value={transformTel(userInfo?.tel)}
              updateEffect
              setInputOnValidation
              validationMethods={[
                telValidation,
                minLengthValidation(15, 10),
                emptyValidation,
              ]}
            />
            {error &&
              error.Tel &&
              error.Tel.map((errMessage) => (
                <div className="is-invalid-text">{errMessage}</div>
              ))}
          </EMInputGroup>
        </div>
      </div>
      <EMFormGroup
        className="text-center float-right"
        style={{ pointerEvents: "all" }}
      >
        <EMButton
          type="submit"
          children="Kaydet"
          className={classNames(
            passivePersonal ? "d-none" : "button-active",
            "tabbed-btn-card",
            "focused",
            "shadow-none"
          )}
          onClick={() => setPassivePersonal(false)}
        />
        <EMButton
          className={classNames("tabbed-btn-card", "focused", "shadow-none")}
          children={passivePersonal ? "Güncelle" : "İptal"}
          onClick={() => {
            if (!passivePersonal) dispatch({ type: CLEAR_INPUTS });
            setPassivePersonal(!passivePersonal);
          }}
        />
      </EMFormGroup>
    </EMForm>
  );
}

export default SchoolProfilePage;
