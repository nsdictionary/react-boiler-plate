import React, {useEffect, useState} from "react";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from "axios";
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

const SubscriptionPage = (props: any) => {
  const [Videos, setVideos] = useState<any>([])
  const variable = { userFrom : localStorage.getItem('userId')  }

  useEffect(() => {
    axios.post('/api/video/getSubscriptionVideos', variable)
      .then(res => {
        console.log(res);
        if (res.data?.ok) {
          setVideos(res.data.videos)
        } else {
          alert('Failed to get subscription videos')
        }
      })
  }, [])

  const renderCards = Videos.map((video: any, index:number) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);

    return <Col key={index} lg={6} md={8} xs={24}>
      <div style={{ position: 'relative' }}>
        <a href={`/video/${video._id}`} >
          <img
            style={{ width: '100%' }}
            alt="thumbnail"
            src={`http://localhost:5000/${video.thumbnail}`}
          />
          <div className=" duration">
            <span>{minutes} : {seconds}</span>
          </div>
        </a>
      </div><br />
      <Meta avatar={<Avatar src={video.writer.image} />} title={video.title}/>
      <span>{video.writer.name} </span><br />
      <span style={{ marginLeft: '3rem' }}> {video.views}</span>
      - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
    </Col>

  })

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2} > Subscribed Videos </Title>
      <hr />
      <Row style={{marginTop: "1.2rem"}} gutter={16}>
        {renderCards}
      </Row>
    </div>
  )
};

export default SubscriptionPage;
