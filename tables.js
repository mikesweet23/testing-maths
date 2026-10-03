/* Look-up tables. Each one says where it lives in the real books, so apprentices learn where to look.
   "where": [book, reference]. Books: BS (BS 7671 Wiring Regulations), OSG (On-Site Guide), GN3 (Guidance Note 3).
   "used": calculator ids this table feeds. Check values against the edition used at college. */
(function(){
const RATINGS = [6,10,16,20,25,32,40,50,63];
const zc = (m,In) => Math.round(21850/(m*In));            // max Zs in hundredths of an ohm (whole numbers avoid rounding slips)
const zmax = (m,In) => (zc(m,In)/100).toFixed(2);
const z80 = (m,In) => (Math.round(zc(m,In)*0.8)/100).toFixed(2);

window.TABLES = [

{ id:"res", title:"Resistance of copper conductors",
  what:"How many milliohms each metre of conductor adds, at 20°C. Use it to work out what R1 + R2 (or r1, r2) should be.",
  where:[["OSG","Appendix I"],["GN3","Appendix B"]],
  note:"These aren't in BS 7671 itself. Values are in mΩ per metre: multiply by the length, then ÷ 1000 for ohms.",
  used:["r1r2","ring","zs"],
  parts:[
    {cap:"Single conductor", cols:["Size (mm²)","mΩ/m at 20°C"],
     rows:[["1.0","18.10"],["1.5","12.10"],["2.5","7.41"],["4","4.61"],["6","3.08"],["10","1.83"],["16","1.15"],["25","0.727"],["35","0.524"]]},
    {cap:"Twin and earth: line + CPC together (R1 + R2 per metre)", cols:["Cable (line / CPC)","R1+R2 mΩ/m"],
     rows:[["1.0 / 1.0","36.20"],["1.5 / 1.0","30.20"],["2.5 / 1.5","19.51"],["4 / 1.5","16.71"],["6 / 2.5","10.49"],["10 / 4","6.44"],["16 / 6","4.23"]]}
  ]},

{ id:"temp", title:"Temperature multiplier",
  what:"Table resistances are at 20°C. A working cable is hotter, so its resistance is higher. Multiply by this to get the hot value for design sums.",
  where:[["OSG","Appendix I"],["GN3","Appendix B"]],
  used:["r1r2"],
  parts:[{cols:["Cable insulation","Max working temp","Multiplier"],
    rows:[["Thermoplastic (PVC), e.g. twin and earth","70°C","1.20"],["Thermosetting (XLPE), e.g. SWA","90°C","1.28"]]}]},

{ id:"zsmax", title:"Maximum Zs for circuit breakers",
  what:"The highest earth fault loop impedance that still lets the breaker trip instantly. Your Zs must be below this.",
  where:[["BS","Table 41.3 (Chapter 41)"],["OSG","Appendix B (80% values)"],["GN3","Appendix B"]],
  note:"Table 41.3 values are for U0 = 230 V and Cmin = 0.95, and cover both 0.4 s and 5 s. The 80% column is the rule of thumb for comparing with a reading taken on a cold cable.",
  used:["zs"],
  parts:[
    {cap:"BS 7671 Table 41.3 maximum Zs (Ω)", cols:["Rating","Type B","Type C","Type D"],
     rows:RATINGS.map(In=>[In+" A", zmax(5,In), zmax(10,In), zmax(20,In)])},
    {cap:"80% of the maximum: compare your measured reading with this (Ω)", cols:["Rating","Type B","Type C","Type D"],
     rows:RATINGS.map(In=>[In+" A", z80(5,In), z80(10,In), z80(20,In)])}
  ]},

{ id:"trip", title:"Circuit breaker types",
  what:"How many times its rating a breaker needs before it trips instantly (Ia). Max Zs sums use the top of each range.",
  where:[["BS","Appendix 3 (time/current curves)"]],
  used:["zs","adiabatic"],
  parts:[{cols:["Type","Trips instantly at","Ia used in sums","Typical use"],
    rows:[["B","3 to 5 × In","5 × In","Homes: sockets, lighting"],["C","5 to 10 × In","10 × In","Motors, fluorescent lighting, commercial"],["D","10 to 20 × In","20 × In","High inrush: transformers, welders"]]}]},

{ id:"disc", title:"Maximum disconnection times",
  what:"How quickly a fault must be cleared. This is what the max Zs values are built on.",
  where:[["BS","Table 41.1 (Regulation 411.3.2)"]],
  note:"For U0 = 230 V. Final circuits here means up to 63 A with socket-outlets, or up to 32 A supplying only fixed equipment.",
  used:["zs"],
  parts:[{cols:["Circuit","TN system","TT system"],
    rows:[["Final circuits (as above)","0.4 s","0.2 s"],["Distribution circuits and other circuits","5 s","1 s"]]}]},

{ id:"ze", title:"Typical declared Ze and fault current",
  what:"The values a network operator usually declares for a single-phase supply. Use them when you can't measure, and as a sense check when you do.",
  where:[["OSG","Section 1.1"]],
  note:"Always measure Ze on site where you can. TT figure is the supply's part only, not your earth electrode.",
  used:["zs","pfc"],
  parts:[{cols:["Earthing system","Typical Ze"],rows:[["TN-C-S (PME)","0.35 Ω"],["TN-S","0.8 Ω"],["TT","21 Ω"]]},
    {cols:["Supply","Max declared PFC"],rows:[["230 V single-phase","16 kA"]]}]},

{ id:"rcd", title:"RCDs: max Zs, earth electrodes and trip times",
  what:"For TT systems, where the RCD does the fault protection, and for testing RCDs.",
  where:[["BS","Table 41.5 (Regulation 411.5.3)"],["GN3","RCD testing section"]],
  note:"TT rule: RA × IΔn ≤ 50 V. An earth electrode reading above 200 Ω may not be stable (OSG and GN3 guidance).",
  used:["zs"],
  parts:[{cap:"BS 7671 Table 41.5 maximum Zs with an RCD", cols:["RCD rating IΔn","Max Zs"],rows:[["30 mA","1667 Ω"],["100 mA","500 Ω"],["300 mA","167 Ω"],["500 mA","100 Ω"]]},
    {cap:"RCD test: maximum trip times (general non-delay type)", cols:["Test current","Must trip within"],rows:[["1 × IΔn","300 ms"],["5 × IΔn (additional protection, 30 mA)","40 ms"]]}]},

{ id:"ir", title:"Minimum insulation resistance",
  what:"Which test voltage to use, and the lowest acceptable reading.",
  where:[["BS","Table 64 (Chapter 64)"],["GN3","Insulation resistance section"]],
  note:"These are minimums. A healthy new circuit usually reads far higher, often over 200 MΩ. A low reading still needs looking into.",
  used:["ir"],
  parts:[{cols:["Circuit","Test voltage","Minimum"],rows:[["SELV and PELV","250 V DC","0.5 MΩ"],["Up to 500 V (normal 230 V circuits)","500 V DC","1 MΩ"],["Above 500 V","1000 V DC","1 MΩ"]]}]},

{ id:"cable", title:"Twin and earth: current ratings and voltage drop",
  what:"How much current a flat twin and earth cable can carry for the way it's installed (It), and its voltage drop per amp per metre.",
  where:[["BS","Appendix 4, Table 4D5"]],
  note:"70°C thermoplastic flat twin and earth. The full table has more installation methods (A, 101, 102). Ratings are before correction factors.",
  used:["cable","vd"],
  parts:[{cols:["Size (mm²)","Method C: clipped direct (A)","Method 100: above plasterboard, insulation ≤ 100 mm (A)","Method 103: in insulated stud wall (A)","Voltage drop (mV/A/m)"],
    rows:[["1.0","16","13","8","44"],["1.5","20","16","10","29"],["2.5","27","21","13.5","18"],["4","37","27","17.5","11"],["6","47","34","23.5","7.3"],["10","64","45","32","4.4"],["16","85","57","42.5","2.8"]]}]},

{ id:"ca", title:"Ca: ambient temperature factor",
  what:"Cables in hot places can carry less current. Reference temperature is 30°C (factor 1.00).",
  where:[["BS","Appendix 4, Table 4B1"]],
  note:"For 70°C thermoplastic cable such as twin and earth.",
  used:["cable"],
  parts:[{cols:["Ambient temperature","Ca"],rows:[["25°C","1.03"],["30°C","1.00"],["35°C","0.94"],["40°C","0.87"],["45°C","0.79"],["50°C","0.71"]]}]},

{ id:"cg", title:"Cg: grouping factor",
  what:"Cables bunched together heat each other up, so each can carry less.",
  where:[["BS","Appendix 4, Table 4C1"]],
  note:"Row for circuits bunched in air, on a surface, embedded or enclosed. Count the circuits, not the cables.",
  used:["cable"],
  parts:[{cols:["Number of circuits","Cg"],rows:[["1","1.00"],["2","0.80"],["3","0.70"],["4","0.65"],["5","0.60"],["6","0.57"],["7","0.54"],["8","0.52"],["9","0.50"]]}]},

{ id:"ci", title:"Ci: thermal insulation factor",
  what:"For a cable surrounded by thermal insulation (loft insulation, insulated walls) for part of its length.",
  where:[["BS","Table 52.2 (Regulation 523.9)"]],
  note:"Don't use Ci as well if the installation method you chose from Table 4D5 already allows for the insulation (e.g. Method 100 to 103).",
  used:["cable"],
  parts:[{cols:["Length in insulation","Ci"],rows:[["50 mm","0.88"],["100 mm","0.78"],["200 mm","0.63"],["400 mm","0.51"],["500 mm or more","0.50"]]}]},

{ id:"cc", title:"Cc: protective device factor",
  what:"A rewireable fuse needs a bigger margin than a breaker.",
  where:[["BS","Appendix 4, section 5.1.1"]],
  used:["cable"],
  parts:[{cols:["Device","Cc"],rows:[["MCB, RCBO, cartridge fuse (BS 88, BS 1361)","1.00"],["Semi-enclosed (rewireable) fuse, BS 3036","0.725"]]}]},

{ id:"vd", title:"Voltage drop limits",
  what:"The most voltage you're allowed to lose between the origin and the end of a circuit.",
  where:[["BS","Appendix 4, Table 4Ab (section 6.4)"]],
  used:["vd"],
  parts:[{cols:["Supply","Lighting","Other uses"],rows:[["Public (low voltage) supply","3% = 6.9 V","5% = 11.5 V"],["Private supply","6% = 13.8 V","8% = 18.4 V"]]}]},

{ id:"k", title:"k values for protective conductors",
  what:"The k in the adiabatic equation. It depends on the conductor and its insulation.",
  where:[["BS","Tables 54.3 and 54.4 (Chapter 54)"]],
  used:["adiabatic"],
  parts:[{cols:["Copper CPC","70°C thermoplastic (PVC)","90°C thermosetting"],
    rows:[["Separate insulated conductor (Table 54.3)","143","176"],["Core in a cable, e.g. twin and earth (Table 54.4)","115","143"]]}]},

{ id:"bond", title:"Main protective bonding conductor size",
  what:"Minimum size of the main bonding to gas, water and other extraneous parts.",
  where:[["BS","Table 54.8 (PME) and Regulation 544.1.1"]],
  note:"On a non-PME supply: at least half the size of the earthing conductor, and not less than 6 mm² copper.",
  used:[],
  parts:[{cap:"PME supply (BS 7671 Table 54.8)", cols:["Supply neutral (copper)","Main bonding (copper)"],
    rows:[["35 mm² or less","10 mm²"],["Over 35 up to 50 mm²","16 mm²"],["Over 50 up to 95 mm²","25 mm²"],["Over 95 up to 150 mm²","35 mm²"],["Over 150 mm²","50 mm²"]]}]},

{ id:"units", title:"Units and conversions",
  what:"Most wrong answers are a units slip. Convert everything to the base unit first.",
  where:[["GEN","General maths: not from a book"]],
  used:["ohm","r1r2","pfc","ir"],
  parts:[{cols:["Prefix","Means","Example"],rows:[["M (mega)","× 1,000,000","2 MΩ = 2,000,000 Ω"],["k (kilo)","× 1,000","9.5 kW = 9,500 W"],["m (milli)","÷ 1,000","470 mΩ = 0.47 Ω"],["µ (micro)","÷ 1,000,000","100 µA = 0.0001 A"]]},
    {cols:["To change","Do this"],rows:[["mΩ to Ω","÷ 1000"],["kW to W","× 1000"],["A to kA","÷ 1000"],["mA to A","÷ 1000"],["ms to s","÷ 1000"],["mV to V","÷ 1000"]]}]}
];
})();
