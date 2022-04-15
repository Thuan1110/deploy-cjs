import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import CloseIcon from "@mui/icons-material/Close";
import { ImageList, ImageListItem } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
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
import "../css/newsDetail_body.css";
import CircularProgress from "@mui/material/CircularProgress";

function NewsDetail_body() {
  const { setMessage, setSeverity, setOpenAlert } = useContext(AlertContext);
  const token = sessionStorage.getItem("token");
  const decoded = jwt_decode(token);
  const history = useHistory();
  const handleView = (e) => {
    history.goBack();
  };
  const location = useLocation();
  const [newsData, setNewsData] = useState(location.state);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(false);
  const [openReject, setOpenReject] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenReject(false);
  };
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
  //GET News Detail
  const [newsDetail, setNewsDetail] = useState([]);
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
            "News/attachments?folderPath=" +
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

  const getNewsDetail = useCallback(async () => {
    const response = await fetch(url + "News?Id=" + newsData.newsId, {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    const newsDetail = data.content;
    if (newsDetail.listFile) {
      const listImage = newsDetail.listFile.filter(
        (file) => ![".mp4", ".mp3"].includes(file.extension)
      );
      const listVideo = newsDetail.listFile.filter(
        (file) => file.extension === ".mp4"
      );
      const listAudio = newsDetail.listFile.filter(
        (file) => file.extension === ".mp3"
      );

      console.log("debug listImage", listImage);

      const listImageUrls = await convertListFileToImages(listImage);
      const listVideoUrls = await convertListFileToImages(listVideo);
      const listAudioUrls = await convertListFileToImages(listAudio);

      console.log("debug newsDetail.listFile", newsDetail.listFile);
      console.log("debug listFileUrls", listImageUrls);
      setListImageUrls(listImageUrls);
      setListVideoUrls(listVideoUrls);
      setListAudioUrls(listAudioUrls);
    }

    setNewsDetail(newsDetail);
    setCreatedDate(newsDetail.createdDate.substring(0, 10));
    setLoading(true);
  }, [convertListFileToImages, newsData.newsId, token]);

  useEffect(() => {
    (async () => {
      await getNewsDetail();
    })();
  }, [getNewsDetail, newsData.newsId]);

  /************************************ */
  //API Approve News

  const handleApprove = async (titles, contents) => {
    // e.preventDefault();
    const response = await fetch(url + "News/approve", {
      method: "post",

      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        newsId: newsData.newsId,
        userId: 0,
        type: 2,
      }),
    });

    if (response.status >= 200 && response.status <= 299) {
      setOpenAlert(true);
      setMessage("Approved successfully!");
      setSeverity("success");
      setOpenApproveAlertDialog(false);
      await getNewsDetail();
    }
  };
  /********************************************** */

  /********************************************** */
  //API Reject News
  const [rejectReason, setRejectReason] = useState("");
  const handleChangeReason = (e) => {
    setRejectReason(e.target.value);
  };
  const handleRejectNews = useCallback(async () => {
    // e.preventDefault();
    const response = await fetch(url + "News/deny", {
      method: "post",

      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        newsId: newsData.newsId,
        rejectReason: rejectReason,
      }),
    });

    if (response.status >= 200 && response.status <= 299) {
      setOpenAlert(true);
      setMessage("Rejected");
      setOpenRejectAlertDialog(false);
      setSeverity("success");
      await getNewsDetail();
    }
  }, [
    getNewsDetail,
    newsData.newsId,
    rejectReason,
    setMessage,
    setOpenAlert,
    setSeverity,
    token,
  ]);
  /*************************************************** */
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
        setMessage("The Reason field is required!");
        setSeverity("warning");
      } else handleRejectNews(e);
    },
    [rejectReason, handleRejectNews, setOpenAlert, setMessage, setSeverity]
  );
  return (
    <div className="news_detail_container">
      {loading ? (
        <div>
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
                News Detail
              </p>
            </div>
            <div className="news_detail_body">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="news_detail_title">
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
                      <p className="title_text_publisher">
                        {ReactHtmlParser(newsDetail.title)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="news_detail_status">
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
                    {newsDetail.status == "2" ? (
                      <h3 style={{ color: "darkgoldenrod", marginTop: "8px" }}>
                        Created
                      </h3>
                    ) : newsDetail.status == "3" ? (
                      <h3 style={{ color: "darkgreen", marginTop: "8px" }}>
                        Approved
                      </h3>
                    ) : (
                      <h3 style={{ color: "brown", marginTop: "8px" }}>
                        Denied
                      </h3>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="news_detail_date">
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
                      // type="date"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="Date"
                      variant="outlined"
                      // defaultValue={createdDate}
                      value={createdDate}
                      // onChange={handleSearchDateChange}
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
                    Editor
                  </p>
                  <div
                    style={{
                      marginLeft: "20px",
                    }}
                  >
                    <TextField
                      size="small"
                      value={newsData.createdBy}
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
              <div className="news_detail_content_publisher">
                <div
                  style={{
                    height: "auto",
                    display: "flex",
                  }}
                >
                  <p className="content_text_publisher">
                    {ReactHtmlParser(newsDetail.content)}
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

              {newsDetail.listFile ? (
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
              {newsDetail.listFile ? (
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
              {newsDetail.listFile ? (
                <div> {renderAudios}</div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "13px" }}>There are no items here</p>
                </div>
              )}

              {newsDetail.status == "2" ? (
                <div className="buttons">
                  <Stack direction="row" spacing={2}>
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
              ) : null}
              {newsDetail.status == "4" ? (
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
                      value={newsDetail.rejectReason}
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
              ) : null}
              <div className="news_detail_blank_space"></div>
            </div>
          </div>

          {/* reject dialog */}
          <Dialog
            open={openRejectAlertDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Please enter a reason to deny this news
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
            <form onSubmit={handleSubmitForm} noValidate>
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
              Do you want to approve this news?
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleApprove}>Approve</Button>
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

export default NewsDetail_body;
