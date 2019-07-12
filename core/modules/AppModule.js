const Response = require("core/Response");
const Ideas = require('models/Ideas')

class AppModule {
    async getIdeas(ctx) {
        const ideas = await Ideas.findAll({});
        ctx.body = ideas
    }

    async getIdeaById(ctx) {
        const ideas = await Ideas.findAll({
            where: {
                id: ctx.params.id
            }
        });
        ctx.body = ideas
    }

    async addIdea(ctx) {
        const idea = await Ideas.create(ctx.body, {
            params: ['description', 'title']
        });
        ctx.body = idea
    }

    async deleteIdea(ctx) {
        const idea = await Ideas.destroy({
            where: {
                id: ctx.params.id
            }
        });
        ctx.body = idea;
    }

    async editIdea(ctx) {
        const idea = await Ideas.update(ctx.request.body, {
            params: ['name', 'population'],
            where: {
                id: ctx.params.id
            }
        });
        console.log(idea);
        ctx.body = idea;
    }

    async login(ctx) {
        return Response.success(ctx);
    }
}

module.exports = new AppModule();