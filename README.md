# NodeJS container to connect to Oracle Autonomous DB

This containerized example application connects to an Autonomous Database. There is a `deployment.yaml` file available to deploy to Kubernetes.

## Prerequisites

1. Make sure Docker is running and an [Autonomous DB is deployed and available](https://www.oracle.com/goto/adbs/quickstart)
2. Download the credentials wallet from the Oracle Cloud interface

## Installation

1. Clone or download this repository
2. Unzip the credentials wallet, rename the unzipped folder to `wallet_mydb` and copy it into this root folder (alternatively you may also choose to replace `wallet_mydb/` with your credentials folder within the `Dockerfile`)
3. Go to `nodeapp/index.js` and change user, password and connect string. By default Autonomous DB is accessed with `admin` user, your master password (not the one which encrypts the credential wallet) and the connect string can be found within your wallet in `tnsnames.ora`.
4. That's all you need. Build and run Docker container

```
git clone git@github.com:m1nka/nodejs-autonomous-db-example.git
docker build --pull -t nodejs-autonomous-example:1 .
docker run -it --rm nodejs-autonomous-example:1
```

## Debugging 

A successful output should look like this `[ [ 101, 'Alpha' ], [ 102, 'Beta' ], [ 103, 'Gamma' ] ]`. If things are not working out you may try to run the container manually with `docker run -it --rm nodejs-autonomous-example:1 bash`. Within the container you should find the application in `nodeapp/`. You can run it with `node nodeapp/index.js`. You may also check if the content of the credential wallet is in the right location by running `ls /usr/lib/oracle/19.5/client64/lib/network/admin`. Finally you can run `sqlplus admin/password@connectstring` (adapt with your credentials).

## Deploy to Kubernetes

Make sure to build the Docker container first.

```
kubectl apply -f deployment.yaml
kubectl get pods
kubectl logs <pod-id>
```

**Note**: The container will only run its query and is then terminated (no running process). So it is normal to see 0/1 ready. Check the logs to see if the container queried the autonomous database successfully.
