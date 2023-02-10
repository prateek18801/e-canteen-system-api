const express = require('express');

const userRouter = require('./api/routes/user');
const authRouter = require('./api/routes/auth');
const adminRouter = require('./api/routes/admin');

require('./api/utils/db').connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', userRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

app.listen(process.env.PORT, () => {
    console.log(`server running on PORT:${process.env.PORT}`);
});
