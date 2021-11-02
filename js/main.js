// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCcNKmXcY-3oyNihSCANvVbejhmla81FDI',
  authDomain: 'contactform-8f644.firebaseapp.com',
  databaseURL: 'https://contactform-8f644-default-rtdb.firebaseio.com',
  projectId: 'contactform-8f644',
  storageBucket: 'contactform-8f644.appspot.com',
  messagingSenderId: '969739600527',
  appId: '1:969739600527:web:96694ce4d855ce0cc6e6fa',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//     --------------------------------------------------------------------------
// Reference contactInfo collections
let contactInfo = firebase.database().ref('Information');

//     --------------------------------------------------------------------------

//  -------- THIS IS MAIN PART ---------
// Listen for a Submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

//  -------- THIS IS ALSO MAIN PART ---------
function submitForm(e) {
  e.preventDefault();

  // Get input Values
  let name = document.getElementById('name').value;
  //   let company = document.getElementById('company').value;
  let email = document.getElementById('email').value;
  //   let phone = document.getElementById('phone').value;
  let message = document.getElementById('message').value;

  // IMPORTANT CONSOLE LOG ====
  // console.log(name, company, email, phone, message);

  //  Save message
  saveContactInfo(name, email, message);

  // Reset Form
  document.getElementById('contactForm').reset();

  sendEmail(name, email, message);
}

// Save infos to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();
  newContactInfo.set({
    name: name,
    email: email,
    message: message,
  });

  // Retriving Data
  retriveInfos();
}

// Retrive Infos
function retriveInfos() {
  let ref = firebase.database().ref('Information');
  // Not gonna work becz .ref("__") should be same when Reference collections
  // let ref = firebase.database().ref("infos"); (X)
  //   ref.on('value', gotData);
}

// function gotData(data) {
//   let info = data.val();
//   let keys = Object.keys(info);

//   for (let i = 0; i < keys.length; i++) {
//     let infoData = keys[i];
//     let name = info[infoData].name;
//     let email = info[infoData].email;
//     let message = info[infoData].message;
//     console.log(name,  email,  message);

// let infosResults = document.querySelector('.infosResults');

// infosResults.innerHTML += `<div>
//   <p><strong>Name: </strong>${name} <br/>
//   <a><strong>Company: </strong>${company}</a> <br/>
//   <a><strong>Email: </strong>${email}</a> <br/>
//   <a><strong>Phone Number: </strong>${phone}</a> <br/>
//   <a><strong>Message: </strong>${message}</a> <br/>
// </p>
// </div>`;
//   }
// console.log(data);
// }

retriveInfos();

// function errData(err) {
//   console.log("Error!");
//   console.log(err);
// }
// console.log(gotData());

// Sending Emails
function sendEmail(name, email, message) {
  Email.send({
    Host: 'smtp.gmail.com',
    Username: 'vivek.gundu28@gmail.com',
    Password: 'atpbpuenyotreona',
    To: 'vivek.gundu28@gmail.com',
    From: 'vivek.gundu28@gmail.com',
    Subject: `${name} send you a message`,
    Body: `Name: ${name} <br/>  Email: ${email} <br/>  Message: ${message}`,
  }).then((message) => alert('Mail sent successfully!'));
}
