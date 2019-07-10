const {
  Client
} = require('pg') // https://node-postgres.com/


module.exports = {
  getConnection: async () => {
    const client = new Client({

      user: 'maks',
      password: '123',
      database: 'query_practice',
      port: 5432
    });

    await client.connect()
    return client;
  }
}