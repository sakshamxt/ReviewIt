import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import Footer from "../../components/Footer/Footer";
import { toast } from "react-toastify";
import { CiUser, CiLock } from "react-icons/ci";
import bgImg from '../../assets/background.jpg';
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password is incorrect");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="w-full h-[92vh] bg-cover">
      <img className="w-full h-full object-cover relative" src={bgImg} alt="bg" />
      <div className="w-[500px] h-[450px] flex items-center justify-center absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 backdrop-blur-2xl bg-transparent rounded-xl">
        <form onSubmit={handleSubmit} className="flex text-white gap-3 flex-col w-full items-center mx-10">
          <h1 className="font-bold text-3xl">Register</h1>
          <div className="relative w-full h-[30px] mt-3">
            <input value={name} onChange={(event) => setName(event.target.value)} className="w-full outline-none h-full bg-transparent border-[2px] border-solid border-[rgba(255,255,255,0.196)] text-white placeholder:text-white rounded-2xl px-3 py-5 text-sm" type="text" placeholder="Name" required />
            <CiUser className="absolute right-5 top-[40%] text-xl transform -translate-x-[45%]" />
          </div>
          <div className="relative w-full h-[30px] mt-3">
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full outline-none h-full bg-transparent border-[2px] border-solid border-[rgba(255,255,255,0.196)] text-white placeholder:text-white rounded-2xl px-3 py-5 text-sm" type="email" placeholder="Email" required />
            <CiUser className="absolute right-5 top-[40%] text-xl transform -translate-x-[45%]" />
          </div>
          <div className="relative w-full h-[30px] mt-4">
            <input value={password} onChange={(event) => setPassword(event.target.value)} className="w-full outline-none h-full bg-transparent border-[2px] border-solid border-[rgba(255,255,255,0.196)] text-white placeholder:text-white rounded-2xl px-3 py-5 text-sm" type="password" placeholder="Password" required />
            <CiLock className="absolute right-5 top-[40%] text-xl transform -translate-x-[45%]" />
          </div>
          <div className="relative w-full h-[30px] mt-4">
            <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full outline-none h-full bg-transparent border-[2px] border-solid border-[rgba(255,255,255,0.196)] text-white placeholder:text-white rounded-2xl px-3 py-5 text-sm" type="password" placeholder="Confirm Password" required />
            <CiLock className="absolute right-5 top-[40%] text-xl transform -translate-x-[45%]" />
          </div>
          <button className="w-full text-sm py-2 rounded-2xl mt-4 hover:scale-[1.02] transition-all bg-white text-black font-semibold" type="submit">Register</button>

          <Link to={'/login'} className="text-sm">
            <p>
              Already have an account? Log in
            </p>
          </Link>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
