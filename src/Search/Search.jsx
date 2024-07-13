import { useState } from "react";
import { search } from "../constants";
import Items from "../Items/Items";

export default function Search() {
  const [radius, setRadius] = useState(0);
  return (
    <div className="container flex flex-col md:flex-row md:min-h-screen md:max-h-screen gap-2">
      <div className="flex flex-col basis-1/3 space-y-3">
        <span className="mt-10" />
        <form className="p-4 space-y-5 flex-col flex bg-orange-300 rounded-lg">
          <label htmlFor="radius caption">Enter the radius</label>
          <input
            type="number"
            name="radius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="w-min p-1 indent-1"
          ></input>
        </form>
        <div className="caption text-justify">
          When you provide an input radius, which can be up to 5 kilometers, our
          system meticulously scans the area to find the best culinary
          offerings. Please be patient as we compile a list of delectable
          choices for you to explore.
        </div>
      </div>

      <div className="p-3 flex flex-col basis-2/3 border-solid overflow-y-auto border-zinc-400 space-y-5 rounded-lg mt-10">
        <Items search={search} />
      </div>
    </div>
  );
}
