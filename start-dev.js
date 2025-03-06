#!/usr/bin/env node

/**
 * A simple start script for development that handles Node.js 20 compatibility
 */

// Set OpenSSL legacy provider for Node.js 17+
if (parseInt(process.versions.node.split('.')[0]) >= 17) {
  process.env.NODE_OPTIONS = '--openssl-legacy-provider';
}

// Execute the Angular CLI serve command with the correct environment
const { spawn } = require('child_process');
console.log('Starting Angular development server...');
const ngServe = spawn('./node_modules/.bin/ng', ['serve', '--verbose', '--port=4200', '--host=0.0.0.0', '--disable-host-check'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_OPTIONS: '--openssl-legacy-provider',
  },
});

// Forward termination signals
process.on('SIGINT', () => {
  ngServe.kill('SIGINT');
});

process.on('SIGTERM', () => {
  ngServe.kill('SIGTERM');
});

// Handle process exit
ngServe.on('exit', (code) => {
  process.exit(code);
});
