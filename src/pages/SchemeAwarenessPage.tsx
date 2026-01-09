import React, { useState } from "react";
import { motion } from "framer-motion";

type SchemeAwarenessPageProps = {
  onBack?: () => void;
};

type Question = {
  id: string;
  question: string;
  options: { value: string; label: string }[];
};

const containerVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.96, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
};

const questions: Question[] = [
  {
    id: "income",
    question: "તમારું વાર્ષિક પરિવારનું આવક કેટલું છે?",
    options: [
      { value: "below_1lakh", label: "1 લાખથી ઓછું" },
      { value: "1_3lakh", label: "1 લાખથી 3 લાખ" },
      { value: "above_3lakh", label: "3 લાખથી વધુ" },
    ],
  },
  {
    id: "category",
    question: "તમે કયા વર્ગમાં આવો છો?",
    options: [
      { value: "general", label: "સામાન્ય" },
      { value: "obc", label: "OBC" },
      { value: "sc", label: "SC" },
      { value: "st", label: "ST" },
    ],
  },
  {
    id: "age",
    question: "તમારી ઉંમર કેટલી છે?",
    options: [
      { value: "below_18", label: "18 વર્ષથી ઓછું" },
      { value: "18_60", label: "18 થી 60 વર્ષ" },
      { value: "above_60", label: "60 વર્ષથી વધુ" },
    ],
  },
  {
    id: "gender",
    question: "તમારું લિંગ?",
    options: [
      { value: "male", label: "પુરુષ" },
      { value: "female", label: "સ્ત્રી" },
      { value: "other", label: "અન્ય" },
    ],
  },
];

const schemes = [
  {
    id: "pmay",
    name: "પ્રધાનમંત્રી આવાસ યોજના",
    description: "ઘર બાંધકામ માટેની યોજના",
    eligible: ["below_1lakh", "1_3lakh"],
  },
  {
    id: "ujjwala",
    name: "પ્રધાનમંત્રી ઉજ્જવલા યોજના",
    description: "ગેસ કનેક્શન માટેની યોજના",
    eligible: ["below_1lakh"],
  },
  {
    id: "kisan",
    name: "કિસાન સમ્માન નિધિ",
    description: "ખેડૂતો માટેની આર્થિક સહાય",
    eligible: ["1_3lakh", "below_1lakh"],
  },
];

export const SchemeAwarenessPage: React.FC<SchemeAwarenessPageProps> = ({ onBack }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const getEligibleSchemes = () => {
    const income = answers.income;
    if (!income) return [];

    return schemes.filter((scheme) => scheme.eligible.includes(income));
  };

  const reset = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  };

  if (showResults) {
    const eligibleSchemes = getEligibleSchemes();
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-amber-50 to-emerald-100 px-4 py-6">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-green-300/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
        </div>

        <motion.main
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative z-10 max-w-2xl mx-auto"
        >
          <motion.header
            variants={cardVariants}
            className="flex items-center justify-between mb-6 rounded-3xl bg-white/90 border border-emerald-100 shadow-lg shadow-emerald-100/70 px-5 py-4 backdrop-blur"
          >
            <div>
              <h1 className="text-xl font-bold text-emerald-900">યોજના પરિણામ</h1>
              <p className="text-xs text-emerald-900/70 mt-1">તમારી પાત્રતા મુજબ યોજનાઓ</p>
            </div>
            <button
              onClick={onBack}
              className="rounded-2xl bg-white text-emerald-800 text-xs font-medium px-3 py-2 border border-emerald-100 hover:bg-emerald-50/70 transition-all"
            >
              પાછા જાઓ
            </button>
          </motion.header>

          <motion.div
            variants={cardVariants}
            className="rounded-3xl bg-white/95 border border-emerald-100 shadow-xl shadow-emerald-100/90 p-6 sm:p-8"
          >
            {eligibleSchemes.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-emerald-900 mb-4">
                  તમે આ યોજનાઓ માટે પાત્ર છો:
                </h2>
                {eligibleSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="rounded-2xl bg-emerald-50/80 border border-emerald-200 p-4"
                  >
                    <h3 className="font-semibold text-emerald-900 mb-1">{scheme.name}</h3>
                    <p className="text-sm text-emerald-900/70">{scheme.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="text-5xl mb-4 block">📋</span>
                <h2 className="text-lg font-bold text-emerald-900 mb-2">
                  કોઈ યોજના મળી નથી
                </h2>
                <p className="text-sm text-emerald-900/70">
                  તમારી માહિતી મુજબ હાલમાં કોઈ યોજના માટે પાત્રતા નથી.
                </p>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={reset}
                className="flex-1 rounded-2xl bg-emerald-700 text-white text-sm font-semibold py-2.5 hover:bg-emerald-800 transition-all"
              >
                ફરી પ્રશ્નોત્તરી ભરો
              </button>
              <button
                onClick={onBack}
                className="flex-1 rounded-2xl bg-white text-emerald-800 text-sm font-semibold py-2.5 border border-emerald-100 hover:bg-emerald-50/70 transition-all"
              >
                ડેશબોર્ડ પર પાછા જાઓ
              </button>
            </div>
          </motion.div>
        </motion.main>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-amber-50 to-emerald-100 px-4 py-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-green-300/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
      </div>

      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-2xl mx-auto"
      >
        <motion.header
          variants={cardVariants}
          className="flex items-center justify-between mb-6 rounded-3xl bg-white/90 border border-emerald-100 shadow-lg shadow-emerald-100/70 px-5 py-4 backdrop-blur"
        >
          <div>
            <h1 className="text-xl font-bold text-emerald-900">યોજના માર્ગદર્શિકા</h1>
            <p className="text-xs text-emerald-900/70 mt-1">
              પ્રશ્ન {currentQuestion + 1} / {questions.length}
            </p>
          </div>
          <button
            onClick={onBack}
            className="rounded-2xl bg-white text-emerald-800 text-xs font-medium px-3 py-2 border border-emerald-100 hover:bg-emerald-50/70 transition-all"
          >
            પાછા જાઓ
          </button>
        </motion.header>

        <motion.div
          key={currentQuestion}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="rounded-3xl bg-white/95 border border-emerald-100 shadow-xl shadow-emerald-100/90 p-6 sm:p-8"
        >
          <h2 className="text-lg font-bold text-emerald-900 mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleAnswer(question.id, option.value)}
                className={`w-full rounded-2xl border p-4 text-left transition-all ${
                  answers[question.id] === option.value
                    ? "border-emerald-400 bg-emerald-50 shadow-md"
                    : "border-emerald-100 bg-white hover:border-emerald-200"
                }`}
              >
                <span className="text-sm font-medium text-emerald-900">{option.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
              className="rounded-2xl bg-white text-emerald-800 text-sm font-medium px-4 py-2 border border-emerald-100 hover:bg-emerald-50/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              પાછલું
            </button>
            <div className="flex gap-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-2 rounded-full ${
                    idx <= currentQuestion ? "bg-emerald-500" : "bg-emerald-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
};


