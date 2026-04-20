

import { useEffect, useState } from "react";

type Room = {
  type: string;
  rooms: string;
  single: string;
  cpai: string;
  mapai: string;
  extraAdult: string;
  childBed: string;
  childNoBed: string;
};

type Pricing = {
  validFrom: string;
  validTo: string;
};

const TABS = [
  "Normal Rate",
  "Public Holiday",
  "Festival Rates",
  "Banquet Rate",
];

const emptyRoom: Room = {
  type: "",
  rooms: "",
  single: "",
  cpai: "",
  mapai: "",
  extraAdult: "",
  childBed: "",
  childNoBed: "",
};
type PricingManagerProps = {
  rooms: any[];
  setRooms: React.Dispatch<React.SetStateAction<any[]>>;
  pricingData: {
    validFrom: string;
    validTo: string;
    meals: {
      lunchAdult: string;
      lunchChild: string;
      dinnerAdult: string;
      dinnerChild: string;
    };
  };
  setPricingData: React.Dispatch<
    React.SetStateAction<{
      validFrom: string;
      validTo: string;
      meals: {
        lunchAdult: string;
        lunchChild: string;
        dinnerAdult: string;
        dinnerChild: string;
      };
    }>
  >;
};
const PricingManager = ({
  rooms,
  setRooms,
  pricingData,
  setPricingData,
}: PricingManagerProps) => {
  const [activeTab, setActiveTab] = useState(0);

  // 👉 Separate data for each tab
  const [allPricing, setAllPricing] = useState<{
    [key: number]: { rooms: Room[]; pricingData: Pricing };
  }>({
    0: { rooms: [emptyRoom], pricingData: { validFrom: "", validTo: "" } },
    1: { rooms: [emptyRoom], pricingData: { validFrom: "", validTo: "" } },
    2: { rooms: [emptyRoom], pricingData: { validFrom: "", validTo: "" } },
    3: { rooms: [emptyRoom], pricingData: { validFrom: "", validTo: "" } },
  });

  const current = allPricing[activeTab];

  // ADD ROW
  const addRow = () => {
  setAllPricing((prev) => ({
    ...prev,
    [activeTab]: {
      ...prev[activeTab],
      rooms: [...prev[activeTab].rooms, { ...emptyRoom }],
    },
  }));
};

  // DELETE ROW
  const deleteRow = () => {
  setAllPricing((prev) => {
    const rooms = prev[activeTab].rooms;
    if (rooms.length <= 1) return prev;

    return {
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        rooms: rooms.slice(0, -1),
      },
    };
  });
};

  // UPDATE ROOM
 const updateRoom = (index: number, key: string, value: string) => {
  setAllPricing((prev) => {
    const updatedRooms = [...prev[activeTab].rooms];
    updatedRooms[index] = {
      ...updatedRooms[index],
      [key]: value,
    };

    return {
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        rooms: updatedRooms,
      },
    };
  });
};

  // UPDATE DATE
  const updatePricing = (key: string, value: string) => {
    const updated = { ...allPricing };
    updated[activeTab].pricingData[key as keyof Pricing] = value;
    setAllPricing(updated);
  };

  useEffect(() => {
    if (current.rooms.length === 0) {
      addRow();
    }
  }, [activeTab]);

  useEffect(() => {
  // take current tab rooms and send to parent
  setRooms(current.rooms);
}, [allPricing, activeTab]);

  // define this ABOVE return
  const fields = [
    "roomCategory",
    "rooms",
    "single",
    "CPAI",
    "MAPAI",
    "APAI",
    "Ex Adult",
    "Chd with Bed",
    "Chd no Bed",
  ];

  return (
    <div>
      {/* TITLE */}
      <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold mb-2">
        Room Rates
      </div>

      {/* TABS */}
      <div className="flex gap-3 mb-4">
        {TABS.map((tab, index) => (
          <div
            key={tab}
            className="border-2 border-black bg-[#cfe3f5] p-[4px] w-[260px]"
          >
            <button
              onClick={() => setActiveTab(index)}
              className={`w-full py-2 text-sm font-semibold bg-[#123e6b] text-white ${
                activeTab === index ? "" : "opacity-70"
              }`}
            >
              {tab}
            </button>
          </div>
        ))}
      </div>

      {/* CONTENT (COMMON FOR ALL TABS) */}
      <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">
        <div className="bg-white p-4 rounded-xl">
          {/* ACTIVE TAB LABEL */}
          <div className="mb-3 font-semibold text-blue-900">
            {TABS[activeTab]}
          </div>
          {/* DATE SECTION */}
          <div className="flex items-center gap-2 mb-3 w-fit">
            <div className="bg-orange-600 px-4 py-2 text-white border border-black">
              Valid From
            </div>

            <input
              className="bg-[#e6c0b8] border border-black px-3 py-2 w-[140px]"
              type="date"
              value={current.pricingData.validFrom}
              onChange={(e) => updatePricing("validFrom", e.target.value)}
            />

            <div className="bg-orange-600 px-4 py-2 text-white border border-black">
              Valid Till
            </div>

            <input
              className="bg-[#e6c0b8] border border-black px-3 py-2 w-[140px]"
              type="date"
              value={current.pricingData.validTo}
              onChange={(e) => updatePricing("validTo", e.target.value)}
            />
          </div>
      

          {/* TABLE HEADER */}
          <div className="grid grid-cols-[2fr_0.7fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-[#0c2d67] text-white text-center text-sm font-semibold">
            {fields.map((item) => (
              <div key={item} className="p-2 border border-white capitalize">
                {item}
              </div>
            ))}
          </div>
          {/* ROWS */}
          {current.rooms.map((room, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_0.7fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-[#66FFFF]"
            >
              {fields.map((field) => (
                <div key={field} className="p-2 border border-white">
                  <input
                    className="w-full h-full text-center border border-black rounded-[5px] bg-white outline-none"
                    value={room[field as keyof Room] || ""}
                    onChange={(e) => updateRoom(index, field, e.target.value)}
                  />
                </div>
              ))}
            </div>
          ))}
          {/* ADD DELETE */}
          <div className="grid grid-cols-8">
            <div className="col-span-6"></div>

            <div className="col-span-2 flex justify-end">
              <button
                onClick={addRow}
                className="border border-black bg-[#FF0000] text-white px-2 py-1"
              >
                Add
              </button>

              <button
                onClick={deleteRow}
                className="border border-black bg-[#FFFF00] px-2 py-1 -ml-[1px]"
              >
                Delete
              </button>
            </div>
          </div>
          {/* BOTTOM SECTION (UNCHANGED) */}
          <div className="flex mt-3 items-start gap-1 text-sm w-full">
            {/* Meals */}
            <div className="flex flex-col gap-[2px] w-[180px]">
              {["Meals", "Extra Lunch", "Extra Dinner"].map((item) => (
                <div
                  key={item}
                  className="bg-[#041e56] text-white p-2 text-center border h-10 flex items-center justify-center"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Adult */}
            <div className="flex flex-col gap-[2px] w-[100px] ml-1">
              <div className="bg-[#041e56] text-white h-10 flex items-center justify-center border">
                Adult
              </div>
              {[1, 2].map((i) => (
                <div key={i} className="h-10 p-2 border bg-[#66ffff]">
                  <input className="w-full h-full text-center border border-black rounded-[5px] bg-white" />
                </div>
              ))}
            </div>

            {/* Child */}
            <div className="flex flex-col gap-[2px] w-[100px] ml-1">
              <div className="bg-[#041e56] text-white h-10 flex items-center justify-center border">
                Child
              </div>
              {[1, 2].map((i) => (
                <div key={i} className="h-10 p-2 border bg-[#66ffff]">
                  <input className="w-full h-full text-center border border-black rounded-[5px] bg-white" />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-[2px] ml-2 w-[350px]">
              <div className="bg-[#041e56] text-white h-10 flex items-center justify-center border">
                24 Check in
              </div>

              <div className="flex gap-2 border p-2 h-10 bg-[#66ffff]">
                <label className="flex items-center gap-1 border px-2 flex-1 bg-[#ffeef0]">
                  <input type="checkbox" defaultChecked />
                  Applicable
                </label>

                <label className="flex items-center gap-1 border px-2 flex-1 bg-[#ffeef0]">
                  <input type="checkbox" />
                  Not Applicable
                </label>
              </div>
            </div>

            {/* Checkin/out */}
            <div className="flex flex-col gap-[2px] ml-2 w-[420px]">
              <div className="bg-[#041e56] text-white h-10 flex items-center justify-center border">
                Check in / Check out
              </div>
              <div className="grid grid-cols-4 h-10">
                {/* Check In Label */}
                <div className="bg-[#041e56] text-white flex items-center justify-center border">
                  Check in
                </div>

                {/* Check In Input */}
                <div className="h-10 p-2 border bg-[#66ffff]">
                  <input className="w-full h-full text-center border border-black rounded-[5px] bg-white outline-none" />
                </div>

                {/* Check Out Label */}
                <div className="bg-[#041e56] text-white flex items-center justify-center border">
                  Check out
                </div>

                {/* Check Out Input */}
                <div className="h-10 p-2 border bg-[#66ffff]">
                  <input className="w-full h-full text-center border border-black rounded-[5px] bg-white outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingManager;
