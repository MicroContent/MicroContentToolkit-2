let input = document.querySelector("#first_i")

let textarea = document.querySelector("#live")

let input2 = document.querySelector("#second_i")

let textarea2 = document.querySelector("#live2")


////////////////////Kevin's Part//////////////////////////////////////////////////////////////
function loadFileAsText() {
	var fileToLoad = document.getElementById("first_i").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function (fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.querySelector(".CodeMirror").CodeMirror.setValue(textFromFileLoaded);
	};

	fileReader.readAsText(fileToLoad, "UTF-8");
}
////////////////////////////////////////////////////////////////////////////////////////////////

function loadFileAsText2() {
	var fileToLoad = document.getElementById("second_i").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function (fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.querySelectorAll(".CodeMirror")[1].CodeMirror.setValue(textFromFileLoaded);
	};

	fileReader.readAsText(fileToLoad, "UTF-8");
}

////////////////////////////////////////////////////////////////////////////////////////
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
}

var button = document.getElementById('save1');
button.addEventListener('click', saveTextAsFile);

function destroyClickedElement(event) {
	// remove the link from the DOM
	document.body.removeChild(event.target);
}




function saveTextAsFile2() {
	var textToWrite = editor2.getValue();
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
}

var button = document.getElementById('save2');
button.addEventListener('click', saveTextAsFile2);

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


function getWebURL() {
	// Selecting the input element and get its value
	 
	
	
	var webURL = document.getElementById("myWebsite").value;
	document.getElementById('code_result').src = webURL;
	// Turns the iframe into a seamless iframe.
	window.seamless(document.getElementById('code_result'));
};






