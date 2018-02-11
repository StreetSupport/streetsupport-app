# Street Support App

Hybrid app for iOS and Android using Ionic Framework v3

### Tech

* [Ionic] - mobile hybrid app framework built on top of Cordova and AngularJS v5

### Installation

You can now choose between Docker and Native development. Docker should be nice and quick to get people going if they don't have node, npm or ionic installed.

#### Docker

You will need to download the Dockerfile. Currently, this guide is written for ubuntu and mac as that is what I have to hand. All references to ~ map to your home directory.
```sh
wget https://raw.githubusercontent.com/rml1997/streetsupport-app/patch-1/Dockerfile
```
Or
```sh
curl https://raw.githubusercontent.com/rml1997/streetsupport-app/patch-1/Dockerfile > Dockerfile
```
Linux only:
```sh
sudo su
```
Install docker and build the image, including ssh key generation:
```sh
apt update
apt install -y docker.io
docker build -t streetsupport/app .
```
You will need to go to https://github.com/settings/keys and enter the SSH key (the "jibberish" in the terminal starting with ssh-rsa). Then build again. The key generation result has been cached as long as the Dockerfile doesn't change up to that point
```sh
docker build -t streetsupport/app .
```
In the docker image, we move the files to the host so we can update them more easily:
```sh
docker run -v ~/:/host streetsupport/app mv /streetsupport-app /host/streetsupport-app
```
Back on the host, we allow the user to access the files, and remap streetsupport-app to use the files on the host:
```sh
docker run -p 8100:8100 -p 35729:35729 -p 53703:53703 -d --name streetsupportapp -v ~/streetsupport-app:/streetsupport-app streetsupport/app
```
After a few seconds to load, you should be able to access the app using http://localhost:8100
If you edit the files in ~/streetsupport-app the changes should be instantly reflected in the browser!

#### Native

There are some issues with versioning with node and npm on certain platforms. If you are uncertain and in a rush, I recommend trying the Docker instructions above.

You need nodejs, npm and Ionic CLI installed globally (may have to use sudo):

```sh
$ npm install -g ionic@beta cordova
```
During development run the following to run the app in a browser from a local server

```sh
$ git clone git@github.com:StreetSupport/streetsupport-app.git
$ cd streetsupport-app/StreetSupportApp
$ npm install
$ ionic serve
```
to build for a particular platform (ios, android) run

```sh
$ ionic cordova platform add [platform]
$ ionic cordova emulate [platform]
```

To run on  a device run

```sh
$ ionic run [platform]
```
