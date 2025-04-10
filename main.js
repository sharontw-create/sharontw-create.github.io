async function fetchData() {
  try {
    // 使用相對路徑
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
    console.error("載入失敗：", error);
    // 設定預設值
    themes = [
      {
        name: "DEFAULT",
        emoji: "🌱",
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
      // 確保資料已載入
      if (themes.length === 0 || sentences.length === 0) {
        fetchData();
      } else {
        setRandomSentence();
        setRandomTheme();
      }
    });
  }
}); 
