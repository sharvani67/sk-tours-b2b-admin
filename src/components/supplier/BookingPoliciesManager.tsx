import { useEffect } from "react";

type Props = {
  policies: any;
  setPolicies: React.Dispatch<React.SetStateAction<any>>;
};

type BookingRow = {
  policy: string;
  amount: string;
};

type CancellationRow = {
  policy: string;
  charge: string;
};

const defaultBookingRows: BookingRow[] = [
  { policy: "P.P Booking Amount", amount: "30000" },
  { policy: "30 Days Prior P.P cost", amount: "50 % of the tour cost" },
  { policy: "21 Days Prior P.P cost", amount: "Balance payment to pay" },
];

const defaultCancellationRows: CancellationRow[] = [
  { policy: "45 Days prior Cost P.P", charge: "₹25,000" },
  { policy: "30 Days prior Cost P.P", charge: "50 % of the Tour Cost" },
  {
    policy: "21 Days till Departure date Cost P.P",
    charge: "100 % Cancellation Applies",
  },
];

const defaultBookingRemarks =
  "The tour price indicated above is applicable for two passengers traveling together. Any change in the number of travellers shall be deemed a modification of the booking and may result in a revision of the tour price. Clients are advised to contact the company at the time of booking to confirm the final and accurate cost. While the company endeavours to publish rates accurately.";

const defaultCancellationRemarks =
  "All cancellation charges are calculated on a per-person basis for bookings with a minimum of two passengers. For bookings involving more than two passengers, cancellation charges may vary as per airline, hotel, and supplier policies, and guests are advised to confirm applicable charges before requesting cancellation. Cancellations will be processed only upon receipt of a duly completed and signed Cancellation Request Form. Cancellation policies may vary depending on the destination. All cancellation and refund requests must be submitted strictly in writing using the official Cancellation Request Form issued by our office. Submission of the form confirms the guest’s acceptance of all applicable cancellation, refund, and service charge terms. In case of no-show or late cancellation, 100% of the tour cost shall be forfeited, with no refund or credit applicable. In exceptional cases such as death or serious medical emergencies involving an immediate family member, we may assist in requesting a refund from the respective suppliers, subject to submission of valid supporting documents. Any refund or future credit is entirely subject to supplier approval, and no refund is guaranteed unless received by us from the service providers. Refunds, if applicable, will be processed after receipt from suppliers and may take one week or longer. All refunds are subject to applicable service charges, administrative fees, and non-recoverable amounts.";

const BookingPoliciesManager = ({ policies, setPolicies }: Props) => {
  useEffect(() => {
    setPolicies((prev: any) => ({
      ...prev,

      booking_policy_rows:
        prev?.booking_policy_rows?.length > 0
          ? prev.booking_policy_rows
          : defaultBookingRows,

      cancellation_policy_rows:
        prev?.cancellation_policy_rows?.length > 0
          ? prev.cancellation_policy_rows
          : defaultCancellationRows,

      booking_policy_remarks:
        prev?.booking_policy_remarks || defaultBookingRemarks,

      cancellation_policy_remarks:
        prev?.cancellation_policy_remarks || defaultCancellationRemarks,

      child_policy: prev?.child_policy || "",
      pet_policy: prev?.pet_policy || "",
      terms: prev?.terms || "",
    }));
  }, [setPolicies]);

  const updateBooking = (
    index: number,
    key: keyof BookingRow,
    value: string
  ) => {
    setPolicies((prev: any) => {
      const rows = [...(prev.booking_policy_rows || defaultBookingRows)];
      rows[index] = { ...rows[index], [key]: value };

      return {
        ...prev,
        booking_policy_rows: rows,
      };
    });
  };

  const updateCancellation = (
    index: number,
    key: keyof CancellationRow,
    value: string
  ) => {
    setPolicies((prev: any) => {
      const rows = [
        ...(prev.cancellation_policy_rows || defaultCancellationRows),
      ];

      rows[index] = { ...rows[index], [key]: value };

      return {
        ...prev,
        cancellation_policy_rows: rows,
      };
    });
  };

  const updatePolicyField = (key: string, value: string) => {
    setPolicies((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const bookingRows = policies?.booking_policy_rows || defaultBookingRows;

  const cancellationRows =
    policies?.cancellation_policy_rows || defaultCancellationRows;

  return (


        <div className="w-full">
      {/* 🔵 HEADER OUTSIDE FRAME */}
      <div className="mb-2">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
          Booking & Cancellation Policy
        </div>
      </div>

  <div
  style={{
    backgroundColor: "#66FFFF",
    padding: "14px",          // p-4
    borderRadius: "12px",     // rounded-xl
    border: "2px solid black"// border border-black
  }}
>

    <div
      style={{
        width: "100%",
        background: "#dfe8f8",
        border: "3px solid #2f5297",
        borderRadius: "10px",
        padding: "5px",
        boxSizing: "border-box",
      }}
    >

      {/* TOP TABLES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px",
          marginTop: "3px",
        }}
      >
        {/* BOOKING TABLE */}
        <div
          style={{
            background: "#dfe8f8",
            border: "2px solid #2f5297",
            borderRadius: "10px",
            overflow: "hidden",
            minHeight: "330px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "58% 42%",
              height: "54px",
            }}
          >
            <div
              style={{
                background: "#31539a",
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "2px solid #16346f",
              }}
            >
              Booking Policy
            </div>

            <div
              style={{
                background: "#31539a",
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Amount
            </div>
          </div>

          {bookingRows.map((row: BookingRow, index: number) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "58% 42%",
                height: "46px",
                borderTop: "1px solid #333333",
              }}
            >
              <input
                value={row.policy}
                onChange={(e) =>
                  updateBooking(index, "policy", e.target.value)
                }
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#dfe8f8",
                  border: "none",
                  borderRight: "2px solid #16346f",
                  outline: "none",
                  padding: "0 12px",
                  fontSize: "14px",
                  color: "#000000",
                  boxSizing: "border-box",
                }}
              />

              <input
                value={row.amount}
                onChange={(e) =>
                  updateBooking(index, "amount", e.target.value)
                }
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#dfe8f8",
                  border: "none",
                  outline: "none",
                  padding: "0 12px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#109846",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}

          <div
            style={{
              height: "135px",
              borderTop: "1px solid #333333",
              background: "#dfe8f8",
            }}
          />
        </div>

        {/* CANCELLATION TABLE */}
        <div
          style={{
            background: "#dfe8f8",
            border: "2px solid #2f5297",
            borderRadius: "10px",
            overflow: "hidden",
            minHeight: "330px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "58% 42%",
              height: "54px",
            }}
          >
            <div
              style={{
                background: "#aa2100",
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "2px solid #16346f",
              }}
            >
              Cancellation Policy
            </div>

            <div
              style={{
                background: "#aa2100",
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Charge
            </div>
          </div>

          {cancellationRows.map((row: CancellationRow, index: number) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "58% 42%",
                height: "46px",
                borderTop: "1px solid #333333",
              }}
            >
              <input
                value={row.policy}
                onChange={(e) =>
                  updateCancellation(index, "policy", e.target.value)
                }
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#dfe8f8",
                  border: "none",
                  borderRight: "2px solid #16346f",
                  outline: "none",
                  padding: "0 12px",
                  fontSize: "14px",
                  color: "#000000",
                  boxSizing: "border-box",
                }}
              />

              <input
                value={row.charge}
                onChange={(e) =>
                  updateCancellation(index, "charge", e.target.value)
                }
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#dfe8f8",
                  border: "none",
                  outline: "none",
                  padding: "0 12px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#9b2108",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}

          <div
            style={{
              height: "135px",
              borderTop: "1px solid #333333",
              background: "#dfe8f8",
            }}
          />
        </div>
      </div>

      {/* REMARKS SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px",
          marginTop: "4px",
        }}
      >
        {/* BOOKING REMARKS */}
        <div
          style={{
            border: "2px solid #2f5297",
            borderRadius: "10px",
            overflow: "hidden",
            background: "#ffe9e9",
          }}
        >
          <div
            style={{
              height: "48px",
              background: "#31539a",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Booking Policy Remarks
          </div>

        <textarea
  value={policies?.booking_policy_remarks || ""}
  onChange={(e) =>
    updatePolicyField("booking_policy_remarks", e.target.value)
  }
  style={{
    width: "100%",
    height: "162px",
    background: "#ffe9e9",
    border: "none",
    outline: "none",
    resize: "none",
    padding: "15px 15px",
    fontSize: "16px",
    lineHeight: "26px",
    color: "#000000",
    boxSizing: "border-box",
    textAlign: "justify", // ✅ added
  }}
/>
        </div>

        {/* CANCELLATION REMARKS */}
        <div
          style={{
            border: "2px solid #2f5297",
            borderRadius: "10px",
            overflow: "hidden",
            background: "#ffe9e9",
          }}
        >
          <div
            style={{
              height: "48px",
              background: "#aa2100",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Cancellation Policy Remarks
          </div>

          <textarea
            value={policies?.cancellation_policy_remarks || ""}
            onChange={(e) =>
              updatePolicyField("cancellation_policy_remarks", e.target.value)
            }
            style={{
              width: "100%",
              height: "162px",
              background: "#ffe9e9",
              border: "none",
              outline: "none",
              resize: "none",
              padding: "15px 15px",
              fontSize: "16px",
              lineHeight: "26px",
              color: "#000000",
              boxSizing: "border-box",
             textAlign: "justify",
            }}
          />
        </div>
      </div>
    </div>
    </div>
    </div>
    
  );
};

export default BookingPoliciesManager;



