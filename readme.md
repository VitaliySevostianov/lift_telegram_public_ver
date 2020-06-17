<h2>Backup postgres</h2>

nano backup.sql (backup file was deleted in aims of security)<br>

<h2>Docker build</h2>

cd nginx <br>
docker build -t nginx . <br>
cd .. <br>
cd nodejs <br>
nano .env<br>

```
//There was confidential information
```

docker build -t nodejs . <br>

<h2>Docker run</h2>

docker run -d -p 8080:80 nginx <br>
docker run -d -p 228:228 nodejs <br>
