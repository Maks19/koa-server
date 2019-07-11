const Response = require("core/Response");

class AppModule {
    async getIdeas(ctx) {
        const result = await ctx.db.query(`select * from ideas`);
        ctx.body = result.rows;
    }

    async getIdeaById(ctx) {
        const id = ctx.params.id;
        const result = await ctx.db.query(`select * from ideas where id = $1`, [id]);
        ctx.body = result.rows;
    }

    async addIdea(ctx) {
        const {
            title,
            description,
            author
        } = ctx.request.body
        const result = await ctx.db.query('insert into ideas (title, description, author) values ($1, $2, $3) RETURNING *', [title, description, author])
        ctx.body = result.rows[0];
    }

    async deleteIdea(ctx) {
        const id = ctx.params.id;
        const result = await ctx.db.query(`delete from ideas where id = $1`, [id]);
        ctx.body = result.rows;
    }

    async editIdea(ctx) {
        const id = ctx.params.id;
        const {
            title,
            description,
            author
        } = ctx.request.body;
        const result = await ctx.db.query(`update ideas set title = $1, description = $2, author = $3 where id = $4`,
            [title, description, author, id]);
        ctx.body = result.rows[0];
    }

    async login(ctx) {
        return Response.success(ctx);
    }
}

module.exports = new AppModule();