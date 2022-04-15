import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Stack from "@mui/material/Stack";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import jwt_decode from "jwt-decode";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactHtmlParser from "react-html-parser";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useHistory, useLocation } from "react-router-dom";
import { AlertContext } from "../../../Providers/AlertDialogProvider";
import { url } from "../../../url";
import "../css/reportDetail_body.css";

function ReportsDetail_body() {
  const { setMessage, setSeverity, setOpenAlert } = useContext(AlertContext);
  const token = sessionStorage.getItem("token");
  const decoded = jwt_decode(token);
  const [render, setRender] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const [reportData, setReportData] = useState(location.state);
  const handleView = (e) => {
    history.goBack();
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  //reject dialog
  const [openRejectAlertDialog, setOpenRejectAlertDialog] =
    React.useState(false);

  const handleClickOpenRejectAlertDialog = () => {
    setOpenRejectAlertDialog(true);
  };

  const handleCloseRejectAlertDialog = () => {
    setOpenRejectAlertDialog(false);
  };
  //approve dialog
  const [openApproveAlertDialog, setOpenApproveAlertDialog] =
    React.useState(false);

  const handleClickOpenApproveAlertDialog = () => {
    setOpenApproveAlertDialog(true);
  };

  const handleCloseApproveAlertDialog = () => {
    setOpenApproveAlertDialog(false);
  };
  /*********************************** */

  //GET Reports Detail
  const [reportDetail, setReportDetail] = useState([]);
  const [createdDate, setCreatedDate] = useState("");
  const [listImageUrls, setListImageUrls] = useState([]);
  const [listVideoUrls, setListVideoUrls] = useState([]);
  const [listAudioUrls, setListAudioUrls] = useState([]);
  const [loading, setLoading] = useState(false);

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
              // "Access-Control-Allow-Origin": "*",
              Accept: "application/json",
              "Content-Type": "application/json",
              // mode: "cors",
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

      const asd = URL.createObjectURL(fileBlob);

      return asd;
    },
    [fetchFileBlob]
  );

  const convertListFileToImages = useCallback(
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
      const listImageUrls = await convertListFileToImages(listImage);
      const listVideoUrls = await convertListFileToImages(listVideo);
      const listAudioUrls = await convertListFileToImages(listAudio);
      console.log("debug listImage", listImage);

      console.log("debug reportDetail.listFile", reportDetail.listFile);
      console.log("debug listFileUrls", listImageUrls);
      setListImageUrls(listImageUrls);
      setListVideoUrls(listVideoUrls);
      setListAudioUrls(listAudioUrls);
    }
    setLoading(true);
    setReportDetail(reportDetail);
    setCreatedDate(reportDetail.createdDate.substring(0, 10));
  }, [convertListFileToImages, reportData.reportId, token]);

  useEffect(() => {
    (async () => {
      await getReportDetail();
    })();
  }, [getReportDetail, reportData.reportId]);
  /********************************************** */
  //API Update Report and Make News

  const handleMakeNews = async (e) => {
    e.preventDefault();
    const response = await fetch(url + "Report/approve", {
      method: "post",

      headers: {
        Authorization: "Bearer " + token,
        Accept: "text/plain",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: reportData.reportId,
        type: 2,
      }),
    });

    if (response.status >= 200 && response.status <= 299) {
      setOpenAlert(true);
      setMessage("Approve successfully!");

      setOpenApproveAlertDialog(false);
      await getReportDetail();
    }
  };

  /********************************************** */
  //API Reject Report
  const [rejectReason, setRejectReason] = useState("");
  const handleChangeReason = (e) => {
    setRejectReason(e.target.value);
  };

  const handleRejectReport = useCallback(async () => {
    // e.preventDefault();
    const response = await fetch(url + "Report/deny", {
      method: "post",

      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ReportId: reportData.reportId,
        Reason: rejectReason,
      }),
    });

    if (response.status >= 200 && response.status <= 299) {
      setOpenAlert(true);
      setMessage("Rejected!");
      setSeverity("success");
      setOpenRejectAlertDialog(false);
      await getReportDetail();
    }
  }, [
    getReportDetail,
    rejectReason,
    reportData.reportId,
    setMessage,
    setOpenAlert,
    setSeverity,
    token,
  ]);
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
  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!rejectReason) {
        setOpenAlert(true);
        setMessage("The Reason field is required");
        setSeverity("warning");
      } else handleRejectReport(e);
    },
    [handleRejectReport, rejectReason, setMessage, setOpenAlert, setSeverity]
  );
  return (
    <div className="news_detail_container">
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
              Edit News
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
                  <div className="editor">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Reporter
                    </p>
                    <div
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <TextField
                        size="small"
                        value={reportDetail.reporter}
                        InputLabelProps={{
                          shrink: true,
                          readOnly: true,
                        }}
                        id="outlined-basic"
                        variant="outlined"
                      />
                    </div>
                  </div>
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
                <div className="buttons">
                  <Stack direction="row" spacing={2}>
                    {/* <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CheckIcon />}
                            onClick={handleApprove}
                          >
                            Approve
                          </Button> */}
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CheckIcon />}
                      onClick={handleClickOpenApproveAlertDialog}
                    >
                      Approve
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<ClearSharpIcon />}
                      onClick={handleClickOpenRejectAlertDialog}
                    >
                      Deny
                    </Button>
                  </Stack>
                </div>
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
                  <div className="editor">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Reporter
                    </p>
                    <div
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <TextField
                        size="small"
                        value={reportDetail.reporter}
                        InputLabelProps={{
                          shrink: true,
                          readOnly: true,
                        }}
                        id="outlined-basic"
                        variant="outlined"
                      />
                    </div>
                  </div>
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

                <div className="news_detail_blank_space"></div>
              </div>
            </div>
          ) : reportDetail.status == "4" ? (
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
                      <h3 style={{ color: "brown", marginTop: "8px" }}>
                        Denied
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
                  <div className="editor">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Reporter
                    </p>
                    <div
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <TextField
                        size="small"
                        value={reportDetail.reporter}
                        InputLabelProps={{
                          shrink: true,
                          readOnly: true,
                        }}
                        id="outlined-basic"
                        variant="outlined"
                      />
                    </div>
                  </div>
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
                <div>
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
                </div>

                <div className="news_detail_blank_space"></div>
              </div>
            </div>
          ) : null}

          {/* deny dialog */}
          <Dialog
            open={openRejectAlertDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <form onSubmit={handleSubmitForm} noValidate>
              {" "}
              <DialogTitle id="alert-dialog-title">
                Please enter a reason to deny this report
                <IconButton
                  aria-label="close"
                  onClick={handleCloseRejectAlertDialog}
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
                <TextField
                  size="small"
                  id="reason_reject"
                  type="text"
                  name="reason_reject"
                  variant="outlined"
                  label="Reason"
                  multiline
                  required
                  maxRows={5}
                  aria-label="maximum height"
                  defaultValue={rejectReason}
                  onChange={handleChangeReason}
                  style={{ width: "450px", marginTop: "5px" }}
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit">Deny</Button>
                <Button
                  onClick={handleCloseRejectAlertDialog}
                  color="error"
                  autoFocus
                >
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          {/* approve dialog */}
          <Dialog
            open={openApproveAlertDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Do you want to approve this report?
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleMakeNews}>Approve</Button>
              <Button
                onClick={handleCloseApproveAlertDialog}
                color="error"
                autoFocus
              >
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

export default ReportsDetail_body;
