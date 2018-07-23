var app = new Vue({
	el: "#root",
	data: {
		newUser: {username: "", email: ""},
		dbRef: null,
		users: [],
		selectedUser: {}
	},

	methods: {
		addNewUser: function(){
			console.log(this.newUser);
			this.dbRef.push(this.newUser);

			this.newUser = {username: "", email: ""}
		},

		deleteUser: function(key){
			// console.log(key);
			this.dbRef.child(key).remove();
		},

		updateUser: function(){
			// console.log(key);
			this.dbRef.child(this.selectedUser.key).update(this.selectedUser.val);
			this.selectedUser = {}
		}
	},

	mounted: function(){
		console.log('mounted');
		// Initialize Firebase
		var config = {
		    apiKey: "AIzaSyAZlzjp6vtEbMC80DNtwJ0u3fHjRmDSJv8",
		    authDomain: "fir-crud-d8808.firebaseapp.com",
		    databaseURL: "https://fir-crud-d8808.firebaseio.com",
		    projectId: "fir-crud-d8808",
		    storageBucket: "fir-crud-d8808.appspot.com",
		    messagingSenderId: "2391203391"
		};
		var firebaseapp = firebase.initializeApp(config);
		this.dbRef = firebaseapp.database().ref("users");

		var ci = this;

		this.dbRef.on("value", function(snapshot){
			ci.users = [];
			snapshot.forEach(function(childSnapshot){
				// console.log(childSnapshot.val());
				ci.users.push({key: childSnapshot.key, val: childSnapshot.val()});
			})
		});
	}
});