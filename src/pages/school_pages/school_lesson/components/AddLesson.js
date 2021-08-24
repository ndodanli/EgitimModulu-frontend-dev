import React, { useEffect, useRef } from "react";
import {
  emptyValidation,
  minLengthValidation,
} from "../../../../utilities/form/validation/validationMethods";
import { useDispatch, useSelector } from "react-redux";
import { postLessonSchool } from "../../../../actions/school/lessonSchoolActions";
import { swalWithBootstrapButtons } from "../../../../utilities/alert/MySwal";
import {
  EMModal,
  EMModalHeader,
  EMButtonClose,
  EMModalBody,
  EMButton,
  EMButtonToolbar,
  EMInputGroup,
  EMInputGroupPrepend,
  EMInputGroupText,
  EMFormGroup,
  EMIcon,
  EMForm,
  EMInput,
  EMLabel,
} from "../../../../components/index";
import EMControlledInput from "../../../../components/form_components/EMControlledInput";
import { checkIfLessonCodeExist } from "../../../../actions/shared/userActions/controlledInputActions";
import { CLEAR_INPUTS } from "../../../../constants/generalConstants";
import { fireError, fireSuccess } from "../../../../utilities/alert/alerts";

function AddLesson({ addToggle, addModal }) {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const { loadingPost, errorPost } = useSelector((state) => state.lessonSchool);
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
        title: "Ders kayıt edilsin mi?",
        text: "Emin misiniz?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(postLessonSchool(formInputs));
        }
      });
  };
  return (
    <EMModal id="add-modal" size="lg" show={addModal}>
      <EMModalHeader>
        <h4 className="text-center text-dark text-uppercase">Yeni Ders Ekle</h4>
        <EMButtonClose onClick={addToggle} buttonClass="text-danger close " />
      </EMModalHeader>
      <EMModalBody>
        <AddLessonForm addToggle={addToggle} handleSubmit={handleSubmit} />
      </EMModalBody>
    </EMModal>
  );
}

function AddLessonForm({ addToggle, handleSubmit }) {
  return (
    <EMForm
      id="add-lesson-form"
      onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}
    >
      <EMFormGroup className="mt-3 mx-3">
        <EMLabel text="Ders İsmi:" />
        <EMInputGroup>
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-chevron-right" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="text"
            placeholder="Ders İsmi"
            name="name"
            label="Ders adını"
            validationMethods={[emptyValidation]}
          />
        </EMInputGroup>
      </EMFormGroup>
      <EMFormGroup className="mt-3 mx-3">
        <EMLabel text="Ders Kodu:" />
        <EMInputGroup>
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-barcode" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMControlledInput
            type="text"
            placeholder="Ders Kodu"
            maxLength={6}
            name="lessonCode"
            label="Ders kodunu"
            invalidMessage="Bu ders kodunu zaten kullanıyorsunuz"
            action={checkIfLessonCodeExist}
            validationMethods={[emptyValidation, minLengthValidation(6)]}
          />
        </EMInputGroup>
      </EMFormGroup>
      <EMButtonToolbar className="justify-content-end my-4 mr-3">
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
export default AddLesson;
