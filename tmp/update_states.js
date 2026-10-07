// Helper script to build and inject the complete interactive KmshBpPlan implementation
const fs = require("fs");

let bundle = fs.readFileSync("./src/wacare-bundle.js", "utf-8");

const startState = bundle.indexOf("const[showSimulatedPage,setShowSimulatedPage]=p.useState(!1);");
if (startState === -1) {
  console.error("Could not find startState");
  process.exit(1);
}

const endState = bundle.indexOf("const[O,j]=p.useState({", startState);
if (endState === -1) {
  console.error("Could not find endState");
  process.exit(1);
}

const newStates = `const[showSimulatedPage,setShowSimulatedPage]=p.useState(!1);
  const[currentTab,setCurrentTab]=p.useState("plan"); // "plan" | "lotto"
  const[mobileMenuOpen,setMobileMenuOpen]=p.useState(!1);
  
  // Interactive Step States (Local Prototype Demo)
  const[stepStates,setStepStates]=p.useState({
    consent:!1,
    expert:!1,
    questionnaire:!1,
    caseClosed:!1,
    bpMeasurement:!1
  });

  // Step 1: Consent Modal States
  const[showConsentModal,setShowConsentModal]=p.useState(!1);
  const[consentChecked1,setConsentChecked1]=p.useState(!1);
  const[consentChecked2,setConsentChecked2]=p.useState(!1);
  const[consentSubmitting,setConsentSubmitting]=p.useState(!1);

  // Step 2: Expert Interaction Modal States
  const[showExpertModal,setShowExpertModal]=p.useState(!1);
  const[expertGreetingText,setExpertGreetingText]=p.useState("早安，我想參與小港醫院職場心健康世代研究計畫！");
  const[expertAuthorized,setExpertAuthorized]=p.useState(!0);

  // Step 3: Survey Modal States
  const[showSurveyModal,setShowSurveyModal]=p.useState(!1);
  const[surveyAnswers,setSurveyAnswers]=p.useState({
    q1:"正常日班",
    q2:"40~48小時",
    q3:"中等",
    q4:"良好充裕",
    q5:"良好無已知異常"
  });

  // Step 4: Case Closed Enrollment Submitting State
  const[caseClosedSubmitting,setCaseClosedSubmitting]=p.useState(!1);

  // Step 5: Blood Pressure Measurement Modal States
  const[showBpModal,setShowBpModal]=p.useState(!1);
  const[bpValue,setBpValue]=p.useState({systolic:"120",diastolic:"80",pulse:"72"});
  const[bpError,setBpError]=p.useState("");
  const[todayBpRecorded,setTodayBpRecorded]=p.useState(null);

  const[toastMessage,setToastMessage]=p.useState("");
  const triggerToast=(msg)=>{
    setToastMessage(msg);
    setTimeout(()=>setToastMessage(""),3200);
  };
  `;

bundle = bundle.substring(0, startState) + newStates + bundle.substring(endState);
fs.writeFileSync("./src/wacare-bundle.js", bundle, "utf-8");
console.log("Successfully replaced states in wacare-bundle.js!");
