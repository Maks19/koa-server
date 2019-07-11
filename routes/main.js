const Router = require("koa2-router");

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
    author: yup.string()
        .min(4, 'Should be more than 4 characters')
        .max(30, 'Should be less than 30 characters')
        .matches(/^[a-zA-Zа-яА-Я ]+$/, 'Only letters allowed')
        .required('Required'),
});

const router = new Router();

router.get("/getIdeas", async ctx => {
    return AppModule.getIdeas(ctx);
})

router.get("/getIdeas/:id", async ctx => {
    return AppModule.getIdeaById(ctx);
});

router.post("/addIdea", async ctx => {
    return AppModule.addIdea(ctx);
})

router.delete("/deleteIdea/:id", async ctx => {
    return AppModule.deleteIdea(ctx);
})

router.put("/editIdeas/:id", async ctx => {
    return AppModule.editIdea(ctx);
})

// async (ctx, next) => {
//     await schema.validate(ctx.request.body).catch(e => {
//         ctx.body = e.message
//     })
// }

router.post("/user", async ctx => {
    return AppModule.login(ctx);
})



module.exports = router;