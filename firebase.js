(function(){
    // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDrlBuTKONP4kRMm4zmkc4-offUkiCazsk",
    authDomain: "mymoney-c54c7.firebaseapp.com",
    databaseURL: "https://mymoney-c54c7.firebaseio.com",
    storageBucket: "mymoney-c54c7.appspot.com",
    messagingSenderId: "154392056656"
  };
  firebase.initializeApp(config);
// ==== EVENT SYNC ============
  // Get elements
  const preObject = document.getElementById('object');
  const ulList = document.getElementById('list');
  // Create references
  const dbRefObject = firebase.database().ref().child('object');
  const dbRefList = dbRefObject.child('hobbies');

  // Sync object change
  dbRefObject.on('value', snap => {
      console.log(snap.val());
      preObject.innerText = JSON.stringify(snap.val(),null, 30);
  })

  // sync the list changes
  // value, child_added, child_removed, child_changed, child_moved
  dbRefList.on('child_added', snap =>{
    console.log(snap.val());
    const li = document.createElement('li');
    li.innerText = snap.val();
    li.id = snap.key;
    ulList.appendChild(li);
  });

  //child_changed
  dbRefList.on('child_changed', snap =>{
    console.log(snap.key);
    const val = console.log(snap.val());
    const liChanged = document.getElementById(snap.key);
    liChanged.innerText = snap.val();
  });

  //child_changed
  dbRefList.on('child_removed', snap =>{
    const liToRemove = document.getElementById(snap.key);
    liToRemove.remove();
  });



  

  //===== FIREBASE AUTH ========= 
  // getElementById
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout = document.getElementById('btnLogout');

  // add login event
  btnLogin.addEventListener('click', e => {
    const email  = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password); // return a promise
    promise.catch(e => console.log(e.message));
  });
  
  // add signup event
  btnSignup.addEventListener('click', e =>{
    const email  = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
      .catch(e => console.log(e.message));
  });

  // add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
      console.log(firebaseUser );
      btnLogout.classList.remove('hide');
    }else {
      console.log('user not logged in');
      btnLogout.classList.add('hide');
    }
  });

  // add btnLogout event
  btnLogout.addEventListener('click', e =>{
    firebase.auth().signOut();
  })
  

  // ====== FIREBASE STORAGE ===========
  //get elements
  const uploader = document.getElementById('uploader');
  const fileBtn = document.getElementById('fileBtn');
  const doneStatus = document.getElementById('doneStatus');

  //listen for file selection
  fileBtn.addEventListener('change', e =>{
    // get file
    var file = e.target.files[0];

    // create a storage ref
    var storageRef = firebase.storage().ref('photos/'+ file.name);

    //upload file
    var task = storageRef.put(file);
    
    //update progress bar
    task.on('state_changed', 
      function progress(snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        uploader.value = percentage;
      },
      function error(err){
        console.log(err.value);
      },
      function complete(){
        console.log('upload completed!');
        doneStatus.innerText = 'upload completed';
        uploader.value = 0;
      }
    )

  });
}());