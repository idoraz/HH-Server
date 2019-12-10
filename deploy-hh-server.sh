sudo git fetch
sudo git reset --hard origin/master
npm i
npm run compile
pm2 start ecosystem-aws.config.js