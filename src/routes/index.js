module.exports.setupRoutes = (app) =>{
    app.get('/api/v1/pm', (req, res, next) =>{
        res.status(200)
            .json({'duc': 'dep trai 123'});
    });
}