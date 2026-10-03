/* Multiple-choice question bank for the quiz.
   To add a question, copy one block and change it. Keep the correct answer FIRST in "options":
   the app shuffles them before showing. "topic" links the "Learn this" button to a calculator
   (ohm, r1r2, ring, ir, zs, pfc, vd, cable, adiabatic). "cat" is one of: test, sum, site, where.
   Give every question its own unique id and never reuse an old one. */
window.MCQ = [

/* ---------- Which test? ---------- */
{ id:"t1", cat:"test", topic:"r1r2",
  q:"You've wired a new radial circuit. You want to prove the CPC is connected all the way to the furthest point. Which test?",
  options:["Continuity of protective conductors (R1 + R2)","Insulation resistance","Earth fault loop impedance (Zs)","RCD test"],
  why:"Linking line and CPC at the board and measuring at the far end proves the CPC is continuous. That's the R1 + R2 test." },

{ id:"t2", cat:"test", topic:"ir",
  q:"Before you switch on, you need to prove there's no breakdown in the cable insulation between live conductors and earth. Which test?",
  options:["Insulation resistance","Continuity of protective conductors","Prospective fault current","Voltage drop"],
  why:"An insulation resistance tester applies 500 V DC between conductors to show the insulation is sound before the circuit goes live." },

{ id:"t3", cat:"test", topic:"ring",
  q:"You need to check a ring final circuit really is one unbroken loop, with no breaks or interconnections. Which test?",
  options:["Ring final circuit continuity (end to end, then cross-connected)","Insulation resistance","Earth fault loop impedance","Polarity only"],
  why:"The three-step ring test checks each conductor end to end, then cross-connects them so every socket should read about the same." },

{ id:"t4", cat:"test", topic:"zs",
  q:"You want to know whether the breaker will disconnect fast enough if a line-to-earth fault happens at the furthest socket. Which test?",
  options:["Earth fault loop impedance (Zs)","Insulation resistance","Ring final circuit continuity","Voltage drop"],
  why:"A low enough Zs means a big enough fault current to trip the breaker instantly. You compare it with the maximum Zs for that breaker." },

{ id:"t5", cat:"test", topic:"pfc",
  q:"You need to confirm the breakers in the consumer unit can safely interrupt the biggest current that could flow in a fault. Which test?",
  options:["Prospective fault current (PFC)","Earth fault loop impedance at the furthest point","Insulation resistance","Continuity of protective conductors"],
  why:"PFC is measured at the origin, where fault current is highest. It must be below the breaking capacity of the devices, e.g. 6 kA." },

{ id:"t6", cat:"test", topic:"r1r2",
  q:"Which of these is normally the FIRST test in the dead testing sequence?",
  options:["Continuity of protective conductors","Insulation resistance","Earth fault loop impedance","RCD test"],
  why:"Continuity comes first. If the CPC isn't connected, later tests could give misleading results or be unsafe." },

{ id:"t7", cat:"test", topic:"zs",
  q:"Which of these tests has to be done with the supply switched ON?",
  options:["Earth fault loop impedance (Zs)","Insulation resistance","Continuity of protective conductors (R1 + R2)","Ring final circuit continuity"],
  why:"Zs, PFC and RCD tests are live tests. Continuity and insulation resistance are dead tests, done with the supply isolated." },

{ id:"t8", cat:"test", topic:"ir",
  q:"Why are the dead tests done before the live tests?",
  options:["To prove the installation is safe to switch on","Because live tests need the readings to be warm","It doesn't matter which order they're done in","So the RCD doesn't trip"],
  why:"Dead tests prove the CPC is connected and the insulation is sound. Only then is it safe to put the supply on and do the live tests." },

{ id:"t9", cat:"test", topic:"zs",
  q:"An existing installation is fed from the supply company's cable. You need the impedance of the part OUTSIDE the installation. What do you measure?",
  options:["Ze, at the origin with the main earth disconnected","Zs at the furthest socket","R1 + R2 at the board","Insulation resistance at the origin"],
  why:"Ze is the external earth fault loop impedance. Disconnecting the main earth removes parallel paths. Reconnect it straight after." },

/* ---------- Which sum? ---------- */
{ id:"s1", cat:"sum", topic:"ohm",
  q:"You need the design current of a 9.5 kW electric shower. Which equation do you use?",
  options:["I = P ÷ V","V = I × R","Zs = Ze + (R1 + R2)","S = √(I²t) ÷ k"],
  why:"Design current Ib = power ÷ voltage. 9500 ÷ 230 = 41.3 A." },

{ id:"s2", cat:"sum", topic:"ir",
  q:"You measured insulation resistance on three circuits separately. Which equation gives the combined reading if they'd been tested together?",
  options:["1/Rt = 1/R1 + 1/R2 + 1/R3","Rt = R1 + R2 + R3","Rt = (R1 + R2 + R3) ÷ 3","Rt = R1 × R2 × R3"],
  why:"Circuits tested together are in parallel, so you add the reciprocals. The total is always lower than the smallest reading." },

{ id:"s3", cat:"sum", topic:"ring",
  q:"Ring test, step 3 (line and CPC cross-connected). What should each socket read, line to earth?",
  options:["(r1 + r2) ÷ 4","(r1 + r2) ÷ 2","r1 + r2","(r1 + rn) ÷ 4"],
  why:"With the ends cross-connected, every socket should read about a quarter of r1 + r2. (r1 + rn) ÷ 4 is step 2, line to neutral." },

{ id:"s4", cat:"sum", topic:"zs",
  q:"You know Ze and R1 + R2. Which equation gives the earth fault loop impedance?",
  options:["Zs = Ze + (R1 + R2)","Zs = Ze × (R1 + R2)","Zs = Ze − (R1 + R2)","Zs = 230 ÷ (R1 + R2)"],
  why:"The fault loop is the outside part (Ze) plus your circuit's line and CPC (R1 + R2) added together." },

{ id:"s5", cat:"sum", topic:"zs",
  q:"Which equation gives the maximum Zs for a Type B breaker?",
  options:["Max Zs = (0.95 × 230) ÷ (5 × In)","Max Zs = 230 ÷ In","Max Zs = (0.95 × 230) ÷ (10 × In)","Max Zs = In ÷ 230"],
  why:"A Type B trips instantly at 5 × In. 0.95 allows for the supply voltage being a bit low (Cmin)." },

{ id:"s6", cat:"sum", topic:"pfc",
  q:"Which equation gives the prospective fault current?",
  options:["Ipf = U0 ÷ Z","Ipf = U0 × Z","Ipf = Z ÷ U0","Ipf = P ÷ V"],
  why:"It's Ohm's law: current = voltage ÷ impedance, using the impedance measured at the origin." },

{ id:"s7", cat:"sum", topic:"vd",
  q:"A long cable runs to a garden office. Which equation tells you how many volts are lost along it?",
  options:["VD = (mV/A/m × Ib × L) ÷ 1000","VD = Ib × L","VD = mV/A/m ÷ L","VD = 230 ÷ Ib"],
  why:"Take the mV/A/m from the cable tables, times the current and the length. Divide by 1000 to turn millivolts into volts." },

{ id:"s8", cat:"sum", topic:"cable",
  q:"Which rule must every circuit's ratings follow?",
  options:["Ib ≤ In ≤ Iz","In ≤ Ib ≤ Iz","Iz ≤ In ≤ Ib","Ib = In = Iz"],
  why:"Design current must not exceed the breaker rating, and the breaker rating must not exceed the cable's current-carrying capacity once installed." },

{ id:"s9", cat:"sum", topic:"adiabatic",
  q:"You need to check a CPC is thick enough to survive the fault energy until the breaker trips. Which equation?",
  options:["S = √(I²t) ÷ k","S = I × t × k","S = I ÷ k","S = (r1 + r2) ÷ 4"],
  why:"That's the adiabatic equation. S is the minimum CPC cross-section in mm²." },

{ id:"s10", cat:"sum", topic:"cable",
  q:"A cable runs through 100 mm of loft insulation and is bunched with two other circuits. What do you do?",
  options:["Apply correction factors (Ci and Cg) to find the minimum It","Nothing, it's only insulation","Add 10% to the cable size","Use the voltage drop equation only"],
  why:"Insulation and grouping both stop heat escaping, so the cable can carry less. Divide In by the factors to find the minimum It." },

{ id:"s11", cat:"sum", topic:"r1r2",
  q:"You know the cable's resistance in mΩ per metre and its length. How do you get the expected R1 + R2 in ohms?",
  options:["(mΩ/m × length) ÷ 1000","mΩ/m × length × 1000","mΩ/m ÷ length","length ÷ mΩ/m"],
  why:"mΩ/m × metres gives milliohms. Divide by 1000 to get ohms. Forgetting the ÷ 1000 is the most common slip." },

/* ---------- On site: values and what readings mean ---------- */
{ id:"v1", cat:"site", topic:"ir",
  q:"A normal 230 V circuit is tested at 500 V DC. What's the minimum acceptable insulation resistance?",
  options:["1 MΩ","0.5 MΩ","2 MΩ","200 MΩ"],
  why:"BS 7671 Table 64: 1 MΩ minimum at 500 V DC. In practice you'd expect much higher, and a low reading should be investigated." },

{ id:"v2", cat:"site", topic:"zs",
  q:"At what multiple of its rating does a Type B breaker trip instantly?",
  options:["5 × In","3 × In","10 × In","20 × In"],
  why:"Type B is 5 × In, Type C is 10 × In and Type D is 20 × In." },

{ id:"v3", cat:"site", topic:"zs",
  q:"Why do you compare a measured Zs with 80% of the table maximum?",
  options:["The cable is cold when tested, and its resistance rises when it warms up in use","Testers always read 20% high","To allow for the RCD","Because the supply is 80% of 230 V"],
  why:"Copper resistance goes up with temperature. The 80% rule makes sure Zs will still be under the limit when the circuit is running hot." },

{ id:"v4", cat:"site", topic:"vd",
  q:"What's the maximum voltage drop allowed for a lighting circuit on a public supply?",
  options:["3% (6.9 V)","5% (11.5 V)","10% (23 V)","1% (2.3 V)"],
  why:"3% for lighting and 5% for other uses (BS 7671 Appendix 4)." },

{ id:"v5", cat:"site", topic:"r1r2",
  q:"Your R1 + R2 reading is much higher than the value you worked out. What's the most likely cause?",
  options:["A loose or poor termination, or the leads weren't nulled","The circuit is too short","The breaker is the wrong type","The insulation is too good"],
  why:"Extra resistance usually means a bad connection somewhere. Null the leads first, then check each termination." },

{ id:"v6", cat:"site", topic:"r1r2",
  q:"What should you do before taking a continuity reading with a low-resistance ohmmeter?",
  options:["Null (zero) the test leads","Switch the supply on","Set the tester to 500 V","Disconnect the CPC"],
  why:"Nulling takes the leads' own resistance out of every reading." },

{ id:"v7", cat:"site", topic:"ring",
  q:"Ring test, step 1: the line and neutral end-to-end readings should be...",
  options:["Within 0.05 Ω of each other","Exactly zero","At least 1 MΩ","Double each other"],
  why:"Line and neutral are the same size, so their end-to-end readings should match to within 0.05 Ω." },

{ id:"v8", cat:"site", topic:"ring",
  q:"In step 3 of a ring test, one socket reads noticeably higher than the rest. What does that suggest?",
  options:["It's on a spur, or there's a poor connection there","The ring is perfect","The RCD has tripped","The insulation has failed"],
  why:"On a proper ring every socket reads about the same. A higher reading points to a spur or a high-resistance joint." },

{ id:"v9", cat:"site", topic:"ir",
  q:"You're about to do an insulation resistance test. What should you do with sensitive equipment like LED drivers or smart switches?",
  options:["Disconnect it, or link line and neutral and test to earth only","Leave it connected and test at 1000 V","Nothing, it can't be damaged","Switch the supply on first"],
  why:"500 V DC can damage electronics, and connected loads give false low readings." },

{ id:"v10", cat:"site", topic:"zs",
  q:"You've just measured Ze with the main earthing conductor disconnected. What must you do next?",
  options:["Reconnect the main earth before doing anything else","Leave it off until all tests are done","Measure Zs with it still off","Turn the RCD off"],
  why:"With the main earth off, nothing in the installation is earthed. Reconnect it straight away." },

{ id:"v11", cat:"site", topic:"pfc",
  q:"The PFC at the origin is 7.2 kA. The consumer unit's breakers are rated at 6 kA. What's the issue?",
  options:["The fault current is higher than the breakers can safely interrupt","None, a higher PFC is better","Voltage drop will be too high","The CPC is too big"],
  why:"PFC must not exceed the breaking capacity unless the board has a higher conditional rating. Speak to your supervisor." },

{ id:"v12", cat:"site", topic:"ohm",
  q:"In UK sums, what value do you use for the nominal single-phase voltage U0?",
  options:["230 V","240 V","110 V","400 V"],
  why:"The UK nominal voltage has been 230 V since 1995. 400 V is three-phase line to line." }
  ,

/* ---------- Where would you find it? ---------- */
{ id:"w1", cat:"where", topic:"zs",
  q:"Where would you find the maximum Zs for a Type B circuit breaker?",
  options:["BS 7671 Table 41.3","BS 7671 Table 4D5","BS 7671 Table 54.8","BS 7671 Table 52.2"],
  why:"Table 41.3 in Chapter 41 lists max Zs for Type B, C and D breakers. The On-Site Guide also gives 80% values for checking readings." },

{ id:"w2", cat:"where", topic:"cable",
  q:"Where do you find the current rating and voltage drop (mV/A/m) for flat twin and earth?",
  options:["BS 7671 Appendix 4, Table 4D5","BS 7671 Table 41.3","BS 7671 Table 54.4","BS 7671 Table 64"],
  why:"Appendix 4 holds the cable tables. Table 4D5 is 70°C thermoplastic flat twin and earth." },

{ id:"w3", cat:"where", topic:"r1r2",
  q:"Where would you look up the resistance per metre of a cable to work out R1 + R2?",
  options:["The On-Site Guide (Appendix I) or Guidance Note 3","BS 7671 Table 41.3","BS 7671 Table 4C1","On the breaker"],
  why:"Conductor resistances in mΩ/m are in the On-Site Guide and GN3, not in the main regulations." },

{ id:"w4", cat:"where", topic:"cable",
  q:"Several circuits are bunched together. Which table gives the grouping factor Cg?",
  options:["Table 4C1 (Appendix 4)","Table 4B1 (Appendix 4)","Table 52.2","Table 41.1"],
  why:"4C1 is grouping. 4B1 is ambient temperature (Ca). 52.2 is thermal insulation (Ci)." },

{ id:"w5", cat:"where", topic:"cable",
  q:"The cable runs through a boiler room at 40°C. Which table gives the factor you need?",
  options:["Table 4B1: ambient temperature (Ca)","Table 4C1: grouping (Cg)","Table 52.2: thermal insulation (Ci)","Table 54.3: k values"],
  why:"Ca for ambient temperature is in Appendix 4, Table 4B1. At 40°C it's 0.87 for twin and earth." },

{ id:"w6", cat:"where", topic:"cable",
  q:"A cable passes through 200 mm of loft insulation. Where do you find the derating factor?",
  options:["BS 7671 Table 52.2","BS 7671 Table 4B1","BS 7671 Table 41.5","BS 7671 Appendix 3"],
  why:"Table 52.2 (with Regulation 523.9) gives Ci for cables surrounded by thermal insulation. 200 mm gives 0.63." },

{ id:"w7", cat:"where", topic:"adiabatic",
  q:"You need k for the CPC inside a twin and earth cable. Which table?",
  options:["Table 54.4","Table 54.3","Table 41.3","Table 4D5"],
  why:"54.4 is for a protective conductor that's a core in a cable (k = 115 for 70°C thermoplastic). 54.3 is for a separate insulated CPC (k = 143)." },

{ id:"w8", cat:"where", topic:"ir",
  q:"Where would you find the minimum insulation resistance values and test voltages?",
  options:["BS 7671 Table 64 (Chapter 64)","BS 7671 Table 41.3","BS 7671 Table 4D5","BS 7671 Table 54.8"],
  why:"Chapter 64 covers initial verification. Table 64 gives test voltages and minimum values." },

{ id:"w9", cat:"where", topic:"zs",
  q:"Where do the maximum disconnection times (0.4 s, 5 s and so on) come from?",
  options:["BS 7671 Table 41.1","BS 7671 Table 64","BS 7671 Table 4Ab","BS 7671 Table 52.2"],
  why:"Table 41.1 (Regulation 411.3.2) sets the maximum disconnection times for TN and TT systems." },

{ id:"w10", cat:"where", topic:"zs",
  q:"Where can you find the typical declared Ze values for TN-C-S and TN-S supplies?",
  options:["On-Site Guide, section 1.1 (or ask the network operator)","BS 7671 Table 41.3","BS 7671 Table 64","GN3 RCD section"],
  why:"The On-Site Guide lists typical declared values: 0.35 Ω for TN-C-S, 0.8 Ω for TN-S." },

{ id:"w11", cat:"where", topic:"zs",
  q:"Which table gives the size of main protective bonding on a PME supply?",
  options:["BS 7671 Table 54.8","BS 7671 Table 54.4","BS 7671 Table 4D5","BS 7671 Table 41.5"],
  why:"Table 54.8 sizes main bonding from the supply neutral. With a neutral of 35 mm² or less it's 10 mm² copper." },

{ id:"w12", cat:"where", topic:"zs",
  q:"On a TT system protected by an RCD, where would you find the maximum Zs?",
  options:["BS 7671 Table 41.5","BS 7671 Table 41.3","BS 7671 Table 4C1","On-Site Guide section 1.1"],
  why:"Table 41.5 gives max Zs for RCDs, e.g. 1667 Ω for a 30 mA RCD." },

{ id:"w13", cat:"where", topic:"vd",
  q:"Where are the voltage drop limits (3% and 5%) found?",
  options:["BS 7671 Appendix 4 (Table 4Ab)","BS 7671 Table 41.1","BS 7671 Table 64","BS 7671 Table 54.3"],
  why:"Appendix 4, section 6.4 and Table 4Ab give the voltage drop limits." },

/* ---------- Know your values ---------- */
{ id:"x1", cat:"site", topic:"zs",
  q:"What's the maximum disconnection time for a 32 A socket circuit on a TN system (230 V)?",
  options:["0.4 s","0.2 s","1 s","5 s"],
  why:"Table 41.1: final circuits on TN must disconnect within 0.4 s. On TT it's 0.2 s." },

{ id:"x2", cat:"site", topic:"zs",
  q:"Same 32 A socket circuit, but on a TT system. Maximum disconnection time?",
  options:["0.2 s","0.4 s","1 s","5 s"],
  why:"TT final circuits must disconnect within 0.2 s (Table 41.1)." },

{ id:"x3", cat:"site", topic:"zs",
  q:"What's the maximum disconnection time for a distribution circuit on a TN system?",
  options:["5 s","0.4 s","1 s","0.2 s"],
  why:"Distribution circuits on TN: 5 s. On TT: 1 s." },

{ id:"x4", cat:"site", topic:"zs",
  q:"What's the typical declared Ze for a TN-C-S (PME) supply?",
  options:["0.35 Ω","0.8 Ω","21 Ω","1.37 Ω"],
  why:"0.35 Ω for TN-C-S, 0.8 Ω for TN-S (On-Site Guide section 1.1)." },

{ id:"x5", cat:"site", topic:"zs",
  q:"What's the typical declared Ze for a TN-S supply?",
  options:["0.8 Ω","0.35 Ω","21 Ω","200 Ω"],
  why:"TN-S, with a separate earth from the supply cable sheath, is typically 0.8 Ω." },

{ id:"x6", cat:"site", topic:"pfc",
  q:"What's the highest PFC a network operator typically declares for a single-phase supply?",
  options:["16 kA","6 kA","1 kA","100 kA"],
  why:"16 kA is the usual maximum declared for 230 V single-phase. Consumer units are designed around it (conditional rating)." },

{ id:"x7", cat:"site", topic:"adiabatic",
  q:"What's k for a separate PVC-insulated copper CPC (70°C thermoplastic)?",
  options:["143","115","176","226"],
  why:"Table 54.3: 143. If the CPC is a core in the cable, like twin and earth, it's 115 (Table 54.4)." },

{ id:"x8", cat:"site", topic:"adiabatic",
  q:"What's k for the CPC in a twin and earth cable?",
  options:["115","143","176","100"],
  why:"Table 54.4: 115 for a copper CPC that's a core of a 70°C thermoplastic cable." },

{ id:"x9", cat:"site", topic:"cable",
  q:"What's the ambient temperature factor Ca at 35°C for twin and earth?",
  options:["0.94","1.03","0.87","0.79"],
  why:"Table 4B1: 0.94 at 35°C. It's 1.00 at the reference temperature of 30°C." },

{ id:"x10", cat:"site", topic:"cable",
  q:"What's the grouping factor Cg for three circuits bunched together?",
  options:["0.70","0.80","0.65","0.50"],
  why:"Table 4C1: 2 circuits 0.80, 3 circuits 0.70, 4 circuits 0.65." },

{ id:"x11", cat:"site", topic:"cable",
  q:"A cable is surrounded by 100 mm of thermal insulation. What's Ci?",
  options:["0.78","0.88","0.63","0.50"],
  why:"Table 52.2: 50 mm 0.88, 100 mm 0.78, 200 mm 0.63, 500 mm or more 0.50." },

{ id:"x12", cat:"site", topic:"r1r2",
  q:"What do you multiply a 20°C R1 + R2 value by to get the value at 70°C working temperature?",
  options:["1.20","0.8","1.28","1000"],
  why:"1.20 for 70°C thermoplastic (PVC) cable. 1.28 is for 90°C thermosetting cable." },

{ id:"x13", cat:"site", topic:"zs",
  q:"A 30 mA RCD is tested at 1 × IΔn. It must trip within...",
  options:["300 ms","40 ms","1 s","5 s"],
  why:"General non-delay RCDs must trip within 300 ms at their rated current." },

{ id:"x14", cat:"site", topic:"zs",
  q:"A 30 mA RCD giving additional protection is tested at 5 × IΔn. It must trip within...",
  options:["40 ms","300 ms","200 ms","0.4 s"],
  why:"At 5 × IΔn (150 mA) it must trip within 40 ms." },

{ id:"x15", cat:"site", topic:"zs",
  q:"On a TT system, which rule must the earth electrode resistance RA meet?",
  options:["RA × IΔn ≤ 50 V","RA × IΔn ≤ 230 V","RA ≤ 0.35 Ω","RA ≥ 1 MΩ"],
  why:"Regulation 411.5.3: RA × IΔn must not exceed 50 V. With a 30 mA RCD that allows up to 1667 Ω." },

{ id:"x16", cat:"site", topic:"zs",
  q:"Above what earth electrode resistance might the reading not be stable, according to guidance?",
  options:["200 Ω","20 Ω","1667 Ω","2 Ω"],
  why:"The 1667 Ω limit is the regulation maximum, but guidance says above 200 Ω an electrode may not be stable." },

{ id:"x17", cat:"site", topic:"zs",
  q:"A PME supply has a 25 mm² neutral. What size main protective bonding do you need?",
  options:["10 mm²","6 mm²","16 mm²","4 mm²"],
  why:"Table 54.8: supply neutral 35 mm² or less needs 10 mm² copper main bonding." },

{ id:"x18", cat:"site", topic:"ir",
  q:"What test voltage and minimum value do you use for insulation resistance on a SELV circuit?",
  options:["250 V DC, minimum 0.5 MΩ","500 V DC, minimum 1 MΩ","1000 V DC, minimum 1 MΩ","250 V DC, minimum 2 MΩ"],
  why:"Table 64: SELV and PELV are tested at 250 V DC with a 0.5 MΩ minimum." },

{ id:"x19", cat:"site", topic:"zs",
  q:"A Type C circuit breaker trips instantly between...",
  options:["5 and 10 × In","3 and 5 × In","10 and 20 × In","1 and 2 × In"],
  why:"B: 3 to 5 × In. C: 5 to 10 × In. D: 10 to 20 × In. Max Zs sums use the top figure." },

{ id:"x20", cat:"site", topic:"zs",
  q:"You're feeding a welder with a very high inrush current. Which breaker type would you expect?",
  options:["Type D","Type B","Type C","An RCD on its own"],
  why:"Type D (10 to 20 × In) rides through high inrush from transformers and welders. Its max Zs is much lower." },

{ id:"x21", cat:"site", topic:"vd",
  q:"What's the maximum voltage drop for a socket circuit fed from a public supply?",
  options:["5% (11.5 V)","3% (6.9 V)","8% (18.4 V)","10% (23 V)"],
  why:"5% for uses other than lighting. 3% for lighting." },

{ id:"x22", cat:"site", topic:"cable",
  q:"Twin and earth clipped straight to a wall. Which reference method column do you use in Table 4D5?",
  options:["Method C (clipped direct)","Method 100","Method 103","Method A"],
  why:"Clipped direct is Reference Method C. It gives the highest rating because heat escapes easily." },

{ id:"x23", cat:"site", topic:"zs",
  q:"Using Table 41.3, what's the maximum Zs for a B32 breaker?",
  options:["1.37 Ω","2.19 Ω","0.68 Ω","1.10 Ω"],
  why:"1.37 Ω. 1.10 Ω is 80% of it, the figure to compare a cold measured reading with." },

/* ---------- More: which test / which sum ---------- */
{ id:"t10", cat:"test", topic:"zs",
  q:"Which test checks that single-pole switches and fuses are in the line conductor only?",
  options:["Polarity","Insulation resistance","Earth fault loop impedance","Voltage drop"],
  why:"Polarity confirms switches are in the line conductor and that lampholders and sockets are connected correctly." },

{ id:"t11", cat:"test", topic:"zs",
  q:"You've installed a TT system. Which test checks the earth electrode?",
  options:["Earth electrode resistance (RA)","Insulation resistance","Ring final continuity","Prospective fault current"],
  why:"Measure RA with an earth electrode tester or loop tester, then check RA × IΔn ≤ 50 V." },

{ id:"t12", cat:"test", topic:"zs",
  q:"Which test confirms an RCD disconnects quickly enough?",
  options:["RCD operating time test","Insulation resistance","Continuity of protective conductors","Polarity"],
  why:"An RCD tester passes a set fault current and times how long the RCD takes to trip." },

{ id:"s12", cat:"sum", topic:"zs",
  q:"You've measured Zs at the furthest point and you know R1 + R2. How do you find Ze?",
  options:["Ze = Zs − (R1 + R2)","Ze = Zs + (R1 + R2)","Ze = Zs × (R1 + R2)","Ze = 230 ÷ Zs"],
  why:"Rearrange Zs = Ze + (R1 + R2)." },

{ id:"s13", cat:"sum", topic:"pfc",
  q:"You measure PSCC as 1.2 kA and PEFC as 0.9 kA. What do you record as the prospective fault current?",
  options:["1.2 kA, the higher of the two","0.9 kA, the lower","2.1 kA, add them","1.05 kA, the average"],
  why:"Record the higher value. It's the worst case the breakers have to be able to interrupt." },

{ id:"s14", cat:"sum", topic:"ir",
  q:"Three circuits each read 100 MΩ on their own. Tested together, what's the combined reading?",
  options:["33.3 MΩ","300 MΩ","100 MΩ","3 MΩ"],
  why:"1 ÷ (1/100 + 1/100 + 1/100) = 33.3 MΩ. Equal values in parallel: divide by how many there are." },

{ id:"s15", cat:"sum", topic:"zs",
  q:"Your measured Zs on a B32 is 1.25 Ω. Table 41.3 max is 1.37 Ω and 80% of that is 1.10 Ω. What's your verdict?",
  options:["Too high: it's over the 80% figure, so it could exceed the limit when the cable is hot","Fine: it's below 1.37 Ω","Fine: Zs only matters on a TT system","Too low: Zs should be above 1.37 Ω"],
  why:"Compare cold readings with the 80% figure. 1.25 Ω is over 1.10 Ω, so investigate: a larger CPC, a shorter run or RCD protection might be needed." },

{ id:"s16", cat:"sum", topic:"cable",
  q:"What's the right way to apply correction factors to find the minimum tabulated rating It?",
  options:["It ≥ In ÷ (Ca × Cg × Ci × Cc)","It ≥ In × Ca × Cg × Ci × Cc","It ≥ In + Ca + Cg + Ci","It ≥ Ib ÷ 230"],
  why:"Divide by the factors. They're less than 1, so It comes out bigger than In, which is the point: the cable needs headroom." }
];
