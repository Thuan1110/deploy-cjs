import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import {
  DialogContent,
  DialogContentText,
  IconButton,
  ImageList,
  ImageListItem,
  useMediaQuery,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import jwt_decode from "jwt-decode";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactHtmlParser from "react-html-parser";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useHistory, useLocation } from "react-router-dom";
import { AlertContext } from "../../../Providers/AlertDialogProvider";
import { url } from "../../../url";
import "../css/reporterDetail_body.css";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";

const Input = styled("input")({
  display: "none",
});

function ReporterDetail_body({ isFormChanged, setFormChangedState }) {
  const { setMessage, setSeverity, setOpenAlert } = useContext(AlertContext);
  const { enqueueSnackbar } = useSnackbar();
  const token = sessionStorage.getItem("token");
  const decoded = jwt_decode(token);
  const history = useHistory();
  const location = useLocation();

  const refImage = useRef();
  const refVideo = useRef();
  const refAudio = useRef();

  const [reportData, setReportData] = useState(location.state);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(false);
  const [openSendNews, setOpenSendReport] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenSendReport(false);
  };
  const [editReportData, setEditReportData] = useState({
    title: "",
    content: "",
  });

  //save draft dialog
  const [openSaveDraftAlertDialog, setOpenSaveDraftAlertDialog] =
    React.useState(false);

  const handleClickOpenSaveDraftAlertDialog = () => {
    setOpenSaveDraftAlertDialog(true);
  };

  const handleCloseSaveDraftAlertDialog = () => {
    setOpenSaveDraftAlertDialog(false);
  };

  //send report dialog
  const [openSendNewsAlertDialog, setOpenSendReportAlertDialog] =
    React.useState(false);

  const handleClickOpenSendReportAlertDialog = () => {
    if (isFormChanged === true) {
      setOpenAlert(true);
      setMessage("Please save before sending report!");
      setSeverity("warning");
    } else {
      setOpenSendReportAlertDialog(true);
    }
  };

  const handleCloseSendNewsAlertDialog = () => {
    setOpenSendReportAlertDialog(false);
  };
  //confirm dialog
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  /*********************************** */

  //GET report Detail
  const [reportDetail, setReportDetail] = useState([]);
  const [createdDate, setCreatedDate] = useState("");
  const [listImageUrls, setListImageUrls] = useState([]);
  const [listVideoUrls, setListVideoUrls] = useState([]);
  const [listAudioUrls, setListAudioUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [defaultData, setDefaultData] = useState({ title: "", content: "" });

  const [fileUrls, setFileUrls] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);

  const handleGoBackFromEdit = (e) => {
    if (isFormChanged) {
      setOpenConfirm(true);
    } else history.goBack();
  };

  const handleGoBack = (e) => {
    history.goBack();
  };

  const fetchFileBlob = useCallback(
    async (folderPath, uniqueName) => {
      let response = null;

      try {
        response = await fetch(
          url +
            "Report/attachments?folderPath=" +
            folderPath +
            "&fileName=" +
            uniqueName,
          {
            method: "get",
            headers: {
              Authorization: "Bearer " + token,

              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        response = await response.blob();
      } catch (error) {
        // bao loi
      }

      return response;
    },
    [token]
  );

  const handleGetFile = useCallback(
    async ({ folderPath, uniqueName }) => {
      const fileBlob = await fetchFileBlob(folderPath, uniqueName);

      const link = URL.createObjectURL(fileBlob);

      return link;
    },
    [fetchFileBlob]
  );

  const convertListFileToUrls = useCallback(
    async (listFile) => {
      let imageUrls = [];

      for (const file of listFile) {
        const url = await handleGetFile(file);

        imageUrls.push(url);
      }

      return imageUrls;
    },
    [handleGetFile]
  );

  const getReportDetail = useCallback(async () => {
    const response = await fetch(url + "Report?Id=" + reportData.reportId, {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    const reportDetail = data.content;
    if (reportDetail.listFile) {
      const listImage = reportDetail.listFile.filter(
        (file) => ![".mp4", ".mp3"].includes(file.extension)
      );
      const listVideo = reportDetail.listFile.filter(
        (file) => file.extension === ".mp4"
      );
      const listAudio = reportDetail.listFile.filter(
        (file) => file.extension === ".mp3"
      );

      console.log("debug listImage", listImage);

      const listImageUrls = await convertListFileToUrls(listImage);
      const listVideoUrls = await convertListFileToUrls(listVideo);
      const listAudioUrls = await convertListFileToUrls(listAudio);

      console.log("debug reportDetail.listFile", reportDetail.listFile);
      console.log("debug listFileUrls", listImageUrls);
      setListImageUrls(listImageUrls);
      setListVideoUrls(listVideoUrls);
      setListAudioUrls(listAudioUrls);
    }

    setReportDetail(reportDetail);
    setCreatedDate(reportDetail.createdDate.substring(0, 10));

    setLoading(true);
    setDefaultData({
      title: reportDetail.title,
      content: reportDetail.content,
    });
  }, [convertListFileToUrls, reportData.reportId, token]);

  useEffect(() => {
    (async () => {
      await getReportDetail();
    })();
  }, [getReportDetail, reportData.reportId]);

  /********************************************** */
  //API Send Report

  const handleSendReport = async (titles, contents) => {
    // e.preventDefault();
    const response = await fetch(url + "Report", {
      method: "put",

      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: reportData.reportId,
        title: titles,
        content: contents,
        status: 2,
      }),
    });

    if (response.status >= 200 && response.status <= 299) {
      setOpenSendReportAlertDialog(false);
      setLoading(false);
      await getReportDetail();
      setOpenAlert(true);
      setMessage("Sent Successfully!");
      setSeverity("success");
    }
  };
  /******************************************** */
  //API Save Draft
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const checkTitleChanged = (titleValue) => {
    setFormChangedState(defaultData.title !== titleValue);
  };

  const checkContentChanged = (contentValue) => {
    setFormChangedState(defaultData.content !== contentValue);
  };

  const handleSaveDraft = async () => {
    await uploadFiles();

    const response = await fetch(url + "Report", {
      method: "put",

      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: reportData.reportId,
        title: title,
        content: content,
        status: 1,
      }),
    });

    if (response.status >= 200 && response.status <= 299) {
      // await handlePostAttachment();
      setOpenAlert(true);
      setMessage("Saved successfully!");
      setSeverity("success");
      setOpenSaveDraftAlertDialog(false);
      setFormChangedState(false);
      setImageFiles([]);
      setVideoFiles([]);
      setAudioFiles([]);
      await getReportDetail();
    }

    if (response.status === 400) {
      const data = await response.json();
      const error = data.errors;
      if (title === "" && content) {
        setOpenAlert(true);
        setMessage(error.Title);
        setSeverity("warning");
      } else if (content === "" && title) {
        setOpenAlert(true);
        setMessage(error.Content);
        setSeverity("warning");
      } else {
        setOpenAlert(true);
        setMessage(error.Title, error.Content);
        setSeverity("warning");
      }
    }
  };
  /******************************************* */

  //create folder name
  const [folderName, setFolderName] = useState("");

  const handleCreateFolderName = async () => {
    const response = await fetch(url + "Report/upload-attachment", {
      method: "post",

      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        folderName: "report",
      }),
    });

    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      const apiReturn = data.content;
      const uri = apiReturn.uri;
      const uploadFolderPath = apiReturn.uploadFolderPath;
      const token = apiReturn.token;

      console.log("debug apiReturn.uri", uri);
      console.log("debug apiReturn.uploadFolderPath", uploadFolderPath);
      console.log("debug apiReturn.token", token);
      console.log("debug  data.content", data);

      return { uri, uploadFolderPath, token };
    }

    return null;
  };
  //--------------------------------------------------

  //select file
  const handleOnChangeFile = async (e, fileType) => {
    const files = e.target.files;
    const fileUrls = [];
    const acceptedFiles = [];

    for (const file of files) {
      const fileSize = file.size / 1000000;

      if (fileSize > 100) {
        enqueueSnackbar(`File ${file.name} exceed more than 100MB`, {
          variant: "warning",
        });
      } else {
        const url = URL.createObjectURL(file);
        fileUrls.push(url);
        acceptedFiles.push(file);
      }
    }

    if (fileType === "audio") {
      setAudioFiles(acceptedFiles);
    }

    if (fileType === "image") {
      setImageFiles(acceptedFiles);
    }

    if (fileType === "video") {
      setVideoFiles(acceptedFiles);
    }

    setFileUrls(fileUrls);
    setFormChangedState(true);
  };

  const resetImage = () => {
    refImage.current.value = "";
    setFormChangedState(false);
    setImageFiles([]);
  };
  const resetVideo = () => {
    refVideo.current.value = "";
    setFormChangedState(false);
    setVideoFiles([]);
  };

  const resetAudio = () => {
    refAudio.current.value = "";
    setFormChangedState(false);
    setAudioFiles([]);
  };

  const uploadFiles = async () => {
    if (imageFiles.length) {
      for (const file of imageFiles) {
        await handleUploadFile(file);
      }
    }

    if (videoFiles.length) {
      for (const file of videoFiles) {
        await handleUploadFile(file);
      }
    }

    if (audioFiles.length) {
      for (const file of audioFiles) {
        await handleUploadFile(file);
      }
    }
  };

  //--------------------------------------------------

  const uploadFileToAzure = async ({
    uploadUri,
    uploadFolderPath,
    uploadToken,
    imageUniqueName,
    file,
  }) => {
    console.log("debug upload", {
      uploadUri,
      uploadFolderPath,
      uploadToken,
      imageUniqueName,
      file,
    });

    await fetch(
      uploadUri + "/" + uploadFolderPath + "/" + imageUniqueName + uploadToken,
      {
        method: "put",
        headers: {
          "x-ms-version": "2018-03-28",
          "x-ms-blob-type": "BlockBlob",
        },
        body: file,
      }
    );
  };
  //--------------------------------------------------
  //API Post report attachment
  const handlePostAttachment = async (uploadFolderPath, savedUniqueName) => {
    const response = await fetch(url + "Report/attachmentsInfo", {
      method: "post",

      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        folderName: uploadFolderPath,
        fileName: "string",
        uniqueName: savedUniqueName,
        reportId: reportData.reportId,
      }),
    });

    if (response.status >= 200 && response.status <= 299) {
      console.log("debug response", response);
      if (loading === true) {
        await getReportDetail();
      }
    }
  };

  const handleUploadFile = async (file) => {
    if (file) {
      const fileSize = file.size / 1000000;

      if (fileSize <= 100) {
        setLoading(false);

        const createFolderNameResponse = await handleCreateFolderName();

        if (createFolderNameResponse) {
          const { uri, uploadFolderPath, token } = createFolderNameResponse;

          await uploadFileToAzure({
            uploadUri: uri,
            uploadFolderPath,
            uploadToken: token,
            imageUniqueName: file.name,
            file,
          });

          await handlePostAttachment(uploadFolderPath, file.name);
        }
      } else {
        setLoading(true);
        setOpenAlert(true);
        setMessage("File size cannot exceed more than 100MB");
        setSeverity("warning");
      }
    } else {
      setLoading(true);
      setOpenAlert(true);
      setMessage("Please select file to upload!");
      setSeverity("warning");
    }
  };

  const renderSelectedImages = useMemo(() => {
    return (
      <ImageList
        style={{ width: "1000px", height: "auto" }}
        cols={3}
        rowHeight="auto"
      >
        {fileUrls.map((url, index) => (
          <ImageListItem key={index}>
            <Zoom>
              <img src={url} srcSet={url} alt="" loading="lazy" width={333} />
            </Zoom>
          </ImageListItem>
        ))}
      </ImageList>
    );
  }, [fileUrls]);

  const renderImages = useMemo(() => {
    return (
      <ImageList
        style={{ width: "1000px", height: "auto" }}
        cols={3}
        rowHeight="auto"
      >
        {listImageUrls.map((url, index) => (
          <ImageListItem key={index}>
            <Zoom>
              <img src={url} srcSet={url} alt="" loading="lazy" width={333} />
            </Zoom>
          </ImageListItem>
        ))}
      </ImageList>
    );
  }, [listImageUrls]);

  const renderVideos = useMemo(
    () =>
      listVideoUrls.map((url, index) => (
        <video data-testid="videos" width="1000" height="500" controls>
          <source key={index} src={url} type="video/mp4" />
        </video>
      )),
    [listVideoUrls]
  );

  const renderAudios = useMemo(
    () =>
      listAudioUrls.map((url, index) => (
        <audio key={index} src={url} controls />
      )),
    [listAudioUrls]
  );

  return (
    <div className="report_detail_container">
      {loading ? (
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
              onClick={handleGoBackFromEdit}
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
              Edit Report
            </p>
          </div>
          {/* status 2 */}
          {reportDetail.status == "2" ? (
            <div>
              <div className="report_detail_body">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="report_detail_title">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginTop: "13px",
                      }}
                    >
                      Title
                    </p>
                    <div
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <div
                        style={{
                          marginLeft: "20px",
                          border: "0.5px solid #7f7f7f",
                          borderRadius: "4px",
                          width: "430px",
                          height: "45px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <p className="title_text">
                          {ReactHtmlParser(reportDetail.title)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="report_detail_status">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Status
                    </p>
                    <div
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <h3 style={{ color: "darkgoldenrod", marginTop: "8px" }}>
                        Created
                      </h3>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="report_detail_date">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginTop: "13px",
                      }}
                    >
                      Date
                    </p>
                    <div
                      style={{
                        marginLeft: "33px",
                      }}
                    >
                      <TextField
                        id="Date"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name="Date"
                        variant="outlined"
                        value={createdDate}
                        style={{
                          backgroundColor: "white",
                        }}
                      />
                    </div>
                  </div>
                  {/* <div className="editor">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Editor
                    </p>
                    <div
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <TextField
                        size="small"
                        value={reportData.createdBy}
                        InputLabelProps={{
                          shrink: true,
                          readOnly: true,
                        }}
                        id="outlined-basic"
                        variant="outlined"
                      />
                    </div>
                  </div> */}
                </div>
              </div>
              {/* //content */}
              <div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginTop: "30px",
                  }}
                >
                  Content
                </p>
                <div className="report_detail_content">
                  <div
                    style={{
                      height: "auto",
                      display: "flex",
                    }}
                  >
                    <p className="title_content">
                      {ReactHtmlParser(reportDetail.content)}
                    </p>
                  </div>
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

                {reportDetail.listFile ? (
                  <div> {renderImages}</div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "13px" }}>There are no items here</p>
                  </div>
                )}

                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginTop: "30px",
                  }}
                >
                  Videos
                </p>

                {reportDetail.listFile ? (
                  <div> {renderVideos}</div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "13px" }}>There are no items here</p>
                  </div>
                )}

                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginTop: "30px",
                  }}
                >
                  Audios
                </p>
                {reportDetail.listFile ? (
                  <div> {renderAudios}</div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "13px" }}>There are no items here</p>
                  </div>
                )}

                <div className="report_detail_blank_space"></div>
              </div>
            </div>
          ) : //status 3
          reportDetail.status == "3" ? (
            <div>
              <div className="report_detail_body">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="report_detail_title">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginTop: "13px",
                      }}
                    >
                      Title
                    </p>
                    <div
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <div
                        style={{
                          marginLeft: "20px",
                          border: "0.5px solid #7f7f7f",
                          borderRadius: "4px",
                          width: "430px",
                          height: "45px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <p className="title_text">
                          {ReactHtmlParser(reportDetail.title)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="report_detail_status">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Status
                    </p>
                    <div
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <h3 style={{ color: "darkgreen", marginTop: "8px" }}>
                        Approved
                      </h3>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="report_detail_date">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginTop: "13px",
                      }}
                    >
                      Date
                    </p>
                    <div
                      style={{
                        marginLeft: "33px",
                      }}
                    >
                      <TextField
                        id="Date"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name="Date"
                        variant="outlined"
                        value={createdDate}
                        style={{
                          backgroundColor: "white",
                        }}
                      />
                    </div>
                  </div>
                  {/* <div className="editor">
                      <p
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginTop: "10px",
                        }}
                      >
                        Editor
                      </p>
                      <div
                        style={{
                          marginLeft: "20px",
                        }}
                      >
                        <TextField
                          size="small"
                          value={reportData.createdBy}
                          InputLabelProps={{
                            shrink: true,
                            readOnly: true,
                          }}
                          id="outlined-basic"
                          variant="outlined"
                        />
                      </div>
                    </div> */}
                </div>
              </div>
              {/* //content */}
              <div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginTop: "30px",
                  }}
                >
                  Content
                </p>
                <div className="report_detail_content">
                  <div
                    style={{
                      height: "auto",
                      display: "flex",
                    }}
                  >
                    <p className="title_content">
                      {ReactHtmlParser(reportDetail.content)}
                    </p>
                  </div>
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
                {reportDetail.listFile ? (
                  <div> {renderImages}</div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "13px" }}>There are no items here</p>
                  </div>
                )}

                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginTop: "30px",
                  }}
                >
                  Videos
                </p>

                {reportDetail.listFile ? (
                  <div> {renderVideos}</div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "13px" }}>There are no items here</p>
                  </div>
                )}

                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginTop: "30px",
                  }}
                >
                  Audios
                </p>
                {reportDetail.listFile ? (
                  <div> {renderAudios}</div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "13px" }}>There are no items here</p>
                  </div>
                )}

                <div className="report_detail_blank_space"></div>
              </div>
            </div>
          ) : reportDetail.status == "1" ? (
            <div>
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
                  data={reportDetail.title}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setTitle(data);
                    checkTitleChanged(data);
                    console.log({ event, editor, title });
                  }}
                  onReady={(editor) => {
                    setTitle(reportDetail.title);
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
                  data={reportDetail.content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                    checkContentChanged(data);

                    console.log({ event, editor, content });
                  }}
                  onReady={(editor) => {
                    setContent(reportDetail.content);
                  }}
                />
              </div>
              {/* //content */}
              <div>
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
                  <label htmlFor="contained-button-image">
                    <Input
                      accept="image/*"
                      id="contained-button-image"
                      multiple
                      type="file"
                      onChange={(e) => handleOnChangeFile(e, "image")}
                      ref={refImage}
                    />
                    <Button variant="contained" component="span">
                      Choose file
                    </Button>
                  </label>
                  {imageFiles.length === 0
                    ? "No file chosen"
                    : `${imageFiles.length} files`}
                  <br />
                  <br />
                  <button onClick={resetImage}>Reset</button>
                  {reportDetail.listFile ? (
                    <div> {renderImages}</div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "13px" }}>
                        There are no items here
                      </p>
                    </div>
                  )}
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
                  <label htmlFor="contained-button-video">
                    <Input
                      accept="video/*"
                      id="contained-button-video"
                      multiple
                      type="file"
                      onChange={(e) => handleOnChangeFile(e, "video")}
                      ref={refVideo}
                    />
                    <Button variant="contained" component="span">
                      Choose file
                    </Button>
                  </label>
                  {videoFiles.length === 0
                    ? "No file chosen"
                    : `${videoFiles.length} files`}
                  <br />
                  <br />
                  <button onClick={resetVideo}>Reset</button>
                  {reportDetail.listFile ? (
                    <div> {renderVideos}</div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "13px" }}>
                        There are no items here
                      </p>
                    </div>
                  )}
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
                  <label htmlFor="contained-button-audio">
                    <Input
                      accept="audio/*"
                      id="contained-button-audio"
                      multiple
                      type="file"
                      onChange={(e) => handleOnChangeFile(e, "audio")}
                      ref={refAudio}
                    />
                    <Button variant="contained" component="span">
                      Choose file
                    </Button>
                  </label>
                  {audioFiles.length === 0
                    ? "No file chosen"
                    : `${audioFiles.length} files`}
                  <br />
                  <br />
                  <button onClick={resetAudio}>Reset</button>
                  {reportDetail.listFile ? (
                    <div> {renderAudios}</div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "13px" }}>
                        There are no items here
                      </p>
                    </div>
                  )}
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
                      startIcon={<SendIcon />}
                      onClick={handleClickOpenSendReportAlertDialog}
                      // disabled={isFormChanged}
                    >
                      Send Report
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={handleClickOpenSaveDraftAlertDialog}
                      disabled={!isFormChanged}
                    >
                      Save Draft
                    </Button>
                  </Stack>
                </div>

                <div className="report_detail_blank_space"></div>
              </div>
            </div>
          ) : reportDetail.status == "4" ? (
            <div>
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
                  data={reportDetail.title}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setTitle(data);
                    checkTitleChanged(data);
                    console.log({ event, editor, title });
                  }}
                  onReady={(editor) => {
                    setTitle(reportDetail.title);
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
                  data={reportDetail.content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                    checkContentChanged(data);
                    console.log({ event, editor, content });
                  }}
                  onReady={(editor) => {
                    setContent(reportDetail.content);
                  }}
                />
              </div>
              {/* //content */}
              <div>
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
                  <label htmlFor="contained-button-image">
                    <Input
                      accept="image/*"
                      id="contained-button-image"
                      multiple
                      type="file"
                      onChange={(e) => handleOnChangeFile(e, "image")}
                      ref={refImage}
                    />
                    <Button variant="contained" component="span">
                      Choose file
                    </Button>
                  </label>
                  {imageFiles.length === 0
                    ? "No file chosen"
                    : `${imageFiles.length} files`}
                  <br />
                  <br />
                  <button onClick={resetImage}>Reset</button>
                  {reportDetail.listFile ? (
                    <div> {renderImages}</div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "13px" }}>
                        There are no items here
                      </p>
                    </div>
                  )}
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
                <div>
                  <label htmlFor="contained-button-video">
                    <Input
                      accept="video/*"
                      id="contained-button-video"
                      multiple
                      type="file"
                      onChange={(e) => handleOnChangeFile(e, "video")}
                      ref={refVideo}
                    />
                    <Button variant="contained" component="span">
                      Choose file
                    </Button>
                  </label>
                  {videoFiles.length === 0
                    ? "No file chosen"
                    : `${videoFiles.length} files`}
                  <br />
                  <br />
                  <button onClick={resetVideo}>Reset</button>
                  {reportDetail.listFile ? (
                    <div> {renderVideos}</div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "13px" }}>
                        There are no items here
                      </p>
                    </div>
                  )}
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
                  <label htmlFor="contained-button-audio">
                    <Input
                      accept="audio/*"
                      id="contained-button-audio"
                      multiple
                      type="file"
                      onChange={(e) => handleOnChangeFile(e, "audio")}
                      ref={refAudio}
                    />
                    <Button variant="contained" component="span">
                      Choose file
                    </Button>
                  </label>
                  {audioFiles.length === 0
                    ? "No file chosen"
                    : `${audioFiles.length} files`}
                  <br />
                  <br />
                  <button onClick={resetAudio}>Reset</button>
                  {reportDetail.listFile ? (
                    <div> {renderAudios}</div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "13px" }}>
                        There are no items here
                      </p>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: "5px" }}>
                  <p style={{ fontSize: "14px" }}>
                    Maximum upload file size: 100 MB
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
                    Reject Reason
                  </p>
                </div>

                <div className="reason_deny">
                  <TextareaAutosize
                    maxRows={1}
                    aria-label="maximum height"
                    value={reportDetail.rejectReason}
                    style={{
                      width: "1000px",
                      height: "100px",
                      fontSize: "16px",
                      paddingTop: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      // borderRadius: "10px",
                      border: "none",
                    }}
                  />
                </div>
                <div className="buttons">
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SendIcon />}
                      onClick={handleClickOpenSendReportAlertDialog}
                      // disabled={isFormChanged}
                    >
                      Send Report
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={handleClickOpenSaveDraftAlertDialog}
                      disabled={!isFormChanged}
                    >
                      Save Draft
                    </Button>
                  </Stack>
                </div>

                <div className="report_detail_blank_space"></div>
              </div>
            </div>
          ) : null}

          {/* save draft dialog */}
          <Dialog
            open={openSaveDraftAlertDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Do you want to save this news ?
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleSaveDraft}>Save Draft</Button>
              <Button
                onClick={handleCloseSaveDraftAlertDialog}
                color="error"
                autoFocus
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          {/* send news dialog */}
          <Dialog
            open={openSendNewsAlertDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Do you want to send this report ?
            </DialogTitle>

            <DialogActions>
              <Button
                onClick={() =>
                  handleSendReport(reportDetail.title, reportDetail.content)
                }
              >
                Send Report
              </Button>
              <Button
                onClick={handleCloseSendNewsAlertDialog}
                color="error"
                autoFocus
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          {/* confirm dialog */}
          <Dialog
            fullScreen={fullScreen}
            open={openConfirm}
            // onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              Leave without saving?
              <IconButton
                aria-label="close"
                onClick={handleCloseConfirm}
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

            <DialogContent>
              <DialogContentText>
                Any unsaved changes will be lost
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus color="primary" onClick={handleGoBack}>
                Leave Page
              </Button>
              <Button onClick={handleCloseConfirm} color="error">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default ReporterDetail_body;
