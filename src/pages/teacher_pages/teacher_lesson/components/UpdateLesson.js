import React, { useEffect, useRef } from "react";
import { emptyValidation } from "../../../../utilities/form/validation/validationMethods";
import { useDispatch, useSelector } from "react-redux";
import { putLessonSchool } from "../../../../actions/school/lessonSchoolActions";
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
  EMLabel,
  EMForm,
  EMInput,
} from "../../../../components";
import { CLEAR_INPUTS } from "../../../../constants/generalConstants";
import { animateUpdatedTableEl } from "../../../../utilities/generalUtilityMethods";
import { updateProps } from "../../../../utilities/form/validation/updateProps";
import {
  fireError,
  fireNoDataToUpdate,
  fireSuccess,
} from "../../../../utilities/alert/alerts";

function UpdateLesson({
  updateModalStatus,
  updateToggle,
  id,
  effectId,
  lessons,
  options,
}) {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const { loading, error } = useSelector((state) => state.lessonSchool);
  useEffect(() => {
    if (!firstRender.current) {
      if (loading === false) {
        if (error === undefined) {
          animateUpdatedTableEl(effectId);
          dispatch({ type: CLEAR_INPUTS });
          updateToggle();
          fireSuccess();
        } else {
          fireError();
        }
      } else {
        // fireLoading();
      }
    }
    firstRender.current = false;
  }, [loading]);

  const lessonDetail = lessons.find((c) => {
    return c.id == id;
  });

  const handleSubmit = (e, formInputs) => {
    swalWithBootstrapButtons
      .fire({
        title: "Ders bilgileri düzenlensin mi?",
        text: "Emin misiniz?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const updatedProps = updateProps(lessonDetail, formInputs);
          if (updatedProps) {
            dispatch(putLessonSchool(updatedProps, lessonDetail, id));
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
          Ders Bilgilerini Düzenle
        </h4>
        <EMButtonClose
          onClick={() => updateToggle(0)}
          buttonClass="text-danger close outline-none "
        />
      </EMModalHeader>
      <EMModalBody>
        <UpdateLessonForm
          lessonDetail={lessonDetail}
          id={id}
          updateToggle={updateToggle}
          handleSubmit={handleSubmit}
          options={options}
        />
      </EMModalBody>
    </EMModal>
  );
}

function UpdateLessonForm({
  updateToggle,
  lessonDetail,
  handleSubmit,
  options,
}) {
  return (
    <EMForm
      id="update-lesson-form"
      onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}
    >
      {/* <EMFormGroup className="mt-3 mx-3">
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
            label="Ders ismini"
            validationMethods={[emptyValidation]}
            value={lessonDetail?.name}
            updateEffect={true}
          />
        </EMInputGroup>
      </EMFormGroup>
      <EMFormGroup className="mt-3 mx-3">
        <EMLabel text="Dersin Öğretmeni:" />
        <select
          className="custom-select"
          name="teacherId"
          defaultValue={lessonDetail?.teacherId}
        >
          <option value="">Derse Atanacak Öğretmen</option>
          {options &&
            options.map((option) => {
              return (
                <option key={option.teacherId} value={option.teacherId}>
                  {option.teacherName}
                </option>
              );
            })}
        </select>
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
      </EMButtonToolbar> */}
    </EMForm>
  );
}
export default UpdateLesson;
