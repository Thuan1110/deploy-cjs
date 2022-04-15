import FeedIcon from "@mui/icons-material/Feed";
import SortIcon from "@mui/icons-material/Sort";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { url } from "../../../url";
import "../../editor/css/reports_body.css";
import PostSearchDate from "./PostSearchDate";
import PostSearchStatus from "./PostSearchStatus";
import parse from "html-react-parser";

function Reports_body() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const history = useHistory();
  const [status, setStatus] = React.useState("");
  const [selectedId, setSelectedId] = React.useState("");
  const token = sessionStorage.getItem("token");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openSort = Boolean(anchorEl);
  const handleClickSort = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSort = () => {
    setAnchorEl(null);
  };
  /*********************************** */
  const [page, setPage] = useState({
    pageIndex: 1,
    pageSize: 5,
    status: 2,
    createdDateFrom: "",
    sortField: "createdDate",
    isSortDesc: false,
  });
  const [totalRows, setTotalRows] = useState();
  const totalPages = Math.ceil(totalRows / page.pageSize);
  const handlePageIndexChange = (event, value) => {
    setPage({ ...page, pageIndex: value });
  };
  const [render, setRender] = useState(true);
  /*********************************** */

  //GET Reports List
  const [reports, setReports] = useState([]);

  const getReportsList = async () => {
    const response = await fetch(
      url +
        "Report/list?Status=" +
        page.status +
        "&CreatedDateFrom=" +
        page.createdDateFrom +
        "&PageSize=" +
        page.pageSize +
        "&PageIndex=" +
        page.pageIndex +
        "&SortField=" +
        page.sortField +
        "&isSortDesc=" +
        page.isSortDesc,

      {
        method: "get",

        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    const reports = data.content;

    setReports(reports.items);

    setTotalRows(reports.totalRecord);
  };

  useEffect(() => {
    getReportsList();
  }, [page, render]);
  /********************************************** */

  //GET Reports List With Status=2
  const [totalRowsReportCreated, setTotalRowsReportCreated] = useState();
  const getTotalRowsReportCreated = async () => {
    const response = await fetch(
      url +
        "Report/list?" +
        "PageSize=" +
        page.pageSize +
        "&PageIndex=" +
        page.pageIndex +
        "&status=2",
      {
        method: "get",

        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    const reports = data.content;

    setTotalRowsReportCreated(reports.totalRecord);
  };

  useEffect(() => {
    getTotalRowsReportCreated();
  }, [page, render]);

  const handleView = (id) => {
    history.push({
      pathname: "/report_detail",
      state: {
        reportId: id,
      },
    });
  };

  const handleFiltersChangeDate = (newFilters) => {
    setPage({ ...page, pageIndex: 1, createdDateFrom: newFilters.searchDate });
  };
  const handleFiltersChangeStatus = (newFilters) => {
    setPage({ ...page, pageIndex: 1, status: newFilters.searchStatus });
  };

  const truncate = (str, max, len) => {
    return str.length > max ? str.substring(0, len) + "..." : str;
  };
  const [orderASC, setOrderASC] = useState("ASC");
  const [orderDESC, setOrderDESC] = useState("DESC");
  const sortingASC = (col) => {
    if (orderASC === "ASC") {
      const sorted = [...reports].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setReports(sorted);
      setOrderDESC("DESC");
      setPage({
        ...page,
        pageIndex: 1,
        sortField: "createdDate",
        isSortDesc: false,
      });
    }
  };
  const sortingDSC = (col) => {
    if (orderDESC === "DESC") {
      const sorted = [...reports].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setReports(sorted);
      setOrderASC("ASC");
      setPage({
        ...page,
        pageIndex: 1,
        sortField: "createdDate",
        isSortDesc: true,
      });
    }
  };
  return (
    <div className="staff_home_container">
      <div>
        <div className="statistics_reports">
          <div className="total_reports">
            <div
              style={{
                width: "150px",
                height: "auto",
                textAlign: "center",
              }}
            >
              <FeedIcon fontSize="large" style={{ color: "#f3f5f9" }} />
              <p style={{ color: "#f3f5f9" }}>Total Reports</p>
            </div>
            <div>
              <p style={{ fontSize: "35px", color: "#f3f5f9" }}>{totalRows}</p>
            </div>
          </div>
          <div className="created_reports">
            <div
              style={{
                width: "150px",
                height: "auto",
                textAlign: "center",
              }}
            >
              <FeedIcon fontSize="large" style={{ color: "#f3f5f9" }} />
              <p style={{ color: "#f3f5f9" }}>Created Reports</p>
            </div>
            <div>
              <p style={{ fontSize: "35px", color: "#f3f5f9" }}>
                {totalRowsReportCreated}
              </p>
            </div>
          </div>
          {/* <div className="pending_reports">
            <div
              style={{
                width: "150px",
                height: "auto",
                textAlign: "center",
              }}
            >
              <PendingActionsIcon
                fontSize="large"
                style={{ color: "#f3f5f9" }}
              />
              <p style={{ color: "#f3f5f9" }}>Pending Reports</p>
            </div>
            <div>
              <p style={{ fontSize: "35px", color: "#f3f5f9" }}>2</p>
            </div>
          </div> */}
        </div>
        <div
          style={{
            width: "1000px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: "180px",
            }}
          >
            <p
              style={{
                fontSize: "25px",
                textTransform: "capitalize",
                color: "black",
                textAlign: "left",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              Reports List
            </p>
          </div>

          <div
            style={{
              width: "1000px",
              height: "auto",
              display: "flex",
              justifyContent: "right",
            }}
          >
            <PostSearchStatus onSubmit={handleFiltersChangeStatus} />

            <PostSearchDate onSubmit={handleFiltersChangeDate} />
          </div>
        </div>

        <div className="staff_home">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{ backgroundColor: "#2f4050" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    Reporter
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    Created Date
                    <span>
                      <IconButton
                        aria-label="delete"
                        aria-controls={openSort ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSort ? "true" : undefined}
                        onClick={handleClickSort}
                        style={{ color: "white" }}
                      >
                        <SortIcon />
                      </IconButton>
                    </span>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    View Detail
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow
                    key={report.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{report.id}</TableCell>
                    <TableCell
                      align="center"
                      // style={{
                      //   width: "50px",
                      //   whiteSpace: "nowrap",
                      //   overflow: "hidden",
                      //   textOverflow: "ellipsis",
                      // }}
                    >
                      {parse(truncate(report.title, 10, 30))}
                    </TableCell>
                    <TableCell align="center">{report.createdBy}</TableCell>
                    <TableCell align="center">
                      {report.createdDate.substring(0, 10)}
                    </TableCell>

                    {report.status == "1" ? (
                      <TableCell
                        align="center"
                        style={{ color: "grey", fontWeight: "bold" }}
                      >
                        Draft
                      </TableCell>
                    ) : report.status == "2" ? (
                      <TableCell
                        align="center"
                        style={{ color: "darkgoldenrod", fontWeight: "bold" }}
                      >
                        Created
                      </TableCell>
                    ) : report.status == "3" ? (
                      <TableCell
                        align="center"
                        style={{ color: "darkgreen", fontWeight: "bold" }}
                      >
                        Approved
                      </TableCell>
                    ) : (
                      <TableCell
                        align="center"
                        style={{ color: "brown", fontWeight: "bold" }}
                      >
                        Denied
                      </TableCell>
                    )}

                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          handleView(report.id, report.createdBy);
                        }}
                      >
                        View Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Pagination
          style={{ marginTop: "20px" }}
          shape="rounded"
          variant="outlined"
          count={totalPages}
          page={page.pageIndex}
          onChange={handlePageIndexChange}
        />
      </div>

      {/* Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openSort}
        onClose={handleCloseSort}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => sortingASC("createdDate")}>
          Sort by ascending
        </MenuItem>
        <MenuItem onClick={() => sortingDSC("createdDate")}>
          Sort by descending
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Reports_body;
