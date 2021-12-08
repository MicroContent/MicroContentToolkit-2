//Button's function to load the editor code into 1st CodeMirror frame
function loadFileAsText() {
	
	//The loaded plugin-file from the editor section
	var fileToLoad = document.getElementById("first_i").files[0];
	
	//Read the file,
	//extract the content out of it,
	//Put the content directly into the 1st CodeMirror frame
	var fileReader = new FileReader();
	fileReader.readAsText(fileToLoad, "UTF-8");
	fileReader.onload = function (fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.querySelector(".CodeMirror").CodeMirror.setValue(textFromFileLoaded);
	};
}

//Button's function to load the viewer code into 2nd CodeMirror frame
function loadFileAsText2() {
	
	//The loaded file from the viewer section
	var fileToLoad = document.getElementById("second_i").files[0];

	//Read the file,
	//extract the content out of it,
	//Put the content directly into the 2nd CodeMirror frame
	var fileReader = new FileReader();
	fileReader.readAsText(fileToLoad, "UTF-8");	
	fileReader.onload = function (fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.querySelectorAll(".CodeMirror")[1].CodeMirror.setValue(textFromFileLoaded);
	};
};

//Function to save the editor code from the 1st CodeMirror frame locally as a HTML file 
function saveTextAsFile() {
	var textToWrite = editor.getValue();
	var textFileAsBlob = new Blob([textToWrite], { type: 'html' });
	var fileNameToSaveAs = "editor.html"; //filename.extension

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null) {
		// Chrome allows the link to be clicked without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	} else {
		// Firefox requires the link to be added to the DOM before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
};

//Function to save the viewer code from the 2nd CodeMirror frame locally as a HTML file
function saveTextAsFile2() {
	var textToWrite = editor2.getValue();
	var textFileAsBlob = new Blob([textToWrite], { type: 'html' });
	var fileNameToSaveAs = "viewer.html"; //filename.extension

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null) {
		// Chrome allows the link to be clicked without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	} else {
		// Firefox requires the link to be added to the DOM before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	
	downloadLink.click();
}






//"Load Editor-CodeMirror"-Buttons' function
// to retrieve the content of URL & place it into 1nd CodeMirror frame (editor part)
function getSrcintoEditor() {
	
	//Retrieve the whole URL from the input of the editor section
	var url_editor = document.getElementById("url-editor-input").value;
	
	//Using the Fetch API to retrieve the content of the URL's website
	fetch(url_editor)
		
		//1st operation after successful retrieval
		.then(x => {
		
			//return the whole content in plain text form
			return x.text();
		
		//2nd operation directly after the 1st one
		}).then(y => {
		
			//Change the whole 1st CodeMirror frame (editor part) with the retrieved content
			document.querySelector(".CodeMirror").CodeMirror.setValue(y);

		});
};

//"Reload Editor"-button's function
//to update the editor-iframe
function reloadEditor() {
	
	//Retrieve the editor-code from 1st CodeMirror frame
	var editor_code = editor.getValue();

	//Using AJAX with JQuery to send all data from client (script.js) to server (server.js)
	$.ajax({

		//All data is packed into a single request with the following information:
		//URL to be destined for this request
		url: 'http://localhost:9010/',
		//editor-code from 2nd CodeMirror frame, which is inside a JSON
		data: { "message": editor_code },
		//Request method
		type: 'POST',
		//Defining the type of the data (editor-code)
		dataType: 'json',
		
		//If the sending process was successful, then execute the following function with the received data from the server
		success: function (data) {
			
			//Change the editor's iframe directly by giving it the right URL (localhost:9011)
			document.getElementById('code_result_editor').src = data.link;
		},
		
		//If the sending process failed, then execute the following function
		error: function (xhr, status, error) {
			
			//Printing the error into the console of the client (web browser)
			console.log('Error: ' + error.message);
		},
	});
}







//"Load Viewer-CodeMirror"-Buttons' function
// to retrieve the content of URL & place it into 2nd CodeMirror frame (viewer part)
function getSrcintoViewer() {
	
	//Retrieve the whole URL from the input of the viewer section
	var url_viewer = document.getElementById("url-viewer-input").value;

	//Using the Fetch API to retrieve the content of the URL's website
	fetch(url_viewer)
	
		//1st operation after successful retrieval
		.then(x => {
		
			//return the whole content in plain text form
			return x.text();
		
		//2nd operation directly after the 1st one
		}).then(y => {
		
			//Change the whole 2nd CodeMirror frame (viewer part) with the retrieved content
			document.querySelectorAll(".CodeMirror")[1].CodeMirror.setValue(y);
		});
};

//"Reload Viewer"-button's function
//to update the viewer-iframe
function reloadViewer() {
	
	//Retrieve the viewer-code from 2nd CodeMirror frame
	var viewer_code = editor2.getValue();

	//Using AJAX with JQuery to send all data from client (script.js) to server (server.js)
	$.ajax({
		
		//All data is packed into a single request with the following information:
		//URL to be destined for this request
		url: 'http://localhost:9012/',
		//viewer-code from 2nd CodeMirror frame, which is inside a JSON
		data: { "message": viewer_code },
		//Request method
		type: 'POST',
		//Defining the type of the data (viewer-code)
		dataType: 'json',
		
		//If the sending process was successful, then execute the following function with the received data from the server
		success: function (data) {
			
			//Change the viewer's iframe directly by giving it the right URL (localhost:9013)
			document.getElementById('code_result_viewer').src = data.link;
			
			
		},
		
		//If the sending process failed, then execute the following function
		error: function (xhr, status, error) {
			
			//Printing the error into the console of the client (web browser)
			console.log('Error: ' + error.message);
		},
	});
	
}






