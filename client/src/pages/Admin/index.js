import React from "react";
import PageTitle from "../../components/PageTitle";
import { Tabs } from "antd";
import UsersList from "./UsersList";

function Admin() {
  return (
    <div>
      <PageTitle title="Admin" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Users" key="1">
            <UsersList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;
