const Koa = require('koa');
const app = new Koa();
const data = require('../data.json')

app.use(ctx => {
    const url = ctx.req.url;
    if (url === '/api/goods') {
        ctx.body = {
            errno: 0,
            data: data.goods,
        };
    }
    if (url === '/api/seller') {
        ctx.body = {
            errno: 0,
            data: data.seller,
        };
    }
    if (url === '/api/ratings') {
        ctx.body = {
            errno: 0,
            data: data.ratings,
        };
    }

});

app.listen(3000);
