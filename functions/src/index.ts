import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
​
exports.createAccount = functions.firestore.document('CMS_users/{docid}').onCreate((change, context) => {
    console.log('Document change', change.data(), 'Document context', context);
    const email = change.get('email');
    const password = change.get('password');
    
    admin.auth().createUser({
        email: email,
        password: password
      })
})
