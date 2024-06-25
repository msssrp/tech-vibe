import React from "react";
import SettingTab from "../../component/SettingTab";
import Settings from "./component/Settings";
import { getWebLogoUrl } from "@/libs/actions/setting/webSetting";
const page = async () => {
  const webLogoUrl = await getWebLogoUrl();

  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col">
        <SettingTab />
        <div className="min-h-screen bg-[#F4F2FB] p-14">
          <div className="flex items-start space-x-7">
            <Settings webLogoUrl={webLogoUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
