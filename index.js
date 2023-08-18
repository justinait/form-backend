const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "usuarios_fullstack_db"
});

app.get("/users", (req, res)=>{

    db.query('SELECT * FROM usuarios', 
    (err, result)=>{
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    }
    );
});

app.post("/create", (req, res)=>{
    const { name, lastName, years, country, position } = req.body;

    db.query('INSERT INTO usuarios(name, lastName, years, country, position) VALUES (?,?,?,?,?)', 
    [name, lastName, years, country, position], 
    (err, result)=>{
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    }
    );
});

app.put("/update", (req, res)=>{
    const { id, name, lastName, years, country, position } = req.body;

    db.query('UPDATE usuarios SET name=?, lastName=?, years=?, country=?, position=? WHERE id=?', 
    [name, lastName, years, country, position, id], 
    (err, result)=>{
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    }
    );
});

app.delete("/delete/:id", (req, res)=>{
    const { id } = req.params;

    db.query('DELETE from usuarios WHERE id=?', [id], 
    (err, result)=>{
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    }
    );
});

app.listen(3001, ()=> {
    console.log('corriendo puerto 3001');
})