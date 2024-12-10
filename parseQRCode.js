function parseQRCode(decodedText) {
    // Декодирование текста из процентного формата
    decodedText = decodeURIComponent(decodedText);

    const result = {
        услуга: '',
        реквизит: '',
        получатель: null // null, если получатель не нужен
    };

    // Логирование текста QR, чтобы убедиться, что строка правильно передается
    console.log("Декодированный текст QR: ", decodedText);

    const parts = decodedText.split('#');
    if (parts.length < 2) {
        console.log("QR код не содержит ожидаемого формата данных.");
        return result;
    }

    const dataPart = parts[1];

    const mbankPattern = /mbank\.kg/i;
    const simbankPattern = /Simbank/i;

    if (mbankPattern.test(decodedText)) {
        console.log("Обнаружен mBank");
        result.услуга = 'MBANK';

        const rekvizitMatch = dataPart.match(/996\d{9}/);
        result.реквизит = rekvizitMatch ? rekvizitMatch[0] : '';
        console.log("Реквизит найден:", result.реквизит);

        // Новый процесс для извлечения получателя
        let receiverString = '';
        // Извлекаем все кириллические символы, точки и пробелы
        for (let i = 0; i < decodedText.length; i++) {
            const char = decodedText[i];
            if (/[а-яА-ЯёЁ.\s]/.test(char)) {
                receiverString += char;
            }
        }

        // Удаляем точки в начале строки
        while (receiverString.startsWith('.')) {
            receiverString = receiverString.substring(1);
        }

        // Усекаем строку ровно посередине
        const midIndex = Math.floor(receiverString.length / 2);
        receiverString = receiverString.substring(0, midIndex - 1);

        // Получатель теперь будет содержать усеченную строку
        result.получатель = receiverString.trim();
        console.log("Получатель найден:", result.получатель);
    } else if (simbankPattern.test(decodedText)) {
        console.log("Обнаружен Simbank");
        result.услуга = 'Simbank';
        const rekvizitMatch = dataPart.match(/996\d{9}/);
        result.реквизит = rekvizitMatch ? rekvizitMatch[0] : '';
        result.получатель = null; // Для Simbank получатель не нужен
    } else {
        console.log("mBank или Simbank не найдены в QR");
    }

    return result;
}
