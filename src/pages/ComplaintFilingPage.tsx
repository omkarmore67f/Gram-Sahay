import React, { useState } from "react";
import { motion } from "framer-motion";

type ComplaintFilingPageProps = {
  onBack?: () => void;
};

const containerVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.96, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
};

export const ComplaintFilingPage: React.FC<ComplaintFilingPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    location: "",
    photo: null as File | null,
  });
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: "road", label: "માર્ગ / રસ્તા", icon: "🛣️" },
    { id: "water", label: "પાણી પુરવઠો", icon: "💧" },
    { id: "electricity", label: "વીજળી", icon: "⚡" },
    { id: "sanitation", label: "સ્વચ્છતા", icon: "🧹" },
    { id: "other", label: "અન્ય", icon: "📋" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Store in localStorage for tracking page
      const complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
      complaints.push({
        id: Date.now(),
        ...formData,
        status: "pending",
        date: new Date().toISOString(),
      });
      localStorage.setItem("complaints", JSON.stringify(complaints));
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-amber-50 to-emerald-100 flex items-center justify-center px-4 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full rounded-3xl bg-white/95 shadow-xl shadow-emerald-100/90 p-8 border border-emerald-100 text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center shadow-lg shadow-emerald-300/70 mx-auto mb-4"
          >
            <span className="text-2xl">✅</span>
          </motion.div>
          <h2 className="text-xl font-bold text-emerald-900 mb-2">
            ફરિયાદ સફળતાપૂર્વક નોંધાઈ!
          </h2>
          <p className="text-sm text-emerald-900/70 mb-6">
            તમારી ફરિયાદ પ્રાપ્ત થઈ છે. ટ્રેકિંગ પેજ પરથી તમે તેની સ્થિતિ જોઈ શકો છો.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={onBack}
              className="w-full rounded-2xl bg-emerald-700 text-white text-sm font-semibold py-2.5 hover:bg-emerald-800 transition-all"
            >
              ડેશબોર્ડ પર પાછા જાઓ
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <motion.header
          variants={cardVariants}
          className="flex items-center justify-between mb-6 rounded-3xl bg-white/90 border border-emerald-100 shadow-lg shadow-emerald-100/70 px-5 py-4 backdrop-blur"
        >
          <div>
            <h1 className="text-xl font-bold text-emerald-900">ફરિયાદ નોંધણી</h1>
            <p className="text-xs text-emerald-900/70 mt-1">તમારી સમસ્યા અહીં નોંધાવો</p>
          </div>
          <button
            onClick={onBack}
            className="rounded-2xl bg-white text-emerald-800 text-xs font-medium px-3 py-2 border border-emerald-100 hover:bg-emerald-50/70 transition-all"
          >
            પાછા જાઓ
          </button>
        </motion.header>

        <motion.form
          variants={cardVariants}
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white/95 border border-emerald-100 shadow-xl shadow-emerald-100/90 p-6 sm:p-8"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-3">
                ફરિયાદની શ્રેણી પસંદ કરો
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                    className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                      formData.category === cat.id
                        ? "border-emerald-400 bg-emerald-50 shadow-md"
                        : "border-emerald-100 bg-white hover:border-emerald-200"
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-sm font-medium text-emerald-900">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-emerald-900 mb-2">
                ફરિયાદનું વર્ણન
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-emerald-100 bg-emerald-50/40 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 placeholder:text-emerald-900/40"
                placeholder="તમારી સમસ્યાનું વિગતવાર વર્ણન કરો..."
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-emerald-900 mb-2">
                સ્થાન (વૈકલ્પિક)
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-emerald-100 bg-emerald-50/40 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 placeholder:text-emerald-900/40"
                placeholder="જ્યાં સમસ્યા છે તેનું સ્થાન"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-900 mb-2">
                ફોટો જોડો (વૈકલ્પિક)
              </label>
              <div className="border-2 border-dashed border-emerald-200 rounded-2xl p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })}
                  className="hidden"
                  id="photo"
                />
                <label
                  htmlFor="photo"
                  className="cursor-pointer inline-flex flex-col items-center gap-2"
                >
                  <span className="text-3xl">📷</span>
                  <span className="text-sm text-emerald-900/70">
                    {formData.photo ? formData.photo.name : "ફોટો પસંદ કરો"}
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!formData.category || !formData.description || isSubmitting}
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-amber-500 text-white text-sm font-semibold py-3 shadow-md hover:from-emerald-700 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? "સબમિટ કરી રહ્યા છીએ..." : "ફરિયાદ નોંધાવો"}
            </button>
          </div>
        </motion.form>
      </motion.main>
    </div>
  );
};


