import React, {useEffect, useState} from "react";
import {Avatar, Col, List, Row} from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscriber from "./Sections/Subscriber";
import LikeDislikes from "./Sections/LikeDislikes";
import Loading from "../../Loading";
import {useSelector} from "react-redux";
import Comments from "./Sections/Comments";

const VideoDetailPage = (props: any) => {
  const user = useSelector((state: any) => state.user);
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

    axios.post('/api/comment/getComments', {videoId})
      .then(res => {
        if (res.data?.ok) {
          // console.log('res.data.comments', res.data.comments)
          setCommentLists(res.data.comments)
        } else {
          alert('Failed to get video Info')
        }
      })
  }, [videoId]);

  if (Video.writer) {
    const userId = localStorage.getItem('userId');

    let listActions = [];

    if(user.userData && user.userData?.isAuth) {
      listActions.push(<LikeDislikes
        video
        videoId={videoId}
        userId={localStorage.getItem('userId')}
      />);

      if (Video.writer._id !== userId ) {
       listActions.push(<Subscriber
         userTo={Video.writer._id}
         userFrom={localStorage.getItem('userId')}
       />)
      }
    }

    const updateComment = (newComment: any) => {
      setCommentLists([...CommentLists, ...newComment]);
    }
    const removeComment = (commentId: string) => {
      axios.post('/api/comment/removeComment', {commentId})
        .then(res => {
          if (res.data?.ok) {
            setCommentLists(CommentLists
              .filter((comment:any) => comment._id !== commentId))
          } else {
            alert('Failed to remove Comment')
          }
        })
    }

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
              actions={listActions}
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
            <Comments
              CommentLists={CommentLists}
              videoId={Video._id}
              refreshFunction={updateComment}
              removeFunction={removeComment}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo playingId={Video._id}/>
        </Col>
      </Row>
    );
  } else {
    return (
      <Loading />
    )
  }
};

export default VideoDetailPage;
