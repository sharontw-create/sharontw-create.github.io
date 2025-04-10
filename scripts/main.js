let themes = [];
let sentences = [];

async function fetchData() {
  // ✅ 自動抓 GitLab Pages 路徑
  const basePath = window.location.pathname.replace(/\/$/, "");

  const [themesRes, sentenceRes] = await Promise.all([
    fetch(`${basePath}/public/themes.json`),
    fetch(`${basePath}/public/sentences.json`)
  ]);

  themes = await themesRes.json();
  sentences = await sentenceRes.json();
  setRandomSentence();
  setRandomTheme();
  setTodayDate();
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

  document.getElementById("newSentence
