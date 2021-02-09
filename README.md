# NodeJS container to connect to Oracle Autonomous DB

This containerized example application connects to an Autonomous Database. There is a `deployment.yaml` file available to deploy to Kubernetes.

## Prerequisites

1. Make sure Docker is running and an [Autonomous DB is deployed and available](https://www.oracle.com/goto/adbs/quickstart)
2. Download the credentials wallet from the Oracle Cloud interface

## Installation

1. Clone or download this repository
2. Unzip the credentials wallet, rename the unzipped folder to `wallet_mydb` and copy it into this root folder (you may also choose to replace `wallet_mydb/` with your credentials folder within the `Dockerfile`)
3. Go to `nodeapp/index.js` and change user, password and connect string. By default Autonomous DB is accessed with `admin` user, your master password (not the one which encrypts the credential wallet) and the connect string can be found within `tnsnames.ora`.
4. Build and run Docker container

```
git clone 
docker build --pull -t nodejs-autonomous-example:1 .
docker run -it --rm nodejs-autonomous-example:1

## Deploy to Kubernetes

Make sure to build the Docker container first.

```
kubectl apply -f deployment.yaml
kubectl get pods
kubectl logs <pod-id>
```