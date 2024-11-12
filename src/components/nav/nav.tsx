import { NavLink } from "react-router-dom";
import { navData } from "../../constants/navData";
import Logo from "/public/icons/logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const NavBar = () => {
  const { not } = useSelector((state: RootState) => state.product);

  return (
    <div className="w-[20%] bg-[#212121]">
      <div className="flex items-center gap-5">
        <Logo />
        <h1 className="font-bold text-2xl text-[#cc9600]">Book Dashboard</h1>
      </div>
      <div className="pl-5 bg-slate-500 mb-2 p-2">
        <div className=" bg-transparent  z-10   rounded-md">
          <h2 className="text-2xl ">Admin: Ergash</h2>
          <button
            className="text-red-500 text-2xl"
            onClick={() => {
              localStorage.removeItem("dtoken");
              window.location.reload();
            }}
          >
            loguot
          </button>
        </div>
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
          {not !== 0 && (
            <span className="absolute left-1 top-1 bg-blue-600 w-6 h-6 text-white p-1 rounded-[50%] flex justify-center items-center">
              {not}
            </span>
          )}
          Notification
        </NavLink>
      </div>

      <div></div>
    </div>
  );
};
