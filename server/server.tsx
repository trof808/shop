import fs from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server'; // Используем нативный метод renderToString
import { StaticRouter } from 'react-router'; // Исправляем импорт StaticRouter
import { App } from '../src/App/App'; // Импортируем компонент App
import { Providers } from '../src/App/providers';
import dotenv from 'dotenv';
import { createPlatformAPI } from '../infrastructure/platform';
import { createWindowApi } from '../infrastructure/platform/window/server';
import { PlatformAPIContext } from '../infrastructure/platform/shared/context';
import axios from 'axios';
import express from 'express';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';

const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';

const app = express();

//@ts-ignore
let vite;
console.log('isProduction', isProduction);
if (!isProduction) {
  vite = await (
    await import('vite')
  ).createServer({
    root: process.cwd(),
    logLevel: 'error',
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    appType: 'custom',
  });
  // use vite's connect instance as middleware
  app.use(vite.middlewares);
} else {
}

// Serve HTML
app.use('*', async (req, reply) => {
  try {
    const url = req.originalUrl;
    let template;

    if (!isProduction) {
      template = await fs.readFile('./index.html', 'utf-8');
      // @ts-ignore
      template = await vite.transformIndexHtml(url, template);
    } else {
      // Готовим продовый html. Берем html который сбилдился в клиентском бандле
      // template = templateHtml;
      // Если нужно идем также в бандлы чтобы подставить пути до чанков в тег scripts
    }

    const platformAPI = createPlatformAPI({
      envSpecificAPIs: {
        window: createWindowApi(),
      },
    });

    // TODO
    // Чтобы браузер красиво отрисовал, нужно подгрузить стили

    // TODO
    // Перед тем как сформировать страницу для рендеринга
    // нужно получить все необходимые данные для отрисовки в зависимости от страницы
    // И отдать их внутрь дерева компонент, а также прокинуть в глобальный объект для фронта

    const products = await axios.get(
      'http://localhost:8888/api/products/search?limit=100&page=1'
    );

    const rendered = renderToString(
      <PlatformAPIContext.Provider value={platformAPI}>
        <StaticRouter location={url}>
          <Providers serverData={products?.data?.products}>
            <App />
          </Providers>
        </StaticRouter>
      </PlatformAPIContext.Provider>
    );

    // TODO: В глобальный объект window необходимо прокинуть все данные, которые получили с api
    const html = template.replace(`<!--app-html-->`, rendered ?? '').replace(
      '<head>',
      `<head>
          <script>
              window.__ENV__ = {
                  NODE_ENV: '${process.env.NODE_ENV}',
                  BASE: '${process.env.BASE}',
                  API_DEV_SERVER: '${process.env.API_DEV_SERVER}',
              };
              window.data = {
                products: ${JSON.stringify(products?.data?.products)}
              };
          </script>`
    );
    // .replace(`<!--app-head-->`, rendered.head ?? '')

    reply.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    // @ts-ignore
    vite?.ssrFixStacktrace(e);
    // @ts-ignore
    console.error(e.stack);
    // @ts-ignore
    reply.status(500).send(e.stack);
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
