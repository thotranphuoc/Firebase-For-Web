# Firebase-For-Web

1. npm install firebase angularfire2 --save

1. create a project in firebase.google.com
2. copy snipecode and paste into index.html ( before </body> tag)
3. move the script firebase code into separated file firebase.js



// FIREBASE STORAGE
1. change "if request.auth != null;" --> "if true;"

service firebase.storage {
  match /b/mymoney-c54c7.appspot.com/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}


