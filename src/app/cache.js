import { useState } from "react";
import localforage from "localforage";
import { useDispatch } from "react-redux";
import { initChannelMsg } from "./slices/message.channel";
import { initUserMsg } from "./slices/message.user";
import { setChannels } from "./slices/channels";
import { setMark } from "./slices/visit.mark";
import { KEY_UID } from "./config";
const tables = [
  {
    storeName: "channels",
    description: "store channel list with IDs",
  },
  {
    storeName: "channelsEntity",
    description: "store channel list with key-val full data",
  },
  {
    storeName: "contacts",
    description: "store contact list with IDs",
  },
  {
    storeName: "contactsEntity",
    description: "store contact list with key-val full data",
  },
  {
    storeName: "messageDM",
    description: "store DM message with IDs",
  },
  {
    storeName: "messageChannel",
    description: "store channel message with IDs",
  },
  {
    storeName: "message",
    description: "store message with key-val full data",
  },
  {
    storeName: "messageReaction",
    description: "store message reaction with key-val full data",
  },
  {
    storeName: "visitMark",
    description: "store user visit data",
  },
  // {
  //   storeName: "message",
  //   description: "store message with key-val full data",
  // },
];
const initCache = () => {
  const uid = localStorage.getItem(KEY_UID) || "";
  const name = `cache_db_${uid}`;
  window.CACHE = {};
  tables.forEach(({ storeName, description }) => {
    window.CACHE[storeName] = localforage.createInstance({
      name,
      storeName,
      description,
    });
  });
  // window.CACHE = localforage.createInstance({
  //   name,
  //   storeName: "data",
  //   description: "rustchat cache data by uid",
  // });
};
export const useRehydrate = () => {
  const [iterated, setIterated] = useState(false);
  const dispatch = useDispatch();
  const rehydrate = async () => {
    // const res = await window.CACHE.iterate((data, key) => {
    //   switch (key) {
    //     case "visitMark":
    //       dispatch(setMark(data));
    //       break;
    //     case "channels":
    //       dispatch(setChannels(data));
    //       break;
    //     // case "contacts":
    //     //   dispatch(initChannelMsg(data));
    //     //   break;
    //     case "channelMessage":
    //       dispatch(initChannelMsg(data));
    //       break;
    //     case "userMessage":
    //       dispatch(initUserMsg(data));
    //       break;

    //     default:
    //       break;
    //   }
    // });
    setIterated(true);
  };
  return { rehydrate, cacheFirst: iterated };
};

export default initCache;
