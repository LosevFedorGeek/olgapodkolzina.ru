import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

async function main() {
  const assetsDir = path.resolve(process.cwd(), 'assets');
  const publicAssetsDir = path.resolve(process.cwd(), 'public/assets');
  if (fs.existsSync(assetsDir)) {
    if (!fs.existsSync(publicAssetsDir)) {
      fs.mkdirSync(publicAssetsDir, { recursive: true });
    }
    for (const file of fs.readdirSync(assetsDir)) {
      const srcFile = path.join(assetsDir, file);
      const destFile = path.join(publicAssetsDir, file);
      try {
        const stat = fs.statSync(srcFile);
        if (stat.isFile() && stat.size > 0) {
          if (!fs.existsSync(destFile) || fs.statSync(destFile).size !== stat.size) {
            fs.copyFileSync(srcFile, destFile);
          }
        }
      } catch {}
    }
  }

  app.use('/assets', express.static(path.resolve(process.cwd(), 'assets')));
  app.use('/assets', express.static(path.resolve(process.cwd(), 'public/assets')));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
});
