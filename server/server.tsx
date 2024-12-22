import fs from 'node:fs/promises';
import Fastify from 'fastify';
import path from 'node:path';
import { renderToString } from 'react-dom/server'; // Используем нативный метод renderToString
import { StaticRouter } from 'react-router'; // Исправляем импорт StaticRouter
import { App } from '../src/App/App'; // Импортируем компонент App
import { Providers } from '../src/App/providers'
import dotenv from 'dotenv';

dotenv.config();

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';

// Create Fastify instance
const fastify = Fastify();

// Add Vite or respective production middlewares
//@ts-ignore
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  // @ts-ignore
  fastify.use(vite.middlewares);
} else {
  // // @ts-ignore
  // const compression = (await import('fastify-compress')).default;
  // // @ts-ignore
  // const serveStatic = (await import('fastify-static')).default;

  // fastify.register(compression);
  // fastify.register(serveStatic, {
  //   root: path.join(process.cwd(), 'dist/assets'),
  //   prefix: base,
  //   // Serve static files without extensions
  //   // extensions: ['html', 'js', 'css'], // Uncomment if needed
  // });
}

// Serve HTML
fastify.all('*', async (req, reply) => {
  try {
    // @ts-ignore
    const url = req.raw.url.replace(base, '');

    let template;
    let render;

    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      // @ts-ignore
      template = await vite.transformIndexHtml(url, template);
    } else {
      // template = templateHtml;
      // render = (await import('./dist/server/entry-server.js')).render;
    }

    const rendered = renderToString(
      <StaticRouter location={url}>
        <Providers>
          <App />
        </Providers>
      </StaticRouter>
    )

    const html = template
      .replace(`<!--app-html-->`, rendered ?? '');
      // .replace(`<!--app-head-->`, rendered.head ?? '')

    reply.status(200).type('text/html').send(html);
  } catch (e) {
    // @ts-ignore
    vite?.ssrFixStacktrace(e);
    // @ts-ignore
    console.error(e.stack);
    // @ts-ignore
    reply.status(500).send(e.stack);
  }
});

// Start http server
// @ts-ignore
fastify.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});