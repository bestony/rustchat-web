import SettingBlock from "@/components/SettingBlock";
import { useTranslation } from "react-i18next";
import ServerVersionChecker from "@/components/ServerVersionChecker";
import { KEY_MSG_NOTIFICATION_SOUND } from "@/app/config";
import useServerExtSetting from "@/hooks/useServerExtSetting";
import Toggle from "@/components/styled/Toggle";

type Props = {};

const EnableMsgNotificationSound = ({}: Props) => {
  const { updateExtSetting, getExtSetting } = useServerExtSetting();
  const { t } = useTranslation("setting", { keyPrefix: "overview.message_sound" });
  const enabled = getExtSetting(KEY_MSG_NOTIFICATION_SOUND);
  const handleToggle = () => {
    updateExtSetting(KEY_MSG_NOTIFICATION_SOUND, !enabled);
  };
  return (
    <ServerVersionChecker empty version="0.3.50">
      <SettingBlock
        title={t("title")}
        desc={t("desc")}
        toggler={<Toggle onClick={handleToggle} checked={enabled} />}
      ></SettingBlock>
    </ServerVersionChecker>
  );
};

export default EnableMsgNotificationSound;
