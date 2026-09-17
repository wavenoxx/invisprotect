import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BRAND_CONFIG } from "@/config/brand";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { trackEngagement } from "@/lib/analytics";
import { buildConsultationWhatsappUrl } from "@/lib/consultation-whatsapp";
import { buildMetaTags } from "@/lib/seo";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/consultation")({
  head: () =>
    buildMetaTags({
      title: `Private Site Survey — ${BRAND_CONFIG.name}`,
      description: `Schedule a complimentary on-site laser measurement and architectural safety evaluation with ${BRAND_CONFIG.name}. Transparent specification and certified technical installation.`,
      canonicalPath: "/consultation",
      noIndex: true,
    }),
  component: ConsultationPage,
});

interface ServiceOption {
  id: string;
  name: string;
  category: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "balcony-invisible-grills",
    name: "Balcony Invisible Grills",
    category: "Invisible Grills",
  },
  { id: "windows-invisible-grills", name: "Window Invisible Grills", category: "Invisible Grills" },
  {
    id: "staircase-invisible-grills",
    name: "Staircase Invisible Grills",
    category: "Invisible Grills",
  },
  {
    id: "child-safety-invisible-grills",
    name: "Child Safety Grills",
    category: "Invisible Grills",
  },
  { id: "balcony-safety-nets", name: "Balcony Safety Nets", category: "Core Safety Nets" },
  { id: "children-safety-nets", name: "Children Safety Nets", category: "Core Safety Nets" },
  { id: "pigeon-safety-nets", name: "Pigeon Protection Nets", category: "Bird Protection" },
  { id: "stainless-steel-bird-spikes", name: "Stainless Bird Spikes", category: "Bird Protection" },
  { id: "construction-safety-nets", name: "Industrial & Debris Nets", category: "Specialty" },
  { id: "sports-practice-nets", name: "Sports Practice Nets", category: "Specialty" },
];

function ConsultationPage() {
  // Form State
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [pincode, setPincode] = useState("");
  const [localityCity, setLocalityCity] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [notes, setNotes] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-select service if passed in URL search params
  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get("service");
    if (serviceParam) {
      const match = SERVICE_OPTIONS.find(
        (s) =>
          s.id === serviceParam || s.category.toLowerCase().includes(serviceParam.toLowerCase()),
      );
      if (match) {
        setSelectedServices((prev) => (prev.includes(match.id) ? prev : [...prev, match.id]));
      }
    }
  }, []);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const isFormValid = useMemo(() => {
    const cleanPhone = phone.replace(/\D/g, "");
    return (
      selectedServices.length > 0 &&
      /^\d{6}$/.test(pincode.trim()) &&
      localityCity.trim().length >= 2 &&
      cleanPhone.length === 10 &&
      fullName.trim().length >= 2
    );
  }, [selectedServices, pincode, localityCity, phone, fullName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPhone = phone.replace(/\D/g, "");
    if (selectedServices.length === 0) {
      setErrorMessage("Please select at least one architectural safety service.");
      return;
    }
    if (fullName.trim().length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (cleanPhone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (localityCity.trim().length < 2) {
      setErrorMessage("Please enter your locality or city.");
      return;
    }
    if (!/^\d{6}$/.test(pincode.trim())) {
      setErrorMessage("Please enter a valid 6-digit pincode.");
      return;
    }

    const serviceNames = SERVICE_OPTIONS.filter((service) =>
      selectedServices.includes(service.id),
    ).map((service) => service.name);
    const whatsappUrl = buildConsultationWhatsappUrl(BRAND_CONFIG.contact.whatsappLink, {
      name: fullName,
      mobile: cleanPhone,
      serviceNames,
      localityCity,
      pincode,
      notes,
    });

    try {
      trackEngagement("whatsapp", "consultation_quote");
    } catch (trackErr) {
      console.warn("[Analytics] Track notice:", trackErr);
    }

    window.location.assign(whatsappUrl);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917] min-h-screen flex flex-col selection:bg-[#F37021]/20">
      <SiteNav />

      <main className="flex-1 max-w-4xl mx-auto px-6 md:px-12 pt-32 sm:pt-36 pb-28 w-full">
        <div className="w-full">
          {/* Header / Editorial Intro */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="sn-eyebrow text-[#F37021] mb-3 block font-medium">
              Private Commission
            </span>
            <h1 className="sn-h1 text-[#1C1917] mb-3">The Private Site Survey</h1>
            <p className="sn-subtext text-[#44403C] max-w-lg mx-auto">
              Complimentary digital laser calibration, structural anchorage evaluation, and
              architectural specification across Telangana &amp; Andhra Pradesh.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-16">
            {/* SECTION 01: SERVICE SELECTION */}
            <section className="space-y-6">
              <div className="border-b border-[#1C1917]/10 pb-4 flex items-baseline justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#F37021] uppercase block mb-1 font-medium">
                    01 / Safety Solutions Required
                  </span>
                  <h2 className="font-serif text-lg md:text-xl font-light text-[#1C1917] uppercase tracking-wider">
                    Select Architectural Solutions
                  </h2>
                </div>
                <span className="text-[10px] text-[#78716C] font-light tracking-wide">
                  {selectedServices.length} selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map((srv) => {
                  const isSelected = selectedServices.includes(srv.id);
                  return (
                    <button
                      type="button"
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`flex items-center justify-between p-4 text-left transition-all duration-300 cursor-pointer border ${
                        isSelected
                          ? "bg-[#F37021]/8 border-[#F37021] text-[#1C1917] shadow-sm"
                          : "bg-white border-[#1C1917]/10 text-[#44403C] hover:border-[#F37021]/50 hover:shadow-xs"
                      }`}
                    >
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-[#F37021] uppercase block font-medium">
                          {srv.category}
                        </span>
                        <span className="font-serif text-sm font-light text-[#1C1917] tracking-wide mt-0.5 block">
                          {srv.name}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-[#F37021] bg-[#F37021] text-white"
                            : "border-[#1C1917]/25 bg-transparent"
                        }`}
                      >
                        {isSelected && <Check size={11} strokeWidth={2.5} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SECTION 02: LOCATION & SANCTUARY CONTACT */}
            <section className="space-y-6">
              <div className="border-b border-[#1C1917]/10 pb-4">
                <span className="text-[9px] font-mono tracking-widest text-[#F37021] uppercase block mb-1 font-medium">
                  02 / Location &amp; Contact
                </span>
                <h2 className="font-serif text-lg md:text-xl font-light text-[#1C1917] uppercase tracking-wider">
                  Site Details &amp; Client Ledger
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Pincode */}
                <div className="space-y-2">
                  <label
                    htmlFor="pincode"
                    className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#78716C] block"
                  >
                    Pincode <span className="text-[#F37021]">*</span>
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    placeholder="e.g. 500033"
                    autoComplete="postal-code"
                    required
                    className="w-full bg-white border border-[#1C1917]/15 px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#F37021] focus:outline-none transition-colors"
                  />
                </div>

                {/* Locality & City */}
                <div className="space-y-2">
                  <label
                    htmlFor="localityCity"
                    className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#78716C] block"
                  >
                    Locality &amp; City <span className="text-[#F37021]">*</span>
                  </label>
                  <input
                    id="localityCity"
                    type="text"
                    value={localityCity}
                    onChange={(e) => setLocalityCity(e.target.value)}
                    placeholder="e.g. Jubilee Hills, Hyderabad"
                    autoComplete="address-level2"
                    required
                    className="w-full bg-white border border-[#1C1917]/15 px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#F37021] focus:outline-none transition-colors"
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#78716C] block"
                  >
                    Mobile Number <span className="text-[#F37021]">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-sm font-medium text-[#78716C]">+91</span>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="98765 43210"
                      autoComplete="tel-national"
                      required
                      className="w-full bg-white border border-[#1C1917]/15 pl-14 pr-4 py-3 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#F37021] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Client Full Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#78716C] block"
                  >
                    Client Name <span className="text-[#F37021]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Anand Varma"
                    autoComplete="name"
                    required
                    className="w-full bg-white border border-[#1C1917]/15 px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#F37021] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Optional Architectural Notes */}
              <div className="space-y-2 pt-2">
                <label
                  htmlFor="notes"
                  className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#78716C] block"
                >
                  Architectural Notes / Specific Openings{" "}
                  <span className="text-[#A8A29E] font-normal">(Optional)</span>
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 14th-floor balcony with curved railing, master bedroom french windows, child safety requirements."
                  className="w-full bg-white border border-[#1C1917]/15 px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#F37021] focus:outline-none transition-colors resize-none"
                />
              </div>
            </section>

            <section className="space-y-6 pt-4 border-t border-[#1C1917]/10">
              {errorMessage && (
                <div className="p-4 border border-red-500/40 bg-red-50 text-red-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Submit Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-[11px] font-light text-[#78716C]">
                  Complimentary evaluation · Zero sales pressure · Direct engineering estimate
                </p>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="sn-btn-luxury-solid w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Send Quote Request on WhatsApp
                  <ArrowRight size={12} className="ml-2" />
                </button>
              </div>
            </section>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ConsultationPage;
