# run container
docker build -t nginx . <br>
docker run -d -p 8080:80 nginx
