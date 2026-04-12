import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";



const PricingManager = ({ rooms, setRooms }: any) => {
const addRow = () => {
    setRooms([
      ...rooms,
      {
        type: "",
        rooms: "",
        single: "",
        cpai: "",
        mapai: "",
        extraAdult: "",
        childBed: "",
        childNoBed: "",
      },
    ]);
  };
const deleteRow = () => {
  if (rooms.length === 0) return;

  const updated = [...rooms];
  updated.pop(); // removes last row
  setRooms(updated);
};
  const updateRoom = (index: number, key: string, value: string) => {
    const updated = [...rooms];
    updated[index][key] = value;
    setRooms(updated);
  };
useEffect(() => {
  if (rooms.length === 0) {
    addRow();
  }
}, []);

  return (
    <div>
 {/* TITLE */}
      <div className="flex justify-between items-center mb-2">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
              Room Rates
        </div>
      </div>

       <div className="bg-[#66FFFF] p-4 rounded-xl border border-black rounded-md">
           <div className="bg-white p-4 rounded-xl rounded-md">
      {/* TOP RATE HEADERS */}
<div className="grid grid-cols-8 text-center font-semibold text-white">

  <div className="bg-[#1b3b6f] p-2 col-span-2">Normal Rate</div>
  <div className="bg-[#FF0000] p-2 col-span-2">Public Holiday</div>
  <div className="bg-[#1b3b6f] p-2 col-span-2">Festival Rates</div>
  <div className="bg-[#FF0000] p-2 col-span-2">Banquet Rate</div>

  <div className="bg-orange-600 FFC000 p-2 col-span-2">Valid From</div>
  <div className="col-span-2">
    <input
      type="date"
      className="w-full h-full bg-[#e6c0b8] text-black p-2 border"
    />
  </div>

  <div className="bg-orange-600 p-2 col-span-2">Valid Till</div>
  <div className="col-span-2">
    <input
      type="date"
      className="w-full h-full bg-[#e6c0b8] text-black p-2 border"
    />
  </div>

</div>

      {/* ROOM TABLE */}
  <div>

  {/* HEADER */}
  <div className="grid grid-cols-8 bg-[#0c2d67] text-white text-center text-sm font-semibold">
    {[
      "Room Category",
      "Rooms",
      "Single",
      "CPAI",
      "MAPAI",
      "Ex Adult",
      "Chd with Bed",
      "Chd no Bed",
    ].map((item) => (
  <div key={item} className="p-2 border border-black">{item}</div>
))}
  </div>

  {/* ROWS */}
  {rooms.map((room: any, index: number) => (
    <div key={index} className="grid grid-cols-8">

      <input
        type="text"
        className="border border-black p-2 bg-[#66FFFF] outline-none"
        value={room.type || ""}
        onChange={(e) => updateRoom(index, "type", e.target.value)}
      />

      <input
        type="text"
        className="border border-black p-2 bg-[#66FFFF] outline-none"
        value={room.rooms || ""}
        onChange={(e) => updateRoom(index, "rooms", e.target.value)}
      />

      <input
        type="text"
        className="border border-black p-2 bg-[#66FFFF] outline-none"
        value={room.single || ""}
        onChange={(e) => updateRoom(index, "single", e.target.value)}
      />

      <input
        type="text"
        className="border border-black p-2 bg-[#66FFFF] outline-none"
        value={room.cpai || ""}
        onChange={(e) => updateRoom(index, "cpai", e.target.value)}
      />

      <input
        type="text"
        className="border border-black p-2 bg-[#66FFFF] outline-none"
        value={room.mapai || ""}
        onChange={(e) => updateRoom(index, "mapai", e.target.value)}
      />

      <input
        type="text"
        className="border border-black p-2 bg-[#66FFFF] outline-none"
        value={room.extraAdult || ""}
        onChange={(e) => updateRoom(index, "extraAdult", e.target.value)}
      />

      <input
        type="text"
        className="border border-black p-2 bg-[#66FFFF] outline-none"
        value={room.childBed || ""}
        onChange={(e) => updateRoom(index, "childBed", e.target.value)}
      />

      <input
        type="text"
        className="border border-black p-2 bg-[#66FFFF] outline-none"
        value={room.childNoBed || ""}
        onChange={(e) => updateRoom(index, "childNoBed", e.target.value)}
      />
    </div>
  ))}

  {/* ADD / DELETE */}
<div className="grid grid-cols-8">

  {/* EMPTY CELLS (span 6 columns) */}
  <div className="col-span-6"></div>

  {/* ADD BUTTON */}
  <button
    onClick={addRow}
    className="border border-black bg-[#FF0000] text-white"
  >
    Add
  </button>

  {/* DELETE BUTTON */}
 <button
  onClick={deleteRow}
  className="border border-black bg-[#FFFF00]"
>
  Delete
</button>

</div>

      {/* MEALS SECTION */}
      <div className="grid grid-cols-3 w-[600px] mt-3 mb-3">

        <div className="bg-[#0c2d67] text-white p-2 text-center border border-black">
          Meals
        </div>
        <div className="bg-[#0c2d67] text-white p-2 text-center border border-black">
          Adult
        </div>
        <div className="bg-[#0c2d67] text-white p-2 text-center border border-black">
          Child
        </div>

        <div className="bg-[#0c2d67] text-white p-2 border border-black text-center">
          Extra Lunch
        </div>
        <input className="border border-black bg-[#66FFFF]" />
        <input className="border border-black  bg-[#66FFFF]" />

        <div className="bg-[#0c2d67] text-white p-2 border border-black text-center">
          Extra Dinner
        </div>
        <input className="border border-black  bg-[#66FFFF]" />
        <input className="border border-black  bg-[#66FFFF]" />

      </div>

      {/* 24 CHECK-IN */}
      <div className="mb-3">
        <div className="bg-[#0c2d67] text-white p-2 w-[407px] text-center mb-1">
          24 Check in
        </div>

        <div className="flex gap-2">
          <button className="bg-[#66FFFF] px-4 py-2 w-[200px] border border-black">
            Available
          </button>
          <button className="bg-[#66FFFF] px-4 py-2 w-[200px] border border-black">
            Not Available
          </button>
        </div>
      </div>

      {/* CHECKIN CHECKOUT */}
      <div className="w-[700px]">
        <div className="bg-[#0c2d67] text-white p-2 text-center mb-1">
          Check in / Check out Details
        </div>

        <div className="grid grid-cols-4">
          <div className="bg-[#0c2d67] text-white text-center p-2 border border-black">
            Check in
          </div>
          <input className="border border-black bg-[#66FFFF]" />

          <div className="bg-[#0c2d67] text-white text-center p-2 border border-black">
            Check out
          </div>
          <input className="border border-black bg-[#66FFFF]" />
        </div>
      </div>
</div>
</div>
</div>
    </div>
  );
};

export default PricingManager;