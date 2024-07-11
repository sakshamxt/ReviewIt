import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { useUpdateUserMutation } from "../../slices/userApiSlice";
import Footer from "../../components/Footer/Footer";
import { toast } from "react-toastify";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateUser({
          _id: userInfo._id,
          name: name,
          email: email,
          password: password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-10 w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-16 mt-5">Your Profile</h1>
          <div className="">
            <div className="">
              <form className="flex flex-col gap-5 items-start" onSubmit={handleSubmit}>
                <div className="w-[410px] h-[50px] relative">
                  <input
                    type="name"
                    className="w-full h-full outline-none border-[1px] border-gray-300 focus:border-gray-500 rounded-md px-4 py-2"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <i className="absolute right-4 top-[25%] text-lg fa fa-user"></i>
                </div>
                <div className="w-[410px] h-[50px] relative">
                  <input
                    type="email"
                    className="w-full h-full outline-none border-[1px] border-gray-300 focus:border-gray-500 rounded-md px-4 py-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <i className="absolute right-4 top-[25%] text-base fa fa-envelope"></i>
                </div>
                <div className="w-[410px] h-[50px] relative">
                  <input
                    type="password"
                    className="w-full h-full outline-none border-[1px] border-gray-300 focus:border-gray-500 rounded-md px-4 py-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i className="absolute right-4 top-[25%] text-xl fa fa-lock"></i>
                </div>
                <div className="w-[410px] h-[50px] relative">
                  <input
                    type="password"
                    className="w-full h-full outline-none border-[1px] border-gray-300 focus:border-gray-500 rounded-md px-4 py-2"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <i className="absolute right-4 top-[25%] text-xl fa fa-lock"></i>
                </div>
                <button className="bg-blue-700 text-sm mt-3 flex items-center gap-2 hover:scale-[1.03] transition-all hover:bg-blue-800 rounded-md text-white font-semibold px-4 py-3" type="submit">
                  <span className="button__text">Update Profile</span>
                  <i className="button__icon fa fa-chevron-right"></i>
                </button>
              </form>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
