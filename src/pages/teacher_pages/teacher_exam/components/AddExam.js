import React, { useEffect, useRef, useState } from "react";
import { emptyValidation } from "../../../../utilities/form/validation/validationMethods";
import { useDispatch, useSelector } from "react-redux";
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
  EMRow,
  EMCol,
} from "../../../../components/index";
import { postExamTeacher } from "../../../../actions/teacher/examTeacherActions";
import { CLEAR_INPUTS } from "../../../../constants/generalConstants";
import { fireError, fireSuccess } from "../../../../utilities/alert/alerts";

function AddExam({ addToggle, addModal, lessonId }) {
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  const [file, setFile] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const { loadingPost, errorPost } = useSelector((state) => state.examTeacher);
  useEffect(() => {
    if (!firstRender.current) {
      if (loadingPost === false) {
        if (errorPost === undefined) {
          dispatch({ type: CLEAR_INPUTS });
          addToggle();
          fireSuccess();
        } else {
          fireError();
        }
      } else {
        // fireLoading();
      }
    }
    firstRender.current = false;
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
          formInputs.file = file;
          console.log(`formInputs`, formInputs);
          formInputs.startDate += "T" + formInputs.startTime;
          formInputs.dueDate += "T" + formInputs.dueTime;
          delete formInputs.startTime;
          delete formInputs.dueTime;
          formInputs["lessonId"] = lessonId;
          dispatch(postExamTeacher(formInputs));
        }
      });
  };
  return (
    <EMModal id="add-modal" size="lg" show={addModal}>
      <EMModalHeader>
        <h4 className="text-center text-dark text-uppercase">
          Yeni Sınav Ekle
        </h4>
        <EMButtonClose onClick={addToggle} buttonClass="text-danger close " />
      </EMModalHeader>
      <EMModalBody>
        <AddExamForm
          addToggle={addToggle}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
        />
      </EMModalBody>
    </EMModal>
  );
}

function AddExamForm({ addToggle, handleSubmit, handleFileChange }) {
  return (
    <EMForm
      id="add-exam-form"
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
                validationMethods={[emptyValidation]}
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
                step="1"
                label="Başlangıç Saati"
                validationMethods={[emptyValidation]}
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
                label="Bitiş Tarihi"
                validationMethods={[emptyValidation]}
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
                step="1"
                label="Bitiş Saati"
                validationMethods={[emptyValidation]}
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
          onClick={() => addToggle()}
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
export default AddExam;
