document.addEventListener("DOMContentLoaded", initPage);

function initPage() {
  generateBillNumber();
  updateDateTime();
  generateReceiptNumber();
  generateHexId();
}

// Генерация номера счёта: "103" + 13 случайных цифр
function generateBillNumber() {
  let str = "103";
  for (let i = 0; i < 13; i++) {
    str += Math.floor(Math.random() * 10);
  }
  const el = document.getElementById("billnum");
  if (el) el.textContent = str;
}

// Генерация текущей даты и времени в формате "дд.мм.гггг, чч:мм"
function updateDateTime() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const el = document.getElementById("datetime");
  if (el) el.textContent = `${day}.${month}.${year}, ${hours}:${minutes}`;
}

// Генерация номера квитанции: "P" + 13 случайных цифр
function generateReceiptNumber() {
  let str = "P07";
  for (let i = 0; i < 11; i++) {
    str += Math.floor(Math.random() * 10);
  }
  const el = document.getElementById("receipt");
  if (el) el.textContent = str;
}

// Генерация шестнадцатеричной строки: 8-4-4-4-12
function generateHexId() {
  const min = 0x020000aa;
  const max = 0x025fffff;
  const first = Math.floor(Math.random() * (max - min + 1)) + min;
  const firstHex = first.toString(16).padStart(8, '0');

  function randomHex(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 16).toString(16);
    }
    return result;
  }

  const hexString = `${firstHex}-${randomHex(4)}-${randomHex(4)}-${randomHex(4)}-${randomHex(12)}`;
  const el = document.getElementById("hexid");
  if (el) el.textContent = hexString;
}
