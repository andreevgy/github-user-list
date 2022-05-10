# Backend of github user search

Backend app has single endpoint that fetches data from github and saves it in in-memory cache in form of simple Map.

## Getting Started

To start server
* Ensure you have next settings in your env (example below)
```
PORT=8080
GITHUB_API_HOST=https://api.github.com
```

* Run start command to build and start server
```shell
npm start
# or
yarn start
```
