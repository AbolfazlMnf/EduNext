"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const BACKEND_URL = "https://edunext-api.onrender.com";

function PaypalCheckoutContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const amount = searchParams.get("amount");
  const courseName = searchParams.get("courseName");

  const [isLoading, setIsLoading] = useState(false);

  const handlePay = () => {
    setIsLoading(true);

    setTimeout(() => {
      window.location.href = `${BACKEND_URL}/api/payments/verify?token=${token}&PayerID=UX12345`;
    }, 1500);
  };

  const handleCancel = () => {
    window.location.href = `${BACKEND_URL}/api/payments/verify?token=${token}`;
  };

  if (!token) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Invalid Payment Token.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans">
      <header className="bg-white shadow-sm py-4 px-8 flex justify-center border-b border-gray-200">
        <svg
          viewBox="0 0 124 33"
          className="h-7"
          fill="#003087"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265c.46 0 .853-.335.922-.788l.969-6.147a.95.95 0 0 1 .938-.802h2.164c4.428 0 7.378-2.126 8.163-6.606.336-1.921.055-3.535-1.002-4.636-1.285-1.334-3.376-2.018-5.439-2.018zm1.611 6.551c-.461 2.651-2.484 2.651-4.321 2.651h-1.487l.732-4.646h1.22c1.337 0 2.593-.056 3.269.645.474.492.684 1.259.587 2.35zM68.746 6.749h-3.414c-.394 0-.742.23-.878.583l-5.61 14.778-1.956-11.895a.948.948 0 0 0-.91-.79h-3.447a.57.57 0 0 0-.547.747l4.02 12.839-4.223 10.97a.57.57 0 0 0 .531.774h3.535a.944.944 0 0 0 .882-.596l11.602-27.14a.57.57 0 0 0-.528-.806z" />
          <path
            d="M106.87 6.749h-6.84a.95.95 0 0 0-.938.802l-2.767 17.537a.57.57 0 0 0 .564.658h3.265c.461 0 .853-.335.922-.788l.97-6.147a.95.95 0 0 1 .938-.802h2.163c4.428 0 7.378-2.126 8.164-6.606.335-1.921.054-3.535-1.002-4.636-1.286-1.334-3.377-2.018-5.439-2.018zm1.611 6.551c-.46 2.651-2.484 2.651-4.32 2.651h-1.488l.732-4.646h1.22c1.336 0 2.593-.056 3.269.645.473.492.684 1.259.587 2.35zM88.723 6.749h-3.364a.955.955 0 0 0-.904.654l-1.936 6.002-1.74-5.836a.95.95 0 0 0-.91-.676h-3.518a.57.57 0 0 0-.54.74l3.593 11.231-2.222 5.923a.57.57 0 0 0 .532.77h3.364a.948.948 0 0 0 .886-.612l6.27-17.433a.57.57 0 0 0-.533-.763zM116.368 6.749h-3.265a.95.95 0 0 0-.938.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.802l2.766-17.537a.57.57 0 0 0-.565-.658z"
            fill="#009CDE"
          />
          <path
            d="M25.756 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.264c.461 0 .853-.335.923-.788l.969-6.147a.95.95 0 0 1 .938-.802h2.164c4.428 0 7.378-2.126 8.163-6.606.336-1.921.055-3.535-1.002-4.636-1.285-1.334-3.376-2.018-5.439-2.018zm1.611 6.551c-.461 2.651-2.484 2.651-4.321 2.651h-1.487l.732-4.646h1.22c1.336 0 2.593-.056 3.269.645.474.492.684 1.259.587 2.35z"
            fill="#003087"
          />
        </svg>
      </header>

      <main className="max-w-4xl mx-auto pt-10 px-4 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/3 order-2 md:order-1 flex flex-col items-center md:items-start md:pt-4">
          <p className="text-gray-500 text-sm mb-1">Youre buying</p>
          <h2 className="text-xl font-medium text-gray-800 text-center md:text-left leading-tight mb-4">
            {courseName || "Online Course"}
          </h2>
          <div className="text-4xl font-light text-gray-900 mb-6">
            ${amount ? Number(amount).toLocaleString() : "0.00"}
            <span className="text-lg text-gray-500 ml-1">USD</span>
          </div>
          <button
            onClick={handleCancel}
            className="text-[#0070BA] font-medium text-sm hover:underline"
          >
            Cancel and return to EduNext
          </button>
        </aside>

        <section className="w-full md:w-2/3 order-1 md:order-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Pay with PayPal
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 py-1 px-3 rounded-full border border-gray-200">
                <span>testuser@example.com</span>
              </div>
            </div>

            <div className="border border-blue-500 rounded-lg p-4 mb-6 bg-blue-50/30 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  defaultChecked
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium">
                    PayPal Balance
                  </span>
                  <span className="text-gray-500 text-sm">Preferred</span>
                </div>
              </div>
              <span className="text-gray-800 font-medium">
                ${amount ? (Number(amount) + 500).toLocaleString() : "0.00"}
              </span>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-4 opacity-60">
              <input
                type="radio"
                disabled
                className="w-5 h-5 text-gray-300 border-gray-300"
              />
              <div className="flex flex-col">
                <span className="text-gray-500 font-medium">
                  Visa •••• 1234
                </span>
                <span className="text-gray-400 text-sm">Debit</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-gray-50 flex flex-col items-center">
            <button
              onClick={handlePay}
              disabled={isLoading}
              className={`w-full max-w-sm rounded-full py-3.5 px-6 font-bold text-lg text-white transition-all shadow-md flex justify-center items-center ${
                isLoading
                  ? "bg-[#0070BA] opacity-70 cursor-not-allowed"
                  : "bg-[#0070BA] hover:bg-[#005ea6]"
              }`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Complete Purchase"
              )}
            </button>
            <p className="text-xs text-gray-500 text-center mt-4 max-w-sm">
              By continuing, you agree to PayPals terms and conditions. This is
              a simulated environment.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function PaypalCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
          <p className="text-gray-500">Loading checkout...</p>
        </div>
      }
    >
      <PaypalCheckoutContent />
    </Suspense>
  );
}
