import { createConnection, getConnection } from 'typeorm';
import 'dotenv/config';

const DB = {
  async connect(name = 'default') {
    await createConnection(name);
  },

  async close(connectionName?: string) {
    await getConnection(connectionName).close();
  },

  clear(connectionName?: string) {
    const connection = getConnection(connectionName);
    const entities = connection.entityMetadatas;

    entities.forEach(async entity => {
      const repository = connection.getRepository(entity.name);
      await repository.clear();
    });
  },

  async drop(connectionName?: string) {
    await getConnection(connectionName).dropDatabase();
  },
};

DB.connect().catch(err => {
  console.error('❌ Error connecting to DB!');
  console.error(err);
  throw err;
});

export default DB;
