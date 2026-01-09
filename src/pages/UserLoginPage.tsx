import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHONE_REGEX = /^[6-9]\d{9}$/;
const OTP_REGEX = /^\d{6}$/;

const containerVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.96, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
};

type UserLoginPageProps = {
  onGoToDashboard?: () => void;
  onSwitchToAdmin?: () => void;
};

/**
 * USER LOGIN PAGE - Dedicated login page for normal users only
 * Users can access complaint filing and tracking after login
 */
export const UserLoginPage: React.FC<UserLoginPageProps> = ({ onGoToDashboard, onSwitchToAdmin }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [errors, setErrors] = useState<{ phone?: string; otp?: string }>({});
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [mockGeneratedOtp, setMockGeneratedOtp] = useState<string | null>(null);

  // Check for existing user session
  useEffect(() => {
    const session = localStorage.getItem("gramSahaySession");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed?.phone && parsed?.role === "user") {
          setPhone(parsed.phone);
          setStep("success");
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const validatePhone = () => {
    if (!phone.trim()) {
      return "કૃપા કરીને મોબાઇલ નંબર દાખલ કરો.";
    }
    if (!PHONE_REGEX.test(phone.trim())) {
      return "માન્ય 10 અંકનો મોબાઇલ નંબર દાખલ કરો (6-9 થી શરૂ).";
    }
    return "";
  };

  const validateOtp = () => {
    if (!otp.trim()) {
      return "કૃપા કરીને OTP દાખલ કરો.";
    }
    if (!OTP_REGEX.test(otp.trim())) {
      return "માન્ય 6 અંકનો OTP દાખલ કરો.";
    }
    if (mockGeneratedOtp && otp.trim() !== mockGeneratedOtp) {
      return "OTP મેળ ખાતો નથી. ફરી પ્રયત્ન કરો.";
    }
    return "";
  };

  const onSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneError = validatePhone();
    if (phoneError) {
      setErrors({ phone: phoneError });
      return;
    }

    setErrors({});
    setIsSendingOtp(true);

    // Mock OTP generation
    const generated = "123456";
    setMockGeneratedOtp(generated);

    setTimeout(() => {
      setIsSendingOtp(false);
      setStep("otp");
    }, 800);
  };

  const onVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpError = validateOtp();
    if (otpError) {
      setErrors((prev) => ({ ...prev, otp: otpError }));
      return;
    }
    setErrors({});
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setStep("success");
      // Store user session with role="user"
      localStorage.setItem(
        "gramSahaySession",
        JSON.stringify({ phone, role: "user", loggedInAt: new Date().toISOString() })
      );
    }, 800);
  };

  const onChangeNumber = () => {
    setStep("phone");
    setOtp("");
    setErrors({});
  };

  const onLogoutMock = () => {
    localStorage.removeItem("gramSahaySession");
    setStep("phone");
    setOtp("");
    setPhone("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-amber-50 to-emerald-100 flex items-center justify-center px-4 py-6">
      {/* Background blur circles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-green-300/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
      </div>

      <motion.main
        variants={containerVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl grid gap-6 md:grid-cols-[1.1fr,1.2fr] items-center"
        aria-label="ગ્રામ સહાય યુઝર લૉગિન પેજ"
      >
        {/* Left side - Brand/Description */}
        <motion.section
          variants={cardVariants}
          className="hidden md:flex flex-col gap-4 rounded-3xl bg-white/80 shadow-xl shadow-emerald-100/80 p-8 border border-emerald-100 backdrop-blur"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 border border-emerald-100 w-max">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            ગ્રામ્ય e-હેલ્પડેસ્ક
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold text-emerald-900 leading-snug">
            ગ્રામ સહાય <span className="text-amber-700">પંચાયત હેલ્પડેસ્ક</span>
          </h1>

          <p className="text-sm text-emerald-900/80 leading-relaxed">
            ફરિયાદ, યોજનાઓ અને નોટિસ સંબંધિત તમામ માહિતી હવે એક જ જગ્યાએ —
            સરળ ગુજરાતી ઈન્ટરફેસ સાથે. મોબાઇલ નંબર અને OTP દ્વારા સુરક્ષિત
            પ્રવેશ.
          </p>

          <ul className="mt-2 space-y-2 text-xs text-emerald-900/80">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-4 w-4 rounded-full bg-emerald-100 text-[10px] flex items-center justify-center text-emerald-700 font-bold">
                1
              </span>
              <span>ફરિયાદ નોંધાવો, ફોટો અને લોકેશન સાથે.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-4 w-4 rounded-full bg-amber-100 text-[10px] flex items-center justify-center text-amber-700 font-bold">
                2
              </span>
              <span>સ્થિતિ ટ્રેક કરો – દર સ્ટેપ પર અપડેટ.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-4 w-4 rounded-full bg-lime-100 text-[10px] flex items-center justify-center text-lime-700 font-bold">
                3
              </span>
              <span>નવી યોજનાઓ અને નોટિસ સરળ રીતે વાંચો.</span>
            </li>
          </ul>

          <div className="mt-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-amber-500 px-4 py-3 text-xs text-emerald-50 shadow-lg flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50/15 border border-emerald-100/40">
              🌾
            </span>
            <p>
              ગામ, ખેડૂત અને નાગરિકોના હિત માટે બનાવાયેલ —{" "}
              <span className="font-semibold">100% ગુજરાતી ડિજિટલ સાથી</span>.
            </p>
          </div>
        </motion.section>

        {/* Right side - Login Card */}
        <motion.section
          variants={cardVariants}
          className="rounded-3xl bg-white/95 shadow-xl shadow-emerald-100/90 p-6 sm:p-8 border border-emerald-100 backdrop-blur"
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl font-bold text-emerald-900">
                યુઝર લૉગિન – ગ્રામ સહાય
              </h2>
              <p className="text-xs text-emerald-900/70 mt-1">
                તમારો મોબાઇલ નંબર નાખો અને OTP વડે સુરક્ષિત રીતે પ્રવેશ કરો.
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-wide text-emerald-600 font-semibold">
                Role
              </span>
              <span className="text-xs text-emerald-900/80">ગામજનો</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === "phone" && (
              <motion.form
                key="phone-step"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                onSubmit={onSendOtp}
                className="space-y-4"
                aria-label="મોબાઇલ નંબર સ્ટેપ"
              >
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold text-emerald-900"
                  >
                    મોબાઇલ નંબર
                  </label>
                  <div className="flex rounded-2xl border border-emerald-100 bg-emerald-50/40 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-200 overflow-hidden">
                    <span className="inline-flex items-center px-3 text-xs text-emerald-800 bg-emerald-50 border-r border-emerald-100">
                      +91
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      className="w-full px-3 py-2.5 text-sm bg-transparent outline-none placeholder:text-emerald-900/40"
                      placeholder="તમારો 10 અંકનો મોબાઇલ નંબર લખો"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "phone-error" : "phone-help-text"
                      }
                    />
                  </div>
                  <p
                    id="phone-help-text"
                    className="text-[11px] text-emerald-900/60"
                  >
                    OTP ફક્ત આ નંબર પર મોકલાશે. કૃપા કરીને યોગ્ય નંબર લખો.
                  </p>
                  {errors.phone && (
                    <p
                      id="phone-error"
                      className="text-[11px] text-red-600 mt-0.5"
                      role="alert"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSendingOtp}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-amber-500 text-white text-sm font-semibold py-2.5 shadow-md shadow-emerald-200 hover:from-emerald-700 hover:to-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {isSendingOtp ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                      OTP મોકલી રહ્યા છીએ...
                    </>
                  ) : (
                    <>
                      <span>OTP મોકલો</span>
                      <span className="text-xs" aria-hidden="true">
                        ➜
                      </span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-emerald-900/60 text-center">
                  લૉગિન દ્વારા તમે આયોજનની શરતો અને પ્રાઈવસી નિયમો સાથે સહમત છો.
                </p>
                {onSwitchToAdmin && (
                  <p className="text-[11px] text-emerald-900/60 text-center">
                    એડમિન છો?{" "}
                    <button
                      type="button"
                      onClick={onSwitchToAdmin}
                      className="text-emerald-700 underline hover:text-emerald-800 focus:outline-none"
                    >
                      એડમિન લૉગિન પર જાઓ
                    </button>
                  </p>
                )}
              </motion.form>
            )}

            {step === "otp" && (
              <motion.form
                key="otp-step"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                onSubmit={onVerifyOtp}
                className="space-y-4"
                aria-label="OTP સ્ટેપ"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-emerald-900/80">
                      OTP મોકલાયો છે નંબર પર:{" "}
                      <span className="font-semibold">+91 {phone}</span>
                    </p>
                    <button
                      type="button"
                      onClick={onChangeNumber}
                      className="mt-1 text-[11px] text-emerald-700 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-50 rounded"
                    >
                      નંબર બદલો
                    </button>
                  </div>
                  <div className="text-[11px] text-emerald-900/60 text-right">
                    <p>mock OTP: <span className="font-mono">123456</span></p>
                    <p className="mt-0.5">ડેમો માટે માત્ર.</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="otp"
                    className="block text-xs font-semibold text-emerald-900"
                  >
                    OTP દાખલ કરો
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="tel"
                    inputMode="numeric"
                    maxLength={6}
                    className="w-full px-3 py-2.5 text-sm rounded-2xl border border-emerald-100 bg-emerald-50/40 outline-none placeholder:text-emerald-900/40 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                    placeholder="6 અંકનો OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    aria-invalid={!!errors.otp}
                    aria-describedby={errors.otp ? "otp-error" : undefined}
                  />
                  {errors.otp && (
                    <p id="otp-error" className="text-[11px] text-red-600" role="alert">
                      {errors.otp}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 text-white text-sm font-semibold py-2.5 shadow-md shadow-emerald-200 hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {isVerifying ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                      OTP ચેક કરી રહ્યા છીએ...
                    </>
                  ) : (
                    <>
                      <span>લૉગિન કરો</span>
                      <span className="text-xs" aria-hidden="true">
                        ✓
                      </span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-emerald-900/60 text-center">
                  જો OTP ન મળ્યો હોય તો થોડા સમય બાદ ફરી પ્રયત્ન કરો.
                </p>
              </motion.form>
            )}

            {step === "success" && (
              <motion.div
                key="success-step"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 text-center"
                aria-label="લૉગિન સફળ"
              >
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center shadow-lg shadow-emerald-300/70"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring" }}
                      className="text-2xl"
                    >
                      ✅
                    </motion.span>
                  </motion.div>
                </div>
                <h3 className="text-lg font-bold text-emerald-900">
                  લૉગિન સફળ થયું!
                </h3>
                <p className="text-xs text-emerald-900/75 max-w-sm mx-auto">
                  તમે હાલ <span className="font-semibold">ગામજનો</span> તરીકે લૉગિન છો.
                  તમે ફરિયાદ નોંધાવી શકો છો અને તમારી ફરિયાદોની સ્થિતિ જોઈ શકો છો.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
                  <button
                    type="button"
                    onClick={onGoToDashboard}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 shadow-md shadow-emerald-200 hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700 transition-all"
                  >
                    આગળ વધો – ડેશબોર્ડ
                    <span className="text-xs" aria-hidden="true">
                      ➜
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={onLogoutMock}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-emerald-800 text-xs font-medium px-3 py-2 border border-emerald-100 hover:bg-emerald-50/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600 transition-all"
                  >
                    ડેમો સેશન સાફ કરો
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </motion.main>
    </div>
  );
};

