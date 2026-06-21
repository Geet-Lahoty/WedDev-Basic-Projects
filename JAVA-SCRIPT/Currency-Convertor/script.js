const inputEL = document.getElementById("from-input");
const formEL = document.getElementById("currency-form");
const fromSelectEL = document.getElementById("from-dropdown");
const toSelectEL = document.getElementById("to-dropdown");
const buttonEL = document.getElementById("submit-btn");
const resultEL = document.getElementById("converted");

window.addEventListener("load", fetchCurrencies);

async function fetchCurrencies() {
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/USD",
  );
  const data = await response.json();

  console.log(data);

  const currencyOptions = Object.keys(data.rates);

  currencyOptions.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromSelectEL.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    toSelectEL.appendChild(option2);
  });
}

formEL.addEventListener("submit", changeCurrency);

async function changeCurrency(e) {
  e.preventDefault();

  const amount = inputEL.value;
  const fromCurrency = fromSelectEL.value;
  const toCurrency = toSelectEL.value;

  if (amount < 0) {
    alert("Enter valid amount");
    return;
  }

  const response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
  );
  const data = await response.json();

  const rate = data.rates[toCurrency];

  const result = (amount * rate).toFixed(2);

  resultEL.textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
}
