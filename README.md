# Street Support App

Hybrid app for iOS and Android using Ionic Framework v3

### Tech

* [Ionic] - mobile hybrid app framework built on top of Cordova and AngularJS v5

### Installation

You need Ionic CLI installed globally (may have to use sudo):

```sh
$ npm install -g ionic@beta
$ npm install -g cordova
```
During development run the following to run the app in a browser from a local server

```sh
$ git clone git@github.com:StreetSupport/streetsupport-app.git
$ cd streetsupport-app
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

### To deploy:

update the version numbers in config.xml 

#### ios:

```sh
./scripts/build-ios.sh
```

this builds and compiles the app, and uploads the IPA to test flight.

note: it uploads successfully (receive email confirmation), but fastlane fails the acknowledgement.

todo:

* icon is missing

#### android:

```sh
./scripts/build-android.sh
```

this builds and compiles the app, but then fails to upload to google testing track with error:

```
File '/Users/vincelee/Documents/workspace/streetsupport-app/StreetSupportApp/platforms/android/app/deploy/StreetSupportApp.keystore' specified for property 'signingConfig.storeFile' does not exist.
```

to upload manually, run following commands:

```sh
# sign the app
jarsigner -verbose -keystore ./deploy/StreetSupportApp.keystore ./StreetSupportApp/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk streetsupportapp

# 'zipalign'
zipalign -f -v 4 ./StreetSupportApp/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ./deploy/ssn-app.apk

```