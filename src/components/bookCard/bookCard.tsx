import React, { FormEvent, useState } from "react";
import axiosInstance from "../../utils/api";
import { useLocation } from "react-router-dom";

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
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editPrice, setEditPrice] = useState(price);
  const [editDescription, setEditDescription] = useState(description);
  const { pathname } = useLocation();

  const deleteFunc = () => {
    axiosInstance.delete(`/products/${id}`);

    setDel(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    axiosInstance.patch(`/products/${id}`, {
      id,
      name: editName,
      description: editDescription,
      price: editPrice,
    });

    setEdit(false);
  };

  const buy = () => {
    axiosInstance.post("/cart", { id, name, description, price, image });
    axiosInstance
      .post("/notification", { id, name, description, price, image })
      .then((data) => {
        data.status === 201 && window.location.reload();
      });
  };

  return (
    <>
      {edit && (
        <div
          onClick={(e) => {
            e.target === e.currentTarget && setEdit(false);
          }}
          className="fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.4)] flex justify-center items-center"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-slate-700 p-8 rounded-2xl gap-2 text-slate-100"
          >
            <label htmlFor="name">Name</label>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              type="text"
              name="name"
              className="text-[#a59f9f] p-2 outline-none border border-solid border-[#cc9600] rounded-md bg-slate-600"
            />
            <label htmlFor="description">Description</label>
            <input
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              type="text"
              name="description"
              className="text-[#a59f9f] p-2 outline-none border border-solid border-[#cc9600] rounded-md bg-slate-600"
            />
            <label htmlFor="price">Cost</label>
            <input
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              type="text"
              name="price"
              className="text-[#a59f9f] p-2 outline-none border border-solid border-[#cc9600] rounded-md bg-slate-600"
            />
            <button className="bg-lime-600">Save</button>
          </form>
        </div>
      )}
      {del && (
        <div
          onClick={(e) => {
            e.target === e.currentTarget && setDel(false);
          }}
          className="fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.4)] flex justify-center items-center"
        >
          <div className="flex flex-col bg-slate-700 p-8 rounded-2xl gap-2 text-slate-100">
            <button
              onClick={() => setDel(false)}
              className="w-full mt-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-red-700"
            >
              Edit
            </button>
            <button
              onClick={deleteFunc}
              className="w-full mt-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
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
                onClick={() => setDel(true)}
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
