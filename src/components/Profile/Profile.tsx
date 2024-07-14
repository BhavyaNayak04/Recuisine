import { search } from "../../constants";
import Orders from "../Items/Orders";
import ProfileInfo from "./ProfileInfo";

export default function Profile() {
  return (
    <div className="container flex flex-col-reverse md:flex-row md:min-h-screen md:max-h-screen gap-2">
      <span className="mt-10" />
      <div className="p-3 flex flex-col basis-2/3 border-solid overflow-y-auto border-zinc-400 space-y-5 rounded-lg md:mt-10 mt-5">
        <span className="text-green-400 font-extrabold">My orders</span>
        <Orders orders={search} />
      </div>

      <div className="flex flex-col basis-1/3 space-y-3">
        <span className="mt-10" />
        <ProfileInfo />
        <div className="caption text-justify">
          Reviewing the orders that you have received help us rate the food
          quality and thus provide a good experience to all avoiding spoilt
          food.
        </div>
      </div>
    </div>
  );
}
