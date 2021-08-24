import React, { useEffect, useRef, useState } from "react";
import {
  emptyValidation,
  minLengthValidation,
  passwordValidation,
  strongPasswordValidation,
  telValidation,
} from "../../../../utilities/form/validation/validationMethods";
import { useDispatch, useSelector } from "react-redux";
import { postStudentSchool } from "../../../../actions/school/studentSchoolActions";
import { swalWithBootstrapButtons } from "../../../../utilities/alert/MySwal";
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
} from "../../../../components";
import { fireError, fireSuccess } from "../../../../utilities/alert/alerts";
import EMControlledInput from "../../../../components/form_components/EMControlledInput";
import { checkIfStudentUNExist } from "../../../../actions/shared/userActions/controlledInputActions";

function AddStudent({ options, addModal, addToggle }) {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const { loadingPost, errorPost } = useSelector(
    (state) => state.studentSchool
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
        title: "Öğrenci Kayıt Edilsin mi?",
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
            postStudentSchool({ ...formInputs, ...otherFormInputs.current })
          );
        }
      });
  };

  const header = { h: 4, text: "Yeni Öğrenci Kayıt" };
  const formArgAccount = {
    addModal,
    addToggle,
    otherFormInputs,
    options,
    handleSubmit,
  };
  const personalBtn = {
    text: "Kişisel Bilgiler",
  };
  const accountBtn = {
    text: "Hesap Bilgileri",
  };
  return (
    <EMTabbedModal
      header={header}
      tabs={[
        () => PersonalForm(formArgAccount),
        () => AccountForm(formArgAccount),
      ]}
      buttons={[personalBtn, accountBtn]}
      modalStatus={addModal}
      toggle={addToggle}
      nextPrevButtons
      otherFormInputs={otherFormInputs}
    />
  );
}

function PersonalForm({ options }) {
  return (
    <div>
      <EMForm id="add-student-form">
        <EMRow className="mt-3">
          <EMCol md="6">
            <EMLabel text="Ad:" />
            <EMInputGroup>
              <EMInput
                type="text"
                placeholder="Öğrencinin Adı"
                name="firstName"
                label="Öğrencinin Adını"
                // validationMethods={[emptyValidation]}
              />
            </EMInputGroup>
          </EMCol>
          <EMCol md="6">
            <EMLabel text="Soyad:" />
            <EMInputGroup>
              <EMInput
                type="text"
                placeholder="Öğrencinin Soyadı"
                name="lastName"
                label="Öğrencinin Soyadını"
                // validationMethods={[emptyValidation]}
              />
            </EMInputGroup>
          </EMCol>
        </EMRow>

        <EMRow className="mt-3">
          <EMCol md="6">
            <EMLabel text="Okul Numarası:" />
            <EMInputGroup>
              <EMInput
                type="number"
                placeholder="Öğrencinin Numarası"
                name="schoolNumber"
                label="Öğrencinin Numarasını"
                // validationMethods={[emptyValidation]}
              />
            </EMInputGroup>
          </EMCol>

          <EMCol md="6">
            <EMLabel text="Sınıf:" />
            <EMInputGroup>
              <select className="custom-select" name="classroomId">
                <option value="">Sınıf Seçiniz</option>
                {options &&
                  options.map((option) => {
                    return (
                      <option
                        key={option.classroomId}
                        value={option.classroomId}
                      >
                        {option.classroomName}
                      </option>
                    );
                  })}
              </select>
            </EMInputGroup>
          </EMCol>
        </EMRow>

        <EMFormGroup className="mt-3">
          <EMLabel text="Doğum Tarihi:" />
          <EMInputGroup>
            <EMInputGroupPrepend>
              <EMInputGroupText>
                <EMIcon name="cil-calendar" />
              </EMInputGroupText>
            </EMInputGroupPrepend>
            <EMInput
              type="date"
              placeholder="Öğrencinin Doğum Tarihi"
              name="birthDate"
              label="Doğum Tarihi"
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
              name="tel"
              label="Telefon"
              //eğer setInputOnValidation true verilmiş ise(girdi değeri validation metodunda değiştirilecek ise),
              //ilgili metod, arrayin 0. indexinde gönderilmelidir.
              placeholder="(5XX) XXX XX XX"
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
    </div>
  );
}
function AccountForm({ addToggle, handleSubmit }) {
  return (
    <EMForm onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}>
      <EMFormGroup className="mt-3">
        <EMLabel text="Öğrencinin Kullanıcı Adı:" />
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
            label="Öğrencinin Kullanıcı Adını"
            maxLength={20}
            delay={500}
            invalidMessage="Bu öğrenci kurumunuzda mevcut"
            action={checkIfStudentUNExist}
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
}
export default AddStudent;
