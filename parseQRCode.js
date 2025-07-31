function parseQRCode(decodedText) {
    decodedText = decodeURIComponent(decodedText);  //берем результат сканирования
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
}
