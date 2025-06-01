import React, { useCallback, useEffect, useState } from "react";
import { GetAllUsers, DeleteUser } from "../../apicalls/admin";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Table } from "antd";

function UsersList() {
  const [users = [], setUsers] = useState([]);
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (userId) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteUser({
        userId,
      });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "EMail",
      dataIndex: "email",
    },
    {
      title: "Account Type",
      dataIndex: "isAdmin",
      render: (text, record) => {
        if (text) {
          return "Admin";
        } else {
          return "User";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                handleDelete(record._id);
              }}
            ></i>
            </div>
          );
        },
      },
  ];

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div>
      <Table key={users.length} columns={columns} dataSource={users} />
    </div>
  );
}

export default UsersList;
