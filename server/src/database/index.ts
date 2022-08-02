import { createConnection, getConnection } from 'typeorm';
import 'dotenv/config';

const DB = {
  async connect(name = 'default') {
    await createConnection(name);
  },

  async close(connectionName?: string) {
    await getConnection(connectionName).close();
  },

  async clear(connectionName?: string) {
    const connection = getConnection(connectionName);
    const entities = connection.entityMetadatas;

    const promises = entities.map(entity => {
      const repository = connection.getRepository(entity.name);
      return repository.clear();
    });
    await Promise.all(promises);
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
