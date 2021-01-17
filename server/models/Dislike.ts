import { model, Schema } from "mongoose";

const dislikeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: 'Video'
  }

}, { timestamps: true })

const Video = model("Dislike", dislikeSchema);
export default Video;
