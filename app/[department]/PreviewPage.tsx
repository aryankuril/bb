"use client";
import { useEffect, useState,  useCallback,useMemo ,useRef} from 'react';
import { useRouter } from "next/navigation";
// import CalculatorTestimonials from '../components/CalculatorTestimonials';
import Button from "../components/Button"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Mail, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";


type Dependency = {
  questionIndex: number;
  optionIndex: number;
};

type Option = {
  icon?: string;
  title: string;
  subtitle?: string;
  price: number | string; // allow string in API input!
};

type Question = {
  question: unknown;
  isDependent: boolean;
  dependentOn?: Dependency;
  type: string;
  questionText: string;
  questionIcon: string;
  questionSubText: string;
  options: Option[];
};

type CostItem = {
  type: string;
  label: string;
  value: string;
  price: number;
};

type CustomFieldInputType = "text" | "number" | "url";

type CustomField = {
  id: string;
  question?: string;
  label?: string;
  subtitle?: string;
  inputType: CustomFieldInputType;
  placeholder?: string;
  required: boolean;
  visibility:
    | { mode: "always" }
    | {
        mode: "conditional";
        questionIndex: number;
        optionIndex: number;
      };
};

type SubmittedCustomField = {
  id: string;
  label: string;
  inputType: CustomFieldInputType;
  value: string;
};

type WorkflowStep =
  | {
      kind: "question";
      question: Question;
      originalIndex: number;
    }
  | {
      kind: "custom";
      field: CustomField;
    };

type PreviewPageProps = {
  department: string;
  initialQuestions?: unknown[];
  initialCustomFields?: unknown[];
};

export default function PreviewPage({
  department,
  initialQuestions = [],
  initialCustomFields = [],
}: PreviewPageProps) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[] | null>(
    initialQuestions.length > 0 ? (initialQuestions as Question[]) : null
  );
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, Option | null>>({});
  const [visibleQuestions, setVisibleQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  // Ensure totals is always a number
  // const [totals, setTotals] = useState(0);
  const [costItems, setCostItems] = useState<CostItem[]>([]);

  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", phone: "", email: "", message: "" });
  const [toastMessage, setToastMessage] = useState("");
  // const [_showEmailInput, setShowEmailInput] = useState(false);
  // const [email, setEmail] = useState("");
  // const [_disableEmailBtn, setDisableEmailBtn] = useState(false);
  const [disableCallBtn, setDisableCallBtn] = useState(false);
  const [percent, setPercent] = useState(0);
  const [currentVisibleIdx, setCurrentVisibleIdx] = useState(0);
  const [showCallForm, setShowCallForm] = useState(false);

const firstSectionRef = useRef<HTMLDivElement | null>(null);
// const secondSectionRef = useRef<HTMLDivElement | null>(null);
const footerRef = useRef<HTMLDivElement | null>(null);

const [currentSection, setCurrentSection] = useState(0); 
// 0 = hero, 1 = second section, 2 = footer
// const [_isSending, setIsSending] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);


const [customFields, setCustomFields] = useState<CustomField[]>(
  initialCustomFields as CustomField[]
);
const [customFieldValues, setCustomFieldValues] = useState<Record<string, string>>({});
const [customFieldErrors, setCustomFieldErrors] = useState<Record<string, string>>({});
  const [includedItems] = useState([
    "Dedicated Project Manager", " Expert Team Collaboration", "Quality Assurance Guaranteed" 
  ]);

const rotatingTexts = [
  "Dedicated Project Manager",
  "Expert Team Collaboration",
  "Quality Guaranteed",
];

const [activeText, setActiveText] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActiveText(
      (prev) => (prev + 1) % rotatingTexts.length
    );
  }, 2500);

  return () => clearInterval(interval);
}, []);


useEffect(() => {
  // Only enable touch scroll on mobile
  if (typeof window === "undefined" || window.innerWidth > 1024) return;

  let touchStartY = 0;
  let touchEndY = 0;

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartY = e.touches[0].clientY;
      touchEndY = e.touches[0].clientY;
    }
  };
  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      touchEndY = e.touches[0].clientY;
    }
  };
  const handleTouchEnd = () => {
    // Swipe up
    if (touchStartY - touchEndY > 50) {
     setCurrentSection((prev) => globalThis.Math.min(prev + 1, 2));

    }
    // Swipe down
    else if (touchEndY - touchStartY > 50) {
      setCurrentSection((prev) => globalThis.Math.max(prev - 1, 0));

    }
    // Otherwise, do nothing (tap or micro scroll)
  };

  // Attach to the document (captures all swipes)
  document.addEventListener("touchstart", handleTouchStart, { passive: true });
  document.addEventListener("touchmove", handleTouchMove, { passive: true });
  document.addEventListener("touchend", handleTouchEnd, { passive: true });

  // Cleanup
  return () => {
    document.removeEventListener("touchstart", handleTouchStart);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };
}, []);

// useEffect(() => {
//   // Now this effect actually uses currentSection!
//   if (currentSection === 0) {
//     firstSectionRef.current?.scrollIntoView({ behavior: "smooth" });
//   } else if (currentSection === 1) {
//     secondSectionRef.current?.scrollIntoView({ behavior: "smooth" });
//   } else if (currentSection === 2) {
//     footerRef.current?.scrollIntoView({ behavior: "smooth" });
//   }
// }, [currentSection]);





  const totalEstimate = useMemo(() => {
    return Object.values(selectedOptions).reduce((sum, opt) => {
      if (!opt || (opt.price == null)) return sum;
      const price = typeof opt.price === "string" ? parseFloat(opt.price) : Number(opt.price);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
  }, [selectedOptions]);


  // A function to determine if a question should be displayed
const isQuestionVisible = useCallback(
  (question: Question, selected: Record<number, Option | null>): boolean => {
    // not dependent → always visible
    if (!question.isDependent || !Array.isArray(question.dependentOn) || question.dependentOn.length === 0) {
      return true;
    }

    // Group required option indices by questionIndex
    const groups: Record<number, Set<number>> = {};
    for (const dep of question.dependentOn) {
      if (!groups[dep.questionIndex]) groups[dep.questionIndex] = new Set();
      groups[dep.questionIndex].add(dep.optionIndex);
    }

    // For each required previous question (AND across different questionIndex)
    for (const qIdxStr of Object.keys(groups)) {
      const qIdx = Number(qIdxStr);
      const allowed = groups[qIdx];
      const answer = selected[qIdx];
      if (!answer) return false; // no answer for that previous question

      // find index of selected option in original questions array
      if (!questions || !questions[qIdx]) return false;
      const selectedOptIdx = questions[qIdx].options.findIndex(o => o.title === answer.title);
      if (selectedOptIdx === -1) return false;

      // this group is satisfied only if selected option is one of the allowed ones
      if (!allowed.has(selectedOptIdx)) return false;
    }

    return true; // all groups satisfied
  },
  [questions]
);

const isCalculatorComplete =
  visibleQuestions.length > 0 &&
  costItems.length === visibleQuestions.length &&
  totalEstimate > 0;



  // RECALCULATE VISIBLE QUESTIONS AND CURRENT INDEX
useEffect(() => {
  if (!questions) return;
  const visible = questions.filter(q => isQuestionVisible(q, selectedOptions));
  setVisibleQuestions(visible);
}, [questions, selectedOptions, isQuestionVisible]);

const isCustomFieldVisible = (field: CustomField) => {
  if (field.visibility.mode === "always") return true;

  const selected = selectedOptions[field.visibility.questionIndex];
  if (!selected || !questions?.[field.visibility.questionIndex]) return false;

  const selectedIndex = questions[field.visibility.questionIndex].options.findIndex(
    (opt) => opt.title === selected.title
  );

  return selectedIndex === field.visibility.optionIndex;
};

const visibleCustomFields = customFields.filter(isCustomFieldVisible);

const workflowSteps: WorkflowStep[] = questions
  ? [
      ...visibleQuestions.flatMap((question) => {
        const originalIndex = questions.findIndex(
          (q) => q.questionText === question.questionText
        );

        return [
          {
            kind: "question" as const,
            question,
            originalIndex,
          },
          ...visibleCustomFields
            .filter(
              (field) =>
                field.visibility.mode === "conditional" &&
                field.visibility.questionIndex === originalIndex
            )
            .map((field) => ({
              kind: "custom" as const,
              field,
            })),
        ];
      }),
      ...visibleCustomFields
        .filter((field) => field.visibility.mode === "always")
        .map((field) => ({
          kind: "custom" as const,
          field,
        })),
    ]
  : [];

const maxIdxRef = useRef(0);
maxIdxRef.current = workflowSteps.length - 1;

const currentWorkflowStep = workflowSteps[currentVisibleIdx];
const totalProgressPercentage =
  workflowSteps.length === 0
    ? 0
    : (workflowSteps.filter((step) =>
        step.kind === "question"
          ? Boolean(selectedOptions[step.originalIndex])
          : Boolean(customFieldValues[step.field.id]?.trim())
      ).length /
        workflowSteps.length) *
      100;

useEffect(() => {
  setCurrentVisibleIdx((prev) => {
    if (workflowSteps.length === 0) return 0;
    if (prev >= workflowSteps.length) return workflowSteps.length - 1;
    return prev;
  });
}, [workflowSteps.length]);




useEffect(() => {
  async function loadFromFirestore() {
    if (!department || initialQuestions.length > 0) return;

    try {
      const docRef = doc(db, "calculatorDepartments", department);
      const snap = await getDoc(docRef);

      if (!snap.exists()) {
        console.error("❌ No calculator found for:", department);
        setQuestions([]);
        return;
      }

      const data = snap.data();

      if (!data?.questions || !Array.isArray(data.questions)) {
        console.error("❌ Invalid questions format");
        setQuestions([]);
        return;
      }

      setQuestions(data.questions);
      setCustomFields(Array.isArray(data.customFields) ? data.customFields : []);
      setSelectedOptions({});
    } catch (err) {
      console.error("❌ Firestore fetch error:", err);
    }
  }

  loadFromFirestore();
}, [department, initialQuestions.length]);


  
const updateCostItems = useCallback(() => {
  if (!questions) return;

  const newCostItems = Object.entries(selectedOptions).map(([index, option]) => {
    // The keys in selectedOptions are strings, so we need to convert them to numbers
    const questionIndex = parseInt(index, 10);
    const question = questions[questionIndex];

    if (!question || !option) return null;

    return {
      type: question.type,
      question: question.question,
      label: question.questionText,
      value: option.title,
      price: typeof option.price === "string" ? parseFloat(option.price) : option.price,
    };
  }).filter(item => item !== null); // Filter out any null entries

  setCostItems(newCostItems as CostItem[]);
}, [selectedOptions, questions]);

useEffect(() => {
  updateCostItems();
}, [selectedOptions, updateCostItems]);
  // -------- Compute Progress & Totals ---------------
useEffect(() => {
  if (!questions) return;
  const total = workflowSteps.length;
  const answeredCount = workflowSteps.filter((step) =>
    step.kind === "question"
      ? Boolean(selectedOptions[step.originalIndex])
      : Boolean(customFieldValues[step.field.id]?.trim())
  ).length;

  setPercent(total === 0 ? 0 : Math.round((answeredCount / total) * 100));
}, [selectedOptions, customFieldValues, visibleQuestions, customFields, questions]);


useEffect(() => {
  const isCalculatorComplete =
    visibleQuestions.length > 0 &&
    costItems.length === visibleQuestions.length &&
    totalEstimate > 0;

  if (!isCalculatorComplete) return;

  if (
    typeof window !== "undefined" &&
    !localStorage.getItem("estimateId")
  ) {
    (async () => {
      try {
        const res = await fetch("/api/calculator", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceCalculator: department,
            finalPrice: totalEstimate,
            quote: costItems,
            total: totalEstimate,

            // 👇 IMPORTANT
            name: null,
            phone: null,
            email: null,
            message: null,
          }),
        });

        const data = await res.json();
        if (res.ok && data.estimateId) {
          localStorage.setItem("estimateId", data.estimateId);
        }
      } catch (error) {
        console.error("❌ Draft save error:", error);
      }
    })();
  }
}, [
  visibleQuestions.length,
  costItems.length,
  totalEstimate,
  department,
]);





  // --- RENDER LOGIC STARTS HERE ---
  // Early return statements should only come after all hooks have been called
  // ------- What to render now? -----------
if (!department || !questions || questions?.length === 0) return null;


if (visibleQuestions.length === 0)
  return (
    <div className="text-center text-lg mt-10 text-gray-400">
      No visible questions.
    </div>
  );


  const currentQuestion =
    currentWorkflowStep?.kind === "question" ? currentWorkflowStep.question : null;
  const currentCustomField =
    currentWorkflowStep?.kind === "custom" ? currentWorkflowStep.field : null;
  // The index in the original array for this question:
  const originalIndex =
    currentWorkflowStep?.kind === "question"
      ? currentWorkflowStep.originalIndex
      : -1;

  // -------- Option selection (always write by original index) ----------
const handleOptionSelect = (opt: Option) => {
  if (originalIndex < 0) return;

  const updated = { ...selectedOptions, [originalIndex]: opt };
  const newVisible = questions.filter(q => isQuestionVisible(q, updated));
  const visibleIndexes = newVisible.map(q => questions.findIndex(qq => qq.questionText === q.questionText));
  const cleaned: Record<number, Option | null> = {};
  visibleIndexes.forEach(idx => {
    if (updated[idx]) cleaned[idx] = updated[idx];
  });
  setSelectedOptions(cleaned);

  setTimeout(() => {
    setCurrentVisibleIdx((prev) => {
      if (prev >= maxIdxRef.current) {
        setCurrentStep(99);
        return prev;
      }
      return prev + 1;
    });
  }, 400);
};


const hasMultiLineSubtitle = currentQuestion?.options.some(opt => opt.subtitle && opt.subtitle.includes('|')) || false;

const getSubmittedCustomFields = (): SubmittedCustomField[] =>
  visibleCustomFields
    .map((field) => ({
      id: field.id,
      label: field.question || field.label || "Custom Field",
      inputType: field.inputType,
      value: (customFieldValues[field.id] || "").trim(),
    }))
    .filter((field) => field.value.length > 0);

const validateCustomStep = (field: CustomField) => {
  const value = (customFieldValues[field.id] || "").trim();
  const label = field.question || field.label || "This field";

  if (field.required && !value) {
    setCustomFieldErrors((prev) => ({
      ...prev,
      [field.id]: `${label} is required.`,
    }));
    return false;
  }

  if (value && field.inputType === "url") {
    try {
      new URL(value);
    } catch {
      setCustomFieldErrors((prev) => ({
        ...prev,
        [field.id]: "Please enter a valid URL.",
      }));
      return false;
    }
  }

  if (value && field.inputType === "number" && Number.isNaN(Number(value))) {
    setCustomFieldErrors((prev) => ({
      ...prev,
      [field.id]: "Please enter a valid number.",
    }));
    return false;
  }

  setCustomFieldErrors((prev) => ({
    ...prev,
    [field.id]: "",
  }));
  return true;
};


  const validate = () => {
    const tempErrors = { name: "", phone: "", email: "", message: "" };
    let isValid = true;
    if (!formData.name.trim()) { tempErrors.name = "Name is required."; isValid = false; }
    if (!formData.phone.trim()) {
  tempErrors.phone = "Phone number is required.";
  isValid = false;
} 
else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
  tempErrors.phone = "Please enter a valid phone number";
  isValid = false;
}

    if (!formData.email.trim()) { tempErrors.email = "Email is required."; isValid = false; } else if (!/\S+@\S+\.\S+/.test(formData.email)) { tempErrors.email = "Email is not valid."; isValid = false; }
    if (!formData.message.trim()) { tempErrors.message = "Message is required."; isValid = false; }
    const nextCustomErrors: Record<string, string> = {};

visibleCustomFields.forEach((field) => {
  const value = (customFieldValues[field.id] || "").trim();

  if (field.required && !value) {
    nextCustomErrors[field.id] = `${field.question || field.label || "This field"} is required.`;
    isValid = false;
    return;
  }

  if (value && field.inputType === "url") {
    try {
      new URL(value);
    } catch {
      nextCustomErrors[field.id] = "Please enter a valid URL.";
      isValid = false;
    }
  }

  if (value && field.inputType === "number" && Number.isNaN(Number(value))) {
    nextCustomErrors[field.id] = "Please enter a valid number.";
    isValid = false;
  }
});

setCustomFieldErrors(nextCustomErrors);
    
    setErrors(tempErrors);
    return isValid;
  };
  


const handleSubmit = async () => {
  if (!validate()) return;

  const { name, phone, email, message } = formData;
  const estimateId = typeof window !== "undefined" ? localStorage.getItem("estimateId") : null;

  setIsSubmitting(true);

  try {
    const res = await fetch("/api/calculator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email,
        message,
        serviceCalculator: department,
        finalPrice: totalEstimate,
        quote: costItems,
        total: totalEstimate,
        estimateId, // important: existing lead ID
        customFields: getSubmittedCustomFields(),
      }),
    });

    const data = await res.json();
if (res.ok) {
  console.log("✅ Form submitted:", formData);

  // Remove draft
  localStorage.removeItem("estimateId");

  // Reset form
  setFormData({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // Clear validation errors
  setErrors({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // Reset calculator state (optional)
  setSelectedOptions({});
  setCostItems([]);
  setCurrentVisibleIdx(0);
  setCurrentStep(0);
  setPercent(0);

  // Reset any custom fields if you have them
  setCustomFieldValues({});
  setCustomFieldErrors({});

  // Hide form
  setShowCallForm(false);
  setDisableCallBtn(false);

  // Redirect
  router.push("/thank-you");
} else {
      alert(`❌ Error: ${data.message}`);
    }
  } catch (err) {
    console.error("❌ Submission error:", err);
    alert("Something went wrong while submitting.");
  } finally {
    setIsSubmitting(false);
  }
};


const totalQuestions = workflowSteps.filter(
  (step) => step.kind === "question"
).length;

const currentQuestionNumber =
  workflowSteps
    .slice(0, currentVisibleIdx + 1)
    .filter((step) => step.kind === "question").length;

  return (

    <div ref={firstSectionRef}>
      {/* <Navbar/>
<Firstsection/> */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50 ">
    {toastMessage}
  </div>
)}
      <div
        className="w-full h-full relative bg-no-repeat bg-center bg-cover  lg:pt-5 pt-0 md:py-0 container "
      >
        <div 
        style={{ touchAction: "pan-y" /* allow vertical scroll gestures */ }}
         className=" mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 relative z-10 ">
          
 
                              
             <section 
               className="w-full flex flex-col lg:mt-8 pb-10 sm:pb-15 lg:pb-20">
       

         <div className="flex flex-col xl:flex-row lg:flex-col gap-6">
     

        {/* ... The rest of your component remains the same from the previous response ... */}
        {currentStep !== 99 ? (
          currentWorkflowStep?.kind === "custom" && currentCustomField ? (
            <div
              className="
                  flex flex-col lg:gap-6 gap-4
                  lg:mt-5  mt-5 
                  w-full
                  p-5 md:p-[30px_30px]
                  rounded-[20px]
                  border border-[#E8E4DD]
bg-[#FCFAF7]
shadow-[0_20px_60px_rgba(0,0,0,0.06)]
                  
                "
            >
              <div>
                <h5 className="lg:text-[24px] text-[20px] font-poppins font-[700] text-black">
                  {currentCustomField.question || currentCustomField.label}
                </h5>
                {currentCustomField.subtitle && (
                  <p className="text-[#797474] font-poppins text-[16px] font-[400]">
                    {currentCustomField.subtitle}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <input
                  type={
                    currentCustomField.inputType === "url"
                      ? "url"
                      : currentCustomField.inputType
                  }
                  value={customFieldValues[currentCustomField.id] || ""}
                  required={currentCustomField.required}
                  onChange={(e) =>
                    setCustomFieldValues((prev) => ({
                      ...prev,
                      [currentCustomField.id]: e.target.value,
                    }))
                  }
                  className={`px-3 py-3 border-b bg-transparent text-black placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-[#F9B31B] ${
                    customFieldErrors[currentCustomField.id]
                      ? "border-red-500"
                      : "border-[#F9B31B]"
                  }`}
                  placeholder={
                    currentCustomField.placeholder ||
                    currentCustomField.question ||
                    currentCustomField.label ||
                    ""
                  }
                />
                {customFieldErrors[currentCustomField.id] && (
                  <p className="text-red-500 text-sm mt-1">
                    {customFieldErrors[currentCustomField.id]}
                  </p>
                )}
              </div>

              <div className="w-full flex justify-between items-center gap-3">


                <button
                  onClick={() => {
                    if (!validateCustomStep(currentCustomField)) return;

                    if (currentVisibleIdx === workflowSteps.length - 1) {
                      setCurrentStep(99);
                    } else {
                      setCurrentVisibleIdx((prev) =>
                        Math.min(workflowSteps.length - 1, prev + 1)
                      );
                    }
                  }}
                  className="
        cursor-pointer
        w-[120px] sm:w-[130px] md:w-[150px]
        py-2 sm:py-3
        text-[14px] sm:text-[16px]
        flex items-center justify-center gap-2 rounded-[5px] font-medium
        transition-colors
        bg-[#F9B31B] text-black border shadow-[2px_2px_0px_0px_#000000]
      "
                >
                  {currentVisibleIdx === workflowSteps.length - 1
                    ? "See Estimate"
                    : "Next"}
                </button>


               
              </div>
            </div>
          ) : hasMultiLineSubtitle && currentQuestion ? (
            <div
            
              className="
              
                  flex flex-col lg:gap-6 gap-4
                  lg:mt-5  mt-5 
                  w-full
                   
                  p-5 md:p-[30px_30px]
                  rounded-[20px]
                  border border-[#E8E4DD]
bg-[#FCFAF7]
shadow-[0_20px_60px_rgba(0,0,0,0.06)]
                "
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                   <a className="lg:text-[24px] text-[15px] font-outfit font-[500] text-black">
                      {currentQuestion.questionText}
                    </a>
                    {currentQuestion.questionIcon?.startsWith("data:image") ? (
                      <img src={currentQuestion.questionIcon} alt="icon" className="w-6 h-6" />
                    ) : (
                      <span>{currentQuestion.questionIcon}</span>
                    )}
                   </div>
                  <p className="text-[#797474] font-poppins text-[16px] font-[400]">
                    {currentQuestion.questionSubText}
                  </p>
                </div>

               <div
  // ref={secondSectionRef}
  className="w-full max-h-7xl lg:mt-12 mt-8"
>
  <div className="flex justify-end">
    <span className="text-[#797474] font-miso text-[24px] italic font-light leading-none tracking-[0.2px]">
      {currentQuestionNumber}/{totalQuestions}
    </span>

  
                  <button
  onClick={() => {
    if (currentVisibleIdx > 0 && questions && visibleQuestions.length > 0) {
      const newSelectedOptions = { ...selectedOptions };
      const origIdx = questions.findIndex(
        (q) =>
          q.questionText === visibleQuestions[currentVisibleIdx].questionText
      );
      newSelectedOptions[origIdx] = null;
      setSelectedOptions(newSelectedOptions);
      setCurrentVisibleIdx((prev) => prev - 1);
    }
  }}
  disabled={currentVisibleIdx === 0}
  className={`
    flex items-center gap-2
    text-[16px]
    font-medium
    underline
    underline-offset-4
    transition-all
    ${
      currentVisibleIdx > 0
        ? "text-[#F9B31B] hover:opacity-80 cursor-pointer"
        : "text-gray-400 cursor-not-allowed no-underline"
    }
  `}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>

  <span>Previous</span>
</button>
  

  </div>

</div>


              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 lg:gap-10 gap-5">
            {currentQuestion.options.map((opt, i) => {
  const active = selectedOptions[originalIndex]?.title === opt.title;
  return (
    <button
      key={i}
      type="button"
      onClick={() => handleOptionSelect(opt)}
      className={`flex flex-col justify-between gap-2 rounded-[8px] border transition-colors px-4 py-4 text-left w-full lg:w-[280px] h-[180px] relative ${
        active
          ? "bg-[#F9B31B] border-[#1E1E1E] text-white shadow-[2px_2px_0px_0px_#1E1E1E]"
          : "bg-white border-[#1E1E1E] text-[#1E1E1E] hover:bg-[#FFE19F]"
      }`}
    >
      {/* This container ensures consistent spacing for the icon and title. */}
      <div className="flex flex-col items-center justify-center w-full relative">
        {/* This div *always* renders, reserving a fixed space for the icon. */}
        <div className="w-10 h-10 mb-2 flex items-center justify-center">
          {opt.icon && (
            opt.icon.startsWith("data:image") ? (
              <img src={opt.icon} alt="icon" className="w-full h-full object-contain" />
            ) : (
              <span>{opt.icon}</span>
            )
          )}
        </div>

        {/* This div wraps the title, allowing you to control its overflow. */}
        <div className="w-full text-center ">
          {/* We've added `truncate` to handle long titles. */}
           <span style={{ fontFamily: "Poppins, sans-serif" }} 
        className="font-poppins flex-1 text-[#111827] ml-2 text-[12px] lg:text-[16px] font-[500] leading-[1.2]">
        {opt.title}
      </span>
        </div>

        {Number(opt.price) > 0 && (
          <span
            className={`absolute top-0 right-0 border rotate-[18deg] text-black border-black px-2 py-0.5 text-xs font-semibold rounded-md`}
            style={{ borderRadius: "5px", border: "2px solid #000" }}
          >
            ₹{Number(opt.price).toLocaleString("en-IN")}
          </span>
        )}
      </div>

      {opt.subtitle && opt.subtitle.trim() !== '' ? (

  <ul className="flex flex-wrap md:text-[12px] lg:text-[14px] text-[15px] leading-tight font-poppins text-[#444] list-disc ml-5 ">
    {opt.subtitle.split("|").map((item, i) => (
      <li key={i} className="basis-1/2 flex-shrink-0 break-words">
        {item.trim()}
      </li>
    ))}
  </ul>
) : null} 
    </button>
  );
})}



              </div>
 {currentStep !== 99 && (
  <div className="w-full flex justify-between items-center  gap-3
    
  ">

    {/* Next Button Removed */}

  </div>
)}
            </div>
          ) : currentQuestion ? (
            <div
             className="
flex flex-col gap-5 lg:gap-6
w-full
mt-5

rounded-[20px]
border border-[#E8E4DD]
bg-[#FCFAF7]
shadow-[0_20px_60px_rgba(0,0,0,0.06)]

p-4 md:p-8 lg:p-10

"
            >

              <div className="flex items-center justify-between w-full  border-b border-[#2E2E2E]">

  {/* Left */}
<button
  onClick={() => {
    if (currentVisibleIdx > 0 && questions && visibleQuestions.length > 0) {
      const newSelectedOptions = { ...selectedOptions };
      const origIdx = questions.findIndex(
        (q) =>
          q.questionText === visibleQuestions[currentVisibleIdx].questionText
      );
      newSelectedOptions[origIdx] = null;
      setSelectedOptions(newSelectedOptions);
      setCurrentVisibleIdx((prev) => prev - 1);
    }
  }}
  disabled={currentVisibleIdx === 0}
  className={`flex flex-col items-center gap-1 mb-2 transition-all ${
    currentVisibleIdx > 0
      ? "cursor-pointer"
      : "cursor-not-allowed opacity-40"
  }`}
>
  <div
    className="
      w-8 h-8
      lg:w-10 lg:h-10

      rounded-[20px]
      border-2 border-[#F9B31B]

      flex items-center justify-center

      bg-[#F9B31B]
      text-black

      transition-all
      duration-300
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 lg:w-[18px] lg:h-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  </div>

  <span className="text-[11px] lg:text-[13px] font-medium text-[#F9B31B] leading-none">
    Back
  </span>
</button>

  {/* Right */}
  <div className="text-right">
    <p className="text-black  subtitle uppercase tracking-wider">
      Total
    </p>

    <a
      className="
        text-black
        subtitle
      "
    >
      ₹{totalEstimate.toLocaleString()}/-
    </a>
  </div>

</div>
              <div className="flex flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 lg:w-[700px]">
                    <a className="lg:text-[24px] text-[15px] font-outfit font-[500] text-black">
                      {currentQuestion.questionText}
                    </a>
                    {currentQuestion.questionIcon?.startsWith("data:image") ? (
                      <img src={currentQuestion.questionIcon} alt="icon" className="w-4 h-4" />
                    ) : (
                      <span>{currentQuestion.questionIcon}</span>
                    )}
                  </div>

                  
                  <p className="text-[#797474] font-poppins text-[16px] font-[400]">
                    {currentQuestion.questionSubText}
                  </p>
                </div>

                <div className="flex justify-end ">
  <span className="font-poppins text-[16px] capitalize font-[400] text-[#1E1E1E]">
    {currentQuestionNumber}/{totalQuestions}
  </span>
</div>


              </div>

  

              

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {currentQuestion.options.map((opt, i) => {
            const active = selectedOptions[originalIndex]?.title === opt.title;
                  return (
                    
                   <button
  key={i}
  type="button"
  onClick={() => handleOptionSelect(opt)}
  className={`
    flex items-start gap-4 rounded-[8px] border transition-colors px-3 py-3 text-left w-full
    ${active
      ? "bg-[#F9B31B] border-[#1E1E1E] text-white shadow-[2px_2px_0px_0px_#1E1E1E]"
      : "bg-white border-[#1E1E1E] text-[#1E1E1E] hover:bg-[#FFE19F]"
    }
  `}
>

  {/* LEFT SIDE */}
<div className="flex gap-2 w-full">

  {/* LEFT COLUMN (icon + title + price + line + subtitle all together) */}
  <div className="flex flex-col w-full">

    {/* TOP ROW: ICON + TITLE + PRICE */}
    <div className="flex items-center justify-between w-full">

      {/* ICON */}
      {opt.icon ? (
        <span className="inline-flex items-center justify-center w-6 h-6 mr-2">
          {opt.icon.startsWith("data:image") ? (
            <img src={opt.icon} alt="icon" className="w-5 h-5" />
          ) : (
            <span>{opt.icon}</span>
          )}
        </span>
      ) : (
        <span
          className={`w-[12px] h-[12px] rounded-full border-[2px] ${
            active ? "bg-black border-black" : "border-[#F9B31B]"
          }`}
        />
      )}

      {/* TITLE */}
      <span style={{ fontFamily: "Poppins, sans-serif" }} 
      className="font-poppins flex-1 text-[#111827] ml-2 text-[12px] lg:text-[16px] font-[500] leading-[1.2]">
        {opt.title}
      </span>

      {/* PRICE */}
      <span
        className={`lg:text-[14px] text-[10px] font-[500] px-2 text-start ${
          active ? "text-white" : "text-[#111827]"
        }`}
      >
       {Number(opt.price) > 0
  ? `₹${Number(opt.price).toLocaleString("en-IN")}`
  : "Included"}
      </span>
    </div>

    {/* FULL-WIDTH LINE BELOW ICON + TITLE */}
    {opt.subtitle?.trim() && (
      <div
        className={`w-full h-[2px] border-t border-dashed my-[6px] ${
          active ? "border-black" : "border-[#F9B31B]"
        }`}
      ></div>
    )}

    {/* SUBTITLE */}
    {opt.subtitle?.trim() && (
     <p
  className="
    font-poppins font-[500] text-[14px] leading-[1.3] text-[#111827]
    break-words whitespace-normal
  "
>
  {opt.subtitle}
</p>

    )}

  </div>
</div>






</button>

                  );
                })}


                

              
              </div>

             {currentStep !== 99 && (
                <div >
          

  </div>

)}


            </div>
          ) : null
        ) : (

        <div
  className="
    flex flex-col gap-10
    lg:flex-row
     lg:mt-5  mt-5
    w-full
   
  "
>
  {/* LEFT SECTION (Price + Cost Summary card) */}
<div className="w-full  flex flex-col ">

    {/* Cost Summary (Black card like reference) */}
{/* FLIP WRAPPER */}
<div className="relative w-full perspective ">
  <div
    
  >
    {/* FRONT SIDE (YOUR COST CARD) */}
    <div className="backface-hidden">
      <div 
        className="
          relative
          flex flex-col
          w-full
          lg:p-8 p-5
          border border-[#E8E4DD]
bg-[#FCFAF7]
shadow-[0_20px_60px_rgba(0,0,0,0.06)]
          rounded-[20px] 
          overflow-hidden
          text-black
        "
      >
        {/* RIGHT BORDER */}
        {/* <div className="absolute right-0 top-0 w-3 sm:w-4 md:w-5 h-full bg-[#FAB31E]"></div> */}

        {/* Yellow Price Box */}


        <a
  className="
    flex items-center gap-2
    mb-4
    font-[500]
    text-[25px]
    lg:text-[35px]
    leading-[1.2em]
    font-outfit 
  "
>
  Cost Summary
</a>

        {costItems.map((item, index) => (
          <div key={index} className="flex justify-between text-[15px] mb-3">
                                <p>

                       <span className="text-black text-center capitalize  font-miso text-[14px] font-[700] leading-normal not-italic">
{item.type}:
</span>
{" "}
                      <span className="text-black  font-miso capitalize text-[14px] font-[300] not-italic  leading-normal">
                           {item.value}
                      </span>
                    </p>

           <span className="font-[500] text-black">
  {item.price
    ? `₹${Number(item.price).toLocaleString("en-IN")}`
    : "Included"}
</span>
          </div>
        ))}

        <hr className="my-3 border-[#F9B31B]" />

        <div className="flex justify-between font-[500] text-[16px]">
          <p>Estimated Cost:</p>
          <p>₹{totalEstimate.toLocaleString()}</p>
        </div>

         <p className="text-[#1E1E1E] text-[13px] text-center font-[500] py-1 ">
           This is your starting Investment Guide final pricing depends on scope.

          </p>

      
      </div>

      
    </div>


      
 

  </div>
</div>

  </div>


</div>



        )}



        {/* formsection */}
 <div
  className="
    flex flex-col gap-10
    lg:flex-row
     xl:mt-5  lg:mt-0 mt-0
    w-full
    py-0
    px-0 

    md:py-0
    
    rounded-[20px]

  "
>
  {/* LEFT SECTION (Price + Cost Summary card) */}
<div className="w-full  flex flex-col ">

    {/* Cost Summary (Black card like reference) */}
{/* FLIP WRAPPER */}
<div className="relative w-full perspective min-h-[400px]">
  <div
    
  >



    {/* BACK SIDE — YOUR FORM PAGE */}
    <div id="contact-form" className="  ">

              

  <div className="w-full h-auto min-h-full rounded-[20px]
border border-[var(--color-highlight)]
bg-black
shadow-[0_20px_60px_rgba(0,0,0,0.06)] lg:p-8 p-4 text-white relative overflow-hidden">




        <a
  className="
    max-w-xl
    flex items-center gap-2

    font-outfit
    font-[500]

    text-[18px]      /* Mobile */
    lg:text-[25px]   /* Desktop */

    leading-[1.2em]
    mb-2
  "
>
  Get Expert Guidance for Your Project
</a>

   <p className=" max-w-2xl mb-4  subtitle leading-relaxed">
           Expect a response within 24 hours.
          </p>



        {/* INLINE FORM EXACTLY LIKE YOUR IMAGE */}
           <div className="gap-6 mb-6 w-full">

  {/* First Name */}
  <div className="flex flex-col gap-1 w-full">
    {/* <label htmlFor="name" className="text-sm font-medium text-black"> Name </label> */}
     <input 
     type="text" 
     id="name" 
     name="name" 
     value={formData.name}
      onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value, })) }
      className={`px-3 lg:py-2 py-1 border-b bg-transparent lg:text-[16px] text-[13px] text-white placeholder:!text-[13px] md:placeholder:!text-[16px] placeholder:text-[#CACACA] font-[13px] focus:outline-none 
      focus:ring-0 
      focus:border-[#F9B31B] ${
        errors.name
          ? "border-red-500 focus:ring-red-300"
          : "border-[#F9B31B] focus:ring-[#F9B31B]"
      }`}
      placeholder="Name"
    />
   {errors.name && ( <p className="text-red-500 text-sm mt-1">{errors.name}</p> )}
  </div>

  {/* Last Name */}
  <div className="flex flex-col gap-1 w-full">
    {/* <label htmlFor="phone" className="text-sm font-medium text-black">
      Phone
    </label> */}
    <input
      type="tel"
      id="phone"
      name="phone"
      value={formData.phone}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
      }
      className={`px-3 lg:py-2 py-1 lg:mt-0 mt-2 border-b bg-transparent lg:text-[16px] text-[13px] text-white  placeholder:!text-[13px] md:placeholder:!text-[16px] placeholder:text-[#CACACA] focus:outline-none 
      focus:ring-0 
      focus:border-[#F9B31B]  ${
        errors.phone
          ? "border-red-500 focus:ring-red-300"
          : "border-[#F9B31B] focus:ring-[#F9B31B]"
      }`}
      placeholder="Phone"
    />
   {errors.phone && (
      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
    )}
  </div>

  {/* Email */}
  <div className="flex flex-col gap-1 w-full">
    {/* <label htmlFor="email" className="text-sm font-medium text-white">
      Email
    </label> */}
    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      className={`px-3 lg:py-2 py-1 lg:mt-0 mt-2 border-b bg-transparent lg:text-[16px] text-[13px] text-white  placeholder:!text-[13px] md:placeholder:!text-[16px] placeholder:text-[#CACACA] focus:outline-none 
      focus:ring-0 
      focus:border-[#F9B31B] ${
        errors.email
          ? "border-red-500 focus:ring-red-300"
          : "border-[#F9B31B] focus:ring-[#F9B31B]"
      }`}
      placeholder="Email"
    />
    {errors.email && (
      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
    )}
  </div>

  {/* Message */}
  <div className="flex flex-col gap-1 w-full">
    {/* <label htmlFor="email" className="text-sm font-medium text-white">
     Message
    </label> */}
    <input
      id="message"
      name="message"
      value={formData.message}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
      }
     
            className={`px-3 lg:py-2 py-1 lg:mt-0 mt-2 border-b bg-transparent lg:text-[16px] text-[13px] text-white  placeholder:!text-[13px] md:placeholder:!text-[16px] placeholder:text-[#CACACA] focus:outline-none 

      focus:ring-0 
      focus:border-[#F9B31B] ${
          errors.message
          ? "border-red-500 focus:ring-red-300"
          : "border-[#F9B31B] focus:ring-[#F9B31B]"
      }`}
      placeholder="Your Brand Name / Website / Insta Link. "
    />
    {errors.message && (
      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
    )}
  </div>


  
 </div>


       <div className="w-full flex justify-end mt-3">
         
  <button
    onClick={handleSubmit}
    className="py-[8px] px-[23px] rounded-[5px]  cursor-pointer bg-[#F9B31B]
    border shadow-[2px_2px_0px_0px_#FFFFFF]  text-black "
  >
  {isSubmitting ? "Getting Free Audit...." : " Get Free Audit"}
  </button>
 </div>

{/* CONTACT BLOCK */}
<div className="mt-4 py-4  ">

          <a
  className="
  text-[#F9B31B]
    max-w-xl
    flex items-center gap-2

    font-outfit
    font-[500]

    text-[18px]
    lg:text-[25px]

    leading-[1.2em]
    mb-2
  "
>
 Prefer to talk now?
 </a>

  <div className="space-y-2">

    <a
      href="tel:+919999999999"
      className="
        flex
        items-center
        gap-3

      "
    >
      <Phone
        size={18}
        className="text-[#F9B31B]"
      />

      <span>
        +91 9987558189
      </span>
    </a>

    <a
      href="mailto:hello@bombayblokes.com"
      className="
        flex
        items-center
        gap-3
        
        transition-all
      "
    >
      <Mail
        size={18}
        className="text-[#F9B31B]"
      />

      <span>
        hello@bombayblokes.com
      </span>
    </a>

  </div>
</div>

{/* INCLUDED SECTION */}
<div className="  border-t border-t-[#F9B31B] ">

<div className="flex flex-col lg:flex-row lg:items-center gap-2 pt-4">

  <a
    className="
      body2
      font-[500]
      whitespace-nowrap
      leading-none
    "
  >
    What's Always Included :
  </a>

<div className="relative h-[28px] flex items-center lg:min-w-[150px]">
    <AnimatePresence mode="wait">
      <motion.span
        key={activeText}
        initial={{
          y: 12,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          y: -12,
          opacity: 0,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="
          text-[#F9B31B]
    max-w-xl
    flex items-center gap-2

    font-outfit
    font-[500]

    text-[18px]      /* Mobile */
    lg:text-[20px]   /* Desktop */

    leading-[1.2em]



          absolute
      
          whitespace-nowrap
        "
      >
        {rotatingTexts[activeText]}
      </motion.span>
    </AnimatePresence>
  </div>

</div>


</div>

      </div>
    </div>

  </div>
</div>

  </div>


</div>


</div>

      </section>    
        </div>     
      </div>
     <div ref={footerRef}>
  {/* <Footer /> */}
</div>

    </div>
  );
}
