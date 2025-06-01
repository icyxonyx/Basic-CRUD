import { message } from "antd";
import React, { useCallback, useEffect } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      navigate("/login");
    }
  }, [getCurrentUser, navigate]);

  return (
    user && (
      <div className="layout">
        <header className="header">
          <div className="logo --colour-primary" onClick={() => navigate("/")}>
            TEST
          </div>
          <nav className="navbar">
            <div className="nav-item" onClick={() => {
              if (user.isAdmin) {
                navigate("/admin");
              } else {
                navigate("/profile");
              }
            }}>
              {user.name}
            </div>
            <div className="nav-item" onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}>
              Logout
            </div>
          </nav>
        </header>
        <main className="content">
          {children}
        </main>
    <footer className="footer">
      <div className="footer-content">
        <p>I am a Footer.                         A dummy one at that.</p>
        <p>
          <a href="/">About Us</a> | <a href="/">Contact</a>
        </p>
      </div>
    </footer>
      </div>
    )
  );
}

export default ProtectedRoute;
