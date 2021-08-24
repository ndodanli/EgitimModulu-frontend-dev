import { swalWithBootstrapButtons } from "./MySwal";

export const fireSuccess = (text = "Kayıt edildi") => {
  return swalWithBootstrapButtons.fire({
    icon: "success",
    title: "Başarılı",
    text: text,
  });
};
export const fireError = (errorMessage = "Bir hata oluştu") => {
  return swalWithBootstrapButtons.fire({
    icon: "error",
    title: "Üzgünüz",
    text: errorMessage,
  });
};
export const fireNoDataToUpdate = () => {
  return swalWithBootstrapButtons.fire({
    icon: "info",
    title: "Veri yok",
    text: "Güncellenecek veri bulunamadı",
  });
};
// export const fireLoading = () => {
//   swalWithBootstrapButtons.fire({
//     icon: "error",
//     title: "Üzgünüz",
//     text: "Bir hata oluştu",
//   });
// };
