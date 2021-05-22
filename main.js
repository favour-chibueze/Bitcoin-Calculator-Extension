let bitcoinAmount = document.getElementById('bitcoinAmount');
let currencyAmount = document.getElementById('currencyAmount');
let changeCurrency = document.getElementById('changeCurrency');

let formatterUSD = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
});

let formatterNGN = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'NGN',
});

const getRates = fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD,NGN')
   .then((res) => res.json())
   .then((data) => {
      let rates;
      rates = data;

      changeCurrency.addEventListener('change', () => {
         if (changeCurrency.value === 'NGN') {
            bitcoinAmount.addEventListener('input', () => {
               result = bitcoinAmount.value * rates.BTC.NGN;
               currencyAmount.value = formatterNGN.format(result);
            });

            currencyAmount.addEventListener('input', () => {
               result = currencyAmount.value / rates.BTC.NGN;
               bitcoinAmount.value = result;
            });
         } else if (changeCurrency.value === 'USD') {
            bitcoinAmount.addEventListener('input', () => {
               result = bitcoinAmount.value * rates.BTC.USD;
               currencyAmount.value = formatterUSD.format(result);
            });

            currencyAmount.addEventListener('input', () => {
               result = currencyAmount.value / rates.BTC.USD;
               bitcoinAmount.value = result;
            });
         } else {
         }
      });
   })
   .catch((e) => {
      console.log(e);
   });

