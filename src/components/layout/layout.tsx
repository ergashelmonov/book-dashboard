import { Outlet } from "react-router-dom";
import { NavBar } from "..";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { postProducts } from "../../features";

export const Layout = () => {
  const [add, setAdd] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      postProducts({
        name,
        image,
        description,
        price,
      })
    );

    setAdd(false);
  };

  return (
    <>
      {add && (
        <div
          onClick={(e) => {
            e.target === e.currentTarget && setAdd(false);
          }}
          className="fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.4)] flex justify-center items-center"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-slate-700 p-8 rounded-2xl gap-2 text-slate-100"
          >
            <h2>Add Book</h2>
            <label htmlFor="image">Image url</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="text"
              name="image"
              className="text-[#a59f9f] p-2 outline-none border border-solid border-[#cc9600] rounded-md bg-slate-600"
            />
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              className="text-[#a59f9f] p-2 outline-none border border-solid border-[#cc9600] rounded-md bg-slate-600"
            />
            <label htmlFor="description">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              name="description"
              className="text-[#a59f9f] p-2 outline-none border border-solid border-[#cc9600] rounded-md bg-slate-600"
            />
            <label htmlFor="price">Cost</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              name="price"
              className="text-[#a59f9f] p-2 outline-none border border-solid border-[#cc9600] rounded-md bg-slate-600"
            />
            <button className="bg-lime-600">Add</button>
          </form>
        </div>
      )}
      <div className="w-full flex bg-black h-screen overflow-scroll hide-scrollbar">
        <button
          className="fixed top-6 right-6 bg-green-500 p-3"
          onClick={() => setAdd(true)}
        >
          + Add book
        </button>

        <NavBar />
        <Outlet />
      </div>
    </>
  );
};
