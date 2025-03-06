/**
 * This script sets up compatibility options for running Angular 9 with Node.js 20
 * It should be required before Angular CLI in package.json scripts
 */

// Force the legacy OpenSSL provider for Node 17+
if (parseInt(process.versions.node.split('.')[0]) >= 17) {
  // Completely reset NODE_OPTIONS to ensure clean environment
  process.env.NODE_OPTIONS = '--openssl-legacy-provider';

  console.log('Set OpenSSL legacy provider for Node.js compatibility');

  // Pass this to child processes
  const { spawnSync } = require('child_process');
  if (process.argv[2] && process.argv[3]) {
    const command = process.argv[2];
    const args = process.argv.slice(3);
    console.log(`Running ${command} with args: ${args.join(' ')}`);
    const result = spawnSync(command, args, {
      stdio: 'inherit',
      env: { ...process.env, NODE_OPTIONS: '--openssl-legacy-provider' },
    });
    process.exit(result.status);
  }
}

// Polyfill for NodeJS buffer deprecation in newer Node versions
if (!globalThis.Buffer) {
  globalThis.Buffer = require('buffer').Buffer;
  console.log('Polyfilled global Buffer for newer Node.js versions');
}
