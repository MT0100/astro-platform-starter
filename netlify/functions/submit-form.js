const { google } = require("googleapis");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body);
    const { name, email, message } = body;

    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!credentials || !spreadsheetId) {
        console.error("Ortam değişkenleri (Environment variables) doğru ayarlanmamış.");
        return { statusCode: 500, body: "Sunucu yapılandırma hatası." };
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Verileri "Sayfa1" adlı sayfanın sonuna ekler. 
    // Sütunlar: A=Tarih, B=Ad Soyad, C=E-posta, D=Mesaj
    const range = "Sayfa1"; 

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [[new Date().toISOString(), name, email, message]],
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Netlify fonksiyonunda hata:", error);
    return { 
        statusCode: 500, 
        body: `İç Sunucu Hatası: ${error.message}` 
    };
  }
};

