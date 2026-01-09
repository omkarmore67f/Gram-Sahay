import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

type DashboardPageProps = {
  onLogout?: () => void;
  onNavigateToComplaintFiling?: () => void;
  onNavigateToComplaintTracking?: () => void;
  onNavigateToSchemeAwareness?: () => void;
};

type Notice = {
  id: number;
  title: string;
  description: string;
  date: string;
};

const containerVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.96, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
};

const mockStats = {
  totalComplaints: 18,
  openComplaints: 5,
  resolvedComplaints: 11,
  schemesActive: 7,
};

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onLogout,
  onNavigateToComplaintFiling,
  onNavigateToComplaintTracking,
  onNavigateToSchemeAwareness,
}) => {
  const [notices, setNotices] = useState<Notice[]>([]);

  // Load notices from localStorage
  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = () => {
    const stored = localStorage.getItem("notices");
    if (stored) {
      setNotices(JSON.parse(stored));
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-amber-50 to-emerald-100 flex items-center justify-center px-4 py-6">
      {/* બ્લર બેકગ્રાઉન્ડ સરકલ્સ (rural feel) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-green-300/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
      </div>

      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl space-y-4"
        aria-label="ગ્રામ સહાય યુઝર ડેશબોર્ડ"
      >
        {/* ટોપ બાર */}
        <motion.header
          variants={cardVariants}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-3xl bg-white/90 border border-emerald-100 shadow-lg shadow-emerald-100/70 px-5 py-4 backdrop-blur"
        >
          <div className="space-y-1">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-800 border border-emerald-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ગ્રામ સહાય – યુઝર ડેશબોર્ડ
            </p>
            <h1 className="text-xl md:text-2xl font-extrabold text-emerald-900">
              સ્વાગત છે, ગામજનો!
            </h1>
            <p className="text-xs text-emerald-900/70">
              અહીંથી તમે તમારી ફરિયાદો, નોટિસ અને યોજનાઓને એક નજરમાં જોઈ શકો છો.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="text-right text-[11px] text-emerald-900/70">
              <p className="font-semibold text-emerald-900">તમારું એકાઉન્ટ</p>
              <p>મોબાઇલ દ્વારા લૉગિન</p>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-white text-emerald-800 text-[11px] font-medium px-3 py-2 border border-emerald-100 hover:bg-emerald-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600 transition-all"
            >
              બહાર નીકળો
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </motion.header>

        {/* સ્ટેટ્સ કાર્ડ્સ */}
        <motion.section
          variants={cardVariants}
          className="grid gap-4 md:grid-cols-4"
        >
          <div className="rounded-2xl bg-white/95 border border-emerald-100 shadow-md shadow-emerald-100/60 px-4 py-3">
            <p className="text-[11px] text-emerald-900/70">કુલ ફરિયાદો</p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-800">
              {mockStats.totalComplaints}
            </p>
            <p className="mt-0.5 text-[11px] text-emerald-900/60">
              છેલ્લા 12 મહિનામાં
            </p>
          </div>

          <div className="rounded-2xl bg-amber-50/90 border border-amber-100 shadow-md shadow-amber-100/60 px-4 py-3">
            <p className="text-[11px] text-amber-900/80">ચાલુ ફરિયાદો</p>
            <p className="mt-1 text-2xl font-extrabold text-amber-800">
              {mockStats.openComplaints}
            </p>
            <p className="mt-0.5 text-[11px] text-amber-900/70">
              કાર્યવાહી હેઠળ
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-50/90 border border-emerald-100 shadow-md shadow-emerald-100/60 px-4 py-3">
            <p className="text-[11px] text-emerald-900/80">નિકાલ થયેલી ફરિયાદો</p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-800">
              {mockStats.resolvedComplaints}
            </p>
            <p className="mt-0.5 text-[11px] text-emerald-900/70">
              નાગરિકને માહિતગાર
            </p>
          </div>

          <div className="rounded-2xl bg-lime-50/90 border border-lime-100 shadow-md shadow-lime-100/60 px-4 py-3">
            <p className="text-[11px] text-lime-900/80">ચાલુ યોજનાઓ</p>
            <p className="mt-1 text-2xl font-extrabold text-lime-800">
              {mockStats.schemesActive}
            </p>
            <p className="mt-0.5 text-[11px] text-lime-900/70">
              તમારી પાત્રતા માટે તપાસો
            </p>
          </div>
        </motion.section>

        {/* મુખ્ય નેવિગેશન કાર્ડ્સ */}
        <motion.section
          variants={cardVariants}
          className="grid gap-4 md:grid-cols-3"
        >
          <button
            type="button"
            onClick={onNavigateToComplaintFiling}
            className="group rounded-3xl bg-white/95 border border-emerald-100 shadow-md shadow-emerald-100/70 px-4 py-4 text-left hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-100/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-emerald-600/10 text-lg">
                📣
              </div>
              <span className="text-[11px] text-emerald-900/60 group-hover:text-emerald-900/80">
                નવી ફરિયાદ નોંધાવો
              </span>
            </div>
            <h2 className="mt-3 text-sm font-semibold text-emerald-900">
              ફરિયાદ નોંધણી
            </h2>
            <p className="mt-1 text-[11px] text-emerald-900/70">
              માર્ગ, પાણી, વીજળી, સ્વચ્છતા જેવી કોઈપણ સમસ્યા અહીંથી નોંધાવો.
            </p>
            <p className="mt-2 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
              શરુ કરો
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                ➜
              </span>
            </p>
          </button>

          <button
            type="button"
            onClick={onNavigateToComplaintTracking}
            className="group rounded-3xl bg-white/95 border border-amber-100 shadow-md shadow-amber-100/70 px-4 py-4 text-left hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-100/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-600"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-amber-500/10 text-lg">
                📊
              </div>
              <span className="text-[11px] text-amber-900/70 group-hover:text-amber-900/90">
                તમારી ફરિયાદોની સ્થિતિ
              </span>
            </div>
            <h2 className="mt-3 text-sm font-semibold text-amber-900">
              ફરિયાદ ટ્રેકિંગ
            </h2>
            <p className="mt-1 text-[11px] text-amber-900/75">
              કઈ ફરિયાદ કયા સ્ટેજ પર છે – સમયરેખા સાથે સ્પષ્ટ રીતે જુઓ.
            </p>
            <p className="mt-2 text-[11px] font-semibold text-amber-700 flex items-center gap-1">
              વિગત જુઓ
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                ➜
              </span>
            </p>
          </button>

          <button
            type="button"
            onClick={onNavigateToSchemeAwareness}
            className="group rounded-3xl bg-white/95 border border-lime-100 shadow-md shadow-lime-100/70 px-4 py-4 text-left hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-100/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lime-600"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-lime-500/10 text-lg">
                🎯
              </div>
              <span className="text-[11px] text-lime-900/70 group-hover:text-lime-900/90">
                તમારી પાત્રતા તપાસો
              </span>
            </div>
            <h2 className="mt-3 text-sm font-semibold text-lime-900">
              યોજના માર્ગદર્શિકા
            </h2>
            <p className="mt-1 text-[11px] text-lime-900/75">
              સરળ પ્રશ્નોત્તરી વડે જાણો કે કઈ સરકાર યોજના માટે તમે પાત્ર છો.
            </p>
            <p className="mt-2 text-[11px] font-semibold text-lime-700 flex items-center gap-1">
              શરુ કરો
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                ➜
              </span>
            </p>
          </button>
        </motion.section>

        {/* તાજેતરની નોટિસ અને અપડેટ્સ */}
        <motion.section
          variants={cardVariants}
          className="rounded-3xl bg-white/95 border border-emerald-100 shadow-md shadow-emerald-100/70 px-4 py-4 md:px-5 md:py-5"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-sm font-semibold text-emerald-900">
              તાજેતરના નોટિસ અને જાહેરાતો
            </h2>
            <span className="text-[11px] text-emerald-900/60">
              પંચાયત દ્વારા પ્રકાશિત
            </span>
          </div>

          {notices.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-3 block">📢</span>
              <h3 className="text-sm font-semibold text-emerald-900 mb-2">
                કોઈ નોટિસ નથી
              </h3>
              <p className="text-[11px] text-emerald-900/70">
                હાલમાં કોઈ મહત્વપૂર્ણ નોટિસ અથવા જાહેરાત નથી.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {notices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex flex-col md:flex-row md:items-center md:justify-between gap-1.5 rounded-2xl border px-3 py-2.5 ${
                    index % 2 === 0
                      ? "bg-emerald-50/80 border-emerald-100"
                      : "bg-amber-50/80 border-amber-100"
                  }`}
                >
                  <div>
                    <p className={`text-[11px] font-semibold ${
                      index % 2 === 0 ? "text-emerald-900" : "text-amber-900"
                    }`}>
                      {notice.title}
                    </p>
                    <p className={`text-[11px] ${
                      index % 2 === 0 ? "text-emerald-900/75" : "text-amber-900/75"
                    }`}>
                      {notice.description}
                    </p>
                  </div>
                  <p className={`text-[11px] md:text-right ${
                    index % 2 === 0 ? "text-emerald-900/60" : "text-amber-900/70"
                  }`}>
                    📅 {new Date(notice.date).toLocaleDateString("gu-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </motion.main>
    </div>
  );
};


