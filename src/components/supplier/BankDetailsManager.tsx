import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

const BankDetailsManager = ({
  bankDetails,
  setBankDetails,
}: Props) => {

  const updateField = (index: number, key: keyof BankDetails, value: any) => {
  setBankDetails(prev =>
    prev.map((b, i) => (i === index ? { ...b, [key]: value } : b))
  );
};

const addBank = () => {
  setBankDetails(prev => [
    ...prev,
    {
      account_holder: "",
      bank_name: "",
      account_number: "",
      ifsc: "",
      branch: "",
      cancelled_cheque: null,
    },
  ]);
};

const removeBank = (index: number) => {
  setBankDetails(prev => prev.filter((_, i) => i !== index));
};
  return (
    <div className="space-y-12">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">
          Bank Details
        </h2>
        <p className="text-muted-foreground mt-2">
          Provide payout bank details for settlements.
        </p>
      </div>

     {bankDetails.map((bank, index) => (
  <div key={index} className="border p-6 rounded-xl space-y-6">

    <h3 className="font-semibold">Bank {index + 1}</h3>

    <div className="grid md:grid-cols-3 gap-6">

      <Input
        value={bank.account_holder}
        onChange={(e) =>
          updateField(index, "account_holder", e.target.value)
        }
        placeholder="Account Holder"
      />

      <Input
        value={bank.bank_name}
        onChange={(e) =>
          updateField(index, "bank_name", e.target.value)
        }
        placeholder="Bank Name"
      />

      <Input
        value={bank.account_number}
        onChange={(e) =>
          updateField(index, "account_number", e.target.value)
        }
        placeholder="Account Number"
      />

      <Input
        value={bank.ifsc}
        onChange={(e) =>
          updateField(index, "ifsc", e.target.value)
        }
        placeholder="IFSC"
      />

      <Input
        value={bank.branch}
        onChange={(e) =>
          updateField(index, "branch", e.target.value)
        }
        placeholder="Branch"
      />

      <Input
        type="file"
        onChange={(e: any) =>
          updateField(index, "cancelled_cheque", e.target.files?.[0])
        }
      />

    </div>

    {index > 0 && (
      <Button variant="destructive" onClick={() => removeBank(index)}>
        Remove
      </Button>
    )}

  </div>
))}

<Button onClick={addBank}>+ Add Another Bank</Button>
    </div>
  );
};

export default BankDetailsManager;