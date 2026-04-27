import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

type FAQ = {
  question: string;
  answer: string;
};

type Props = {
  faqs: FAQ[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQ[]>>;
};

const QAManager = ({ faqs, setFaqs }: Props) => {

  const addFAQ = () => {
    setFaqs(prev => [...prev, { question: "", answer: "" }]);
  };

  const removeFAQ = (index: number) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
  };

  const updateFAQ = (index: number, key: keyof FAQ, value: string) => {
    setFaqs(prev =>
      prev.map((faq, i) =>
        i === index ? { ...faq, [key]: value } : faq
      )
    );
  };
useEffect(() => {
  if (faqs.length === 0) {
    setFaqs([{ question: "", answer: "" }]);
  }
}, []);
  return (
    <div className="bg-[#f4f4f4]">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <div className="bg-[#0c2d67] text-white text-center py-1 px-6 rounded-md font-semibold w-full">
          Question and Answers
        </div>
      </div>

      {/* FAQ LIST */}
      <div className="space-y-2">

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden border border-[#0c2d67] relative"
          >

            {/* DELETE BUTTON */}
            <button
              onClick={() => removeFAQ(index)}
              className="absolute top-1 right-2 bg-[#FF0000] text-white p-1 rounded"
            >
              <Trash2 size={14} />
            </button>

            {/* QUESTION */}
            <div className="bg-[#0c2d67] text-white p-2">
              <label className="block text-sm">Question</label>

              <Input
                placeholder="Enter question"
                value={faq.question}
                onChange={(e) =>
                  updateFAQ(index, "question", e.target.value)
                }
                className="bg-[#FFDADA] text-black border-none"
              />
            </div>

            {/* ANSWER */}
            <div className="bg-[#0c2d67] p-2">
              <label className="block text-sm text-white">
                Answer
              </label>

              <Textarea
                placeholder="Enter Answer"
                value={faq.answer}
                onChange={(e) =>
                  updateFAQ(index, "answer", e.target.value)
                }
                className="bg-[#FFDADA] text-black border-none min-h-[30px]"
              />
            </div>

          </div>
        ))}

      </div>
{/* ADD BUTTON (BOTTOM) */}
<div className="flex justify-end mt-4">
  <Button
    onClick={addFAQ}
    className="bg-[#0c2d67] text-white px-6"
  >
    <Plus className="w-4 h-4 mr-1" />
    Add
  </Button>
</div>
      {/* BUTTONS */}
      {/* <div className="flex justify-end gap-4 mt-8">

        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 font-semibold">
          BACK
        </button>

        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 font-semibold">
          SAVE
        </button>

      </div> */}

    </div>
  );
};

export default QAManager;