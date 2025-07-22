function parseQRCode(decodedText) {
    decodedText = decodeURIComponent(decodedText);

    const result = {
        услуга: 'Tulpar',
        реквизит: '',
        получатель: ''
    };

    console.log("Декодированный текст QR: ", decodedText);

    const keyword = "qr.tulpar.kg10";
    const index = decodedText.indexOf(keyword);

    if (index !== -1 && decodedText.length >= index + keyword.length + 6) {
        const segment = decodedText.substring(index + keyword.length, index + keyword.length + 6);
        const prefix = segment.substring(0, 2);

        if (prefix === "03") {
            result.реквизит = segment.substring(2, 5); // 3 цифры
        } else if (prefix === "04") {
            result.реквизит = segment.substring(2, 6); // 4 цифры
        } else {
            console.log("Неизвестный префикс: ", prefix);
        }

        console.log("Номер транспорта: ", result.реквизит);
    } else {
        console.log("Сигнатура qr.tulpar.kg10 не найдена или данных недостаточно.");
    }

    return result;
}
