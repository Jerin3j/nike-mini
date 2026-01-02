"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Step = "phone" | "otp" | "name";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

const Page = () => {
  const router = useRouter();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const OTP_LENGTH = 4;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [serverOtp, setServerOtp] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [name, setName] = useState("");
  const [counter, setCounter] = useState(0); // countdown in seconds
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (disabled && counter > 0) {
      timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    } else if (counter === 0 && disabled) {
      setDisabled(false); // re-enable button
    }
    return () => clearInterval(timer);
  }, [counter, disabled]);

  /* API CALLS  */

  const verifyPhone = async () => {
    if (!phone) return alert("Enter phone number");

    const res = await fetch(`${BASE_URL}api/verify/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: phone }),
    });

    const data = await res.json();

    setServerOtp(data.otp);
    setIsExistingUser(data.user);

    // Existing user → direct login
    if (data.user && data.token?.access) {
      localStorage.setItem("access_token", data.token.access);
      router.push("/");
      return;
    }

    setStep("otp");
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp !== serverOtp) {
      alert("Invalid OTP");
      return;
    }

    setStep("name");
  };

  const resendOtp = async () => {
    try {
      const res = await fetch(`${BASE_URL}api/verify/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Failed to resend OTP");
        return;
      }

      setServerOtp(data.otp);

      // start timer ONLY after success
      setCounter(30);
      setDisabled(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const registerUser = async () => {
    if (!name) return alert("Enter your name");

    const res = await fetch(`${BASE_URL}/api/login-register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone_number: phone,
      }),
    });

    const data = await res.json();

    localStorage.setItem("access_token", data.token.access);
    router.push("/");
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-10 text-white">
      <div className="flex w-full items-center gap-10">
        <img
          src="/login-image.png"
          alt="Login visual"
          className="w-[720px] h-[870px] hidden md:block"
        />

        <div className="w-full max-w-xl space-y-6">
          {/* STEP 1 — PHONE */}
          {step === "phone" && (
            <>
              <h2 className="text-2xl font-semibold text-center">Log In</h2>

              <label className="flex flex-col gap-2">
                <span>Phone</span>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl bg-neutral-800 px-4 py-3 outline-none"
                />
              </label>

              <button
                onClick={verifyPhone}
                className="w-full rounded-xl bg-white py-3 text-black font-semibold"
              >
                Continue
              </button>
            </>
          )}

          {/* STEP 2 — OTP */}
          {step === "otp" && (
            <>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold">Verify phone</h2>
                <p className="text-sm text-gray-400 flex justify-center items-center gap-1">
                  Enter the OTP sent to {phone}
                  <img onClick={()=> setStep("phone")} src="/pencil-icon.svg" alt="pencil icon" className="w-4 h-4 cursor-pointer"/>
                </p>
              </div>

              <label className="flex flex-col gap-2">
                <span>OTP Code</span>
                <div className="flex justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el: any) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      className="h-18 w-28 rounded-xl bg-neutral-800 text-center text-xl outline-none"
                    />
                  ))}
                </div>
              </label>

              <p className="text-sm text-gray-400 text-start">
                {disabled ? (
                  <>
                    Resend OTP in <span className="text-white">{counter}s</span>
                  </>
                ) : (
                  <button
                    onClick={resendOtp}
                    className="text-white underline font-medium cursor-pointer"
                  >
                    Resend OTP
                  </button>
                )}
              </p>

              <button
                onClick={verifyOtp}
                className="w-full rounded-xl bg-white py-3 text-black font-semibold"
              >
                Verify
              </button>
            </>
          )}

          {/* STEP 3 — NAME */}
          {step === "name" && (
            <>
              <h2 className="text-2xl font-semibold text-center">
                Welcome, you are?
              </h2>

              <label className="flex flex-col gap-2">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl bg-neutral-800 px-4 py-3 outline-none"
                />
              </label>

              <button
                onClick={registerUser}
                className="w-full rounded-xl bg-white py-3 text-black font-semibold"
              >
                Continue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
