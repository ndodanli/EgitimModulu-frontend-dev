import React, { useEffect, useMemo, useRef } from "react";
import {
  EMCol,
  EMCollapse,
  EMIcon,
  EMLink,
  EMRow,
} from "../../../components/index";
import { useDispatch, useSelector } from "react-redux";
import {
  getLessonsSchool,
  deleteLessonSchool,
} from "../../../actions/school/lessonSchoolActions";
import usePagination from "../../../components/utils/usePagination";
import { NUM_OF_LESSONS_IN_PAGE } from "../../../constants/generalConstants";
import UpdateLesson from "./components/UpdateLesson";
import AddLesson from "./components/AddLesson";
import {
  MySwal,
  swalWithBootstrapButtons,
} from "../../../utilities/alert/MySwal";
import useToggle from "../../../utilities/custom_hooks/useToggle";
import {
  EMButton,
  EMButtonToolbar,
  EMCard,
  EMCardBody,
  EMCardHeader,
  EMTable,
  syncLoader,
} from "../../../components";
import { getTeacherListSchool } from "../../../actions/school/teacherSchoolActions";
import { getLessonsTeacher } from "../../../actions/teacher/lessonTeacherActions";
import { fireError, fireSuccess } from "../../../utilities/alert/alerts";
import { Link } from "react-router-dom";

const fields = [
  {
    key: "name",
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

function TeacherLessonPage() {
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  const {
    lessons,
    totalItemCount,
    loadingGet,
    loadingPost,
    loadingPut,
    loadingDelete,
    errorGet,
    errorDelete,
  } = useSelector((state) => state.lessonTeacher);

  const { getPage } = usePagination();
  const {
    addToggle,
    updateToggle,
    toggleDetails,
    addModal,
    updateModal,
    details,
  } = useToggle();

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
      // dispatch({ type: CLEAN_TEACHERS_SCHOOL });
    };
  }, []);

  const handleDelete = (e, id, query, index) => {
    e.preventDefault();
    // swalWithBootstrapButtons
    //   .fire({
    //     title: "Ders kaydı siliniyor?",
    //     text: "Emin misiniz?",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonText: "Evet",
    //     cancelButtonText: "Hayır",
    //     reverseButtons: true,
    //   })
    //   .then((result) => {
    //     if (result.isConfirmed) {
    //       dispatch(
    //         deleteLessonSchool(id, getPage(), NUM_OF_TEACHERS_IN_PAGE, query)
    //       );
    //       toggleDetails(index);
    //     }
    //   });
  };

  return (
    <div>
      <EMCard>
        <EMCardHeader className="text-left">
          <h3 className="text-dark ">Ders Yönetimi</h3>
        </EMCardHeader>
        <EMCardBody>
          {
            <EMTable
              items={
                loadingGet === false && errorGet === undefined ? lessons : null
              }
              loading={[loadingGet, loadingPost, loadingPut, loadingDelete]}
              error={errorGet}
              loadingSlot={syncLoader}
              pagination
              numOfItemsInPage={NUM_OF_LESSONS_IN_PAGE}
              totalItemCount={totalItemCount}
              action={getLessonsTeacher}
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
                name: "Ders Adı",
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
                        <div className="d-flex flex-column">
                          <EMLink
                            to={{
                              pathname: "/teacher-exams",
                              search: "lessonId=" + item.id,
                            }}
                          >
                            Sınav Yönetimi
                          </EMLink>
                          <Link
                            to={{
                              pathname: "/teacher-homeworks",
                              search: "lessonId=" + item.id,
                            }}
                          >
                            Ödev Yönetimi
                          </Link>
                        </div>
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
        <UpdateLesson
          updateModalStatus={updateModal.status}
          updateToggle={updateToggle}
          id={updateModal.id}
          effectId={updateModal.effectId}
          lessons={lessons}
        />
      )}
      {addModal && <AddLesson addToggle={addToggle} addModal={addModal} />}
    </div>
  );
}

export default TeacherLessonPage;
