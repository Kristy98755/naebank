document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    const inputScreen4 = document.getElementById('inputScreen4');

    function showScreen(screenId) {
        screens.forEach(screen => screen.classList.remove('active'));
        const screenToShow = document.getElementById(screenId);
        if (screenToShow) screenToShow.classList.add('active');
    }

    // Клик по картинке — старт сканирования
    const splashImage = document.getElementById('splashImage');
    if (splashImage) {
        splashImage.addEventListener('click', () => {
            showScreen('screen1');
            startScanner();
        });
    }

    function startScanner() {
        const qrReader = new Html5Qrcode("qr-reader");
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        qrReader.start(
            { facingMode: "environment" },
            config,
            (decodedText, decodedResult) => {
                console.log("QR Code detected: ", decodedText);

                const parsedData = window.parseQRCode(decodedText);
                const screen4Output = document.getElementById('screen4Output');

                if (screen4Output) {
                    let output = `
                        <p>Услуга: ${parsedData.услуга}</p>
                        <p>Реквизит: ${parsedData.реквизит}</p>
                    `;
                    if (parsedData.получатель) {
                        output += `<p>Получатель: ${parsedData.получатель}</p>`;
                    }
                    screen4Output.innerHTML = output;
                }

                showScreen('screen2');
                qrReader.stop().catch(err => console.error("Ошибка остановки сканера:", err));
            },
            (errorMessage) => {
                console.error("Ошибка сканирования:", errorMessage);
            }
        ).catch(err => {
            console.error("Ошибка запуска сканера:", err);
            alert("Не удалось запустить сканер. Проверьте доступ к камере.");
        });
    }

    showScreen('screen0'); // по умолчанию — заставка
});
