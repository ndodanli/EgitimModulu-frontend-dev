import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { putTeacherSchool } from "../../../../actions/school/teacherSchoolActions";
import { swalWithBootstrapButtons } from "../../../../utilities/alert/MySwal";
import { useSelector } from "react-redux";
import {
  EMButton,
  EMButtonToolbar,
  EMCol,
  EMRow,
  EMTabbedModal,
  EMIcon,
  EMForm,
  EMInput,
  EMLabel,
  EMFormGroup,
  EMInputGroup,
  EMInputGroupPrepend,
  EMInputGroupText,
} from "../../../../components/index";
import {
  emailValidation,
  emptyValidation,
  minLengthValidation,
  passwordValidation,
  strongPasswordValidation,
  telValidation,
} from "../../../../utilities/form/validation/validationMethods";
import { updateProps } from "../../../../utilities/form/validation/updateProps";
import {
  animateUpdatedTableEl,
  transformToValidTel,
} from "../../../../utilities/generalUtilityMethods";
import { CLEAR_INPUTS } from "../../../../constants/generalConstants";
import {
  fireError,
  fireNoDataToUpdate,
  fireSuccess,
} from "../../../../utilities/alert/alerts";
import EMControlledInput from "../../../../components/form_components/EMControlledInput";
import { checkIfTeacherUNExist } from "../../../../actions/shared/userActions/controlledInputActions";
function UpdateTeacher({
  updateModalStatus,
  updateToggle,
  id,
  effectId,
  teachers,
}) {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const { loadingPut, errorPut } = useSelector((state) => state.teacherSchool);

  useEffect(() => {
    if (!firstRender.current) {
      if (loadingPut === false) {
        if (errorPut === undefined) {
          animateUpdatedTableEl(effectId);
          dispatch({ type: CLEAR_INPUTS });
          updateToggle();
          fireSuccess();
        } else {
          fireError();
        }
      } else {
        // fireLoadingPut();
      }
    } else {
      firstRender.current = false;
    }
  }, [loadingPut]);

  const teacherDetail = teachers.find((c) => {
    return c.id == id;
  });

  const handleSubmit = (e, formInputs) => {
    swalWithBootstrapButtons
      .fire({
        title: "????retmen bilgileri d??zenlensin mi?",
        text: "Emin misiniz?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Evet",
        cancelButtonText: "Hay??r",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          teacherDetail.tel = transformToValidTel(teacherDetail.tel);
          const updatedProps = updateProps(
            { ...teacherDetail, password: "" },
            formInputs,
            ["passwordRepeat"]
          );
          if (updatedProps) {
            dispatch(putTeacherSchool(updatedProps, teacherDetail, id));
          } else {
            fireNoDataToUpdate();
          }
        }
      });
  };
  const formArg = { updateToggle, teacherDetail, dispatch, handleSubmit };
  const header = { text: "????retmen Bilgilerini D??zenle" };
  const personalBtn = {
    text: "Ki??isel Bilgiler",
  };
  const accountBtn = {
    text: "Hesap Bilgileri",
  };
  return (
    <EMTabbedModal
      header={header}
      tabs={[() => PersonalForm(formArg), () => AccountForm(formArg)]}
      buttons={[personalBtn, accountBtn]}
      modalStatus={updateModalStatus}
      toggle={() => updateToggle(0)}
    />
  );
}

function PersonalForm({ updateToggle, teacherDetail, handleSubmit }) {
  return (
    <EMForm onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}>
      <EMRow className="mt-3">
        <EMCol md="6">
          <EMLabel text="Ad:" />
          <EMInputGroup>
            <EMInput
              type="text"
              placeholder="????retmenin Ad??"
              name="firstName"
              label="????retmenin Ad??n??"
              updateEffect
              value={teacherDetail?.firstName}
              // validationMethods={[emptyValidation]}
            />
          </EMInputGroup>
        </EMCol>
        <EMCol md="6">
          <EMLabel text="Soyad:" />
          <EMInputGroup>
            <EMInput
              type="text"
              placeholder="????retmenin Soyad??"
              name="lastName"
              label="????retmenin Soyad??n??"
              updateEffect
              value={teacherDetail?.lastName}
              // validationMethods={[emptyValidation]}
            />
          </EMInputGroup>
        </EMCol>
      </EMRow>

      <EMFormGroup className="mt-3">
        <EMLabel text="E-mail Adresi:" />
        <EMInputGroup>
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-envelope-closed" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="email"
            placeholder="Email"
            name="emailAddress"
            label="Email"
            updateEffect
            value={teacherDetail?.emailAddress}
            validationMethods={[emailValidation]}
          />
        </EMInputGroup>
      </EMFormGroup>

      <EMFormGroup className="mt-3">
        <EMLabel text="Telefon:" />
        <EMInputGroup>
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-phone" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="tel"
            placeholder="Telefon"
            name="tel"
            label="Telefon"
            value={teacherDetail?.tel}
            updateEffect
            //e??er setInputOnValidation true verilmi?? ise(girdi de??eri validation metodunda de??i??tirilecek ise),
            //ilgili metod, arrayin 0. indexinde g??nderilmelidir.
            placeholder="(5XX) XXX-XX-XX"
            maxLength={16} //parantezler ve bo??luklar ile
            setInputOnValidation
            validationMethods={[
              telValidation,
              minLengthValidation(15, 10),
              // emptyValidation,
            ]}
          />
        </EMInputGroup>
      </EMFormGroup>
      <EMButtonToolbar className="justify-content-end mt-5">
        <EMButton
          className="btn btn-md mr-2 shadow-none  btn-1"
          type="button"
          onClick={() => updateToggle(0)}
        >
          ??ptal
        </EMButton>
        <EMButton
          className="btn btn-md w-25 shadow-none text-uppercase btn-2"
          type="submit"
        >
          Kaydet
        </EMButton>
      </EMButtonToolbar>
    </EMForm>
  );
}
function AccountForm({ updateToggle, teacherDetail, handleSubmit }) {
  return (
    <EMForm onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}>
      <EMFormGroup className="mt-3">
        <EMLabel text=" Kullan??c?? Ad??:" />
        <EMInputGroup>
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-user" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMControlledInput
            type="text"
            placeholder="Kullan??c?? Ad??"
            name="username"
            label="????retmenin Kullan??c?? Ad??n??"
            updateEffect
            value={teacherDetail?.username}
            maxLength={20}
            delay={500}
            invalidMessage="Bu ????retmen kurumunuzda mevcut"
            action={checkIfTeacherUNExist}
            validationMethods={[emptyValidation, minLengthValidation(8)]}
          />
        </EMInputGroup>
      </EMFormGroup>
      <EMFormGroup className="mt-3">
        <EMLabel text="??ifre:" />
        <EMInputGroup>
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-lock-locked" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="password"
            placeholder="??ifre"
            name="password"
            label="??ifre"
            updateEffect
            maxLength={20}
            getOtherInputsOnValidation
            validationMethods={[
              emptyValidation,
              passwordValidation,
              strongPasswordValidation,
            ]}
          />
        </EMInputGroup>
      </EMFormGroup>
      <EMFormGroup className="mt-3">
        <EMLabel text="??ifre Tekrar??:" />
        <EMInputGroup>
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-lock-locked" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="password"
            placeholder="??ifre Tekrar??"
            label="??ifre Tekrar??"
            name="passwordRepeat"
            updateEffect
            maxLength={20}
            getOtherInputsOnValidation
            validationMethods={[
              emptyValidation,
              passwordValidation,
              strongPasswordValidation,
            ]}
          />
        </EMInputGroup>
      </EMFormGroup>
      <EMButtonToolbar className="justify-content-end mt-5">
        <EMButton
          className="btn btn-md mr-2 shadow-none  btn-1"
          type="button"
          onClick={() => updateToggle(0)}
        >
          ??ptal
        </EMButton>
        <EMButton
          className="btn btn-md w-25 shadow-none text-uppercase btn-2"
          type="submit"
        >
          Kaydet
        </EMButton>
      </EMButtonToolbar>
    </EMForm>
  );
}
export default UpdateTeacher;
