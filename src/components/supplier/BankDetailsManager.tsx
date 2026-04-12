import { useState } from "react";

type BankDetails = {
  account_holder: string;
  bank_name: string;
  account_number: string;
  ifsc: string;
  branch: string;
  cancelled_cheque: File | null;
};

type Props = {
  bankDetails: BankDetails[];
  setBankDetails: React.Dispatch<React.SetStateAction<BankDetails[]>>;
};

const BankDetailsManager = ({ bankDetails, setBankDetails }: Props) => {

  const [gpay, setGpay] = useState({
    number: "",
    name: "",
  });

  const handleChange = (index: number, key: string, value: any) => {
    const updated = [...bankDetails];
    updated[index][key] = value;
    setBankDetails(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
          Bank Details
        </div>
      </div>

      <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">

        <div className="bg-white p-4 rounded-xl">

          <div className="grid grid-cols-2 gap-10">

            {/* LEFT SIDE */}
            <div className="space-y-2">

              {[0, 1].map((bankIndex) => (
                <div key={bankIndex} className="mb-4">

                  <div className="text-sm font-semibold mb-2">
                    Bank Details {bankIndex + 1}
                  </div>

                  {[
                    { label: "Bank Name", key: "bank_name" },
                    { label: "Account Holder", key: "account_holder" },
                    { label: "Account Number", key: "account_number" },
                    { label: "IFSC Code", key: "ifsc" },
                    { label: "Branch", key: "branch" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center gap-2 mb-2">

                      <div className="bg-[#0c2d67] text-white px-3 text-md py-1 w-40 rounded-md">
                        {item.label}
                      </div>

                      <input
                        value={bankDetails[bankIndex]?.[item.key] || ""}
                        onChange={(e) =>
                          handleChange(bankIndex, item.key, e.target.value)
                        }
                        className="flex-1 bg-[#FFDADA] px-3 py-1 border border-black rounded-md"
                      />

                    </div>
                  ))}

                  {bankIndex === 0 && <hr className="my-3 border-black" />}

                </div>
              ))}

            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col items-center mt-5">

              {/* CHEQUE PREVIEW */}
              <div className="w-[300px] h-[220px] bg-[#e6cccc] border border-black rounded-md flex items-center justify-center">
                {bankDetails[0]?.cancelled_cheque ? (
                  <img
                    src={URL.createObjectURL(bankDetails[0].cancelled_cheque)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">Cheque Preview</span>
                )}
              </div>

              {/* BUTTONS */}
              <div className="flex gap-32 mt-3">
                <label className="bg-[#FFFF00] px-4 py-1 border border-black rounded-md cursor-pointer">
                  Upload
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e: any) =>
                      handleChange(0, "cancelled_cheque", e.target.files?.[0])
                    }
                  />
                </label>

                <button
                  onClick={() => handleChange(0, "cancelled_cheque", null)}
                  className="bg-[#FFC000] px-4 py-1 border border-black rounded-md"
                >
                  Delete
                </button>
              </div>

              {/* GPAY */}
              <div className="mt-6 space-y-2 w-full">

                <div className="flex items-center gap-2">
                  <div className="bg-[#0c2d67] text-white px-3 py-1 w-40 rounded-md">
                    Gpay Number
                  </div>
                  <input
                    value={gpay.number}
                    onChange={(e) =>
                      setGpay({ ...gpay, number: e.target.value })
                    }
                    className="flex-1 bg-[#FFDADA] px-3 py-1 border border-black rounded-md"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-[#0c2d67] text-white px-3 py-1 w-40 rounded-md">
                    Gpay Name
                  </div>
                  <input
                    value={gpay.name}
                    onChange={(e) =>
                      setGpay({ ...gpay, name: e.target.value })
                    }
                    className="flex-1 bg-[#FFDADA] px-3 py-1 border border-black rounded-md"
                  />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default BankDetailsManager;