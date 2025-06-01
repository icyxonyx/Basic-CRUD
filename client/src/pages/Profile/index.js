import React from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/PageTitle";
import UserDetails from "./UserDetails";
function Profile() {
  return (
    <div>
      <PageTitle title="Profile" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="This Is You" key="1">
          <UserDetails />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
