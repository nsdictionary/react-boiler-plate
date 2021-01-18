import React, {useEffect, useState} from "react";
import SingleComment from "./SingleComment";

const ReplyComment = (props: any) => {
  const [ChildCommentNumber, setChildCommentNumber] = useState<number>(0)
  const [OpenReplyComments, setOpenReplyComments] = useState<boolean>(false)

  useEffect(() => {
    let commentNumber = 0;
    props.CommentLists.map((comment: any) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++
      }
    })
    setChildCommentNumber(commentNumber)
  }, [props.CommentLists, props.parentCommentId])

  const renderReplyComment = (parentCommentId: string) =>
    props.CommentLists.map((comment: any, index: number) => (
      <React.Fragment key={index}>
        {comment.responseTo === parentCommentId &&
        <div style={{width: '80%', marginLeft: '40px'}}>
          <SingleComment
              comment={comment}
              videoId={props.videoId}
              refreshFunction={props.refreshFunction}
          />
          <ReplyComment
              CommentLists={props.CommentLists}
              parentCommentId={comment._id}
              videoId={props.videoId}
              refreshFunction={props.refreshFunction}
          />
        </div>
        }
      </React.Fragment>
    ))

  const handleChange = () => {
    setOpenReplyComments(!OpenReplyComments)
  }

  return (
    <div>
      {ChildCommentNumber > 0 &&
        <p
          style={{fontSize: '14px', margin: 0, color: 'gray'}}
          onClick={handleChange}
        >
          View {ChildCommentNumber} more comment(s)
        </p>
      }

      {OpenReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  )
};

export default ReplyComment;
