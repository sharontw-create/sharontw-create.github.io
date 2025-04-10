let themes = [];
let sentences = [];

async function fetchData() {
  try {
    const base = window.location.pathname.replace(/\/$/, '');

    const [themesRes, sentenceRes] = await Promise.all([
      fetch(`${base}/themes.json`),
      fetch(`${base}/sentences.json`)
    ]);

    themes = await themesRes.json();
    sentences = await sentenceRes.json();
    setRandomSentence();
    setRandomTheme();
    setTodayDate();
  } catch (error) {
    console.error("載入失敗：", error);
  }
}

function setRandomSentence() {
  const index = Math.floor(Math.random() * sentences.length);
  document.getElementById("sentence").innerText = sentences[index];
}

function setRandomTheme() {
  const theme = themes[Math.floor(Math.random() * themes.length)];
  const r = document.documentElement;
  r.style.setProperty('--app-background', theme.colors.background);
  r.style.setProperty('--app-card-background', theme.colors.card);
  r.style.setProperty('--app-text-color', theme.colors.textColor);
  r.style.setProperty('--app-button-text', theme.colors.buttonText);
  r.style.setProperty('--app-button-border', theme.colors.buttonBorder);
  document.getElementById("newSentence").innerText = theme.emoji;
}

function setTodayDate() {
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  const formatted = now.toLocaleDateString('zh-TW', options);
  document.getElementById("dateDisplay").innerText = formatted;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchData();

  const button = document.getElementById("newSentence");
  if (button) {
    button.addEventListener("click", () => {
      setRandomSentence();
      setRandomTheme();
    });
  }
});
