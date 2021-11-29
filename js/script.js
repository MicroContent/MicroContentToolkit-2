let input = document.querySelector("#first_i")
let textarea = document.querySelector("#live")
let input2 = document.querySelector("#second_i")
let textarea2 = document.querySelector("#live2")


function loadFileAsText() {
	var fileToLoad = document.getElementById("first_i").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function (fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.querySelector(".CodeMirror").CodeMirror.setValue(textFromFileLoaded);
	};

	fileReader.readAsText(fileToLoad, "UTF-8");
}

function loadFileAsText2() {
	var fileToLoad = document.getElementById("second_i").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function (fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.querySelectorAll(".CodeMirror")[1].CodeMirror.setValue(textFromFileLoaded);
	};

	fileReader.readAsText(fileToLoad, "UTF-8");
};

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

function destroyClickedElement(event) {
	// remove the link from the DOM
	document.body.removeChild(event.target);
};


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


function destroyClickedElement(event) {
	// remove the link from the DOM
	document.body.removeChild(event.target);
}

//Processing Data
function getData() {
	var data = { title: 'no data found' };
	var url = window.location.href;
	var regex = new RegExp('[?&]data(=([^&#]*)|&|#|$)');
	var results = regex.exec(url);
	if (results && results[2]) {
		data = JSON.parse(decodeURIComponent(results[2].replace(/\+/g, ' ')));
	}
	return data;
}

//Processing the URL
function getViewerUrl() {
	var viewerUrl = 'http://localhost:80';
	var url = window.location.href;
	var regex = new RegExp('[?&]url(=([^&#]*)|&|#|$)');
	var results = regex.exec(url);
	if (results && results[2]) {
		viewerUrl = decodeURIComponent(results[2].replace(/\+/g, ' '));
	}
	return viewerUrl;
}


//Putting the src code of editor plugin into the CodeMirror-Editor section
function getSrcintoEditor() {
	//Raw code from internet
	var url_editor = document.getElementById("url-editor-input").value;

	fetch(url_editor)
		.then(x => {
			return x.text();

		}).then(y => {
			document.querySelector(".CodeMirror").CodeMirror.setValue(y);

		});
};

//Reload button to update the iframe
function reloadEditor() {
	var editor_code = editor.getValue();

	$.ajax({
		url: 'http://localhost:9010/',
		data: { "message": editor_code },
		type: 'POST',
		dataType: 'json',
		success: function (data) {
			document.getElementById('code_result_editor').src = data.link;
			//window.seamless(document.getElementById('code_result_editor'));
		},

		error: function (xhr, status, error) {
			console.log('Error: ' + error.message);
		},
	});
}


//Putting the src code of viewer plugin into the CodeMirror-Viewer section
function getSrcintoViewer() {
	//Raw code from internet
	var url_viewer = document.getElementById("url-viewer-input").value;

	fetch(url_viewer)
		.then(x => {
			return x.text();
		}).then(y => {
			document.querySelectorAll(".CodeMirror")[1].CodeMirror.setValue(y);
		});
};

//Reload button to update the iframe
function reloadViewer() {
	var editor_code = editor2.getValue();

	$.ajax({
		url: 'http://localhost:9012/',
		data: { "message": editor_code },
		type: 'POST',
		dataType: 'json',
		success: function (data) {
			document.getElementById('code_result_viewer').src = data.link;
			//window.seamless(document.getElementById('code_result_viewer'));
		},

		error: function (xhr, status, error) {
			console.log('Error: ' + error.message);
		},
	});
}




