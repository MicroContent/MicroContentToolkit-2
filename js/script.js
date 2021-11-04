let input = document.querySelector("#first_i")

let textarea = document.querySelector("#live")

// This event listener has been implemented to identify a
// Change in the input section of the html code
// It will be triggered when a file is chosen.
input.addEventListener('change', () => {
	let files = input.files;

	if (files.length == 0) return;

	/* If any further modifications have to be made on the
	Extracted text. The text can be accessed using the
	file variable. But since this is const, it is a read
	only variable, hence immutable. To make any changes,
	changing const to var, here and In the reader.onload
	function would be advisible */
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
	function would be advisible */
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