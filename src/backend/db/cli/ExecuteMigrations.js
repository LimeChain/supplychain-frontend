const ExecuteMigration = require('../utils/ExecuteMigration');

(async () => {
    console.log('Start ExecuteMigration');
    await ExecuteMigration.migrate();
    console.log('Finish ExecuteMigration');
})();
