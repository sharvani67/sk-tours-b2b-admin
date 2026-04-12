import { useEffect } from "react";

type Props = {
  policies: any;
  setPolicies: React.Dispatch<React.SetStateAction<any>>;
};

const defaultBooking = `1. The above-mentioned booking price is applicable for two passengers traveling together. Any change in the number of travellers may result in a revision of the tour price. We recommend contacting us at the time of booking to confirm the final and accurate cost. Please note that credit card payments may attract additional charges, as applicable under the payment gateway and bank regulations.`;

const defaultCancellation = `1. All cancellation charges are calculated on a per-person basis for bookings with a minimum of two passengers. For bookings involving more than two passengers, cancellation charges may vary as per airline, hotel, and supplier policies, and guests are advised to confirm applicable charges before requesting cancellation. Cancellations will be processed only upon receipt of a duly completed and signed Cancellation Request Form. Cancellation policies may vary depending on the destination. All cancellation and refund requests must be submitted strictly in writing using the official Cancellation Request Form issued by our office. Submission of the form confirms the guest’s acceptance of all applicable cancellation, refund, and service charge terms. In case of no-show or late cancellation, 100% of the tour cost shall be forfeited, with no refund or credit applicable. In exceptional cases such as death or serious medical emergencies involving an immediate family member, we may assist in requesting a refund from the respective suppliers, subject to submission of valid supporting documents. Any refund or future credit is entirely subject to supplier approval, and no refund is guaranteed unless received by us from the service providers. Refunds, if applicable, will be processed after receipt from suppliers and may take one week or longer. All refunds are subject to applicable service charges, administrative fees, and non-recoverable amounts.`;

const BookingPoliciesManager = ({ policies, setPolicies }: Props) => {

  // ✅ Set default only once if empty
  useEffect(() => {
    setPolicies((prev: any) => ({
      booking_policy: prev?.booking_policy || defaultBooking,
      cancellation_policy: prev?.cancellation_policy || defaultCancellation,
      child_policy: prev?.child_policy || "",
      pet_policy: prev?.pet_policy || "",
      terms: prev?.terms || ""
    }));
  }, []);

  const update = (key: string, value: string) => {
    setPolicies((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
          Booking and Cancellation Policy
        </div>
      </div>

      <div className="bg-[#66FFFF] p-4 rounded-xl border border-black space-y-6">

        <div className="grid md:grid-cols-2 gap-4 bg-white p-4 rounded-xl">

          {/* BOOKING */}
          <div className="border border-black rounded-xl overflow-hidden">
            <div className="bg-[#FF0000] text-white text-center py-2 font-semibold">
              Booking Policy
            </div>

            <textarea
              value={policies.booking_policy || ""}
              onChange={(e) => update("booking_policy", e.target.value)}
              className="w-full h-[300px] p-3 outline-none bg-[#FFDADA] resize-none"
            />
          </div>

          {/* CANCELLATION */}
          <div className="border border-black rounded-xl overflow-hidden">
            <div className="bg-[#FF0000] text-white text-center py-2 font-semibold">
              Cancellation Policy
            </div>

            <textarea
              value={policies.cancellation_policy || ""}
              onChange={(e) => update("cancellation_policy", e.target.value)}
              className="w-full h-[300px] p-3 outline-none bg-[#FFDADA] resize-none"
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default BookingPoliciesManager;