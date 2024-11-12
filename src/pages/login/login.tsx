import axios from "axios";

import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityicka");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    axios
      .post("https://reqres.in/api/login", { email, password })
      .then((data) => {
        localStorage.setItem("dtoken", JSON.stringify(data.data.token));
        navigate("/");
      });
  }

  return (
    <>
      <div className="w-full h-screen bg-[url(/public/img/bg_login.png)] bg-no-repeat bg-[top_0_left_0] bg-contain bg-black pr-[105px] flex items-center justify-end">
        <div className="max-w-[580px] flex flex-col justify-center items-center">
          <h2 className="font-bold text-[34px] text-center text-[#cc9600]">
            Welcome to Neth BookPoint!
          </h2>
          <p className="font-normal text-[15px] text-center text-white mt-[21px]">
            Discover a seamless way to sell your books and unlock exclusive
            benefits. Enjoy a hassle-free experience, save valuable time, and
            take advantage of our amazing offers.
          </p>
          <div>
            <h3 className="font-bold text-3xl #ca891d">
              Login to Your Account!
            </h3>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="rounded-xl max-w-[527px] w-full h-[63px] bg-[#d6ce80] p-[20px_32px] font-normal text-xl text-[#434244] outline-none"
                placeholder="Enter Email"
              />
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="rounded-xl max-w-[527px] w-full h-[63px] bg-[#d6ce80] p-[20px_32px] font-normal text-xl text-[#434244] outline-none mt-[11px]"
                placeholder="Enter Password"
              />
              <button className="rounded-xl max-w-[527px] w-full h-[63px] bg-[#cc9600;] p-[20px_32px] font-normal text-xl text-[#fff] outline-none mt-[11px]">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
