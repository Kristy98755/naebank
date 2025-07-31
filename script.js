document.addEventListener('DOMContentLoaded', () => {	//ждем пока загрузится вся страница
    const screens = document.querySelectorAll('.screen');	//создаем массив, в который помещаем все элементы с тегом screen из html-файла

    function showScreen(screenId) {
        screens.forEach(screen => screen.classList.remove('active'));   //все экраны прячем
        const screenToShow = document.getElementById(screenId);			//смотрим какой экран сейчас показан
        if (screenToShow) screenToShow.classList.add('active');			//его не прячем
    }

    // Клик по зеленой картинке — старт сканирования
    const splashImage = document.getElementById('splashImage');
    if (splashImage) {
        splashImage.addEventListener('click', () => {
            showScreen('screen1');
            startScanner();
        });
    }

    function startScanner() {	//насторйки сканирования
        const qrReader = new Html5Qrcode("qr-reader");	//локально обзываем функцию из библиотеки чтоб было проще
        const config = { fps: 2, qrbox: { width: 250, height: 250 } }; //сканируем два кадра в секунду; квадратик для сканирования 250 на 250 пихелей

        qrReader.start(
            { facingMode: "environment" },	//камера чтоб основна врубилась
            config,
            (decodedText) => {
                console.log("QR Code detected: ", decodedText);	//выхлоп в консоль отладки что мы распознали код

                const parsedData = window.parseQRCode(decodedText);	//сохраняем резултат сканирования чтобы работать с ним в дальнейшем
              
                showScreen('screen2');	//переходим к показу чека
                qrReader.stop().catch(err => console.error("Ошибка остановки сканера:", err)); //вырубаем сканер и если не получилось то пищим в консоль
            },
            (errorMessage) => {
                console.error("Ошибка сканирования:", errorMessage); //если сканер испугался то он сам нам рапортует об ошибке, а мы ее направляем в консоль
            }
        ).catch(err => {
            console.error("Ошибка запуска сканера:", err);
            alert("Не удалось запустить сканер. Проверьте доступ к камере.");
        });
    }

    showScreen('screen0'); // по умолчанию — заставка (самый старт страницы)
});
