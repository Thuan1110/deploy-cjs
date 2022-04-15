import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SortIcon from "@mui/icons-material/Sort";
import TaskIcon from "@mui/icons-material/Task";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import jwt_decode from "jwt-decode";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AlertContext } from "../../../Providers/AlertDialogProvider";
import { url } from "../../../url";
import "../css/tasks_body.css";
import PostSearchStatusForTask from "./PostSearchStatusForTask";

function Tasks_body() {
  const { setMessage, setSeverity, setOpenAlert } = useContext(AlertContext);
  const token = sessionStorage.getItem("token");
  const decoded = jwt_decode(token);
  const history = useHistory();

  const current = new Date();
  const date = `${current.getFullYear()}-${(
    "0" +
    (current.getMonth() + 1)
  ).slice(-2)}-${("0" + current.getDate()).slice(-2)}`;
  const [createTask, setCreateTask] = useState({
    title: "",
    content: "",
    deadline: "",
  });
  const [openAddTaskDialog, setOpenAddTaskDialog] = React.useState(false);
  const [openDetailDialog, setOpenDetailDialog] = React.useState(false);
  const [openUpdateTaskDialog, setOpenUpdateTaskDialog] = React.useState(false);
  const [openPostTaskDialog, setOpenPostTaskDialog] = React.useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  //Add task
  const handleOpenAddTaskDialog = () => {
    setOpenAddTaskDialog(true);
  };
  const handleCloseAddTaskDialog = () => {
    setOpenAddTaskDialog(false);
    setCreateTask([]);
  };
  //View task detail
  const handleOpenViewTaskDialog = () => {
    setOpenDetailDialog(true);
  };
  const handleCloseViewTaskDialog = () => {
    setOpenDetailDialog(false);
    setTaskDetail([]);
  };
  //Update task
  const handleOpenUpdateTaskDialog = () => {
    setOpenUpdateTaskDialog(true);
  };
  const handleCloseUpdateTaskDialog = () => {
    setOpenUpdateTaskDialog(false);
    setTaskNameUpdate("");
    setDescriptionUpdate("");
    setTaskDetail([]);
  };
  //Post task
  const handleOpenPostTaskDialog = () => {
    setOpenPostTaskDialog(true);
  };
  const handleClosePostTaskDialog = () => {
    setOpenPostTaskDialog(false);
    setTaskDetail([]);
  };
  //Confirm leaving
  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };
  const handleConfirmDialog = () => {
    setOpenConfirmDialog(false);
    handleCloseAddTaskDialog();
    handleClosePostTaskDialog();
    handleCloseUpdateTaskDialog();
    handleCloseViewTaskDialog();
  };

  const handleCloseConfirm = () => {
    setOpenConfirmDialog(false);
  };

  const handleView = (e) => {
    history.push({
      pathname: "/editor_detail",
    });
  };

  const status_list = ["Draft", "In Progress", "Created", "Done"];
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const values = {
    startDate: "2022-01-10",
    finishDate: "2022-01-12",
  };

  const [value, setValue] = React.useState(new Date("1-10-2022"));

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };
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
    status: 1,
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
  //GET Tasks List
  const [tasks, setTasks] = useState([]);

  const getTasksList = useCallback(async () => {
    const response = await fetch(
      url +
        "Task/list?" +
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

          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    const tasks = data.content;

    setTasks(tasks.items);

    setTotalRows(tasks.totalRecord);
  }, [
    page.isSortDesc,
    page.pageIndex,
    page.pageSize,
    page.sortField,
    page.status,
    token,
  ]);

  useEffect(() => {
    getTasksList();
  }, [getTasksList, page, render]);
  /******************************************** */
  //GET Tasks List with status = 1
  const [totalRowsTaskStatus1, setTotalRowsTaskStatus1] = useState([]);

  const getTasksListStatus1 = useCallback(async () => {
    const response = await fetch(
      url +
        "Task/list?" +
        "PageSize=" +
        page.pageSize +
        "&PageIndex=" +
        page.pageIndex +
        "&status=1",
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

    const tasks = data.content;

    setTotalRowsTaskStatus1(tasks.totalRecord);
  }, [page.pageIndex, page.pageSize, token]);

  useEffect(() => {
    getTasksListStatus1();
  }, [getTasksListStatus1, page, render]);
  /********************************************** */

  //GET Tasks List with status = 2
  const [totalRowsTaskStatus2, setTotalRowsTaskStatus2] = useState([]);

  const getTasksListStatus2 = useCallback(async () => {
    const response = await fetch(
      url +
        "Task/list?" +
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

    const tasks = data.content;

    setTotalRowsTaskStatus2(tasks.totalRecord);
  }, [page.pageIndex, page.pageSize, token]);

  useEffect(() => {
    getTasksListStatus2();
  }, [getTasksListStatus2, page, render]);
  /********************************************** */
  //GET Task Detail
  const [taskDetail, setTaskDetail] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [taskNameUpdate, setTaskNameUpdate] = useState("");
  const [descriptionUpdate, setDescriptionUpdate] = useState("");

  const getTaskDetail = async (id) => {
    const response = await fetch(
      url + "Task?Id=" + id,

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

    const taskDetail = data.content;

    setTaskDetail(taskDetail);
    setDeadline(taskDetail.deadline.substring(0, 10));
    setTaskNameUpdate(taskDetail.title);
    setDescriptionUpdate(taskDetail.content);
  };

  /********************************************** */
  const handleClickDetailDialog = (taskId) => {
    setOpenDetailDialog(true);
    getTaskDetail(taskId);
  };
  const handleClickUpdateTask = (taskId) => {
    setOpenUpdateTaskDialog(true);
    getTaskDetail(taskId);
  };

  const handleClickPostTask = (taskId) => {
    setOpenPostTaskDialog(true);
    getTaskDetail(taskId);
  };
  /********************************************* */
  //API Update Task

  const handleChangeTitle = (e) => {
    setTaskNameUpdate(e.target.value);
  };

  const handleChangeContent = (e) => {
    setDescriptionUpdate(e.target.value);
  };

  const handleUpdateTask = useCallback(async () => {
    // e.preventDefault();
    const response = await fetch(url + "Task", {
      method: "put",

      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: taskDetail.id,
        title: taskNameUpdate,
        content: descriptionUpdate,
        status: 1,
      }),
    });

    if (response.status >= 200 && response.status <= 299) {
      setOpenAlert(true);
      setMessage("Updated successfully!");
      setSeverity("success");
      setOpenUpdateTaskDialog(false);
      await getTasksList();
    } else {
      setOpenAlert(true);
      setMessage("Server error");
      setSeverity("error");
    }
  }, [
    descriptionUpdate,
    getTasksList,
    setMessage,
    setOpenAlert,
    setSeverity,
    taskDetail.id,
    taskNameUpdate,
    token,
  ]);

  /*********************************** */

  //API Post Task

  const handlePostTask = async (id, titlePost, contentPost) => {
    // e.preventDefault();
    const response = await fetch(url + "Task", {
      method: "put",

      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: taskDetail.id,
        title: taskDetail.title,
        content: taskDetail.content,
        status: 2,
      }),
    });

    if (response.status >= 200 && response.status <= 299) {
      setOpenAlert(true);
      setMessage("Posted successfully!");
      setOpenPostTaskDialog(false);
      await getTasksList();
    }
  };
  /*********************************** */
  const handleChangeCreateTask = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCreateTask({ ...createTask, [name]: value });
  };

  //API Add Task

  const handleCreateTask = useCallback(
    async (e) => {
      // e.preventDefault();
      const response = await fetch(url + "Task", {
        method: "post",

        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: createTask.title,
          content: createTask.content,
          deadline: createTask.deadline,
        }),
      });

      if (response.status >= 200 && response.status <= 299) {
        setOpenAlert(true);
        setMessage("Created successfully!");
        setSeverity("success");
        setOpenAddTaskDialog(false);
        setCreateTask([]);
        await getTasksList();
      } else {
        setOpenAlert(true);
        setMessage("Server error");
        setSeverity("error");
      }
    },
    [
      createTask.content,
      createTask.deadline,
      createTask.title,
      getTasksList,
      setMessage,
      setOpenAlert,
      setSeverity,
      token,
    ]
  );
  const handleFiltersChangeStatus = (newFilters) => {
    setPage({ ...page, pageIndex: 1, status: newFilters.searchStatus });
  };

  const [orderASC, setOrderASC] = useState("ASC");
  const [orderDESC, setOrderDESC] = useState("DESC");
  const sortingASC = (col) => {
    if (orderASC === "ASC") {
      const sorted = [...tasks].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setTasks(sorted);
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
      const sorted = [...tasks].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setTasks(sorted);
      setOrderASC("ASC");
      setPage({
        ...page,
        pageIndex: 1,
        sortField: "createdDate",
        isSortDesc: true,
      });
    }
  };
  const truncate = (str, max, len) => {
    return str.length > max ? str.substring(0, len) + "..." : str;
  };

  // const checkValidFields = useCallback(
  //   () => taskNameUpdate && descriptionUpdate,
  //   [descriptionUpdate, taskNameUpdate]
  // );

  const handleSubmitTaskFormUpdate = useCallback(
    (e) => {
      e.preventDefault();

      console.log("debug fields", taskNameUpdate, descriptionUpdate);

      if (!taskNameUpdate) {
        setOpenAlert(true);
        setMessage("The Task name field is required");
        setSeverity("warning");
      } else if (!descriptionUpdate) {
        setOpenAlert(true);
        setMessage("The Description field is required");
        setSeverity("warning");
      } else handleUpdateTask();
    },
    [
      taskNameUpdate,
      descriptionUpdate,
      handleUpdateTask,

      setOpenAlert,
      setMessage,
      setSeverity,
    ]
  );

  const handleSubmitTaskFormCreate = useCallback(
    (e) => {
      e.preventDefault();

      console.log(
        "debug fields",
        createTask.title,
        createTask.content,
        createTask.deadline
      );

      if (!createTask.title) {
        setOpenAlert(true);
        setMessage("The Task name field is required");
        setSeverity("warning");
      } else if (!createTask.content) {
        setOpenAlert(true);
        setMessage("The Description field is required");
        setSeverity("warning");
      } else if (!createTask.deadline) {
        setOpenAlert(true);
        setMessage("The Deadline field is required");
        setSeverity("warning");
      } else handleCreateTask();
    },
    [
      createTask.title,
      createTask.content,
      createTask.deadline,
      handleCreateTask,
      setOpenAlert,
      setMessage,
      setSeverity,
    ]
  );
  return (
    <div className="tasks_container">
      <div>
        <div className="statistics">
          <div className="total_tasks">
            <div
              style={{
                width: "120px",
                height: "auto",
                textAlign: "center",
              }}
            >
              <TaskIcon fontSize="large" style={{ color: "#f3f5f9" }} />
              <p style={{ color: "#f3f5f9" }}>Total Tasks</p>
            </div>
            <div>
              <p style={{ fontSize: "35px", color: "#f3f5f9" }}>{totalRows}</p>
            </div>
          </div>

          <div className="draft_tasks">
            <div
              style={{
                width: "120px",
                height: "auto",
                textAlign: "center",
              }}
            >
              <TaskIcon fontSize="large" style={{ color: "#f3f5f9" }} />
              <p style={{ color: "#f3f5f9" }}>Draft Tasks</p>
            </div>
            <div>
              <p style={{ fontSize: "35px", color: "#f3f5f9" }}>
                {totalRowsTaskStatus1}
              </p>
            </div>
          </div>
          <div className="created_tasks">
            <div
              style={{
                width: "140px",
                height: "auto",
                textAlign: "center",
              }}
            >
              <TaskIcon fontSize="large" style={{ color: "#f3f5f9" }} />
              <p style={{ color: "#f3f5f9" }}>Created Tasks</p>
            </div>
            <div>
              <p style={{ fontSize: "35px", color: "#f3f5f9" }}>
                {totalRowsTaskStatus2}
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
              width: "250px",
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
              Tasks List
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
            <PostSearchStatusForTask onSubmit={handleFiltersChangeStatus} />
            {/* <TextField
              id="outlined-basic"
              label="Search by name"
              variant="outlined"
              size="small"
              style={{
                backgroundColor: "white",
                marginTop: "15px",
                marginRight: "15px",
              }}
            /> */}
            <div>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                style={{
                  marginTop: "15px",
                }}
                onClick={handleOpenAddTaskDialog}
              >
                Add Task
              </Button>
            </div>
          </div>
        </div>

        <div className="tasks_table">
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
                    Task Name
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
                {tasks.map((tasks) => (
                  <TableRow
                    key={tasks.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{tasks.id}</TableCell>
                    <TableCell align="center">
                      {truncate(tasks.title, 20, 30)}
                    </TableCell>
                    <TableCell align="center">
                      {tasks.createdDate.substring(0, 10)}
                    </TableCell>
                    {tasks.status == "1" ? (
                      <TableCell
                        align="center"
                        style={{ color: "grey", fontWeight: "bold" }}
                      >
                        Draft
                      </TableCell>
                    ) : tasks.status == "2" ? (
                      <TableCell
                        align="center"
                        style={{ color: "darkgoldenrod", fontWeight: "bold" }}
                      >
                        Created
                      </TableCell>
                    ) : tasks.status == "3" ? (
                      <TableCell
                        align="center"
                        style={{ color: "darkblue", fontWeight: "bold" }}
                      >
                        In Progress
                      </TableCell>
                    ) : tasks.status == "4" ? (
                      <TableCell
                        align="center"
                        style={{ color: "darkgreen", fontWeight: "bold" }}
                      >
                        Done
                      </TableCell>
                    ) : (
                      <TableCell
                        align="center"
                        style={{ color: "brown", fontWeight: "bold" }}
                      >
                        Denied
                      </TableCell>
                    )}

                    {/* actions buttons */}
                    {tasks.status == "1" ? (
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleClickDetailDialog(tasks.id)}
                        >
                          View Detail
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleClickUpdateTask(tasks.id)}
                          style={{ marginLeft: "10px" }}
                        >
                          Update Task
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          style={{ marginLeft: "10px" }}
                          onClick={() => handleClickPostTask(tasks.id)}
                        >
                          Post Task
                        </Button>
                        {/* <IconButton
                      aria-label="delete"
                      aria-controls={openMenu ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                      onClick={handleClick(tasks.id)}
                    >
                      <MoreVertIcon />
                    </IconButton> */}
                      </TableCell>
                    ) : tasks.status == "2" ? (
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleClickDetailDialog(tasks.id)}
                        >
                          View Detail
                        </Button>
                      </TableCell>
                    ) : tasks.status == "3" ? (
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleClickDetailDialog(tasks.id)}
                        >
                          View Detail
                        </Button>
                      </TableCell>
                    ) : tasks.status == "4" ? (
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleClickDetailDialog(tasks.id)}
                        >
                          View Detail
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleClickDetailDialog(tasks.id)}
                        >
                          View Detail
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleClickUpdateTask(tasks.id)}
                          style={{ marginLeft: "10px" }}
                        >
                          Update Task
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          style={{ marginLeft: "10px" }}
                          onClick={() => handleClickPostTask(tasks.id)}
                        >
                          Post Task
                        </Button>
                      </TableCell>
                    )}
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

      {/* Post task dialog */}

      <Dialog
        fullScreen={fullScreen}
        open={openPostTaskDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Post task
          <IconButton
            aria-label="close"
            onClick={handleClosePostTaskDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          style={{ display: "grid", gridTemplateColumns: "auto auto" }}
        >
          Do you want to post this task ?
        </DialogContent>

        <DialogActions>
          <Button autoFocus color="primary" onClick={handlePostTask}>
            Post
          </Button>
          <Button onClick={handleClosePostTaskDialog} autoFocus color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add new task dialog */}

      <Dialog
        fullScreen={fullScreen}
        open={openAddTaskDialog}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={handleSubmitTaskFormCreate} noValidate>
          <DialogTitle id="responsive-dialog-title">
            Add new task
            <IconButton
              aria-label="close"
              onClick={handleOpenConfirmDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent
            style={{ display: "grid", gridTemplateColumns: "auto auto" }}
          >
            <DialogContentText style={{ marginTop: "20px" }}>
              Task Name*
            </DialogContentText>
            <TextField
              id="title"
              variant="outlined"
              type="text"
              name="title"
              required
              value={createTask.title}
              onChange={handleChangeCreateTask}
              size="small"
              style={{
                backgroundColor: "white",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            />
            <DialogContentText style={{ marginTop: "20px" }}>
              Description*
            </DialogContentText>
            <TextField
              id="content"
              type="text"
              name="content"
              required
              value={createTask.content}
              onChange={handleChangeCreateTask}
              variant="outlined"
              multiline
              rows={5}
              style={{
                width: "450px",
                backgroundColor: "white",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            />{" "}
            <DialogContentText style={{ marginTop: "20px" }}>
              Deadline*
            </DialogContentText>
            <TextField
              id="deadline"
              type="date"
              name="deadline"
              required
              onChange={handleChangeCreateTask}
              defaultValue={createTask.deadline}
              inputProps={{
                min: date,
              }}
              variant="outlined"
              size="small"
              style={{
                backgroundColor: "white",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            />
            <DialogContentText style={{ marginTop: "20px" }}>
              Assign to
            </DialogContentText>
            <TextField
              id="assign"
              type="text"
              name="assign"
              // required
              // onChange={handleChangeCreateTask}
              // defaultValue={date}
              // inputProps={{
              //   min: date,
              // }}
              variant="outlined"
              size="small"
              style={{
                backgroundColor: "white",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            />
          </DialogContent>

          <DialogActions>
            <Button autoFocus color="primary" type="submit">
              Add
            </Button>
            <Button onClick={handleOpenConfirmDialog} color="error">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* View detail dialog */}
      <Dialog
        fullScreen={fullScreen}
        open={openDetailDialog}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Task Detail
          <IconButton
            aria-label="close"
            onClick={handleCloseViewTaskDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          style={{ display: "grid", gridTemplateColumns: "auto auto" }}
        >
          <DialogContentText style={{ marginTop: "20px" }}>
            Task Name
          </DialogContentText>

          <TextField
            id="outlined-basic"
            value={taskDetail.title}
            variant="outlined"
            size="small"
            style={{
              backgroundColor: "white",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          />
          <DialogContentText style={{ marginTop: "20px" }}>
            Description
          </DialogContentText>

          <TextField
            id="outlined-basic"
            variant="outlined"
            value={taskDetail.content}
            multiline
            rows={5}
            style={{
              width: "450px",
              backgroundColor: "white",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          />
          <DialogContentText style={{ marginTop: "20px" }}>
            Deadline
          </DialogContentText>

          <TextField
            id="outlined-basic"
            variant="outlined"
            value={deadline}
            size="small"
            style={{
              backgroundColor: "white",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          />

          <DialogContentText style={{ marginTop: "20px" }}>
            Taken by
          </DialogContentText>

          <TextField
            id="outlined-basic"
            value={taskDetail.reporter}
            variant="outlined"
            size="small"
            style={{
              backgroundColor: "white",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          />
          <DialogContentText style={{ marginTop: "20px" }}>
            Status
          </DialogContentText>
          {taskDetail.status == "1" ? (
            <p
              style={{
                color: "grey",
                marginTop: "22px",
                marginLeft: "10px",
              }}
            >
              Draft
            </p>
          ) : taskDetail.status == "2" ? (
            <p
              style={{
                color: "darkgoldenrod",
                marginTop: "22px",
                marginLeft: "10px",
              }}
            >
              Created
            </p>
          ) : taskDetail.status == "3" ? (
            <p
              style={{
                color: "darkblue",
                marginTop: "22px",
                marginLeft: "10px",
              }}
            >
              In Progress
            </p>
          ) : taskDetail.status == "4" ? (
            <p
              style={{
                color: "darkgreen",
                marginTop: "22px",
                marginLeft: "10px",
              }}
            >
              Done
            </p>
          ) : taskDetail.status == "5" ? (
            <p
              style={{
                color: "brown",
                marginTop: "22px",
                marginLeft: "10px",
              }}
            >
              Denied
            </p>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Update Task Dialog*/}
      <Dialog
        fullScreen={fullScreen}
        open={openUpdateTaskDialog}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={handleSubmitTaskFormUpdate} noValidate>
          <DialogTitle id="responsive-dialog-title">
            Update Task
            <IconButton
              aria-label="close"
              onClick={handleOpenConfirmDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent
            style={{ display: "grid", gridTemplateColumns: "auto auto" }}
          >
            <DialogContentText style={{ marginTop: "20px" }}>
              Task Name
            </DialogContentText>

            <TextField
              size="small"
              id="title"
              type="text"
              name="title"
              required
              multiline
              maxRows={3}
              aria-label="maximum height"
              value={taskNameUpdate}
              onChange={handleChangeTitle}
              style={{
                backgroundColor: "white",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            />
            <DialogContentText style={{ marginTop: "20px" }}>
              Description
            </DialogContentText>

            <TextField
              id="content"
              name="content"
              variant="outlined"
              required
              value={descriptionUpdate}
              onChange={handleChangeContent}
              multiline
              rows={5}
              style={{
                width: "450px",
                backgroundColor: "white",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={(e) => {}} type="submit">
              Update
            </Button>
            <Button onClick={handleOpenConfirmDialog} color="error">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* Confirm Dialog*/}
      <Dialog
        fullScreen={fullScreen}
        open={openConfirmDialog}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent
          style={{ display: "grid", gridTemplateColumns: "auto auto" }}
        >
          <DialogContentText style={{ marginTop: "20px" }}>
            Are you sure you want to cancel?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" onClick={handleConfirmDialog}>
            Yes
          </Button>
          <Button onClick={handleCloseConfirm} color="error">
            Back
          </Button>
        </DialogActions>
      </Dialog>
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

export default Tasks_body;
