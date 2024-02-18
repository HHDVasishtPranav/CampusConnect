// translationService.js
import axios from 'axios';

const translateText = async (text, targetLanguage) => {
    const apiKey = '8f1301e16ef048a490b24a391b0961d1';
    const endpoint = 'https://thisisatrialerverfoi.cognitiveservices.azure.com/';
    
    const url = `${endpoint}/translate?api-version=3.0&to=${targetLanguage}`;

    const config = {
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
            'Content-Type': 'application/json',
        },
    };

    const requestBody = [{
        text,
    }];

    try {
        const response = await axios.post(url, requestBody, config);
        return response.data[0].translations[0].text;
    } catch (error) {
        console.error('Translation error:', error);
        throw error;
    }
};

export { translateText };
