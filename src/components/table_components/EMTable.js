import React, { useState, useRef, useMemo, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import style from "./EMTable.module.css";
import { EMIcon } from "../index";
import { cilArrowTop, cilBan, cilFilterX } from "@coreui/icons";
import "./EMTable.props.css";
import Paginate from "./Paginate";
import usePagination from "../utils/usePagination";
import EMControlledInput from "../form_components/EMControlledInput";
import EMSearchInput from "../form_components/EMSearchInput";

const EMTable = (props) => {
  const {
    innerRef,
    overTableSlot,
    columnHeaderSlot,
    sortingIconSlot,
    columnFilterSlot,
    noItemsViewSlot,
    noItemsView,
    captionSlot,
    footerSlot,
    underTableSlot,
    theadTopSlot,
    loadingSlot,
    scopedSlots,
    loading,
    error,
    fields,
    pagination,
    activePage,
    numOfItemsInPage,
    totalItemCount,
    action,
    actionParameters,
    items,
    sorter,
    header,
    clickableRows,
    columnFilter,
    tableFilterValue,
    tableFilter,
    cleaner,
    addTableClasses,
    size,
    dark,
    striped,
    hover,
    border,
    outlined,
    responsive,
    footer,
    numOfItemsInPageSelect,
    sorterValue,
    buttons,
    columnFilterValue,
    onRowClick,
    onSorterValueChange,
    onPaginationChange,
    onColumnFilterChange,
    onPagesChange,
    onTableFilterChange,
    onPageChange,
    onFilteredItemsChange,
  } = props;
  const compData = useRef({ firstRun: true, columnFiltered: 0, changeItems: 0 })
    .current;

  //
  const [perPageItems, setPerPageItems] = useState(numOfItemsInPage);
  const [sorterState, setSorterState] = useState(sorterValue || {});
  const [tableFilterState, setTableFilterState] = useState(tableFilterValue);
  const [columnFilterState, setColumnFilterState] = useState(
    columnFilterValue || {}
  );
  const [page, setPage] = useState(activePage || 1);
  const [passedItems, setPassedItems] = useState(items || []);
  const [tableSpace, setTableSpace] = useState(0);
  const tSpace = useRef(null);
  // functions

  const cellClass = (item, colName, index) => {
    let classes = [];
    if (item._cellClasses && item._cellClasses[colName]) {
      classes.push(item._cellClasses[colName]);
    }
    if (fields && fields[index]._classes) {
      classes.push(fields[index]._classes);
    }
    return classes;
  };
  useEffect(() => {}, [tSpace.current]);
  const pretifyName = (name) => {
    return name
      .replace(/[-_.]/g, " ")
      .replace(/ +/g, " ")
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const headerClass = (i) => fields && fields[i]._classes && fields[i]._classes;

  const isSortable = (i) => {
    const isDataColumn = itemsDataColumns.includes(rawColumnNames[i]);
    return sorter && (!fields || fields[i].sorter !== false) && isDataColumn;
  };

  const headerStyles = (index) => {
    let style = { verticalAlign: "middle", overflow: "hidden" };
    if (isSortable(index)) {
      style.cursor = "pointer";
    }
    if (fields && fields[index] && fields[index]._style) {
      return { ...style, ...fields[index]._style };
    }
    return style;
  };

  const getIconState = (index) => {
    const direction = sorterState.asc ? "asc" : "desc";
    return rawColumnNames[index] === sorterState.column ? direction : 0;
  };

  const iconClasses = (index) => {
    const state = getIconState(index);
    return [
      "position-absolute",
      style["icon-transition"],
      style["arrow-position"],
      !state && style["transparent"],
      state === "desc" && style["rotate-icon"],
    ];
  };

  const rowClicked = (item, index, e, detailsClick = false) => {
    onRowClick &&
      onRowClick(item, index, getClickedColumnName(e, detailsClick), e);
  };

  const changeSort = (column, index) => {
    if (!isSortable(index)) {
      return;
    }
    //if column changed or sort was descending change asc to true
    const state = sorterState;
    const columnRepeated = state.column === column;
    if (!sorter || !sorter.resetable) {
      state.column = column;
    } else {
      state.column = columnRepeated && state.asc === false ? null : column;
    }
    state.asc = !(columnRepeated && state.asc);
    setSorterState({ ...state });
  };

  useEffect(() => {
    onSorterValueChange && onSorterValueChange(sorterState);
  }, [JSON.stringify(sorterState)]);

  const paginationChange = (e) => {
    onPaginationChange && onPaginationChange(Number(e.target.value));
    !numOfItemsInPageSelect.external && setPerPageItems(Number(e.target.value));
  };

  const columnFilterEvent = (colName, value, type) => {
    const isLazy = columnFilter && columnFilter.lazy === true;
    if ((isLazy && type === "input") || (!isLazy && type === "change")) {
      return;
    }
    const newState = { ...columnFilterState, [`${colName}`]: value };
    setColumnFilterState(newState);
  };

  useEffect(() => {
    onColumnFilterChange && onColumnFilterChange(columnFilterState);
  }, [JSON.stringify(columnFilterState)]);

  const timeOut = useRef(null);
  const { handlePageData, pushPage } = usePagination();
  const tableFilterChange = (value, type) => {
    const isLazy = tableFilter && tableFilter.lazy === true;
    if ((isLazy && type === "input") || (!isLazy && type === "change")) {
      return;
    }
    setTableFilterState(value);
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      handlePageData(1, action, actionParameters, numOfItemsInPage, value);
      pushPage(1);
    }, 400);
  };
  const handleSearch = (value) => {
    handlePageData(1, action, actionParameters, numOfItemsInPage, value);
    pushPage(1);
  };
  // useEffect(() => {
  //   onTableFilterChange && onTableFilterChange(tableFilterState);
  // }, [tableFilterState]);

  const getClickedColumnName = (e, detailsClick) => {
    if (detailsClick) {
      return "details";
    } else {
      const children = Array.from(e.target.closest("tr").children);
      const clickedCell = children.filter((child) =>
        child.contains(e.target)
      )[0];
      return rawColumnNames[children.indexOf(clickedCell)];
    }
  };

  const clean = () => {
    setTableFilterState("");
    setColumnFilterState({});
    setSorterState({
      column: "",
      asc: true,
    });
  };

  // computed

  const genCols = Object.keys(passedItems[0] || {}).filter(
    (el) => el.charAt(0) !== "_"
  );

  const rawColumnNames = fields ? fields.map((el) => el.key || el) : genCols;

  const itemsDataColumns = rawColumnNames.filter((name) =>
    genCols.includes(name)
  );

  useMemo(() => {
    compData.columnFiltered++;
  }, [
    JSON.stringify(columnFilter),
    JSON.stringify(columnFilterState),
    itemsDataColumns.join(""),
    compData.changeItems,
  ]);

  const columnFiltered = useMemo(() => {
    let items = passedItems;
    if (columnFilter && columnFilter.external) {
      return items;
    }
    Object.entries(columnFilterState).forEach(([key, value]) => {
      const columnFilter = String(value).toLowerCase();
      if (columnFilter && itemsDataColumns.includes(key)) {
        items = items.filter((item) => {
          return String(item[key]).toLowerCase().includes(columnFilter);
        });
      }
    });
    return items;
  }, [compData.columnFiltered]);

  const tableFiltered = useMemo(() => {
    let items = columnFiltered;
    if (!tableFilterState || (tableFilter && tableFilter.external)) {
      return items;
    }
    const filter = tableFilterState.toLowerCase();
    const valueContainFilter = (val) =>
      String(val).toLowerCase().includes(filter);
    items = items.filter((item) => {
      return !!itemsDataColumns.find((key) => valueContainFilter(item[key]));
    });
    return items;
  }, [compData.columnFiltered, tableFilterState, JSON.stringify(tableFilter)]);

  const sortedItems = useMemo(() => {
    const col = sorterState.column;
    if (
      !col ||
      !itemsDataColumns.includes(col) ||
      (sorter && sorter.external)
    ) {
      return tableFiltered;
    }
    //if values in column are to be sorted by numeric value they all have to be type number
    const flip = sorterState.asc ? 1 : -1;
    const sorted = tableFiltered.slice().sort((item, item2) => {
      const value = item[col];
      const value2 = item2[col];
      const a = typeof value === "number" ? value : String(value).toLowerCase();
      const b =
        typeof value2 === "number" ? value2 : String(value2).toLowerCase();
      return a > b ? 1 * flip : b > a ? -1 * flip : 0;
    });
    return sorted;
  }, [
    JSON.stringify(tableFiltered),
    JSON.stringify(sorterState),
    JSON.stringify(sorter),
  ]);

  useEffect(() => {
    !compData.firstRun &&
      onFilteredItemsChange &&
      onFilteredItemsChange(sortedItems);
  }, [JSON.stringify(sortedItems)]);

  const tableClasses = [
    "table",
    {
      [`table-${size}`]: size,
      "table-dark": dark,
      "table-hover": hover,
      "table-bordered": border,
      border: outlined,
    },
    addTableClasses,
  ];

  const columnNames = useMemo(() => {
    if (fields) {
      return fields.map((f) => {
        return f.label !== undefined ? f.label : pretifyName(f.key || f);
      });
    }
    return rawColumnNames.map((el) => pretifyName(el));
  }, [fields, rawColumnNames]);

  const sortingIconStyles = sorter && "position-relative pr-4";

  const colspan = rawColumnNames.length;

  const totalPages = Math.ceil(sortedItems.length / perPageItems) || 1;
  useMemo(() => {
    !compData.firstRun && onPagesChange && onPagesChange(totalPages);
  }, [totalPages]);

  const computedPage = useMemo(() => {
    const compPage = pagination ? page : activePage;
    !compData.firstRun && onPageChange && onPageChange(compPage);
    return compPage;
  }, [page, activePage, pagination]);

  const firstItemIndex = (computedPage - 1) * perPageItems || 0;

  const paginatedItems = sortedItems.slice(
    firstItemIndex,
    firstItemIndex + perPageItems
  );
  const currentItems = computedPage ? paginatedItems : sortedItems;
  const tableFilterData = {
    label: tableFilter && tableFilter.label,
    placeholder: (tableFilter && tableFilter.placeholder) || "type string...",
  };

  const paginationSelect = {
    label:
      (numOfItemsInPageSelect && numOfItemsInPageSelect.label) ||
      "Items per page:",
    values: (numOfItemsInPageSelect && numOfItemsInPageSelect.values) || [
      5,
      10,
      20,
      50,
    ],
  };

  const noItemsText = (() => {
    const customValues = noItemsView || {};
    if (passedItems.length) {
      return customValues.noResults || "Sonuç bulunamadı";
    }
    return customValues.noItems || "Liste boş";
  })();

  const isFiltered =
    tableFilterState ||
    sorterState.column ||
    Object.values(columnFilterState).join("");

  const cleanerProps = {
    content: cilFilterX,
    className: `ml-2 ${isFiltered ? "text-danger" : "transparent"}`,
    role: isFiltered ? "button" : null,
    tabIndex: isFiltered ? 0 : null,
  };

  // watch
  useMemo(() => setPerPageItems(numOfItemsInPage), [numOfItemsInPage]);

  useMemo(() => setSorterState({ ...sorterValue }), [sorterValue]);

  useMemo(() => setTableFilterState(tableFilterValue), [tableFilterValue]);

  useMemo(() => setColumnFilterState({ ...columnFilterValue }), [
    columnFilterValue,
  ]);

  //items
  useMemo(() => {
    if (
      items &&
      !compData.firstRun &&
      (items.length !== passedItems.length ||
        JSON.stringify(items) !== JSON.stringify(passedItems))
    ) {
      setPassedItems(items);
      compData.changeItems++;
    }
  });

  // render
  compData.firstRun = false;

  const headerContent = (
    <tr>
      {columnNames.map((name, index) => {
        return (
          <th
            onClick={() => {
              changeSort(rawColumnNames[index], index);
            }}
            className={classNames([headerClass(index), sortingIconStyles])}
            style={headerStyles(index)}
            key={index}
          >
            {columnHeaderSlot[`${rawColumnNames[index]}`] || (
              <div className="d-inline">{name}</div>
            )}
            {isSortable(index) &&
              ((sortingIconSlot &&
                sortingIconSlot(getIconState(index), iconClasses(index))) || (
                <EMIcon
                  customClasses={classNames(iconClasses(index))}
                  width={18}
                  content={cilArrowTop}
                />
              ))}
          </th>
        );
      })}
    </tr>
  );

  //gerekli boşluklar ile birlikte loading
  const getLoading = () => {
    return [...Array(numOfItemsInPage + 1).keys()].map((key) => {
      if (Math.floor(numOfItemsInPage / 2) == key + 1) {
        return (
          <tr>
            <td
              className="text-center"
              colSpan={colspan}
              style={{ padding: 0, border: "none" }}
            >
              <div
                style={{
                  height: 0,
                }}
              >
                {loadingSlot}
              </div>
            </td>
          </tr>
        );
      } else {
        return (
          <Fragment>
            <tr>
              <td className="l-s-1" key={key}>
                t
              </td>
            </tr>
            <tr className="p-0 l-s-2" key={key}>
              <td colSpan={colspan} className="p-0 l-s-2"></td>
            </tr>
          </Fragment>
        );
      }
    });
  };
  return (
    <React.Fragment>
      {(numOfItemsInPageSelect || tableFilter || cleaner) && (
        <div className="form-group row ml-0 mr-0" ref={innerRef}>
          {(tableFilter || cleaner) && (
            <div className="d-flex w-100" style={{ justifyContent: "stretch" }}>
              {tableFilter && (
                <div className="col-xs-3 d-flex">
                  {tableFilterData.label && (
                    <label className="mr-2">{tableFilterData.label}</label>
                  )}
                  <EMSearchInput
                    type="text"
                    placeholder={tableFilterData.placeholder}
                    value={tableFilterState || ""}
                    // name="username"
                    maxLength={150}
                    delay={300}
                    loading={loading[0]}
                    action={handleSearch}
                  />
                </div>
              )}
              <div
                className="flex-grow-1 d-flex justify-content-end"
                // style={{ flex: "1 1 auto" }}
              >
                {buttons}
              </div>
              {cleaner &&
                (typeof cleaner === "function" ? (
                  cleaner(clean, isFiltered, cleanerProps)
                ) : (
                  <EMIcon {...cleanerProps} onClick={clean} />
                ))}
            </div>
          )}
          {numOfItemsInPageSelect && (
            <div
              className={
                "col-sm-6 p-0" + (!(tableFilter || cleaner) && " offset-sm-6")
              }
            >
              <div className="form-inline justify-content-sm-end">
                <label className="mr-2">{paginationSelect.label}</label>
                <select
                  className="form-control"
                  onChange={paginationChange}
                  aria-label="changes number of visible items"
                >
                  <option value="" disabled hidden>
                    {perPageItems}
                  </option>
                  {paginationSelect.values.map((number, key) => {
                    return (
                      <option val={number} key={key}>
                        {number}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}
        </div>
      )}
      {overTableSlot}
      <div className={`position-relative ${responsive && "table-responsive"}`}>
        <table className={classNames(tableClasses)}>
          <thead>
            {theadTopSlot}
            {header && headerContent}
            {columnFilter && (
              <tr className="table-sm">
                {rawColumnNames.map((colName, index) => {
                  return (
                    <th className={classNames(headerClass(index))} key={index}>
                      {columnFilterSlot[`${rawColumnNames[index]}`] ||
                        ((!fields || fields[index].filter !== false) && (
                          <input
                            className="form-control form-control-sm"
                            onInput={(e) => {
                              columnFilterEvent(
                                colName,
                                e.target.value,
                                "input"
                              );
                            }}
                            onChange={(e) => {
                              columnFilterEvent(
                                colName,
                                e.target.value,
                                "change"
                              );
                            }}
                            value={columnFilterState[colName] || ""}
                            aria-label={`column name: '${colName}' filter input`}
                          />
                        ))}
                    </th>
                  );
                })}
              </tr>
            )}
          </thead>
          <tbody style={clickableRows ? { cursor: "pointer" } : {}}>
            {loading?.some((iterator) => iterator === true) ? (
              getLoading()
            ) : !currentItems.length ? (
              <tr>
                <td colSpan={colspan}>
                  {noItemsViewSlot || (
                    <div className="text-center my-5">
                      <h2>
                        {noItemsText + " "}
                        <EMIcon
                          width="30"
                          name="cilBan"
                          content={cilBan}
                          className="text-danger mb-2"
                        />
                      </h2>
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              currentItems.map((item, itemIndex) => {
                return (
                  <React.Fragment key={itemIndex}>
                    <tr
                      key={itemIndex}
                      className={classNames(item._classes, {
                        "em-striped": striped && itemIndex % 2 !== 0,
                      })}
                      tabIndex={clickableRows && 0}
                      onClick={(e) => {
                        rowClicked(item, itemIndex + firstItemIndex, e);
                      }}
                    >
                      {rawColumnNames.map((colName, index) => {
                        return (
                          (scopedSlots[colName] &&
                            React.cloneElement(
                              scopedSlots[colName](
                                item,
                                itemIndex + firstItemIndex
                              ),
                              { key: index }
                            )) || (
                            <td
                              className={classNames(
                                cellClass(item, colName, index)
                              )}
                              key={index}
                            >
                              {String(item[colName])}
                            </td>
                          )
                        );
                      })}
                    </tr>
                    {scopedSlots.details && (
                      <tr
                        onClick={(e) => {
                          rowClicked(item, itemIndex + firstItemIndex, e, true);
                        }}
                        className="p-0"
                        style={{ border: "none !important" }}
                        key={"details" + itemIndex}
                      >
                        <td
                          colSpan={colspan}
                          className="p-0"
                          style={{ border: "none !important" }}
                        >
                          {scopedSlots.details(
                            item,
                            itemIndex + firstItemIndex,
                            tableFilterState
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
          {footer && currentItems.length > 0 && <tfoot>{headerContent}</tfoot>}
          {footerSlot}
          {captionSlot}
        </table>
      </div>
      {underTableSlot}
      {pagination && (
        <Paginate
          numOfItemsInPage={numOfItemsInPage}
          totalItemCount={totalItemCount}
          action={action}
          actionParameters={actionParameters}
          itemListLength={items?.length}
          query={tableFilterState}
          loading={loading[0]}
          error={error}
        />
      )}
    </React.Fragment>
  );
};

EMTable.propTypes = {
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  overTableSlot: PropTypes.node,
  columnHeaderSlot: PropTypes.object,
  sortingIconSlot: PropTypes.func,
  columnFilterSlot: PropTypes.object,
  noItemsViewSlot: PropTypes.node,
  noItemsView: PropTypes.object,
  captionSlot: PropTypes.node,
  footerSlot: PropTypes.node,
  underTableSlot: PropTypes.node,
  scopedSlots: PropTypes.object,
  theadTopSlot: PropTypes.node,
  loadingSlot: PropTypes.node,
  loading: PropTypes.arrayOf(PropTypes.bool),
  fields: PropTypes.array,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  activePage: PropTypes.number,
  numOfItemsInPage: PropTypes.number,
  items: PropTypes.array,
  error: PropTypes.object,
  sorter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  buttons: PropTypes.arrayOf(PropTypes.element),
  clickableRows: PropTypes.bool,
  columnFilter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  tableFilterValue: PropTypes.string,
  tableFilter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  cleaner: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  addTableClasses: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  size: PropTypes.string,
  dark: PropTypes.bool,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  border: PropTypes.bool,
  outlined: PropTypes.bool,
  totalItemCount: PropTypes.number,
  action: PropTypes.func,
  actionParameters: PropTypes.object,
  responsive: PropTypes.bool,
  footer: PropTypes.bool,
  numOfItemsInPageSelect: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  sorterValue: PropTypes.object,
  columnFilterValue: PropTypes.object,
  header: PropTypes.bool,
  onRowClick: PropTypes.func,
  onSorterValueChange: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onColumnFilterChange: PropTypes.func,
  onPagesChange: PropTypes.func,
  onTableFilterChange: PropTypes.func,
  onPageChange: PropTypes.func,
  onFilteredItemsChange: PropTypes.func,
};

EMTable.defaultProps = {
  numOfItemsInPage: 7,
  responsive: true,
  columnHeaderSlot: {},
  columnFilterSlot: {},
  scopedSlots: {},
  sorterValue: {},
  header: true,
  loading: [false],
  tableFilter: { external: true },
};

export default EMTable;
