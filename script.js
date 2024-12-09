document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    const navButtons = document.querySelectorAll('#bottom-nav button:not([data-screen="screen0"]):not([data-screen="screen00"])');
    const historyBtn = document.getElementById('historyBtn');
    const scanBtn = document.querySelector('button[data-screen="screen3"]'); // Поиск кнопки по атрибуту data-screen
    const goToScreen5Btn = document.getElementById('goToScreen5');
    const goToScreen6Btn = document.getElementById('goToScreen6');
    const goToScreen7Btn = document.getElementById('goToScreen7');
    const goToScreen8Btn = document.getElementById('goToScreen8');
    const goToScreen9Btn = document.getElementById('goToScreen9');
    const goToScreen1From6Btn = document.getElementById('goToScreen1From6');
    
    // Получаем поля ввода с экрана 1
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const input3 = document.getElementById('input3');

    // Получаем поле ввода с экрана 4
    const inputScreen4 = document.getElementById('inputScreen4');

    // Функция для показа экрана
    function showScreen(screenId) {
        console.log(`Показываем экран: ${screenId}`);
        
        // Убираем класс active со всех экранов
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Находим нужный экран по ID и добавляем ему класс active
        const screenToShow = document.getElementById(screenId);
        if (screenToShow) {
            screenToShow.classList.add('active');
            console.log(`Экран ${screenId} активирован.`);
        }
    }

    // Обработчик кнопок навигации
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const screenId = button.getAttribute('data-screen');
            console.log(`Кнопка нажата: ${screenId}`);
            showScreen(screenId);
        });
    });

    // Обработчик кнопки "История сканирования"
    historyBtn.addEventListener('click', () => {
        console.log('Переход к истории сканирования');
        showScreen('screen10');
    });

    // Обработчик кнопки "Запуск сканера"
    if (scanBtn) {
        scanBtn.addEventListener('click', () => {
            console.log('Запуск сканера');
            showScreen('screen3'); // Переход на экран 3 для сканирования
        });
    } else {
        console.error('Кнопка для запуска сканера не найдена!');
    }

    // Обработчик кнопки перехода на экран 5
    goToScreen5Btn.addEventListener('click', () => {
        console.log('Переход на экран 5');
        
        // Переносим значения с экрана 1 на экран 5
        document.getElementById('field1Value').textContent = input1.value;
        document.getElementById('field2Value').textContent = input2.value;
        document.getElementById('field3Value').textContent = input3.value;
        
        // Добавляем значение из поля ввода с экрана 4 на экран 5
        document.getElementById('field4Value').textContent = inputScreen4.value;
        
        showScreen('screen5');
    });

    // Обработчик кнопки перехода на экран 6
    goToScreen6Btn.addEventListener('click', () => {
        console.log('Переход на экран 6');
        
        // Добавляем значение из поля ввода с экрана 4 на экран 6
        document.getElementById('fieldScreen4').textContent = inputScreen4.value;
        
        showScreen('screen6');
    });

    // Обработчик кнопки перехода на экран 7
    goToScreen7Btn.addEventListener('click', () => {
        console.log('Переход на экран 7');
        
        // Переносим данные с экрана 1, экрана 4 на экран 7
        document.getElementById('field1Value7').textContent = input1.value;
        document.getElementById('field2Value7').textContent = input2.value;
        document.getElementById('field3Value7').textContent = input3.value;
        document.getElementById('fieldScreen4Value7').textContent = inputScreen4.value;
        
        showScreen('screen7');
    });

    // Обработчик кнопки перехода на экран 8
    goToScreen8Btn.addEventListener('click', () => {
        console.log('Переход на экран 8');
        
        // Переносим данные с экрана 1, экрана 4 на экран 8
        document.getElementById('field1Value8').textContent = input1.value;
        document.getElementById('field2Value8').textContent = input2.value;
        document.getElementById('field3Value8').textContent = input3.value;
        document.getElementById('fieldScreen4Value8').textContent = inputScreen4.value;
        
        showScreen('screen8');
    });

    // Обработчик кнопки для возврата на главный экран с экрана 6
    goToScreen1From6Btn.addEventListener('click', () => {
        console.log('Переход на главный экран');
        showScreen('screen1');
    });

    // Установка начального экрана
    showScreen('screen1');

    // Отладочный вывод
    console.log("Скрипт инициализирован.");
    console.log(`Найдено экранов: ${screens.length}`);
    console.log(`Найдено кнопок навигации: ${navButtons.length}`);

    // Функция для инициализации сканера
    // Функция для инициализации сканера
	function startScanner() {
		const qrReader = new Html5Qrcode("qr-reader");

		const config = {
			fps: 10,  // Частота кадров
			qrbox: { width: 250, height: 250 }  // Размер квадрата для сканирования
		};

		qrReader.start(
			{ facingMode: "environment" },  // Камера устройства
			config,
			(decodedText, decodedResult) => {
				console.log("QR Code detected: ", decodedText);
				showScreen('screen4');  // Переход на экран 4 после сканирования
			},
			(errorMessage) => {
				console.error("Ошибка сканирования:", errorMessage);  // Обработка ошибок
			}
		).catch(err => {
			console.error("Ошибка запуска сканера:", err);
			alert("Не удалось запустить сканер. Проверьте доступ к камере.");
		});
	}

	// Инициализация экрана 3
	if (scanBtn) {
		scanBtn.addEventListener('click', () => {
			console.log('Запуск экрана сканера');
			showScreen('screen3');
			startScanner(); // Запуск сканера при открытии экрана 3
		});
	}

});
