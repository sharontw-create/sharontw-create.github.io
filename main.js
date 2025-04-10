
let themes = [];
let sentences = [];

async function fetchData() {
  try {
    const [themesRes, sentenceRes] = await Promise.all([
      fetch('./themes.json'),
      fetch('./sentences.json')
    ]);
    themes = await themesRes.json();
    sentences = await sentenceRes.json();
    setRandomSentence();
    setRandomTheme();
    setTodayDate();
  } catch (error) {
    console.error("資料載入失敗：", error);
  }
}

function setRandomSentence() {
  const index = Math.floor(Math.random() * sentences.length);
  document.getElementById("sentence").innerText = sentences[index];
}

function setRandomTheme() {
  const theme = themes[Math.floor(Math.random() * themes.length)];
  const root = document.documentElement;
  root.style.setProperty('--app-background', theme.colors.background);
  root.style.setProperty('--app-card-background', theme.colors.card);
  root.style.setProperty('--app-text-color', theme.colors.textColor);
  root.style.setProperty('--app-button-text', theme.colors.buttonText);
  root.style.setProperty('--app-button-border', theme.colors.buttonBorder);
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
