import React from "react";
import "../../publisher/css/editor_body.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Editor_body() {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function createData(no, name, phone, status) {
    return { no, name, phone, status };
  }

  const rows = [
    createData(1, "Thuan", "0939850090", "Active"),
    createData(2, "Hai", "0939850090", "Active"),
    createData(3, "Thanh", "0939850090", "Active"),
  ];
  const handleView = (e) => {
    history.push({
      pathname: "/editor_detail",
    });
  };
  return (
    <div className="editor_container">
      <div>
        <div className="statistics">
          <div className="total_reporters">
            <div
              style={{
                width: "120px",
                height: "auto",
                textAlign: "center",
              }}
            >
              <PeopleIcon fontSize="large" style={{ color: "#f3f5f9" }} />
              <p style={{ color: "#f3f5f9" }}>Total Editors</p>
            </div>
            <div>
              <p style={{ fontSize: "35px", color: "#f3f5f9" }}>3</p>
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
              Editors List
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
            <TextField
              id="outlined-basic"
              label="Search name"
              variant="outlined"
              size="small"
              style={{
                backgroundColor: "white",
                marginTop: "15px",
                marginRight: "15px",
              }}
            />
            {/* <div>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                style={{
                  marginTop: "15px",
                }}
                onClick={handleClickOpen}
              >
                Add
              </Button>
            </div> */}
          </div>
        </div>

        <div className="editor_table">
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
                    No.
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    Contact Number
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
                {rows.map((row) => (
                  <TableRow
                    key={row.no}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.no}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      {row.status}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleView}
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
          count={5}
          variant="outlined"
          shape="rounded"
        />
      </div>

      {/* <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Add new editor
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
          <DialogContentText style={{ marginTop: "10px" }}>
            Username
          </DialogContentText>

          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            size="small"
            style={{
              backgroundColor: "white",
              marginLeft: "10px",
            }}
          />

          <DialogContentText style={{ marginTop: "15px" }}>
            Password
          </DialogContentText>

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            style={{
              backgroundColor: "white",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          />
          <DialogContentText style={{ marginTop: "15px" }}>
            Name
          </DialogContentText>

          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            style={{
              backgroundColor: "white",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          />
          <DialogContentText style={{ marginTop: "15px" }}>
            Contact Number
          </DialogContentText>

          <TextField
            id="outlined-basic"
            label="Contact Number"
            variant="outlined"
            size="small"
            style={{
              backgroundColor: "white",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          />

          <DialogContentText style={{ marginTop: "15px" }}>
            Address
          </DialogContentText>

          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            size="small"
            style={{
              backgroundColor: "white",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          />
          <DialogContentText style={{ marginTop: "15px" }}>
            District
          </DialogContentText>

          <TextField
            id="outlined-basic"
            label="District"
            variant="outlined"
            size="small"
            style={{
              backgroundColor: "white",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          />
          <DialogContentText style={{ marginTop: "15px" }}>
            City
          </DialogContentText>

          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            size="small"
            style={{
              backgroundColor: "white",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary">
            Add
          </Button>
          <Button onClick={handleClose} autoFocus color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}

export default Editor_body;
