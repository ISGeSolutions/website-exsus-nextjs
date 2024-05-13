import { createProxyMiddleware } from 'http-proxy-middleware';
export default function setupProxy(app: any) {
  app.use(
    'https://cms-api-dev.excelleresolutions.com',
    createProxyMiddleware({
      target: 'http://13.233.122.205:1337',
      changeOrigin: true,
    })
  );
}
