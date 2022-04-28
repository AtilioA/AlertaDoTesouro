import 'reflect-metadata';
import App from './app';

import './database';
import './tasks';

App.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}!`);
});
