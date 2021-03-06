// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3010;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Entorno
// ============================
process.env.baseURL = 'http://garbarino-mock-api.s3-website-us-east-1.amazonaws.com';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;