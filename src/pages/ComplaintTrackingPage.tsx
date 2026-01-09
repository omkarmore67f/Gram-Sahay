import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

type ComplaintTrackingPageProps = {
  onBack?: () => void;
};

type Complaint = {
  id: number;
  category: string;
  description: string;
  location: string;
  status: "pending" | "in_progress" | "resolved" | "rejected";
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

const statusLabels: Record<string, string> = {
  pending: "લંબાયેલ",
  in_progress: "કાર્યવાહી હેઠળ",
  resolved: "નિકાલ થયેલ",
  rejected: "નકારી",
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200",
  resolved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const categoryLabels: Record<string, string> = {
  road: "માર્ગ / રસ્તા",
  water: "પાણી પુરવઠો",
  electricity: "વીજળી",
  sanitation: "સ્વચ્છતા",
  other: "અન્ય",
};

export const ComplaintTrackingPage: React.FC<ComplaintTrackingPageProps> = ({ onBack }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("complaints");
    if (stored) {
      setComplaints(JSON.parse(stored));
    } else {
      // Mock data for demo
      setComplaints([
        {
          id: 1,
          category: "road",
          description: "મુખ્ય રસ્તા પર ખાડો છે",
          location: "ગામનો મુખ્ય ચૌક",
          status: "in_progress",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 2,
          category: "water",
          description: "પાણીનો પુરવઠો બંધ છે",
          location: "વોર્ડ નંબર 3",
          status: "resolved",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 3,
          category: "sanitation",
          description: "કચરો ઉપાડવાની જરૂર છે",
          location: "વોર્ડ નંબર 1",
          status: "pending",
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]);
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("gu-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
        className="relative z-10 max-w-4xl mx-auto"
      >
        <motion.header
          variants={cardVariants}
          className="flex items-center justify-between mb-6 rounded-3xl bg-white/90 border border-emerald-100 shadow-lg shadow-emerald-100/70 px-5 py-4 backdrop-blur"
        >
          <div>
            <h1 className="text-xl font-bold text-emerald-900">ફરિયાદ ટ્રેકિંગ</h1>
            <p className="text-xs text-emerald-900/70 mt-1">
              તમારી બધી ફરિયાદોની સ્થિતિ અહીં જુઓ
            </p>
          </div>
          <button
            onClick={onBack}
            className="rounded-2xl bg-white text-emerald-800 text-xs font-medium px-3 py-2 border border-emerald-100 hover:bg-emerald-50/70 transition-all"
          >
            પાછા જાઓ
          </button>
        </motion.header>

        {complaints.length === 0 ? (
          <motion.div
            variants={cardVariants}
            className="rounded-3xl bg-white/95 border border-emerald-100 shadow-xl shadow-emerald-100/90 p-12 text-center"
          >
            <span className="text-5xl mb-4 block">📭</span>
            <h2 className="text-lg font-bold text-emerald-900 mb-2">
              કોઈ ફરિયાદ નથી
            </h2>
            <p className="text-sm text-emerald-900/70">
              તમે હજુ સુધી કોઈ ફરિયાદ નોંધાવી નથી.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint, index) => (
              <motion.div
                key={complaint.id}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.1 }}
                className="rounded-3xl bg-white/95 border border-emerald-100 shadow-md shadow-emerald-100/70 p-5 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                          <span className="text-lg">
                            {complaint.category === "road" && "🛣️"}
                            {complaint.category === "water" && "💧"}
                            {complaint.category === "electricity" && "⚡"}
                            {complaint.category === "sanitation" && "🧹"}
                            {complaint.category === "other" && "📋"}
                          </span>
                          <span className="text-sm font-semibold text-emerald-900">
                            {categoryLabels[complaint.category] || "અન્ય"}
                          </span>
                        </div>
                        <p className="text-sm text-emerald-900/80 mb-2">{complaint.description}</p>
                        {complaint.location && (
                          <p className="text-xs text-emerald-900/60">📍 {complaint.location}</p>
                        )}
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${statusColors[complaint.status]}`}
                      >
                        {statusLabels[complaint.status]}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-emerald-100">
                      <div className="flex items-center gap-4 text-xs text-emerald-900/60">
                        <span>📅 {formatDate(complaint.date)}</span>
                        <span>🆔 ID: {complaint.id}</span>
                      </div>

                      {/* Timeline */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              complaint.status !== "pending" && complaint.status !== "rejected"
                                ? "bg-emerald-500"
                                : complaint.status === "rejected"
                                ? "bg-red-500"
                                : "bg-amber-500"
                            }`}
                          />
                          <span className="text-emerald-900/70">
                            ફરિયાદ નોંધાઈ: {formatDate(complaint.date)}
                          </span>
                        </div>
                        {complaint.status !== "pending" && complaint.status !== "rejected" && (
                          <div className="flex items-center gap-2 text-xs">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                complaint.status === "resolved" ? "bg-emerald-500" : "bg-blue-500"
                              }`}
                            />
                            <span className="text-emerald-900/70">
                              {complaint.status === "resolved"
                                ? "નિકાલ થયેલ"
                                : "કાર્યવાહી હેઠળ"}
                            </span>
                          </div>
                        )}
                        {complaint.status === "rejected" && (
                          <div className="flex items-center gap-2 text-xs">
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                            <span className="text-red-900/70">ફરિયાદ નકારી</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.main>
    </div>
  );
};


