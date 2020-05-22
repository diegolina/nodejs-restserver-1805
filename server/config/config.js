/////PUERTO//////////////////////////////////////

process.env.PORT = process.env.PORT || 3000;


/////ENVIRONMENT/////////////////////////////////

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/////VTO DEL TOKEN///////////////////////////////
process.env.CADUCIDAD_TOKEN = (60 * 60 * 24 * 30);

/////SEED DE AUTENTICACION///////////////////////
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

/////BASE DE DATOS///////////////////////////////

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://diego:5wAx6zkvELtp8T31@cluster0-wqpkw.mongodb.net/cafe';
};

process.env.URLDB = urlDB;
