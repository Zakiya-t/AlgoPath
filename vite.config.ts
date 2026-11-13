import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

function cppCompilerBackendPlugin(): Plugin {
  return {
    name: 'cpp-compiler-backend',
    configureServer(server) {
      server.middlewares.use('/api/compile', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const { code, stdin = '' } = JSON.parse(body || '{}');
            if (!code) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'No code provided' }));
              return;
            }

            const tempId = `algopath_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
            const tempDir = os.tmpdir();
            const srcPath = path.join(tempDir, `${tempId}.cpp`);
            const exePath = path.join(tempDir, `${tempId}.exe`);

            fs.writeFileSync(srcPath, code, 'utf-8');

            const compileStart = Date.now();
            exec(`g++ -std=c++20 -O2 "${srcPath}" -o "${exePath}"`, (compileErr, _stdout, stderr) => {
              if (compileErr) {
                try { fs.unlinkSync(srcPath); } catch (_) {}

                let errLine = 1;
                let errCol = 1;
                const lineMatch = stderr.match(/:(\d+):(\d+):\s*error:/);
                if (lineMatch) {
                  errLine = parseInt(lineMatch[1], 10);
                  errCol = parseInt(lineMatch[2], 10);
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: false,
                    compilerError: stderr,
                    error: stderr,
                    line: errLine,
                    column: errCol,
                    compiler: 'g++ (GCC 16.1.0 C++20)',
                    compilationTimeMs: Date.now() - compileStart
                  })
                );
                return;
              }

              const runStart = Date.now();
              const child = exec(`"${exePath}"`, { timeout: 4000 }, (runErr, runStdout, runStderr) => {
                const executionTimeMs = Date.now() - runStart;

                try { fs.unlinkSync(srcPath); } catch (_) {}
                try { fs.unlinkSync(exePath); } catch (_) {}

                res.setHeader('Content-Type', 'application/json');
                if (runErr) {
                  res.end(
                    JSON.stringify({
                      success: false,
                      runtimeError:
                        runStderr ||
                        (runErr.killed ? 'Time Limit Exceeded (> 4000ms)' : runErr.message),
                      compiler: 'g++ (GCC 16.1.0 C++20)',
                      executionTimeMs
                    })
                  );
                } else {
                  res.end(
                    JSON.stringify({
                      success: true,
                      stdout: runStdout,
                      compiler: 'g++ (GCC 16.1.0 C++20)',
                      executionTimeMs,
                      compilationTimeMs: runStart - compileStart
                    })
                  );
                }
              });

              if (stdin) {
                child.stdin?.write(stdin);
                child.stdin?.end();
              }
            });
          } catch (e: any) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: e?.message || 'Server error' }));
          }
        });
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), cppCompilerBackendPlugin()],
  server: {
    port: 3000,
    open: false
  }
});
