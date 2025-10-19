const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '..', 'src');

function collectFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...collectFiles(full));
    } else if (/\.(ts|tsx)$/.test(e.name)) {
      files.push(full);
    }
  }
  return files;
}

function readFile(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (e) {
    return '';
  }
}

function resolveImport(fromFile, importPath) {
  if (importPath.startsWith('.')) {
    // relative
    const base = path.dirname(fromFile);
    // try with extensions
    const candidates = [
      path.resolve(base, importPath + '.tsx'),
      path.resolve(base, importPath + '.ts'),
      path.resolve(base, importPath, 'index.tsx'),
      path.resolve(base, importPath, 'index.ts'),
      path.resolve(base, importPath),
    ];
    for (const c of candidates) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) return path.normalize(c);
    }
    return null;
  } else {
    // absolute import from src (may use aliases). try resolving to src
    const absCandidates = [
      path.join(SRC, importPath + '.tsx'),
      path.join(SRC, importPath + '.ts'),
      path.join(SRC, importPath, 'index.tsx'),
      path.join(SRC, importPath, 'index.ts'),
    ];
    for (const c of absCandidates) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) return path.normalize(c);
    }
    return null;
  }
}

const allFiles = collectFiles(SRC).map(f => path.normalize(f));
const imports = new Map();
for (const f of allFiles) imports.set(f, new Set());

const importRegex = /import\s+(?:[^'\"]+from\s+)?['\"]([^'\"]+)['\"]/g;
for (const f of allFiles) {
  const content = readFile(f);
  let m;
  while ((m = importRegex.exec(content)) !== null) {
    const importPath = m[1];
    const resolved = resolveImport(f, importPath);
    if (resolved && imports.has(resolved)) {
      imports.get(resolved).add(f);
    }
  }
}

// treat entry points as roots so they don't count as unused
const roots = [
  path.normalize(path.join(SRC, 'main.tsx')),
  path.normalize(path.join(SRC, 'App.tsx')),
  path.normalize(path.join(SRC, 'index.tsx')),
];

// Mark files reachable from roots
const reachable = new Set();
function dfs(file) {
  if (reachable.has(file)) return;
  reachable.add(file);
  // find files that this file imports
  const content = readFile(file);
  let m;
  while ((m = importRegex.exec(content)) !== null) {
    const importPath = m[1];
    const resolved = resolveImport(file, importPath);
    if (resolved && allFiles.includes(resolved)) dfs(resolved);
  }
}
for (const r of roots) {
  if (fs.existsSync(r)) dfs(r);
}

// Files that are not reachable and not tests
const unused = allFiles.filter(f => !reachable.has(f) && !/\.d\.ts$/.test(f));

console.log('Scanned', allFiles.length, 'files');
console.log('Reachable files from roots:', reachable.size);
console.log('\nCandidate unused files:');
for (const u of unused) {
  console.log('-', path.relative(process.cwd(), u));
}

// write to file for convenience
fs.writeFileSync(path.join(__dirname, 'unused-report.txt'), unused.map(u => path.relative(process.cwd(), u)).join('\n'));
console.log('\nReport written to scripts/unused-report.txt');
