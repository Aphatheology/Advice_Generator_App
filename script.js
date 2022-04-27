import * as htmlToImage from 'https://cdn.skypack.dev/html-to-image';
import downloadjs from 'https://cdn.skypack.dev/downloadjs';

const adviceId = document.querySelector('.advice__title');
const adviceText = document.querySelector('.advice__text');
const adviceBtn = document.querySelector('.advice__dice');
const downloadAdvice = document.getElementById('advice');
const downloadBtn = document.querySelector('.download');
const form = document.querySelector("form");
const randomQuote = document.querySelector('#quotegen');
const randomAdvice = document.querySelector('#advicegen')


async function generateAdviceOrQuote() {
    adviceBtn.disabled = true;

    if(form.elements["gentype"].value === 'advice') {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        adviceId.textContent = `Anonymous Advice #${data.slip.id}`;
        adviceText.textContent = `"${data.slip.advice}"`
        setInterval(() => {
            adviceBtn.disabled = false;
        }, 2000)
    } else {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        adviceId.textContent = `${data.author} said;`
        adviceText.textContent = `"${data.content}"`
        setInterval(() => {
            adviceBtn.disabled = false;
        }, 2000)
    }
}

// Generate an advice once the Advice radio button is selecter
randomAdvice.addEventListener('change' , async () => {
    adviceBtn.disabled = true;
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    adviceId.textContent = `Anonymous Advice #${data.slip.id}`;
    adviceText.textContent = `"${data.slip.advice}"`;
    setInterval(() => {
        adviceBtn.disabled = false;
    }, 2000)
})

// Generate a quote once the Quote radio button is selecter
randomQuote.addEventListener('change' , async () => {
    adviceBtn.disabled = true;
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    adviceId.textContent = `${data.author} said;`;
    adviceText.textContent = `"${data.content}"`;
    setInterval(() => {
        adviceBtn.disabled = false;
    }, 2000)
})

window.onload = generateAdviceOrQuote();
adviceBtn.addEventListener('click' , generateAdviceOrQuote);
// randomAdvice.addEventListener('click', generateAdviceOrQuote);
// randomQuote.addEventListener('click', generateAdviceOrQuote);

downloadBtn.addEventListener('click', () => {
    htmlToImage.toPng(downloadAdvice)
  .then(function (dataUrl) {
    downloadjs(dataUrl, 'my-advice.png');
  });
})