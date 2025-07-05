// Quotes array with categories
const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don’t let yesterday take up too much of today.", category: "Life" },
    { text: "Success is not final; failure is not fatal.", category: "Inspiration" }
  ];
  
  // DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const addQuoteBtn = document.getElementById("addQuoteBtn");
  
  // Show a random quote from the array
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.innerHTML= "No quotes available.";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML= `"${quote.text}" — (${quote.category})`;
  }
  
  // Add a new quote to the array
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
  
    const quoteEl = document.createElement("p");
    quoteEl.textContent = `"${newQuote.text}" — (${newQuote.category})`;
  
    quoteDisplay.appendChild(quoteEl);
    // Clear inputs
    quoteInput.value = "";
    categoryInput.value = "";
  
    // Optionally display the newly added quote
    quoteDisplay.innerHTML= `"${newQuote.text}" — (${newQuote.category})`;
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);
  