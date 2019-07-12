const Router = require("koa2-router");
const Response = require("core/Response");
const AppModule = require("core/modules/AppModule");
const validator = require("koa-yup-validator");

const yup = require("yup");

const schema = yup.object().shape({
    title: yup.string()
        .min(4, 'Should be more than 4 characters')
        .max(20, 'Should be less than 20 characters')
        .required('Required'),
    description: yup.string()
        .min(20, 'Should be more than 20 characters')
        .required('Required'),
});


const sessionValidator = (ctx, next) => {
    if (ctx.session.userId) {
        next()
    } else {
        return Response.error(ctx, "Please, log in", 404);
    }
}

const router = new Router();

router.get("/Ideas", sessionValidator, async ctx => {
    return AppModule.getIdeas(ctx);
})

router.get("/Idea/:id", sessionValidator, async ctx => {
    return AppModule.getIdeaById(ctx);
});

router.post("/Idea", validator(schema), async ctx => {
    return AppModule.addIdea(ctx);
})

router.delete("/Idea/:id", async ctx => {
    return AppModule.deleteIdea(ctx);
})

router.put("/Idea/:id", validator(schema), async ctx => {
    return AppModule.editIdea(ctx);
})

router.post("/login", async ctx => {
    return AppModule.login(ctx);
})

router.post("/logout", async ctx => {
    return AppModule.logout(ctx);
})



module.exports = router;