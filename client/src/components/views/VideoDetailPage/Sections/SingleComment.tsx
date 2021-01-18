import React, {useState} from "react";
import {Comment, Avatar, Button, Input, Tooltip, Icon} from 'antd';
import axios from "axios";
import {useSelector} from "react-redux";
import LikeDislikes from "./LikeDislikes";

const {TextArea} = Input;

const SingleComment = (props: any) => {
  const user = useSelector((state: any) => state.user);
  const [CommentValue, setCommentValue] = useState<string>("")
  const [OpenReply, setOpenReply] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.currentTarget.value)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const variables = {
      writer: user.userData.userId,
      videoId: props.videoId,
      responseTo: props.comment._id,
      content: CommentValue
    }

    axios.post('/api/comment/saveComment', variables)
      .then(res => {
        if (res.data?.ok) {
          setCommentValue("")
          setOpenReply(!OpenReply)
          props.refreshFunction(res.data.result)
        } else {
          alert('Failed to save Comment')
        }
      })
  }

  let actions = [
    <LikeDislikes
      comment
      commentId={props.comment._id}
      userId={localStorage.getItem('userId')}
    />,
    <span onClick={() => setOpenReply(!OpenReply)} key="comment-basic-reply-to">Reply to</span>
  ]

  if (user.userData && user.userData?.isAuth
    && user.userData.userId === props.comment.writer._id) {
    actions.push(
      <Tooltip title="Remove">
        <Icon type="delete" onClick={()=>props.removeFunction(props.comment._id)}/>
      </Tooltip>
    );

  }

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="image"/>}
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {OpenReply &&
      <form style={{display: 'flex'}} onSubmit={onSubmit}>
        <TextArea
            style={{width: '100%', borderRadius: '5px'}}
            onChange={handleChange}
            value={CommentValue}
            placeholder="write some comments"
        />
        <br/>
        <Button
            style={{width: '20%', height: '52px', marginLeft: '2px'}}
            onClick={onSubmit}>Submit</Button>
      </form>
      }
    </div>
  );
};

export default SingleComment;
