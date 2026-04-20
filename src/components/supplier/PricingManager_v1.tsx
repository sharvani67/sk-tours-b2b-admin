import { useEffect, useState } from "react";

type Props = {
  rooms: any[];
  setRooms: any;
  pricingData: any;
  setPricingData: any;
};

const TABS = [
  "Normal Rate",
  "Public Holiday",
  "Festival Rates",
  "Banquet Rate",
];

const PricingManager = ({
  rooms,
  setRooms,
  pricingData,
  setPricingData,
}: Props) => {
  const [activeTab, setActiveTab] = useState(0);

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
    updated.pop();
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
      <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold mb-2">
        Room Rates
      </div>

      {/* TABS */}
      <div className="grid grid-cols-4 text-center font-semibold text-white mb-2">
        {TABS.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={`p-2 border border-black transition ${
              activeTab === index ? "bg-[#FF0000]" : "bg-[#1b3b6f]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === 0 ? (
        <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">
          <div className="bg-white p-4 rounded-xl">
            
            {/* DATE SECTION */}
            <div className="grid grid-cols-4 mb-3">
              <div className="bg-orange-600 p-2 text-white text-center">
                Valid From
              </div>
              <input
                className="bg-[#e6c0b8] border p-2"
                type="date"
                value={pricingData.validFrom}
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    validFrom: e.target.value,
                  })
                }
              />

              <div className="bg-orange-600 p-2 text-white text-center">
                Valid Till
              </div>
              <input
                className="bg-[#e6c0b8] border p-2"
                type="date"
                value={pricingData.validTo}
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    validTo: e.target.value,
                  })
                }
              />
            </div>

            {/* TABLE HEADER */}
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
                <div key={item} className="p-2 border border-black">
                  {item}
                </div>
              ))}
            </div>

            {/* ROWS */}
            {rooms.map((room: any, index: number) => (
              <div key={index} className="grid grid-cols-8">
                {[
                  "type",
                  "rooms",
                  "single",
                  "cpai",
                  "mapai",
                  "extraAdult",
                  "childBed",
                  "childNoBed",
                ].map((key) => (
                  <input
                    key={key}
                    className="border border-black p-2 bg-[#66FFFF]"
                    value={room[key] || ""}
                    onChange={(e) =>
                      updateRoom(index, key, e.target.value)
                    }
                  />
                ))}
              </div>
            ))}

            {/* ADD / DELETE */}
            <div className="grid grid-cols-8">
              <div className="col-span-6"></div>

              <button
                onClick={addRow}
                className="border border-black bg-[#FF0000] text-white"
              >
                Add
              </button>

              <button
                onClick={deleteRow}
                className="border border-black bg-[#FFFF00]"
              >
                Delete
              </button>
            </div>

            {/* MEALS */}
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
              <input
                className="border border-black bg-[#66FFFF]"
                value={pricingData.meals.lunchAdult}
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    meals: {
                      ...pricingData.meals,
                      lunchAdult: e.target.value,
                    },
                  })
                }
              />
              <input
                className="border border-black bg-[#66FFFF]"
                value={pricingData.meals.lunchChild}
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    meals: {
                      ...pricingData.meals,
                      lunchChild: e.target.value,
                    },
                  })
                }
              />

              <div className="bg-[#0c2d67] text-white p-2 border border-black text-center">
                Extra Dinner
              </div>
              <input
                className="border border-black bg-[#66FFFF]"
                value={pricingData.meals.dinnerAdult}
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    meals: {
                      ...pricingData.meals,
                      dinnerAdult: e.target.value,
                    },
                  })
                }
              />
              <input
                className="border border-black bg-[#66FFFF]"
                value={pricingData.meals.dinnerChild}
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    meals: {
                      ...pricingData.meals,
                      dinnerChild: e.target.value,
                    },
                  })
                }
              />
            </div>

            {/* COMING SECTIONS SAME AS YOUR CODE (24 CHECKIN + CHECKIN/OUT) */}
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
      ) : (
        <div className="bg-[#66FFFF] p-10 text-center border border-black rounded-md">
          <h2 className="text-xl font-semibold">Coming Soon 🚧</h2>
        </div>
      )}
    </div>
  );
};

export default PricingManager;