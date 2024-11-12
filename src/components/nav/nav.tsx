import { NavLink } from "react-router-dom";
import { navData } from "../../constants/navData";
import Logo from "/public/icons/logo.svg";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/api";

export const NavBar = () => {
  const [notification, setNotification] = useState(0);

  useEffect(() => {
    axiosInstance
      .get("/notification")
      .then((data) => setNotification(data.data.length));
  });

  return (
    <div className="w-[20%] bg-[#212121]">
      <div className="flex items-center gap-5">
        <Logo />
        <h1 className="font-bold text-2xl text-[#cc9600]">Book Dashboard</h1>
      </div>
      <div className="flex flex-col gap-5">
        {navData.map((item) => {
          return (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) => {
                return isActive
                  ? "p-5 rounded-sm bg-slate-500"
                  : "bg-slate-400 p-5 rounded-sm";
              }}
            >
              {item.name}
            </NavLink>
          );
        })}
        <NavLink
          to={"/notification"}
          className={({ isActive }) => {
            return isActive
              ? "p-5 rounded-sm bg-slate-500 relative"
              : "bg-slate-400 p-5 rounded-sm relative";
          }}
        >
          {notification !== 0 && (
            <span className="absolute left-1 top-1 bg-blue-600 text-white p-1 rounded-[50%]">
              {notification}
            </span>
          )}
          Notification
        </NavLink>
      </div>

      <div></div>
    </div>
  );
};
