'use strict';

require('dotenv').config();

const map = {
  'syncDB': './scenarios/sync-db',
  'syncModel': './scenarios/sync-model',
  'resetMigration': './scenarios/reset-migration-counter.js'
};

if (map[process.argv[2]]) {
  require(map[process.argv[2]])(process.argv.slice(3));
} else {
  console.log('No such script');
  process.exit(0);
}


/*
 Example:
 $ node scripts/run.js syncModel User noforce  #Model synchronization without force
 $ node scripts/run.js syncModel User          #Model synchronization with force
 $ node scripts/run.js syncDB                  #DB synchronization
 $ node scripts/run.js resetMigration          #Reset migration counter
 */