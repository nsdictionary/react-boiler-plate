import React, {useState} from "react";

const LikeDislikes = (props: any) => {
  const [Likes, setLikes] = useState(0)
  const [Dislikes, setDislikes] = useState(0)
  const [LikeAction, setLikeAction] = useState(null)
  const [DislikeAction, setDislikeAction] = useState(null)
  let variable = {};

  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId }
  } else {
    variable = { commentId: props.commentId, userId: props.userId }
  }

  return <div>LikeDislikes</div>;
};

export default LikeDislikes;
