import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

type Rule = {
  from_days: number;
  to_days: number;
  charge_type: "percentage" | "fixed";
  charge_value: number;
};

type Props = {
  rules: Rule[];
  setRules: React.Dispatch<React.SetStateAction<Rule[]>>;
};

const CancellationPoliciesManager = ({ rules, setRules }: Props) => {

  const addRule = () => {
    setRules(prev => [
      ...prev,
      {
        from_days: 0,
        to_days: 0,
        charge_type: "percentage",
        charge_value: 0,
      }
    ]);
  };

  const removeRule = (index: number) => {
    setRules(prev => prev.filter((_, i) => i !== index));
  };

  const updateRule = (
    index: number,
    key: keyof Rule,
    value: any
  ) => {
    setRules(prev =>
      prev.map((rule, i) =>
        i === index ? { ...rule, [key]: value } : rule
      )
    );
  };

  // ✅ AUTO ADD FIRST ROW
  useEffect(() => {
    if (rules.length === 0) {
      addRule();
    }
  }, []);

  return (
    <div className="space-y-12">

      <div>
        <h2 className="text-3xl font-bold">
          Cancellation Policy Rules
        </h2>
      </div>

      {rules.map((rule, index) => (
        <div key={index} className="border rounded-2xl p-8 space-y-6">

          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">
              Rule {index + 1}
            </h3>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeRule(index)}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <Input
              type="number"
              value={rule.from_days}
              onChange={(e) =>
                updateRule(index, "from_days", Number(e.target.value))
              }
            />

            <Input
              type="number"
              value={rule.to_days}
              onChange={(e) =>
                updateRule(index, "to_days", Number(e.target.value))
              }
            />

            <select
              value={rule.charge_type}
              onChange={(e) =>
                updateRule(index, "charge_type", e.target.value)
              }
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>

            <Input
              type="number"
              value={rule.charge_value}
              onChange={(e) =>
                updateRule(index, "charge_value", Number(e.target.value))
              }
            />

          </div>

        </div>
      ))}

      <Button onClick={addRule}>
        <Plus className="w-4 h-4 mr-2" />
        Add Rule
      </Button>

    </div>
  );
};

export default CancellationPoliciesManager;