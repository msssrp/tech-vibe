"use client";
import { Tabs } from "@mantine/core";
import React from "react";
import Noticard from "./Noticard";

const NotiTabs = () => {
  return (
    <div>
      <Tabs defaultValue="All" color="black">
        <Tabs.List>
          <Tabs.Tab value="All">All</Tabs.Tab>
          <Tabs.Tab value="Comments">Comments</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="All">
          <Noticard
            title="Lorem ipsum dolor "
            content="Lorem ipsum dolor sit amet consectetur. Leo mattis sodales suspendisse semper tempus "
            type="comment"
            status="read"
          />
          <Noticard
            title="Lorem ipsum dolor "
            content="Lorem ipsum dolor sit amet consectetur. Leo mattis sodales suspendisse semper tempus "
            type="publish"
            status="unread"
          />
          <Noticard
            title="Lorem ipsum dolor "
            content="Lorem ipsum dolor sit amet consectetur. Leo mattis sodales suspendisse semper tempus "
            type="pending"
            status="read"
          />
          <Noticard
            title="Lorem ipsum dolor "
            content="Lorem ipsum dolor sit amet consectetur. Leo mattis sodales suspendisse semper tempus "
            type="report"
            status="unread"
          />
        </Tabs.Panel>
        <Tabs.Panel value="Comments">
          <Noticard
            title="Lorem ipsum dolor "
            content="Lorem ipsum dolor sit amet consectetur. Leo mattis sodales suspendisse semper tempus "
            type="comment"
            status="unread"
          />{" "}
          <Noticard
            title="Lorem ipsum dolor "
            content="Lorem ipsum dolor sit amet consectetur. Leo mattis sodales suspendisse semper tempus "
            type="comment"
            status="unread"
          />{" "}
          <Noticard
            title="Lorem ipsum dolor "
            content="Lorem ipsum dolor sit amet consectetur. Leo mattis sodales suspendisse semper tempus "
            type="comment"
            status="unread"
          />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default NotiTabs;
