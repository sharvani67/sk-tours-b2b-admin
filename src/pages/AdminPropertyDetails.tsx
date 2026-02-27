import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/config/api";
import { Button } from "@/components/ui/button";

export default function AdminPropertyDetails() {

  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fetchProperty = async () => {
    try {
      const res = await fetch(`${API_URL}/api/properties/${id}/full`);
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

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
          Property not found
        </div>
      </AdminLayout>
    );
  }

  const { property, images, rooms, rates, policies } = data;

  const updateStatus = async (status: string) => {
  try {
    const res = await fetch(
      `${API_URL}/api/admin/property-status/${property.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      }
    );

    if (!res.ok) throw new Error("Failed");

    setData((prev: any) => ({
      ...prev,
      property: {
        ...prev.property,
        status
      }
    }));

  } catch (err) {
    console.error(err);
  }
};

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ================= COVER IMAGE ================= */}
{images.length > 0 && (
  <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
    <img
      src={`${API_URL}/uploads/${images.find((img: any) => img.is_cover == 1)?.image_path || images[0].image_path}`}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/30 flex items-end p-6">
      <div className="text-white">
        <h1 className="text-3xl font-bold">
          {property.name}
        </h1>
        <p className="text-sm">
          {property.city} • {property.category}
        </p>
      </div>
    </div>
  </div>
)}

        {/* ================= HEADER ================= */}
        <div>
          <p className="text-muted-foreground">
            Created on {new Date(property.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* ================= STATUS CARD ================= */}
  <Card className="p-6 space-y-6">

  {/* TOP ROW */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

    {/* LEFT SECTION */}
    <div className="flex items-center gap-10">

      {/* Status */}
      <div>
        <p className="text-sm text-muted-foreground">Status</p>
        <Badge
          className={
            property.status === "Approved"
              ? "bg-green-100 text-green-600"
              : property.status === "Rejected"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }
        >
          {property.status}
        </Badge>
      </div>

      {/* Category */}
      <div>
        <p className="text-sm text-muted-foreground">Category</p>
        <Badge className="bg-blue-100 text-blue-600">
          {property.category}
        </Badge>
      </div>

      {/* City */}
      <div>
        <p className="text-sm text-muted-foreground">City</p>
        <p className="font-semibold">{property.city}</p>
      </div>

    </div>

    {/* ACTION BUTTONS */}
    {property.status === "Pending" && (
      <div className="flex gap-3">
        <Button onClick={() => updateStatus("Approved")}>
          Approve
        </Button>

        <Button
          variant="destructive"
          onClick={() => updateStatus("Rejected")}
        >
          Reject
        </Button>
      </div>
    )}

  </div>

</Card>

        {/* ================= PROPERTY + CONTACT ================= */}
        <div className="grid md:grid-cols-2 gap-6">

          <Card className="p-6 space-y-3">
            <h2 className="font-semibold text-lg mb-2">
              Property Details
            </h2>
            <p><b>Address:</b> {property.address}</p>
            <p><b>Area:</b> {property.area}</p>
            <p><b>Pincode:</b> {property.pincode}</p>
          </Card>

          <Card className="p-6 space-y-3">
            <h2 className="font-semibold text-lg mb-2">
              Contact Details
            </h2>
            <p><b>Contact:</b> {property.contact}</p>
            <p><b>Email:</b> {property.email}</p>
          </Card>

        </div>

        {/* ================= IMAGE GALLERY ================= */}
       <Card className="p-6">
        <h2 className="font-semibold text-lg mb-4">
            Property Images
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img: any) => (
            <img
                key={img.id}
                src={`${API_URL}/uploads/${img.image_path}`}
                onClick={() =>
                setSelectedImage(`${API_URL}/uploads/${img.image_path}`)
                }
                className="rounded-xl h-36 w-full object-cover shadow cursor-pointer hover:scale-105 transition"
            />
            ))}
        </div>
        </Card>

        {/* ================= ROOMS ================= */}
        <Card className="p-6">
          <h2 className="font-semibold text-lg mb-6">
            Rooms
          </h2>

          {rooms.map((room: any) => {

            const roomRates = rates.filter(
              (r: any) => r.room_id === room.id
            );

            return (
              <div
                key={room.id}
                className="border rounded-xl p-5 mb-6"
              >
                <div className="mb-4">
                  <p className="font-semibold text-lg">
                    {room.type}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Max Adults: {room.max_adults} | 
                    Max Children: {room.max_children}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  {roomRates.map((rate: any, index: number) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3"
                    >
                      <p><b>Plan:</b> {rate.plan}</p>
                      <p><b>Type:</b> {rate.rate_type}</p>
                      <p><b>Base:</b> ₹{rate.base_price}</p>
                      <p><b>Extra Adult:</b> ₹{rate.extra_adult_price}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </Card>

        {/* ================= POLICIES ================= */}
      <Card className="p-6 space-y-6">
  <h2 className="font-semibold text-lg">
    Policies
  </h2>

  {/* Booking Policy */}
  <div>
    <p className="text-sm text-muted-foreground mb-2">
      Booking Policy
    </p>
    <ul className="list-disc pl-6 space-y-1 text-sm">
      {policies.booking_policy?.split("\n").map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>

  {/* Cancellation Policy */}
  <div>
    <p className="text-sm text-muted-foreground mb-2">
      Cancellation Policy
    </p>
    <ul className="list-disc pl-6 space-y-1 text-sm">
      {policies.cancellation_policy?.split("\n").map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>

  {/* Terms */}
  <div>
    <p className="text-sm text-muted-foreground mb-2">
      Terms & Conditions
    </p>
    <ul className="list-disc pl-6 space-y-1 text-sm">
      {policies.terms?.split("\n").map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
</Card>

        {/* ================= TIMELINE ================= */}
        <Card className="p-6">
          <h2 className="font-semibold text-lg mb-6">
            Property Timeline
          </h2>

          <div className="flex gap-4">
            <div className="w-3 h-3 bg-primary rounded-full mt-2" />
            <div>
              <p className="font-semibold">
                Property Created
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(property.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

      </div>
      {/* IMAGE PREVIEW MODAL */}
{selectedImage && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    onClick={() => setSelectedImage(null)}
  >
    <div className="relative max-w-5xl w-full">
      <img
        src={selectedImage}
        className="w-full max-h-[80vh] object-contain rounded-xl"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full shadow"
      >
        ✕
      </button>
    </div>
  </div>
)}
    </AdminLayout>
  );
}