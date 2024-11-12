import { useEffect, useState } from "react";
import axiosInstance from "../../utils/api";

import { BookCard } from "../../components";
interface CardProps {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

export const Home = () => {
  const [data, setData] = useState<CardProps[]>([]);

  useEffect(() => {
    axiosInstance.get("/products").then((data) => setData(data.data));
  }, []);

  return (
    <div className="w-full flex flex-col gap-10 items-center pt-20 bg-black h-screen overflow-scroll hide-scrollbar bg-[url(/public/img/bg_home.png)] bg-no-repeat bg-cover">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-5xl bg-[radial-gradient(50.00%_50.00%_at_50.00%_50.00%,rgb(204,150,0)_0%,rgb(255,119,0)_100%)] bg-clip-text text-transparent">
          The Book Lover's Dreamland Awaits!
        </h1>
        <p className="text-2xl text-[#fff] max-w-[888px] text-center mt-[30px]">
          Welcome to the ultimate book lover's paradise! Join our community and
          contribute to the ever-evolving library of stories, where every book
          has a chance to inspire someone new.
        </p>
      </div>
      <div className="flex flex-wrap max-w-[888px] gap-5">
        {data.map((item) => {
          return <BookCard key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};
