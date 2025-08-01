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

    } else {
        console.log("Сигнатура qr.tulpar.kg10 не найдена или данных недостаточно."); 	//если программа наебнулась на любом из шагов, в консоль отладки поступит сообщение
    }

    
    // ==== Дополнительный парсинг EMVCo QR (O!Деньги, Simbank, Mbank) ====
    (function() {
        const emvFields = {};
        let p = 0;
        while (p < decodedText.length - 4) {
            const t = decodedText.slice(p, p + 2);
            const l = parseInt(decodedText.slice(p + 2, p + 4), 10);
            const v = decodedText.slice(p + 4, p + 4 + l);
            emvFields[t] = v;
            p += 4 + l;
        }

        const emvResult = {
            реквизит: null,
            услуга: "перевод по QR",
            поставщик: null,
            получатель: null,
            комментарий: null,
            сумма: null
        };

        const merchantTags = Object.keys(emvFields).filter(t => +t >= 26 && +t <= 51);
        for (const t of merchantTags) {
            const sub = {};
            let q = 0;
            const val = emvFields[t];
            while (q < val.length - 4) {
                const st = val.slice(q, q + 2);
                const sl = parseInt(val.slice(q + 2, q + 4), 10);
                const sv = val.slice(q + 4, q + 4 + sl);
                sub[st] = sv;
                q += 4 + sl;
            }
            if (sub["00"]) emvResult.поставщик = sub["00"];
            if (sub["11"]) emvResult.реквизит = sub["11"];
            if (sub["12"]) emvResult.получатель = sub["12"];
            if (sub["26"]) emvResult.комментарий = sub["26"];
        }

        if (emvFields["59"] && !emvResult.получатель) emvResult.получатель = emvFields["59"];
        if (emvFields["40"] && !emvResult.получатель) emvResult.получатель = emvFields["40"];
        if (emvFields["54"]) emvResult.сумма = parseFloat(emvFields["54"]) / 100;
        if (!emvResult.комментарий) emvResult.комментарий = emvResult.получатель;

        console.log("Парсинг EMVCo QR:", emvResult);
    })();

}
