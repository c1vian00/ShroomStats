import './dotenvConfig.js'
import app from './server.js'
const PORT = process.env.SERVER_PORT
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})