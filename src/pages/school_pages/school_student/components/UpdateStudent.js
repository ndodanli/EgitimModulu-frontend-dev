import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putStudentSchool } from "../../../../actions/school/studentSchoolActions";
import {
  emptyValidation,
  minLengthValidation,
  passwordValidation,
  strongPasswordValidation,
  telValidation,
  usernameValidation,
} from "../../../../utilities/form/validation/validationMethods";
import { swalWithBootstrapButtons } from "../../../../utilities/alert/MySwal";
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
  EMInputGroup,
  EMInputGroupPrepend,
  EMInputGroupText,
  EMFormGroup,
} from "../../../../components/index";
import { CLEAR_INPUTS } from "../../../../constants/generalConstants";
import {
  animateUpdatedTableEl,
  transformToValidTel,
} from "../../../../utilities/generalUtilityMethods";
import { updateProps } from "../../../../utilities/form/validation/updateProps";
import {
  fireError,
  fireNoDataToUpdate,
  fireSuccess,
} from "../../../../utilities/alert/alerts";
import EMControlledInput from "../../../../components/form_components/EMControlledInput";
import { checkIfStudentUNExist } from "../../../../actions/shared/userActions/controlledInputActions";

function UpdateStudent({
  updateModalStatus,
  updateToggle,
  id,
  options,
  students,
  effectId,
}) {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const { loadingPut, errorPut } = useSelector((state) => state.studentSchool);

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

  const studentDetail = students.find((s) => {
    return s.id == id;
  });

  const handleSubmit = (e, formInputs) => {
    swalWithBootstrapButtons
      .fire({
        title: "????renci bilgileri d??zenlensin mi?",
        text: "Emin misiniz?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Evet",
        cancelButtonText: "Hay??r",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          studentDetail.tel = transformToValidTel(studentDetail.tel);
          const updatedProps = updateProps(
            { ...studentDetail, password: "" },
            formInputs,
            ["passwordRepeat"]
          );
          if (updatedProps) {
            dispatch(putStudentSchool(updatedProps, studentDetail, id));
          } else {
            fireNoDataToUpdate();
          }
        }
      });
  };

  const formArg = {
    updateToggle,
    studentDetail,
    dispatch,
    options,
    handleSubmit,
  };
  const header = { text: "????renci Bilgilerini D??zenle" };

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
function PersonalForm({ updateToggle, studentDetail, options, handleSubmit }) {
  return (
    <EMForm onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}>
      <EMRow className="mt-3">
        <EMCol md="6">
          <EMLabel text="Ad:" />
          <EMInputGroup>
            <EMInput
              type="text"
              placeholder="????rencinin Ad??"
              name="firstName"
              label="????rencinin Ad??n??"
              updateEffect
              value={studentDetail?.firstName}
              // validationMethods={[emptyValidation]}
            />
          </EMInputGroup>
        </EMCol>
        <EMCol md="6">
          <EMLabel text="Soyad:" />
          <EMInputGroup>
            <EMInput
              type="text"
              placeholder="????rencinin Soyad??"
              name="lastName"
              label="????rencinin Soyad??n??"
              updateEffect
              value={studentDetail?.lastName}
              // validationMethods={[emptyValidation]}
            />
          </EMInputGroup>
        </EMCol>
      </EMRow>

      <EMRow className="mt-3">
        <EMCol md="6">
          <EMLabel text="Okul Numaras??:" />
          <EMInputGroup>
            <EMInput
              type="text"
              placeholder="????rencinin Numaras??"
              name="schoolNumber"
              label="????rencinin Numaras??n??"
              updateEffect
              value={studentDetail?.schoolNumber}
              // validationMethods={[emptyValidation]}
            />
          </EMInputGroup>
        </EMCol>

        <EMCol md="6">
          <EMFormGroup>
            <EMLabel text="S??n??f:" />
            <select
              className="custom-select"
              name="classroomId"
              defaultValue={studentDetail?.classroomId}
            >
              <option value="">S??n??f Se??iniz</option>
              {options &&
                options.map((option) => {
                  return (
                    <option key={option.classroomId} value={option.classroomId}>
                      {option.classroomName}
                    </option>
                  );
                })}
            </select>
          </EMFormGroup>
        </EMCol>
      </EMRow>

      <EMFormGroup>
        <EMLabel text="Do??um Tarihi:" />
        <EMInputGroup>
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-calendar" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="date"
            placeholder="????rencinin Do??um Tarihi"
            name="birthDate"
            label="Do??um Tarihi"
            updateEffect
            value={studentDetail?.birthDate}
            // validationMethods={[emptyValidation]}
          />
        </EMInputGroup>
      </EMFormGroup>

      <EMFormGroup>
        <EMLabel text="Telefon:" />
        <EMInputGroup className="mb-4">
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
            updateEffect
            value={studentDetail?.tel}
            //e??er setInputOnValidation true verilmi?? ise(girdi de??eri validation metodunda de??i??tirilecek ise),
            //ilgili metod, arrayin 0. indexinde g??nderilmelidir.
            placeholder="(5XX) XXX XX XX"
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
          onClick={() => updateToggle()}
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
function AccountForm({ updateToggle, studentDetail, handleSubmit }) {
  return (
    <EMForm onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}>
      <EMFormGroup className="mt-4">
        <EMLabel text="????rencinin Kullan??c?? Ad??:" />
        <EMInputGroup className="mb-3">
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-user" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMControlledInput
            type="text"
            placeholder="Kullan??c?? Ad??"
            name="username"
            label="????rencinin Kullan??c?? Ad??n??"
            updateEffect
            value={studentDetail?.username}
            maxLength={20}
            delay={500}
            invalidMessage="Bu ????renci kurumunuzda mevcut"
            action={checkIfStudentUNExist}
            validationMethods={[
              emptyValidation,
              minLengthValidation(8),
              // usernameValidation,
            ]}
          />
        </EMInputGroup>
      </EMFormGroup>
      <EMFormGroup className="mt-4">
        <EMLabel text="??ifre:" />
        <EMInputGroup className="mb-3">
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

      <EMFormGroup className="mt-4">
        <EMLabel text="??ifre Tekrar??:" />
        <EMInputGroup className="mb-4  ">
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
          onClick={() => updateToggle()}
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

export default UpdateStudent;
