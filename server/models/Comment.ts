import { model, Schema } from "mongoose";

const commentSchema = new Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: 'Video'
  },
  responseTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String
  }
}, { timestamps: true })

const Comment = model("Comment", commentSchema);
export default Comment;
