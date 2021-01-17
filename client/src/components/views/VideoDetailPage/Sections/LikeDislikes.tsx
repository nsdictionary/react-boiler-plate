import React, {useEffect, useState} from "react";
import { Tooltip, Icon } from 'antd';
import axios from "axios";

const LikeDislikes = (props: any) => {
  const [Likes, setLikes] = useState(0)
  const [Dislikes, setDislikes] = useState(0)
  const [LikeAction, setLikeAction] = useState<null | string>(null)
  const [DislikeAction, setDislikeAction] = useState<null | string>(null)
  let variable = {};

  if (props.video) {
    variable = {videoId: props.videoId, userId: props.userId}
  } else {
    variable = {commentId: props.commentId, userId: props.userId}
  }

  useEffect(() => {
    axios.post('/api/like/getLikes', variable)
      .then(res => {
        // console.log('getLikes', res.data)
        if (res.data?.ok) {
          //How many likes does this video or comment have
          setLikes(res.data.likes.length)

          //if I already click this like button or not
          res.data.likes.map((like: any) => {
            if (like.userId === props.userId) {
              setLikeAction('liked')
            }
          })
        } else {
          alert('Failed to get likes')
        }
      })

    axios.post('/api/like/getDislikes', variable)
      .then(res => {
        // console.log('getDislike', res.data)
        if (res.data?.ok) {
          //How many likes does this video or comment have
          setDislikes(res.data.dislikes.length)

          //if I already click this like button or not
          res.data.dislikes.map((dislike: any) => {
            if (dislike.userId === props.userId) {
              setDislikeAction('disliked')
            }
          })
        } else {
          alert('Failed to get dislikes')
        }
      })
  }, [])

  const onLike = () => {
  };
  const onDisLike = () => {
  };

  return (
    <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                          theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                          onClick={onLike}/>
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto'}}>{Likes}</span>
            </span>&nbsp;&nbsp;
      <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon
                      type="dislike"
                      theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                      onClick={onDisLike}
                    />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto'}}>{Dislikes}</span>
            </span>
    </React.Fragment>
  )
};

export default LikeDislikes;
