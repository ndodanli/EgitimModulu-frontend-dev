import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const MySwal = withReactContent(Swal);
export const swalWithBootstrapButtons = MySwal.mixin({
  customClass: {
    confirmButton: "btn btn-square btn-success",
    cancelButton: "btn btn-square btn-danger mr-2",
  },
  buttonsStyling: false,
});
