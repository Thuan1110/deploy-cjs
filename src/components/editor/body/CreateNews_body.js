import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import jwt_decode from "jwt-decode";
import React, { useCallback, useContext, useState } from "react";
import "react-medium-image-zoom/dist/styles.css";
import { useHistory } from "react-router-dom";
import { AlertContext } from "../../../Providers/AlertDialogProvider";
import { url } from "../../../url";
import "../../editor/css/createNews_body.css";

function CreateNews_body() {
  const { setMessage, setSeverity, setOpenAlert } = useContext(AlertContext);
  const token = sessionStorage.getItem("token");
  const decoded = jwt_decode(token);
  const history = useHistory();
  const handleView = (e) => {
    history.goBack();
  };
  const currentDate = new Date();
  const date = `${currentDate.getFullYear()}-${(
    "0" +
    (currentDate.getMonth() + 1)
  ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
  const [image, setImage] = useState(null);
  function uploadSingleFile(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log("file", image);
  }
  const [video, setVideo] = useState(null);
  function uploadSingleVideo(e) {
    setVideo(URL.createObjectURL(e.target.files[0]));
    console.log("file", video);
  }

  const [audio, setAudio] = useState(null);
  function uploadSingleAudio(e) {
    setAudio(URL.createObjectURL(e.target.files[0]));
    console.log("file", audio);
  }

  const [createTitle, setCreateTitle] = React.useState("");
  const [createContent, setCreateContent] = React.useState("");

  /****************************************************** */
  //API Create News

  const handleCreateNews = useCallback(
    async (e) => {
      // e.preventDefault();
      const response = await fetch(url + "News", {
        method: "post",

        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: createTitle,
          content: createContent,
        }),
      });

      if (response.status >= 200 && response.status <= 299) {
        setOpenAlert(true);
        setMessage("Created successfully!");
        setSeverity("success");
        // setCreateTitle("");
        // setCreateContent("");
        history.goBack();
      } else {
        setOpenAlert(true);
        setMessage("Server error");
        setSeverity("error");
      }
    },
    [createContent, createTitle, setMessage, setOpenAlert, setSeverity, token]
  );
  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      if (!createTitle) {
        setOpenAlert(true);
        setMessage("The Title field is required");
        setSeverity("warning");
      } else if (!createContent) {
        setOpenAlert(true);
        setMessage("The Content field is required");
        setSeverity("warning");
      } else handleCreateNews(e);
    },
    [
      createTitle,
      createContent,
      handleCreateNews,
      setOpenAlert,
      setMessage,
      setSeverity,
    ]
  );
  return (
    <div className="create_news_container">
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
              textAlign: "left",
              marginTop: "20px",
              fontWeight: "bold",
              paddingLeft: "10px",
            }}
          >
            Create News
          </p>
        </div>

        <div>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            Reference reports
          </p>
          <div className="reference_reports"></div>
          <form onSubmit={handleSubmitForm} noValidate>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              Title*
            </p>
            <div className="create_title">
              <CKEditor
                editor={ClassicEditor}
                data={createTitle}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setCreateTitle(data);
                  console.log({ event, editor, createTitle });
                }}
              />
            </div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              Content*
            </p>
            <div className="create_content">
              <CKEditor
                editor={ClassicEditor}
                data={createContent}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setCreateContent(data);
                  console.log({ event, editor, createContent });
                }}
              />
            </div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              Images
            </p>

            <div className="image">
              <input
                type="file"
                className="form-control"
                onChange={uploadSingleFile}
                accept="image/*"
              />
            </div>
            <div style={{ marginTop: "5px" }}>
              {" "}
              <Button
                variant="contained"
                color="primary"
                // onClick={checkFileSizeVideo}
              >
                Upload
              </Button>
            </div>
            <div style={{ marginTop: "5px" }}>
              <p style={{ fontSize: "14px" }}>
                Maximum upload file size: 100 MB
              </p>
            </div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              Videos
            </p>
            <div className="video">
              <input
                type="file"
                className="form-control"
                onChange={uploadSingleVideo}
                accept="video/*"
              />
            </div>
            <div style={{ marginTop: "5px" }}>
              {" "}
              <Button
                variant="contained"
                color="primary"
                // onClick={checkFileSizeVideo}
              >
                Upload
              </Button>
            </div>
            <div style={{ marginTop: "5px" }}>
              <p style={{ fontSize: "14px" }}>
                Maximum upload file size: 100 MB
              </p>
            </div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              Audios
            </p>
            <div className="audio">
              <input
                type="file"
                className="form-control"
                onChange={uploadSingleAudio}
                accept="audio/*"
              />
            </div>
            <div style={{ marginTop: "5px" }}>
              {" "}
              <Button
                variant="contained"
                color="primary"
                // onClick={checkFileSizeVideo}
              >
                Upload
              </Button>
            </div>
            <div style={{ marginTop: "5px" }}>
              <p style={{ fontSize: "14px" }}>
                Maximum upload file size: 100 MB
              </p>
            </div>
            <div className="buttons">
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  // onClick={handleCreateNews}
                >
                  Create News
                </Button>
              </Stack>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNews_body;
