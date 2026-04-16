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

      {/* <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">

        <div className="bg-white p-4 rounded-xl">

          <div className="grid grid-cols-2 gap-10">

         
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

          
            <div className="flex flex-col items-center mt-5">

         
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

      </div> */}

     <div className="bg-[#66FFFF] p-4 rounded-xl border border-black">
  <div className="bg-[#fff] p-4 rounded-xl">

    <div className="grid grid-cols-3 gap-6">

      {/* ================= LEFT SIDE ================= */}
      <div className="col-span-1">

        {[0, 1].map((bankIndex) => (
          <div key={bankIndex} className="mb-4">

            {/* TITLE */}
            <div className="text-sm font-semibold mb-2">
              Bank {bankIndex + 1}
            </div>

            {[
              { label: "Bank Name", key: "bank_name" },
              { label: "Account Name", key: "account_holder" },
              { label: "Account Number", key: "account_number" },
              { label: "IFSC Code", key: "ifsc" },
              { label: "Branch Name", key: "branch" },
              { label: "Bank Address", key: "bank_address" },
              { label: "Address", key: "address" },
            ].map((item) => (

              <div key={item.key} className="flex items-center gap-1 mt-[2px]">

                {/* LABEL */}
                <div className="bg-[#0c2d67] text-white text-xs font-semibold px-2 py-1 h-7 flex items-center w-36 rounded-[5px] border-2 border-gray-700">
                  {item.label}
                </div>

                {/* INPUT */}
                <input
                  value={bankDetails[bankIndex]?.[item.key] || ""}
                  onChange={(e) =>
                    handleChange(bankIndex, item.key, e.target.value)
                  }
                  className="flex-1 h-7 px-2 py-1 text-xs bg-[#fff] border-2 border-gray-700 rounded-[5px] outline-none"
                />

              </div>
            ))}

          </div>
        ))}

      </div>

      {/* ================= CENTER ================= */}
      <div className="flex flex-col items-center justify-start">

        {/* CHEQUE PREVIEW */}
        <div className="w-[260px] h-[85%] mt-7 bg-[#d6c4c4] border border-black rounded-md flex items-center justify-center">
          {bankDetails[0]?.cancelled_cheque ? (
            <img
              src={URL.createObjectURL(bankDetails[0].cancelled_cheque)}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-600 text-sm">Preview</span>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-10 mt-3">

          <label className="bg-[#FFFF00] w-28 text-center px-4 py-1 text-xs border-2 border-gray-700 rounded-[5px] cursor-pointer">
            Upload
            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                handleChange(0, "cancelled_cheque", e.target.files?.[0])
              }
            />
          </label>

          <button
            onClick={() => handleChange(0, "cancelled_cheque", null)}
            className="bg-[#FFC000] w-28 px-4 py-1 text-xs border-2 border-gray-700 rounded-[5px]"
          >
            Delete
          </button>

        </div>

      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="col-span-1 flex flex-col gap-2 mt-6">

        {/* GPAY NUMBER */}
        <div className="flex items-center gap-1 mt-[2px]">

          <div className="bg-[#0c2d67] text-white text-xs font-semibold px-2 h-7 flex items-center w-36 border-2 border-gray-700 rounded-[5px]">
            Gpay Number
          </div>

          <input
            value={gpay.number}
            onChange={(e) =>
              setGpay({ ...gpay, number: e.target.value })
            }
            className="flex-1 h-7 px-2 text-xs bg-[#fff] border-2 border-gray-700 rounded-[5px] outline-none"
          />

        </div>

        {/* GPAY NAME */}
        <div className="flex items-center gap-1 mt-[2px]">

          <div className="bg-[#0c2d67] text-white text-xs font-semibold px-2 h-7 flex items-center w-36 border-2 border-gray-700 rounded-[5px]">
            Gpay Name
          </div>

          <input
            value={gpay.name}
            onChange={(e) =>
              setGpay({ ...gpay, name: e.target.value })
            }
            className="flex-1 h-7 px-2 text-xs bg-[#fff] border-2 border-gray-700 rounded-[5px] outline-none"
          />

        </div>

      </div>

    </div>

  </div>
</div>
    </div>
  );
};

export default BankDetailsManager;
