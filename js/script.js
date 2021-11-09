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
	var textFileAsBlob = new Blob([ textToWrite ], { type: 'html' });
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
	var textFileAsBlob = new Blob([ textToWrite ], { type: 'html' });
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
// This event listener has been implemented to identify a
// Change in the input section of the html code
// It will be triggered when a file is chosen.
/*
input.addEventListener('change', () => {

	let files = input.files;

	if (files.length == 0) return;

	/* If any further modifications have to be made on the
	Extracted text. The text can be accessed using the
	file variable. But since this is const, it is a read
	only variable, hence immutable. To make any changes,
	changing const to var, here and In the reader.onload
	function would be advisible
	const file = files[0];

	let reader = new FileReader();

	reader.onload = (e) => {
		const file = e.target.result;

		// This is a regular expression to identify carriage
		// Returns and line breaks
		const lines = file.split(/\r\n|\n/);
		textarea.value = lines.join('\n');

	};

	reader.onerror = (e) => alert(e.target.error.name);

	reader.readAsText(file);
});


let input2 = document.querySelector("#second_i")

let textarea2 = document.querySelector("#live2")

// This event listener has been implemented to identify a
// Change in the input section of the html code
// It will be triggered when a file is chosen.
input2.addEventListener('change', () => {
	let files = input2.files;

	if (files.length == 0) return;

	/* If any further modifications have to be made on the
	Extracted text. The text can be accessed using the
	file variable. But since this is const, it is a read
	only variable, hence immutable. To make any changes,
	changing const to var, here and In the reader.onload
	function would be advisible
	const file = files[0];

	let reader = new FileReader();

	reader.onload = (e) => {
		const file = e.target.result;

		// This is a regular expression to identify carriage
		// Returns and line breaks
		const lines = file.split(/\r\n|\n/);
		textarea2.value = lines.join('\n');

	};

	reader.onerror = (e) => alert(e.target.error.name);

	reader.readAsText(file);
});
*/



