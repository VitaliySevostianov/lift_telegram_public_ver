# settings
create .env file <br/>

# run container
docker build -t nodejs . <br/>
docker run -d -p 8081:228 nodejs <br/>

# pm2 logs inside container
docker exec -it <container-id> bash <br/>
pm2 monit <br/>
