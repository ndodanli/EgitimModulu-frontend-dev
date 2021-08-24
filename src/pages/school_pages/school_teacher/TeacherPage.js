import React, { useEffect, useRef } from "react";
import { EMCollapse } from "../../../components/index";
import {
  getTeachersSchool,
  deleteTeacherSchool,
} from "../../../actions/school/teacherSchoolActions";
import { useSelector, useDispatch } from "react-redux";
import usePagination from "../../../components/utils/usePagination";
import { NUM_OF_TEACHERS_IN_PAGE } from "../../../constants/generalConstants";
import AddTeacher from "./components/AddTeacher";
import UpdateTeacher from "./components/UpdateTeacher";
import useToggle from "../../../utilities/custom_hooks/useToggle";
import {
  EMButton,
  EMCard,
  EMCardBody,
  EMCardHeader,
  syncLoader,
  EMTable,
  EMIcon,
} from "../../../components/index";
import { transformTel } from "../../../utilities/generalUtilityMethods";
import { CLEAN_TEACHERS_SCHOOL } from "../../../constants/school/teacherConstants";
import { fireError, fireSuccess } from "../../../utilities/alert/alerts";
import { swalWithBootstrapButtons } from "../../../utilities/alert/MySwal";

const fields = [
  { key: "firstName", _style: { width: "15%" } },
  { key: "lastName", _style: { width: "15%" } },
  { key: "username", _style: { width: "15%" } },
  { key: "emailAddress", _style: { width: "15%" } },
  { key: "tel", _style: { width: "15%" } },

  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    clickableRows: false,
    filter: false,
  },
];

function TeacherPage() {
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  const {
    loadingGet,
    loadingPost,
    loadingPut,
    loadingDelete,
    teachers,
    totalItemCount,
    errorGet,
    errorDelete,
  } = useSelector((state) => state.teacherSchool);
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
      dispatch({ type: CLEAN_TEACHERS_SCHOOL });
    };
  }, []);

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
        title: "Öğretmen kaydı Siliniyor?",
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
            deleteTeacherSchool(id, getPage(), NUM_OF_TEACHERS_IN_PAGE, query)
          );
          toggleDetails(index);
        }
      });
  };

  return (
    <div>
      <EMCard>
        <EMCardHeader className="text-left">
          <h3 className="text-dark ">Öğretmen Yönetimi</h3>
        </EMCardHeader>

        <EMCardBody>
          {
            <EMTable
              items={
                loadingGet === false && errorGet === undefined
                  ? teachers?.map((teacher) => {
                      teacher.tel = transformTel(teacher.tel);
                      return teacher;
                    })
                  : null
              }
              fields={fields}
              buttons={[
                <EMButton
                  key={0}
                  onClick={addToggle}
                  className="btn btn-md shadow-none font-weight-bold  btn-2"
                  type="submit"
                >
                  Yeni Öğretmen Ekle
                </EMButton>,
              ]}
              loading={[loadingGet, loadingPost, loadingPut, loadingDelete]}
              error={errorGet}
              loadingSlot={syncLoader}
              pagination
              numOfItemsInPage={NUM_OF_TEACHERS_IN_PAGE}
              totalItemCount={totalItemCount}
              action={getTeachersSchool}
              striped
              hover
              tableFilter={{
                placeholder: "Ara... ",
                external: true,
              }}
              sorter
              footer
              columnHeaderSlot={{
                firstName: "Öğretmen Adı",
                lastName: "Öğretmen Soyadı",
                username: "Kullanıcı Adı",
                branch: "Öğretmenin Branşı",
                emailAddress: "E-Mail",
                phone: "Telefon",
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
                        <h4>{item.firstName + " " + item.lastName}</h4>
                        <p className="text-muted">
                          Son güncellenme:{" "}
                          {item.updatedAtDate + " " + item.updatedAtTime}
                        </p>

                        <EMButton
                          id={index}
                          className="blue-button shadow-none rounded mr-2  "
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
        <UpdateTeacher
          updateModalStatus={updateModal.status}
          updateToggle={updateToggle}
          id={updateModal.id}
          effectId={updateModal.effectId}
          teachers={teachers}
        />
      )}
      {addModal && <AddTeacher addToggle={addToggle} addModal={addModal} />}
    </div>
  );
}

export default TeacherPage;
