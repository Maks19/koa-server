const Response = require("core/Response");
const Ideas = require("../../configApp");
const Users = require("../../users");

class AppModule {
    async getIdeas(ctx) {
        const valueOfIdeas = Object.values(Ideas);
        return Response.json(ctx, valueOfIdeas);
    }

    async getIdeaById(ctx) {
        if (Ideas[`${ctx.params.id}`]) {
            let valueOfIdeas = Object.values(Ideas);
            const currId = valueOfIdeas.filter(item => {
                return item.id === ctx.params.id
            })
            return Response.json(ctx, currId);
        }
        return Response.error(ctx);
    }

    async addIdea(ctx) {
        Ideas[`${ctx.request.body.id}`] = ctx.request.body;
        return Response.json(ctx, Ideas);
    }

    async deleteIdea(ctx) {
        if (Ideas[`${ctx.params.id}`]) {
            let valueOfIdeas = Object.values(Ideas);
            const currId = valueOfIdeas.filter(item => {
                return item.id !== ctx.params.id
            })
            valueOfIdeas = [...currId];
            return Response.json(ctx, valueOfIdeas);
        }
        return Response.error(ctx);
    }

    async editIdea(ctx) {
        if (Ideas[`${ctx.params.id}`]) {
            let valueOfIdeas = Object.values(Ideas);
            for (let i = 0; i < valueOfIdeas.length; i++) {
                if (ctx.params.id === valueOfIdeas[i].id) {
                    Ideas[`${ctx.params.id}`] = ctx.request.body
                    return Response.json(ctx, Ideas);
                }
            }
        }
        return Response.error(ctx);
    }

    async login(ctx) {
        return Response.success(ctx);
    }
}

module.exports = new AppModule();