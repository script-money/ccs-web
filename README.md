# ccs-web

## run local

1. use `yarn` install and `yarn dev` run local develop environment
2. need [ccs-server](https://github.com/script-money/ccs-server) and [docker-nginx-cors](./docker-nginx-cors) run first

## run testnet

1. use `yarn testnet` run connect testnet at local

## deploy

1. use `yarn build` generate files
2. copy dist, docker-compose.yml and nginx.conf to server
3. use `sh run_web.sh` launch nginx web container
4. change VITE_BASE_URL (backend domain) and VITE_DOMAIN (front domain) in .env
