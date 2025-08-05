document.addEventListener("DOMContentLoaded", initPage); //ждет пока загрузится страница

function initPage() { //функция которая сама ничего не делает но запускает все функции

// здесь перечислены остальные функции, список можно в любой момент пополнять
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
  document.querySelectorAll('.billnum').forEach(el => el.textContent = str); //подставим везде где class="billnum"
}

// Генерация текущей даты и времени в формате "дд.мм.гггг, чч:мм"
function updateDateTime() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const dateText = `${day}.${month}.${year}, ${hours}:${minutes}`;
  document.querySelectorAll('.datetime').forEach(el => el.textContent = dateText);
}

// Генерация номера квитанции: "P" + 13 случайных цифр
function generateReceiptNumber() {
  let str = "P07";
  for (let i = 0; i < 11; i++) {
    str += Math.floor(Math.random() * 10);
  }
  document.querySelectorAll('.receipt').forEach(el => el.textContent = str);
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
  document.querySelectorAll('.hexid').forEach(el => el.textContent = hexString);
}
