import React, { useCallback, useEffect } from "react";
import { Form, Input, message, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetCurrentUser } from "../../apicalls/users";
import { SetUser } from "../../redux/usersSlice";
import { UpdateUser } from "../../apicalls/profile";

const { Item: FormItem } = Form;

function UForm() {
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
    getCurrentUser();
  }, [getCurrentUser]);

  const onFinish = async (values) => {
    values.userId = user._id;
    try {
      dispatch(ShowLoading());
      const response = await UpdateUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getCurrentUser();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card
        title="Update Profile"
        className="shadow-lg w-full max-w-md bg-semi"
        bordered={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ name: user?.name, email: user?.email }}
        >
          <FormItem
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </FormItem>
          <FormItem
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </FormItem>
          <FormItem
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input the password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </FormItem>
          <div className="flex justify-end">
            <Button title="Save" type="submit" className="btn-primary" />
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default UForm;
