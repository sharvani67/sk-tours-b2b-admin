import { useState } from "react";

const AnnualChargesManager = () => {

  const [charges, setCharges] = useState({
    maintenance_amount: "",
    maintenance_note: "",
    service_amount: "",
    service_note: "",
    gst_amount: "",
    gst_note: "",
    extra_amount: "",
    extra_note: "",
  });

  const handleChange = (key: string, value: string) => {
    setCharges((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>

      {/* TITLE */}
      <div className="flex justify-between items-center mb-2">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
          Annual Charges
        </div>
      </div>

      {/* MAIN BOX */}
      <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">

        <div className="bg-white p-4 rounded-xl space-y-3">

          {[
            {
              label: "Maintenance Fee",
              amountKey: "maintenance_amount",
              noteKey: "maintenance_note",
            },
            {
              label: "Service Charges",
              amountKey: "service_amount",
              noteKey: "service_note",
            },
            {
              label: "GST (%)",
              amountKey: "gst_amount",
              noteKey: "gst_note",
            },
            {
              label: "Extra Charges",
              amountKey: "extra_amount",
              noteKey: "extra_note",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[200px_150px_1fr] gap-2 items-center"
            >

              {/* LABEL */}
              <div className="bg-[#0c2d67] text-white px-3 py-1 rounded-md">
                {item.label}
              </div>

              {/* AMOUNT */}
              <input
                value={(charges as any)[item.amountKey]}
                onChange={(e) =>
                  handleChange(item.amountKey, e.target.value)
                }
                placeholder="Amount"
                className="bg-[#FFDADA] px-3 py-1 border border-black rounded-md w-full"
              />

              {/* REMARK / NOTE */}
              <input
                value={(charges as any)[item.noteKey]}
                onChange={(e) =>
                  handleChange(item.noteKey, e.target.value)
                }
                placeholder="Remarks"
                className="bg-[#FFDADA] px-3 py-1 border border-black rounded-md w-full"
              />

            </div>
          ))}

          {/* TOTAL */}
          <div className="mt-4 border-t pt-3">

            <div className="grid grid-cols-[200px_150px_1fr] gap-2 items-center">
              <div className="bg-[#002060] text-white px-3 py-1 rounded-md font-semibold">
                Total
              </div>

              <input
                value={
                  Number(charges.maintenance_amount || 0) +
                  Number(charges.service_amount || 0) +
                  Number(charges.extra_amount || 0)
                }
                readOnly
                className="bg-[#FFDADA] px-3 py-1 border border-black rounded-md font-semibold"
              />

              <input
                value="Auto Calculated"
                readOnly
                className="bg-[#FFDADA] px-3 py-1 border border-black rounded-md"
              />

            </div>

          </div>

        </div>

        

      </div>

    </div>
  );
};

export default AnnualChargesManager;