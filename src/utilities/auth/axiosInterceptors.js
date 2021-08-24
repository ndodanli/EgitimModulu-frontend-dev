const axios = require("axios");
const axiosApiInstance = axios.create();
let isFetchingAccessToken = false;
let subscribers = [];
function onAccessTokenFetched() {
  subscribers = subscribers.filter((callback) => callback());
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

// req
axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Accept: "application/json",
      Authorization: "Baerer ",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// res
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 403) {
      const retryOriginalRequest = new Promise((resolve) => {
        addSubscriber(() => {
          resolve(axiosApiInstance(originalRequest));
        });
      });
      if (!isFetchingAccessToken) {
        isFetchingAccessToken = true;
        await axios
          .post("api/account/RefreshToken")
          .then(() => {
            isFetchingAccessToken = false;
            onAccessTokenFetched();
          })
          .catch((err) => {
            isFetchingAccessToken = false;
            return Promise.reject(err);
          });
      }
      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);

export { axiosApiInstance };
