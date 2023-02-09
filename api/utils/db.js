const mongoose = require('mongoose');

function connect() {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB_URI).then(console.log('database connected')).catch(err => console.error('database connection error:', err));
    
    mongoose.connection.on('disconnected', () => console.log('database disconnected'));
    mongoose.connection.on('reconnected', () => console.log('database reconnected'));

    const gracefulExit = () => {
        mongoose.connection.close(() => {
            console.log('database connection terminated');
            process.exit(0);
        });
    }
    process.on('SIGINT', gracefulExit);
    process.on('SIGTERM', gracefulExit);
}

module.exports = { connect };
