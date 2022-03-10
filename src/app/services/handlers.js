import toast from "react-hot-toast";
import { ContentTypes } from "../config";
import {
  addChannelMsg,
  deleteChannelMsg,
  replaceChannelMsg,
} from "../slices/message.channel";
import {
  addUserMsg,
  addUserPendingMsg,
  removeUserPendingMsg,
  replaceUserPendingMsg,
} from "../slices/message.user";

import { addMsg } from "../slices/message";
export const onMessageSendStarted = async (
  { id, content, type, from_uid },
  { dispatch, queryFulfilled },
  from = "channel"
) => {
  // id: who send to ,from_uid: who sent
  const ts = new Date().getTime();
  const addPendingMessage = from == "channel" ? addChannelMsg : addUserMsg;
  const replacePendingMessage =
    from == "channel" ? replaceChannelMsg : replaceUserPendingMsg;
  const removePendingMessage =
    from == "channel" ? deleteChannelMsg : removeUserPendingMsg;
  const tmpMsg = {
    content: type == "image" ? URL.createObjectURL(content) : content,
    content_type: ContentTypes[type],
    created_at: ts,
    mid: ts,
    from_uid,
    // unread: false,
  };
  dispatch(addMsg(tmpMsg));
  dispatch(addPendingMessage({ id, mid: ts }));
  try {
    const { data: server_mid } = await queryFulfilled;
    console.log("message server mid", server_mid);
    // 此处的id，是指给谁发的
    // const addMessage = from == "channel" ? addChannelMsg : addUserMsg;
    dispatch(replacePendingMessage({ id, local_mid: ts, server_mid }));
    // dispatch(removePendingMessage({ id, mid:ts, type: from }));
  } catch {
    console.log("message send failed");
    toast.error("Send Message Failed");
    dispatch(removePendingMessage({ id, mid: ts }));
    // patchResult.undo();
  }
};
