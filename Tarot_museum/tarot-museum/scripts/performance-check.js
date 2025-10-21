#!/usr/bin/env node

/**
 * Performance Budget Checker
 *
 * Validates that build output meets performance targets:
 * - Bundle size limits
 * - Chunk size limits
 * - Asset compression
 * - Critical path optimization
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { gzipSync, brotliCompressSync } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Performance budgets (in KB)
const BUDGETS = {
  mainBundle: 150,        // Main JS bundle (gzipped)
  totalJS: 250,           // Total JS (gzipped)
  totalCSS: 50,           // Total CSS (gzipped)
  chunkSize: 200,         // Max single chunk (gzipped)
  image: 200,             // Max single image
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function getGzipSize(filePath) {
  const content = fs.readFileSync(filePath);
  const compressed = gzipSync(content, { level: 9 });
  return compressed.length;
}

function getBrotliSize(filePath) {
  const content = fs.readFileSync(filePath);
  const compressed = brotliCompressSync(content);
  return compressed.length;
}

function formatSize(bytes) {
  return (bytes / 1024).toFixed(2) + ' KB';
}

function analyzeAssets(distPath) {
  const results = {
    js: [],
    css: [],
    images: [],
    other: [],
  };

  function walk(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walk(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();
        const size = getFileSize(filePath);
        const gzipSize = getGzipSize(filePath);
        const brotliSize = getBrotliSize(filePath);

        const asset = {
          name: path.relative(distPath, filePath),
          size,
          gzipSize,
          brotliSize,
          compression: ((1 - gzipSize / size) * 100).toFixed(1),
        };

        if (ext === '.js') {
          results.js.push(asset);
        } else if (ext === '.css') {
          results.css.push(asset);
        } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'].includes(ext)) {
          results.images.push(asset);
        } else {
          results.other.push(asset);
        }
      }
    });
  }

  walk(distPath);
  return results;
}

function checkBudgets(assets) {
  log('\n📊 Performance Budget Check\n', 'cyan');

  let passed = true;

  // Check main bundle
  const mainBundle = assets.js.find((a) => a.name.includes('index'));
  if (mainBundle) {
    const mainSize = mainBundle.gzipSize / 1024;
    const mainPassed = mainSize <= BUDGETS.mainBundle;
    passed = passed && mainPassed;

    log(`Main Bundle: ${formatSize(mainBundle.gzipSize)} / ${BUDGETS.mainBundle} KB`,
        mainPassed ? 'green' : 'red');
  }

  // Check total JS
  const totalJS = assets.js.reduce((sum, a) => sum + a.gzipSize, 0);
  const jsPassed = totalJS / 1024 <= BUDGETS.totalJS;
  passed = passed && jsPassed;
  log(`Total JS: ${formatSize(totalJS)} / ${BUDGETS.totalJS} KB`,
      jsPassed ? 'green' : 'red');

  // Check total CSS
  const totalCSS = assets.css.reduce((sum, a) => sum + a.gzipSize, 0);
  const cssPassed = totalCSS / 1024 <= BUDGETS.totalCSS;
  passed = passed && cssPassed;
  log(`Total CSS: ${formatSize(totalCSS)} / ${BUDGETS.totalCSS} KB`,
      cssPassed ? 'green' : 'red');

  // Check individual chunks
  const oversizedChunks = assets.js.filter((a) => a.gzipSize / 1024 > BUDGETS.chunkSize);
  if (oversizedChunks.length > 0) {
    passed = false;
    log(`\n⚠️  Oversized chunks (> ${BUDGETS.chunkSize} KB):`, 'yellow');
    oversizedChunks.forEach((chunk) => {
      log(`  - ${chunk.name}: ${formatSize(chunk.gzipSize)}`, 'red');
    });
  }

  // Check images
  const oversizedImages = assets.images.filter((img) => img.size / 1024 > BUDGETS.image);
  if (oversizedImages.length > 0) {
    log(`\n⚠️  Large images (> ${BUDGETS.image} KB):`, 'yellow');
    oversizedImages.forEach((img) => {
      log(`  - ${img.name}: ${formatSize(img.size)}`, 'yellow');
    });
  }

  return passed;
}

function printReport(assets) {
  log('\n📦 Build Analysis\n', 'magenta');

  // JavaScript
  log('JavaScript Files:', 'cyan');
  assets.js
    .sort((a, b) => b.gzipSize - a.gzipSize)
    .forEach((asset) => {
      log(`  ${asset.name}`, 'blue');
      log(`    Original: ${formatSize(asset.size)}`);
      log(`    Gzip: ${formatSize(asset.gzipSize)} (${asset.compression}% reduction)`);
      log(`    Brotli: ${formatSize(asset.brotliSize)}`);
    });

  // CSS
  if (assets.css.length > 0) {
    log('\nCSS Files:', 'cyan');
    assets.css.forEach((asset) => {
      log(`  ${asset.name}`, 'blue');
      log(`    Original: ${formatSize(asset.size)}`);
      log(`    Gzip: ${formatSize(asset.gzipSize)} (${asset.compression}% reduction)`);
    });
  }

  // Images
  if (assets.images.length > 0) {
    log('\nImage Files:', 'cyan');
    assets.images
      .sort((a, b) => b.size - a.size)
      .slice(0, 10) // Show top 10
      .forEach((asset) => {
        log(`  ${asset.name}: ${formatSize(asset.size)}`);
      });

    if (assets.images.length > 10) {
      log(`  ... and ${assets.images.length - 10} more images`);
    }
  }

  // Summary
  const totalSize = [...assets.js, ...assets.css].reduce((sum, a) => sum + a.size, 0);
  const totalGzip = [...assets.js, ...assets.css].reduce((sum, a) => sum + a.gzipSize, 0);
  const totalBrotli = [...assets.js, ...assets.css].reduce((sum, a) => sum + a.brotliSize, 0);

  log('\n📈 Summary\n', 'magenta');
  log(`Total Size: ${formatSize(totalSize)}`);
  log(`Gzipped: ${formatSize(totalGzip)}`, 'green');
  log(`Brotli: ${formatSize(totalBrotli)}`, 'green');
  log(`Compression: ${((1 - totalGzip / totalSize) * 100).toFixed(1)}%`);
}

function main() {
  const distPath = path.resolve(__dirname, '../dist');

  if (!fs.existsSync(distPath)) {
    log('❌ Error: dist folder not found. Run `npm run build` first.', 'red');
    process.exit(1);
  }

  log('🔍 Analyzing build output...\n', 'cyan');

  const assets = analyzeAssets(distPath);
  printReport(assets);
  const passed = checkBudgets(assets);

  if (passed) {
    log('\n✅ All performance budgets passed!', 'green');
    process.exit(0);
  } else {
    log('\n❌ Performance budget exceeded!', 'red');
    log('Consider:', 'yellow');
    log('  - Lazy loading heavy components', 'yellow');
    log('  - Code splitting large libraries', 'yellow');
    log('  - Tree shaking unused code', 'yellow');
    log('  - Optimizing images', 'yellow');
    process.exit(1);
  }
}

main();
