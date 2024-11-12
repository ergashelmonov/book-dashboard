import { useEffect } from "react";
import { BookCard } from "../../components";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { delNotif, getNotif } from "../../features";
import { useSelector } from "react-redux";

export const Notification = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getNotif());
  }, []);

  const seeNotification = (id: number) => {
    dispatch(delNotif(id));
  };

  interface notifType {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
  }
  const { notif }: { notif: notifType[] } = useSelector(
    (state: RootState) => state.product
  );

  return (
    <div className="w-full flex flex-col gap-10 items-center pt-20 bg-black h-screen overflow-scroll hide-scrollbar bg-[url(/public/img/bg_home.png)] bg-no-repeat bg-cover">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-5xl bg-[radial-gradient(50.00%_50.00%_at_50.00%_50.00%,rgb(204,150,0)_0%,rgb(255,119,0)_100%)] bg-clip-text text-transparent">
          Order Books Notifications
        </h1>
      </div>
      <div className="flex flex-wrap max-w-[888px] gap-5">
        {Array.isArray(notif) &&
          notif.map((item) => {
            return (
              <div key={item.id} className="flex flex-col gap-5">
                <BookCard key={item.id} {...item} />
                <button
                  onClick={() => seeNotification(item.id)}
                  className="bg-green-500 p-4 text-white"
                >
                  See
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
