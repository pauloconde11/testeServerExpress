import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

let ultimoJsonRecebido = null; // variável global para armazenar o último JSON

app.get("/", (req, res) => {
    res.send("Hello from the server!");
});

app.get("/api", (req, res) => {
    res.json({"users": ["user1", "user2", "user3","user4"]});
})

app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("Nenhum arquivo enviado.");
    }

    const filePath = req.file.path;

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            fs.unlink(filePath, () => {});
            return res.status(500).send("Erro ao ler o arquivo");
        }

        try {
            const jsonData = JSON.parse(data);
            ultimoJsonRecebido = jsonData; // salva o JSON recebido
            console.log("JSON RECEBIDO ", jsonData);
            res.json(jsonData);
        } catch (parseErr) {
            res.status(400).send("ARQUIVO NÃO É UM JSON VÁLIDO: " + parseErr.message);
        } finally {
            fs.unlink(filePath, () => {});
        }
    });
});

app.get("/upload", (req, res) => {
    if (ultimoJsonRecebido) {
        res.json(ultimoJsonRecebido);
    } else {
        res.status(404).send("Nenhum JSON enviado ainda.");
    }
});

app.listen(3001, () => {
    console.log("server started on port 3001");
});

