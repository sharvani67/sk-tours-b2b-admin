import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { API_URL } from "@/config/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import PropertyDetails from "@/components/supplier/PropertyDetails";
import StaffManager from "@/components/supplier/StaffManager";
import PricingManager from "@/components/supplier/PricingManager";
import MediaManager from "@/components/supplier/MediaManager";
import AmenitiesManager from "@/components/supplier/AmenitiesManager";
import SightSeeingManager from "@/components/supplier/SightSeeingManager";
import QAManager from "@/components/supplier/QAManager";
import BookingPoliciesManager from "@/components/supplier/BookingPoliciesManager";
import CancellationPoliciesManager from "@/components/supplier/CancellationPoliciesManager";
import CheckinManager from "@/components/supplier/CheckinManager";
import BankDetailsManager from "@/components/supplier/BankDetailsManager";

import {
  Building2,
  Users,
  IndianRupee,
  Image,
  Sparkles,
  Map,
  HelpCircle,
  FileText,
  Ban,
  Clock,
  Landmark
} from "lucide-react";

/* ===================== TABS ===================== */

const TABS = [
  { label: "Property Details", icon: Building2 },
  { label: "Staff Details", icon: Users },
  { label: "Price", icon: IndianRupee },
  { label: "Photos & Videos", icon: Image },
  { label: "Amenities", icon: Sparkles },
  { label: "Sight Seeing", icon: Map },
  { label: "Q & A", icon: HelpCircle },
  { label: "Booking Policies", icon: FileText },
  { label: "Cancellation Policies", icon: Ban },
  { label: "Check In / Check Out", icon: Clock },
  { label: "Bank Details", icon: Landmark },
];

export default function AdminAddProperty() {

  const navigate = useNavigate();
 const { supplierId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  /* ================= BASIC DETAILS ================= */

  const [form, setForm] = useState({
    name: "",
    category: "",
    city: "",
    area: "",
    pincode: "",
    address: "",
    landmark: "",
    contact: "",
    email: "",
    total_rooms: "",
    hotel_remarks: ""
  });

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  /* ================= STATES ================= */

  const [rooms, setRooms] = useState<any[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [coverIndex, setCoverIndex] = useState<number | null>(null);

  const [staff, setStaff] = useState<any[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [sightseeing, setSightSeeing] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any>({});
  const [cancellationRules, setCancellationRules] = useState<any[]>([]);
  const [checkinData, setCheckinData] = useState<any>({});

  const [certificate, setCertificate] = useState<File | null>(null);

  const [bankDetails, setBankDetails] = useState<any>({
    account_holder: "",
    bank_name: "",
    account_number: "",
    ifsc: "",
    branch: "",
    cancelled_cheque: null,
  });

  /* ================= NAVIGATION ================= */

  const nextTab = () => {
    if (activeTab < TABS.length - 1) {
      setActiveTab(prev => prev + 1);
    }
  };

  const prevTab = () => {
    if (activeTab > 0) {
      setActiveTab(prev => prev - 1);
    }
  };

  /* ================= SUBMIT ================= */

  const submitProperty = async () => {

    setSubmitting(true);

    try {

    
      if (!supplierId) {
        toast.error("Please login again");
        return;
      }

      const formData = new FormData();

      Object.entries(form).forEach(([k, v]) =>
        formData.append(k, v as string)
      );

      formData.append("supplier_id", String(supplierId));
      formData.append("rooms", JSON.stringify(rooms));
      formData.append("staff", JSON.stringify(staff));
      formData.append("amenities", JSON.stringify(amenities));
      formData.append("coverIndex", String(coverIndex ?? 0));
      formData.append("sightseeing", JSON.stringify(sightseeing));
      formData.append("faqs", JSON.stringify(faqs));
      formData.append("policies", JSON.stringify(policies));
      formData.append("cancellation_rules", JSON.stringify(cancellationRules));
      formData.append("checkin_data", JSON.stringify(checkinData));

      if (certificate) formData.append("certificate", certificate);

      images.forEach(img => formData.append("images", img));
      videos.forEach(v => formData.append("videos", v));

      staff.forEach(member => {
        if (member.photo) formData.append("staffPhotos", member.photo);
      });

      formData.append(
        "bank_details",
        JSON.stringify({
          account_holder: bankDetails.account_holder,
          bank_name: bankDetails.bank_name,
          account_number: bankDetails.account_number,
          ifsc: bankDetails.ifsc,
          branch: bankDetails.branch,
        })
      );

      if (bankDetails.cancelled_cheque) {
        formData.append("cancelledCheque", bankDetails.cancelled_cheque);
      }

      const res = await fetch(
        `${API_URL}/api/properties/add-property`,
        { method: "POST", body: formData }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create property");
        return;
      }

      toast.success("Property created successfully 🎉");

      setTimeout(() => {
        navigate("/admin/properties");
      }, 1200);

    } catch (err) {
      toast.error("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  /* ================= UI ================= */

  return (
    <AdminLayout>

      <div className="space-y-6">

        {/* PAGE HEADER */}

        <div>
          <h1 className="text-2xl font-bold">Add Property</h1>
          <p className="text-muted-foreground">
            Create a new hotel / resort property
          </p>
        </div>

        {/* CARD */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          {/* TABS */}

          <div className="relative mb-10">

            <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded"></div>

            <div
              className="absolute top-5 left-0 h-1 bg-[#bd9828] rounded transition-all duration-500"
              style={{
                width: `${(activeTab / (TABS.length - 1)) * 100}%`
              }}
            />

            <div className="flex justify-between items-start mx-2">

              {TABS.map((tab, index) => {
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(index)}
                    className="flex flex-col items-center relative z-10 group"
                  >

                    <div
                      className={`w-11 h-11 flex items-center justify-center rounded-2xl border
                      ${activeTab >= index
                          ? "bg-[#bd9828] text-white border-[#bd9828]"
                          : "bg-gray-200"}
                    `}
                    >
                      <Icon size={18} />
                    </div>

                    <span
                      className={`text-xs mt-2 text-center font-medium
                      ${activeTab === index ? "text-[#bd9828]" : ""}
                    `}
                    >
                      {tab.label}
                    </span>

                  </button>
                );
              })}
            </div>

          </div>

          {/* TAB CONTENT */}

          {activeTab === 0 && (
            <PropertyDetails
              form={form}
              handleChange={handleChange}
              setCertificate={setCertificate}
            />
          )}

          {activeTab === 1 && (
            <StaffManager staff={staff} setStaff={setStaff} />
          )}

          {activeTab === 2 && (
            <PricingManager
              rooms={rooms}
              setRooms={setRooms}
              onNext={() => setActiveTab(3)}
            />
          )}

          {activeTab === 3 && (
            <MediaManager
              images={images}
              setImages={setImages}
              coverIndex={coverIndex}
              setCoverIndex={setCoverIndex}
              videos={videos}
              setVideos={setVideos}
            />
          )}

          {activeTab === 4 && (
            <AmenitiesManager
              amenities={amenities}
              setAmenities={setAmenities}
            />
          )}

          {activeTab === 5 && (
            <SightSeeingManager
              sightseeing={sightseeing}
              setSightSeeing={setSightSeeing}
            />
          )}

          {activeTab === 6 && (
            <QAManager faqs={faqs} setFaqs={setFaqs} />
          )}

          {activeTab === 7 && (
            <BookingPoliciesManager
              policies={policies}
              setPolicies={setPolicies}
            />
          )}

          {activeTab === 8 && (
            <CancellationPoliciesManager
              rules={cancellationRules}
              setRules={setCancellationRules}
            />
          )}

          {activeTab === 9 && (
            <CheckinManager
              checkinData={checkinData}
              setCheckinData={setCheckinData}
            />
          )}

          {activeTab === 10 && (
            <BankDetailsManager
              bankDetails={bankDetails}
              setBankDetails={setBankDetails}
            />
          )}

          {/* BUTTONS */}

          <div className="mt-10 flex justify-between">

            {activeTab > 0 && (
              <Button onClick={prevTab}>
                ← Previous
              </Button>
            )}

            {activeTab < TABS.length - 1 ? (
              <Button onClick={nextTab}>
                Save & Continue →
              </Button>
            ) : (
              <Button
                onClick={submitProperty}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Property"}
              </Button>
            )}

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}