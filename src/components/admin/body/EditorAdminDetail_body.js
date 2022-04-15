import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";

function EditorAdminDetail_body() {
  const history = useHistory();
  const handleView = (e) => {
    history.goBack();
  };
  return (
    <div className="editor_detail_container">
      <div
        style={{
          width: "1000px",
          height: "auto",
        }}
      >
        <div
          style={{
            width: "1000px",
            height: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ArrowBackIcon
            onClick={handleView}
            style={{ marginTop: "20px", fontSize: "25px" }}
          />
          <p
            style={{
              fontSize: "25px",
              textTransform: "capitalize",
              color: "black",
              fontWeight: "500",
              textAlign: "left",
              marginTop: "20px",
              fontWeight: "bold",
              paddingLeft: "10px",
            }}
          >
            Editor Detail
          </p>
        </div>
        <div className="editor_detail_body">
          <div className="avatar">
            <AccountCircleIcon
              style={{
                color: "black",
                fontSize: "100px",
                marginTop: "20px",
              }}
            />
          </div>
          <div className="reporter_info">
            <div className="name_phone">
              <div className="name">
                <p style={{ fontSize: "14px", color: "grey" }}>Name</p>
                <TextField
                  id="outlined-basic"
                  defaultValue="Thuan"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#f3f5f9",
                  }}
                />
              </div>
              <div className="phone">
                <p style={{ fontSize: "14px", color: "grey" }}>
                  Contact Number
                </p>
                <TextField
                  id="outlined-basic"
                  defaultValue="0939850090"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  style={{ marginTop: "10px", backgroundColor: "#f3f5f9" }}
                />
              </div>
            </div>

            <p style={{ fontSize: "14px", color: "grey", marginTop: "20px" }}>
              Date Joined
            </p>
            <TextField
              id="outlined-basic"
              defaultValue="Dec-12-2021 10:10am"
              variant="outlined"
              size="small"
              inputProps={{ readOnly: true }}
              style={{ marginTop: "10px", backgroundColor: "#f3f5f9" }}
            />

            {/* <p style={{ fontSize: "14px", color: "grey", marginTop: "20px" }}>
              News has been approved
            </p>
            <TextField
              id="outlined-basic"
              defaultValue="10"
              variant="outlined"
              size="small"
              inputProps={{ readOnly: true }}
              style={{ marginTop: "10px", backgroundColor: "#f3f5f9" }}
            /> */}
            <p style={{ fontSize: "14px", color: "grey", marginTop: "20px" }}>
              Address
            </p>
            <TextField
              id="outlined-basic"
              defaultValue="181/53, Phan Dang Luu"
              variant="outlined"
              size="small"
              inputProps={{ readOnly: true }}
              style={{
                marginTop: "10px",
                backgroundColor: "#f3f5f9",
                width: "465px",
              }}
            />

            <div className="city_district">
              <div className="city">
                <p
                  style={{ fontSize: "14px", color: "grey", marginTop: "20px" }}
                >
                  City
                </p>
                <TextField
                  id="outlined-basic"
                  defaultValue="Ho Chi Minh City"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  style={{ marginTop: "10px", backgroundColor: "#f3f5f9" }}
                />
              </div>
              <div className="district">
                <p
                  style={{ fontSize: "14px", color: "grey", marginTop: "20px" }}
                >
                  District
                </p>
                <TextField
                  id="outlined-basic"
                  defaultValue="Phu Nhuan"
                  variant="outlined"
                  size="small"
                  inputProps={{ readOnly: true }}
                  style={{ marginTop: "10px", backgroundColor: "#f3f5f9" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorAdminDetail_body;
