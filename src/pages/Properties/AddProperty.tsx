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
const [showCancelPopup, setShowCancelPopup] = useState(false);
const [propertyDraftId, setPropertyDraftId] = useState<number | null>(null);
  /* ================= BASIC DETAILS ================= */

  const [form, setForm] = useState({
    name: "",
    category: "",
    state: "",
    city: "",
    area: "",
    pincode: "",
    address: "",
    landmark: "",
    contacts: [""],
    emails: [""],
    total_rooms: "",
    hotel_remarks: ""
  });

const attachMealsToRooms = (rooms: any[], meals: any[]) => {
  return rooms.map(room => ({
    ...room,
    meals: meals
      .filter(m => m.room_id === room.id)
      .map(m => ({
        name: m.meal_name,
        price: String(m.price),
        available: m.is_available === 1
      }))
  }));
};
  useEffect(() => {

    if (supplierId) {
      loadDraft();
    }

  }, [supplierId]);
  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleBack = () => {
  setShowCancelPopup(true);
};

const confirmCancel = () => {
  navigate("/users");
};

const closePopup = () => {
  setShowCancelPopup(false);
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

   type BankDetails = {
  account_holder: string;
  bank_name: string;
  account_number: string;
  ifsc: string;
  branch: string;
  cancelled_cheque: File | null;
};

 const [bankDetails, setBankDetails] = useState<BankDetails[]>([
  {
    account_holder: "",
    bank_name: "",
    account_number: "",
    ifsc: "",
    branch: "",
    cancelled_cheque: null,
  },
]);

const loadDraft = async () => {

  try {

    const res = await fetch(`${API_URL}/api/properties/get-draft/${supplierId}`);
    const data = await res.json();
    const updatedRooms = attachMealsToRooms(data.rooms, data.meals || []);

    if (!data) return;

    setPropertyDraftId(data.id);

    setForm(data.form ? JSON.parse(data.form) : form);
    setRooms(updatedRooms);
    setStaff(data.staff ? JSON.parse(data.staff) : []);
    setAmenities(data.amenities ? JSON.parse(data.amenities) : []);
    setSightSeeing(data.sightseeing ? JSON.parse(data.sightseeing) : []);
    setFaqs(data.faqs ? JSON.parse(data.faqs) : []);
    setPolicies(data.policies ? JSON.parse(data.policies) : {});
    setCancellationRules(data.cancellation_rules ? JSON.parse(data.cancellation_rules) : []);
    setCheckinData(data.checkin_data ? JSON.parse(data.checkin_data) : {});
    setBankDetails(data.bank_details ? JSON.parse(data.bank_details) : {});

  } catch (err) {

    console.error("Draft load error:", err);

  }

};

  /* ================= NAVIGATION ================= */
const saveAndContinue = async () => {

  await saveDraft();

  if (activeTab < TABS.length - 1) {
    setActiveTab(prev => prev + 1);
  }

};
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


const saveDraft = async () => {

  try {

    const formData = new FormData();

    formData.append("form", JSON.stringify(form));
    formData.append("supplier_id", String(supplierId));
    formData.append("rooms", JSON.stringify(rooms));
    formData.append("staff", JSON.stringify(staff));
    formData.append("amenities", JSON.stringify(amenities));
    formData.append("sightseeing", JSON.stringify(sightseeing));
    formData.append("faqs", JSON.stringify(faqs));
    formData.append("policies", JSON.stringify(policies));
    formData.append("cancellation_rules", JSON.stringify(cancellationRules));
    formData.append("checkin_data", JSON.stringify(checkinData));
    formData.append("bank_details", JSON.stringify(bankDetails));

    formData.append("contacts", JSON.stringify(form.contacts));
    formData.append("emails", JSON.stringify(form.emails));

    if (propertyDraftId) {
      formData.append("property_id", String(propertyDraftId));
    }

    const res = await fetch(`${API_URL}/api/properties/save-draft`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    setPropertyDraftId(data.propertyId);

    toast.success("Draft saved");

  } catch (err) {
    toast.error("Draft save failed");
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
      formData.append("contacts", JSON.stringify(form.contacts));
      formData.append("emails", JSON.stringify(form.emails));
      if (certificate) formData.append("certificate", certificate);

      images.forEach(img => formData.append("images", img));
      videos.forEach(v => formData.append("videos", v));

      staff.forEach(member => {
        if (member.photo) formData.append("staffPhotos", member.photo);
      });

    formData.append("bank_details", JSON.stringify(bankDetails));

     bankDetails.forEach((bank) => {
  if (bank.cancelled_cheque) {
    formData.append("cancelledCheque", bank.cancelled_cheque);
  }
});
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
        navigate("/properties");
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

useEffect(() => {

  const fetchSupplier = async () => {

    const res = await fetch(`${API_URL}/api/admin/supplier/${supplierId}`);
    const data = await res.json();

    setForm(prev => ({
      ...prev,
      name: data.company_name
    }));

  };

  if (supplierId) fetchSupplier();

}, [supplierId]);
  /* ================= UI ================= */

  return (
    <AdminLayout>

      <div className="space-y-6">

        {/* PAGE HEADER */}

        <div className="flex items-center justify-between">
  <div>
    <h1 className="text-2xl font-bold">Add Property</h1>
    <p className="text-muted-foreground">
      Create a new hotel / resort property
    </p>
  </div>

  <Button
    variant="outline"
    onClick={handleBack}
  >
    ← Back
  </Button>
</div>

{showCancelPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

    <div className="bg-white rounded-2xl shadow-xl p-6 w-[380px]">

      <h2 className="text-lg font-semibold mb-2">
        Cancel Property Entry
      </h2>

      <p className="text-sm text-muted-foreground mb-6">
        Do you want to cancel this entry?  
        All unsaved data will be lost.
      </p>

      <div className="flex justify-end gap-3">

        <Button
          variant="outline"
          onClick={closePopup}
        >
          No
        </Button>

        <Button
          variant="destructive"
          onClick={confirmCancel}
        >
          Yes, Cancel
        </Button>

      </div>

    </div>

  </div>
)}

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
<div className="flex gap-3">
            {/* SAVE ONLY */}
            <Button
             
              onClick={saveDraft}
            >
              Save as Draft
            </Button>

            {/* SAVE AND CONTINUE */}
    {activeTab < TABS.length - 1 && (
      <Button onClick={saveAndContinue}>
        Save & Continue →
      </Button>
    )}
              {/* FINAL SUBMIT */}
    {activeTab === TABS.length - 1 && (
      <Button
        onClick={submitProperty}
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit All"}
      </Button>
    )}
</div>
          </div>

        </div>

      </div>

    </AdminLayout>
  );
}