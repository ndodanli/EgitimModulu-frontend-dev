import React, { useEffect, useRef } from "react";
import { emptyValidation } from "../../../../utilities/form/validation/validationMethods";
import { putClassRoomSchool } from "../../../../actions/school/classroomSchoolActions";
import { useSelector, useDispatch } from "react-redux";
import { swalWithBootstrapButtons } from "../../../../utilities/alert/MySwal";
import {
  EMModal,
  EMModalBody,
  EMButtonToolbar,
  EMButton,
  EMModalHeader,
  EMButtonClose,
  EMFormGroup,
  EMInputGroup,
  EMInputGroupPrepend,
  EMInputGroupText,
  EMIcon,
  EMForm,
  EMInput,
  EMLabel,
} from "../../../../components/index";
import { CLEAR_INPUTS } from "../../../../constants/generalConstants";
import { updateProps } from "../../../../utilities/form/validation/updateProps";
import { animateUpdatedTableEl } from "../../../../utilities/generalUtilityMethods";
import {
  fireError,
  fireNoDataToUpdate,
  fireSuccess,
} from "../../../../utilities/alert/alerts";
function UpdateClassroom({
  id,
  updateToggle,
  updateModalStatus,
  classrooms,
  effectId,
}) {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const { loadingPut, errorPut } = useSelector(
    (state) => state.classroomSchool
  );

  useEffect(() => {
    if (!firstRender.current) {
      if (loadingPut === false) {
        if (errorPut === undefined) {
          animateUpdatedTableEl(effectId);
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

  const classroomDetail = classrooms.find((c) => {
    return c.id == id;
  });

  const handleSubmit = (e, formInputs) => {
    swalWithBootstrapButtons
      .fire({
        title: "Sınıf düzenlensin mi?",
        text: "Emin misiniz?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const updatedProps = updateProps(classroomDetail, formInputs);
          if (updatedProps) {
            dispatch(putClassRoomSchool(updatedProps, classroomDetail, id));
          } else {
            fireNoDataToUpdate();
          }
        }
      });
  };

  return (
    <EMModal size="lg" show={updateModalStatus} onClose={updateToggle}>
      <EMModalHeader>
        <h4 className="text-center text-dark text-uppercase ">
          Sınıf Bilgilerini Düzenle
        </h4>
        <EMButtonClose
          onClick={() => updateToggle(0)}
          buttonClass="text-danger close outline-none "
        />
      </EMModalHeader>
      <EMModalBody>
        <UpdateClassroomForm
          classroomDetail={classroomDetail}
          id={id}
          updateToggle={updateToggle}
          handleSubmit={handleSubmit}
        />
      </EMModalBody>
    </EMModal>
  );
}

function UpdateClassroomForm({ updateToggle, classroomDetail, handleSubmit }) {
  return (
    <EMForm onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}>
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
            value={classroomDetail?.name}
            updateEffect
          />
        </EMInputGroup>
      </EMFormGroup>
      <EMButtonToolbar className="justify-content-end my-4 mr-3">
        <EMButton
          className="btn btn-md mr-2 shadow-none  btn-1"
          type="button"
          onClick={() => updateToggle(0)}
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
export default UpdateClassroom;
