let quoteList = [];
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

// Load and display everything on startup
loadStoredQuotes();
populateCategories();
displayStoredQuotes(getSavedFilter());

// === DOM Events ===
newQuoteBtn.addEventListener("click", showRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", handleAddQuote);
document.getElementById("exportBtn").addEventListener("click", exportQuotesToFile);
document.getElementById("importFile").addEventListener("change", importQuotesFromFile);
categoryFilter.addEventListener("change", filterQuotes);

// === Core Functions ===

function loadStoredQuotes() {
  const stored = localStorage.getItem("quoteList");
  if (stored) {
    quoteList = JSON.parse(stored);
  }
}

function saveQuotesToStorage() {
  localStorage.setItem("quoteList", JSON.stringify(quoteList));
}

function getSavedFilter() {
  return localStorage.getItem("selectedCategory") || "all";
}

function displayStoredQuotes(filter = "all") {
  quoteDisplay.innerHTML = "";

  const filtered = filter === "all"
    ? quoteList
    : quoteList.filter(q => q.category.toLowerCase() === filter.toLowerCase());

  if (filtered.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes found for this category.</p>";
    return;
  }

  filtered.forEach((quoteObj) => {
    const p = document.createElement("p");
    p.textContent = `"${quoteObj.text}" — (${quoteObj.category})`;
    quoteDisplay.appendChild(p);
  });
}

function showRandomQuote() {
  if (quoteList.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quoteList.length);
  const quote = quoteList[randomIndex];
  quoteDisplay.innerHTML = `<p>"${quote.text}" — (${quote.category})</p>`;
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

function handleAddQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (!quoteText || !quoteCategory) {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuoteObj = {
    text: quoteText,
    category: quoteCategory,
  };

  quoteList.push(newQuoteObj);
  saveQuotesToStorage();

  populateCategories();
  displayStoredQuotes(getSavedFilter());

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// === Filtering ===

function populateCategories() {
  const existing = new Set();

  quoteList.forEach(q => {
    existing.add(q.category.trim());
  });

  const currentFilter = getSavedFilter();

  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  existing.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    if (cat === currentFilter) opt.selected = true;
    categoryFilter.appendChild(opt);
  });
}

function filterQuotes() {
  const selected = categoryFilter.value;
  localStorage.setItem("selectedCategory", selected);
  displayStoredQuotes(selected);
}

// === Import/Export ===

function exportQuotesToFile() {
  const blob = new Blob([JSON.stringify(quoteList, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importQuotesFromFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quoteList.push(...imported);
        saveQuotesToStorage();
        populateCategories();
        displayStoredQuotes(getSavedFilter());
        alert("Quotes imported successfully.");
      } else {
        alert("Invalid JSON structure.");
      }
    } catch (err) {
      alert("Failed to parse the file.");
    }
  };
  reader.readAsText(event.target.files[0]);
}
