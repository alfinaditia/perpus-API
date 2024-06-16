// server.js
const app = require('./app');
const { createTables } = require('./utils/init-db');
const port = process.env.PORT || 3000;

createTables()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to create tables:', error);
    process.exit(1); // Exit the process if tables creation fails
  });
