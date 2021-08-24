import React, { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import usePagination from "../utils/usePagination";
import EMIcon from "../icon_components/EMIcon";
import { useSelector } from "react-redux";
import { fireError } from "../../utilities/alert/alerts";
Paginate.propTypes = {
  numOfItemsInPage: PropTypes.number,
  totalItemCount: PropTypes.number,
  maxPage: PropTypes.number,
  action: PropTypes.func.isRequired,
  actionParameters: PropTypes.array,
  itemListLength: PropTypes.number,
  query: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.object,
};
Paginate.defaultProps = {
  numOfItemsInPage: 7,
  totalItemCount: 1,
  maxPage: 5,
};
function Paginate({
  numOfItemsInPage,
  totalItemCount,
  maxPage,
  action,
  actionParameters,
  itemListLength,
  query,
  loading,
  error,
}) {
  const firstRender = useRef(true);
  const {
    handlePageData,
    pushPage,
    getPage,
    setSearchParams,
  } = usePagination();
  const page = getPage();

  useEffect(() => {
    //temizlemeye gerek yok
    window.onpopstate = () => {
      handlePageData(
        getPage(),
        action,
        actionParameters,
        numOfItemsInPage,
        query
      );
    };
    handlePageData(page, action, actionParameters, numOfItemsInPage, query);
  }, []);
  useEffect(() => {
    if (
      itemListLength === 0 &&
      page !== 1 &&
      loading !== true &&
      error == undefined
    ) {
      pushPage(page - 1, actionParameters);
      handlePageData(
        page - 1,
        action,
        actionParameters,
        numOfItemsInPage,
        query
      );
    }
  }, [itemListLength]);

  useEffect(() => {
    if (!firstRender.current && error) {
      fireError("Sayfa yüklenirken bir hata oluştu");
    } else {
      firstRender.current = false;
    }
  }, [error]);

  let pageCount = Math.ceil(totalItemCount / numOfItemsInPage);
  const pageMax = pageCount;
  const twoDotLimit = 7;
  const pageEffectLimit = 11;
  const pageIncLimit = 4;
  let lastDots = false;
  let firstDots = false;
  if (pageMax >= pageEffectLimit) {
    pageCount = maxPage;
    if (page >= twoDotLimit && page <= pageMax - twoDotLimit + 1) {
      firstDots = true;
      lastDots = true;
      pageCount += page - (pageIncLimit - 1);
    } else if (page < twoDotLimit) {
      lastDots = true;
      if (page >= pageIncLimit) {
        pageCount += page - (pageIncLimit - 1);
      }
    } else {
      firstDots = true;
      if (page <= pageMax - 3) {
        pageCount = pageMax - (pageMax - page) - 3;
      } else {
        pageCount = pageMax - pageCount;
      }
    }
  }

  const setPages = (currentPage) => {
    return (
      <div className="paginate-items">
        {!firstDots && lastDots ? (
          <Fragment>
            {[...Array(pageCount || currentPage).keys()].map((x) => (
              <Link
                key={x}
                className={`paginate-item ${
                  currentPage === x + 1 ? "selected" : ""
                }`}
                to={setSearchParams(x + 1, actionParameters)}
                onClick={(e) => {
                  if (currentPage === x + 1) e.preventDefault();
                  handlePageData(
                    x + 1,
                    action,
                    actionParameters,
                    numOfItemsInPage,
                    query
                  );
                }}
              >
                {x + 1}
              </Link>
            ))}
            {lastDotPart(currentPage)}
          </Fragment>
        ) : firstDots && !lastDots ? (
          <Fragment>
            {firstDotPart(currentPage)}
            {[...Array(pageMax || currentPage).keys()]
              .slice(pageCount, pageMax)
              .map((x) => (
                <Link
                  key={x}
                  className={`paginate-item ${
                    currentPage === x + 1 ? "selected" : ""
                  }`}
                  to={setSearchParams(x + 1, actionParameters)}
                  onClick={() =>
                    handlePageData(
                      x + 1,
                      action,
                      actionParameters,
                      numOfItemsInPage,
                      query
                    )
                  }
                >
                  {x + 1}
                </Link>
              ))}
          </Fragment>
        ) : firstDots && lastDots ? (
          <Fragment>
            {firstDotPart(currentPage)}

            {[...Array(pageCount || currentPage).keys()]
              .slice(currentPage - 3, currentPage + 2)
              .map((x) => (
                <Link
                  key={x}
                  className={`paginate-item ${
                    currentPage === x + 1 ? "selected" : ""
                  }`}
                  to={setSearchParams(x + 1, actionParameters)}
                  onClick={() =>
                    handlePageData(
                      x + 1,
                      action,
                      actionParameters,
                      numOfItemsInPage,
                      query
                    )
                  }
                >
                  {x + 1}
                </Link>
              ))}

            {lastDotPart(currentPage)}
          </Fragment>
        ) : (
          <Fragment>
            {[...Array(pageCount || currentPage).keys()].map((x) => (
              <Link
                key={x}
                className={`paginate-item ${
                  currentPage === x + 1 ? "selected" : ""
                }`}
                to={setSearchParams(x + 1, actionParameters)}
                onClick={() =>
                  handlePageData(
                    x + 1,
                    action,
                    actionParameters,
                    numOfItemsInPage,
                    query
                  )
                }
              >
                {x + 1}
              </Link>
            ))}
          </Fragment>
        )}
      </div>
    );
  };

  const firstDotPart = (currentPage) => {
    return (
      <Fragment>
        <Link
          className={`paginate-item ${currentPage === 1 ? "selected" : ""}`}
          to={setSearchParams(1, actionParameters)}
          onClick={() =>
            handlePageData(1, action, actionParameters, numOfItemsInPage, query)
          }
        >
          {1}
        </Link>
        <Link
          className={`paginate-item ${currentPage === 2 ? "selected" : ""}`}
          to={currentPage !== 2 && setSearchParams(2, actionParameters)}
          onClick={() =>
            handlePageData(2, action, actionParameters, numOfItemsInPage, query)
          }
        >
          {2}
        </Link>
        <a className="paginate-dots">...</a>
      </Fragment>
    );
  };

  const lastDotPart = (currentPage) => {
    return (
      <Fragment>
        <a className="paginate-dots">...</a>
        <Link
          className={`paginate-item ${
            currentPage === pageMax - 1 ? "selected" : ""
          }`}
          to={setSearchParams(pageMax - 1, actionParameters)}
          onClick={() =>
            handlePageData(
              pageMax - 1,
              action,
              actionParameters,
              numOfItemsInPage,
              query
            )
          }
        >
          {pageMax - 1}
        </Link>
        <Link
          className={`paginate-item ${
            currentPage === pageMax ? "selected" : ""
          }`}
          to={setSearchParams(pageMax, actionParameters)}
          onClick={() =>
            handlePageData(
              pageMax,
              action,
              actionParameters,
              numOfItemsInPage,
              query
            )
          }
        >
          {pageMax}
        </Link>
      </Fragment>
    );
  };

  return (
    <div className="paginate">
      <div className="paginate-flex">
        <Link
          className={`paginate-item paginate-previous ${
            page - 1 <= 0 ? "disabled" : ""
          }`}
          to={setSearchParams(page - 1 <= 0 ? 1 : page - 1, actionParameters)}
          onClick={() =>
            page - 1 > 0 &&
            handlePageData(
              page - 1 <= 0 ? 1 : page - 1,
              action,
              actionParameters,
              numOfItemsInPage,
              query
            )
          }
        >
          <EMIcon size="lg" name="cil-chevron-circle-left-alt" />
        </Link>
        {setPages(page)}
        <Link
          className={`paginate-item paginate-next ${
            page + 1 > pageMax ? "disabled" : ""
          }`}
          to={setSearchParams(
            page + 1 >= pageMax ? pageMax : page + 1,
            actionParameters
          )}
          onClick={() =>
            page + 1 <= pageMax &&
            handlePageData(
              page + 1 >= pageMax ? pageMax : page + 1,
              action,
              actionParameters,
              numOfItemsInPage,
              query
            )
          }
        >
          <EMIcon size="lg" name="cil-chevron-circle-right-alt" />
        </Link>
      </div>
    </div>
  );
}
export default Paginate;
