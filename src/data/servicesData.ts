export interface ServiceDetail {
  id: string;
  title: string;
  plainDescriptor: string;
  editorialTitle?: string;
  category: string;
  description: string;
  detailParagraphs: string[];
  images: string[];
  specs: { label: string; value: string }[];
  processSteps?: string[];
}

export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategoryDetail {
  id: string;
  title: string;
  plainDescriptor: string;
  quote: string;
  heroImage: string;
  services: string[];
  overview: string;
  applications: string[];
  materials: { name: string; detail: string }[];
  measurementProcess: string;
  installationMethod: string;
  maintenanceGuide: string;
  limitations: string;
  faqs: CategoryFaq[];
}

export const categoriesData: Record<string, CategoryDetail> = {
  "invisible-grills": {
    id: "invisible-grills",
    title: "Invisible Grills",
    plainDescriptor: "High-Tensile Stainless Steel Cable Safety Grills",
    quote: "A dialogue between open space and architectural safety.",
    heroImage: "/images/category-invisible-grills.png",
    services: [
      "balcony-invisible-grills",
      "staircase-invisible-grills",
      "windows-invisible-grills",
      "child-safety-invisible-grills",
    ],
    overview:
      "Our Invisible Grills are modern architectural fall-prevention systems engineered for high-rise balconies, stairwells, and windows. Made with high-tensile AISI 316 marine-grade stainless steel cables encased in clear UV-stabilized Nylon-12, they provide robust edge protection while maintaining uninterrupted panoramic views and building exterior aesthetics.",
    applications: [
      "High-rise residential apartment balconies and utility decks",
      "Full-height French windows and sliding glass fenestrations",
      "Internal open staircases, duplex mezzanine edges, and atriums",
      "Commercial office breakout spaces and terrace corridors",
    ],
    materials: [
      {
        name: "AISI 316 Marine-Grade Core",
        detail:
          "High-tensile 316-grade austenitic stainless steel wire rope (7x7 / 7x19 construction) offering high corrosion resistance even in high-humidity and coastal environments.",
      },
      {
        name: "Virgin Nylon-12 Thermoplastic Sheath",
        detail:
          "UV-stabilized, non-reactive outer polymer jacket protecting against atmospheric oxidation, dust abrasion, and direct skin contact.",
      },
      {
        name: "6063-T6 Extruded Aluminum Track",
        detail:
          "Structural extruded aluminum top and bottom channel profile with anodized or powder-coated finish matching your facade palette.",
      },
    ],
    measurementProcess:
      "Our technicians perform precision digital laser measurements across all structural boundaries. We evaluate RCC wall density, balcony parapet alignment, railing load points, and structural clearances to fabricate custom-dimensioned aluminum tracks with uniform cable spacing (typically 2-inch for child protection or 3-inch for standard openings).",
    installationMethod:
      "Diamond-core drill bits are used to anchor the aluminum track profiles into RCC slabs or brickwork with heavy-duty stainless steel anchor fasteners. High-tensile cables are threaded continuously through precision nylon grommets and mechanically tensioned using calibrated dual-key locking mechanisms before final inspection handover.",
    maintenanceGuide:
      "Clean every 3 to 6 months using a soft microfiber cloth dampened with clean freshwater and mild neutral soap. Avoid abrasive scouring pads, hydrochloric acid, or harsh tile cleaners. For coastal residences, monthly freshwater wiping preserves the clear luster of the polymer sheath.",
    limitations:
      "Invisible grills are engineered primarily as fall-prevention barriers and child safety systems; they are not intended to withstand automotive vehicular impacts or replace structural load-bearing balustrades. In case of emergency fire evacuation, cables can be severed rapidly with standard handheld wire cutters.",
    faqs: [
      {
        question: "Can invisible grills be cut during a fire emergency?",
        answer:
          "Yes. Unlike traditional wrought iron grates that require power angle grinders or welding torches to breach, our stainless steel cables can be cleanly severed in seconds with a heavy-duty handheld wire cutter for emergency egress.",
      },
      {
        question: "Will the cables rust or discolor over time?",
        answer:
          "We use authentic AISI 316 marine-grade stainless steel with a protective Nylon-12 sheath. Under normal atmospheric conditions and regular freshwater maintenance, the system resists corrosion, tarnishing, and UV yellowing.",
      },
      {
        question: "What cable spacing options are available?",
        answer:
          "We offer 2-inch (50 mm) micro-spacing recommended for homes with infants, toddlers, and small pets, as well as 3-inch (75 mm) spacing for standard balconies and window safety.",
      },
      {
        question: "How long does installation take?",
        answer:
          "A standard 2-to-3 balcony installation is typically completed within 4 to 8 hours following initial laser site survey and track fabrication.",
      },
    ],
  },
  "core-safety-nets": {
    id: "core-safety-nets",
    title: "Core Safety Nets",
    plainDescriptor: "UV-Stabilized High-Density Safety Netting Systems",
    quote: "The quiet embrace of edge-to-edge fall containment.",
    heroImage: "/images/category-core-safety-nets.png",
    services: [
      "balcony-safety-nets",
      "children-safety-nets",
      "staircase-safety-nets",
      "building-safety-nets",
    ],
    overview:
      "Our Core Safety Nets provide dependable containment solutions for apartment balconies, open stairwells, and structural building shafts. Fabricated from 100% virgin high-density polyethylene (HDPE) monofilament with integrated UV carbon stabilizers, they absorb kinetic impact and prevent accidental falls without obstructing airflow or daylight.",
    applications: [
      "Balcony open perimeters and utility wash areas",
      "Multi-story staircase voids and elevator shaft drops",
      "School, daycare, and children play area balconies",
      "Building duct shafts, courtyards, and lightwells",
    ],
    materials: [
      {
        name: "Virgin HDPE Monofilament",
        detail:
          "High-Density Polyethylene polymers spun into multi-strand twisted cords with high tensile breaking strength and flexibility.",
      },
      {
        name: "Thermal UV-Stabilization",
        detail:
          "Formulated with UV absorbers and carbon additives to prevent polymer chain degradation from intense tropical sunlight.",
      },
      {
        name: "Marine-Grade Fasteners",
        detail:
          "Non-corrosive stainless steel expansion eye-bolts, stainless steel wire borders, and heavy-duty nylon anchor ties.",
      },
    ],
    measurementProcess:
      "Technicians measure full perimeter drops including uneven ceiling beams, side pillars, and parapet walls. Custom net panels are drafted to exact site geometry to ensure tensioned, sag-free alignment without open gaps.",
    installationMethod:
      "Perimeter stainless steel anchor hooks are embedded into masonry or concrete at 8-to-12 inch intervals. A high-tensile border cord is tensioned around the perimeter, and the net mesh is laced tightly to the border with secure knotting.",
    maintenanceGuide:
      "Rinse with garden hose water every 6 months to dislodge accumulated urban dust and bird feathers. Do not use open flames, solvent-based paint thinners, or sharp abrasive tools near the net fibers.",
    limitations:
      "HDPE safety netting is designed for fall containment and debris capture; it should not be subjected to sharp cutting blades, chemical acid splashes, or direct open heat sources.",
    faqs: [
      {
        question: "How long do HDPE safety nets last under direct sunlight?",
        answer:
          "Our UV-stabilized virgin HDPE nets typically maintain structural integrity for 3 to 5+ years under standard tropical sun exposure, backed by a documented material warranty.",
      },
      {
        question: "Does the netting block ventilation or balcony airflow?",
        answer:
          "No. The open diamond mesh geometry allows over 90% of natural airflow and sunlight to pass freely into your home while maintaining complete perimeter containment.",
      },
      {
        question: "Can these nets safely protect children and pets?",
        answer:
          "Yes. Our children safety net specifications use reinforced mesh gauges with tightly spaced knots engineered to prevent children or pets from squeezing through railings.",
      },
      {
        question: "What happens if a net cord gets cut?",
        answer:
          "Our nets feature heat-set knotted construction. If one mesh cord is cut, the surrounding knots prevent the entire net from unraveling.",
      },
    ],
  },
  "construction-industrial": {
    id: "construction-industrial",
    title: "Construction & Industrial",
    plainDescriptor: "Heavy-Duty Structural & Debris Containment Systems",
    quote: "Industrial strength engineered for active structural horizons.",
    heroImage: "/images/category-construction-industrial.png",
    services: [
      "construction-safety-nets",
      "industrial-safety-nets",
      "terrace-top-nets",
      "car-parking-safety-nets",
    ],
    overview:
      "Heavy-duty safety containment grids engineered for active commercial job sites, multi-story building perimeters, industrial mezzanine floors, and parking facilities. Designed to catch falling tools, structural debris, and provide personnel fall-arrest containment in accordance with standard safety protocols.",
    applications: [
      "Active high-rise construction scaffolds and perimeter perimeters",
      "Industrial warehouse storage racks and mezzanine edges",
      "Commercial building open terrace tops and skylight covers",
      "Residential & commercial basement car parking canopies",
    ],
    materials: [
      {
        name: "Braided Polyamide (Nylon) & High-Tenacity Polypropylene",
        detail:
          "Multi-filament braided construction offering high kinetic energy absorption and shock resistance.",
      },
      {
        name: "Reinforced Debris Lining",
        detail:
          "Secondary micro-mesh overlay (shade net / mono-screen) to capture small falling debris, masonry aggregate, and fasteners.",
      },
      {
        name: "High-Load Steel Carabiners & Wire Ropes",
        detail:
          "Heavy-gauge steel wire boundary ropes, turnbuckles, and industrial D-shackles for structural anchoring.",
      },
    ],
    measurementProcess:
      "Structural engineers evaluate span distance, potential drop heights, scaffold anchoring points, and wind load dynamics to specify appropriate mesh size, border rope diameter, and anchor spacing.",
    installationMethod:
      "Boundary wire ropes are rigged along structural columns or scaffold frameworks using heavy-duty turnbuckles. Net panels are secured using rated carabiners and continuous spiral lacing.",
    maintenanceGuide:
      "Conduct monthly visual inspections for abrasion wear, chemical exposure, or damage from heavy fallen objects. Promptly clear accumulated construction debris to maintain optimal impact deflection.",
    limitations:
      "Must be rigged in accordance with site safety load specifications. Any net panel subjected to a severe heavy impact should be inspected by a safety supervisor before continued use.",
    faqs: [
      {
        question: "Do you supply dual-layer debris and personnel safety nets?",
        answer:
          "Yes. We configure heavy-duty braided personnel arrest nets combined with secondary micro-mesh overlays to capture fine construction debris and dropped hand tools.",
      },
      {
        question: "Can industrial nets be installed across terrace skylights?",
        answer:
          "Yes. We custom-fabricate terrace skylight covers and roof boundary nets anchored to structural metal frames or concrete parapets.",
      },
      {
        question: "What certifications accompany industrial installations?",
        answer:
          "We provide manufacturer material test datasheets, verified technical specifications, and site handover inspection reports for commercial compliance.",
      },
    ],
  },
  "animal-bird-protection": {
    id: "animal-bird-protection",
    title: "Animal & Bird Protection",
    plainDescriptor: "Humane Bird Spikes, Pigeon Nets & Monkey Deterrence",
    quote: "Humane, discreet barriers preserving hygiene and serene living.",
    heroImage: "/images/category-animal-bird-protection.png",
    services: [
      "pigeon-safety-nets",
      "pigeons-bird-spikes",
      "monkey-safety-nets",
      "mosquito-safety-nets",
    ],
    overview:
      "Discreet and humane protective systems designed to safeguard balconies, AC ledges, window sills, and ventilation shafts against pigeon nesting, bird droppings, monkey intrusion, and insect vectors. Our systems maintain clean architectural aesthetics without harming wildlife.",
    applications: [
      "Apartment balconies, utility terraces, and AC outdoor unit ledges",
      "Building window parapets, decorative facade cornices, and signage",
      "Villas and residential societies bordering green belts or forest areas",
      "Bedrooms and living room sliding windows and ventilators",
    ],
    materials: [
      {
        name: "UV Polycarbonate & 304 Stainless Steel Spikes",
        detail:
          "Blunt-tip 304-grade stainless steel rods mounted on flexible, UV-stabilized clear polycarbonate bases that do not injure birds.",
      },
      {
        name: "Translucent / Dark HDPE Bird Netting",
        detail:
          "Ultra-fine 0.8mm to 1.0mm monofilament mesh available in translucent white or dark grey to blend seamlessly into building shadows.",
      },
      {
        name: "Pleated & Fiberglass Mosquito Mesh",
        detail:
          "Precision-woven fiberglass or stainless steel 304 insect screens mounted on slim extruded aluminum sliding or magnetic frames.",
      },
    ],
    measurementProcess:
      "Technicians inspect bird nesting hotspots, ledge depths, AC compressor clearances, and window frame profiles to recommend the ideal blend of netting, spikes, and insect screening.",
    installationMethod:
      "Bird spikes are bonded using exterior-grade neutral-cure silicone adhesives or stainless steel anchor screws. Pigeon netting is tensioned edge-to-edge with no gaps for birds to enter.",
    maintenanceGuide:
      "Spikes are virtually maintenance-free. Netting can be gently rinsed with water to remove dust. Insect screens can be wiped down or vacuumed using a soft brush attachment.",
    limitations:
      "Bird spikes are designed for solid landing ledges and parapets; open balcony voids require perimeter netting for complete exclusion.",
    faqs: [
      {
        question: "Do bird spikes harm pigeons or other birds?",
        answer:
          "No. Our spikes feature blunt tips designed to make landing uncomfortable without piercing or injuring birds, encouraging them to roost elsewhere.",
      },
      {
        question: "Is the pigeon net visible from the ground?",
        answer:
          "Our thin 0.8mm–1.0mm HDPE monofilament lines in translucent or dark tones become virtually invisible when viewed from a distance of 15 to 20 feet.",
      },
      {
        question: "Can bird spikes be installed on curved AC pipes or ledges?",
        answer:
          "Yes. The polycarbonate base is segmented and flexible, allowing it to conform securely to curved surfaces, pipes, and uneven ledges.",
      },
    ],
  },
  "specialty-solutions": {
    id: "specialty-solutions",
    title: "Specialty Solutions",
    plainDescriptor: "Sports Practice Cages, Coconut Drop Nets & Pulley Systems",
    quote: "Bespoke protection crafted for unique architectural requirements.",
    heroImage: "/images/category-specialty-solutions.png",
    services: [
      "sports-practice-nets",
      "coconut-safety-nets",
      "swimming-pool-nets",
      "cloth-drying-hangers",
    ],
    overview:
      "Tailored containment and lifestyle safety installations including custom cricket practice cages, swimming pool perimeter covers, coconut fall-protection canopies, and ceiling-mounted balcony cloth drying pulley systems.",
    applications: [
      "Residential society terrace cricket pitches and sports turfs",
      "Villas and farmhouses with tall coconut palms over parking or walkways",
      "Swimming pool security covers to prevent accidental water falls",
      "Apartment utility balconies and indoor laundry areas",
    ],
    materials: [
      {
        name: "High-Impact Sports Braided Netting",
        detail:
          "High-density nylon and HDPE braided meshes engineered to absorb high-velocity cricket, golf, and football ball impacts.",
      },
      {
        name: "Heavy-Gauge Tree Canopy Netting",
        detail:
          "Thick multi-strand containment grids suspended on structural steel guide cables to decelerate falling coconuts.",
      },
      {
        name: "Stainless Steel 304 / Aluminum Pulley Hardware",
        detail:
          "Heavy-duty nylon pulleys, stainless steel cables, and rust-proof aluminum ceiling rods for cloth drying hangers.",
      },
    ],
    measurementProcess:
      "Site survey accounts for ball trajectory dimensions, tree clearance envelopes, pool water perimeters, or ceiling concrete load points for smooth mechanical pulley operation.",
    installationMethod:
      "Custom steel tension poles, ground anchors, or ceiling anchors are installed to support structural cable networks before securing net panels.",
    maintenanceGuide:
      "Periodically inspect tension turnbuckles and pulley lines for smooth operation. Clear fallen debris and leaves from tree and pool nets.",
    limitations:
      "Sports nets must be specified with appropriate mesh density based on ball diameter (e.g. cricket ball vs golf ball).",
    faqs: [
      {
        question: "Can sports nets be installed on residential apartment terraces?",
        answer:
          "Yes. We design freestanding or roof-anchored cricket practice cages with full top and side enclosures.",
      },
      {
        question: "How do ceiling cloth drying hangers save balcony space?",
        answer:
          "Individual stainless steel or aluminum rods lower effortlessly with smooth nylon pulley cords for loading, then raise flush to the ceiling to preserve floor space.",
      },
    ],
  },
};

export const servicesData: Record<string, ServiceDetail> = {
  "balcony-invisible-grills": {
    id: "balcony-invisible-grills",
    title: "Balcony Invisible Grills",
    plainDescriptor: "Balcony High-Tensile Stainless Steel Cable Grills",
    editorialTitle: "The High-Rise Aperture",
    category: "invisible-grills",
    description:
      "Architectural safety panels offering unobstructed skyline views with precision-engineered fall protection.",
    detailParagraphs: [
      "Your view is a luxury, not a vulnerability. A balcony should be a sanctuary of open horizons, not a source of constant anxiety. Traditional iron grates secure your space by enclosing it, cutting off the breeze and the skyline. We believe you shouldn't have to compromise on natural light or aesthetic calm.",
      "Using precision-engineered AISI 316 marine-grade stainless steel cables wrapped in a translucent nylon-12 protective sleeve, we install an architectural barrier. High tensile resistance paired with high transparency allows you to enjoy true peace of mind.",
    ],
    images: ["/images/balcony-invisible-grills.png"],
    specs: [
      { label: "Material Composition", value: "AISI 316 Marine Grade Stainless Steel Core" },
      { label: "Cable Thickness", value: "2.5 mm / 3.0 mm calibrated options" },
      { label: "Tensile Resistance", value: "High-tensile structural breaking capacity" },
      { label: "Structural Profile", value: "6063-T6 Structural Aluminum Track" },
      {
        label: "Warranty Terms",
        value: "5-Year Material Warranty on Cable & Track Systems",
      },
    ],
    processSteps: [
      "Digital laser perimeter measurement and structural substrate inspection",
      "Precision drilling with diamond-core bits into concrete RCC slabs",
      "Structural aluminum track anchoring with stainless steel expansion fasteners",
      "Continuous cable threading through anti-friction nylon grommets",
      "Mechanical tension locking and individual line calibration",
    ],
  },
  "staircase-invisible-grills": {
    id: "staircase-invisible-grills",
    title: "Staircase Invisible Grills",
    plainDescriptor: "Staircase & Duplex Void Stainless Steel Safety Lines",
    editorialTitle: "The Spiral Ascent",
    category: "invisible-grills",
    description:
      "Graceful vertical safety lines running along staircases, securing stairwells without compromising volume.",
    detailParagraphs: [
      "Open volume shouldn't carry hidden risks. Modern stairwells are architectural statements of light and geometry. Traditional railings feel heavy and intrusive, while open voids provoke anxiety for children and elders. We secure the space without closing in the air.",
      "Our staircase safety lines create a translucent architectural screen. It serves as a structural barrier that blends seamlessly with your handrails, maintaining the spatial elegance of your home's core.",
    ],
    images: ["/images/staircase-invisible-grills.png"],
    specs: [
      { label: "Material Composition", value: "AISI 316 Stainless Steel Core" },
      { label: "Spacing Option", value: "3-inch gap density (stair void protection)" },
      { label: "Tensile Resistance", value: "High-tensile multi-point load resistance" },
      { label: "Mounting Sub-base", value: "Solid wood / marble / RCC anchor bolts" },
      {
        label: "Warranty Terms",
        value: "5-Year Material Warranty on Cable & Track Systems",
      },
    ],
  },
  "windows-invisible-grills": {
    id: "windows-invisible-grills",
    title: "Windows Invisible Grills",
    plainDescriptor: "Window Fenestration Stainless Steel Safety Grids",
    editorialTitle: "The Frameless Fenestration",
    category: "invisible-grills",
    description:
      "Ultra-sleek window safety grids designed to replace bulky, heavy metal iron bars.",
    detailParagraphs: [
      "Eradicate the cage. Traditional iron bars secure your windows but trap your mind, framing every window view with the aesthetics of confinement. Securing your family shouldn't mean living behind heavy grates.",
      "Our window-specific safety grids replace heavy bars with fine, high-tension lines. They fit neatly inside your existing window sash or sliding channels, maximizing natural daylight while safeguarding against accidental falls.",
    ],
    images: ["/images/windows-invisible-grills.png"],
    specs: [
      { label: "Material Composition", value: "AISI 316 Stainless Steel Core" },
      { label: "Cable Gauge", value: "2.5 mm thin profile" },
      { label: "Tension System", value: "Internal mechanical tension lock" },
      { label: "Frame Integration", value: "Flush mounts for sliding/casement tracks" },
      {
        label: "Warranty Terms",
        value: "5-Year Material Warranty on Cable & Track Systems",
      },
    ],
  },
  "child-safety-invisible-grills": {
    id: "child-safety-invisible-grills",
    title: "Child Safety Invisible Grills",
    plainDescriptor: "Child & Pet Safety Micro-Gap Invisible Grills (2-Inch)",
    editorialTitle: "The Unseen Guardian",
    category: "invisible-grills",
    description:
      "Enhanced safety grids featuring high-density micro-spacing and dual-key tension lockers.",
    detailParagraphs: [
      "Unseen vigilance for what you cherish most. Children explore the world with boundless curiosity and little hesitation. For a parent, this means constant vigilance near balconies and high windows. Our team provides an architectural safeguard.",
      "Our child-safety grids feature high-density 2-inch micro-spacing and dual-key tension lockers. It serves as a calm, protective boundary that watches over your toddlers and pets, letting you breathe easy in your own home.",
    ],
    images: ["/images/child-safety-invisible-grills.png"],
    specs: [
      { label: "Material Composition", value: "Heavy-duty 3.0 mm stainless steel cables" },
      { label: "Cable Spacing", value: "2-inch micro-gap child safety spacing" },
      { label: "Safety Locking", value: "Double-key mechanical tension lock" },
      { label: "Coating Grade", value: "UV-stabilized Virgin Nylon-12 sheath" },
      {
        label: "Warranty Terms",
        value: "5-Year Material Warranty on Cable & Track Systems",
      },
    ],
  },
  "balcony-safety-nets": {
    id: "balcony-safety-nets",
    title: "Balcony Safety Nets",
    plainDescriptor: "Balcony UV-Stabilized HDPE Fall Protection Nets",
    editorialTitle: "The Suspended Haven",
    category: "core-safety-nets",
    description:
      "High-density mesh barriers engineered to secure balcony perimeters against accidental falls.",
    detailParagraphs: [
      "Complete perimeter security without structural enclosure. Open balconies on upper floors create constant concern when children, pets, or visitors lean against railings.",
      "Our balcony safety nets are crafted from virgin HDPE monofilament with integrated carbon-black UV stabilizers. They anchor edge-to-edge to create a resilient, flexible containment barrier.",
    ],
    images: ["/images/balcony-safety-nets.png"],
    specs: [
      { label: "Polymer", value: "100% Virgin High-Density Polyethylene (HDPE)" },
      { label: "Mesh Size", value: "25 mm / 30 mm square diamond mesh" },
      { label: "Anchorage", value: "Stainless steel expansion eye-hooks & border cord" },
      { label: "UV Resistance", value: "Thermal UV-stabilized for tropical sun" },
      { label: "Warranty Terms", value: "3 to 5-Year Material Warranty" },
    ],
  },
  "children-safety-nets": {
    id: "children-safety-nets",
    title: "Children Safety Nets",
    plainDescriptor: "Reinforced Children & Toddler Balcony Safety Netting",
    editorialTitle: "The Cradle Horizon",
    category: "core-safety-nets",
    description:
      "Reinforced netting with tightly spaced knots designed specifically for infant and toddler protection.",
    detailParagraphs: [
      "Peace of mind for growing families. Toddlers are naturally drawn to open edges and railing slats. Our children safety nets close every void from floor to ceiling.",
      "Tightly woven heat-set knots ensure that the netting never loosens, giving you the freedom to let children play safely in the open air.",
    ],
    images: ["/images/children-safety-nets.png"],
    specs: [
      { label: "Mesh Pitch", value: "20 mm micro-gap child safety mesh" },
      { label: "Cord Ply", value: "Multi-ply high-tenacity HDPE yarn" },
      { label: "Installation", value: "Full floor-to-ceiling perimeter anchoring" },
      { label: "Warranty Terms", value: "3 to 5-Year Material Warranty" },
    ],
  },
  "staircase-safety-nets": {
    id: "staircase-safety-nets",
    title: "Staircase Safety Nets",
    plainDescriptor: "Internal Stairwell & Multi-Story Drop Safety Nets",
    editorialTitle: "The Vertical Lattice",
    category: "core-safety-nets",
    description:
      "Vertical containment nets securing multi-story stairwell voids in duplexes and schools.",
    detailParagraphs: [
      "Open central stairwells look grand but represent a serious vertical drop hazard. Our staircase containment nets fit cleanly between banisters and ceilings.",
      "They secure the drop zone while preserving natural air circulation and ambient light throughout your stairwell.",
    ],
    images: ["/images/staircase-safety-nets.png"],
    specs: [
      { label: "Application", value: "Duplex stairwells, school corridors, atriums" },
      { label: "Cord Material", value: "High-tenacity nylon / HDPE monofilament" },
      { label: "Color Tone", value: "Translucent white / neutral beige / dark grey" },
      { label: "Warranty Terms", value: "3 to 5-Year Material Warranty" },
    ],
  },
  "building-safety-nets": {
    id: "building-safety-nets",
    title: "Building Safety Nets",
    plainDescriptor: "High-Rise Building Shaft & Duct Safety Netting",
    editorialTitle: "The Perimeter Veil",
    category: "core-safety-nets",
    description:
      "Large-scale containment nets for multi-story duct shafts, open courtyards, and lightwells.",
    detailParagraphs: [
      "Building duct shafts and central courtyards in modern apartment complexes require protective containment to prevent falling objects and accidental falls.",
      "Our technicians engineer large-span building safety nets anchored into concrete beams, protecting technicians, residents, and utility systems below.",
    ],
    images: ["/images/building-safety-nets.png"],
    specs: [
      { label: "Coverage", value: "Large-span duct shafts & internal lightwells" },
      { label: "Anchoring", value: "Heavy-duty steel tension wire & turnbuckles" },
      { label: "UV Protection", value: "High-density carbon black UV additive" },
      { label: "Warranty Terms", value: "3 to 5-Year Material Warranty" },
    ],
  },
  "construction-safety-nets": {
    id: "construction-safety-nets",
    title: "Construction Safety Nets",
    plainDescriptor: "Scaffolding & Structural Debris Fall Protection Nets",
    editorialTitle: "The Heavy Debris Matrix",
    category: "construction-industrial",
    description:
      "High-impact personnel and debris safety nets for active building construction scaffolds.",
    detailParagraphs: [
      "On active construction job sites, safety is the primary priority. Our heavy-duty safety nets are rigged around building perimeters and floor slabs.",
      "They capture falling debris and tools, protecting site personnel and pedestrians below.",
    ],
    images: ["/images/construction-safety-nets.png"],
    specs: [
      { label: "Material", value: "Braided polyamide / high-tenacity polypropylene" },
      { label: "Overlay", value: "Fine mesh debris liner attached" },
      { label: "Border Rope", value: "12 mm high-tensile polypropylene border" },
      { label: "Compliance", value: "Standard industrial safety specifications" },
    ],
  },
  "industrial-safety-nets": {
    id: "industrial-safety-nets",
    title: "Industrial Safety Nets",
    plainDescriptor: "Warehouse Mezzanine & Heavy Storage Safety Nets",
    editorialTitle: "The Heavy-Duty Grid",
    category: "construction-industrial",
    description:
      "Robust protective nets designed for warehouse racking, conveyor systems, and industrial plants.",
    detailParagraphs: [
      "Industrial facilities face risks from falling warehouse inventory and open mezzanine walkways.",
      "Our industrial nets secure high-bay storage racks and elevated platforms, preventing product loss and workplace injuries.",
    ],
    images: ["/images/industrial-safety-nets.png"],
    specs: [
      { label: "Application", value: "Warehouse racking, mezzanine edges, plants" },
      { label: "Breaking Load", value: "Engineered for industrial pallet/box containment" },
      { label: "Mounting", value: "Steel beam clamps & industrial carabiners" },
      { label: "Warranty Terms", value: "As specified per commercial project contract" },
    ],
  },
  "terrace-top-nets": {
    id: "terrace-top-nets",
    title: "Terrace Top Nets",
    plainDescriptor: "Open Terrace & Rooftop Safety Enclosures",
    editorialTitle: "The Open Skyway",
    category: "construction-industrial",
    description:
      "Comprehensive overhead and perimeter netting enclosing open terraces and rooftop decks.",
    detailParagraphs: [
      "Open terrace rooftops provide great outdoor recreation space, but low parapet walls pose a risk during family gatherings or sports.",
      "Our terrace top netting systems enclose rooftops completely, keeping balls within the court and preventing falls over the edge.",
    ],
    images: ["/images/terrace-top-nets.png"],
    specs: [
      { label: "Structure", value: "Galvanized steel support posts with overhead wire grid" },
      { label: "Netting Type", value: "UV-stabilized HDPE sports/containment mesh" },
      { label: "Warranty Terms", value: "3 to 5-Year Material Warranty" },
    ],
  },
  "car-parking-safety-nets": {
    id: "car-parking-safety-nets",
    title: "Car Parking Safety Nets",
    plainDescriptor: "Basement & Open Parking Overhead Debris Protection Nets",
    editorialTitle: "The Vehicle Canopy",
    category: "construction-industrial",
    description:
      "Overhead safety nets protecting vehicles in parking bays from falling plaster and bird droppings.",
    detailParagraphs: [
      "Vehicles parked in open-to-sky podium bays or older apartment basements are exposed to falling plaster, concrete spalling, and bird fouling.",
      "Our team installs horizontal canopy nets suspended above parking slots to keep vehicles clean and protected.",
    ],
    images: ["/images/car-parking-safety-nets.png"],
    specs: [
      { label: "Netting", value: "High-density shade/safety mesh composite" },
      { label: "Rigging", value: "Stainless steel tension cables & turnbuckles" },
      { label: "Warranty Terms", value: "3-Year Material Warranty" },
    ],
  },
  "pigeon-safety-nets": {
    id: "pigeon-safety-nets",
    title: "Pigeon Safety Nets",
    plainDescriptor: "Anti-Pigeon Balcony & Duct Exclusion Netting",
    editorialTitle: "The Avian Screen",
    category: "animal-bird-protection",
    description:
      "Discreet monofilament nets preventing pigeons and birds from entering balconies and duct shafts.",
    detailParagraphs: [
      "Pigeons cause severe hygiene issues, droppings, and respiratory allergens in urban high-rises. Our pigeon nets solve this permanently without harming birds.",
      "The fine translucent mesh creates an impenetrable physical boundary that blends into building facades.",
    ],
    images: ["/images/pigeon-safety-nets.png"],
    specs: [
      { label: "Mesh Gauge", value: "0.8 mm / 1.0 mm translucent monofilament" },
      { label: "Mesh Gap", value: "1-inch / 1.25-inch pigeon-exclusion spacing" },
      { label: "Color", value: "Translucent white / shadow grey" },
      { label: "Warranty Terms", value: "3 to 5-Year Material Warranty" },
    ],
  },
  "pigeons-bird-spikes": {
    id: "pigeons-bird-spikes",
    title: "Stainless Steel Bird Spikes",
    plainDescriptor: "Polycarbonate Base 304 Stainless Steel Anti-Bird Spikes",
    editorialTitle: "The Architectural Deterrent",
    category: "animal-bird-protection",
    description:
      "Discreet blunt-tip stainless steel spikes preventing birds from roosting on ledges and AC units.",
    detailParagraphs: [
      "Narrow window ledges, parapet copings, and AC outdoor compressors are prime roosting spots for pigeons. Our bird spikes eliminate landing spots cleanly.",
      "Manufactured with 304-grade stainless steel rods on UV-stabilized polycarbonate bases, they withstand intense weathering without rusting.",
    ],
    images: ["/images/pigeons-bird-spikes.png"],
    specs: [
      { label: "Rod Material", value: "AISI 304 Stainless Steel (Blunt tip)" },
      { label: "Base Material", value: "100% Virgin UV-Stabilized Polycarbonate" },
      { label: "Adhesion", value: "Neutral-cure silicone sealant / anchor screws" },
      { label: "Warranty Terms", value: "3 to 5-Year Material Warranty" },
    ],
  },
  "monkey-safety-nets": {
    id: "monkey-safety-nets",
    title: "Monkey Safety Nets",
    plainDescriptor: "Heavy-Gauge Reinforced Monkey Exclusion Netting",
    editorialTitle: "The High-Impact Barrier",
    category: "animal-bird-protection",
    description:
      "High-gauge, tear-resistant safety nets designed to withstand aggressive monkey intrusion.",
    detailParagraphs: [
      "Residences located near hills, green belts, or suburban zones frequently deal with aggressive monkey incursions onto balconies and terraces.",
      "Our monkey nets use extra-thick braided cords and structural perimeter fasteners that withstand pulling and biting forces without tearing.",
    ],
    images: ["/images/monkey-safety-nets.png"],
    specs: [
      { label: "Cord Thickness", value: "2.5 mm heavy-gauge braided HDPE" },
      { label: "Mesh Spacing", value: "40 mm square mesh" },
      { label: "Anchoring", value: "Heavy-duty concrete anchor bolts & steel frame" },
      { label: "Warranty Terms", value: "3 to 5-Year Material Warranty" },
    ],
  },
  "mosquito-safety-nets": {
    id: "mosquito-safety-nets",
    title: "Mosquito Safety Nets",
    plainDescriptor: "Sliding & Pleated Window Insect Screens",
    editorialTitle: "The Micro-Weave Shield",
    category: "animal-bird-protection",
    description:
      "Precision-woven fiberglass and stainless steel window screens that block insects while allowing fresh air.",
    detailParagraphs: [
      "Enjoy the cool evening breeze without worrying about mosquitoes, flies, or pests. Our window insect screens integrate flush with your existing window frames.",
      "Available in sliding, pleated, magnetic, and openable aluminum shutter configurations.",
    ],
    images: ["/images/mosquito-safety-nets.png"],
    specs: [
      { label: "Mesh Screen", value: "Fiberglass / SS 304 micro-mesh" },
      { label: "Frame Material", value: "Extruded 6063 Aluminum Profile" },
      { label: "Finish", value: "Powder-coated anodized finish" },
      { label: "Warranty Terms", value: "2 to 3-Year Mechanism Warranty" },
    ],
  },
  "sports-practice-nets": {
    id: "sports-practice-nets",
    title: "Sports Practice Nets",
    plainDescriptor: "Cricket, Golf & Football Practice Net Cages",
    editorialTitle: "The Practice Enclosure",
    category: "specialty-solutions",
    description:
      "Custom sports enclosures engineered for cricket batting practice, golf drives, and sports turf courts.",
    detailParagraphs: [
      "Transform open terraces, backyards, or society clubhouses into professional cricket and sports practice zones.",
      "Our sports netting absorbs high-velocity ball impacts and prevents balls from flying off the roof or hitting nearby windows.",
    ],
    images: ["/images/sports-practice-nets.png"],
    specs: [
      { label: "Netting Type", value: "High-impact braided nylon / HDPE sports mesh" },
      { label: "Support Framework", value: "Galvanized iron (GI) structural poles" },
      { label: "Warranty Terms", value: "3 to 5-Year Material Warranty" },
    ],
  },
  "cricket-sports-nets": {
    id: "cricket-sports-nets",
    title: "Cricket Sports Nets",
    plainDescriptor: "Cricket Practice Net Cages & Pitch Enclosures",
    editorialTitle: "The Batting Cage",
    category: "specialty-solutions",
    description:
      "Custom sports enclosures engineered for cricket batting practice, golf drives, and turf sports.",
    detailParagraphs: [
      "Transform open terraces, backyards, or society clubhouses into professional cricket and sports practice zones.",
      "Our high-density sports netting absorbs high-velocity ball impacts and prevents balls from flying off the roof or hitting nearby windows.",
    ],
    images: ["/images/cricket-sports-nets.png"],
    specs: [
      { label: "Netting Type", value: "High-impact braided nylon / HDPE sports mesh" },
      { label: "Support Framework", value: "Galvanized iron (GI) structural poles" },
      { label: "Warranty Terms", value: "3 to 5-Year Material Warranty" },
    ],
  },
  "coconut-safety-nets": {
    id: "coconut-safety-nets",
    title: "Coconut Safety Nets",
    plainDescriptor: "Overhead Coconut Fall-Arrest Protection Nets",
    editorialTitle: "The Canopy Defense",
    category: "specialty-solutions",
    description:
      "Heavy-gauge canopy nets suspended beneath coconut palms to catch falling coconuts.",
    detailParagraphs: [
      "Tall coconut trees surrounding driveways, walkways, and parking areas pose a significant hazard from falling coconuts.",
      "Our coconut nets are rigged beneath palm crowns on high-tensile steel wire ropes, catching falling coconuts gently before they can cause damage.",
    ],
    images: ["/images/coconut-safety-nets.png"],
    specs: [
      { label: "Netting", value: "Thick multi-strand knotted HDPE grid" },
      { label: "Support", value: "Stainless steel tension wire harness" },
      { label: "Warranty Terms", value: "3 to 5-Year Material Warranty" },
    ],
  },
  "swimming-pool-nets": {
    id: "swimming-pool-nets",
    title: "Swimming Pool Nets",
    plainDescriptor: "Swimming Pool Child Safety & Debris Covers",
    editorialTitle: "The Water Perimeter",
    category: "specialty-solutions",
    description:
      "High-tension security nets enclosing residential swimming pools to protect toddlers and pets.",
    detailParagraphs: [
      "Open swimming pools in private villas and apartment communities require vigilant containment to prevent accidental drowning incidents.",
      "Our swimming pool safety nets anchor securely into pool coping stones, creating a taut horizontal barrier that keeps children and pets safe.",
    ],
    images: ["/images/swimming-pool-nets.png"],
    specs: [
      { label: "Material", value: "High-tensile UV-resistant HDPE mesh" },
      { label: "Anchorage", value: "Flush brass / stainless steel deck anchors" },
      { label: "Warranty Terms", value: "3-Year Material Warranty" },
    ],
  },
  "cloth-drying-hangers": {
    id: "cloth-drying-hangers",
    title: "Balcony Cloth Drying Hangers",
    plainDescriptor: "Ceiling-Mounted Pulley Clothes Drying Systems",
    editorialTitle: "The Ceiling Pulley System",
    category: "specialty-solutions",
    description:
      "Ceiling-mounted pulley systems with independent stainless steel rods that maximize balcony floor space.",
    detailParagraphs: [
      "Free up your balcony floor space while drying laundry effortlessly. Our ceiling cloth drying hangers feature individual rods that lower smoothly for loading.",
      "Constructed with rust-proof stainless steel or aluminum pipes and smooth nylon pulleys for effortless daily use.",
    ],
    images: ["/images/cloth-drying-hangers.png"],
    specs: [
      { label: "Pipes", value: "6 / 8 independent stainless steel / aluminum rods" },
      { label: "Pulley System", value: "Heavy-duty nylon pulleys with braided nylon rope" },
      { label: "Warranty Terms", value: "2-Year Mechanism Warranty" },
    ],
  },
};
