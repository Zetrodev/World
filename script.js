// Kelime listeleri
const normalKelimeler = ["AĞAÇ", "AKILLI", "ATEŞ", "ARABA", "BEDEN", "BİLET", "BUZLU", 
    "ÇALIŞ", "ÇİÇEK", "DÜĞÜN", "DENİZ", "DÖRT", "ELBİSE", "ELMAS", 
    "FIRTINA", "FİKİR", "GÜNEŞ", "HEDİYE", "HIZLA", "İŞLEM", 
    "KAHVE", "KALEM", "KEDİ", "KILIÇ", "KIRIL", "KÖPEK", "KÜTLE", 
    "KÜTÜPHANE", "MASA", "MÜZİK", "OYUN", "PARAŞ", "RÜZGAR", 
    "SAKIZ", "SICAK", "SIRA", "SÖZLÜK", "SORUN", "SUÇLU", 
    "TAKSİM", "TEKER", "TÜTÜN", "YARIŞ", "YILDIZ", "YÜZDE", 
    "ZAMAN", "ZÜRAFA", "AKSAK", "ALET", "ALTIN", "BACAK", 
    "BIÇAK", "ÇOCUK", "ÇÖZÜM", "ÇÖPÇÜ", "EŞYA", "FIRTINA", 
    "GÖLGE", "GÖZDE", "İÇLİK", "KAMERA", "KASA", "KASIM", 
    "KENAR", "KÖŞE", "MEKAN", "NEDEN", "ÖĞRET", "SAYILA", 
    "ŞARKI", "ŞEHİR", "ŞEKER", "ŞİŞE", "TAKIM", "TÜTÜN", 
    "VİZYON", "YAZMA", "YETİŞ", "YÜZÜK", "KARGO", "MAKET", 
    "RAKAM", "SAKIZ", "DIŞARI", "DÖNÜŞ", "BAŞKA", "SESİ", 
    "YAZAR", "GÖZLÜK", "İŞARET", "RUH", "KÜREK", "ÜLKEM", 
    "YÜZME", "KÜÇÜK", "DİZİM", "SAHNE", "RÜZGAR", "KAPI", 
    "GÜZEL", "KÖŞE", "İÇTEN", "DUMAN", "IŞIK", "TIPIR", 
    "GÖLGEL", "ARZUHAL", "MASA", "AYDIN", "ELDİVEN", "RÜZGAR", 
    "SONSUZ"];
const gunlukKelimeler = ["DUMAN"];

let gizliKelime;
let currentRow = 0; 
let totalGames = 0;
let wins = 0;
let isDailyGame = false;

// Oyun tahtasını oluşturma
function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let row = 0; row < 6; row++) {  // 6 satır
    for (let col = 0; col < 5; col++) {  // Her satırda 5 sütun
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `cell-${row}-${col}`;
      board.appendChild(cell);
    }
  }
}

// Günlük kelimeyi seçme
function getDailyWord() {
  const today = new Date().getDate();
  return gunlukKelimeler[today % gunlukKelimeler.length];
}

// Günlük oyun başlatma
function startDailyGame() {
  isDailyGame = true;
  gizliKelime = getDailyWord();
  resetGame();
  document.getElementById("board-container").style.display = "block";
  displayMessage("Bugünkü kelimeyi bul!");
}

// Serbest oyun başlatma
function startNormalGame() {
  isDailyGame = false;
  gizliKelime = normalKelimeler[Math.floor(Math.random() * normalKelimeler.length)];
  resetGame();
  document.getElementById("board-container").style.display = "block";
  displayMessage("Serbest modda oyna!");
}

// Tahmin kontrolü
function checkGuess() {
  const guess = document.getElementById("guessInput").value.toUpperCase();
  if (guess.length !== 5) {
    displayMessage("Lütfen 5 harfli bir kelime girin.");
    return;
  }

  const kelimeHarflari = [...gizliKelime]; 
  const usedIndexes = new Set();

  for (let i = 0; i < 5; i++) {
    const cell = document.getElementById(`cell-${currentRow}-${i}`);
    const letter = guess[i];

    cell.textContent = letter;
    if (letter === gizliKelime[i]) {
      cell.classList.add("correct");
      kelimeHarflari[i] = null;
      usedIndexes.add(i);
    }
  }

  for (let i = 0; i < 5; i++) {
    const cell = document.getElementById(`cell-${currentRow}-${i}`);
    const letter = guess[i];

    if (!usedIndexes.has(i)) {
      if (kelimeHarflari.includes(letter)) {
        cell.classList.add("partial");
        kelimeHarflari[kelimeHarflari.indexOf(letter)] = null;
      } else {
        cell.classList.add("wrong");
      }
    }
  }

  if (guess === gizliKelime) {
    wins++;
    updateStats();
    displayMessage("Tebrikler! Kelimeyi buldunuz.");
  } else if (currentRow === 5) {
    displayMessage(`Oyun bitti! Kelime: ${gizliKelime}`);
  } else {
    currentRow++;
    document.getElementById("guessInput").value = "";
  }
}

// İstatistikleri güncelleme
function updateStats() {
  totalGames++;
  document.getElementById("totalGames").textContent = totalGames;
  document.getElementById("wins").textContent = wins;
  const winPercentage = ((wins / totalGames) * 100).toFixed(2);
  document.getElementById("winPercentage").textContent = `${winPercentage}%`;
}

// Mesaj gösterme
function displayMessage(msg) {
  document.getElementById("message").textContent = msg;
}

// Oyunu sıfırlama
function resetGame() {
  currentRow = 0;
  document.getElementById("guessInput").value = "";
  createBoard();
}

// Sayfa yüklendiğinde tahtayı oluştur
createBoard();

