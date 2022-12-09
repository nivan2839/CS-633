const createApp = require('./createServer')
const PORT = process.env.PORT || 3001;

var app = createApp();
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});