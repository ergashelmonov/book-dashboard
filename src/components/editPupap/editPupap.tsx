import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { editProducts } from "../../features";

interface CardProps {
  id: number;
  name: string;
  description: string;
  price: string;
  setEdit: (i: boolean) => void;
}

export const EditPopup: React.FC<CardProps> = ({
  id,
  name,
  description,
  price,
  setEdit,
}) => {
  const [editName, setEditName] = useState(name);
  const [editPrice, setEditPrice] = useState(price);
  const [editDescription, setEditDescription] = useState(description);

  const dispatch = useDispatch<AppDispatch>();
  console.log(id);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      editProducts({
        id,
        name: editName,
        description: editDescription,
        price: editPrice,
      })
    );
    setEdit(false);
  };

  return (
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
        <h2 className="text-white text-center text-2xl">Edit</h2>
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
  );
};
