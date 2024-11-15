import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { DeletePopup, EditPopup } from "..";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { orderProducts } from "../../features";

interface CardProps {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

export const BookCard: React.FC<CardProps> = ({
  id,
  name,
  description,
  price,
  image,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { pathname } = useLocation();
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  const buy = () => {
    dispatch(
      orderProducts({
        id,
        name,
        description,
        price,
        image,
      })
    );
  };

  return (
    <>
      {edit && <EditPopup {...{ id, name, description, price, setEdit }} />}
      {del && <DeletePopup id={id} setDel={setDel} />}
      <div className="w-[264px] bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          <p className="mt-2 text-sm text-gray-800">{price}</p>
          {pathname !== "/orders" && pathname !== "/notification" ? (
            <>
              <button
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
                onClick={buy}
              >
                Buy
              </button>
              <button
                onClick={() => setEdit(true)}
                className="w-full mt-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDel(true);
                }}
                className="w-full mt-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700"
              >
                Delete
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
