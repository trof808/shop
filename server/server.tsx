import path from 'path'; // Импортируем модуль path
import fs from 'fs/promises'; // Импортируем модуль fs/promises
import React from 'react'; // Добавляем импорт React
import { renderToString } from 'react-dom/server'; // Используем нативный метод renderToString
import { StaticRouter } from 'react-router'; // Исправляем импорт StaticRouter
import { App } from '../src/App/App'; // Импортируем компонент App
import fastify from 'fastify'; // Импортируем fastify

const app = fastify({ logger: true });

// Настройка статических файлов
app.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
});

// Маршрут для рендера страницы
app.get('*', async (request, reply) => {
  const context = {};
  const html = renderToString(
    <StaticRouter location={request.url}>
      <App />
    </StaticRouter>
  );

  // Получение шаблона HTML
  const templatePath = path.resolve('./template.html');
  const template = await fs.readFile(templatePath, 'utf8');

  // Замена плейсхолдеров в шаблоне
  const renderedHtml = template.replace('<!--SSR-PLACEHOLDER-->', html);

  return reply.type('text/html').send(renderedHtml);
});

// Запуск сервера
const start = async () => {
  try {
    await app.listen({ port: 3000 });
    // @ts-ignore
    app.log.info(`server running at ${app.server.address()?.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();