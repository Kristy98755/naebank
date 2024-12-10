// parseQRCode.js
function parseQRCode(decodedText) {
    const result = {
        услуга: '',
        реквизит: '',
        получатель: null // null, если получатель не нужен
    };

    const parts = decodedText.split('#');
    if (parts.length < 2) return result;

    const dataPart = parts[1];
	const mbankPattern = /app/;  //
    const simbankPattern = /Simbank/;
	if (mbankPattern.test(decodedText)) {
		result.услуга = 'MBANK';
		const rekvizitMatch = dataPart.match(/996\d{9}/);
		result.реквизит = rekvizitMatch ? rekvizitMatch[0] : '';
		const receiverMatch = dataPart.match(/411\d{2}([^1]+)/);
		result.получатель = receiverMatch ? decodeURIComponent(receiverMatch[1].trim()) : '';
	} else if (simbankPattern.test(decodedText)) {
		result.услуга = dataPart.match(/Simbank-[^5]+/)?.[0]?.trim() || 'Simbank';
		const rekvizitMatch = dataPart.match(/996\d{9}/);
		result.реквизит = rekvizitMatch ? rekvizitMatch[0] : '';
		result.получатель = null; // Для Simbank получатель не нужен
	}

    return result;
}

