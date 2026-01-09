import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

type AdminDashboardPageProps = {
  onLogout?: () => void;
};

type Complaint = {
  id: number;
  category: string;
  description: string;
  location: string;
  status: "pending" | "in_progress" | "resolved" | "rejected";
  date: string;
  photo?: File | null;
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

/**
 * ADMIN DASHBOARD PAGE - For managing all complaints
 * Admins can accept, reject, or mark complaints as completed
 * Status updates automatically reflect on user side
 */
export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onLogout }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Load all complaints from localStorage
  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = () => {
    const stored = localStorage.getItem("complaints");
    if (stored) {
      setComplaints(JSON.parse(stored));
    }
  };

  // Update complaint status and save to localStorage
  const updateComplaintStatus = (id: number, newStatus: Complaint["status"]) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status: newStatus } : complaint
    );
    setComplaints(updatedComplaints);
    // Save to localStorage - this will automatically reflect on user side
    localStorage.setItem("complaints", JSON.stringify(updatedComplaints));
  };

  const handleAccept = (id: number) => {
    updateComplaintStatus(id, "in_progress");
  };

  const handleReject = (id: number) => {
    updateComplaintStatus(id, "rejected");
  };

  const handleComplete = (id: number) => {
    updateComplaintStatus(id, "resolved");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("gu-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredComplaints =
    filterStatus === "all"
      ? complaints
      : complaints.filter((c) => c.status === filterStatus);

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    inProgress: complaints.filter((c) => c.status === "in_progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
    rejected: complaints.filter((c) => c.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-emerald-50 to-amber-100 px-4 py-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
      </div>

      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto"
        aria-label="એડમિન ડેશબોર્ડ"
      >
        {/* Header */}
        <motion.header
          variants={cardVariants}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 rounded-3xl bg-white/90 border border-amber-100 shadow-lg shadow-amber-100/70 px-5 py-4 backdrop-blur"
        >
          <div className="space-y-1">
            <p className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-800 border border-amber-100">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              ગ્રામ સહાય – એડમિન ડેશબોર્ડ
            </p>
            <h1 className="text-xl md:text-2xl font-extrabold text-amber-900">
              ફરિયાદ સંચાલન પોર્ટલ
            </h1>
            <p className="text-xs text-amber-900/70">
              તમામ ફરિયાદોનું સંચાલન અને સ્થિતિ અપડેટ કરો.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="text-right text-[11px] text-amber-900/70">
              <p className="font-semibold text-amber-900">એડમિન એકાઉન્ટ</p>
              <p>પંચાયત / એડમિન</p>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-white text-amber-800 text-[11px] font-medium px-3 py-2 border border-amber-100 hover:bg-amber-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-600 transition-all"
            >
              બહાર નીકળો
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </motion.header>

        {/* Stats Cards */}
        <motion.section
          variants={cardVariants}
          className="grid gap-4 md:grid-cols-5 mb-6"
        >
          <div className="rounded-2xl bg-white/95 border border-amber-100 shadow-md shadow-amber-100/60 px-4 py-3">
            <p className="text-[11px] text-amber-900/70">કુલ ફરિયાદો</p>
            <p className="mt-1 text-2xl font-extrabold text-amber-800">{stats.total}</p>
          </div>

          <div className="rounded-2xl bg-amber-50/90 border border-amber-100 shadow-md shadow-amber-100/60 px-4 py-3">
            <p className="text-[11px] text-amber-900/80">લંબાયેલ</p>
            <p className="mt-1 text-2xl font-extrabold text-amber-800">{stats.pending}</p>
          </div>

          <div className="rounded-2xl bg-blue-50/90 border border-blue-100 shadow-md shadow-blue-100/60 px-4 py-3">
            <p className="text-[11px] text-blue-900/80">કાર્યવાહી હેઠળ</p>
            <p className="mt-1 text-2xl font-extrabold text-blue-800">{stats.inProgress}</p>
          </div>

          <div className="rounded-2xl bg-emerald-50/90 border border-emerald-100 shadow-md shadow-emerald-100/60 px-4 py-3">
            <p className="text-[11px] text-emerald-900/80">નિકાલ થયેલ</p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-800">{stats.resolved}</p>
          </div>

          <div className="rounded-2xl bg-red-50/90 border border-red-100 shadow-md shadow-red-100/60 px-4 py-3">
            <p className="text-[11px] text-red-900/80">નકારી</p>
            <p className="mt-1 text-2xl font-extrabold text-red-800">{stats.rejected}</p>
          </div>
        </motion.section>

        {/* Filter */}
        <motion.section
          variants={cardVariants}
          className="mb-6 rounded-3xl bg-white/95 border border-amber-100 shadow-md shadow-amber-100/70 px-4 py-3"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-amber-900">ફિલ્ટર:</span>
            {["all", "pending", "in_progress", "resolved", "rejected"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterStatus === status
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-amber-50 text-amber-800 hover:bg-amber-100"
                }`}
              >
                {status === "all"
                  ? "બધા"
                  : status === "in_progress"
                  ? "કાર્યવાહી હેઠળ"
                  : statusLabels[status]}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Complaints List */}
        {filteredComplaints.length === 0 ? (
          <motion.div
            variants={cardVariants}
            className="rounded-3xl bg-white/95 border border-amber-100 shadow-xl shadow-amber-100/90 p-12 text-center"
          >
            <span className="text-5xl mb-4 block">📭</span>
            <h2 className="text-lg font-bold text-amber-900 mb-2">
              કોઈ ફરિયાદ નથી
            </h2>
            <p className="text-sm text-amber-900/70">
              {filterStatus === "all"
                ? "હજુ સુધી કોઈ ફરિયાદ નોંધાઈ નથી."
                : `આ ફિલ્ટર માટે કોઈ ફરિયાદ નથી.`}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredComplaints.map((complaint, index) => (
              <motion.div
                key={complaint.id}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.05 }}
                className="rounded-3xl bg-white/95 border border-amber-100 shadow-md shadow-amber-100/70 p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4">
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
                            <span className="text-sm font-semibold text-amber-900">
                              {categoryLabels[complaint.category] || "અન્ય"}
                            </span>
                          </div>
                          <p className="text-sm text-amber-900/80 mb-2">
                            {complaint.description}
                          </p>
                          {complaint.location && (
                            <p className="text-xs text-amber-900/60">
                              📍 {complaint.location}
                            </p>
                          )}
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${statusColors[complaint.status]}`}
                        >
                          {statusLabels[complaint.status]}
                        </span>
                      </div>

                      <div className="pt-3 border-t border-amber-100">
                        <div className="flex items-center gap-4 text-xs text-amber-900/60">
                          <span>📅 {formatDate(complaint.date)}</span>
                          <span>🆔 ID: {complaint.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-amber-100">
                    {complaint.status === "pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleAccept(complaint.id)}
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white text-xs font-semibold px-4 py-2 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                        >
                          ✓ સ્વીકારો
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(complaint.id)}
                          className="inline-flex items-center gap-2 rounded-xl bg-red-600 text-white text-xs font-semibold px-4 py-2 hover:bg-red-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600"
                        >
                          ✗ નકારો
                        </button>
                      </>
                    )}
                    {complaint.status === "in_progress" && (
                      <button
                        type="button"
                        onClick={() => handleComplete(complaint.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold px-4 py-2 hover:bg-emerald-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600"
                      >
                        ✓ પૂર્ણ ચિહ્નિત કરો
                      </button>
                    )}
                    {(complaint.status === "resolved" || complaint.status === "rejected") && (
                      <span className="text-xs text-amber-900/60 italic">
                        આ ફરિયાદની કાર્યવાહી પૂર્ણ થઈ છે.
                      </span>
                    )}
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

