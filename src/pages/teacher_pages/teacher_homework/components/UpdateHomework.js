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
import { putHomeworkTeacher } from "../../../../actions/teacher/homeworkTeacherActions";

function UpdateHomework({
  updateModalStatus,
  updateToggle,
  id,
  effectId,
  homeworks,
  options,
}) {
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  const [file, setFile] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const { loadingPut, errorPut } = useSelector(
    (state) => state.homeworkTeacher
  );
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

  const homeworkDetail = homeworks.find((c) => {
    return c.id == id;
  });
  const handleSubmit = (e, formInputs) => {
    console.log(`formInputs`, formInputs);

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
          const updatedProps = updateProps(homeworkDetail, formInputs);
          if (updatedProps) {
            dispatch(putHomeworkTeacher(updatedProps, homeworkDetail, id));
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
        <UpdateHomeworkForm
          homeworkDetail={homeworkDetail}
          id={id}
          updateToggle={updateToggle}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
        />
      </EMModalBody>
    </EMModal>
  );
}
function UpdateHomeworkForm({
  updateToggle,
  homeworkDetail,
  handleSubmit,
  handleFileChange,
}) {
  return (
    <EMForm
      id="update-exam-form"
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
            updateEffect
            value={homeworkDetail?.name}
            validationMethods={[emptyValidation]}
          />
        </EMInputGroup>
      </EMFormGroup>
      {/* <EMFormGroup className="mt-3 mx-3">
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
            value={homeworkDetail?.subject}
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
            value={homeworkDetail?.content}
            validationMethods={[emptyValidation]}
          />
        </EMInputGroup>
      </EMFormGroup> */}
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
export default UpdateHomework;
