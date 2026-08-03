const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, '..', '.next');
const maxRetries = 8;
const retryDelay = 200; // ms

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function removeNext() {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (!fs.existsSync(target)) {
        console.log('.next does not exist, nothing to remove.');
        return 0;
      }
      // Node 14+ has fs.rmSync with recursive option in newer Node; use rmSync when available
      if (fs.rmSync) {
        fs.rmSync(target, { recursive: true, force: true });
      } else {
        // fallback for older Node: use rmdirSync
        const rimraf = (p) => {
          if (!fs.existsSync(p)) return;
          for (const entry of fs.readdirSync(p)) {
            const cur = path.join(p, entry);
            if (fs.lstatSync(cur).isDirectory()) rimraf(cur);
            else fs.unlinkSync(cur);
          }
          fs.rmdirSync(p);
        };
        rimraf(target);
      }
      console.log('Removed .next');
      return 0;
    } catch (err) {
      console.warn(`Attempt ${attempt} to remove .next failed: ${err.code || err.message}`);
      if (attempt === maxRetries) {
        console.error('Failed to remove .next after multiple attempts.');
        console.error('Common causes: antivirus or other process locking files, OneDrive syncing, or insufficient permissions.');
        process.exitCode = 1;
        return 1;
      }
      await sleep(retryDelay);
    }
  }
}

removeNext();
