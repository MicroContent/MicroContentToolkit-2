//Button's function to load the editor code into 1st CodeMirror frame
function loadFileAsTextEditor() {
	
	//The loaded plugin-file from the editor section
	var fileToLoad = document.getElementById("input_file_editor").files[0];
	
	//Read the file,
	//extract the content out of it,
	//Put the content directly into the 1st CodeMirror frame
	var fileReader = new FileReader();
	fileReader.readAsText(fileToLoad, "UTF-8");
	fileReader.onload = function (fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.querySelector(".CodeMirror").CodeMirror.setValue(textFromFileLoaded);
		reloadEditor();
		initIframeEditor();
	};
}

//Button's function to load the viewer code into 2nd CodeMirror frame
function loadFileAsTextViewer() {
	
	//The loaded file from the viewer section
	var fileToLoad = document.getElementById("input_file_viewer").files[0];

	//Read the file,
	//extract the content out of it,
	//Put the content directly into the 2nd CodeMirror frame
	var fileReader = new FileReader();
	fileReader.readAsText(fileToLoad, "UTF-8");	
	fileReader.onload = function (fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.querySelectorAll(".CodeMirror")[1].CodeMirror.setValue(textFromFileLoaded);
		reloadViewer();
		initIframeViewer();
	};
}

/**
 * Function to save the code from CodeMirror frame locally as a HTML file
 * @param isEditor indicates whether editor or viewer code should be downloaded
 */
function saveTextAsFile(isEditor) {
	const textToWrite = isEditor ? editor.getValue() : editor2.getValue();
	const fileNameToSaveAs = isEditor? "editor.html": "viewer.html"; //filename.extension
	const textFileAsBlob = new Blob([textToWrite], { type: 'html' });

	const downloadLink = document.createElement("a");
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
function loadCodemirrorFromUrl(isEditor) {
	const elementId = isEditor ? "input_url_editor" : "input_url_viewer";
	const index = isEditor ? 0 : 1;
	
	//Retrieve the whole URL from the input of the editor section
	const url_editor = document.getElementById(elementId).value;
	
	//Using the Fetch API to retrieve the content of the URL's website
	fetch(url_editor)
		
		//1st operation after successful retrieval
		.then(response => {
		
			//return the whole content in plain text form
			return response.text();
		
		//2nd operation directly after the 1st one
		}).then(text => {
		
			//Change the whole 1st CodeMirror frame (editor part) with the retrieved content
			document.querySelectorAll(".CodeMirror")[index].CodeMirror.setValue(text);

		});
}

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
			document.getElementById('iframe_editor').src = data.link;
		},
		
		//If the sending process failed, then execute the following function
		error: function (xhr, status, error) {
			
			//Printing the error into the console of the client (web browser)
			console.log('Error: ' + error.message);
		},
	});
}

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
			document.getElementById('iframe_viewer').src = data.link;
			
			
		},
		
		//If the sending process failed, then execute the following function
		error: function (xhr, status, error) {
			
			//Printing the error into the console of the client (web browser)
			console.log('Error: ' + error.message);
		},
	});
	
}






