echo "removing old docker app"
docker stop app
docker rm app
echo "pulling latest..."
docker pull wahnsinnshub/ttt-repo:latest
docker run -it -d --name app -p 4200:80 wahnsinnshub/ttt-repo:latest