import { model, Schema } from "mongoose";

const subscriberSchema = new Schema({
  userTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userFrom : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

}, { timestamps: true })


const Subscriber = model('Subscriber', subscriberSchema);
export default Subscriber;
