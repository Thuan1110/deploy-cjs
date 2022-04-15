import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "../../publisher/css/reporter_body.css";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Reporter_body() {
  const history = useHistory();
  function createData(no, title, reporter, date, news_posted, status) {
    return { no, title, reporter, date, news_posted, status };
  }

  const rows = [
    createData(1, "Thuan", "0939850090", "28/12/2021", 3, "Active"),
    createData(2, "Hai", "0939850090", "28/12/2021", 4, "Active"),
    createData(3, "Thanh", "0939850090", "28/12/2021", 1, "Active"),
  ];
  const handleView = (e) => {
    history.push({
      pathname: "/reporter_detail",
    });
  };

  return (
    <div className="reporter_container">
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
              <p style={{ color: "#f3f5f9" }}>Total Reporters</p>
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
              Reporters List
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
              }}
            />
          </div>
        </div>

        <div className="reporter_table">
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
                    Total News Posted
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
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.reporter}</TableCell>
                    <TableCell align="center">{row.news_posted}</TableCell>
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
    </div>
  );
}

export default Reporter_body;
