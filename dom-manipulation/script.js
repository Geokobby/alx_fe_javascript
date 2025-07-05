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
  