import React, { useEffect, useMemo, useRef } from "react";
import { EMCollapse, EMIcon } from "../../../components/index";
import { useSelector } from "react-redux";
import { NUM_OF_EXAMS_IN_PAGE } from "../../../constants/generalConstants";
import useToggle from "../../../utilities/custom_hooks/useToggle";
import {
  EMButton,
  EMCard,
  EMCardBody,
  EMCardHeader,
  EMTable,
  syncLoader,
} from "../../../components";
import { fireError, fireSuccess } from "../../../utilities/alert/alerts";
import { getExamsTeacher } from "../../../actions/teacher/examTeacherActions";
import UpdateExam from "./components/UpdateExam";
import {
  MySwal,
  swalWithBootstrapButtons,
} from "../../../utilities/alert/MySwal";
import { useDispatch } from "react-redux";
import { deleteExamTeacher } from "../../../actions/teacher/examTeacherActions";
import usePagination from "../../../components/utils/usePagination";
import { CLEAN_EXAMS_TEACHER } from "../../../constants/teacher/examConstants";
import AddExam from "./components/AddExam";
import { getSearchParam } from "../../../utilities/generalUtilityMethods";

const fields = [
  {
    key: "name",
    _style: { width: "30%" },
  },
  {
    key: "startDate",
    _style: { width: "30%" },
  },
  {
    key: "dueDate",
    _style: { width: "30%" },
  },
  {
    key: "totalTime",
    _style: { width: "30%" },
  },
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },

    clickableRows: false,
    filter: false,
  },
];

function TeacherExamPage() {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const lessonId = getSearchParam("lessonId");
  const {
    exams,
    totalItemCount,
    loadingGet,
    loadingPost,
    loadingPut,
    loadingDelete,
    errorGet,
    errorDelete,
  } = useSelector((state) => state.examTeacher);
  const examsComputed = useMemo(
    () =>
      exams?.map((exam) => {
        const startDate =
            exam.startDate.substr(0, 10) + " - " + exam.startDate.substr(11),
          dueDate =
            exam.dueDate.substr(0, 10) + " - " + exam.dueDate.substr(11);
        return { ...exam, startDate, dueDate };
      }),
    [exams]
  );
  const {
    addToggle,
    updateToggle,
    toggleDetails,
    addModal,
    updateModal,
    details,
  } = useToggle();

  const { getPage } = usePagination();

  useEffect(() => {
    if (!firstRender.current) {
      if (loadingDelete === false) {
        if (errorDelete === undefined) {
          fireSuccess("Silindi");
        } else {
          fireError();
        }
      } else {
        // fireLoadingPost();
      }
    } else {
      firstRender.current = false;
    }
  }, [loadingDelete]);

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAN_EXAMS_TEACHER });
    };
  }, []);

  const handleDelete = (e, id, query, index) => {
    e.preventDefault();
    swalWithBootstrapButtons
      .fire({
        title: "Sınav siliniyor?",
        text: "Emin misiniz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(
            deleteExamTeacher(
              id,
              getPage(),
              NUM_OF_EXAMS_IN_PAGE,
              query,
              lessonId
            )
          );
          toggleDetails(index);
        }
      });
  };
  return (
    <div>
      <EMCard>
        <EMCardHeader className="text-left">
          <h3 className="text-dark ">Sınav Yönetimi</h3>
        </EMCardHeader>
        <EMCardBody>
          {
            <EMTable
              items={
                loadingGet === false && errorGet === undefined
                  ? examsComputed
                  : null
              }
              buttons={[
                <EMButton
                  key={0}
                  onClick={addToggle}
                  className="btn btn-md shadow-none font-weight-bold btn-2"
                  type="submit"
                >
                  Yeni Sınav Ekle
                </EMButton>,
              ]}
              loading={[loadingGet, loadingPost, loadingPut, loadingDelete]}
              error={errorGet}
              loadingSlot={syncLoader}
              pagination
              numOfItemsInPage={NUM_OF_EXAMS_IN_PAGE}
              totalItemCount={totalItemCount}
              action={getExamsTeacher}
              actionParameters={{ lessonId: lessonId, inUrl: true }}
              striped
              hover
              fields={fields}
              tableFilter={{
                placeholder: "Ara... ",
                external: true,
              }}
              sorter
              footer
              columnHeaderSlot={{
                name: "Adı",
                startDate: "Başlangıç Tarihi(yyyy.aa.gg)",
                dueDate: "Bitiş Tarihi(yyyy.aa.gg)",
                totalTime: "Süre",
              }}
              scopedSlots={{
                show_details: (item, index) => {
                  return (
                    <td className="py-2">
                      <EMButton
                        className="detail-button shadow-none rounded"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          toggleDetails(index);
                        }}
                      >
                        {details.includes(index) ? "Gizle" : "Detay"}
                      </EMButton>
                    </td>
                  );
                },
                details: (item, index, query) => {
                  return (
                    <EMCollapse show={details.includes(index)}>
                      <EMCardBody>
                        <h4>{item.username}</h4>
                        <p className="text-muted">
                          Son güncellenme:{" "}
                          {item.updatedAtDate + " " + item.updatedAtTime}
                        </p>
                        <EMButton
                          id={index}
                          className="blue-button shadow-none rounded mr-2"
                          type="submit"
                          size="sm"
                          onClick={() => updateToggle(item.id, index)}
                        >
                          <EMIcon name="cil-pencil" /> Düzenle
                        </EMButton>
                        <EMButton
                          className="red-button shadow-none rounded mr-2"
                          type="submit"
                          size="sm"
                          onClick={(e) =>
                            handleDelete(e, item.id, query, index)
                          }
                        >
                          <EMIcon name="cil-trash" /> Sil
                        </EMButton>
                      </EMCardBody>
                    </EMCollapse>
                  );
                },
              }}
            />
          }
        </EMCardBody>
      </EMCard>

      {updateModal.id !== 0 && (
        <UpdateExam
          updateModalStatus={updateModal.status}
          updateToggle={updateToggle}
          id={updateModal.id}
          effectId={updateModal.effectId}
          exams={exams}
        />
      )}
      {addModal && (
        <AddExam
          addToggle={addToggle}
          addModal={addModal}
          lessonId={lessonId}
        />
      )}
    </div>
  );
}

export default TeacherExamPage;
