import React from 'react';
import { CreditCard, Calendar, FileText, Plane, Building, AlertCircle, ShieldCheck, Info } from 'lucide-react';

const PolicyPage = () => {
  const sections = [
    {
      id: 1,
      title: "1. Payment Policy - Umrah Packages",
      icon: <CreditCard className="text-emerald-700" size={20} />,
      content: "We facilitate payment for our customers through a simple and clear installment system that ensures complete comfort and full transparency.",
      list: [
        "First Payment (50%) - Upon Booking: Confirming the package and starting visa and hotel procedures",
        "Second Payment (25%) - After 15 days: Confirming hotel arrangements and essential services",
        "Third Payment (25%) - 30 days before travel: Completing the amount and issuing final travel tickets"
      ],
      footer: "All payments are processed securely through approved payment methods."
    },
    {
      id: 2,
      title: "2. Visa Refund Policy",
      icon: <FileText className="text-emerald-700" size={20} />,
      content: "Visa processing involves specific regulations and fees that affect refund policies:",
      list: [
        "Once the visa is issued, its value cannot be refunded",
        "Visa fees are deducted from any amount paid",
        "Processing fees are non-refundable regardless of cancellation timing"
      ],
      footer: "Visa regulations are subject to the issuing country's policies and cannot be modified."
    },
    {
      id: 3,
      title: "3. Flight Tickets Refund Policy",
      icon: <Plane className="text-emerald-700" size={20} />,
      content: "Flight ticket refunds are governed by airline policies and fare conditions:",
      list: [
        "Refund policy depends on the terms and conditions of the airline through which the booking was made",
        "Cancellation or change fees are applied according to each airline's system",
        "Some tickets may be non-refundable depending on the booked class"
      ],
      footer: "Airline policies vary and are beyond our direct control."
    },
    {
      id: 4,
      title: "4. Hotel Accommodation Refund Policy",
      icon: <Building className="text-emerald-700" size={20} />,
      content: "Hotel cancellation policies depend on booking terms and timing:",
      list: [
        "Full refund is available if cancellation is requested 20 days before the trip date",
        "Cancellations made less than 20 days in advance may incur deductions depending on hotel availability and provider policy",
        "Special rates and packages may have different cancellation terms"
      ],
      footer: "Hotel policies are set by individual properties and booking platforms."
    },
    {
      id: 5,
      title: "5. Cancellation Processing",
      icon: <AlertCircle className="text-emerald-700" size={20} />,
      content: "All cancellation requests are handled with care and transparency:",
      list: [
        "Cancellation requests are processed within a reasonable time frame",
        "Customers are notified of the final refund percentage before processing",
        "Refunds are issued to the original payment method within 7-14 business days",
        "Processing fees may apply depending on the cancellation timing"
      ],
      footer: "We strive to minimize financial impact while maintaining service quality."
    }
  ];

  return (
    <div className="w-full bg-white font-sans text-slate-800 border-t border-gray-100">
      {/* Policy Header */}
      <div className="w-full bg-emerald-50/50 py-6 px-4 md:px-12 border-b border-emerald-100 text-center">
        <h1 className="text-2xl font-bold text-emerald-900">Price Policy, Payment Methods & Cancellation Policy</h1>
        <p className="text-emerald-700 text-sm mt-2 font-medium">SabilHajj Platform — Transparent Pricing & Clear Terms</p>
      </div>

      <div className="w-full px-4 md:px-12 py-10 max-w-7xl mx-auto">
        <p className="text-slate-600 mb-10 leading-relaxed text-center max-w-4xl mx-auto">
          At SabilHajj, we believe in complete transparency in our pricing and policies.
          Our payment structure and cancellation terms are designed to protect both pilgrims and service quality.
        </p>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div key={section.id} className="p-6 rounded-xl border border-slate-100 bg-slate-50/30 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                {section.icon}
                <h2 className="text-lg font-bold text-emerald-900">{section.title}</h2>
              </div>
              <p className="text-sm text-slate-700 mb-4 leading-relaxed">{section.content}</p>
              <ul className="space-y-2 mb-4">
                {section.list.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <ShieldCheck className="text-emerald-600 mt-1 shrink-0" size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {section.footer && (
                <div className="pt-3 border-t border-slate-200 mt-auto italic text-xs text-slate-500">
                  {section.footer}
                </div>
              )}
            </div>
          ))}

          {/* Transparency & Consent Box */}
          <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50/30 lg:col-span-2">
            <h2 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
              <Info size={20} /> 6. Important Financial Terms & Transparency Policy
            </h2>
            <p className="text-sm text-slate-700 mb-3">Completing the booking through SabilHajj constitutes explicit understanding of:</p>
            <div className="flex flex-wrap gap-4">
              {["Payment schedule and deadlines", "Cancellation and refund policies", "Processing fees and charges", "Third-party provider terms"].map((item, i) => (
                <span key={i} className="bg-white px-3 py-1 rounded-full border border-emerald-100 text-xs text-emerald-800 font-medium">
                  • {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Commitment */}
        <div className="mt-16 text-center border-t border-slate-100 pt-10">
          <h3 className="text-xl font-bold text-emerald-900 mb-6">Our Financial Commitment to Pilgrims</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Clear pricing with no hidden fees",
              "Flexible payment installments",
              "Fair cancellation policies",
              "Transparent refund processing"
            ].map((text, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <p className="text-xs font-medium text-slate-600">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 opacity-60">
            <p className="text-sm font-bold text-emerald-900">SabilHajj</p>
            <p className="text-xs text-slate-500">Global Islamic Travel Platform</p>
            <p className="text-xs font-bold text-emerald-800 mt-2 uppercase tracking-widest">
              Transparent Pricing • Fair Policies • Trust Built on Clarity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;