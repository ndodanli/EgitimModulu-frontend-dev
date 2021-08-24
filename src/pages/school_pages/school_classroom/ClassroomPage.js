import React, { useEffect, useRef } from "react";
import { EMCollapse } from "../../../components/index";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassroomsSchool,
  deleteClassRoomSchool,
} from "../../../actions/school/classroomSchoolActions";
import usePagination from "../../../components/utils/usePagination";
import { NUM_OF_CLASSROOMS_IN_PAGE } from "../../../constants/generalConstants";
import UpdateClassroom from "./components/UpdateClassroom";
import AddClassroom from "./components/AddClassroom";
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
  EMIcon,
  EMTable,
  syncLoader,
} from "../../../components/index";
import { CLEAN_CLASSROOMS_SCHOOL } from "../../../constants/school/classRoomConstants";
import { fireError, fireSuccess } from "../../../utilities/alert/alerts";

const fields = [
  { key: "name", _style: { width: "20%" } },
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },

    clickableRows: false,
    filter: false,
  },
];

function AddClassPage(props) {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const {
    loadingGet,
    loadingPost,
    loadingPut,
    loadingDelete,
    classrooms,
    totalItemCount,
    errorGet,
    errorDelete,
  } = useSelector((state) => state.classroomSchool);
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
      dispatch({ type: CLEAN_CLASSROOMS_SCHOOL });
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
            deleteClassRoomSchool(
              id,
              getPage(),
              NUM_OF_CLASSROOMS_IN_PAGE,
              query
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
          <h3 className="text-dark ">Sınıf Yönetimi</h3>
        </EMCardHeader>

        <EMCardBody>
          {
            <EMTable
              items={
                loadingGet === false && errorGet == undefined
                  ? classrooms?.map((classroom) => {
                      return {
                        ...classroom,
                        teachers: classroom.teachers?.map((teachers) => {
                          return `${teachers.teacher.firstName} ${teachers.teacher.lastName}`;
                        }),
                      };
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
                  Yeni Sınıf Ekle
                </EMButton>,
              ]}
              loading={[loadingGet, loadingPost, loadingPut, loadingDelete]}
              error={errorGet}
              loadingSlot={syncLoader}
              pagination
              numOfItemsInPage={NUM_OF_CLASSROOMS_IN_PAGE}
              totalItemCount={totalItemCount}
              action={getClassroomsSchool}
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
                name: "Sınıf",
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
        <UpdateClassroom
          updateModalStatus={updateModal.status}
          updateToggle={updateToggle}
          id={updateModal.id}
          effectId={updateModal.effectId}
          classrooms={classrooms}
        />
      )}
      {addModal && <AddClassroom addToggle={addToggle} addModal={addModal} />}
    </div>
  );
}

export default AddClassPage;
