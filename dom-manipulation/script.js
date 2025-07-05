const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don’t let yesterday take up too much of today.", category: "Life" },
    { text: "Success is not final; failure is not fatal.", category: "Inspiration" }
  ];
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  
  newQuoteBtn.addEventListener("click", showRandomQuote);
  
  // Create and add the form dynamically
  createAddQuoteForm();
  
  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.id = "add-quote-form";
    formContainer.style.marginTop = "20px";
  
    // Quote input
    const quoteInput = document.createElement("input");
    quoteInput.type = "text";
    quoteInput.id = "newQuoteText";
    quoteInput.placeholder = "Enter a new quote";
  
    // Category input
    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.id = "newQuoteCategory";
    categoryInput.placeholder = "Enter quote category";
  
    // Add button
    const addBtn = document.createElement("button");
    addBtn.innerHTML = "Add Quote";
    addBtn.id = "addQuoteBtn";
  
    // Append elements to the form container
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addBtn);
  
    // Append form to body (or any container you like)
    document.body.appendChild(formContainer);
  
    // Add event listener to add quote
    addBtn.addEventListener("click", addQuote);
  }
  
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.innerHTML = "No quotes available.";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${quote.text}" — (${quote.category})`;
  }
  
  function addQuote() {
    const quoteInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const quoteText = quoteInput.value.trim();
    const categoryText = categoryInput.value.trim();
  
    if (quoteText === "" || categoryText === "") {
      alert("Please enter both a quote and a category.");
      return;
    }
  
    const newQuote = {
      text: quoteText,
      category: categoryText
    };
  
    quotes.push(newQuote);
  
    // Create and append quote element
    const quoteEl = document.createElement("p");
    quoteEl.innerHTML = `"${newQuote.text}" — (${newQuote.category})`;
    quoteDisplay.appendChild(quoteEl);
  
    // Clear inputs
    quoteInput.value = "";
    categoryInput.value = "";
  }
  
  let quoteList = [];



// Load on page load
loadStoredQuotes();
displayStoredQuotes();

// === DOM Events ===
newQuoteBtn.addEventListener("click", showRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", handleAddQuote);
document.getElementById("exportBtn").addEventListener("click", exportQuotesToFile);
document.getElementById("importFile").addEventListener("change", importQuotesFromFile);

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

function displayStoredQuotes() {
  quoteDisplay.innerHTML = "";
  quoteList.forEach((quoteObj) => {
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
  displayStoredQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

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
        displayStoredQuotes();
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
