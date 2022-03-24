import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
// import toast from "react-hot-toast";
import { addReplyingMessage } from "../../../app/slices/message";
import StyledMenu from "../StyledMenu";
import DeleteMessageConfirm from "./DeleteMessageConfirm";
import EmojiPicker from "./EmojiPicker";
import replyIcon from "../../../assets/icons/reply.svg?url";
import reactIcon from "../../../assets/icons/reaction.svg?url";
import editIcon from "../../../assets/icons/edit.svg?url";
import moreIcon from "../../../assets/icons/more.svg?url";
const StyledCmds = styled.ul`
  z-index: 9999;
  position: absolute;
  right: 10px;
  top: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  background-color: #fff;
  visibility: hidden;
  &.visible {
    visibility: visible;
  }
  .cmd {
    display: flex;
    cursor: pointer;
    padding: 4px;
    &:hover {
      background-color: #f3f4f6;
    }
    img {
      width: 24px;
      height: 24px;
    }
  }
  > .picker {
    position: absolute;
    left: -10px;
    top: 0;
    transform: translateX(-100%);
  }
  .menu {
    position: absolute;
    top: 0;
    right: 36px;
  }
`;
export default function Commands({
  contextId = 0,
  mid = 0,
  from_uid = 0,
  toggleEditMessage,
}) {
  const dispatch = useDispatch();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [tippyVisible, setTippyVisible] = useState(false);
  const currUid = useSelector((store) => store.authData.uid);
  const cmdsRef = useRef(null);
  const handleReply = (fromMenu) => {
    if (contextId) {
      dispatch(addReplyingMessage({ id: contextId, mid }));
    }
    if (fromMenu) {
      hideAll();
    }
  };

  const toggleDeleteModal = () => {
    hideAll();
    setDeleteModalVisible((prev) => !prev);
  };
  const handleTippyVisible = (visible = true) => {
    setTippyVisible(visible);
  };
  return (
    <StyledCmds
      ref={cmdsRef}
      className={`cmds ${tippyVisible ? "visible" : ""}`}
    >
      <Tippy
        onShow={handleTippyVisible.bind(null, true)}
        onHide={handleTippyVisible.bind(null, false)}
        interactive
        placement="left-start"
        trigger="click"
        content={<EmojiPicker mid={mid} hidePicker={hideAll} />}
      >
        <li className="cmd">
          <img src={reactIcon} className="toggler" alt="icon emoji" />
        </li>
      </Tippy>
      {currUid == from_uid ? (
        <li className="cmd" onClick={toggleEditMessage}>
          <img src={editIcon} alt="icon edit" />
        </li>
      ) : (
        <li className="cmd" onClick={handleReply}>
          <img src={replyIcon} alt="icon reply" />
        </li>
      )}
      <Tippy
        onShow={handleTippyVisible.bind(null, true)}
        onHide={handleTippyVisible.bind(null, false)}
        interactive
        placement="right-start"
        trigger="click"
        content={
          <StyledMenu className="menu">
            {/* <li className="item">Edit Message</li> */}
            <li className="item underline">Pin Message</li>
            <li className="item" onClick={handleReply.bind(null, true)}>
              Reply
            </li>
            {currUid == from_uid && (
              <li className="item danger" onClick={toggleDeleteModal}>
                Delete Message
              </li>
            )}
          </StyledMenu>
        }
      >
        <li className="cmd">
          <img src={moreIcon} alt="icon more" />
        </li>
      </Tippy>

      {deleteModalVisible && (
        <DeleteMessageConfirm closeModal={toggleDeleteModal} mid={mid} />
      )}
    </StyledCmds>
  );
}