sudo git fetch
sudo git reset --hard origin/master
npm i
npm run compile
pm2 delete index
cd dist
pm2 start index.js