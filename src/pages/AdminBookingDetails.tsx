import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config/api";

export default function AdminBookingDetails() {
  const { bookingNumber } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [reason, setReason] = useState("");
const [specialPercent, setSpecialPercent] = useState(0);

  // ================= FETCH BOOKING =================
  const fetchBooking = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/api/bookings/details/${bookingNumber}`
      );

      if (!res.ok) throw new Error("Failed to fetch booking");

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [bookingNumber]);

  // ================= UPDATE STATUS =================
const updateStatus = async (type: "confirm" | "cancel") => {
  try {
    setUpdating(true);

    let response;

    if (type === "cancel") {

      if (!reason) {
        alert("Please select cancellation reason");
        setUpdating(false);
        return;
      }

      const res = await fetch(
        `${API_URL}/api/admin/cancel/${bookingNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reason,
            customPercent:
              reason === "SPECIAL_APPROVAL" ? specialPercent : null
          })
        }
      );

      if (!res.ok) throw new Error("Failed to cancel booking");

      response = await res.json();

    } else {
      const res = await fetch(
        `${API_URL}/api/admin/confirm/${bookingNumber}`,
        { method: "PUT" }
      );

      if (!res.ok) throw new Error("Failed to confirm booking");

      response = await res.json();
    }

    // 🔥 Update UI
    setData((prev: any) => ({
      ...prev,
      booking: {
        ...prev.booking,
        status: type === "confirm" ? "Confirmed" : "Cancelled",
        confirmed_at:
          type === "confirm"
            ? new Date().toISOString()
            : prev.booking.confirmed_at,
        cancelled_at:
          type === "cancel"
            ? new Date().toISOString()
            : prev.booking.cancelled_at,
        cancelled_by:
          type === "cancel"
            ? "admin"
            : prev.booking.cancelled_by,
        payment_status:
          type === "cancel"
            ? "Refunded"
            : prev.booking.payment_status,
        refund_amount:
          type === "cancel"
            ? response?.refundAmount || 0
            : prev.booking.refund_amount,
        cancellation_charge:
          type === "cancel"
            ? response?.cancellationCharge || 0
            : prev.booking.cancellation_charge,
      }
    }));

  } catch (err) {
    console.error(err);
  } finally {
    setUpdating(false);
  }
};

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          Booking not found
        </div>
      </AdminLayout>
    );
  }

  const { booking, rooms } = data;

const today = new Date();
const checkInDate = new Date(booking.check_in);

const canConfirm =
  booking.status === "Pending" &&
  booking.payment_status === "Paid";

const canCancel =
  booking.status !== "Cancelled" &&
  today < checkInDate;

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-3xl font-bold">
            Booking #{booking.booking_number}
          </h1>
          <p className="text-muted-foreground">
            Created on {new Date(booking.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* ================= STATUS CARD ================= */}
<Card className="p-6">

  <div className="flex justify-between items-start">

    <div>
      <p className="text-sm text-muted-foreground">Status</p>
      <Badge
        className={
          booking.status === "Confirmed"
            ? "bg-green-100 text-green-600"
            : booking.status === "Cancelled"
            ? "bg-red-100 text-red-600"
            : "bg-yellow-100 text-yellow-600"
        }
      >
        {booking.status}
      </Badge>
    </div>

    {(canConfirm || canCancel) && (
      <div className="flex items-center gap-3">

        {canCancel && (
          <>
            <select
              className="border rounded px-3 py-2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select Cancel Reason</option>
              <option value="HOTEL_OVERBOOKED">Hotel Overbooked</option>
              <option value="HOTEL_CLOSED">Hotel Closed</option>
              <option value="SYSTEM_ERROR">System Error</option>
              <option value="PAYMENT_FAILURE">Payment Failure</option>
              <option value="POLICY_VIOLATION">Policy Violation</option>
              <option value="CUSTOMER_REQUEST">Customer Request</option>
              <option value="SPECIAL_APPROVAL">Special Approval</option>
            </select>

            {reason === "SPECIAL_APPROVAL" && (
              <input
                type="number"
                placeholder="%"
                className="w-24 border rounded px-2 py-2"
                value={specialPercent}
                onChange={(e) =>
                  setSpecialPercent(Number(e.target.value))
                }
              />
            )}
          </>
        )}

        {canConfirm && (
          <Button
            disabled={updating}
            onClick={() => updateStatus("confirm")}
          >
            Confirm
          </Button>
        )}

        {canCancel && (
          <Button
            variant="destructive"
            disabled={updating}
            onClick={() => updateStatus("cancel")}
          >
            Cancel
          </Button>
        )}

      </div>
    )}

  </div>

</Card>

        {/* ================= PROPERTY + AGENT ================= */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-2">
            <h2 className="font-semibold text-lg mb-3">
              Property Details
            </h2>
            <p><b>Name:</b> {booking.property_name}</p>
            <p><b>City:</b> {booking.city}</p>
            <p><b>Address:</b> {booking.address}</p>
          </Card>

          <Card className="p-6 space-y-2">
            <h2 className="font-semibold text-lg mb-3">
              Agent Details
            </h2>
            <p><b>Company:</b> {booking.agent_name}</p>
            <p><b>Contact:</b> {booking.contact_person}</p>
            <p><b>Email:</b> {booking.agent_email}</p>
          </Card>
        </div>

        {/* ================= STAY INFO ================= */}
        <Card className="p-6">
          <h2 className="font-semibold text-lg mb-4">
            Stay Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Check In</p>
              <p className="font-semibold">
                {new Date(booking.check_in).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Check Out</p>
              <p className="font-semibold">
                {new Date(booking.check_out).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Nights</p>
              <p className="font-semibold">
                {booking.total_nights}
              </p>
            </div>
          </div>
        </Card>

        {/* ================= FINANCIAL ================= */}
        <Card className="p-6">
          <h2 className="font-semibold text-lg mb-4">
            Financial Breakdown
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-muted-foreground">Base Amount</p>
              <p className="font-semibold">₹{booking.base_amount}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Extra Charges</p>
              <p className="font-semibold">₹{booking.extra_amount}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Commission</p>
              <p className="font-semibold">₹{booking.commission_amount}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Supplier Payable</p>
              <p className="font-semibold text-green-600">
                ₹{booking.final_payable}
              </p>
            </div>
          </div>
        </Card>

        {/* ================= REFUND ================= */}
        {booking.status === "Cancelled" && (
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4">
              Refund Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground">Refund Amount</p>
                <p className="font-semibold text-green-600">
                  ₹{booking.refund_amount || 0}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Cancellation Charge</p>
                <p className="font-semibold text-red-600">
                  ₹{booking.cancellation_charge || 0}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* ================= ROOMS ================= */}
        <Card className="p-6">
          <h2 className="font-semibold text-lg mb-4">
            Rooms
          </h2>

          {rooms.map((r: any) => (
            <div
              key={r.id}
              className="border rounded-lg p-4 mb-4"
            >
              <p><b>Plan:</b> {r.plan}</p>
              <p><b>Adults:</b> {r.adults}</p>
              <p><b>Children (Bed):</b> {r.children_with_bed}</p>
              <p><b>Children (No Bed):</b> {r.children_without_bed}</p>
              <p><b>Price/Night:</b> ₹{r.price_per_night}</p>
            </div>
          ))}
        </Card>

        {/* ================= TIMELINE ================= */}
        <Card className="p-6">
          <h2 className="font-semibold text-lg mb-6">
            Booking Timeline
          </h2>

          <div className="space-y-6">

            <div className="flex gap-4">
              <div className="w-3 h-3 bg-primary rounded-full mt-2" />
              <div>
                <p className="font-semibold">Booking Created</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(booking.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            {booking.confirmed_at && (
  <div className="flex gap-4">
    <div className="w-3 h-3 bg-green-500 rounded-full mt-2" />
    <div>
      <p className="font-semibold">Booking Confirmed</p>
      <p className="text-sm text-muted-foreground">
        {new Date(booking.confirmed_at).toLocaleString()}
      </p>
    </div>
  </div>
)}

            {booking.cancelled_at && (
  <div className="flex gap-4">
    <div className="w-3 h-3 bg-red-500 rounded-full mt-2" />
    <div>
      <p className="font-semibold">
        Booking Cancelled ({booking.cancelled_by})
      </p>
      <p className="text-sm text-muted-foreground">
        {new Date(booking.cancelled_at).toLocaleString()}
      </p>
    </div>
  </div>
)}

          </div>
        </Card>

      </div>
    </AdminLayout>
  );
}