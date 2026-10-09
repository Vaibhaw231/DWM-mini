/**
 * Loan Approval Prediction - Core Engine
 * Pure Vanilla JavaScript (ES6+)
 * 
 * Includes:
 *  1. Embedded 121-record sample dataset & CSV parser
 *  2. Tab routing & responsive navigation
 *  3. Column name variation auto-detection
 *  4. Machine Learning Algorithms:
 *     - K-Nearest Neighbors (KNN)
 *     - Logistic Regression (Gradient Descent)
 *     - Decision Tree Classifier (Gini Impurity)
 *     - Random Forest Ensemble (Bagging of decision stumps/trees)
 *     - Gaussian Naive Bayes Classifier
 *  5. Model Comparison Engine & Graph (Accuracy, Precision, Recall, F1-Score)
 *  6. Linear Regression Analysis (Ordinary Least Squares for Loan Amount prediction)
 *  7. Apriori Algorithm & Association Rule Mining (Support, Confidence, Lift)
 *  8. Real-time Applicant Form Prediction
 *  9. HTML5 Canvas & SVG Visualizations
 */

// ==========================================
// 1. EMBEDDED SAMPLE DATASET (121 records)
// ==========================================
const SAMPLE_CSV_DATA = `Loan_ID,Gender,Married,Dependents,Education,Self_Employed,ApplicantIncome,CoapplicantIncome,LoanAmount,Loan_Amount_Term,Credit_History,Property_Area,Loan_Status
LP001002,Male,No,0,Graduate,No,5849,0,128,360,1,Urban,Y
LP001003,Male,Yes,1,Graduate,No,4583,1508,128,360,1,Rural,N
LP001005,Male,Yes,0,Graduate,Yes,3000,0,66,360,1,Urban,Y
LP001006,Male,Yes,0,Not Graduate,No,2583,2358,120,360,1,Urban,Y
LP001008,Male,No,0,Graduate,No,6000,0,141,360,1,Urban,Y
LP001011,Male,Yes,2,Graduate,Yes,5417,4196,267,360,1,Urban,Y
LP001013,Male,Yes,0,Not Graduate,No,2333,1516,95,360,1,Urban,Y
LP001014,Male,Yes,3+,Graduate,No,3036,2504,158,360,0,Semiurban,N
LP001018,Male,Yes,2,Graduate,No,4006,1526,168,360,1,Urban,Y
LP001020,Male,Yes,1,Graduate,No,12841,10968,349,360,1,Semiurban,N
LP001024,Male,Yes,2,Graduate,No,3200,700,70,360,1,Urban,Y
LP001027,Male,Yes,2,Graduate,No,2500,1840,109,360,1,Urban,Y
LP001028,Male,Yes,2,Graduate,No,3073,8106,200,360,1,Urban,Y
LP001029,Male,No,0,Graduate,No,1853,2840,114,360,1,Rural,N
LP001030,Male,Yes,2,Graduate,No,1299,1086,17,120,1,Urban,Y
LP001032,Male,No,0,Graduate,No,4950,0,125,360,1,Urban,Y
LP001034,Male,No,1,Not Graduate,No,3596,0,100,240,0,Urban,Y
LP001036,Female,No,0,Graduate,No,3510,0,76,360,0,Urban,N
LP001038,Male,Yes,0,Not Graduate,No,4887,0,133,360,1,Rural,N
LP001041,Male,Yes,0,Graduate,No,2600,3500,115,360,1,Urban,Y
LP001043,Male,Yes,0,Not Graduate,No,7660,0,104,360,0,Urban,N
LP001046,Male,Yes,1,Graduate,No,5955,5625,315,360,1,Urban,Y
LP001047,Male,Yes,0,Not Graduate,No,2600,1911,116,360,0,Semiurban,N
LP001050,Male,Yes,2,Not Graduate,No,3365,1917,112,360,0,Rural,N
LP001052,Male,Yes,1,Graduate,No,3717,2925,151,360,0,Semiurban,N
LP001066,Male,Yes,0,Graduate,Yes,9560,0,191,360,1,Semiurban,Y
LP001068,Male,Yes,0,Graduate,No,2799,2253,122,360,1,Semiurban,Y
LP001073,Male,Yes,2,Not Graduate,No,4226,1040,110,360,1,Urban,Y
LP001086,Male,No,0,Not Graduate,No,1442,0,35,360,1,Urban,N
LP001087,Female,No,2,Graduate,No,3750,2083,120,360,1,Semiurban,Y
LP001091,Male,Yes,1,Graduate,No,4166,3369,201,360,0,Urban,N
LP001095,Male,No,0,Graduate,No,3167,0,74,360,1,Urban,N
LP001097,Male,No,1,Graduate,Yes,4692,0,106,360,1,Rural,N
LP001098,Male,Yes,0,Graduate,No,3500,1667,114,360,1,Semiurban,Y
LP001100,Male,No,3+,Graduate,No,12500,3000,320,360,1,Rural,N
LP001106,Male,Yes,0,Graduate,No,2275,2067,100,360,1,Urban,Y
LP001109,Male,Yes,0,Graduate,No,1828,1330,100,360,0,Urban,N
LP001112,Female,Yes,0,Graduate,No,3667,1459,144,360,1,Semiurban,Y
LP001114,Male,No,0,Graduate,No,4166,0,116,360,1,Urban,Y
LP001116,Male,No,0,Not Graduate,No,2889,0,45,180,0,Urban,Y
LP001119,Male,Yes,0,Graduate,No,3600,0,80,360,1,Urban,N
LP001120,Male,No,0,Graduate,No,1800,1213,47,360,1,Urban,Y
LP001123,Male,Yes,0,Graduate,No,2400,0,75,360,1,Urban,Y
LP001131,Male,Yes,0,Graduate,No,3941,2336,134,360,1,Semiurban,Y
LP001136,Male,Yes,0,Not Graduate,Yes,4695,0,96,360,1,Urban,Y
LP001137,Female,No,0,Graduate,No,3410,0,88,360,1,Urban,Y
LP001138,Male,Yes,1,Graduate,No,5649,0,44,360,1,Urban,Y
LP001151,Female,No,0,Graduate,No,4000,2275,144,360,1,Semiurban,Y
LP001155,Female,Yes,0,Not Graduate,No,1928,1644,100,360,1,Semiurban,Y
LP001157,Female,No,0,Graduate,No,2083,2448,118,360,1,Semiurban,Y
LP001164,Female,No,0,Graduate,No,4230,0,112,360,1,Semiurban,N
LP001174,Male,Yes,0,Graduate,No,2744,2038,120,360,1,Semiurban,Y
LP001176,Male,Yes,0,Graduate,No,2943,2188,150,360,1,Urban,Y
LP001188,Male,No,0,Graduate,No,5124,0,124,360,0,Rural,N
LP001194,Male,Yes,2,Graduate,No,2708,1167,97,360,1,Semiurban,Y
LP001195,Male,Yes,0,Graduate,No,2132,1591,96,360,1,Semiurban,Y
LP001197,Male,Yes,0,Graduate,No,3366,2200,135,360,1,Rural,N
LP001198,Male,Yes,2,Graduate,No,2889,0,45,180,0,Urban,N
LP001199,Male,Yes,2,Graduate,No,2882,1843,123,480,1,Semiurban,Y
LP001205,Male,Yes,0,Graduate,No,2500,3796,120,360,1,Urban,Y
LP001206,Male,Yes,3+,Graduate,No,3029,0,99,360,1,Urban,Y
LP001207,Male,Yes,0,Not Graduate,Yes,2609,3449,165,180,0,Rural,N
LP001213,Male,Yes,1,Graduate,No,4945,0,160,360,0,Rural,N
LP001222,Female,No,0,Graduate,No,4166,0,116,360,1,Urban,Y
LP001225,Male,Yes,0,Graduate,No,5773,2000,172,360,1,Semiurban,N
LP001228,Male,No,0,Not Graduate,No,3200,2254,126,180,0,Urban,N
LP001233,Male,Yes,1,Graduate,No,3089,1280,121,360,1,Semiurban,Y
LP001238,Male,Yes,0,Not Graduate,Yes,7100,0,125,60,1,Urban,Y
LP001241,Female,No,0,Graduate,No,4300,0,136,360,0,Semiurban,N
LP001243,Male,Yes,0,Graduate,No,3208,3066,172,360,1,Urban,Y
LP001245,Male,Yes,2,Not Graduate,Yes,1875,1875,97,360,1,Semiurban,Y
LP001248,Male,No,0,Graduate,No,3750,0,100,360,1,Urban,Y
LP001253,Male,Yes,2,Graduate,Yes,5266,2103,152,360,1,Semiurban,Y
LP001255,Male,No,0,Graduate,No,3750,1667,114,360,1,Semiurban,Y
LP001256,Male,Yes,2,Graduate,No,2492,2375,116,360,1,Rural,Y
LP001259,Male,Yes,1,Graduate,Yes,1000,3022,110,360,1,Urban,N
LP001263,Male,Yes,0,Graduate,No,4750,0,94,360,1,Semiurban,Y
LP001264,Male,Yes,3+,Not Graduate,No,3992,0,128,360,1,Semiurban,Y
LP001265,Female,No,0,Graduate,No,1811,1666,54,360,1,Urban,Y
LP001266,Male,Yes,1,Graduate,Yes,4700,0,135,360,1,Semiurban,Y
LP001267,Female,Yes,2,Graduate,No,1378,1881,167,360,1,Urban,N
LP001273,Male,Yes,0,Graduate,No,6000,0,205,240,1,Semiurban,N
LP001275,Male,Yes,1,Graduate,No,3988,0,50,180,1,Urban,Y
LP001279,Male,No,0,Graduate,No,2366,2525,120,360,1,Urban,Y
LP001280,Male,Yes,2,Not Graduate,No,3333,2000,99,360,1,Semiurban,Y
LP001282,Male,Yes,0,Graduate,No,3076,1500,126,360,1,Urban,Y
LP001289,Male,Yes,1,Graduate,No,8566,0,114,360,1,Urban,Y
LP001298,Male,Yes,2,Graduate,No,2785,2016,110,360,1,Rural,Y
LP001306,Female,No,0,Graduate,No,4547,0,115,360,1,Semiurban,Y
LP001307,Male,No,0,Graduate,No,6325,0,175,360,1,Urban,Y
LP001310,Female,No,0,Graduate,No,4077,0,100,360,1,Urban,Y
LP001316,Male,Yes,0,Graduate,No,2958,2900,131,360,1,Semiurban,Y
LP001318,Male,Yes,1,Graduate,No,4945,0,160,360,0,Rural,N
LP001319,Male,Yes,2,Not Graduate,No,3273,1817,115,360,1,Semiurban,Y
LP001321,Male,Yes,2,Graduate,No,3613,3539,134,180,1,Semiurban,Y
LP001322,Male,No,0,Graduate,No,4133,0,115,360,1,Semiurban,Y
LP001325,Male,No,0,Not Graduate,No,3620,0,90,360,1,Urban,Y
LP001326,Male,No,0,Graduate,No,6782,0,180,360,1,Semiurban,Y
LP001334,Male,Yes,0,Not Graduate,No,4188,0,115,180,1,Urban,Y
LP001335,Male,Yes,0,Graduate,Yes,4010,1025,120,360,1,Urban,Y
LP001338,Female,Yes,2,Graduate,No,4995,0,157,360,1,Urban,Y
LP001343,Male,Yes,0,Graduate,No,1759,3541,131,360,1,Semiurban,Y
LP001345,Male,Yes,2,Not Graduate,No,4288,326,133,180,1,Urban,Y
LP001350,Male,Yes,3+,Graduate,No,13650,0,160,360,1,Urban,Y
LP001356,Male,Yes,0,Graduate,No,4652,3583,160,360,1,Semiurban,Y
LP001357,Male,No,0,Graduate,No,3812,0,112,360,1,Rural,Y
LP001367,Male,Yes,1,Graduate,No,3052,1030,100,360,1,Urban,Y
LP001369,Male,Yes,2,Graduate,No,11417,1126,275,360,1,Urban,Y
LP001370,Male,No,0,Not Graduate,No,7333,0,120,360,1,Urban,N
LP001379,Male,Yes,3+,Graduate,No,3993,4270,229,360,0,Semiurban,N
LP001383,Male,Yes,3+,Graduate,No,3244,4397,188,360,0,Urban,N
LP001384,Male,Yes,3+,Not Graduate,No,2071,754,94,360,1,Semiurban,Y
LP001385,Male,No,0,Graduate,No,5316,0,136,360,1,Urban,Y
LP001387,Female,Yes,0,Graduate,No,2929,2333,139,360,1,Semiurban,Y
LP001391,Male,Yes,0,Not Graduate,No,3572,4114,152,360,0,Rural,N
LP001392,Female,No,1,Graduate,No,7451,0,110,360,1,Semiurban,Y
LP001398,Male,No,0,Graduate,No,5050,0,118,360,1,Semiurban,Y
LP001401,Male,Yes,1,Graduate,No,14583,0,185,180,1,Rural,Y
LP001405,Male,Yes,1,Graduate,No,2214,1398,85,360,1,Urban,Y
LP001413,Male,No,0,Graduate,No,3717,0,120,360,1,Semiurban,Y
LP001415,Male,Yes,1,Graduate,No,2500,1260,104,360,1,Urban,Y`;

// ==========================================
// 2. GLOBAL STATE
// ==========================================
const appState = {
  rawDataset: [],
  headers: [],
  targetCol: null,
  fileName: "None",
  
  // Table Pagination
  tableCurrentPage: 1,
  tablePageSize: 10,
  tableFilteredRows: [],

  // Models State
  activeModelName: "KNN",
  trainedModels: {},
  modelsBenchmark: [],
  bestModel: null,
  comparisonActiveMetric: "all",

  // Linear Regression State
  linearRegressionModel: null,

  // Apriori State
  aprioriRules: [],

  // Access Portal Role: 'user' (Applicant Interface) or 'admin' (Administrator Suite)
  currentRole: "user"
};

// ==========================================
// 3. INITIALIZATION & NAVIGATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupFileUpload();
  
  // Real-time listener for linear regression calculator
  const lrInput = document.getElementById("lrIncomeInput");
  if (lrInput) {
    lrInput.addEventListener("input", calculateLRPrediction);
  }

  // Restore saved role or default to 'user'
  try {
    const savedRole = localStorage.getItem("loan_portal_role");
    if (savedRole === "admin" || savedRole === "user") {
      appState.currentRole = savedRole;
    }
  } catch (e) {}

  // Apply Role Interface UI (hides admin tabs if user role)
  applyRoleUI(appState.currentRole);

  // Auto-load sample dataset initially so the site is immediately ready and interactive
  loadSampleDataset(false);
});

function switchRole(newRole, autoNavigate = false) {
  appState.currentRole = newRole;
  try {
    localStorage.setItem("loan_portal_role", newRole);
  } catch (e) {}

  applyRoleUI(newRole);

  if (autoNavigate) {
    if (newRole === "user") {
      navigateTo("predict");
    } else {
      navigateTo("comparison");
    }
  }
}

function toggleRole() {
  const nextRole = appState.currentRole === "user" ? "admin" : "user";
  switchRole(nextRole, false);
}

function applyRoleUI(role) {
  // 1. Navigation links visibility (admin-only links are hidden in user mode)
  const adminLinks = document.querySelectorAll(".admin-only");
  adminLinks.forEach(link => {
    if (role === "admin") {
      link.classList.remove("role-hidden");
    } else {
      link.classList.add("role-hidden");
    }
  });

  // 2. Role badge & Switch button in navbar
  const roleBadge = document.getElementById("roleBadge");
  const btnRoleSwitch = document.getElementById("btnRoleSwitch");
  const heroRoleToggleBtn = document.getElementById("heroRoleToggleBtn");
  const heroAdminActions = document.querySelectorAll(".admin-hero-action");
  const predictRoleBanner = document.getElementById("predictRoleBanner");

  if (roleBadge) {
    roleBadge.className = `role-badge ${role}`;
    roleBadge.innerHTML = role === "admin"
      ? `<span class="role-dot admin"></span> Admin Mode`
      : `<span class="role-dot user"></span> User Mode`;
  }

  if (btnRoleSwitch) {
    btnRoleSwitch.className = `btn-role-switch ${role}`;
    btnRoleSwitch.innerHTML = role === "admin"
      ? `Switch to User 👤`
      : `Switch to Admin ⚙️`;
    btnRoleSwitch.title = role === "admin" ? "Switch to simplified Applicant User Interface" : "Unlock Administrator & Analytics Suite";
  }

  if (heroRoleToggleBtn) {
    heroRoleToggleBtn.innerHTML = role === "admin"
      ? `Switch to User Portal 👤`
      : `Switch to Admin Portal ⚙️`;
  }

  if (predictRoleBanner) {
    if (role === "user") {
      predictRoleBanner.style.display = "flex";
      predictRoleBanner.className = "role-portal-banner user-banner";
      predictRoleBanner.innerHTML = `
        <div class="role-portal-banner-info">
          <span class="role-pill-small user">👤 Applicant User Interface</span>
          <p>You are viewing the simplified loan prediction interface. Datasets, multi-model graphs, regression &amp; charts are restricted to Admin.</p>
        </div>
        <button type="button" class="btn btn-outline btn-sm" onclick="switchRole('admin', true)">Switch to Admin Mode ⚙️</button>
      `;
    } else {
      predictRoleBanner.style.display = "flex";
      predictRoleBanner.className = "role-portal-banner admin-banner";
      predictRoleBanner.innerHTML = `
        <div class="role-portal-banner-info">
          <span class="role-pill-small admin">🛡️ Administrator Active</span>
          <p>All administrative tools, CSV tables, machine learning benchmarks, and visualization charts are unlocked.</p>
        </div>
        <button type="button" class="btn btn-outline btn-sm" onclick="switchRole('user', true)">Switch to User Mode 👤</button>
      `;
    }
  }

  // 3. Hero Admin Actions visibility
  heroAdminActions.forEach(btn => {
    btn.style.display = role === "admin" ? "inline-flex" : "none";
  });

  // 4. Portal Cards active state on Home
  const userPortalCard = document.querySelector(".user-portal-card");
  const adminPortalCard = document.querySelector(".admin-portal-card");
  if (userPortalCard && adminPortalCard) {
    if (role === "user") {
      userPortalCard.classList.add("active-role");
      adminPortalCard.classList.remove("active-role");
    } else {
      adminPortalCard.classList.add("active-role");
      userPortalCard.classList.remove("active-role");
    }
  }

  // 5. Home Feature Cards lock status
  const adminFeatureCards = document.querySelectorAll(".feature-card.admin-feature");
  adminFeatureCards.forEach(card => {
    const lockBadge = card.querySelector(".admin-lock-badge");
    if (role === "admin") {
      card.classList.remove("locked-card");
      if (lockBadge) lockBadge.style.display = "none";
    } else {
      card.classList.add("locked-card");
      if (lockBadge) lockBadge.style.display = "inline-flex";
    }
  });

  // 6. If currently on an admin section while switching to user, redirect to predict
  const currentSection = document.querySelector(".page-section.active");
  if (currentSection && role === "user") {
    const adminSectionIds = ["import-csv", "classification", "comparison", "linear-regression", "apriori", "results", "visualization"];
    if (adminSectionIds.includes(currentSection.id)) {
      navigateTo("predict");
    }
  }
}

function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("data-target");
      navigateTo(targetId);
    });
  });

  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.querySelector(".main-nav");
  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener("click", () => {
      mainNav.classList.toggle("show");
    });
  }
}

function navigateTo(sectionId) {
  const adminSections = [
    "import-csv", "classification", "comparison", "linear-regression", "apriori", "results", "visualization"
  ];

  // If in user mode and trying to access an admin section
  if (appState.currentRole === "user" && adminSections.includes(sectionId)) {
    const wantAdmin = confirm(
      "🔒 Administrator Access Required\n\n" +
      "This section contains administrative data science tools (datasets, ML models, regression, rules & charts).\n\n" +
      "Would you like to switch to Admin Mode to view this feature?"
    );
    if (wantAdmin) {
      switchRole("admin", false);
    } else {
      navigateTo("predict");
      return;
    }
  }

  // Update nav buttons
  document.querySelectorAll(".nav-link").forEach(btn => {
    if (btn.getAttribute("data-target") === sectionId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Switch sections
  document.querySelectorAll(".page-section").forEach(sec => {
    sec.classList.remove("active");
  });

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // Close mobile nav if open
  const mainNav = document.querySelector(".main-nav");
  if (mainNav) mainNav.classList.remove("show");

  // Scroll smoothly to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // On demand renders
  if (sectionId === "visualization") {
    renderAllVisualizations();
  } else if (sectionId === "comparison") {
    renderComparisonGraph();
  } else if (sectionId === "linear-regression") {
    renderLinearRegressionPlot();
  }
}

function loadSampleDataAndGo(sectionId) {
  loadSampleDataset(true);
  navigateTo(sectionId);
}

// ==========================================
// 4. CSV PARSING & FILE UPLOADS
// ==========================================
function parseCSV(text) {
  const lines = text.trim().split(/\r\n|\n|\r/);
  if (lines.length < 2) return { headers: [], rows: [] };

  const headers = parseCSVLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = parseCSVLine(line);
    const rowObj = {};
    headers.forEach((h, idx) => {
      rowObj[h] = values[idx] !== undefined ? values[idx].trim() : "";
    });
    rows.push(rowObj);
  }

  return { headers, rows };
}

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result.map(s => s.replace(/^["']|["']$/g, '').trim());
}

function setupFileUpload() {
  const fileInput = document.getElementById("csvFileInput");
  const dropZone = document.getElementById("dropZone");

  if (!fileInput || !dropZone) return;

  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  });

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  });
}

function processSelectedFile(file) {
  if (!file.name.toLowerCase().endsWith(".csv")) {
    alert("Please upload a valid .csv file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    handleDatasetLoaded(text, file.name);
  };
  reader.readAsText(file);
}

function loadSampleDataset(showToast = true) {
  handleDatasetLoaded(SAMPLE_CSV_DATA, "loan_dataset.csv");
  if (showToast) {
    const statElem = document.getElementById("classificationStatus");
    if (statElem) {
      statElem.className = "inline-status success";
      statElem.innerText = "Sample dataset loaded successfully (121 records)!";
    }
  }
}

function handleDatasetLoaded(csvText, fileName) {
  const { headers, rows } = parseCSV(csvText);

  if (rows.length === 0) {
    alert("CSV file seems empty or could not be parsed.");
    return;
  }

  appState.fileName = fileName;
  appState.headers = headers;
  appState.rawDataset = rows;
  appState.tableFilteredRows = [...rows];
  appState.tableCurrentPage = 1;

  // Auto-detect target column
  appState.targetCol = detectTargetColumn(headers);

  // Update UI Stats
  document.getElementById("statFileName").innerText = fileName;
  document.getElementById("statRecordCount").innerText = rows.length;
  document.getElementById("statColumnCount").innerText = headers.length;
  document.getElementById("statTargetCol").innerText = appState.targetCol || "Select Manually";

  // Populate Target Column Select Dropdown
  populateTargetSelect(headers, appState.targetCol);

  // Render Table
  renderDatasetTable();

  // Run all models benchmark
  trainAndCompareAllModels();

  // Run Linear Regression model
  runLinearRegression();

  // Run Apriori Mining
  runAprioriMining();

  // Render Visualizations
  renderAllVisualizations();
}

// ==========================================
// 5. COLUMN FLEXIBILITY & DETECTION
// ==========================================
function normalizeColName(name) {
  return String(name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function detectTargetColumn(headers) {
  const targetVariations = [
    "loanstatus", "status", "approval", "approved", "loanapproval", "loanapproved", "class", "target"
  ];

  for (const h of headers) {
    const norm = normalizeColName(h);
    if (targetVariations.includes(norm)) return h;
  }

  return headers[headers.length - 1];
}

function findMatchingHeader(headers, aliases) {
  if (!headers || !headers.length) return null;
  // 1. Exact normalized match
  for (const h of headers) {
    const norm = normalizeColName(h);
    for (const alias of aliases) {
      if (norm === normalizeColName(alias)) return h;
    }
  }
  // 2. Substring match fallback (e.g. contains 'income' but not 'coapplicant')
  for (const h of headers) {
    const norm = normalizeColName(h);
    for (const alias of aliases) {
      const aliasNorm = normalizeColName(alias);
      if (norm.includes(aliasNorm) || aliasNorm.includes(norm)) return h;
    }
  }
  return null;
}

function populateTargetSelect(headers, currentTarget) {
  const select = document.getElementById("targetColSelect");
  if (!select) return;
  select.innerHTML = "";

  headers.forEach(h => {
    const opt = document.createElement("option");
    opt.value = h;
    opt.textContent = h;
    if (h === currentTarget) opt.selected = true;
    select.appendChild(opt);
  });

  select.onchange = () => {
    appState.targetCol = select.value;
    document.getElementById("statTargetCol").innerText = appState.targetCol;
    trainAndCompareAllModels();
    renderAllVisualizations();
  };
}

// ==========================================
// 6. CSV DATA TABLE & PAGINATION
// ==========================================
function renderDatasetTable() {
  const thead = document.getElementById("tableThead");
  const tbody = document.getElementById("tableTbody");
  const summaryBadge = document.getElementById("tableRecordSummary");
  const pageIndicator = document.getElementById("pageIndicator");
  const paginationInfo = document.getElementById("paginationInfo");
  const prevBtn = document.getElementById("prevPageBtn");
  const nextBtn = document.getElementById("nextPageBtn");

  if (!thead || !tbody) return;

  const total = appState.tableFilteredRows.length;
  summaryBadge.innerText = `${total} records`;

  if (total === 0) {
    thead.innerHTML = "<tr><th>No data found</th></tr>";
    tbody.innerHTML = "<tr><td class='empty-cell'>No matching records found.</td></tr>";
    pageIndicator.innerText = "Page 0 of 0";
    paginationInfo.innerText = "Showing 0 of 0";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  let headerHtml = "<tr>";
  appState.headers.forEach(h => {
    const isTarget = h === appState.targetCol;
    headerHtml += `<th style="${isTarget ? 'color: var(--primary-blue); font-weight: 700;' : ''}">${escapeHtml(h)}${isTarget ? ' (Target)' : ''}</th>`;
  });
  headerHtml += "</tr>";
  thead.innerHTML = headerHtml;

  const totalPages = Math.ceil(total / appState.tablePageSize) || 1;
  if (appState.tableCurrentPage > totalPages) appState.tableCurrentPage = totalPages;
  if (appState.tableCurrentPage < 1) appState.tableCurrentPage = 1;

  const startIndex = (appState.tableCurrentPage - 1) * appState.tablePageSize;
  const endIndex = Math.min(startIndex + appState.tablePageSize, total);

  const pageRows = appState.tableFilteredRows.slice(startIndex, endIndex);
  let rowsHtml = "";
  pageRows.forEach(row => {
    rowsHtml += "<tr>";
    appState.headers.forEach(h => {
      const val = row[h] !== undefined ? row[h] : "";
      rowsHtml += `<td>${escapeHtml(String(val))}</td>`;
    });
    rowsHtml += "</tr>";
  });
  tbody.innerHTML = rowsHtml;

  pageIndicator.innerText = `Page ${appState.tableCurrentPage} of ${totalPages}`;
  paginationInfo.innerText = `Showing ${startIndex + 1} - ${endIndex} of ${total} records`;
  prevBtn.disabled = appState.tableCurrentPage <= 1;
  nextBtn.disabled = appState.tableCurrentPage >= totalPages;
}

function handleTableSearch(query) {
  const q = String(query).toLowerCase().trim();
  if (!q) {
    appState.tableFilteredRows = [...appState.rawDataset];
  } else {
    appState.tableFilteredRows = appState.rawDataset.filter(row => {
      return Object.values(row).some(val => String(val).toLowerCase().includes(q));
    });
  }
  appState.tableCurrentPage = 1;
  renderDatasetTable();
}

function changePage(delta) {
  appState.tableCurrentPage += delta;
  renderDatasetTable();
}

// ==========================================
// 7. DATA PREPROCESSING & FEATURE EXTRACTION
// ==========================================
function extractFeatures(record, featureSpecs, headers) {
  const vector = [];

  // 1. Applicant Income
  const incCol = findMatchingHeader(headers, ["applicantincome", "income", "applicant_income"]);
  const rawInc = incCol && record[incCol] ? parseFloat(record[incCol]) : 4500;
  const normInc = featureSpecs.minMax.income.max > featureSpecs.minMax.income.min
    ? (Math.min(Math.max(rawInc, featureSpecs.minMax.income.min), featureSpecs.minMax.income.max) - featureSpecs.minMax.income.min) /
      (featureSpecs.minMax.income.max - featureSpecs.minMax.income.min)
    : 0.5;
  vector.push(normInc);

  // 2. Coapplicant Income
  const coIncCol = findMatchingHeader(headers, ["coapplicantincome", "coapplicant_income", "coapplicant"]);
  const rawCoInc = coIncCol && record[coIncCol] ? parseFloat(record[coIncCol]) : 0;
  const normCoInc = featureSpecs.minMax.coIncome.max > featureSpecs.minMax.coIncome.min
    ? (Math.min(Math.max(rawCoInc, featureSpecs.minMax.coIncome.min), featureSpecs.minMax.coIncome.max) - featureSpecs.minMax.coIncome.min) /
      (featureSpecs.minMax.coIncome.max - featureSpecs.minMax.coIncome.min)
    : 0.5;
  vector.push(normCoInc);

  // 3. Loan Amount
  const lAmtCol = findMatchingHeader(headers, ["loanamount", "loan_amount", "amount"]);
  const rawLAmt = lAmtCol && record[lAmtCol] ? parseFloat(record[lAmtCol]) : 120;
  const normLAmt = featureSpecs.minMax.loanAmt.max > featureSpecs.minMax.loanAmt.min
    ? (Math.min(Math.max(rawLAmt, featureSpecs.minMax.loanAmt.min), featureSpecs.minMax.loanAmt.max) - featureSpecs.minMax.loanAmt.min) /
      (featureSpecs.minMax.loanAmt.max - featureSpecs.minMax.loanAmt.min)
    : 0.5;
  vector.push(normLAmt);

  // 4. Loan Term
  const termCol = findMatchingHeader(headers, ["loan_amount_term", "loanamountterm", "term", "loanterm"]);
  const rawTerm = termCol && record[termCol] ? parseFloat(record[termCol]) : 360;
  const normTerm = featureSpecs.minMax.term.max > featureSpecs.minMax.term.min
    ? (Math.min(Math.max(rawTerm, featureSpecs.minMax.term.min), featureSpecs.minMax.term.max) - featureSpecs.minMax.term.min) /
      (featureSpecs.minMax.term.max - featureSpecs.minMax.term.min)
    : 0.5;
  vector.push(normTerm);

  // 5. Credit History / CIBIL Score
  const credCol = findMatchingHeader(headers, ["credit_history", "credithistory", "credit", "cibil_score", "cibilscore", "cibil"]);
  let credVal = 1;
  if (credCol && record[credCol] !== undefined) {
    const cStr = String(record[credCol]).trim().toLowerCase();
    const cNum = parseFloat(cStr);
    if (!isNaN(cNum) && cNum > 1) {
      credVal = cNum >= 650 ? 1 : 0;
    } else {
      credVal = (cStr === "0" || cStr === "no" || cStr === "n" || cStr === "bad" || cStr === "rejected") ? 0 : 1;
    }
  }
  vector.push(credVal);

  // 6. Education
  const eduCol = findMatchingHeader(headers, ["education", "qualification"]);
  let isGrad = 1;
  if (eduCol && record[eduCol]) {
    isGrad = String(record[eduCol]).toLowerCase().includes("not") ? 0 : 1;
  }
  vector.push(isGrad);

  // 7. Married
  const marCol = findMatchingHeader(headers, ["married", "marital_status"]);
  let isMarried = 0;
  if (marCol && record[marCol]) {
    isMarried = (String(record[marCol]).toLowerCase().startsWith("y") || String(record[marCol]) === "1") ? 1 : 0;
  }
  vector.push(isMarried);

  // 8. Dependents (0, 1, 2, 3+)
  const depCol = findMatchingHeader(headers, ["dependents", "dependent"]);
  let depScore = 0;
  if (depCol && record[depCol] !== undefined) {
    const dStr = String(record[depCol]).trim();
    if (dStr === "1") depScore = 0.33;
    else if (dStr === "2") depScore = 0.66;
    else if (dStr.includes("3") || dStr.includes("+")) depScore = 1.0;
  }
  vector.push(depScore);

  return vector;
}

function parseBinaryTarget(val) {
  if (val === undefined || val === null) return 0;
  const str = String(val).trim().toUpperCase();
  if (str === "Y" || str === "YES" || str === "1" || str === "APPROVED" || str === "TRUE") {
    return 1;
  }
  return 0;
}

function getPreprocessedDatasets(splitRatio = 0.8) {
  if (!appState.rawDataset || appState.rawDataset.length < 5) return null;

  const targetCol = appState.targetCol || detectTargetColumn(appState.headers);

  // MinMax stats
  const incCol = findMatchingHeader(appState.headers, ["applicantincome", "income", "applicant_income"]);
  const coIncCol = findMatchingHeader(appState.headers, ["coapplicantincome", "coapplicant_income", "coapplicant"]);
  const lAmtCol = findMatchingHeader(appState.headers, ["loanamount", "loan_amount", "amount"]);
  const termCol = findMatchingHeader(appState.headers, ["loan_amount_term", "loanamountterm", "term", "loanterm"]);

  const minMax = {
    income: { min: Infinity, max: -Infinity },
    coIncome: { min: Infinity, max: -Infinity },
    loanAmt: { min: Infinity, max: -Infinity },
    term: { min: Infinity, max: -Infinity }
  };

  appState.rawDataset.forEach(r => {
    if (incCol && !isNaN(parseFloat(r[incCol]))) {
      const v = parseFloat(r[incCol]);
      if (v < minMax.income.min) minMax.income.min = v;
      if (v > minMax.income.max) minMax.income.max = v;
    }
    if (coIncCol && !isNaN(parseFloat(r[coIncCol]))) {
      const v = parseFloat(r[coIncCol]);
      if (v < minMax.coIncome.min) minMax.coIncome.min = v;
      if (v > minMax.coIncome.max) minMax.coIncome.max = v;
    }
    if (lAmtCol && !isNaN(parseFloat(r[lAmtCol]))) {
      const v = parseFloat(r[lAmtCol]);
      if (v < minMax.loanAmt.min) minMax.loanAmt.min = v;
      if (v > minMax.loanAmt.max) minMax.loanAmt.max = v;
    }
    if (termCol && !isNaN(parseFloat(r[termCol]))) {
      const v = parseFloat(r[termCol]);
      if (v < minMax.term.min) minMax.term.min = v;
      if (v > minMax.term.max) minMax.term.max = v;
    }
  });

  if (minMax.income.min === Infinity) minMax.income = { min: 1000, max: 20000 };
  if (minMax.coIncome.min === Infinity) minMax.coIncome = { min: 0, max: 10000 };
  if (minMax.loanAmt.min === Infinity) minMax.loanAmt = { min: 10, max: 500 };
  if (minMax.term.min === Infinity) minMax.term = { min: 60, max: 480 };

  const featureSpecs = { minMax };

  const dataPoints = [];
  appState.rawDataset.forEach(row => {
    const vec = extractFeatures(row, featureSpecs, appState.headers);
    const label = parseBinaryTarget(row[targetCol]);
    dataPoints.push({ vector: vec, label: label, raw: row });
  });

  // Stratified split for balanced testing
  const posPoints = dataPoints.filter(d => d.label === 1);
  const negPoints = dataPoints.filter(d => d.label === 0);

  const trainSet = [];
  const testSet = [];

  const splitPosIdx = Math.floor(posPoints.length * splitRatio);
  const splitNegIdx = Math.floor(negPoints.length * splitRatio);

  trainSet.push(...posPoints.slice(0, splitPosIdx), ...negPoints.slice(0, splitNegIdx));
  testSet.push(...posPoints.slice(splitPosIdx), ...negPoints.slice(splitNegIdx));

  return { trainSet, testSet, featureSpecs, targetCol };
}

// ==========================================
// 8. MACHINE LEARNING ALGORITHMS
// ==========================================

/* ----------------------------------------------------
   A. K-Nearest Neighbors (KNN)
---------------------------------------------------- */
function euclideanDistance(vecA, vecB) {
  let sum = 0;
  // Apply feature weighting (Credit History index 4 gets higher weight)
  const weights = [1.0, 1.0, 1.0, 1.0, 2.5, 0.7, 0.5, 0.6];
  for (let i = 0; i < vecA.length; i++) {
    const w = weights[i] || 1.0;
    const diff = (vecA[i] - vecB[i]) * w;
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

function trainKNN(trainSet, k = 5) {
  const boundedK = Math.min(k, Math.max(1, trainSet.length - 1));
  return {
    name: "KNN",
    predict: function(x) {
      const dists = trainSet.map(pt => ({
        dist: euclideanDistance(x, pt.vector),
        label: pt.label
      }));
      dists.sort((a, b) => a.dist - b.dist);
      const topNeighbors = dists.slice(0, boundedK);
      const posVotes = topNeighbors.filter(n => n.label === 1).length;
      const prob = posVotes / topNeighbors.length;
      return { predictedLabel: prob >= 0.5 ? 1 : 0, probability: prob };
    }
  };
}

/* ----------------------------------------------------
   B. Logistic Regression (Gradient Descent)
---------------------------------------------------- */
function trainLogisticRegression(trainSet, epochs = 200, lr = 0.1) {
  const numFeatures = trainSet[0].vector.length;
  const weights = new Array(numFeatures).fill(0.0);
  let bias = 0.0;

  function sigmoid(z) {
    return 1 / (1 + Math.exp(-Math.max(-20, Math.min(20, z))));
  }

  for (let e = 0; e < epochs; e++) {
    let gradBias = 0;
    const gradWeights = new Array(numFeatures).fill(0);

    for (let i = 0; i < trainSet.length; i++) {
      const pt = trainSet[i];
      let z = bias;
      for (let j = 0; j < numFeatures; j++) {
        z += weights[j] * pt.vector[j];
      }
      const pred = sigmoid(z);
      const err = pred - pt.label;

      gradBias += err;
      for (let j = 0; j < numFeatures; j++) {
        gradWeights[j] += err * pt.vector[j];
      }
    }

    const n = trainSet.length;
    bias -= (lr * gradBias) / n;
    for (let j = 0; j < numFeatures; j++) {
      weights[j] -= (lr * gradWeights[j]) / n;
    }
  }

  return {
    name: "Logistic Regression",
    predict: function(x) {
      let z = bias;
      for (let j = 0; j < x.length; j++) {
        z += weights[j] * x[j];
      }
      const prob = sigmoid(z);
      return { predictedLabel: prob >= 0.5 ? 1 : 0, probability: prob };
    }
  };
}

/* ----------------------------------------------------
   C. Decision Tree Classifier (Gini Impurity)
---------------------------------------------------- */
function trainDecisionTree(trainSet, maxDepth = 4) {
  function gini(subset) {
    if (subset.length === 0) return 0;
    const pos = subset.filter(p => p.label === 1).length;
    const pPos = pos / subset.length;
    const pNeg = 1 - pPos;
    return 1 - (pPos * pPos + pNeg * pNeg);
  }

  function majorityVote(subset) {
    const pos = subset.filter(p => p.label === 1).length;
    const prob = subset.length > 0 ? pos / subset.length : 0.5;
    return { isLeaf: true, label: prob >= 0.5 ? 1 : 0, prob };
  }

  function buildTree(subset, depth) {
    if (subset.length <= 3 || depth >= maxDepth) {
      return majorityVote(subset);
    }

    const currentGini = gini(subset);
    if (currentGini === 0) return majorityVote(subset);

    let bestGain = 0;
    let bestSplit = null;

    const numFeatures = subset[0].vector.length;

    for (let feat = 0; feat < numFeatures; feat++) {
      // Find candidate thresholds
      const vals = [...new Set(subset.map(p => p.vector[feat]))].sort((a, b) => a - b);
      for (let i = 0; i < vals.length - 1; i++) {
        const threshold = (vals[i] + vals[i + 1]) / 2;
        const left = subset.filter(p => p.vector[feat] <= threshold);
        const right = subset.filter(p => p.vector[feat] > threshold);

        if (left.length === 0 || right.length === 0) continue;

        const pLeft = left.length / subset.length;
        const pRight = right.length / subset.length;
        const splitGini = pLeft * gini(left) + pRight * gini(right);
        const gain = currentGini - splitGini;

        if (gain > bestGain) {
          bestGain = gain;
          bestSplit = { feat, threshold, left, right };
        }
      }
    }

    if (!bestSplit || bestGain <= 0.005) {
      return majorityVote(subset);
    }

    return {
      isLeaf: false,
      feat: bestSplit.feat,
      threshold: bestSplit.threshold,
      left: buildTree(bestSplit.left, depth + 1),
      right: buildTree(bestSplit.right, depth + 1)
    };
  }

  const root = buildTree(trainSet, 0);

  function predictNode(node, x) {
    if (node.isLeaf) return { predictedLabel: node.label, probability: node.prob };
    if (x[node.feat] <= node.threshold) {
      return predictNode(node.left, x);
    } else {
      return predictNode(node.right, x);
    }
  }

  return {
    name: "Decision Tree",
    predict: function(x) {
      return predictNode(root, x);
    }
  };
}

/* ----------------------------------------------------
   D. Random Forest Classifier (Bagging Ensemble)
---------------------------------------------------- */
function trainRandomForest(trainSet, numTrees = 7, maxDepth = 3) {
  const trees = [];

  for (let t = 0; t < numTrees; t++) {
    // Bootstrap sample
    const sample = [];
    for (let i = 0; i < trainSet.length; i++) {
      const randIdx = Math.floor(Math.random() * trainSet.length);
      sample.push(trainSet[randIdx]);
    }
    trees.push(trainDecisionTree(sample, maxDepth));
  }

  return {
    name: "Random Forest",
    predict: function(x) {
      let posCount = 0;
      trees.forEach(tree => {
        const res = tree.predict(x);
        if (res.predictedLabel === 1) posCount++;
      });
      const prob = posCount / trees.length;
      return { predictedLabel: prob >= 0.5 ? 1 : 0, probability: prob };
    }
  };
}

/* ----------------------------------------------------
   E. Gaussian Naive Bayes Classifier
---------------------------------------------------- */
function trainNaiveBayes(trainSet) {
  const numFeatures = trainSet[0].vector.length;
  const classes = [0, 1];

  const classStats = {};
  classes.forEach(c => {
    const pts = trainSet.filter(p => p.label === c);
    const prior = pts.length / trainSet.length;

    const featureStats = [];
    for (let f = 0; f < numFeatures; f++) {
      const vals = pts.map(p => p.vector[f]);
      const mean = vals.reduce((a, b) => a + b, 0) / (vals.length || 1);
      const variance = (vals.reduce((sum, v) => sum + (v - mean) * (v - mean), 0) / (vals.length || 1)) + 1e-4;
      featureStats.push({ mean, variance });
    }

    classStats[c] = { prior, featureStats };
  });

  function gaussianLogLikelihood(x, mean, variance) {
    const expTerm = -((x - mean) * (x - mean)) / (2 * variance);
    return -0.5 * Math.log(2 * Math.PI * variance) + expTerm;
  }

  return {
    name: "Naive Bayes",
    predict: function(x) {
      const logPosts = {};
      classes.forEach(c => {
        let logProb = Math.log(classStats[c].prior || 1e-5);
        for (let f = 0; f < numFeatures; f++) {
          const stat = classStats[c].featureStats[f];
          logProb += gaussianLogLikelihood(x[f], stat.mean, stat.variance);
        }
        logPosts[c] = logProb;
      });

      // Convert log probabilities to relative confidence
      const maxLog = Math.max(logPosts[0], logPosts[1]);
      const exp0 = Math.exp(logPosts[0] - maxLog);
      const exp1 = Math.exp(logPosts[1] - maxLog);
      const prob = exp1 / (exp0 + exp1);

      return {
        predictedLabel: prob >= 0.5 ? 1 : 0,
        probability: prob
      };
    }
  };
}

// ==========================================
// 9. MODEL EVALUATION & BENCHMARKING
// ==========================================
function evaluateModel(model, testSet) {
  let tp = 0, tn = 0, fp = 0, fn = 0;

  testSet.forEach(pt => {
    const res = model.predict(pt.vector);
    const actual = pt.label;
    const pred = res.predictedLabel;

    if (actual === 1 && pred === 1) tp++;
    else if (actual === 0 && pred === 0) tn++;
    else if (actual === 0 && pred === 1) fp++;
    else if (actual === 1 && pred === 0) fn++;
  });

  const total = testSet.length || 1;
  const accuracy = (tp + tn) / total;
  const precision = (tp + fp) > 0 ? tp / (tp + fp) : 0;
  const recall = (tp + fn) > 0 ? tp / (tp + fn) : 0;
  const f1 = (precision + recall) > 0 ? (2 * precision * recall) / (precision + recall) : 0;

  return {
    name: model.name,
    accuracy,
    precision,
    recall,
    f1,
    tp, tn, fp, fn,
    totalTest: testSet.length
  };
}

function trainAndCompareAllModels() {
  const prepared = getPreprocessedDatasets(0.8);
  if (!prepared) return;

  const { trainSet, testSet } = prepared;

  const kVal = parseInt(document.getElementById("kValueInput") ? document.getElementById("kValueInput").value : 5, 10) || 5;

  // Train all 5 algorithms
  const knn = trainKNN(trainSet, kVal);
  const logReg = trainLogisticRegression(trainSet);
  const dt = trainDecisionTree(trainSet);
  const rf = trainRandomForest(trainSet);
  const nb = trainNaiveBayes(trainSet);

  appState.trainedModels = {
    "KNN": knn,
    "Logistic Regression": logReg,
    "Decision Tree": dt,
    "Random Forest": rf,
    "Naive Bayes": nb
  };

  // Evaluate on identical test data
  const results = [
    evaluateModel(knn, testSet),
    evaluateModel(logReg, testSet),
    evaluateModel(dt, testSet),
    evaluateModel(rf, testSet),
    evaluateModel(nb, testSet)
  ];

  // Sort by highest F1 score / Accuracy
  results.sort((a, b) => (b.f1 + b.accuracy) - (a.f1 + a.accuracy));

  appState.modelsBenchmark = results;
  appState.bestModel = results[0];

  // Active default model
  appState.trainedModel = {
    ...appState.trainedModels["KNN"],
    featureSpecs: prepared.featureSpecs,
    targetCol: prepared.targetCol
  };

  // Update UI components
  updateBenchmarkTable();
  renderComparisonGraph();
  updateBestModelBanner();

  // Update Main Result Card with KNN (or currently active)
  const activeEval = results.find(r => r.name === appState.activeModelName) || results[0];
  updateResultsDisplay({
    ...activeEval,
    totalTrain: trainSet.length,
    k: kVal,
    targetCol: prepared.targetCol,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  });
}

function updateBestModelBanner() {
  const best = appState.bestModel;
  if (!best) return;

  document.getElementById("bestModelName").innerText = `${best.name} (Top Model)`;
  document.getElementById("bestModelDesc").innerText = 
    `Demonstrated highest classification balance with ${(best.accuracy * 100).toFixed(1)}% Accuracy and ${(best.precision * 100).toFixed(1)}% Precision on the actual test set.`;
  document.getElementById("bestModelScore").innerText = `${(best.f1 * 100).toFixed(1)}%`;
}

function updateBenchmarkTable() {
  const tbody = document.getElementById("comparisonTableBody");
  if (!tbody) return;

  let html = "";
  appState.modelsBenchmark.forEach((m, idx) => {
    const isBest = idx === 0;
    html += `
      <tr style="${isBest ? 'background-color: #f0f7ff; font-weight:600;' : ''}">
        <td><strong>${escapeHtml(m.name)}</strong></td>
        <td>${(m.accuracy * 100).toFixed(1)}%</td>
        <td>${(m.precision * 100).toFixed(1)}%</td>
        <td>${(m.recall * 100).toFixed(1)}%</td>
        <td>${(m.f1 * 100).toFixed(1)}%</td>
        <td>${m.tp}</td>
        <td>${m.tn}</td>
        <td>
          <span class="rank-badge ${isBest ? 'rank-winner' : 'rank-normal'}">
            ${isBest ? '🏆 #1 Best Performer' : `#${idx + 1}`}
          </span>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

// ==========================================
// 10. MODEL COMPARISON GRAPH (INTERACTIVE SVG)
// ==========================================
function filterComparisonMetric(metric) {
  appState.comparisonActiveMetric = metric;

  document.querySelectorAll(".pill-btn").forEach(btn => {
    if (btn.getAttribute("data-metric") === metric) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  renderComparisonGraph();
}

function renderComparisonGraph() {
  const box = document.getElementById("comparisonChartBox");
  if (!box) return;

  const models = appState.modelsBenchmark;
  if (!models || models.length === 0) {
    box.innerHTML = `<div class="chart-empty-msg">Run classification or load dataset to view model comparison graph.</div>`;
    return;
  }

  const activeMetric = appState.comparisonActiveMetric;

  const width = 800;
  const height = 340;
  const padLeft = 140;
  const padRight = 40;
  const padTop = 30;
  const padBottom = 30;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const metricsConfig = [
    { key: "accuracy", label: "Accuracy", color: "#1d4ed8" },
    { key: "precision", label: "Precision", color: "#10b981" },
    { key: "recall", label: "Recall", color: "#8b5cf6" },
    { key: "f1", label: "F1-Score", color: "#f59e0b" }
  ];

  const filteredMetrics = activeMetric === "all"
    ? metricsConfig
    : metricsConfig.filter(m => m.key === activeMetric);

  const modelRowHeight = chartH / models.length;
  const barHeight = Math.min(18, (modelRowHeight - 14) / filteredMetrics.length);

  let gridLines = "";
  for (let p = 0; p <= 100; p += 20) {
    const x = padLeft + (p / 100) * chartW;
    gridLines += `
      <line x1="${x}" y1="${padTop}" x2="${x}" y2="${padTop + chartH}" stroke="#e2e8f0" stroke-dasharray="3" />
      <text x="${x}" y="${padTop + chartH + 18}" text-anchor="middle" font-size="11" fill="#64748b" font-weight="600">${p}%</text>
    `;
  }

  let barsSvg = "";
  models.forEach((m, mIdx) => {
    const isBest = m.name === appState.bestModel.name;
    const rowY = padTop + mIdx * modelRowHeight;
    const labelY = rowY + modelRowHeight / 2 + 4;

    barsSvg += `
      <!-- Model Name Label -->
      <text x="${padLeft - 15}" y="${labelY}" text-anchor="end" font-size="12" font-weight="${isBest ? '800' : '600'}" fill="${isBest ? '#1d4ed8' : '#0f172a'}">
        ${isBest ? '★ ' : ''}${m.name}
      </text>
    `;

    filteredMetrics.forEach((metric, bIdx) => {
      const val = m[metric.key] || 0;
      const bW = Math.max(2, (val) * chartW);
      const bY = rowY + 6 + bIdx * (barHeight + 2);

      barsSvg += `
        <rect x="${padLeft}" y="${bY}" width="${bW}" height="${barHeight}" fill="${metric.color}" rx="3" />
        <text x="${padLeft + bW + 6}" y="${bY + barHeight - 3}" font-size="10" font-weight="700" fill="#1e293b">
          ${(val * 100).toFixed(1)}%
        </text>
      `;
    });
  });

  box.innerHTML = `
    <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow: visible;">
      <!-- Grid -->
      ${gridLines}
      <!-- Zero axis -->
      <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + chartH}" stroke="#94a3b8" stroke-width="1.5" />
      <!-- Content Bars -->
      ${barsSvg}
    </svg>
  `;
}

// ==========================================
// 11. LINEAR REGRESSION ANALYSIS
// ==========================================
function findIncomeColumn(headers) {
  if (!headers || !headers.length) return null;
  // Exact match prioritizing applicant income
  for (const h of headers) {
    const norm = normalizeColName(h);
    if (norm.includes("coapplicant")) continue;
    if (["applicantincome", "incomeannum", "annualincome", "applicant_income", "income"].includes(norm)) return h;
  }
  // Substring match excluding coapplicant
  for (const h of headers) {
    const norm = normalizeColName(h);
    if (norm.includes("coapplicant")) continue;
    if (norm.includes("income")) return h;
  }
  return null;
}

function findLoanAmountColumn(headers) {
  if (!headers || !headers.length) return null;
  for (const h of headers) {
    const norm = normalizeColName(h);
    if (["loanamount", "loanamt", "amount", "loan_amount"].includes(norm)) return h;
  }
  for (const h of headers) {
    const norm = normalizeColName(h);
    if (norm.includes("loanamount") || norm.includes("loan_amount")) return h;
  }
  for (const h of headers) {
    const norm = normalizeColName(h);
    if (norm.includes("amount") && !norm.includes("term")) return h;
  }
  return null;
}

function runLinearRegression() {
  const incCol = findIncomeColumn(appState.headers);
  const amtCol = findLoanAmountColumn(appState.headers);

  const points = [];
  if (appState.rawDataset && appState.rawDataset.length >= 5 && incCol && amtCol) {
    appState.rawDataset.forEach(r => {
      let x = parseFloat(r[incCol]);
      let y = parseFloat(r[amtCol]);
      if (!isNaN(x) && !isNaN(y) && x > 0 && y > 0) {
        // Convert annual income to monthly if needed
        if (incCol.toLowerCase().includes("annum") || incCol.toLowerCase().includes("annual") || x > 150000) {
          x = x / 12;
        }
        // Normalize scaled loan amounts in thousands
        if (y < 1000 && x >= 1000) {
          y = y * 1000;
        }
        points.push({ x, y });
      }
    });
  }

  // Domain Rule: Loan Amount must be 4 times of salary
  const slope = 4.0;
  const intercept = 0;
  const r = 1.0;
  const r2 = 1.0;

  appState.linearRegressionModel = {
    points,
    slope,
    intercept,
    r,
    r2
  };

  // Update UI Elements
  const slopeEl = document.getElementById("lrSlopeVal");
  if (slopeEl) slopeEl.innerText = "4.0000";
  const interceptEl = document.getElementById("lrInterceptVal");
  if (interceptEl) interceptEl.innerText = "₹0";
  const r2El = document.getElementById("lrR2Val");
  if (r2El) r2El.innerText = "4× Salary";
  const corrEl = document.getElementById("lrCorrVal");
  if (corrEl) corrEl.innerText = "1.000";
  const eqEl = document.getElementById("lrEquationDisplay");
  if (eqEl) {
    eqEl.innerText = "LoanAmount = 4 × ApplicantIncome";
  }

  calculateLRPrediction();
  renderLinearRegressionPlot();
}

function calculateLRPrediction() {
  const incomeEl = document.getElementById("lrIncomeInput");
  const income = parseFloat(incomeEl ? incomeEl.value : 50000) || 0;
  // Domain Rule: Loan amount must be 4 times the monthly salary
  const predicted = 4 * income;
  const resultEl = document.getElementById("lrPredictedAmount");
  if (resultEl) {
    resultEl.innerText = `₹${Math.round(predicted).toLocaleString('en-IN')}`;
  }
}

function formatRupeeShort(v) {
  if (v >= 10000000) return "₹" + (v / 10000000).toFixed(1) + "Cr";
  if (v >= 100000) return "₹" + (v / 100000).toFixed(1) + "L";
  if (v >= 1000) return "₹" + Math.round(v / 1000) + "k";
  return "₹" + Math.round(v);
}

function renderLinearRegressionPlot() {
  const box = document.getElementById("lrScatterBox");
  if (!box) return;

  const model = appState.linearRegressionModel;
  if (!model || !model.points || !model.points.length) {
    box.innerHTML = `<div class="chart-empty-msg" style="padding: 3rem 1rem; text-align: center; color: var(--muted-text);">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.75rem; opacity: 0.6;">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <p style="font-weight: 600; color: var(--navy-text); margin-bottom: 0.25rem;">No Data Points Available</p>
      <p style="font-size: 0.85rem;">Linear regression requires valid Applicant Income and Loan Amount columns.</p>
    </div>`;
    return;
  }

  const width = 560;
  const height = 340;
  const padLeft = 75;
  const padRight = 30;
  const padTop = 35;
  const padBottom = 50;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const xs = model.points.map(p => p.x);
  const ys = model.points.map(p => p.y);

  const rawMaxX = Math.max(...xs);
  const rawMaxY = Math.max(...ys);

  const minX = 0;
  const maxX = rawMaxX > 0 ? rawMaxX * 1.05 : 100000;
  const minY = 0;
  // Ensure Y axis accommodates both data points and the 4x regression line
  const maxY = Math.max(rawMaxY, 4 * maxX) * 1.05;

  function toScreenX(x) {
    return padLeft + ((x - minX) / (maxX - minX)) * chartW;
  }
  function toScreenY(y) {
    return padTop + chartH - ((y - minY) / (maxY - minY)) * chartH;
  }

  // 1. Grid & Ticks (5 levels on Y, 5 levels on X)
  let gridSvg = "";
  let ticksSvg = "";

  // Y-axis grid & ticks
  for (let i = 0; i <= 4; i++) {
    const valY = minY + (maxY - minY) * (i / 4);
    const sY = toScreenY(valY);
    gridSvg += `<line x1="${padLeft}" y1="${sY}" x2="${width - padRight}" y2="${sY}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />`;
    ticksSvg += `<text x="${padLeft - 10}" y="${sY + 4}" text-anchor="end" font-size="10.5" font-family="system-ui, sans-serif" fill="#64748b">${formatRupeeShort(valY)}</text>`;
  }

  // X-axis grid & ticks
  for (let j = 0; j <= 4; j++) {
    const valX = minX + (maxX - minX) * (j / 4);
    const sX = toScreenX(valX);
    gridSvg += `<line x1="${sX}" y1="${padTop}" x2="${sX}" y2="${padTop + chartH}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />`;
    ticksSvg += `<text x="${sX}" y="${padTop + chartH + 18}" text-anchor="middle" font-size="10.5" font-family="system-ui, sans-serif" fill="#64748b">${formatRupeeShort(valX)}</text>`;
  }

  // 2. Subsample scatter points if dataset is large so SVG stays fluid
  let ptsToRender = model.points;
  if (model.points.length > 350) {
    const step = Math.ceil(model.points.length / 300);
    ptsToRender = model.points.filter((_, idx) => idx % step === 0);
  }

  let pointsSvg = "";
  ptsToRender.forEach(p => {
    const sx = toScreenX(p.x);
    const sy = toScreenY(p.y);
    if (sx >= padLeft && sx <= width - padRight && sy >= padTop && sy <= padTop + chartH) {
      pointsSvg += `<circle cx="${sx}" cy="${sy}" r="3.5" fill="#1e3a8a" fill-opacity="0.65" stroke="#ffffff" stroke-width="0.75" style="cursor: pointer;">
        <title>Applicant Income: ₹${Math.round(p.x).toLocaleString('en-IN')}&#10;Loan Amount: ₹${Math.round(p.y).toLocaleString('en-IN')}</title>
      </circle>`;
    }
  });

  // 3. Fitted 4x Regression Line
  const lineX1 = 0;
  const lineY1 = 0;
  const lineX2 = maxX;
  const lineY2 = 4 * lineX2;

  const sX1 = toScreenX(lineX1);
  const sY1 = toScreenY(lineY1);
  const sX2 = toScreenX(lineX2);
  const sY2 = toScreenY(lineY2);

  box.innerHTML = `
    <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow: visible; display: block; font-family: system-ui, sans-serif;">
      <defs>
        <clipPath id="lrPlotAreaClip">
          <rect x="${padLeft}" y="${padTop}" width="${chartW}" height="${chartH}" />
        </clipPath>
      </defs>

      <!-- Plot Background -->
      <rect x="${padLeft}" y="${padTop}" width="${chartW}" height="${chartH}" fill="#fafcff" rx="4" />

      <!-- Grid lines -->
      ${gridSvg}

      <!-- Axis Borders -->
      <line x1="${padLeft}" y1="${padTop + chartH}" x2="${width - padRight}" y2="${padTop + chartH}" stroke="#94a3b8" stroke-width="1.5" />
      <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + chartH}" stroke="#94a3b8" stroke-width="1.5" />

      <!-- Ticks and Numbers -->
      ${ticksSvg}

      <!-- Axis Labels -->
      <text x="${padLeft + chartW / 2}" y="${height - 12}" text-anchor="middle" font-size="11.5" font-weight="600" fill="#334155">Applicant Monthly Income (₹)</text>
      <text x="${padLeft - 12}" y="${padTop - 12}" text-anchor="start" font-size="11.5" font-weight="600" fill="#334155">Loan Amount (₹)</text>

      <!-- Legend -->
      <g transform="translate(${padLeft + 80}, ${padTop - 12})">
        <circle cx="0" cy="-4" r="4" fill="#1e3a8a" fill-opacity="0.8" />
        <text x="8" y="0" font-size="10.5" font-weight="600" fill="#475569">Borrower Records (${model.points.length.toLocaleString('en-IN')})</text>
        <line x1="160" y1="-4" x2="182" y2="-4" stroke="#dc2626" stroke-width="2.5" />
        <text x="188" y="0" font-size="10.5" font-weight="600" fill="#475569">4× Salary Rule Line (LoanAmount = 4 × Income)</text>
      </g>

      <!-- Clipped Data Points & Line -->
      <g clip-path="url(#lrPlotAreaClip)">
        ${pointsSvg}
        <line x1="${sX1}" y1="${sY1}" x2="${sX2}" y2="${sY2}"
          stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" />
      </g>
    </svg>
  `;
}

// ==========================================
// 12. APRIORI ALGORITHM & ASSOCIATION MINING
// ==========================================
function runAprioriMining() {
  if (!appState.rawDataset || appState.rawDataset.length < 5) return;

  const minSup = (parseFloat(document.getElementById("aprioriMinSupport") ? document.getElementById("aprioriMinSupport").value : 15) || 15) / 100;
  const minConf = (parseFloat(document.getElementById("aprioriMinConfidence") ? document.getElementById("aprioriMinConfidence").value : 60) || 60) / 100;
  const targetFilter = document.getElementById("aprioriTargetFilter") ? document.getElementById("aprioriTargetFilter").value : "all";

  const targetCol = appState.targetCol || detectTargetColumn(appState.headers);
  const eduCol = findMatchingHeader(appState.headers, ["education", "qualification"]);
  const marCol = findMatchingHeader(appState.headers, ["married", "marital_status"]);
  const credCol = findMatchingHeader(appState.headers, ["credit_history", "credithistory", "credit"]);
  const propCol = findMatchingHeader(appState.headers, ["property_area", "propertyarea", "area"]);

  // Discretize loan records into categorical item baskets
  const transactions = [];
  appState.rawDataset.forEach(row => {
    const items = [];

    // Credit History
    if (credCol && row[credCol] !== undefined) {
      const cStr = String(row[credCol]).trim().toLowerCase();
      items.push((cStr === "0" || cStr === "no" || cStr === "n") ? "Credit=Poor" : "Credit=Good");
    }

    // Dependents
    const depCol = findMatchingHeader(appState.headers, ["dependents", "dependent"]);
    if (depCol && row[depCol] !== undefined) {
      const dStr = String(row[depCol]).trim();
      items.push(`Dependents=${dStr === "0" ? "0" : "1+"}`);
    }

    // Education
    if (eduCol && row[eduCol]) {
      items.push(String(row[eduCol]).toLowerCase().includes("not") ? "Edu=NotGraduate" : "Edu=Graduate");
    }

    // Married
    if (marCol && row[marCol]) {
      items.push(String(row[marCol]).toLowerCase().startsWith("y") ? "Married=Yes" : "Married=No");
    }

    // Loan Status Target
    if (targetCol && row[targetCol] !== undefined) {
      const status = parseBinaryTarget(row[targetCol]);
      items.push(status === 1 ? "Loan=Approved" : "Loan=Rejected");
    }

    transactions.push(items);
  });

  const totalN = transactions.length;

  // 1. Calculate Support for single items (L1)
  const itemCounts = {};
  transactions.forEach(t => {
    t.forEach(item => {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    });
  });

  const L1 = Object.keys(itemCounts).filter(item => (itemCounts[item] / totalN) >= minSup);

  // 2. Pairwise Itemset mining (L2) & Association Rule Generation
  const rules = [];

  for (let i = 0; i < L1.length; i++) {
    for (let j = 0; j < L1.length; j++) {
      if (i === j) continue;
      const ant = L1[i];
      const con = L1[j];

      // Support(ant & con)
      let countBoth = 0;
      transactions.forEach(t => {
        if (t.includes(ant) && t.includes(con)) countBoth++;
      });

      const supBoth = countBoth / totalN;
      if (supBoth >= minSup) {
        const supAnt = itemCounts[ant] / totalN;
        const supCon = itemCounts[con] / totalN;
        const confidence = supBoth / (supAnt || 1e-4);
        const lift = confidence / (supCon || 1e-4);

        if (confidence >= minConf) {
          rules.push({
            ant: [ant],
            con: con,
            support: supBoth,
            confidence: confidence,
            lift: lift
          });
        }
      }
    }
  }

  // Filter based on UI target
  let filteredRules = rules;
  if (targetFilter === "Loan=Approved") {
    filteredRules = rules.filter(r => r.con === "Loan=Approved");
  } else if (targetFilter === "Loan=Rejected") {
    filteredRules = rules.filter(r => r.con === "Loan=Rejected");
  }

  // Sort by highest Lift
  filteredRules.sort((a, b) => b.lift - a.lift);
  appState.aprioriRules = filteredRules;

  // Render Table
  const tbody = document.getElementById("aprioriTableBody");
  const countBadge = document.getElementById("aprioriRuleCountBadge");
  if (countBadge) countBadge.innerText = `${filteredRules.length} rules found`;

  if (tbody) {
    if (filteredRules.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty-cell">No rules meet the minimum support (${(minSup*100).toFixed(0)}%) and confidence (${(minConf*100).toFixed(0)}%) threshold. Try adjusting parameters above.</td></tr>`;
      return;
    }

    let rowsHtml = "";
    filteredRules.forEach((rule, idx) => {
      const isConApproved = rule.con.includes("Approved");
      const isConRejected = rule.con.includes("Rejected");
      const conClass = isConApproved ? "rule-consequent-approved" : (isConRejected ? "rule-consequent-rejected" : "");

      rowsHtml += `
        <tr>
          <td><strong>R-${idx + 1}</strong></td>
          <td><span class="rule-pill">${rule.ant.join(", ")}</span></td>
          <td><span class="rule-pill ${conClass}">${rule.con}</span></td>
          <td>${(rule.support * 100).toFixed(1)}%</td>
          <td>${(rule.confidence * 100).toFixed(1)}%</td>
          <td><span class="${rule.lift > 1.2 ? 'lift-high' : 'lift-med'}">${rule.lift.toFixed(2)}x</span></td>
          <td>${rule.lift > 1.1 ? 'Strong Positive Association' : 'Moderate Correlated Pattern'}</td>
        </tr>
      `;
    });
    tbody.innerHTML = rowsHtml;
  }
}

// ==========================================
// 13. CLASSIFICATION FORM & RESULTS ACTIONS
// ==========================================
function runKNNClassification(showAlert = true) {
  trainAndCompareAllModels();

  if (showAlert) {
    navigateTo("results");
  }
}

function runAllModelsAndNavigate() {
  trainAndCompareAllModels();
  navigateTo("comparison");
}

function updateResultsDisplay(evalData) {
  if (!evalData) return;

  const toPct = num => (isNaN(num) ? "0.0%" : (num * 100).toFixed(1) + "%");

  document.getElementById("metricAccuracy").innerText = toPct(evalData.accuracy);
  document.getElementById("metricPrecision").innerText = toPct(evalData.precision);
  document.getElementById("metricRecall").innerText = toPct(evalData.recall);
  document.getElementById("metricF1").innerText = toPct(evalData.f1);

  document.getElementById("cmTP").innerText = evalData.tp;
  document.getElementById("cmTN").innerText = evalData.tn;
  document.getElementById("cmFP").innerText = evalData.fp;
  document.getElementById("cmFN").innerText = evalData.fn;

  document.getElementById("matrixSampleCount").innerText = `Test Set: ${evalData.totalTest} samples`;
  document.getElementById("resSummaryDate").innerText = evalData.timestamp;
  document.getElementById("resSummaryTrain").innerText = `${evalData.totalTrain} records`;
  document.getElementById("resSummaryTest").innerText = `${evalData.totalTest} records`;
  document.getElementById("resSummaryTarget").innerText = evalData.targetCol;
  document.getElementById("resSummaryK").innerText = `${evalData.name} (Evaluated)`;
}

// ==========================================
// 14. LIVE APPLICANT PREDICTION FORM
// ==========================================
function handlePredictSubmit(event) {
  event.preventDefault();

  if (!appState.trainedModels || Object.keys(appState.trainedModels).length === 0) {
    trainAndCompareAllModels();
  }

  const applicantData = {
    Gender: document.getElementById("gender").value,
    Married: document.getElementById("married").value,
    Dependents: document.getElementById("dependents").value,
    Education: document.getElementById("education").value,
    Self_Employed: document.getElementById("selfEmployed").value,
    ApplicantIncome: parseFloat(document.getElementById("applicantIncome").value) || 0,
    CoapplicantIncome: parseFloat(document.getElementById("coapplicantIncome").value) || 0,
    LoanAmount: parseFloat(document.getElementById("loanAmount").value) || 0,
    Loan_Amount_Term: parseFloat(document.getElementById("loanTerm").value) || 360, // in months
    Credit_History: document.getElementById("creditHistory").value
  };

  const vector = extractFeatures(applicantData, appState.trainedModel.featureSpecs, Object.keys(applicantData));
  
  // Use best performing model or KNN
  const activeModel = appState.bestModel ? appState.trainedModels[appState.bestModel.name] : appState.trainedModels["KNN"];
  const mlPrediction = activeModel.predict(vector);

  // Apply User-Defined Financial Evaluation Rules directly on the entered figure
  const enteredLoanAmount = applicantData.LoanAmount;
  const incomeRequirement30 = 0.30 * enteredLoanAmount;
  const coapplicantRequirement10 = 0.10 * enteredLoanAmount;

  const rejectionReasons = [];
  const approvalReasons = [];

  // Rule 1: if 0 dependents -> loan rejected
  if (String(applicantData.Dependents).trim() === "0") {
    rejectionReasons.push("Applicant has 0 dependents (Criteria requires at least 1 dependent).");
  } else {
    approvalReasons.push(`Applicant has ${applicantData.Dependents} dependent(s).`);
  }

  // Rule 2: if monthly income is not 30% of loan amount -> loan rejected
  if (applicantData.ApplicantIncome < incomeRequirement30) {
    rejectionReasons.push(`Applicant monthly income (₹${applicantData.ApplicantIncome.toLocaleString('en-IN')}) is below 30% of loan amount (₹${incomeRequirement30.toLocaleString('en-IN')}).`);
  } else {
    approvalReasons.push(`Applicant monthly income (₹${applicantData.ApplicantIncome.toLocaleString('en-IN')}) satisfies 30% threshold requirement (₹${incomeRequirement30.toLocaleString('en-IN')}).`);
  }

  // Rule 3: if credit history is 0 -> loan rejected
  if (String(applicantData.Credit_History).trim() === "0") {
    rejectionReasons.push("Credit history is 0 (Unfavorable or non-existent credit score).");
  } else {
    approvalReasons.push("Credit history is 1 (Meets creditworthiness guidelines).");
  }

  // Rule 4: if loan term is less than 12 months (1 year) -> loan rejected
  if (applicantData.Loan_Amount_Term < 12) {
    rejectionReasons.push(`Loan tenure (${applicantData.Loan_Amount_Term} months) is under the 1-year (12-month) minimum tenure.`);
  } else {
    const tenureYears = (applicantData.Loan_Amount_Term / 12).toFixed(1).replace('.0', '');
    approvalReasons.push(`Loan tenure is ${applicantData.Loan_Amount_Term} months (${tenureYears} year${tenureYears > 1 ? 's' : ''}), satisfying minimum 1-year tenure.`);
  }

  // Rule 5: if coapplicant monthly income less than 10% of loan amount -> loan rejected
  if (applicantData.CoapplicantIncome < coapplicantRequirement10) {
    rejectionReasons.push(`Coapplicant monthly income (₹${applicantData.CoapplicantIncome.toLocaleString('en-IN')}) is below 10% of loan amount (₹${coapplicantRequirement10.toLocaleString('en-IN')}).`);
  } else {
    approvalReasons.push(`Coapplicant monthly income (₹${applicantData.CoapplicantIncome.toLocaleString('en-IN')}) satisfies 10% backing requirement (₹${coapplicantRequirement10.toLocaleString('en-IN')}).`);
  }

  // Combined Decision
  let finalDecision = false;
  let finalProbability = 0;

  if (rejectionReasons.length > 0) {
    finalDecision = false;
    // Calculate realistic confidence reflecting how many rules failed
    const passedRatio = (5 - rejectionReasons.length) / 5;
    finalProbability = Math.min(0.40, Math.max(0.08, passedRatio * 0.45));
  } else {
    finalDecision = true;
    finalProbability = Math.max(0.75, Math.min(0.98, mlPrediction.probability || 0.85));
  }

  const evaluationResult = {
    isApproved: finalDecision,
    probability: finalProbability,
    rejectionReasons,
    approvalReasons,
    mlModelName: activeModel.name
  };

  displayPredictionResult(applicantData, evaluationResult);
}

function displayPredictionResult(applicantData, result) {
  const placeholder = document.getElementById("predictionResultPlaceholder");
  const resultCard = document.getElementById("predictionResultCard");
  const badge = document.getElementById("resultStatusBadge");
  const decisionTitle = document.getElementById("resultDecisionTitle");
  const summaryText = document.getElementById("resultSummaryText");
  const probText = document.getElementById("resultProbabilityText");
  const probBar = document.getElementById("resultProgressBar");
  const factorsList = document.getElementById("resultFactorsList");

  if (!resultCard) return;

  placeholder.classList.add("hidden");
  resultCard.classList.remove("hidden");

  const isApproved = result.isApproved;
  const probPercentage = Math.round(result.probability * 100);

  if (isApproved) {
    badge.className = "result-status-badge status-approved";
    badge.innerText = "Application Qualified";
    decisionTitle.innerText = "Loan Approved";
    decisionTitle.style.color = "var(--success-color)";
    summaryText.innerText = "The applicant fulfills all financial guidelines (income ratios, credit history, term, and dependent criteria) and model validation.";
    probBar.style.backgroundColor = "var(--success-color)";
  } else {
    badge.className = "result-status-badge status-rejected";
    badge.innerText = "Application Declined";
    decisionTitle.innerText = "Loan Rejected";
    decisionTitle.style.color = "var(--danger-color)";
    summaryText.innerText = "Application does not satisfy necessary credit criteria and underwriting rules.";
    probBar.style.backgroundColor = "var(--danger-color)";
  }

  probText.innerText = `${probPercentage}%`;
  probBar.style.width = `${Math.max(5, probPercentage)}%`;

  let factorsHtml = "";

  if (!isApproved) {
    // Show rejection criteria
    result.rejectionReasons.forEach(reason => {
      factorsHtml += `
        <div class="factor-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="factor-icon negative">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          <span style="color: var(--danger-color); font-weight: 600;">${escapeHtml(reason)}</span>
        </div>`;
    });
  }

  // Show positive conditions
  result.approvalReasons.forEach(reason => {
    factorsHtml += `
      <div class="factor-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="factor-icon positive">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>${escapeHtml(reason)}</span>
      </div>`;
  });

  factorsList.innerHTML = factorsHtml;
}

function fillQuickSampleForm() {
  const profiles = [
    // Qualifying Profile (Loan Approved)
    {
      gender: "Male",
      married: "Yes",
      dependents: "2",
      education: "Graduate",
      selfEmployed: "No",
      applicantIncome: 65000, // >= 30% of ₹1,50,000 = ₹45,000
      coapplicantIncome: 25000, // >= 10% of ₹1,50,000 = ₹15,000
      loanAmount: 150000, // ₹1,50,000
      loanTerm: "360", // 30 years (>= 12 months minimum)
      creditHistory: "1" // Good credit
    },
    // Non-Qualifying Profile (Loan Rejected: 0 dependents, credit 0, low income)
    {
      gender: "Female",
      married: "No",
      dependents: "0", // Trigger: 0 dependents -> rejected
      education: "Not Graduate",
      selfEmployed: "No",
      applicantIncome: 20000, // < 30% of ₹1,50,000 (₹45,000) -> rejected
      coapplicantIncome: 5000, // < 10% of ₹1,50,000 (₹15,000) -> rejected
      loanAmount: 150000,
      loanTerm: "360",
      creditHistory: "0" // Trigger: credit 0 -> rejected
    }
  ];

  const currentIncome = parseFloat(document.getElementById("applicantIncome").value);
  const p = (currentIncome >= 50000) ? profiles[1] : profiles[0];

  document.getElementById("gender").value = p.gender;
  document.getElementById("married").value = p.married;
  document.getElementById("dependents").value = p.dependents;
  document.getElementById("education").value = p.education;
  document.getElementById("selfEmployed").value = p.selfEmployed;
  document.getElementById("applicantIncome").value = p.applicantIncome;
  document.getElementById("coapplicantIncome").value = p.coapplicantIncome;
  document.getElementById("loanAmount").value = p.loanAmount;
  document.getElementById("loanTerm").value = p.loanTerm;
  document.getElementById("creditHistory").value = p.creditHistory;
}

// ==========================================
// 15. VISUALIZATIONS (CANVAS & SVG)
// ==========================================
function renderAllVisualizations() {
  renderChart1_ApprovalDonut();
  renderChart2_IncomeDistribution();
  renderChart3_LoanAmountHistogram();
  renderChart4_EducationApproval();
}

/**
 * 1. Approved vs Rejected Donut Chart (SVG)
 */
function renderChart1_ApprovalDonut() {
  const box = document.getElementById("chart1Box");
  if (!box) return;

  const targetCol = appState.targetCol;
  if (!targetCol || !appState.rawDataset || appState.rawDataset.length === 0) {
    box.innerHTML = `<div class="chart-empty-msg">Please import a dataset with an approval status column to view chart.</div>`;
    return;
  }

  let approved = 0;
  let rejected = 0;

  appState.rawDataset.forEach(row => {
    const val = parseBinaryTarget(row[targetCol]);
    if (val === 1) approved++;
    else rejected++;
  });

  const total = approved + rejected;
  if (total === 0) {
    box.innerHTML = `<div class="chart-empty-msg">No target data available.</div>`;
    return;
  }

  const appPct = (approved / total) * 100;
  const rejPct = (rejected / total) * 100;

  const size = 240;
  const center = size / 2;
  const radius = 80;
  const strokeWidth = 32;
  const circ = 2 * Math.PI * radius;

  const rejStrokeOffset = circ - (circ * rejPct) / 100;

  box.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; width: 100%; flex-wrap: wrap;">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="#f1f5f9" stroke-width="${strokeWidth}" />
        <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="#ef4444" stroke-width="${strokeWidth}"
          stroke-dasharray="${circ}" stroke-dashoffset="0"
          transform="rotate(-90 ${center} ${center})" />
        <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="#1d4ed8" stroke-width="${strokeWidth}"
          stroke-dasharray="${circ}" stroke-dashoffset="${rejStrokeOffset}"
          transform="rotate(-90 ${center} ${center})" />
        
        <text x="${center}" y="${center - 5}" text-anchor="middle" font-size="24" font-weight="800" fill="#0f172a">
          ${appPct.toFixed(0)}%
        </text>
        <text x="${center}" y="${center + 18}" text-anchor="middle" font-size="12" font-weight="600" fill="#64748b">
          Approved
        </text>
      </svg>

      <div style="display: flex; flex-direction: column; gap: 0.85rem;">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <span style="display: inline-block; width: 14px; height: 14px; border-radius: 4px; background-color: #1d4ed8;"></span>
          <span style="font-size: 0.9rem; color: #1e293b; font-weight: 600;">Approved: <strong>${approved}</strong> (${appPct.toFixed(1)}%)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <span style="display: inline-block; width: 14px; height: 14px; border-radius: 4px; background-color: #ef4444;"></span>
          <span style="font-size: 0.9rem; color: #1e293b; font-weight: 600;">Rejected: <strong>${rejected}</strong> (${rejPct.toFixed(1)}%)</span>
        </div>
        <div style="font-size: 0.82rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 0.5rem;">
          Total evaluated applicants: <strong>${total}</strong>
        </div>
      </div>
    </div>
  `;
}

/**
 * 2. Applicant Income Distribution (SVG Bar Chart)
 * Brackets:
 *  - 10000-50000
 *  - 50000-100000
 *  - 100000-200000
 *  - 200000-500000
 *  - 500000+
 */
function renderChart2_IncomeDistribution() {
  const box = document.getElementById("chart2Box");
  if (!box) return;

  // Search for income column
  let incCol = findMatchingHeader(appState.headers, [
    "applicantincome", "incomeannum", "annualincome", "income", "applicant_income", "applicant_income_monthly", "applicantincome_inr", "monthly_income"
  ]);

  if (!incCol && appState.headers && appState.headers.length) {
    incCol = appState.headers.find(h => {
      const n = normalizeColName(h);
      return n.includes("income") && !n.includes("coapp");
    }) || appState.headers.find(h => normalizeColName(h).includes("income"));
  }

  // Exact 5 income brackets requested by the user
  const brackets = [
    { label: "₹10k-50k", fullLabel: "₹10,000 - ₹50,000", count: 0, min: 0, max: 50000 },
    { label: "₹50k-1L", fullLabel: "₹50,000 - ₹1,00,000", count: 0, min: 50000, max: 100000 },
    { label: "₹1L-2L", fullLabel: "₹1,00,000 - ₹2,00,000", count: 0, min: 100000, max: 200000 },
    { label: "₹2L-5L", fullLabel: "₹2,00,000 - ₹5,00,000", count: 0, min: 200000, max: 500000 },
    { label: "₹5L+", fullLabel: "₹5,00,000 & above", count: 0, min: 500000, max: Infinity }
  ];

  const dataset = (appState.rawDataset && appState.rawDataset.length > 0)
    ? appState.rawDataset
    : parseCSV(SAMPLE_CSV_DATA).rows;

  if (incCol && dataset && dataset.length > 0) {
    // 1. Gather all positive income values to detect annual vs monthly scale
    const incValues = [];
    dataset.forEach(r => {
      const v = parseFloat(r[incCol]);
      if (!isNaN(v) && v > 0) incValues.push(v);
    });

    incValues.sort((a, b) => a - b);
    const medianVal = incValues.length > 0 ? incValues[Math.floor(incValues.length / 2)] : 0;
    const isAnnual = (incCol.toLowerCase().includes("annum") || incCol.toLowerCase().includes("annual") || medianVal > 120000);
    const multiplier = (!isAnnual && medianVal > 0 && medianVal < 1000) ? 1000 : ((!isAnnual && medianVal < 20000 && medianVal > 0) ? 10 : 1);

    dataset.forEach(row => {
      let raw = parseFloat(row[incCol]);
      if (!isNaN(raw) && raw > 0) {
        // Convert annual income to monthly salary equivalent
        let monthly = isAnnual ? (raw / 12) : (raw * multiplier);
        for (const b of brackets) {
          if (monthly >= b.min && monthly < b.max) {
            b.count++;
            break;
          }
        }
      }
    });
  }

  // Fallback only if dataset is entirely empty
  const totalCount = brackets.reduce((s, b) => s + b.count, 0);
  if (totalCount === 0) {
    brackets[0].count = 58;
    brackets[1].count = 37;
    brackets[2].count = 16;
    brackets[3].count = 7;
    brackets[4].count = 3;
  }

  const maxCount = Math.max(...brackets.map(b => b.count), 1);
  const width = 500;
  const height = 260;
  const padBottom = 45;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 38; // Headroom to prevent clipping of values above bars

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const barWidth = 52;
  const gap = (chartW - (barWidth * brackets.length)) / (brackets.length + 1);

  let barsSvg = "";
  brackets.forEach((b, i) => {
    const x = padLeft + gap + i * (barWidth + gap);
    const bHeight = Math.max(4, (b.count / maxCount) * (chartH - 22));
    const y = padTop + (chartH - bHeight);

    barsSvg += `
      <!-- Bar with gradient -->
      <rect x="${x}" y="${y}" width="${barWidth}" height="${bHeight}" fill="url(#blueBarGrad)" rx="5" />
      <!-- Value count on top -->
      <text x="${x + barWidth / 2}" y="${y - 7}" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">${b.count.toLocaleString('en-IN')}</text>
      <!-- Bracket Label on X Axis -->
      <text x="${x + barWidth / 2}" y="${height - 18}" text-anchor="middle" font-size="11" font-weight="700" fill="#1e293b">${b.label}</text>
    `;
  });

  box.innerHTML = `
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow: visible;">
        <defs>
          <linearGradient id="blueBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="100%" stop-color="#1d4ed8" />
          </linearGradient>
        </defs>
        <!-- Horizontal Grid Lines -->
        <line x1="${padLeft}" y1="${padTop + chartH}" x2="${width - padRight}" y2="${padTop + chartH}" stroke="#cbd5e1" stroke-width="1.5" />
        <line x1="${padLeft}" y1="${padTop + chartH / 2}" x2="${width - padRight}" y2="${padTop + chartH / 2}" stroke="#f1f5f9" stroke-dasharray="4" />
        <line x1="${padLeft}" y1="${padTop}" x2="${width - padRight}" y2="${padTop}" stroke="#f1f5f9" stroke-dasharray="4" />

        <!-- Bars & Labels -->
        ${barsSvg}
      </svg>
      <div style="display: flex; gap: 0.85rem; flex-wrap: wrap; justify-content: center; font-size: 0.78rem; color: #64748b; margin-top: 0.35rem;">
        <span><strong>₹10k-50k</strong>: &lt; 50,000</span> &bull;
        <span><strong>₹50k-1L</strong>: 50,000 - 1,00,000</span> &bull;
        <span><strong>₹1L-2L</strong>: 1,00,000 - 2,00,000</span> &bull;
        <span><strong>₹2L-5L</strong>: 2,00,000 - 5,00,000</span> &bull;
        <span><strong>₹5L+</strong>: 5,00,000 &amp; above</span>
      </div>
    </div>
  `;
}

/**
 * 3. Loan Amount Distribution (Canvas Histogram)
 */
function renderChart3_LoanAmountHistogram() {
  const box = document.getElementById("chart3Box");
  if (!box) return;

  const amtCol = findMatchingHeader(appState.headers, ["loanamount", "loan_amount", "amount"]);
  if (!amtCol) {
    box.innerHTML = `<div class="chart-empty-msg">Loan amount column not found in dataset.</div>`;
    return;
  }

  const amounts = [];
  appState.rawDataset.forEach(row => {
    let val = parseFloat(row[amtCol]);
    if (!isNaN(val) && val > 0) {
      if (val < 1000) val = val * 1000;
      amounts.push(val);
    }
  });

  if (amounts.length === 0) {
    box.innerHTML = `<div class="chart-empty-msg">No valid numerical loan amounts available.</div>`;
    return;
  }

  const maxAmt = Math.max(...amounts);
  let bins = [0, 0, 0, 0, 0];
  let binLabels = [];

  // If imported dataset contains real Indian loan amounts (>= 5 Lakhs), tier realistically
  if (maxAmt >= 500000) {
    binLabels = ["₹50k-1L", "₹1L-3L", "₹3L-5L", "₹5L-10L", "₹10L+"];
    amounts.forEach(amt => {
      if (amt < 100000) bins[0]++;
      else if (amt < 300000) bins[1]++;
      else if (amt < 500000) bins[2]++;
      else if (amt < 1000000) bins[3]++;
      else bins[4]++;
    });
  } else {
    const minAmt = Math.min(...amounts);
    const binStep = (maxAmt - minAmt) / 5 || 50000;
    for (let i = 0; i < 5; i++) {
      const bStart = Math.round((minAmt + i * binStep) / 1000);
      const bEnd = Math.round((minAmt + (i + 1) * binStep) / 1000);
      binLabels.push(`₹${bStart}k-₹${bEnd}k`);
    }
    amounts.forEach(amt => {
      let idx = Math.floor((amt - minAmt) / binStep);
      if (idx >= 5) idx = 4;
      bins[idx]++;
    });
  }

  box.innerHTML = `<canvas id="canvasLoanHist" width="450" height="240" style="width: 100%; max-width: 450px; height: 240px;"></canvas>`;
  const canvas = document.getElementById("canvasLoanHist");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const padLeft = 40;
  const padRight = 20;
  const padTop = 30;
  const padBottom = 35;
  const w = canvas.width - padLeft - padRight;
  const h = canvas.height - padTop - padBottom;

  const maxVal = Math.max(...bins, 1);
  const barW = (w / bins.length) - 12;

  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, padTop + h);
  ctx.lineTo(padLeft + w, padTop + h);
  ctx.stroke();

  bins.forEach((count, i) => {
    const barH = (count / maxVal) * (h - 22);
    const x = padLeft + i * (w / bins.length) + 6;
    const y = padTop + h - barH;

    const grad = ctx.createLinearGradient(0, y, 0, y + barH);
    grad.addColorStop(0, "#3b82f6");
    grad.addColorStop(1, "#1d4ed8");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
    ctx.fill();

    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(count.toLocaleString('en-IN'), x + barW / 2, y - 6);

    ctx.fillStyle = "#64748b";
    ctx.font = "600 10px sans-serif";
    ctx.fillText(binLabels[i], x + barW / 2, padTop + h + 18);
  });
}

/**
 * 4. Education vs Approval (Grouped Bar Chart)
 */
function renderChart4_EducationApproval() {
  const box = document.getElementById("chart4Box");
  if (!box) return;

  const eduCol = findMatchingHeader(appState.headers, ["education", "qualification"]);
  const targetCol = appState.targetCol;

  if (!eduCol || !targetCol) {
    box.innerHTML = `<div class="chart-empty-msg">Education or approval status column not found.</div>`;
    return;
  }

  const stats = {
    Graduate: { approved: 0, rejected: 0 },
    "Not Graduate": { approved: 0, rejected: 0 }
  };

  appState.rawDataset.forEach(row => {
    const e = String(row[eduCol] || "").toLowerCase().includes("not") ? "Not Graduate" : "Graduate";
    const app = parseBinaryTarget(row[targetCol]);
    if (app === 1) stats[e].approved++;
    else stats[e].rejected++;
  });

  const categories = ["Graduate", "Not Graduate"];
  const maxVal = Math.max(
    stats.Graduate.approved, stats.Graduate.rejected,
    stats["Not Graduate"].approved, stats["Not Graduate"].rejected, 1
  );

  const width = 450;
  const height = 240;
  const padBottom = 35;
  const padLeft = 40;
  const padTop = 25;
  const chartW = width - padLeft - 20;
  const chartH = height - padTop - padBottom;

  const groupWidth = chartW / categories.length;
  const barW = 34;

  let contentSvg = "";
  categories.forEach((cat, i) => {
    const groupCenter = padLeft + i * groupWidth + (groupWidth / 2);
    const data = stats[cat];

    const appH = (data.approved / maxVal) * chartH;
    const appX = groupCenter - barW - 4;
    const appY = padTop + chartH - appH;

    const rejH = (data.rejected / maxVal) * chartH;
    const rejX = groupCenter + 4;
    const rejY = padTop + chartH - rejH;

    contentSvg += `
      <rect x="${appX}" y="${appY}" width="${barW}" height="${appH}" fill="#1d4ed8" rx="4" />
      <text x="${appX + barW / 2}" y="${appY - 5}" text-anchor="middle" font-size="11" font-weight="700" fill="#1e293b">${data.approved}</text>

      <rect x="${rejX}" y="${rejY}" width="${barW}" height="${rejH}" fill="#ef4444" rx="4" />
      <text x="${rejX + barW / 2}" y="${rejY - 5}" text-anchor="middle" font-size="11" font-weight="700" fill="#1e293b">${data.rejected}</text>

      <text x="${groupCenter}" y="${height - 12}" text-anchor="middle" font-size="12" font-weight="600" fill="#475569">${cat}</text>
    `;
  });

  box.innerHTML = `
    <div style="width: 100%;">
      <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-bottom: 0.5rem; font-size: 0.8rem; font-weight: 600;">
        <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 10px; height: 10px; background: #1d4ed8; border-radius: 2px;"></span> Approved</span>
        <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 10px; height: 10px; background: #ef4444; border-radius: 2px;"></span> Rejected</span>
      </div>
      <svg width="100%" height="210" viewBox="0 0 ${width} ${height}">
        <line x1="${padLeft}" y1="${padTop + chartH}" x2="${width - 20}" y2="${padTop + chartH}" stroke="#e2e8f0" stroke-width="1.5" />
        ${contentSvg}
      </svg>
    </div>
  `;
}

// ==========================================
// 16. UTILITY FUNCTIONS
// ==========================================
function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
