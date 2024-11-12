import { useEffect } from "react";
import { BookCard } from "../../components";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getOrderProducts } from "../../features";
import { useSelector } from "react-redux";

export const Order = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getOrderProducts());
  }, []);

  const { orders } = useSelector((state: RootState) => state.product);

  return (
    <div className="w-full flex flex-col gap-10 items-center pt-20 bg-black h-screen overflow-scroll hide-scrollbar bg-[url(/public/img/bg_home.png)] bg-no-repeat bg-cover">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-5xl bg-[radial-gradient(50.00%_50.00%_at_50.00%_50.00%,rgb(204,150,0)_0%,rgb(255,119,0)_100%)] bg-clip-text text-transparent">
          Order Books
        </h1>
      </div>
      <div className="flex flex-wrap max-w-[888px] gap-5">
        {orders.map((item) => {
          return <BookCard key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};
