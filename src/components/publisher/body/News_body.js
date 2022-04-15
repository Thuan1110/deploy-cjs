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
import TextField from "@mui/material/TextField";
import parse from "html-react-parser";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { url } from "../../../url";
import PostSearchStatusForNews from "../../editor/body/PostSearchStatusForNews";
import "../css/news_body.css";

function News_body() {
  const token = sessionStorage.getItem("token");
  const decoded = jwt_decode(token);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openSort = Boolean(anchorEl);
  const handleClickSort = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleView = (id, createdBy) => {
    history.push({
      pathname: "/publisher_view_news_detail",
      state: {
        newsId: id,
        createdBy: createdBy,
      },
    });
  };
  const handleCreateNews = (e) => {
    history.push({
      pathname: "/create_news",
    });
  };

  const status_list = ["Approved", "Denied", "Created"];
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  /*********************************** */
  const [page, setPage] = useState({
    pageIndex: 1,
    pageSize: 5,
    status: 2,
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

  //GET News List
  const [news, setNews] = useState([]);

  const getNewsList = async () => {
    const response = await fetch(
      url +
        "News/list?" +
        "Status=" +
        page.status +
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
          // "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          // mode: "cors",
        },
      }
    );
    const data = await response.json();

    const news = data.content;

    setNews(news.items);

    setTotalRows(news.totalRecord);
  };

  useEffect(() => {
    getNewsList();
  }, [page, render]);
  /********************************************** */
  //GET News List with status=2

  const [totalRowsNewsStatus2, setTotalRowsNewsStatus2] = useState();

  const getNewsListStatus2 = async () => {
    const response = await fetch(
      url +
        "News/list?" +
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

    const news = data.content;

    setTotalRowsNewsStatus2(news.totalRecord);
  };

  useEffect(() => {
    getNewsListStatus2();
  }, [page, render]);
  /********************************* */
  const truncate = (str, max, len) => {
    return str.length > max ? str.substring(0, len) + "..." : str;
  };
  const [orderASC, setOrderASC] = useState("ASC");
  const [orderDESC, setOrderDESC] = useState("DESC");
  const sortingASC = (col) => {
    if (orderASC === "ASC") {
      const sorted = [...news].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setNews(sorted);
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
      const sorted = [...news].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setNews(sorted);
      setOrderASC("ASC");
      setPage({
        ...page,
        pageIndex: 1,
        sortField: "createdDate",
        isSortDesc: true,
      });
    }
  };
  const handleFiltersChangeStatus = (newFilters) => {
    setPage({ ...page, pageIndex: 1, status: newFilters.searchStatus });
  };
  return (
    <div className="staff_home_container">
      <div>
        <div className="statistics_publisher">
          <div className="total_news_publisher">
            <div
              style={{
                width: "140px",
                height: "auto",
                textAlign: "center",
              }}
            >
              <FeedIcon fontSize="large" style={{ color: "#f3f5f9" }} />
              <p style={{ color: "#f3f5f9" }}>Total News</p>
            </div>
            <div>
              <p style={{ fontSize: "35px", color: "#f3f5f9" }}>{totalRows}</p>
            </div>
          </div>

          <div className="created_news_publisher">
            <div
              style={{
                width: "150px",
                height: "auto",
                textAlign: "center",
              }}
            >
              <FeedIcon fontSize="large" style={{ color: "#f3f5f9" }} />
              <p style={{ color: "#f3f5f9" }}>Created News</p>
            </div>
            <div>
              <p style={{ fontSize: "35px", color: "#f3f5f9" }}>
                {totalRowsNewsStatus2}
              </p>
            </div>
          </div>
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
              width: "150px",
            }}
          >
            <p
              style={{
                fontSize: "25px",
                textTransform: "capitalize",
                color: "black",
                fontWeight: "500",
                textAlign: "left",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              News List
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
            <PostSearchStatusForNews onSubmit={handleFiltersChangeStatus} />
            <TextField
              id="Date"
              label="Filter by date"
              type="date"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              name="Date"
              variant="outlined"
              // value={searchDate}
              // onChange={handleSearchDateChange}
              style={{
                backgroundColor: "white",
                marginTop: "15px",
                marginRight: "15px",
              }}
            />
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
                    Created By
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
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {news.map((news) => (
                  <TableRow
                    key={news.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{news.id}</TableCell>
                    <TableCell align="center">
                      {" "}
                      {parse(truncate(news.title, 20, 30))}
                    </TableCell>
                    <TableCell align="center">{news.createdby}</TableCell>
                    <TableCell align="center">
                      {news.createdDate.substring(0, 10)}
                    </TableCell>
                    {news.status == "1" ? (
                      <TableCell
                        align="center"
                        style={{ color: "grey", fontWeight: "bold" }}
                      >
                        Draft
                      </TableCell>
                    ) : news.status == "2" ? (
                      <TableCell
                        align="center"
                        style={{ color: "darkgoldenrod", fontWeight: "bold" }}
                      >
                        Created
                      </TableCell>
                    ) : news.status == "3" ? (
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
                          handleView(news.id, news.createdby);
                        }}
                      >
                        View Detail
                      </Button>
                      {/* <IconButton
                        aria-label="delete"
                        aria-controls={openMenu ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? "true" : undefined}
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton> */}
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

export default News_body;
