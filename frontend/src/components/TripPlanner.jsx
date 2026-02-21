import React, { useState, useMemo } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  TASK 1 — COMPREHENSIVE DISTANCE MATRIX  (approximate road km)
//
//  Storage strategy: TRIANGULAR (upper-half only).
//  We only define MATRIX[A][B] once. The lookup function checks BOTH
//  MATRIX[A][B] and MATRIX[B][A] so every pair is bidirectional.
//
//  Covers:
//   Kharga cluster  → Kharga, Hibis Temple, Bagawat Necropolis,
//                     Qasr el-Ghweita, Qasr el-Zaiyan, Qasr el-Dush, Baris
//   Dakhla cluster  → Dakhla/Mut, Ain Asil, Qasr Dakhla, El-Muzzawaka
//   Cross-oasis     → Kharga↔Dakhla, Dakhla↔Farafra, Farafra↔Bahariya
//   Farafra cluster → Farafra, White Desert, Crystal Mountain
//   Bahariya        → El-Bawiti, Wadi Rayan
//   Outliers        → Date Palm Farms
// ─────────────────────────────────────────────────────────────────────────────

const MATRIX = {

    /* ── KHARGA HUB ───────────────────────────────────────────────────────── */
    'Kharga': {
        'Hibis Temple': 5,
        'Bagawat Necropolis': 6,
        'Qasr el-Ghweita': 22,
        'Qasr el-Zaiyan': 38,
        'Qasr el-Dush': 98,
        'Baris': 90,
        'Dakhla': 190,
        'Ain Asil': 220,
        'Qasr Dakhla': 225,
        'El-Muzzawaka': 222,
        'Farafra': 490,
        'White Desert': 470,
        'Crystal Mountain': 570,
        'El-Bawiti': 650,
        'Wadi Rayan': 700,
        'Date Palm Farms': 200,
    },

    /* ── WITHIN KHARGA CLUSTER ────────────────────────────────────────────── */
    'Hibis Temple': {
        'Bagawat Necropolis': 2,
        'Qasr el-Ghweita': 20,
        'Qasr el-Zaiyan': 35,
        'Qasr el-Dush': 95,
        'Baris': 88,
        'Dakhla': 193,
        'Ain Asil': 223,
        'Qasr Dakhla': 228,
        'El-Muzzawaka': 225,
        'Farafra': 493,
        'White Desert': 473,
        'Crystal Mountain': 573,
        'El-Bawiti': 653,
        'Wadi Rayan': 703,
        'Date Palm Farms': 203,
    },

    'Bagawat Necropolis': {
        'Qasr el-Ghweita': 19,
        'Qasr el-Zaiyan': 34,
        'Qasr el-Dush': 93,
        'Baris': 86,
        'Dakhla': 194,
        'Farafra': 494,
        'White Desert': 474,
        'Crystal Mountain': 574,
        'El-Bawiti': 654,
        'Date Palm Farms': 204,
    },

    'Qasr el-Ghweita': {
        'Qasr el-Zaiyan': 18,
        'Qasr el-Dush': 78,
        'Baris': 70,
        'Dakhla': 210,
        'Farafra': 510,
        'White Desert': 490,
        'Crystal Mountain': 590,
        'El-Bawiti': 670,
        'Date Palm Farms': 220,
    },

    'Qasr el-Zaiyan': {
        'Qasr el-Dush': 62,
        'Baris': 55,
        'Dakhla': 220,
        'Farafra': 520,
        'White Desert': 500,
        'Crystal Mountain': 600,
        'El-Bawiti': 680,
        'Date Palm Farms': 230,
    },

    'Qasr el-Dush': {
        'Baris': 15,
        'Dakhla': 270,
        'Farafra': 570,
        'White Desert': 550,
        'Crystal Mountain': 650,
        'El-Bawiti': 730,
        'Date Palm Farms': 280,
    },

    'Baris': {
        'Dakhla': 260,
        'Farafra': 560,
        'White Desert': 540,
        'Crystal Mountain': 640,
        'El-Bawiti': 720,
        'Date Palm Farms': 270,
    },

    /* ── DAKHLA HUB ───────────────────────────────────────────────────────── */
    'Dakhla': {
        'Ain Asil': 30,
        'Qasr Dakhla': 35,
        'El-Muzzawaka': 32,
        'Date Palm Farms': 15,
        'Farafra': 300,
        'White Desert': 285,
        'Crystal Mountain': 375,
        'El-Bawiti': 470,
        'Wadi Rayan': 520,
    },

    'Ain Asil': {
        'Qasr Dakhla': 8,
        'El-Muzzawaka': 12,
        'Date Palm Farms': 35,
        'Farafra': 325,
        'White Desert': 310,
        'Crystal Mountain': 400,
        'El-Bawiti': 495,
    },

    'Qasr Dakhla': {
        'El-Muzzawaka': 10,
        'Date Palm Farms': 40,
        'Farafra': 320,
        'White Desert': 305,
        'Crystal Mountain': 395,
        'El-Bawiti': 490,
    },

    'El-Muzzawaka': {
        'Date Palm Farms': 38,
        'Farafra': 322,
        'White Desert': 307,
        'Crystal Mountain': 397,
        'El-Bawiti': 492,
    },

    'Date Palm Farms': {
        'Farafra': 295,
        'White Desert': 280,
        'Crystal Mountain': 370,
        'El-Bawiti': 460,
        'Wadi Rayan': 510,
    },

    /* ── FARAFRA HUB ──────────────────────────────────────────────────────── */
    'Farafra': {
        'White Desert': 20,
        'Crystal Mountain': 110,
        'El-Bawiti': 190,
        'Wadi Rayan': 250,
    },

    'White Desert': {
        'Crystal Mountain': 90,
        'El-Bawiti': 185,
        'Wadi Rayan': 240,
    },

    /* ── BAHARIYA HUB ─────────────────────────────────────────────────────── */
    'Crystal Mountain': {
        'El-Bawiti': 80,
        'Wadi Rayan': 140,
    },

    'El-Bawiti': {
        'Wadi Rayan': 110,
    },
};

// ─────────────────────────────────────────────────────────────────────────────
//  KEYWORD ALIAS TABLE
//  Maps lowercase keywords found in attraction names → MATRIX keys
// ─────────────────────────────────────────────────────────────────────────────
const ALIASES = [
    // Kharga cluster
    { keys: ['kharga'], matrix: 'Kharga' },
    { keys: ['hibis'], matrix: 'Hibis Temple' },
    { keys: ['bagawat', 'necropolis'], matrix: 'Bagawat Necropolis' },
    { keys: ['ghweita'], matrix: 'Qasr el-Ghweita' },
    { keys: ['zaiyan'], matrix: 'Qasr el-Zaiyan' },
    { keys: ['dush'], matrix: 'Qasr el-Dush' },
    { keys: ['baris'], matrix: 'Baris' },
    // Dakhla cluster
    { keys: ['dakhla', 'mut '], matrix: 'Dakhla' },
    { keys: ['ain asil', 'asil'], matrix: 'Ain Asil' },
    { keys: ['qasr dakhla', 'qasr el-dakhla'], matrix: 'Qasr Dakhla' },
    { keys: ['muzzawaka', 'muzawaka'], matrix: 'El-Muzzawaka' },
    { keys: ['date palm', 'palm farm'], matrix: 'Date Palm Farms' },
    // Farafra cluster
    { keys: ['farafra'], matrix: 'Farafra' },
    { keys: ['white desert'], matrix: 'White Desert' },
    { keys: ['crystal mountain', 'crystal'], matrix: 'Crystal Mountain' },
    // Bahariya
    { keys: ['bawiti', 'bahariya', 'baharia'], matrix: 'El-Bawiti' },
    { keys: ['wadi rayan', 'rayan'], matrix: 'Wadi Rayan' },
];

// ─────────────────────────────────────────────────────────────────────────────
//  TASK 3 — SMART GUESS fallback (avg road distance between New Valley oases)
// ─────────────────────────────────────────────────────────────────────────────
const SMART_GUESS_KM = 175; // approximate mid-range inter-oasis distance

/**
 * Resolve an attraction name to its MATRIX key via keyword matching.
 * Returns null if no match found.
 */
function findKey(name) {
    if (!name) return null;
    const lower = name.toLowerCase();
    for (const alias of ALIASES) {
        if (alias.keys.some(k => lower.includes(k))) return alias.matrix;
    }
    return null;
}

// ─────────────────────────────────────────────────────────────────────────────
//  TASK 2 — BIDIRECTIONAL LOOKUP
//  Checks MATRIX[A][B] first, then MATRIX[B][A] (reverse).
//  Returns { km, estimated } — estimated=true triggers the "(Est.)" UI note.
// ─────────────────────────────────────────────────────────────────────────────
function getDistance(nameA, nameB) {
    const ka = findKey(nameA);
    const kb = findKey(nameB);

    // Same location or same-key → 0, not estimated
    if (!ka || !kb || ka === kb) return { km: 0, estimated: false };

    const direct = MATRIX[ka]?.[kb];   // forward lookup  A→B
    const reverse = MATRIX[kb]?.[ka];   // reverse lookup  B→A

    if (direct !== undefined) return { km: direct, estimated: false };
    if (reverse !== undefined) return { km: reverse, estimated: false };

    // Neither found — use smart guess
    console.warn(`[TripPlanner] No matrix entry for "${nameA}" ↔ "${nameB}". Using smart guess (${SMART_GUESS_KM} km).`);
    return { km: SMART_GUESS_KM, estimated: true };
}

/** Build a segment list from an array of attraction objects with .name */
function calcSegments(attractions) {
    const segs = [];
    for (let i = 0; i < attractions.length - 1; i++) {
        const { km, estimated } = getDistance(attractions[i].name, attractions[i + 1].name);
        segs.push({ from: attractions[i].name, to: attractions[i + 1].name, km, estimated });
    }
    return segs;
}

// ─────────────────────────────────────────────────────────────────────────────
//  TRANSPORT MODES
// ─────────────────────────────────────────────────────────────────────────────
const TRANSPORT_MODES = [
    { id: 'walk', emoji: '🚶‍♂️', label: 'Walking / Bicycle', factor: 0.00, tag: 'Zero Emission', tagColor: 'bg-green-100 text-green-800' },
    { id: 'ebus', emoji: '🚌', label: 'Electric Eco-Bus', factor: 0.05, tag: 'Low Emission', tagColor: 'bg-teal-100 text-teal-800' },
    { id: 'car', emoji: '🚕', label: 'Standard Gas Car', factor: 0.20, tag: 'High Emission', tagColor: 'bg-orange-100 text-orange-800' },
];

const GAS_FACTOR = 0.20;

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function greenPct(co2, gasCo2) {
    if (gasCo2 === 0) return 100;
    return Math.round(((gasCo2 - co2) / gasCo2) * 100);
}

function getBadge(mode, co2, gasCo2, stopCount) {
    const pct = greenPct(co2, gasCo2);
    if (mode.id === 'walk') return {
        icon: '🌿', title: 'Net-Zero Hero!',
        msg: `Your ${stopCount}-stop trip emits ZERO kg of CO₂. You saved ${gasCo2.toFixed(1)} kg. The desert thanks you! 🌍`,
        classes: 'bg-green-50 border-green-400 text-green-900',
        netZero: true, pct: 100,
    };
    if (mode.id === 'ebus') return {
        icon: '🏆', title: 'Sustainable Choice!',
        msg: `Your ${stopCount}-stop trip is ${pct}% greener than a gas car. You prevented ${(gasCo2 - co2).toFixed(1)} kg of CO₂! 🌱`,
        classes: 'bg-teal-50 border-teal-400 text-teal-900',
        netZero: false, pct,
    };
    return {
        icon: '⚠️', title: 'Room to Improve',
        msg: `Your ${stopCount}-stop trip emits ${co2.toFixed(1)} kg CO₂. Switch to the Electric Eco-Bus to cut that by 75%!`,
        classes: 'bg-orange-50 border-orange-400 text-orange-900',
        netZero: false, pct: 0,
    };
}

// ─────────────────────────────────────────────────────────────────────────────
//  SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function EmissionBar({ pct }) {
    const color = pct === 0 ? 'bg-orange-400'
        : pct < 50 ? 'bg-yellow-400'
            : pct < 90 ? 'bg-teal-500'
                : 'bg-green-500';
    return (
        <div className="mt-1">
            <div className="flex justify-between text-xs text-[#96786F] mb-1">
                <span>Gas Car baseline</span>
                <span>{pct}% cleaner</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-[#D3AB80]/20">
                <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

function SegmentRow({ from, to, km, co2, estimated }) {
    return (
        <div className="flex items-center justify-between text-xs py-2 border-b border-[#D3AB80]/10 last:border-0 gap-1">
            <span className="text-[#472825] font-medium flex-1 truncate">{from}</span>
            <span className="text-[#D3AB80] flex-shrink-0 mx-1">→</span>
            <span className="text-[#472825] font-medium flex-1 truncate text-right">{to}</span>
            <span className="ml-2 flex-shrink-0 flex items-center gap-1">
                <span className="text-[#96786F] whitespace-nowrap">{km} km</span>
                {estimated && (
                    <span
                        className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-semibold leading-none"
                        title="Distance not in database — using average New Valley inter-oasis estimate"
                    >
                        Est.
                    </span>
                )}
            </span>
            <span className="ml-2 text-[#472825] font-semibold whitespace-nowrap w-14 text-right flex-shrink-0">
                {co2.toFixed(2)} kg
            </span>
        </div>
    );
}

function EcoHeader() {
    return (
        <div className="text-center mb-8">
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
                🌍 Eco Travel · SDG 13
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#472825] mb-2">Trip Eco-Analyzer</h2>
            <p className="text-[#96786F] max-w-xl mx-auto text-sm">
                Your itinerary's real carbon footprint — calculated stop by stop.
            </p>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const TripPlanner = ({ addedAttractions = [] }) => {
    const [selectedModeId, setSelectedModeId] = useState('ebus');
    const mode = TRANSPORT_MODES.find(m => m.id === selectedModeId);

    const segments = useMemo(() => calcSegments(addedAttractions), [addedAttractions]);
    const totalKm = useMemo(() => segments.reduce((s, seg) => s + seg.km, 0), [segments]);
    const hasEstimate = useMemo(() => segments.some(s => s.estimated), [segments]);
    const co2 = useMemo(() => totalKm * mode.factor, [totalKm, mode]);
    const gasCo2 = useMemo(() => totalKm * GAS_FACTOR, [totalKm]);
    const pct = useMemo(() => greenPct(co2, gasCo2), [co2, gasCo2]);
    const badge = useMemo(() => getBadge(mode, co2, gasCo2, addedAttractions.length), [mode, co2, gasCo2, addedAttractions.length]);

    /* ── Empty state ───────────────────────────────────────────────────────── */
    if (addedAttractions.length === 0) return (
        <section className="w-full max-w-4xl mx-auto px-4 py-10">
            <EcoHeader />
            <div className="border-2 border-dashed border-[#D3AB80]/40 rounded-2xl p-12 text-center text-[#96786F] bg-[#FFF4E2]">
                <p className="text-4xl mb-4">🗺️</p>
                <p className="text-lg font-semibold">Generate your AI itinerary below</p>
                <p className="text-sm mt-1">Your eco-footprint will be calculated automatically once attractions are added.</p>
            </div>
        </section>
    );

    /* ── Single-stop state ─────────────────────────────────────────────────── */
    if (addedAttractions.length === 1) return (
        <section className="w-full max-w-4xl mx-auto px-4 py-10">
            <EcoHeader />
            <div className="border-2 border-dashed border-[#D3AB80]/40 rounded-2xl p-10 text-center text-[#96786F] bg-[#FFF4E2]">
                <p className="text-4xl mb-3">📍</p>
                <p className="text-lg font-semibold">Only 1 stop: <span className="text-[#472825]">{addedAttractions[0].name}</span></p>
                <p className="text-sm mt-1">Add at least 2 attractions to calculate trip distance & emissions.</p>
            </div>
        </section>
    );

    /* ── Main view ─────────────────────────────────────────────────────────── */
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-10">
            <EcoHeader />

            {/* Estimated-distance notice banner */}
            {hasEstimate && (
                <div className="mb-6 flex items-start gap-2 bg-yellow-50 border border-yellow-300 text-yellow-800 text-xs rounded-xl px-4 py-3">
                    <span className="text-base flex-shrink-0">⚠️</span>
                    <span>
                        <strong>Estimated distances used</strong> — one or more pairs of attractions aren't in our database yet.
                        Distances marked <span className="bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-semibold">Est.</span> use
                        the New Valley average inter-oasis estimate of <strong>{SMART_GUESS_KM} km</strong>.
                    </span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT ── Itinerary + Segments */}
                <div className="space-y-5">

                    {/* Stop list */}
                    <div className="bg-white border border-[#D3AB80]/30 rounded-2xl shadow-md p-6 hover:shadow-xl hover:border-[#D3AB80]/60 transition-all duration-300">
                        <h3 className="text-base font-bold text-[#472825] mb-4">
                            📍 Your Itinerary — {addedAttractions.length} Stops
                        </h3>
                        <ol className="space-y-2">
                            {addedAttractions.map((a, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D3AB80] text-white text-xs font-bold flex items-center justify-center">
                                        {i + 1}
                                    </span>
                                    <span className="text-[#472825] font-medium truncate">{a.name}</span>
                                    {findKey(a.name) === null && (
                                        <span className="text-[10px] text-[#96786F] italic">(unknown location)</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Segment breakdown */}
                    <div className="bg-white border border-[#D3AB80]/30 rounded-2xl shadow-md p-6 hover:shadow-xl hover:border-[#D3AB80]/60 transition-all duration-300">
                        <h3 className="text-base font-bold text-[#472825] mb-3">🛣️ Segment Breakdown</h3>
                        <div className="flex justify-between text-[10px] font-semibold text-[#96786F] mb-2 uppercase tracking-wide">
                            <span>From → To</span>
                            <span className="flex gap-3">
                                <span>km</span>
                                <span className="w-14 text-right">CO₂ (kg)</span>
                            </span>
                        </div>
                        {segments.map((seg, i) => (
                            <SegmentRow
                                key={i}
                                from={seg.from}
                                to={seg.to}
                                km={seg.km}
                                co2={seg.km * mode.factor}
                                estimated={seg.estimated}
                            />
                        ))}
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#D3AB80]/30 font-bold text-sm text-[#472825]">
                            <span>Total</span>
                            <span className="flex gap-3">
                                <span>{totalKm} km</span>
                                <span className="w-14 text-right">{co2.toFixed(2)} kg</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT ── Mode Picker + Results */}
                <div className="space-y-5">

                    {/* Transport mode picker */}
                    <div className="bg-white border border-[#D3AB80]/30 rounded-2xl shadow-md p-6 hover:shadow-xl hover:border-[#D3AB80]/60 transition-all duration-300">
                        <h3 className="text-base font-bold text-[#472825] mb-4">⚡ How Will You Travel?</h3>
                        <div className="space-y-3">
                            {TRANSPORT_MODES.map(m => (
                                <button
                                    key={m.id}
                                    onClick={() => setSelectedModeId(m.id)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200
                                        ${selectedModeId === m.id
                                            ? 'border-[#D3AB80] bg-[#FDE4BC] text-[#472825] shadow-md'
                                            : 'border-[#D3AB80]/20 bg-white text-[#96786F] hover:border-[#D3AB80]/50 hover:bg-[#FFF4E2]'
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-xl">{m.emoji}</span>
                                        {m.label}
                                    </span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${m.tagColor}`}>{m.tag}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CO₂ summary */}
                    <div className="bg-white border border-[#D3AB80]/30 rounded-2xl shadow-md p-6 hover:shadow-xl hover:border-[#D3AB80]/60 transition-all duration-300">
                        <h3 className="text-base font-bold text-[#472825] mb-4">📊 Trip Footprint</h3>
                        <div className="flex items-end gap-2 mb-4">
                            <span className={`text-5xl font-extrabold tracking-tight transition-all duration-500
                                ${co2 === 0 ? 'text-green-600' : co2 < 20 ? 'text-teal-600' : 'text-orange-600'}`}>
                                {co2.toFixed(1)}
                            </span>
                            <span className="text-lg text-[#96786F] mb-1 font-semibold">kg CO₂</span>
                        </div>
                        <EmissionBar pct={pct} />
                        <div className="grid grid-cols-2 gap-3 mt-5">
                            <div className="bg-[#FFF4E2] border border-[#D3AB80]/20 rounded-xl p-3 text-center">
                                <p className="text-xs text-[#96786F] mb-1">Total Distance</p>
                                <p className="text-lg font-bold text-[#472825]">{totalKm} km</p>
                            </div>
                            <div className="bg-[#FFF4E2] border border-[#D3AB80]/20 rounded-xl p-3 text-center">
                                <p className="text-xs text-[#96786F] mb-1">Stops</p>
                                <p className="text-lg font-bold text-[#472825]">{addedAttractions.length}</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center col-span-2">
                                <p className="text-xs text-green-700 mb-1">CO₂ Saved vs Gas Car 🌍</p>
                                <p className="text-2xl font-extrabold text-green-700">
                                    {Math.max(0, gasCo2 - co2).toFixed(1)} kg
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Badge */}
                    <div className={`border-2 rounded-2xl p-5 transition-all duration-500 ${badge.classes}`}>
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">{badge.icon}</span>
                            <div>
                                <p className="font-bold text-lg">{badge.title}</p>
                                <p className="text-sm mt-1 leading-relaxed">{badge.msg}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 bg-white/60 text-xs font-bold px-3 py-1 rounded-full border border-current/20">
                                🎯 SDG 13: Climate Action
                            </span>
                            {badge.netZero && (
                                <span className="inline-flex items-center gap-1 bg-white/60 text-xs font-bold px-3 py-1 rounded-full border border-current/20">
                                    ✅ Net-Zero Journey
                                </span>
                            )}
                            {pct >= 50 && !badge.netZero && (
                                <span className="inline-flex items-center gap-1 bg-white/60 text-xs font-bold px-3 py-1 rounded-full border border-current/20">
                                    🌱 {pct}% Greener Trip
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TripPlanner;
