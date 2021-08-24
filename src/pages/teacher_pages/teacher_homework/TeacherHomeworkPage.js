import React, { useEffect, useMemo, useRef } from "react";
import { EMCollapse, EMIcon } from "../../../components/index";
import { useSelector } from "react-redux";
import { NUM_OF_HOMEWORKS_IN_PAGE } from "../../../constants/generalConstants";
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
import { getHomeworksTeacher } from "../../../actions/teacher/homeworkTeacherActions";
import {
  MySwal,
  swalWithBootstrapButtons,
} from "../../../utilities/alert/MySwal";
import { useDispatch } from "react-redux";
import { deleteHomeworkTeacher } from "../../../actions/teacher/homeworkTeacherActions";
import usePagination from "../../../components/utils/usePagination";
import { CLEAN_HOMEWORKS_TEACHER } from "../../../constants/teacher/homeworkConstants";
import AddHomework from "./components/AddHomework";
import UpdateHomework from "./components/UpdateHomework";
import { getSearchParam } from "../../../utilities/generalUtilityMethods";
const fields = [
  {
    key: "name",
    _style: { width: "30%" },
  },
  {
    key: "status",
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

function TeacherHomeworkPage() {
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const lessonId = getSearchParam("lessonId");

  const {
    homeworks,
    totalItemCount,
    loadingGet,
    loadingPost,
    loadingPut,
    loadingDelete,
    errorGet,
    errorDelete,
  } = useSelector((state) => state.homeworkTeacher);
  const {
    addToggle,
    updateToggle,
    toggleDetails,
    addModal,
    updateModal,
    details,
  } = useToggle();

  const homeworksComputed = useMemo(
    () =>
      homeworks?.map((homework) => {
        if (homework.status === true) homework.status = "Aktif";
        else homework.status = "Pasif";
        return homework;
      }),
    [homeworks]
  );

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
      dispatch({ type: CLEAN_HOMEWORKS_TEACHER });
    };
  }, []);

  const handleDelete = (e, id, query, index) => {
    e.preventDefault();
    swalWithBootstrapButtons
      .fire({
        title: "Ödev siliniyor?",
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
            deleteHomeworkTeacher(
              id,
              getPage(),
              NUM_OF_HOMEWORKS_IN_PAGE,
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
          <h3 className="text-dark ">Ödev Yönetimi</h3>
        </EMCardHeader>
        <EMCardBody>
          {
            <EMTable
              items={
                loadingGet === false && errorGet === undefined
                  ? homeworksComputed
                  : null
              }
              buttons={[
                <EMButton
                  key={0}
                  onClick={addToggle}
                  className="btn btn-md shadow-none font-weight-bold btn-2"
                  type="submit"
                >
                  Yeni Ödev Ekle
                </EMButton>,
              ]}
              loading={[loadingGet, loadingPost, loadingPut, loadingDelete]}
              error={errorGet}
              loadingSlot={syncLoader}
              pagination
              numOfItemsInPage={NUM_OF_HOMEWORKS_IN_PAGE}
              totalItemCount={totalItemCount}
              action={getHomeworksTeacher}
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
                status: "Durum",
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
        <UpdateHomework
          updateModalStatus={updateModal.status}
          updateToggle={updateToggle}
          id={updateModal.id}
          effectId={updateModal.effectId}
          homeworks={homeworks}
        />
      )}
      {addModal && (
        <AddHomework
          addToggle={addToggle}
          addModal={addModal}
          lessonId={lessonId}
        />
      )}
    </div>
  );
}

export default TeacherHomeworkPage;
