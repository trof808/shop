"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = require("node:fs/promises");
var react_1 = require("react");
var server_1 = require("react-dom/server"); // Используем нативный метод renderToString
var react_router_1 = require("react-router"); // Исправляем импорт StaticRouter
var App_1 = require("../src/App/App"); // Импортируем компонент App
var providers_1 = require("../src/App/providers");
var dotenv_1 = require("dotenv");
var platform_1 = require("../infrastructure/platform");
var server_2 = require("../infrastructure/platform/window/server");
var context_1 = require("../infrastructure/platform/shared/context");
var express_1 = require("express");
var useGetMainPageProductsList_1 = require("@/features/ProductsListFeature/hooks/useGetMainPageProductsList");
dotenv_1.default.config();
var isProduction = process.env.NODE_ENV === 'production';
var port = process.env.PORT || 3000;
var base = process.env.BASE || '/';
var templateHtml = isProduction
    ? await promises_1.default.readFile('./dist/client/index.html', 'utf-8')
    : '';
var app = (0, express_1.default)();
//@ts-ignore
var vite;
console.log('isProduction', isProduction);
if (!isProduction) {
    vite = await (await Promise.resolve().then(function () { return require('vite'); })).createServer({
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
}
else {
}
// Serve HTML
app.use('*', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var url, template, platformAPI, products, rendered, html, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                url = req.originalUrl;
                template = void 0;
                if (!!isProduction) return [3 /*break*/, 3];
                return [4 /*yield*/, promises_1.default.readFile('./index.html', 'utf-8')];
            case 1:
                template = _a.sent();
                return [4 /*yield*/, vite.transformIndexHtml(url, template)];
            case 2:
                // @ts-ignore
                template = _a.sent();
                return [3 /*break*/, 3];
            case 3:
                platformAPI = (0, platform_1.createPlatformAPI)({
                    envSpecificAPIs: {
                        window: (0, server_2.createWindowApi)(),
                    },
                });
                products = (0, useGetMainPageProductsList_1.useGetMainPageProductsList)().products;
                console.log('products', products);
                rendered = (0, server_1.renderToString)(<context_1.PlatformAPIContext.Provider value={platformAPI}>
        <react_router_1.StaticRouter location={url}>
          {/* <Providers data={{ products }}> */}
          <providers_1.Providers>
            <App_1.App />
          </providers_1.Providers>
        </react_router_1.StaticRouter>
      </context_1.PlatformAPIContext.Provider>);
                html = template.replace('<head>', "<head>\n          <title>Document2</title>\n          <script>\n              window.__ENV__ = {\n                  NODE_ENV: '".concat(process.env.NODE_ENV, "',\n                  BASE: '").concat(process.env.BASE, "',\n                  API_DEV_SERVER: '").concat(process.env.API_DEV_SERVER, "',\n              };\n              window.data = {\n                productsCount: 10 \n              };\n          </script>"));
                // .replace(`<!--app-head-->`, rendered.head ?? '')
                reply.status(200).set({ 'Content-Type': 'text/html' }).end(html);
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                // @ts-ignore
                vite === null || vite === void 0 ? void 0 : vite.ssrFixStacktrace(e_1);
                // @ts-ignore
                console.error(e_1.stack);
                // @ts-ignore
                reply.status(500).send(e_1.stack);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen(3000, function () {
    console.log('http://localhost:3000');
});
