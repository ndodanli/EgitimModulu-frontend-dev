export const isOnLastPage = (totalItemCount, listLength, numOfItemsInPage) => {
  let currentPage = new URLSearchParams(window.location.search).get("page");
  if (!currentPage) currentPage = 1;
  let lastPage = Math.ceil(totalItemCount / numOfItemsInPage);
  if (lastPage === 0) lastPage = 1;
  if (Number(currentPage) === lastPage && listLength < numOfItemsInPage) {
    return true;
  }
  return false;
};

export const getBrowser = () => {
  var ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: "IE", version: tem[1] || "" };
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) {
      return { name: "Opera", version: tem[1] };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1],
  };
};

export const animateUpdatedElements = (updatedElements) => {
  updatedElements.forEach((el) => {
    const element = document.getElementsByName(el)[0];
    if (element) {
      element.parentElement.animate(
        [
          // keyframes
          { boxShadow: "0 0 10px -5px #90ee90" },
          { boxShadow: "0 0 10px 5px #90ee90" },
        ],
        {
          // timing options
          duration: 2000,
          iterations: 1,
          easing: "ease",
        }
      );
    }
  });
};
export const animateUpdatedTableEl = (upElId) => {
  const element = document.getElementById(upElId).parentElement.parentElement
    .parentElement.parentElement.previousElementSibling;
  if (element) {
    element.animate(
      [
        // keyframes
        { boxShadow: "0 0 10px -5px #90ee90" },
        { boxShadow: "0 0 10px 5px #90ee90" },
      ],
      {
        // timing options
        duration: 2000,
        iterations: 1,
        easing: "ease",
      }
    );
  }
};
export const transformTel = (tel) => {
  const valid = tel?.replace(/[^0-9\.]+/g, "");
  if (valid) {
    return (
      "(" +
      valid.substring(0, 3) +
      ") " +
      valid.substring(3, 6) +
      " " +
      valid.substring(6, 8) +
      " " +
      valid.substring(8)
    );
  } else {
    return null;
  }
};
export const transformToValidTel = (tel) => {
  return tel?.replace(/[^0-9\.]+/g, "");
};
export const getSearchParam = (searchParam) => {
  return new URLSearchParams(window.location.search).get(searchParam);
};
