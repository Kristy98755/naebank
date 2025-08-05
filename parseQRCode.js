function parseQRCode(decodedText) {
        decodedText = decodeURIComponent(decodedText.split("#")[1] || "");  //берем результат сканирования
    console.log("Декодированный текст QR: ", decodedText);  //репорт текста в консоль (для компьютнрной отладки)

    const keyword = "qr.tulpar.kg10";			//переменная, в которой хранится шаблон для определения типа платежа
    const index = decodedText.indexOf(keyword);   //находим индес (порядковый номер) буквы с которой начинается этот шаблон в строке


// Немного теории. 
// Оплата проезда содержит в своей строке qr.tulpar.kg10NNXXXx
// После qr.tulpar.kg10 идут ва символа. Они показывают длину данных которые надо дальше читать
// Это длина номера автобуса.
// Так сканер понимает, что для строки qr.tuplar.1003300486537 номер автобуса будет 300
												// ^вот тут 03 показывает что номер трехзначный



// Так сканер понимает, что для строки qr.tuplar.1004300486537 номер автобуса будет 300
												// ^вот тут 04 показывает что номер четырехзначный
												
// Таким образом, после строки qr.tulpar.kg10 должно быть 5-6 символов

    if (index !== -1 && decodedText.length >= index + keyword.length + 6) {    //смотрим есть ли 6 символов после qr.tulpar.kg10
        const segment = decodedText.substring(index + keyword.length, index + keyword.length + 6); //забираем эти символы в новую переменную
        const prefix = segment.substring(0, 2);	//берем в новую переменную первые два символа - длина номера автобуса
        let transportNumber = ""; //создаем пока пустую переменную в которую положим номер автобуса

        if (prefix === "03") {
            transportNumber = segment.substring(2, 5); // длина номера - 3 цифры
        } else if (prefix === "04") {
            transportNumber = segment.substring(2, 6); // 4 цифры
        } else {
            console.log("Неизвестный префикс: ", prefix); //если там другое значение, ничего не делаем, но выплюнем эту инфу в консоль отладки (пк)
        }

        console.log("Номер транспорта: ", transportNumber); //также рапортуем мтоги вычленения номера автобуса

        const el = document.getElementById("auto");   //прописываем код транспорта в чек
        if (el) el.textContent = transportNumber + "/" + transportNumber; //если мы его туда прописали, то дублируем его через слэш (чтоб по канону смотрелось)
		showScreen('TULPARsuccess');
	return;

    } else {
        console.log("Сигнатура qr.tulpar.kg10 не найдена или данных недостаточно."); 	//если программа наебнулась на любом из шагов, в консоль отладки поступит сообщение
    }


// банковская параша

    // Шаблоны банков
    const banks = {
        "p2p.dengi.kg": "О!Деньги",
        "qr.dcb.kg": "Simbank",
        "c2c.mbank.kg": "MBank"
    };

    function parseTLV(data, startIndex) {
        let rekvizit = "";
        let chelovek = "";
        let identifikatorTranzaksii = "";

        let index = startIndex;
        while (index < data.length) {
            let dataType = data.slice(index, index + 2);
            if (!/^\d{2}$/.test(dataType)) break;

            let dataLen = parseInt(data.slice(index + 2, index + 4));
            if (isNaN(dataLen)) break;

            let dataValue = data.slice(index + 4, index + 4 + dataLen);

            if (dataType === "11") {
                identifikatorTranzaksii = dataValue;
            } else if (dataType === "10") {
                rekvizit = dataValue;
            } else if (dataType === "34") {
                chelovek = dataValue;
            }

            index += 4 + dataLen;
        }

        return { rekvizit, chelovek, identifikatorTranzaksii };
		console.log("rekvizit:", rekvizit, "/ chelovek:", chelovek, "/ ID:", identifikatorTranzaksii)
    }

    // Определение банка и парсинг
    let codeProvider = "Undefined";
    let rekvizit = "", chelovek = "", identifikatorTranzaksii = "", domain = "";

    for (let key in banks) {
        if (decodedText.includes(key)) {
            codeProvider = banks[key];
            domain = key;
            let startIndex = decodedText.indexOf(key) + key.length;
            ({ rekvizit, chelovek, identifikatorTranzaksii } = parseTLV(decodedText, startIndex));
            break;
        }
    }

    // Вывод
    if (codeProvider === "Undefined") {
        console.log("Неизвестный формат");
		showScreen('parseError');
    } else {
        let usluga_1;
        if (codeProvider === "О!Деньги" || codeProvider === "Simbank") {
            usluga_1 = `${codeProvider} - ${chelovek}`;
        } else {
            usluga_1 = chelovek;
        }

        let rekvizit_1 = rekvizit;
        let usluga_2 = "Перевод по QR";
        let postavshik_2 = domain;
        let rekvizit_2 = chelovek;
        let comment_2 = chelovek;
        let poluchatel_2 = chelovek;
        let ID_2 = identifikatorTranzaksii;
		

		console.log("comment_2:", comment_2);
		document.querySelectorAll(".comment_2").forEach(el => el.textContent = comment_2);

		console.log("rekvizit_1:", rekvizit_1);
		document.querySelectorAll(".rekv_1").forEach(el => el.textContent = rekvizit_1);

		console.log("usluga_1:", usluga_1);
		document.querySelectorAll(".usl_1").forEach(el => el.textContent = usluga_1);

		console.log("amount: Сумма не указана");
		document.querySelectorAll(".amount").forEach(el => el.textContent = "Сумма не указана");

		console.log("amountAgain: Сумма не указана");
		document.querySelectorAll(".amountAgain").forEach(el => el.textContent = "Сумма не указана");

		console.log("postavshik_2:", postavshik_2);
		document.querySelectorAll(".postavshik_2").forEach(el => el.textContent = postavshik_2);

		console.log("rekvizit_2:", rekvizit_2);
		document.querySelectorAll(".rekvizit_2").forEach(el => el.textContent = rekvizit_2);

		console.log("poluchatel_2:", poluchatel_2);
		document.querySelectorAll(".poluchatel_2").forEach(el => el.textContent = poluchatel_2);

		console.log("ID_2:", ID_2);
		document.querySelectorAll(".ID_2").forEach(el => el.textContent = ID_2);
		
		if (codeProvider === 'О!Деньги') {
			console.log("Загружаю экран odengi")
			showScreen("odengi")
		}
		
		if (codeProvider === 'Simbank') {
			console.log("Загружаю экран simbank")
			showScreen("simbank")
		}
		
		if (codeProvider === 'MBank') {
			console.log("Загружаю экран mbank")
			showScreen("mbank")
		}
    }
}
