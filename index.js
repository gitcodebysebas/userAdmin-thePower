const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log("Servidor levantado en: http://localhost:3000");
});