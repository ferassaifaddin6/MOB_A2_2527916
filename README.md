My name is Feras Saifaddin Ismail Mohammed.

- Registration number: 25/27916
- App name: MFPortfolio (verification code MOB-A2-7916)
- Purpose: an offline Android portfolio a recruiter can install and understand in two minutes.

## Features
Home with photo/avatar, Skills and Education, two Projects with detail screens, Profile editor (3 validation rules), camera/gallery photo with replace/remove, AsyncStorage persistence, About screen, fully offline.

## Setup and run
```
npm install
npx expo install --fix
npx expo start
```
Expo Go is only for development. The submission is the installed APK.

## Build the APK
```
npm install -g eas-cli
eas login
eas build -p android --profile preview
```
Android package: rw.ac.ines.ug2527916.mfportfolio

## Submission details (fill in before submitting)
- Tested device / Android version: ________
- Final commit hash: ________
- Release link (v1.0.0): ________
- APK link: ________

## Known limitations
No online features. The photo is stored in the app's private storage, so clearing app data removes it.
