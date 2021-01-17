import React, {useEffect, useState} from "react";
import {Typography, Row} from 'antd';
import axios from "axios";
import VideoCard from "../../VideoCard";

const {Title} = Typography;

const SubscriptionPage = (props: any) => {
  const [Videos, setVideos] = useState<any>([])

  useEffect(() => {
    const variable = {userFrom: localStorage.getItem('userId')}
    axios.post('/api/video/getSubscriptionVideos', variable)
      .then(res => {
        if (res.data?.ok) {
          setVideos(res.data.videos)
        } else {
          alert('Failed to get subscription videos')
        }
      })
  }, [])

  const renderCards = Videos.map((video: any, index: number) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);
    return <VideoCard key={index} video={video} minutes={minutes} seconds={seconds}/>
  })

  return (
    <div style={{width: '85%', margin: '3rem auto'}}>
      <Title level={2}> Subscribed Videos </Title>
      <hr/>
      <Row style={{marginTop: "1.2rem"}} gutter={16}>
        {renderCards}
      </Row>
    </div>
  )
};

export default SubscriptionPage;
