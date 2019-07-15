const Response = require("core/Response");
const Ideas = require('../../models/Ideas');
const Users = require('../../models/Users');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class AppModule {
    async getIdeas(ctx) {
        const ideas = await Ideas.findAll({
            include: [{
                model: Users,
                attributes: ['name']
            }],
            raw: true
        });
        ctx.body = ideas
    }

    async getIdeaById(ctx) {
        const ideas = await Ideas.findAll({
            include: [{
                model: Users,
                attributes: ['name']
            }],
            where: {
                id: ctx.params.id
            },
            raw: true
        });
        ctx.body = ideas
    }

    async addIdea(ctx) {
        const idea = await Ideas.create(ctx.request.body, {
            params: ['description', 'title', 'userId'],
        });
        ctx.body = idea
    }

    async deleteIdea(ctx) {
        const idea = await Ideas.destroy({
            where: {
                id: ctx.params.id
            },
            raw: true
        });
        ctx.body = idea;
    }

    async editIdea(ctx) {
        const idea = await Ideas.update(ctx.request.body, {
            params: ['title', 'description'],
            where: {
                id: ctx.params.id
            },
            raw: true,
            returning: true
        });
        ctx.body = idea[1][0];;
    }

    async login(ctx) {
        const user = await Users.findOne({
            params: ['name', 'password'],
            where: {
                name: {
                    [Op.eq]: ctx.request.body.name
                },
                password: {
                    [Op.eq]: ctx.request.body.password
                }
            },
            raw: true
        });
        if (!user) {
            ctx.session.userId = null;
            return Response.error(ctx, "You are not registered", 404);
        }
        ctx.session.userId = user.id;
        return Response.success(ctx);
    }

    async logout(ctx) {
        ctx.session.userId = null;
    }
}

module.exports = new AppModule();