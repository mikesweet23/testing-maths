/* Look-up tables. Each one says where it lives in the real books, so apprentices learn where to look.
   "where": [book, reference]. Books: BS (BS 7671 Wiring Regulations), OSG (On-Site Guide), GN3 (Guidance Note 3).
   "used": calculator ids this table feeds. Check values against the edition used at college. */
(function(){
const RATINGS = [6,10,16,20,25,32,40,50,63];
const zc = (m,In) => Math.round(21850/(m*In));            // max Zs in hundredths of an ohm (whole numbers avoid rounding slips)
const zmax = (m,In) => (zc(m,In)/100).toFixed(2);
const z80 = (m,In) => (Math.round(zc(m,In)*0.8)/100).toFixed(2);

/* Cable current ratings (A) and voltage drop (mV/A/m), BS 7671 Appendix 4. Arrays follow "sizes".
   Phase "1" = single-phase (2 cables / 2-core), "3" = three-phase (3 or 4 cables / 3 or 4-core). */
const CABLE_DATA = window.CABLE_DATA = {
  te: {name:"Flat twin and earth (70°C PVC)", short:"twin and earth", insul:"pvc", table:"cable", ref:"Table 4D5", phases:["1"],
    sizes:["1","1.5","2.5","4","6","10","16"],
    methods:{
      C:{name:"Method C: clipped direct, or buried in plaster", "1":[16,20,27,37,47,64,85]},
      A:{name:"Method A: in conduit in an insulated wall", "1":[11.5,14.5,20,26,32,44,57]},
      "100":{name:"Method 100: above a plasterboard ceiling, insulation up to 100 mm", "1":[13,16,21,27,34,45,57]},
      "101":{name:"Method 101: above a plasterboard ceiling, insulation over 100 mm", "1":[10.5,13,17,22,27,36,46]},
      "102":{name:"Method 102: in an insulated stud wall, touching the inner wall", "1":[13,16,21,27,35,47,63]},
      "103":{name:"Method 103: in an insulated stud wall, not touching the inner wall", "1":[8,10,13.5,17.5,23.5,32,42.5]}},
    mv:{"1":[44,29,18,11,7.3,4.4,2.8]}},
  singles: {name:"PVC single-core cables (e.g. 6491X) in conduit or trunking", short:"PVC singles in conduit", insul:"pvc", table:"singles", ref:"Tables 4D1A and 4D1B", phases:["1","3"],
    sizes:["1","1.5","2.5","4","6","10","16"],
    methods:{
      B:{name:"Method B: in conduit or trunking on a wall", "1":[13.5,17.5,24,32,41,57,76], "3":[12,15.5,21,28,36,50,68]},
      A:{name:"Method A: in conduit in an insulated wall", "1":[11,14.5,19.5,26,34,46,61], "3":[10.5,13.5,18,24,31,42,56]}},
    mv:{"1":[44,29,18,11,7.3,4.4,2.8], "3":[38,25,15,9.5,6.4,3.8,2.4]}},
  multi: {name:"PVC multicore, non-armoured (70°C)", short:"PVC multicore", insul:"pvc", table:"multi", ref:"Tables 4D2A and 4D2B", phases:["1","3"],
    sizes:["1","1.5","2.5","4","6","10","16"],
    methods:{
      C:{name:"Method C: clipped direct", "1":[15,19.5,27,36,46,63,85], "3":[13.5,17.5,24,32,41,57,76]},
      B:{name:"Method B: in conduit or trunking on a wall", "1":[13,16.5,23,30,38,52,69], "3":[11.5,15,20,27,34,46,62]},
      A:{name:"Method A: in conduit in an insulated wall", "1":[11,14,18.5,25,32,43,57], "3":[10,13,17.5,23,29,39,52]},
      E:{name:"Method E: in free air or on perforated tray", "1":[17,22,30,40,51,70,94], "3":[14.5,18.5,25,34,43,60,80]}},
    mv:{"1":[44,29,18,11,7.3,4.4,2.8], "3":[38,25,15,9.5,6.4,3.8,2.4]}},
  swa: {name:"XLPE steel wire armoured (SWA), 90°C", short:"XLPE SWA", insul:"xlpe", table:"swa", ref:"Tables 4E4A and 4E4B", phases:["1","3"],
    sizes:["1.5","2.5","4","6","10","16"],
    methods:{
      C:{name:"Method C: clipped direct", "1":[27,36,49,62,85,110], "3":[23,31,42,53,73,94]},
      E:{name:"Method E: in free air or on perforated tray", "1":[29,39,52,66,90,115], "3":[25,33,44,56,78,99]}},
    mv:{"1":[31,19,12,7.9,4.7,2.9], "3":[27,16,10,6.8,4.0,2.5]}}
};
window.CA_DATA = {pvc:{25:1.03,30:1,35:0.94,40:0.87,45:0.79,50:0.71}, xlpe:{25:1.02,30:1,35:0.96,40:0.91,45:0.87,50:0.82}};
window.CG_DATA = {bunched:[1,0.8,0.7,0.65,0.6,0.57,0.54,0.52,0.5], layer:[1,0.85,0.79,0.75,0.73,0.72,0.72,0.71,0.70]};
// R1+R2 per metre at 20°C for twin and earth (mΩ/m)
window.TE_R12 = {"1.0/1.0":36.20,"1.5/1.0":30.20,"2.5/1.5":19.51,"4/1.5":16.71,"6/2.5":10.49,"10/4":6.44,"16/6":4.23};

// Builds the table parts for a cable type: one part per phase, a column per method, then mV/A/m
function cableParts(key){
  const d=CABLE_DATA[key], ms=Object.keys(d.methods);
  return d.phases.map(ph=>({
    cap: d.phases.length>1 ? (ph==="1" ? "Single-phase: 2 cables or 2-core" : "Three-phase: 3 or 4 cables, or 3 or 4-core") : null,
    cols:["Size (mm²)"].concat(ms.map(m=>d.methods[m].name.replace(/:.*/,"")+" (A)"), ["Voltage drop (mV/A/m)"]),
    rows:d.sizes.map((s,i)=>[s].concat(ms.map(m=>String(d.methods[m][ph][i])), [String(d.mv[ph][i])]))
  }));
}
const methodKey = key=>{ const d=CABLE_DATA[key]; return Object.keys(d.methods).map(m=>d.methods[m].name).join(". ")+"."; };

window.TABLES = [

{ id:"res", title:"Resistance of copper conductors",
  what:"How many milliohms each metre of conductor adds, at 20°C. Use it to work out what R1 + R2 (or r1, r2) should be.",
  where:[["OSG","Appendix I"],["GN3","Appendix B"]],
  note:"These aren't in BS 7671 itself. Values are in mΩ per metre: multiply by the length, then ÷ 1000 for ohms.",
  used:["r1r2","ring","zs","maxlen","zscorr"],
  parts:[
    {cap:"Single conductor", cols:["Size (mm²)","mΩ/m at 20°C"],
     rows:[["1.0","18.10"],["1.5","12.10"],["2.5","7.41"],["4","4.61"],["6","3.08"],["10","1.83"],["16","1.15"],["25","0.727"],["35","0.524"]]},
    {cap:"Twin and earth: line + CPC together (R1 + R2 per metre)", cols:["Cable (line / CPC)","R1+R2 mΩ/m"],
     rows:[["1.0 / 1.0","36.20"],["1.5 / 1.0","30.20"],["2.5 / 1.5","19.51"],["4 / 1.5","16.71"],["6 / 2.5","10.49"],["10 / 4","6.44"],["16 / 6","4.23"]]}
  ]},

{ id:"temp", title:"Temperature multiplier",
  what:"Table resistances are at 20°C. A working cable is hotter, so its resistance is higher. Multiply by this to get the hot value for design sums.",
  where:[["OSG","Appendix I"],["GN3","Appendix B"]],
  used:["r1r2","zscorr","maxlen"],
  parts:[{cols:["Cable insulation","Max working temp","Multiplier"],
    rows:[["Thermoplastic (PVC), e.g. twin and earth","70°C","1.20"],["Thermosetting (XLPE), e.g. SWA","90°C","1.28"]]}]},

{ id:"zsmax", title:"Maximum Zs for circuit breakers",
  what:"The highest earth fault loop impedance that still lets the breaker trip instantly. Your Zs must be below this.",
  where:[["BS","Table 41.3 (Chapter 41)"],["OSG","Appendix B (80% values)"],["GN3","Appendix B"]],
  note:"Table 41.3 values are for U0 = 230 V and Cmin = 0.95, and cover both 0.4 s and 5 s. The 80% column is the rule of thumb for comparing with a reading taken on a cold cable.",
  used:["zs","zscorr","maxlen"],
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
  used:["zs","pfc","maxlen","zscorr"],
  parts:[{cols:["Earthing system","Typical Ze"],rows:[["TN-C-S (PME)","0.35 Ω"],["TN-S","0.8 Ω"],["TT","21 Ω"]]},
    {cols:["Supply","Max declared PFC"],rows:[["230 V single-phase","16 kA"]]}]},

{ id:"rcd", title:"RCDs: max Zs, earth electrodes and trip times",
  what:"For TT systems, where the RCD does the fault protection, and for testing RCDs.",
  where:[["BS","Table 41.5 (Regulation 411.5.3)"],["GN3","RCD testing section"]],
  note:"TT rule: RA × IΔn ≤ 50 V. An earth electrode reading above 200 Ω may not be stable (OSG and GN3 guidance).",
  used:["zs","tt"],
  parts:[{cap:"BS 7671 Table 41.5 maximum Zs with an RCD", cols:["RCD rating IΔn","Max Zs"],rows:[["30 mA","1667 Ω"],["100 mA","500 Ω"],["300 mA","167 Ω"],["500 mA","100 Ω"]]},
    {cap:"RCD test: maximum trip times (general non-delay type)", cols:["Test current","Must trip within"],rows:[["1 × IΔn","300 ms"],["5 × IΔn (additional protection, 30 mA)","40 ms"]]}]},

{ id:"ir", title:"Minimum insulation resistance",
  what:"Which test voltage to use, and the lowest acceptable reading.",
  where:[["BS","Table 64 (Chapter 64)"],["GN3","Insulation resistance section"]],
  note:"These are minimums. A healthy new circuit usually reads far higher, often over 200 MΩ. A low reading still needs looking into.",
  used:["ir"],
  parts:[{cols:["Circuit","Test voltage","Minimum"],rows:[["SELV and PELV","250 V DC","0.5 MΩ"],["Up to 500 V (normal 230 V circuits)","500 V DC","1 MΩ"],["Above 500 V","1000 V DC","1 MΩ"]]}]},

{ id:"methods", title:"Installation reference methods",
  what:"How a cable is installed decides how well it can lose heat, and so which column of the rating tables you use.",
  where:[["BS","Appendix 4, Table 4A2"]],
  note:"Table 4A2 lists dozens of numbered installation methods and the reference method each one uses. These are the common ones.",
  used:["cable","vd"],
  parts:[{cols:["Method","What it means","Typical example"],
    rows:[["A","Enclosed in conduit in a thermally insulating wall","Singles in conduit inside an insulated stud wall"],
      ["B","Enclosed in conduit or trunking on (or in) a wall","Singles in trunking or surface conduit"],
      ["C","Clipped direct to a surface, or buried directly in plaster or masonry","T&E clipped to a joist or chased into a wall"],
      ["D","In the ground: direct, or in ducts in the ground","SWA buried to an outbuilding"],
      ["E","Multicore cable in free air, or on a perforated cable tray","SWA on a tray in a plant room"],
      ["F","Single-core cables touching, in free air or on a tray","Large singles on a cable ladder"],
      ["G","Single-core cables spaced apart in free air","Spaced singles on cleats"],
      ["100","T&E above a plasterboard ceiling, insulation up to 100 mm","Lighting cable in a loft with thin insulation"],
      ["101","T&E above a plasterboard ceiling, insulation over 100 mm","Lighting cable buried in a modern loft"],
      ["102","T&E in an insulated stud wall, touching the inner wall surface","Socket drop in an insulated partition"],
      ["103","T&E in an insulated stud wall, not touching the inner wall surface","Cable in the middle of an insulated stud wall"]]}]},

{ id:"cable", title:"Twin and earth: current ratings and voltage drop",
  what:"Current a flat twin and earth cable can carry for each installation method (It), and its voltage drop per amp per metre.",
  where:[["BS","Appendix 4, Table 4D5"]],
  note:"70°C thermoplastic flat twin and earth, single-phase. Ratings are before correction factors. "+methodKey("te"),
  used:["cable","vd","maxlen"],
  parts:cableParts("te")},

{ id:"singles", title:"PVC single-core cables: current ratings and voltage drop",
  what:"Singles such as 6491X in conduit or trunking. Single-phase uses 2 cables, three-phase uses 3 or 4.",
  where:[["BS","Appendix 4, Tables 4D1A (ratings) and 4D1B (voltage drop)"]],
  note:"70°C thermoplastic, copper. The full table has more methods (C, F, G) and sizes above 16 mm². "+methodKey("singles"),
  used:["cable","vd"],
  parts:cableParts("singles")},

{ id:"multi", title:"PVC multicore cables: current ratings and voltage drop",
  what:"Non-armoured multicore cable, e.g. 2-core for single-phase, or 3 and 4-core for three-phase.",
  where:[["BS","Appendix 4, Tables 4D2A (ratings) and 4D2B (voltage drop)"]],
  note:"70°C thermoplastic, copper. Sizes above 16 mm² are in the full table. "+methodKey("multi"),
  used:["cable","vd"],
  parts:cableParts("multi")},

{ id:"swa", title:"XLPE SWA cables: current ratings and voltage drop",
  what:"Steel wire armoured cable with 90°C thermosetting (XLPE) insulation, e.g. to a garage, outbuilding or plant. Runs hotter than PVC, so it carries more current for its size.",
  where:[["BS","Appendix 4, Tables 4E4A (ratings) and 4E4B (voltage drop)"]],
  note:"90°C thermosetting, copper, armoured. Buried cable (Method D) and sizes above 16 mm² are in the full table. Use the 90°C column of Table 4B1 for Ca. "+methodKey("swa"),
  used:["cable","vd"],
  parts:cableParts("swa")},

{ id:"maker", title:"Manufacturers' current rating tables",
  what:"Cable makers publish their own data sheets with current ratings, voltage drop and resistance.",
  where:[["GEN","Manufacturer's data sheet or website"]],
  note:"For design to BS 7671 you normally use the Appendix 4 tables. Manufacturers' figures for British Standard cables are usually taken from the same tables. Only use a manufacturer's figures if they're for the exact cable you're installing, and check they agree with BS 7671.",
  used:["cable"],
  parts:[{cols:["Use manufacturer's data for","Use BS 7671 Appendix 4 for"],rows:[["Cable types not in BS 7671 (e.g. some fire-resistant or data cables)","Twin and earth, singles, PVC multicore, SWA"],["Overall diameter, bending radius, weight","Current rating and voltage drop for design sums"]]}]},

{ id:"ca", title:"Ca: ambient temperature factor",
  what:"Cables in hot places can carry less current. Reference temperature is 30°C (factor 1.00).",
  where:[["BS","Appendix 4, Table 4B1"]],
  note:"Use the column for the cable's insulation: 70°C thermoplastic for twin and earth and PVC cables, 90°C thermosetting for XLPE SWA.",
  used:["cable"],
  parts:[{cols:["Ambient temperature","70°C thermoplastic (PVC)","90°C thermosetting (XLPE)"],rows:[25,30,35,40,45,50].map(t=>[t+"°C", window.CA_DATA.pvc[t].toFixed(2), window.CA_DATA.xlpe[t].toFixed(2)])}]},

{ id:"cg", title:"Cg: grouping factor",
  what:"Cables bunched together heat each other up, so each can carry less.",
  where:[["BS","Appendix 4, Table 4C1"]],
  note:"Count the circuits, not the cables. The full table has more arrangements, such as cables spaced apart or on trays.",
  used:["cable"],
  parts:[{cols:["Number of circuits","Bunched, enclosed or embedded","Single layer on a wall, touching"],rows:[1,2,3,4,5,6,7,8,9].map(n=>[String(n), window.CG_DATA.bunched[n-1].toFixed(2), window.CG_DATA.layer[n-1].toFixed(2)])}]},

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
  used:["vd","maxlen"],
  note:"For three-phase circuits, use the three-phase mV/A/m and compare with a percentage of 400 V.",
  parts:[{cols:["Supply","Lighting","Other uses"],rows:[["Public (low voltage) supply","3%","5%"],["Private supply","6%","8%"]]},
    {cap:"In volts", cols:["Limit","Single-phase (230 V)","Three-phase (400 V)"],rows:[["3%","6.9 V","12 V"],["5%","11.5 V","20 V"],["6%","13.8 V","24 V"],["8%","18.4 V","32 V"]]}]},

{ id:"k", title:"k values for protective conductors",
  what:"The k in the adiabatic equation. It depends on the conductor and its insulation.",
  where:[["BS","Tables 54.2 and 54.3 (Chapter 54)"]],
  used:["adiabatic"],
  parts:[{cols:["Copper CPC","70°C thermoplastic (PVC)","90°C thermosetting"],
    rows:[["Separate insulated conductor (Table 54.2)","143","176"],["Core in a cable, e.g. twin and earth (Table 54.3)","115","143"]]}]},

{ id:"bond", title:"Main protective bonding conductor size",
  what:"Minimum size of the main bonding to gas, water and other extraneous parts.",
  where:[["BS","Table 54.8 (PME) and Regulation 544.1.1"]],
  note:"On a non-PME supply: at least half the size of the earthing conductor, and not less than 6 mm² copper.",
  used:[],
  parts:[{cap:"PME supply (BS 7671 Table 54.8)", cols:["Supply neutral (copper)","Main bonding (copper)"],
    rows:[["35 mm² or less","10 mm²"],["Over 35 up to 50 mm²","16 mm²"],["Over 50 up to 95 mm²","25 mm²"],["Over 95 up to 150 mm²","35 mm²"],["Over 150 mm²","50 mm²"]]}]},

{ id:"diversity", title:"Diversity for a household",
  what:"Not everything in a house runs flat out at once. Diversity estimates the realistic maximum demand, to size the main fuse, meter tails and main switch.",
  where:[["OSG","Appendix A (Table A2)"]],
  note:"This is the On-Site Guide's method for individual household installations. It's an estimate, and a designer can use other methods. EV charge points are counted at full load unless load managed.",
  used:["demand"],
  parts:[{cols:["Load","Allowance"],rows:[
    ["Lighting","66% of the total demand"],
    ["Heating and power (not listed below)","100% up to 10 A, plus 50% of the rest"],
    ["Cooking appliances","10 A, plus 30% of the rest, plus 5 A if the cooker control unit has a socket"],
    ["Instantaneous water heaters (e.g. showers)","100% of the largest, 100% of the second largest, 25% of the rest"],
    ["Thermostatic water heaters (immersion heaters)","100% (no diversity)"],
    ["Floor warming and storage heating","100% (no diversity)"],
    ["Standard socket circuits (rings and radials)","100% of the largest circuit, plus 40% of every other circuit"]]}]},

{ id:"ac", title:"AC and three-phase quick facts",
  what:"The numbers behind the three-phase and power factor sums.",
  where:[["GEN","Electrical science: in your college notes and textbooks"]],
  used:["threeph","pf"],
  parts:[{cols:["Quantity","Value or formula"],rows:[
    ["UK single-phase (line to neutral)","230 V"],["UK three-phase (line to line)","400 V"],["√3","1.732"],
    ["Line voltage from phase voltage","VL = √3 × Vph = 1.732 × 230 = 400 V"],
    ["Three-phase power","P = √3 × VL × IL × pf"],["Single-phase power","P = V × I × pf"],
    ["Apparent power","S = V × I (VA or kVA)"],["Reactive power","Q = √(S² − P²) (var or kvar)"],
    ["Power factor","pf = P ÷ S (no units, 0 to 1)"],
    ["Typical pf","Heaters and kettles 1.0, motors about 0.8 to 0.9"]]}]},

{ id:"units", title:"Units and conversions",
  what:"Most wrong answers are a units slip. Convert everything to the base unit first.",
  where:[["GEN","General maths: not from a book"]],
  used:["ohm","r1r2","pfc","ir","series","threeph","demand"],
  parts:[{cols:["Prefix","Means","Example"],rows:[["M (mega)","× 1,000,000","2 MΩ = 2,000,000 Ω"],["k (kilo)","× 1,000","9.5 kW = 9,500 W"],["m (milli)","÷ 1,000","470 mΩ = 0.47 Ω"],["µ (micro)","÷ 1,000,000","100 µA = 0.0001 A"]]},
    {cols:["To change","Do this"],rows:[["mΩ to Ω","÷ 1000"],["kW to W","× 1000"],["A to kA","÷ 1000"],["mA to A","÷ 1000"],["ms to s","÷ 1000"],["mV to V","÷ 1000"]]}]}
];
})();
