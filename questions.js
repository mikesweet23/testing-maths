/* Multiple-choice question bank for the quiz.
   To add a question, copy one block and change it. Keep the correct answer FIRST in "options":
   the app shuffles them before showing. "topic" links the "Learn this" button to a calculator
   (ohm, r1r2, ring, ir, zs, pfc, vd, cable, adiabatic). "cat" is one of: test, sum, site.
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
];
