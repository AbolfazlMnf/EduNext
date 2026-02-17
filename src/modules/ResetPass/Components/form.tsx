"use client";

import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    setTimeout(() => {
      setLoading(false);
      setMessage("If this email exists, a reset link has been sent.");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full animate-fadeInSlow">
      <div className="relative mb-6">
        <Mail size={22} className="absolute top-3 left-4 text-gray-400" />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border w-full py-2 rounded-md outline-none pl-12 pr-4 
          border-[#ccc] 
          focus:border-[#644DB3] focus:ring-1 focus:ring-[#644DB3]
          dark:bg-transparent dark:text-white
          transition-all duration-300"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mb-4 bg-gradient-to-b 
        from-[#644DB3] to-[#5B48AC] 
        text-white py-2 rounded-md 
        flex items-center justify-center gap-2
        hover:opacity-90 active:scale-95
        transition-all duration-200"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Sending...
          </>
        ) : (
          "Send Reset Link"
        )}
      </button>

      {message && (
        <p className="text-green-500 text-sm text-center animate-fadeIn">
          {message}
        </p>
      )}
    </form>
  );
}
