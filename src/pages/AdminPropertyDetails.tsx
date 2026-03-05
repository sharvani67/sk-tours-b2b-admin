import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/config/api";
import { Button } from "@/components/ui/button";

export default function AdminPropertyDetails() {
const [activeTab, setActiveTab] = useState("overview");
const navigate = useNavigate();
const tabs = [
  { key: "overview", label: "Overview" },
  { key: "rooms", label: "Rooms & Pricing" },
  { key: "amenities", label: "Amenities" },
  { key: "staff", label: "Staff" },
  { key: "nearby", label: "Sight Seeing" },
  { key: "policies", label: "Policies" },
  { key: "media", label: "Media" },
  { key: "financial", label: "Bank & Check-in" },
];
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fetchProperty = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/property/${id}/full`);
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
        <div className="max-w-4xl mx-auto mb-4">
    <Button
      variant="outline"
      onClick={() => navigate(-1)}
      className="mb-2"
    >
      ← Back
    </Button>
  </div>
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
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

  {/* LEFT SIDE INFO */}
  <div className="flex flex-wrap items-center gap-8">

    {/* Status Section */}
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">Status</p>

      <div className="flex items-center gap-3">
        <Badge
          className={
            property.status === "Approved"
              ? "bg-green-100 text-green-600"
              : property.status === "Rejected"
              ? "bg-red-100 text-red-600"
              : property.status === "Deleted"
              ? "bg-red-200 text-red-700 border border-red-400"
              : property.status === "Inactive"
              ? "bg-gray-200 text-gray-700"
              : "bg-yellow-100 text-yellow-600"
          }
        >
          {property.status}
        </Badge>

        
      </div>
    </div>

    {/* Category */}
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">Category</p>
      <Badge className="bg-blue-100 text-blue-600">
        {property.category}
      </Badge>
    </div>

    {/* City */}
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">City</p>
      <p className="font-semibold">{property.city}</p>
    </div>

  </div>

  {/* RIGHT SIDE ACTION BUTTONS */}
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
{/* Restore Button Inline */}
        {property.status === "Deleted" && (
          <Button
            size="sm"
            onClick={() => updateStatus("Approved")}
            className="bg-green-600 hover:bg-green-700"
          >
            Restore Property
          </Button>
        )}
</div>

</Card>
        <div className="flex flex-wrap gap-3 mt-6">
  {tabs.map(tab => (
    <button
      key={tab.key}
      onClick={() => setActiveTab(tab.key)}
      className={`px-5 py-2 rounded-full text-sm font-medium transition
        ${activeTab === tab.key
          ? "bg-primary text-white shadow"
          : "bg-muted hover:bg-muted/70"}
      `}
    >
      {tab.label}
    </button>
  ))}
</div>


{/* ================= OVERVIEW ================= */}
{activeTab === "overview" && (
  <Card className="p-8 rounded-2xl shadow-sm border bg-white">
    
    {/* Header */}
    <div className="mb-6 border-b pb-4">
      <h2 className="text-xl font-semibold tracking-tight">
        Property Overview
      </h2>
      <p className="text-sm text-muted-foreground">
        Complete property information and registration details
      </p>
    </div>

    {/* Details Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">

      <div>
        <p className="text-sm text-muted-foreground">Property Name</p>
        <p className="font-medium">{property.name}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Category</p>
        <p className="font-medium">{property.category}</p>
      </div>

       <div>
        <p className="text-sm text-muted-foreground">Total Rooms:</p>
        <p className="font-medium">{property.total_rooms}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">City</p>
        <p className="font-medium">{property.city}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Area</p>
        <p className="font-medium">{property.area}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Pincode</p>
        <p className="font-medium">{property.pincode}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Contact</p>
        <p className="font-medium">{property.contact}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Email</p>
        <p className="font-medium">{property.email}</p>
      </div>

      <div className="md:col-span-2">
        <p className="text-sm text-muted-foreground">Address</p>
        <p className="font-medium">{property.address}</p>
      </div>

    </div>

    {/* Registration Certificate */}
    {property.registration_certificate && (
      <div className="mt-8 border-t pt-6">
        <p className="text-sm font-semibold mb-3">
          Registration Certificate
        </p>

        <a
          href={`${API_URL}/uploads/${property.registration_certificate}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-muted hover:bg-muted/70 transition text-sm font-medium"
        >
          View Certificate
        </a>
      </div>
    )}
  </Card>
)}

{/* ================= ROOMS ================= */}
{activeTab === "rooms" && rooms.map(room => {

  const roomRates = rates.filter(r => r.room_id === room.id);
  const plans = ["EP", "CP", "MAP", "AP"];

  return (
    <Card key={room.id} className="p-6 space-y-4">
      <h3 className="font-bold text-lg">{room.type}</h3>
      <p>Max Adults: {room.max_adults} | Max Children: {room.max_children}</p>

      {plans.map(plan => {
        const planRates = roomRates.filter(r => r.plan === plan);
        if (!planRates.length) return null;

        return (
          <div key={plan} className="border rounded-lg p-4">
            <h4 className="font-semibold mb-3">{plan} Plan</h4>

            {planRates.map(rate => (
              <div key={rate.id} className="text-sm mb-2">
                <p><b>{rate.rate_type}</b> — ₹{rate.base_price}</p>
                <p className="text-muted-foreground">
                  Extra Adult: ₹{rate.extra_adult_price}
                </p>
                <p className="text-muted-foreground">
                  Child w/ Bed: ₹{rate.child_with_bed_price}
                </p>
                <p className="text-muted-foreground">
                  Child w/o Bed: ₹{rate.child_without_bed_price}
                </p>
              </div>
            ))}
          </div>
        );
      })}
    </Card>
  );
})}

{/* ================= AMENITIES ================= */}
{activeTab === "amenities" && (
  <Card className="p-6">
    <div className="flex flex-wrap gap-3">
      {data.amenities.map(a => (
        <Badge key={a.id}>{a.amenity_name}</Badge>
      ))}
    </div>
  </Card>
)}

{/* ================= STAFF ================= */}
{activeTab === "staff" && (
  <Card className="p-6 grid md:grid-cols-3 gap-6">
    {data.staff.map(s => (
      <div key={s.id} className="border rounded-xl p-4">
        {s.photo && (
          <img
            src={`${API_URL}/uploads/${s.photo}`}
            className="h-40 w-full object-cover rounded-lg mb-3"
          />
        )}
        <p className="font-semibold">{s.name}</p>
        <p className="text-sm text-muted-foreground">{s.designation}</p>
        <p className="text-sm">{s.phones}</p>
      </div>
    ))}
  </Card>
)}

{/* ================= SIGHT SEEING ================= */}
{activeTab === "nearby" && (
  <Card className="p-6 space-y-4">
    {data.sightseeing.map(place => (
      <div key={place.id} className="border rounded-xl p-4">
        <p className="font-semibold">{place.place_name}</p>
        <p className="text-sm text-muted-foreground">
          {place.distance_km} km • {place.travel_time}
        </p>
        <p className="text-sm">{place.description}</p>
      </div>
    ))}
  </Card>
)}

{/* ================= POLICIES ================= */}
{activeTab === "policies" && (
  <Card className="p-6 space-y-6">

    <div>
      <h4 className="font-semibold mb-2">Booking Policy</h4>
      <ul className="list-disc pl-6 text-sm space-y-1">
        {policies.booking_policy?.split("\n").map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    <div>
      <h4 className="font-semibold mb-2">Cancellation Policy</h4>
      <ul className="list-disc pl-6 text-sm space-y-1">
        {policies.cancellation_policy?.split("\n").map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    <div>
      <h4 className="font-semibold mb-2">Terms</h4>
      <ul className="list-disc pl-6 text-sm space-y-1">
        {policies.terms?.split("\n").map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

  </Card>
)}

{/* ================= MEDIA ================= */}
{activeTab === "media" && (
  <Card className="p-6 space-y-6">

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map(img => (
        <img
          key={img.id}
          src={`${API_URL}/uploads/${img.image_path}`}
          onClick={() =>
            setSelectedImage(`${API_URL}/uploads/${img.image_path}`)
          }
          className="rounded-xl h-36 w-full object-cover cursor-pointer"
        />
      ))}
    </div>

    {data.videos?.length > 0 && (
      <div className="grid md:grid-cols-2 gap-6">
        {data.videos.map(v => (
          <video key={v.id} controls className="rounded-xl">
            <source src={`${API_URL}/uploads/${v.video_path}`} />
          </video>
        ))}
      </div>
    )}

  </Card>
)}

{/* ================= FINANCIAL ================= */}
{activeTab === "financial" && (
  <Card className="p-6 space-y-6">

    <div>
      <h4 className="font-semibold mb-3">Check-in Details</h4>
      <p>Check-in: {data.checkin?.check_in_time}</p>
      <p>Check-out: {data.checkin?.check_out_time}</p>
      <p>24Hr Check-in: {data.checkin?.is_24hr_checkin ? "Yes" : "No"}</p>
    </div>

    <div>
      <h4 className="font-semibold mb-3">Bank Details</h4>
      <p>Account Holder: {data.bank?.account_holder}</p>
      <p>Bank Name: {data.bank?.bank_name}</p>
      <p>Account Number: {data.bank?.account_number}</p>
      <p>IFSC: {data.bank?.ifsc}</p>
      <p>Branch: {data.bank?.branch}</p>
    </div>

  </Card>
)}

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