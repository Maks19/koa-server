const Router = require("koa2-router");

const AppModule = require("core/modules/AppModule");

const Response = require("core/Response");

const Users = require("../users");

const router = new Router();

const checkout = (ctx, next) => {
    if (ctx.request.body.title.length > 4 && ctx.request.body.title.length < 20 &&
        ctx.request.body.description.length > 20 && ctx.request.body.author.length > 4 &&
        ctx.request.body.author.length < 30) {
        return next();
    }
    return Response.error(ctx, "Client Error", 404);
}

const isAuthorized = (ctx, next) => {
    for (let user in Users) {
        if (ctx.request.body.username === Users[user].username &&
            ctx.request.body.password === Users[user].password) {
            return next();
        }
    }
    return Response.error(ctx, "Client Error", 404);
}

router.get("/ideas", ctx => {
    return AppModule.getIdeas(ctx);
});

router.get("/ideas/:id", ctx => {
    return AppModule.getIdeaById(ctx);
});

router.post("/addIdeas", checkout, ctx => {
    return AppModule.addIdea(ctx);
})

router.delete("/ideas/:id", ctx => {
    return AppModule.deleteIdea(ctx);
})

router.put("/ideas/:id", checkout, ctx => {
    return AppModule.editIdea(ctx);
})

router.post("/user", isAuthorized, ctx => {
    return AppModule.login(ctx);
})

module.exports = router;