import React, { useEffect, useRef } from "react";
import { EMCollapse, EMIcon } from "../../../components/index";
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
  EMCard,
  EMCardBody,
  EMCardHeader,
  EMTable,
  syncLoader,
} from "../../../components";
import { getTeacherListSchool } from "../../../actions/school/teacherSchoolActions";
import { CLEAN_LESSONS_SCHOOL } from "../../../constants/school/lessonConstants";
import { fireError, fireSuccess } from "../../../utilities/alert/alerts";

const fields = [
  {
    key: "name",
    _style: { width: "30%" },
  },
  { key: "lessonCode", _style: { width: "10%" } },
  { key: "teacherName", _style: { width: "30%" } },
  { key: "teacherUsername", _style: { width: "30%" } },
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },

    clickableRows: false,
    filter: false,
  },
];

function LessonPage() {
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  const {
    loadingGet,
    loadingPost,
    loadingPut,
    loadingDelete,
    lessons,
    totalItemCount,
    errorGet,
    errorDelete,
  } = useSelector((state) => state.lessonSchool);

  const { teachers } = useSelector((state) => state.teacherListSchool);

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
    dispatch(getTeacherListSchool());
    return () => {
      dispatch({ type: CLEAN_LESSONS_SCHOOL });
    };
  }, []);

  const { getPage } = usePagination();
  const {
    addToggle,
    updateToggle,
    toggleDetails,
    addModal,
    updateModal,
    details,
  } = useToggle();

  const handleDelete = (e, id, query, index) => {
    e.preventDefault();
    swalWithBootstrapButtons
      .fire({
        title: "Ders kaydı silinsin mi?",
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
            deleteLessonSchool(id, getPage(), NUM_OF_LESSONS_IN_PAGE, query)
          );
          toggleDetails(index);
        }
      });
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
                loadingGet === false && errorGet === undefined
                  ? lessons?.map((lesson) => {
                      const lessonSTeacher = teachers?.find((teacher) => {
                        return lesson.teacherId === teacher.teacherId;
                      });
                      lesson.teacherName = lessonSTeacher
                        ? lessonSTeacher.teacherName
                        : "Öğretmen atanmadı";
                      lesson.teacherUsername = lessonSTeacher
                        ? lessonSTeacher.teacherUsername
                        : "Öğretmen atanmadı";
                      return lesson;
                    })
                  : null
              }
              buttons={[
                <EMButton
                  key={0}
                  onClick={addToggle}
                  className="btn btn-md shadow-none font-weight-bold  btn-2"
                  type="submit"
                >
                  Yeni Ders Ekle
                </EMButton>,
              ]}
              loading={[loadingGet, loadingPost, loadingPut, loadingDelete]}
              error={errorGet}
              loadingSlot={syncLoader}
              pagination
              numOfItemsInPage={NUM_OF_LESSONS_IN_PAGE}
              totalItemCount={totalItemCount}
              action={getLessonsSchool}
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
                lessonCode: "Ders Kodu",
                teacherName: "Ders Öğretmeninin Adı",
                teacherUsername: "Ders Öğretmeninin Kullanıcı Adı",
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
        <UpdateLesson
          updateModalStatus={updateModal.status}
          updateToggle={updateToggle}
          id={updateModal.id}
          effectId={updateModal.effectId}
          lessons={lessons}
          options={teachers}
        />
      )}
      {addModal && <AddLesson addToggle={addToggle} addModal={addModal} />}
    </div>
  );
}

export default LessonPage;
