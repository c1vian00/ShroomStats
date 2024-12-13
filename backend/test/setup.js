import app from '../server.js'

const PORT = 3002

const server = app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
});

after(function (done) {
    server.close(() => {
        console.log('Test server stopped');
        done();
    });
});

export default server