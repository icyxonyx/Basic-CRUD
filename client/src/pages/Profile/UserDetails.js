import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Card, Avatar } from "antd";
import { GetCurrentUser } from "../../apicalls/users";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../../redux/usersSlice";

const { Meta } = Card;

function UsersList() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCurrentUser = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
      message.error(error.message);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/");
    }
  }, [getCurrentUser, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-semi">
      <Card
        title="User Profile"
        className="shadow-lg w-full max-w-md"
        bordered={false}
        actions={[
          <i
            className="ri-pencil-line"
            onClick={() => {
              navigate("/UForm");
            }}
          />,
        ]}
      >
        <Meta
          avatar={<Avatar size="large" icon={<i className="ri-user-line" />} />}
          title={user?.name}
          description={user?.email}
        />
      </Card>
    </div>
  );
}

export default UsersList;
