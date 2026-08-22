import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function deleteNodeModules(dirPath) {
  const nodeModulesPath = path.join(dirPath, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    console.log(`Deleting: ${nodeModulesPath}`);
    try {
      fs.rmSync(nodeModulesPath, { recursive: true, force: true });
      console.log(`Successfully deleted: ${nodeModulesPath}`);
    } catch (err) {
      console.error(`Failed to delete ${nodeModulesPath}:`, err.message);
    }
  }
}

// 1. Delete node_modules in apps/* and packages/*
const subDirs = ['apps', 'packages'];
subDirs.forEach((subDir) => {
  const fullSubDir = path.join(rootDir, subDir);
  if (fs.existsSync(fullSubDir)) {
    const items = fs.readdirSync(fullSubDir);
    items.forEach((item) => {
      const itemPath = path.join(fullSubDir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        deleteNodeModules(itemPath);
      }
    });
  }
});

// 2. Delete root node_modules
deleteNodeModules(rootDir);

console.log('Cleanup finished.');
