import app from './app.js';
import { config } from './utils/config.js';

app.listen(config.port, () => {
  console.log(`API lista en puerto ${config.port}`);
});
