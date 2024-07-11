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
      <div className="w-full flex sticky top-0 z-10 shadow-md items-center justify-between px-28 py-3 bg-white text-black">
        <Link className="font-bold text-2xl" to="/">
          <h2>MovieReviewz</h2>
        </Link>

        <ul className="flex items-center gap-6">
          <li className="nav-item">
            <Link className="link cursor-pointer" to="/">
              Home
            </Link>
          </li>
          {userInfo ? (
            <>
              <li className="nav-item">
                <Link className="link cursor-pointer" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item cursor-pointer" onClick={handleLogOut}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="link cursor-pointer" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="link cursor-pointer" to="/register">
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
