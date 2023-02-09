const express = require('express');

const adminRouter = require('./api/routes/admin');

require('./api/utils/db').connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

app.use('/admin', adminRouter);

app.listen(process.env.PORT, () => {
    console.log(`server running on PORT:${process.env.PORT}`);
});
