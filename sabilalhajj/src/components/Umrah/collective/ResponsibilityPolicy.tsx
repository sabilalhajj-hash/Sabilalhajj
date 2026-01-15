import React from 'react';
import { ShieldCheck, PlaneTakeoff, Users, UserPlus, FileText, CheckCircle, Info } from 'lucide-react';

const ResponsibilityPolicy = () => {
  const sections = [
    {
      id: 1,
      title: "1. Scope of Platform Commitments",
      icon: <ShieldCheck className="text-emerald-700" size={20} />,
      content: "SabilHajj platform is committed to implementing the program as shown and announced within the selected package page, and this includes only the services mentioned within the program details, such as:",
      list: [
        "Accommodation according to the specified category and location",
        "Announced group transfers",
        "Sites included in the program",
        "Religious guidance and group accompaniment during Umrah performance"
      ],
      footer: "SabilHajj does not bear any commitment to services or requests not mentioned within the announced program."
    },
    {
      id: 2,
      title: "2. Airlines and External Providers",
      icon: <PlaneTakeoff className="text-emerald-700" size={20} />,
      content: "Some components of the trip depend on independent and approved providers (such as airlines, hotels, and transportation companies). SabilHajj therefore:",
      list: [
        "Flight schedules, delays, cancellations, or modifications are subject to the terms and regulations of the operating airline",
        "SabilHajj does not bear responsibility for circumstances beyond its control, such as: Weather conditions, Operational decisions of airlines, or Official/emergency decisions"
      ],
      footer: "SabilHajj is committed in all cases to informing the pilgrim and providing organizational support as much as possible without bearing direct responsibility for these situations."
    },
    {
      id: 3,
      title: "3. Nature of Group Programs",
      icon: <Users className="text-emerald-700" size={20} />,
      content: "All programs offered through SabilHajj are organized group programs, and are based on:",
      list: [
        "Commitment to the announced schedule",
        "Respecting the instructions of the guide and supervisors",
        "Collective cooperation to ensure the smooth running of the trip"
      ],
      footer: "Any violation of these controls may affect the general organization without SabilHajj bearing responsibility for that."
    },
    {
      id: 4,
      title: "4. Individual Requests and Non-Included Services",
      icon: <UserPlus className="text-emerald-700" size={20} />,
      content: "In order to maintain the quality of organization and fairness among all group members at SabilHajj:",
      list: [
        "Any requests or additional services outside the program framework (such as special arrangements, individual changes, or unannounced services) are not within SabilHajj's commitments",
        "Any individual arrangements outside the program are made at the pilgrim's personal responsibility"
      ]
    },
    {
      id: 5,
      title: "5. Visas and Insurance",
      icon: <FileText className="text-emerald-700" size={20} />,
      content: "SabilHajj provides technical and organizational support to the pilgrim in visa procedures according to the selected type. Note that:",
      list: [
        "The selected visa type (Umrah or tourist) may affect the nature of insurance, some services, and package cost",
        "The official regulations approved by the competent authorities remain the final reference in all cases"
      ]
    }
  ];

  return (
    <div className="w-full bg-white font-sans text-slate-800 border-t border-gray-100">
      {/* Policy Header */}
      <div className="w-full bg-emerald-50/50 py-6 px-4 md:px-12 border-b border-emerald-100 text-center">
        <h1 className="text-2xl font-bold text-emerald-900">Responsibility and Organization Policy</h1>
        <p className="text-emerald-700 text-sm mt-2 font-medium">SabilHajj Platform — SabilHajj</p>
      </div>

      <div className="w-full px-4 md:px-12 py-10 max-w-7xl mx-auto">
        <p className="text-slate-600 mb-10 leading-relaxed text-center max-w-4xl mx-auto">
          SabilHajj is committed to providing an organized, transparent, and respectful religious travel experience,
          based on complete clarity in services and responsibilities, ensuring the pilgrim's rights and providing peace of mind.
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
                    <CheckCircle className="text-emerald-600 mt-1 shrink-0" size={14} />
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
              <Info size={20} /> 6. Transparency and Consent Policy
            </h2>
            <p className="text-sm text-slate-700 mb-3">Completing the booking through SabilHajj constitutes explicit consent from the pilgrim to:</p>
            <div className="flex flex-wrap gap-4">
              {["The details of the selected program", "Included and non-included services", "The responsibility and organization policy"].map((item, i) => (
                <span key={i} className="bg-white px-3 py-1 rounded-full border border-emerald-100 text-xs text-emerald-800 font-medium">
                  • {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Commitment */}
        <div className="mt-16 text-center border-t border-slate-100 pt-10">
          <h3 className="text-xl font-bold text-emerald-900 mb-6">Our Commitment to the Pilgrim</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Do not make unfulfillable promises",
              "Do not burden the pilgrim with unclear commitments",
              "Work to organize the trip professionally and calmly",
              "Leave to the pilgrim what is most important: focusing on worship"
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
              Clear Organization • Defined Responsibility • Trust Built on Transparency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsibilityPolicy;