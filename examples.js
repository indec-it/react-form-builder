const path = require('path');
const app = require('connect')();
const winston = require('winston');

process.env.NODE_ENV = 'development';
app.use(require('compression')());
app.use(require('serve-static')(path.join(__dirname, 'public')));

const config = require('./webpack.config');
const compiler = require('webpack')(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: '/assets/'
}));
app.use(require('webpack-hot-middleware')(compiler));

require('http').createServer(app).listen(
    3000,
    () => winston.info('Server started at port %s', '3000')
);
