import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import Message from "../../../common/component/Message";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Send from "../../../common/component/Send";
import { setMsgRead } from "../../../app/slices/message";
import Contact from "../../../common/component/Contact";
import Layout from "../Layout";
import {
  StyledNotification,
  StyledContacts,
  StyledChannelChat,
  StyledHeader,
} from "./styled";

export default function ChannelChat({
  cid = "",
  unreads = 0,
  data = {},
  dropFiles = [],
}) {
  // const containerRef = useRef(null);
  const [dragFiles, setDragFiles] = useState([]);
  const dispatch = useDispatch();
  const { msgs, userIds } = useSelector((store) => {
    return {
      msgs: store.channelMessage[cid] || [],
      userIds: store.contacts.ids,
    };
  });
  const handleClearUnreads = () => {
    dispatch(setMsgRead(msgs));
  };
  useEffect(() => {
    if (dropFiles.length) {
      setDragFiles(dropFiles);
    }
  }, [dropFiles]);
  const { name, description, is_public, members = [] } = data;
  const filteredUsers =
    members.length == 0
      ? userIds
      : userIds.filter((id) => {
          return members.includes(id);
        });
  console.log("channel message list", msgs);
  return (
    <Layout
      setDragFiles={setDragFiles}
      // ref={containerRef}
      header={
        <StyledHeader>
          <div className="txt">
            <ChannelIcon personal={!is_public} />
            <span className="title">{name}</span>
            <span className="desc">{description}</span>
          </div>
          <ul className="opts">
            <li className="opt">
              <img
                src="https://static.nicegoodthings.com/project/rustchat/icon.alert.svg"
                alt="opt icon"
              />
            </li>
            <li className="opt">
              <img
                src="https://static.nicegoodthings.com/project/rustchat/icon.pin.svg"
                alt="opt icon"
              />
            </li>
            <li className="opt">
              <img
                src="https://static.nicegoodthings.com/project/rustchat/icon.people.svg"
                alt="opt icon"
              />
            </li>
          </ul>
        </StyledHeader>
      }
      contacts={
        <StyledContacts>
          {filteredUsers.map((uid) => {
            return <Contact key={uid} uid={uid} popover />;
          })}
        </StyledContacts>
      }
    >
      <StyledChannelChat>
        <div className="wrapper">
          <div className="info">
            <h2 className="title">Welcome to #{name} !</h2>
            <p className="desc">This is the start of the #{name} channel. </p>
            {/* <button className="edit">Edit Channel</button> */}
          </div>
          <div className="chat">
            {msgs.map((mid, idx) => {
              if (!mid) return null;
              return <Message key={idx} mid={mid} />;
            })}
          </div>
        </div>

        <Send dragFiles={dragFiles} id={cid} type="channel" name={name} />
        <div className="placeholder"></div>
      </StyledChannelChat>
      {unreads != 0 && (
        <StyledNotification>
          <div className="content">
            {unreads} new messages
            {msgs.lastAccess
              ? `since ${dayjs(msgs.lastAccess).format("YYYY-MM-DD h:mm:ss A")}`
              : ""}
          </div>
          <button onClick={handleClearUnreads} className="clear">
            Mark As Read
          </button>
        </StyledNotification>
      )}
    </Layout>
  );
}
