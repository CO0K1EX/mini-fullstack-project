const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.use('/api', require('./server/routes'));

app.listen(PORT, () => {
    console.log(`🚀 Local:   http://localhost:${PORT}`);
    console.log(`🌐 Network: http://127.0.0.1:${PORT}`);
});