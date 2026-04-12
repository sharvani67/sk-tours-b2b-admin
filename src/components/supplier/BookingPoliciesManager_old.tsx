import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Policies = {
  booking_policy: string;
  cancellation_policy: string;
  child_policy: string;
  pet_policy: string;
  terms: string;
};

type Props = {
  policies: Policies;
  setPolicies: React.Dispatch<React.SetStateAction<Policies>>;
  onNext?: () => void;
};

const BookingPoliciesManager = ({
  policies,
  setPolicies,
  onNext,
}: Props) => {
  const updateField = (key: keyof Policies, value: any) => {
    setPolicies(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-12">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">
          Booking & Cancellation Policies
        </h2>
        <p className="text-muted-foreground mt-2">
          Define clear property rules to avoid guest disputes.
        </p>
      </div>

<div className="grid md:grid-cols-2 gap-6">

  {/* BOOKING POLICY */}
  <div className="space-y-1">
    <label className="font-semibold text-sm">
      Booking Policy *
    </label>
    <Textarea
      className="min-h-[90px]"
      placeholder="Advance payment required..."
      value={policies.booking_policy}
      onChange={(e) =>
        updateField("booking_policy", e.target.value)
      }
    />
  </div>

  {/* CANCELLATION POLICY */}
  <div className="space-y-1">
    <label className="font-semibold text-sm">
      Cancellation Policy *
    </label>
    <Textarea
      className="min-h-[90px]"
      placeholder="Free cancellation before 48 hours..."
      value={policies.cancellation_policy}
      onChange={(e) =>
        updateField("cancellation_policy", e.target.value)
      }
    />
  </div>

  {/* CHILD POLICY */}
  <div className="space-y-1">
    <label className="font-semibold text-sm">
      Child Policy
    </label>
    <Textarea
      className="min-h-[80px]"
      placeholder="Children below 5 stay free..."
      value={policies.child_policy}
      onChange={(e) =>
        updateField("child_policy", e.target.value)
      }
    />
  </div>

  {/* PET POLICY */}
  <div className="space-y-1">
    <label className="font-semibold text-sm">
      Pet Policy
    </label>
    <Textarea
      className="min-h-[80px]"
      placeholder="Pets allowed / not allowed"
      value={policies.pet_policy}
      onChange={(e) =>
        updateField("pet_policy", e.target.value)
      }
    />
  </div>

  {/* TERMS */}
  <div className="space-y-1 md:col-span-2">
    <label className="font-semibold text-sm">
      Terms & Conditions *
    </label>
    <Textarea
      className="min-h-[90px]"
      placeholder="General property rules..."
      value={policies.terms}
      onChange={(e) =>
        updateField("terms", e.target.value)
      }
    />
  </div>

</div>

      {onNext && (
        <Button
          onClick={onNext}
          className="w-full h-12 text-lg"
        >
          Save & Continue →
        </Button>
      )}
    </div>
  );
};

export default BookingPoliciesManager;