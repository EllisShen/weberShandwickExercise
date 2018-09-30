# Coding Exercise

> Ellis Shen's coding exercise

## Developement and Deployment

### Folder Structure

```bash
├── /api_server/     # Python API Server
| ├── /server.js     # API Server entrypoint
├── /views/pages/    # EJS Templates
│ ├── 404.ejs        # 404 Error template
│ ├── default.ejs    # default template
├── package.json     # npm packages info
├── config.js        # NodeJs Http Server configuration file
└── index.js         # NodeJs server entrypoint
```
## Local Development Setup

``` bash
# install package dependencies
npm install

# start API server
python3 api_server/server.py

# start Http server (dev)
node index.js or npm run
```