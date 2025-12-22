const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');
const mime = require('mime'); // Import mime package for correct Content-Type

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;
            
            if (pathname.startsWith('/cms')) {
                const cmsPath = path.join(
                    __dirname,
                    'cms',
                    'backend',
                    'web',
                    pathname.replace('/cms', '')
                );

                if (fs.existsSync(cmsPath)) {
                    const mimeType = mime.getType(cmsPath) || 'application/octet-stream';
                    res.statusCode = 200;
                    res.setHeader('Content-Type', mimeType);
                    fs.createReadStream(cmsPath).pipe(res);
                } else {
                    res.statusCode = 404;
                    res.end('404 - CMS File not found');
                }
            }
            // Handle other paths as Next.js routes
            else {
                await handle(req, res, parsedUrl);
            }
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('Internal server error');
        }
    })
        .once('error', (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
