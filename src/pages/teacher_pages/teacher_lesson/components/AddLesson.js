import React from "react";
import { emptyValidation } from "../../../../utilities/form/validation/validationMethods";
import { useDispatch } from "react-redux";
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

function AddLesson({ addToggle, addModal }) {
  const dispatch = useDispatch();
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
          swalWithBootstrapButtons.fire("Başarılı", "Kayıt Edildi", "success");
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
