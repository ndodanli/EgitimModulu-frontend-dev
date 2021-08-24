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
import { postHomeworkTeacher } from "../../../../actions/teacher/homeworkTeacherActions";
import { CLEAR_INPUTS } from "../../../../constants/generalConstants";
import { fireError, fireSuccess } from "../../../../utilities/alert/alerts";

function AddHomework({ addToggle, addModal, lessonId }) {
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  const [file, setFile] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const { loadingPost, errorPost } = useSelector(
    (state) => state.homeworkTeacher
  );
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
    formInputs.file = file;
    swalWithBootstrapButtons
      .fire({
        title: "Ödev kayıt edilsin mi?",
        text: "Emin misiniz?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(`formInputs`, formInputs);
          formInputs.startDate += "T" + formInputs.startTime;
          formInputs.dueDate += "T" + formInputs.dueTime;
          delete formInputs.startTime;
          delete formInputs.dueTime;
          formInputs["lessonId"] = lessonId;
          dispatch(postHomeworkTeacher(formInputs));
        }
      });
  };
  return (
    <EMModal id="add-modal" size="lg" show={addModal}>
      <EMModalHeader>
        <h4 className="text-center text-dark text-uppercase">Yeni Ödev Ekle</h4>
        <EMButtonClose onClick={addToggle} buttonClass="text-danger close " />
      </EMModalHeader>
      <EMModalBody>
        <AddHomeworkForm
          addToggle={addToggle}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
        />
      </EMModalBody>
    </EMModal>
  );
}

function AddHomeworkForm({ addToggle, handleSubmit, handleFileChange }) {
  return (
    <EMForm
      id="add-homework-form"
      onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}
    >
      <EMFormGroup className="mt-3 mx-3">
        <EMLabel text="Ödev Adı:" />
        <EMInputGroup>
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-chevron-right" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="text"
            placeholder="Ödev Adı"
            name="name"
            label="Ödev ismini"
            validationMethods={[emptyValidation]}
          />
        </EMInputGroup>
      </EMFormGroup>
      <EMFormGroup className="mt-3 mx-3">
        <EMLabel text="Ödev Konusu:" />
        <EMInputGroup>
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-chevron-right" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="text"
            placeholder="Ödev Konusu"
            name="subject"
            label="Ödev konusunu"
            validationMethods={[emptyValidation]}
          />
        </EMInputGroup>
      </EMFormGroup>
      <EMFormGroup className="mt-3 mx-3">
        <EMLabel text="Ödev İçeriği:" />
        <EMInputGroup>
          <EMInputGroupPrepend>
            <EMInputGroupText>
              <EMIcon name="cil-chevron-right" />
            </EMInputGroupText>
          </EMInputGroupPrepend>
          <EMInput
            type="text"
            placeholder="Ödev İçeriği"
            name="content"
            label="Ödev içeriğini"
            validationMethods={[emptyValidation]}
          />
        </EMInputGroup>
      </EMFormGroup>
      <EMRow className="mt-3">
        <EMCol md="6">
          <EMFormGroup className="mt-3 ml-3">
            <EMLabel text="Ödev Dosyası:" />
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
                label="Ödev Dosyası"
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
export default AddHomework;
