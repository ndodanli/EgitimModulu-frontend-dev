import React, { useEffect, useRef } from "react";
import { emptyValidation } from "../../../../utilities/form/validation/validationMethods";
import { useDispatch, useSelector } from "react-redux";
import { postClassRoomSchool } from "../../../../actions/school/classroomSchoolActions";
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
  EMLabel,
  EMIcon,
  EMForm,
  EMInput,
} from "../../../../components/index";
import { fireError, fireSuccess } from "../../../../utilities/alert/alerts";

function AddClassroom({ addToggle, addModal }) {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const { loadingPost, errorPost } = useSelector(
    (state) => state.classroomSchool
  );

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
        title: "Sınıf kayıt edilsin mi?",
        text: "Emin misiniz?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(postClassRoomSchool(formInputs));
        }
      });
  };

  return (
    <EMModal id="add-modal" size="lg" show={addModal}>
      <EMModalHeader>
        <h4 className="text-center text-dark text-uppercase">
          Yeni Sınıf Ekle
        </h4>
        <EMButtonClose onClick={addToggle} buttonClass="text-danger close " />
      </EMModalHeader>
      <EMModalBody>
        <AddClassroomForm addToggle={addToggle} handleSubmit={handleSubmit} />
      </EMModalBody>
    </EMModal>
  );
}

function AddClassroomForm({ addToggle, handleSubmit }) {
  return (
    <EMForm
      id="add-classroom-form"
      onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}
    >
      <EMFormGroup className="mt-3 mx-3">
        <EMLabel text="Sınıf İsmi:" />
        <EMInputGroup>
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-chevron-right" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="text"
            placeholder="Sınıf İsmi"
            name="name"
            label="Sınıf Adını"
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
export default AddClassroom;
