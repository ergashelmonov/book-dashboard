import { useDispatch } from "react-redux";
import { delProducts } from "../../features";
import { AppDispatch } from "../../store";

export const DeletePopup = ({
  id,
  setDel,
}: {
  id: number;
  setDel: (i: boolean) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
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
          Cancel
        </button>
        <button
          onClick={() => {
            dispatch(delProducts(id));
          }}
          className="w-full mt-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
