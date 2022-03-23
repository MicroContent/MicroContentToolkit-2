// This is the file where we hardcoded some of the main functions from the 'script.js' file.



//Button's function to load the editor code into 1st CodeMirror frame
function reloadEditor() {
	//Retrieve the editor-code from 1st CodeMirror frame
	var CodeMirror_code = loadFileAsTextEditor();

	// Checking whether the function loadFileAsTextEditor() has retrieved any value or it is null (no value)
	if (CodeMirror_code != null ) {
		// if value is found, then removing all HTML tags and leaving only the plain text
		var editor_code = CodeMirror_code.replace('<div>','');
		var clear_code = editor_code.replace('</div>','');
		return clear_code;
	} else {
		// if value is not found, then it returns null
		return null;
	}
}


//Button's function to load the editor code into 2nd CodeMirror frame
function reloadViewer() {
	//Retrieve the editor-code from 2nd CodeMirror frame
	var CodeMirror_code = loadFileAsTextViewer();

	// Checking whether the function loadFileAsTextViewer() has retrieved any value or it is null (no value)
	if (CodeMirror_code != null ) {
		// if value is found, then removing all HTML tags and leaving only the plain text
		var editor_code = CodeMirror_code.replace('<article>','');
		var clear_code = editor_code.replace('</article>','');
		return clear_code;
	} else {
		// if value is not found, then it returns null
		return null;
	}
}


//Function to load the editor code into 1st CodeMirror frame
function loadFileAsTextEditor () {
	return '<div>Question:</div>';
	// If we want to test the returning of null value, then test the return code below:
	// return null
}

//Function to load the editor code into 2nd CodeMirror frame
function loadFileAsTextViewer () {
	return '<article>Title:</article>';
	// If we want to test the returning of null value, then test the return code below:
	// return null                
}

// Place where we export all of the functions from this file in order to test them in the testing.test.js file
// Each function has a name and we export it as a method to the other file
exports.method1 = reloadEditor
exports.method2 = reloadViewer
exports.method3 = loadFileAsTextEditor
exports.method4 = loadFileAsTextViewer