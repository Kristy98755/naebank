// main.js


document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    const scanBtn = document.querySelector('button[data-screen="screen3"]');

    function showScreen(screenId) {
        screens.forEach(screen => screen.classList.remove('active'));
        const screenToShow = document.getElementById(screenId);
        if (screenToShow) screenToShow.classList.add('active');
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


                // Формируем вывод данных
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

                showScreen('screen4');
                qrReader.stop().then(() => {
                    console.log("Сканер остановлен после успешного сканирования.");
                }).catch(err => {
                    console.error("Ошибка при остановке сканера:", err);
                });
            },
            (errorMessage) => {
                console.error("Ошибка сканирования:", errorMessage);
            }
        ).catch(err => {
            console.error("Ошибка запуска сканера:", err);
            alert("Не удалось запустить сканер. Проверьте доступ к камере.");
        });
    }

    if (scanBtn) {
        scanBtn.addEventListener('click', () => {
            console.log('Запуск экрана сканера');
            showScreen('screen3');
            startScanner();
        });
    }

    showScreen('screen1');
});
