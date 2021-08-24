import React, { useEffect, useRef, useState } from "react";
import {
  emailValidation,
  emptyValidation,
  minLengthValidation,
  passwordValidation,
  strongPasswordValidation,
  telValidation,
} from "../../../../utilities/form/validation/validationMethods";
import {
  EMButtonToolbar,
  EMTabbedModal,
  EMButton,
  EMRow,
  EMCol,
  EMInputGroup,
  EMInputGroupPrepend,
  EMInputGroupText,
  EMFormGroup,
  EMForm,
  EMLabel,
  EMInput,
  EMIcon,
} from "../../../../components/index";
import { postTeacherSchool } from "../../../../actions/school/teacherSchoolActions";
import { useDispatch, useSelector } from "react-redux";
import { swalWithBootstrapButtons } from "../../../../utilities/alert/MySwal";
import { fireError, fireSuccess } from "../../../../utilities/alert/alerts";
import { CLEAR_INPUTS } from "../../../../constants/generalConstants";
import EMControlledInput from "../../../../components/form_components/EMControlledInput";
import { checkIfTeacherUNExist } from "../../../../actions/shared/userActions/controlledInputActions";
function AddTeacher({ addModal, addToggle }) {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const { loadingPost, errorPost } = useSelector(
    (state) => state.teacherSchool
  );
  const otherFormInputs = useRef({});

  useEffect(() => {
    if (!firstRender.current) {
      if (loadingPost === false) {
        if (errorPost === undefined) {
          addToggle();
          fireSuccess();
        } else {
          fireError();
        }
      } else {
        // fireLoadingPost();
      }
    } else {
      firstRender.current = false;
    }
  }, [loadingPost]);

  const handleSubmit = (e, formInputs) => {
    swalWithBootstrapButtons
      .fire({
        title: "Öğretmen Kayıt Edilsin mi?",
        text: "Emin misiniz?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(
            postTeacherSchool({ ...formInputs, ...otherFormInputs.current })
          );
        }
      });
  };

  const formArgAccount = { addModal, addToggle, handleSubmit };
  const header = { h: 4, text: "Yeni Öğretmen Kayıt" };

  const personalBtn = {
    text: "Kişisel Bilgiler",
  };
  const accountBtn = {
    text: "Hesap Bilgileri",
  };
  return (
    <EMTabbedModal
      header={header}
      // closeButton={closeButton}
      tabs={[() => PersonalForm(), () => AccountForm(formArgAccount)]}
      buttons={[personalBtn, accountBtn]}
      modalStatus={addModal}
      toggle={addToggle}
      // size="sm"
      nextPrevButtons
      otherFormInputs={otherFormInputs}
    />
  );
}

const PersonalForm = () => {
  return (
    <EMForm id="test-id">
      <EMRow className="mt-3">
        <EMCol md="6">
          <EMLabel text="Ad:" />
          <EMInputGroup>
            {/* <EMInputGroupPrepend>
              <EMInputGroupText>
                <EMIcon name="cil-chevron-right" />
              </EMInputGroupText>
            </EMInputGroupPrepend> */}
            <EMInput
              type="text"
              placeholder="Öğretmenin Adı"
              name="firstName"
              label="Öğretmenin Adını"
              // validationMethods={[emptyValidation]}
            />
          </EMInputGroup>
        </EMCol>
        <EMCol md="6">
          <EMLabel text="Soyad:" />
          <EMInputGroup>
            <EMInput
              type="text"
              placeholder="Öğretmenin Soyadı"
              name="lastName"
              label="Öğretmenin Soyadını"
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
            validationMethods={[emailValidation]}
          />
        </EMInputGroup>
      </EMFormGroup>

      <EMFormGroup className="mt-3">
        <EMLabel text="Telefon:" />
        <EMInputGroup className="mb-4">
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-phone" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="tel"
            name="tel"
            label="Telefon"
            //eğer setInputOnValidation true verilmiş ise(girdi değeri validation metodunda değiştirilecek ise),
            //ilgili metod, arrayin 0. indexinde gönderilmelidir.
            placeholder="(5XX) XXX-XX-XX"
            maxLength={16} //parantezler ve boşluklar ile
            setInputOnValidation
            validationMethods={[
              telValidation,
              minLengthValidation(15, 10),
              // emptyValidation,
            ]}
          />
        </EMInputGroup>
      </EMFormGroup>
    </EMForm>
  );
};
const AccountForm = ({ addToggle, handleSubmit }) => {
  return (
    <EMForm
      onSubmit={(e, formInputs) => {
        handleSubmit(e, formInputs);
      }}
    >
      <EMFormGroup className="mt-3">
        <EMLabel text="Öğretmenin Kullanıcı Adı:" />
        <EMInputGroup className="mb-3">
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-user" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMControlledInput
            type="text"
            placeholder="Kullanıcı Adı"
            name="username"
            label="Öğretmenin Kullanıcı Adını"
            maxLength={20}
            delay={500}
            invalidMessage="Bu öğretmen kurumunuzda mevcut"
            action={checkIfTeacherUNExist}
            validationMethods={[emptyValidation, minLengthValidation(8)]}
          />
        </EMInputGroup>
      </EMFormGroup>

      <EMFormGroup className="mt-3">
        <EMLabel text="Şifre:" />
        <EMInputGroup className="mb-3">
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-lock-locked" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="password"
            placeholder="Şifre"
            name="password"
            label="Şifre"
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
        <EMLabel text="Şifre Tekrarı:" />
        <EMInputGroup className="mb-4  ">
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-lock-locked" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="password"
            placeholder="Şifre Tekrarı"
            label="Şifre Tekrarı"
            name="passwordRepeat"
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
          onClick={addToggle}
        >
          İptal
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
};

export default React.memo(AddTeacher, (prevInput, nextInput) => {
  return prevInput.addModal === nextInput.addModal;
});
