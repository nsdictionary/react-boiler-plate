import React, {useEffect, useState} from "react";
import {Avatar, Col, List, Row} from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscriber from "./Sections/Subscriber";
import LikeDislikes from "./Sections/LikeDislikes";

const VideoDetailPage = (props: any) => {
  const videoId = props.match.params.videoId
  const [Video, setVideo] = useState<any>([])
  const [CommentLists, setCommentLists] = useState<any>([])

  useEffect(() => {
    axios.post('/api/video/getVideo', {videoId})
      .then(res => {
        if (res.data.ok) {
          setVideo(res.data.video)
        } else {
          alert('Failed to get video Info')
        }
      })
  }, [props.playingId]);

  if (Video.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div className="postPage" style={{width: '100%', padding: '3rem 4em'}}>
            <video
              style={{width: '100%'}}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            />
            <List.Item
              actions={[
                <LikeDislikes
                  video
                  videoId={videoId}
                  userId={localStorage.getItem('userId')}
                />,
                <Subscriber
                  userTo={Video.writer._id}
                  userFrom={localStorage.getItem('userId')}
                />
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer && Video.writer.image}/>}
                title={
                  <>
                    <span>{Video.writer.name}</span><br/>
                    <a href="https://ant.design">
                      <span style={{fontSize: "1rem"}}>{Video.title}</span>
                    </a>
                  </>
                }
                description={Video.description}
              />
            </List.Item>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo playingId={Video._id}/>
        </Col>
      </Row>
    );
  } else {
    return (
      <div>Loading...</div>
    )
  }
};

export default VideoDetailPage;
