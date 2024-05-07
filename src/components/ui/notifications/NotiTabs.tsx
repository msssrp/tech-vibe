"use client";
import { Tabs } from "@mantine/core";
import React from "react";
import Noticard from "./Noticard";
import { notificationProps } from "@/types/notification/notification";

type notitabsProps = {
  notification?: notificationProps[];
  userId: string;
};

const NotiTabs: React.FC<notitabsProps> = ({ notification, userId }) => {
  const commentNotification =
    notification &&
    notification.filter(
      (notification) => notification.notification_type === "comment"
    );
  return (
    <div>
      <Tabs defaultValue="All" color="black">
        <Tabs.List>
          <Tabs.Tab value="All">All</Tabs.Tab>
          <Tabs.Tab value="Comments">Comments</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="All">
          {notification && notification.length > 0 ? (
            notification.map((noti, index) => (
              <Noticard
                key={index}
                title={noti.notification_title}
                content={noti.notification_content}
                type={noti.notification_type}
                status={noti.notification_status}
                userId={userId}
                articleTitle={noti.article_title}
              />
            ))
          ) : (
            <div className="mt-7 flex items-center justify-center">
              <p>You dont have any notify.</p>
            </div>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="Comments">
          {commentNotification && commentNotification.length > 0 ? (
            commentNotification.map((noti, index) => (
              <Noticard
                key={index}
                title={noti.notification_title}
                content={noti.notification_content}
                type={noti.notification_type}
                status={noti.notification_status}
                userId={userId}
              />
            ))
          ) : (
            <div className="mt-7 flex items-center justify-center">
              <p>You dont have any comment notify.</p>
            </div>
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default NotiTabs;
