import React, {useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {Button, Input} from "antd";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
const { TextArea } = Input;

const Comments = (props: any) => {
  const user = useSelector((state: any) => state.user)
  const [Comment, setComment] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const variables = {
      content: Comment,
      writer: user.userData.userId,
      videoId: props.videoId
    }

    axios.post('/api/comment/saveComment', variables)
      .then(res => {
        if (res.data?.ok) {
          setComment("")
          props.refreshFunction(res.data.result)
        } else {
          alert('Failed to save Comment')
        }
      })
  }
  return (
    <div>
      <br />
      <p> replies</p>
      <hr />
      {/* Comment Lists  */}
      {props.CommentLists && props.CommentLists.map((comment: any, index: number) => (
        (!comment.responseTo &&
            <React.Fragment key={index}>
              <SingleComment
                  comment={comment}
                  videoId={props.videoId}
                  refreshFunction={props.refreshFunction}
              />
              {/*<ReplyComment*/}
              {/*    CommentLists={props.CommentLists}*/}
              {/*    videoId={props.videoId}*/}
              {/*    parentCommentId={comment._id}*/}
              {/*    refreshFunction={props.refreshFunction}*/}
              {/*/>*/}
            </React.Fragment>
        )
      ))}

      {/* Root Comment Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
        />
        <br />
        <Button
          style={{ width: '20%', height: '52px', marginLeft: '2px' }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  )
};

export default Comments;
