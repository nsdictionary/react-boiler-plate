import React, {useEffect, useState} from "react";
import SingleComment from "./SingleComment";

const ReplyComment = (props: any) => {
  const [ChildCommentNumber, setChildCommentNumber] = useState<number>(0)
  const [OpenReplyComments, setOpenReplyComments] = useState<boolean>(false)

  useEffect(() => {
    const replyCommentCount: number = props.CommentLists
      .filter((comment:any) => comment.responseTo === props.parentCommentId)
      .length
    setChildCommentNumber(replyCommentCount);
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
    ));

  return (
    <div>
      {ChildCommentNumber > 0 &&
        <p
          style={{fontSize: '14px', margin: 0, color: 'gray'}}
          onClick={() => setOpenReplyComments(!OpenReplyComments)}
        >
          View {ChildCommentNumber} more comment(s)
        </p>
      }

      {OpenReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  )
};

export default ReplyComment;
