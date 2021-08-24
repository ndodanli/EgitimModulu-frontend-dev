import React, { useEffect, useRef, useState } from "react";
import { emptyValidation } from "../../../../utilities/form/validation/validationMethods";
import { useDispatch, useSelector } from "react-redux";
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
  EMCol,
  EMRow,
} from "../../../../components";
import { CLEAR_INPUTS } from "../../../../constants/generalConstants";
import { animateUpdatedTableEl } from "../../../../utilities/generalUtilityMethods";
import { updateProps } from "../../../../utilities/form/validation/updateProps";
import {
  fireError,
  fireNoDataToUpdate,
  fireSuccess,
} from "../../../../utilities/alert/alerts";
import { putExamTeacher } from "../../../../actions/teacher/examTeacherActions";

function UpdateExam({
  updateModalStatus,
  updateToggle,
  id,
  effectId,
  exams,
  options,
}) {
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  const [file, setFile] = useState({});

  const handleFileChange = (e) => {
    console.log(`e.target.files[0]`, e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const { loadingPut, errorPut } = useSelector((state) => state.examTeacher);
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
        // fireLoading();
      }
    }
    firstRender.current = false;
  }, [loadingPut]);

  const examDetail = exams.find((c) => {
    return c.id == id;
  });
  const handleSubmit = (e, formInputs) => {
    swalWithBootstrapButtons
      .fire({
        title: "Sınav bilgileri düzenlensin mi?",
        text: "Emin misiniz?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          formInputs.file = file;
          formInputs.startDate += "T" + formInputs.startTime;
          formInputs.dueDate += "T" + formInputs.dueTime;
          const updatedProps = updateProps(examDetail, formInputs);
          delete updatedProps.startTime;
          delete updatedProps.dueTime;
          if (updatedProps) {
            dispatch(putExamTeacher(updatedProps, examDetail, id));
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
          onClick={() => updateToggle()}
          buttonClass="text-danger close outline-none "
        />
      </EMModalHeader>
      <EMModalBody>
        <UpdateExamForm
          examDetail={examDetail}
          id={id}
          updateToggle={updateToggle}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
        />
      </EMModalBody>
    </EMModal>
  );
}
function UpdateExamForm({
  updateToggle,
  examDetail,
  handleSubmit,
  handleFileChange,
}) {
  return (
    <EMForm
      id="update-exam-form"
      onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}
    >
      <EMFormGroup className="mt-3 mx-3">
        <EMLabel text="Sınav İsmi:" />
        <EMInputGroup>
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-chevron-right" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="text"
            placeholder="Sınav İsmi"
            name="name"
            label="Sınav ismini"
            validationMethods={[emptyValidation]}
            value={examDetail?.name}
            updateEffect={true}
          />
        </EMInputGroup>
      </EMFormGroup>
      <EMRow className="mt-3">
        <EMCol md="6">
          <EMFormGroup className="mt-3 ml-3">
            <EMLabel text="Başlangıç Tarihi:" />
            <EMInputGroup>
              <EMInputGroupPrepend>
                <EMInputGroupText>
                  <EMIcon name="cil-calendar" />
                </EMInputGroupText>
              </EMInputGroupPrepend>
              <EMInput
                type="date"
                placeholder="Sınav Başlangıç Tarihi"
                name="startDate"
                label="Başlangıç Tarihi"
                updateEffect
                value={examDetail?.startDate.substr(0, 10)}
                // validationMethods={[emptyValidation]}
              />
            </EMInputGroup>
          </EMFormGroup>
        </EMCol>
        <EMCol md="6">
          <EMFormGroup className="mt-3 mr-3">
            <EMLabel text="Başlangıç Saati:" />
            <EMInputGroup>
              <EMInputGroupPrepend>
                <EMInputGroupText>
                  <EMIcon name="cil-calendar" />
                </EMInputGroupText>
              </EMInputGroupPrepend>
              <EMInput
                type="time"
                placeholder="Sınav Başlangıç Saati"
                name="startTime"
                label="Başlangıç Saati"
                step="1"
                updateEffect
                value={examDetail?.startDate.substr(11)}
              />
            </EMInputGroup>
          </EMFormGroup>
        </EMCol>
      </EMRow>
      <EMRow className="mt-3">
        <EMCol md="6">
          <EMFormGroup className="mt-3 ml-3">
            <EMLabel text="Bitiş Tarihi:" />
            <EMInputGroup>
              <EMInputGroupPrepend>
                <EMInputGroupText>
                  <EMIcon name="cil-calendar" />
                </EMInputGroupText>
              </EMInputGroupPrepend>
              <EMInput
                type="date"
                placeholder="Sınav Başlangıç Tarihi"
                name="dueDate"
                label="Başlangıç Tarihi"
                updateEffect
                value={examDetail?.dueDate.substr(0, 10)}
                // validationMethods={[emptyValidation]}
              />
            </EMInputGroup>
          </EMFormGroup>
        </EMCol>
        <EMCol md="6">
          <EMFormGroup className="mt-3 mr-3">
            <EMLabel text="Bitiş Saati:" />
            <EMInputGroup>
              <EMInputGroupPrepend>
                <EMInputGroupText>
                  <EMIcon name="cil-calendar" />
                </EMInputGroupText>
              </EMInputGroupPrepend>
              <EMInput
                type="time"
                placeholder="Sınav Bitiş Saati"
                name="dueTime"
                label="Bitiş Saati"
                step="1"
                updateEffect
                value={examDetail?.dueDate.substr(11)}
                // validationMethods={[emptyValidation]}
              />
            </EMInputGroup>
          </EMFormGroup>
        </EMCol>
      </EMRow>
      <EMRow className="mt-3">
        <EMCol md="6">
          <EMFormGroup className="mt-3 ml-3">
            <EMLabel text="Sınav Dosyası:" />
            <EMInputGroup>
              <EMInputGroupPrepend>
                <EMInputGroupText>
                  <EMIcon name="cil-file" />
                </EMInputGroupText>
              </EMInputGroupPrepend>
              <input
                type="file"
                className="form-control"
                // style={{ color: "transparent", width: "70px" }}
                placeholder="Dosya"
                name="file"
                label="Sınav Dosyası"
                onChange={handleFileChange}
              />
            </EMInputGroup>
          </EMFormGroup>
        </EMCol>
      </EMRow>
      <EMButtonToolbar className="justify-content-end my-4 mr-3">
        <EMButton
          className="btn btn-md mr-2 shadow-none  btn-1"
          type="button"
          onClick={() => updateToggle()}
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
export default UpdateExam;
