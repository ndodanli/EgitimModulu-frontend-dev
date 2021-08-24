export const addUpdateTime = (model) => {
  const todayDate = new Date();
  model["updatedAtDate"] =
    ("0" + todayDate.getDate()).slice(-2) +
    "/" +
    ("0" + (todayDate.getMonth() + 1)).slice(-2) +
    "/" +
    todayDate.getFullYear();
  model["updatedAtTime"] =
    ("0" + todayDate.getHours()).slice(-2) +
    ":" +
    ("0" + todayDate.getMinutes()).slice(-2);
};
