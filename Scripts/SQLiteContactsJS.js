
// Declare SQL Query for SQLite

var createStatement = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, useremail TEXT)";

var selectAllContacts = "SELECT * FROM Contacts";

var insertStatement = "INSERT INTO Contact (username, usermail) VALUES (?, ?)";

var updateStatement = "UPDATE Contacts SET username = ?, usermail = ? WHERE id=?" ;

var deleteStatement = "DELETE FROM Contacts WHERE id=?";

var dropStatement = "DROP TABLE Contacts";

var db - openDatabase("AddressBook", "1.0", "Address Book", 200000); // Open SQLite db

var dataset;

var DataType;


////  Function call when page is ready.

function initDatabase()  {  
    try {
	if (!window.openDatabase) {  // check for SQLite broser support
	    alert ('SQLite Databases are not supported in this browser.');
	}
	else {
	    createTable();  // call Function to create SQLite table
	}
    }

    catch (e) {
	if (e == 2) {
	    //version numver mismach.
	    console.log("Invalid SQLite Database Version!!");
	} else {
	    console.log("UnKOWN ErroR " + e + " !!.");
	}
	return;
	
    }


}


////  Function to Create SQLite Table

function createTable() {

    db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });

}

////  Function Call for Submit btn click -> Get value from Input and insert in DB...

function insertRecord(){

    var usernametemp = $('input:text[id=username]').val();

    var usernameemailtemp = $('input:text[id=useremail]').val();

    db.transaction(function (tx){ tx.executeSql(insertStatemen); });

   //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function);
}



////   Function call when Delete Btn clicked - Get id of record

function deleteRecord(id) {

    var iddelete = id.toString();

    db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Sucessfully Deleted");  });

    resetForm();
    
}


////   Function call for Edit btn click  - by entry id

function upddateRecord() {

    var usernameupdate = $('input:text[id=username]').val().toString();

    var useremailupdate = $('input:text[id=useremail]').val().toString();

    var useridupdate = $("#id").val();

    db.transaction(function (tx) { tx.executeSql(updateStatement, [usernameupdate, useremailupdate, Number(useridupdate)], loadAndReset, onError); });
    
}


////    Function call when Drop btn clicked -> table dropped from the database

function dropTable () {

    db.transaction(function (tx) { tx.executeSql(dropStatement, [], showRecords, onError);  });

    resetForm();

    initDatabase();
    
}


////  Function to display records that are retrieved from the database.

function loadRecord(i) {

    var item = dataset.item(i);

    $("username").val((item['username']).toString());

    $("#useremail").val((item['useremail']).toString());

    $("#id").val((item['id']).toString());
   

}


////  Function to reset the form input values

function resetForm (){

    $("username").val("");

    $("#useremail").val("");

    $("#id").val("");

}


////  Function for loading and reseting table

function loadAndReset() {

    resetForm();

    showRecords();
    
}


////  Function for error handling

function onError(tx, error) {

    alert(error.message);

}


////  Function to retrive entries from SQLite Database and display the entries as a list

function showRecords() {

    $("#results").html('')

    db.transaction(function (tx) {
	
	tx.executeSql(selectAllStatement, [], function (tx, result) {
	    
	    dataset = result.rows;

	    for (var i = 0, item = null; i < dataset.length; i++) {
		
		item = dataset.item(i);

		var linkeditdelete = '<li>' + item['username'] + ' , ' + item['useremail'] + '   ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +
		    
		    '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';

		$("#results").append(likeditdelete);
		
	    }

		
	});
    });
    
    
}


////  Function call for when page is ready to load.

$(document).ready(function () {

    ;
    $("body").fadeIn(2000);

    initDatabase();

    ///   Register listener event with btn click
    $("#submitButton").click(insertRecord);

    $("#btnUpdate").click(updateRecord);

    $("#btnReset").click(resetForm);

    $("btnDrop").click(dropTable);


});







