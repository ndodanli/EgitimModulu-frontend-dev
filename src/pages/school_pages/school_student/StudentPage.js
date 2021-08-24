import React, { useEffect, useRef } from "react";
import { EMCollapse } from "../../../components/index";
import { useSelector, useDispatch } from "react-redux";
import {
  getStudentsSchool,
  deleteStudentSchool,
} from "../../../actions/school/studentSchoolActions";
import { getClassroomListSchool } from "../../../actions/school/classroomSchoolActions";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";
import { NUM_OF_STUDENTS_IN_PAGE } from "../../../constants/generalConstants";
import usePagination from "../../../components/utils/usePagination";
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
  EMIcon,
  syncLoader,
} from "../../../components/index";
import { transformTel } from "../../../utilities/generalUtilityMethods";
import { CLEAN_STUDENTS_SCHOOL } from "../../../constants/school/studentConstants";
import { fireError, fireSuccess } from "../../../utilities/alert/alerts";

function Students() {
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  const {
    loadingGet,
    loadingPost,
    loadingPut,
    loadingDelete,
    students,
    totalItemCount,
    errorGet,
    errorDelete,
  } = useSelector((state) => state.studentSchool);
  const { classrooms } = useSelector((state) => state.classroomListSchool);

  const { getPage } = usePagination();

  const fields = [
    { key: "firstName", _style: { width: "15%" } },
    { key: "lastName", _style: { width: "15%" } },
    { key: "schoolNumber", _style: { width: "15%" } },
    { key: "tel", _style: { width: "15%" } },
    { key: "classroomName", _style: { width: "15%" } },
    { key: "username", _style: { width: "15%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "5%" },
      sorter: false,
      filter: false,
    },
  ];

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
      dispatch({ type: CLEAN_STUDENTS_SCHOOL });
    };
  }, []);

  const handleDelete = (e, id, query, index) => {
    e.preventDefault();
    swalWithBootstrapButtons
      .fire({
        title: "Öğrenci kaydı Siliniyor?",
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
            deleteStudentSchool(id, getPage(), NUM_OF_STUDENTS_IN_PAGE, query)
          );
          toggleDetails(index);
        }
      });
  };

  useEffect(() => {
    dispatch(getClassroomListSchool());
  }, []);

  return (
    <div>
      <EMCard>
        <EMCardHeader className="text-left">
          <h3 className="text-dark ">Öğrenci Yönetimi</h3>
        </EMCardHeader>
        <EMCardBody>
          {
            <EMTable
              items={
                loadingGet === false && errorGet === undefined
                  ? students?.map((std) => {
                      std.tel = transformTel(std.tel);
                      std.classroomName = classrooms?.filter(
                        (cr) => cr.classroomId === Number(std.classroomId)
                      )[0]?.classroomName;
                      return std;
                    })
                  : null
              }
              buttons={[
                <EMButton
                  key={0}
                  onClick={addToggle}
                  className="btn btn-md shadow-none font-weight-bold btn-2"
                  type="submit"
                >
                  Yeni Öğrenci Ekle
                </EMButton>,
              ]}
              loading={[loadingGet, loadingPost, loadingPut, loadingDelete]}
              error={errorGet}
              loadingSlot={syncLoader}
              pagination
              numOfItemsInPage={NUM_OF_STUDENTS_IN_PAGE}
              totalItemCount={totalItemCount}
              action={getStudentsSchool}
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
                id: "ID",
                firstName: "Adı",
                lastName: "Soyadı",
                schoolNumber: "Öğrenci Numarası",
                tel: "Telefon",
                classroomName: "Sınıf",
                username: "Kullanıcı Adı",
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
        <UpdateStudent
          updateModalStatus={updateModal.status}
          updateToggle={updateToggle}
          id={updateModal.id}
          effectId={updateModal.effectId}
          options={classrooms}
          students={students}
        />
      )}
      {addModal && (
        <AddStudent
          options={classrooms}
          addToggle={addToggle}
          addModal={addModal}
        />
      )}
    </div>
  );
}

export default Students;
