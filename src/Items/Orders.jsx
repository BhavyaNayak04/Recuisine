import { Link } from "react-router-dom";
export default function Orders({ orders }) {
  return (
    <>
      {orders.map((item) => (
        <div
          key={item.id}
          className="px-5 py-3 bg-stone-200 rounded-xl flex w-full items-end gap-2"
        >
          <div className="flex flex-col space-y-1">
            <p className="subheading">{item.name}</p>
            <p>{item.restName}</p>
          </div>
          <div className="ml-auto">
            <button className="px-5 py-2 bg-green-300 rounded-lg ml-auto">
              <Link to={`/inquire/${item.id}`}>Review</Link>
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
