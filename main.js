let themes = [];
let sentences = [];

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

async function fetchData() {
  try {
    // 使用相對路徑
    const [themesRes, sentenceRes] = await Promise.all([
      fetch('themes.json'),
      fetch('sentences.json')
    ]);

    themes = await themesRes.json();
    sentences = await sentenceRes.json();
    setRandomSentence();
    setRandomTheme();
    setTodayDate();
  } catch (error) {
    console.error("載入失敗：", error);
    // 設定預設值
    themes = [
      {
        name: "DEFAULT",
        emoji: "🕊️",
        colors: {
          background: "#F7F5EF",
          card: "#FFFCF8",
          textColor: "#2F2F2F",
          buttonText: "rgba(255,255,255,0.35)",
          buttonBorder: "transparent"
        }
      }
    ];
    sentences = ["喝第二杯咖啡不用理由"];
    setRandomSentence();
    setRandomTheme();
    setTodayDate();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchData();

  const button = document.getElementById("newSentence");
  if (button) {
    button.addEventListener("click", () => {
      console.log("按鈕被點擊"); // 加入除錯訊息
      // 確保資料已載入
      if (themes.length === 0 || sentences.length === 0) {
        fetchData();
      } else {
        setRandomSentence();
        setRandomTheme();
      }
    });
  } else {
    console.error("找不到按鈕元素"); // 加入錯誤訊息
  }
}); 
