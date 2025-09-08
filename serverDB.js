const fs = require('fs');
const { register } = require('module');
const mysql = require('mysql2');
const conf = JSON.parse(fs.readFileSync("./conf.json"));
/*conf.ssl = {
    ca: fs.readFileSync(__dirname + '/ca.pem')
}
const connection = mysql.createConnection(conf);*/



const executeQuery = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.error(err);
                reject(err);
            }
            console.log('done');
            resolve(result);
        });
    });
};
const serverDB = {
    createTable: function () {
        return executeQuery(`
        CREATE TABLE IF NOT EXISTS AutoDettagli (
                id_auto INT PRIMARY KEY AUTO_INCREMENT,
                immagini VARCHAR(255),
                titolo VARCHAR(255) NOT NULL,
                descrizione TEXT,
                prezzo DECIMAL(10, 2) NOT NULL,
                marce INT,
                potenza VARCHAR(50),
                km INT,
                luogoVendita VARCHAR(255),
                carburante VARCHAR(50),
                Rapporto_Tara_Potenza VARCHAR(50),
                marca VARCHAR(255),
                modello VARCHAR(255),
                contatto VARCHAR(255),
                abstract TEXT
        );
        `);
    },
    getTitle:function(){
        console.info(conf);
      return conf.titleComponent;
    },
    getInfo:function(){
        console.info(conf);
      return conf.infoComponent;
    },
    getCarusel:function(){
        console.info(conf);
      return conf.caruselComponent;
    },
     getNavbar:function(){
        console.info(conf);
      return conf.navbarComponent;
    },
    getNews:function(){
        console.info(conf);
      return conf.newsComponent;
    },
    login: function (username) {
        return executeQuery(`SELECT * FROM credenziali WHERE nome = '${username}'`);
    },
    register: function (username, email ,password) {
        return executeQuery(`INSERT INTO credenziali (nome, email, password) VALUES ('${username}', '${email}', '${password}')`);
    },
    
    
    insert: function (titolo, descrizione, prezzo, marce, potenza, km, luogoVendita, carburante, Rapporto_Tara_Potenza, marca, modello, contatto, abstract,img) {
        return executeQuery(`INSERT INTO AutoDettagli (immagini,titolo, descrizione, prezzo, marce, potenza, km, luogoVendita, carburante, Rapporto_Tara_Potenza, marca, modello,contatto,abstract) VALUES ('${img}','${titolo}', '${descrizione}', ${prezzo}, ${marce}, '${potenza}', ${km}, '${luogoVendita}', '${carburante}', '${Rapporto_Tara_Potenza}', '${marca}', '${modello}','${contatto}','${abstract}')`);
    },
    getall:function(){
        return executeQuery("SELECT * from AutoDettagli");

    },
    getForUser:function(user){
        return executeQuery("SELECT * FROM AutoDettagli WHERE contatto='"+user+"'");
    },
    getMarca:function(){
     return executeQuery("SELECT Nome FROM Marche");
    },
    getModello:function(marca){
     return executeQuery("SELECT nome_Modello FROM Modelli JOIN Marche ON Marche.Id_marca=Modelli.nome_marca WHERE Nome='"+marca+"'");
    },
    delete(id){
        return executeQuery("DELETE FROM AutoDettagli WHERE id_auto="+id);
    },

    getProvince:function(){
        return executeQuery("SELECT Provincia FROM province");
    }
    
};

module.exports = serverDB;