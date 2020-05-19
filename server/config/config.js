/////PUERTO//////////////////////////////////////

process.env.PORT = process.env.PORT || 3000;


/////ENVIRONMENT/////////////////////////////////

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/////BASE DE DATOS///////////////////////////////

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://diego:5wAx6zkvELtp8T31@cluster0-wqpkw.mongodb.net/cafe';
};

process.env.URLDB = urlDB;
