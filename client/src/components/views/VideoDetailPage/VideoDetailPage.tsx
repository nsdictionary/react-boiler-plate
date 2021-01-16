import React, {useEffect, useState} from "react";
import {Avatar, Col, List, Row} from "antd";
import axios from "axios";

const VideoDetailPage = (props: any) => {
  const videoId = props.match.params.videoId
  const [Video, setVideo] = useState<any>([])
  const [CommentLists, setCommentLists] = useState<any>([])

  useEffect(() => {
    axios.post('/api/video/getVideo', {videoId})
      .then(res => {
        if (res.data.ok) {
          console.log(res.data.video)
          setVideo(res.data.video)
        } else {
          alert('Failed to get video Info')
        }
      })
  }, []);

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
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                title={<a href="https://ant.design">{Video.title}</a>}
                description={Video.description}
              />
            </List.Item>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          Side Videos
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
