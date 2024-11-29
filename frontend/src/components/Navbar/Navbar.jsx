import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  const handleLogOut = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between w-full py-3 text-black bg-white shadow-md px-28">
        <Link className="text-2xl font-bold" to="/">
          <h2>ReviewIt</h2>
        </Link>

        <ul className="flex items-center gap-6">
          <li className="nav-item">
            <Link className="cursor-pointer link" to="/">
              Home
            </Link>
          </li>
          {userInfo ? (
            <>
              <li className="nav-item">
                <Link className="cursor-pointer link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="cursor-pointer nav-item" onClick={handleLogOut}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="cursor-pointer link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="cursor-pointer link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
