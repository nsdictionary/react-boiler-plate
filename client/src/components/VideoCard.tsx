import React from "react";
import moment from "moment";
import { Card, Avatar, Col} from 'antd';
import {Link} from "react-router-dom";
const { Meta } = Card;


interface IProps {
  video: any,
  minutes: number,
  seconds: number,
}

const VideoCard = ({video, minutes, seconds}: IProps) => {
  return <Col lg={6} md={8} xs={24}>
    <div style={{ position: 'relative' }}>
      <Link to={`/video/${video._id}`} >
        <img
          style={{ width: '100%' }}
          alt="thumbnail"
          src={`http://localhost:5000/${video.thumbnail}`}
        />
        <div className=" duration">
          <span>{minutes} : {seconds}</span>
        </div>
      </Link>
    </div><br />
    <Meta avatar={<Avatar src={video.writer.image} />} title={video.title}/>
    <span>{video.writer.name} </span><br />
    <span style={{ marginLeft: '3rem' }}> {video.views}</span>
    - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
  </Col>
};

export default VideoCard;
