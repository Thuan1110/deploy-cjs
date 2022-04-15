import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useHistory } from "react-router-dom";
import "../css/newsDetail_body.css";

function ViewDetailNews_body() {
  const history = useHistory();
  const handleView = (e) => {
    history.goBack();
  };

  const itemData = [
    {
      img: "/assets/images/cool-background.png",
      title: "Breakfast",
    },
    {
      img: "/assets/images/hoc-truc-tiepanh-bia-7285.jpg",
      title: "Burger",
    },
    {
      img: "/assets/images/hoc-sinh-den-truong1-5139.jpg",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
    },
  ];

  const videoData = [
    {
      video:
        "/assets/videos/y2mate.com - Ed Sheeran  Shivers Official Lyric Video_1080p.mp4",
    },
    {
      video:
        "/assets/videos/y2mate.com - Ed Sheeran  Shivers Official Lyric Video_1080p.mp4",
    },
  ];
  return (
    <div className="news_detail_container">
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
          <div className="title">
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
              <TextField
                size="small"
                value="News 1"
                id="outlined-basic"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="date">
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
                  type="date"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="Date"
                  variant="outlined"
                  value="2022-12-28"
                  // value={searchDate}
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
                  value="Thuan"
                  id="outlined-basic"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <p
            style={{ fontSize: "18px", fontWeight: "bold", marginTop: "30px" }}
          >
            Content
          </p>
          <div className="content">
            <TextareaAutosize
              maxRows={1}
              aria-label="maximum height"
              defaultValue="Thông tin đáng chú ý về tình hình Covid-19 hôm nay: Ban chỉ đạo phòng, chống dịch Covid-19 TP.HCM giải thích về số ca nhiễm mới trong 1 tuần qua ở TP.HCM đều dưới 1.000 ca khiến nhiều người băn khoăn đây có phải là con số thật.
                  Tin tức tình hình Covid-19 hôm nay: Xác định biến chủng Omicron thông qua giải trình tự gen, không phải xét nghiệm RT-PCR. Trưa 27.12, Trung tâm Báo chí TP.HCM phát đi thông báo liên quan đến tin đồn về 1 người dân ở TP.HCM bị nhiễm Covid-19 biến chủng Omicron sau khi có kết quả xét nghiệm RT-PCR tại Bệnh viện FV. Sở Y tế TP.HCM khẳng định nội dung này là sai sự thật, giấy xác nhận lan truyền là giả mạo. Đến nay, thành phố chưa ghi nhận trường hợp nào nhiễm biến chủng mới Omicron. Theo Trung tâm Kiểm soát bệnh tật TP.HCM, muốn biết ca mắc thuộc biến chủng gì phải trải qua quy trình giải mã trình tự gen, không thể chỉ với xét nghiệm RT-PCR mà có thể xác định được."
              style={{
                width: "1000px",
                height: "200px",
                fontSize: "16px",
                paddingTop: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
                // borderRadius: "10px",
                border: "none",
              }}
            />
          </div>
          <p
            style={{ fontSize: "18px", fontWeight: "bold", marginTop: "30px" }}
          >
            Images
          </p>

          <div className="image">
            <ImageList
              style={{ width: "1000px", height: "auto" }}
              //   sx={{ width: 1000, height: 300 }}
              cols={3}
              rowHeight={"auto"}
            >
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <Zoom>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                      width={333}
                    />
                  </Zoom>
                </ImageListItem>
              ))}
            </ImageList>
          </div>

          <p
            style={{ fontSize: "18px", fontWeight: "bold", marginTop: "30px" }}
          >
            Videos
          </p>
          <div>
            {videoData.map((item) => (
              <video className="video" width="1000" height="500" controls>
                <source src={item.video} type="video/mp4" />
              </video>
            ))}
          </div>
          {/* <video className="video" width="1000" height="500" controls>
              
              <source
                src="/assets/videos/y2mate.com - Ed Sheeran  Shivers Official Lyric Video_1080p.mp4"
                type="video/mp4"
              />
              <source
                src="/assets/videos/y2mate.com - Ed Sheeran  Shivers Official Lyric Video_1080p.mp4"
                type="video/mp4"
              />
            </video> */}
        </div>
      </div>
    </div>
  );
}

export default ViewDetailNews_body;
