const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello from the server!");
});

app.get("/api", (req, res) => {
    res.json({"users": ["user1", "user2", "user3","user4"]});
})

app.listen(3001, () => {console.log("server started on port 3001") })

