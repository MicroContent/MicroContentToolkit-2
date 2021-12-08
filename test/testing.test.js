// The file where we test dome of our exported functions from the file 'testing.js'


// We get the exported functions and gather them all into 1 module called 'myModule'
const myModule = require('./testing.js')
const method1 = myModule.method1
const method2 = myModule.method2
const method3 = myModule.method3
const method4 = myModule.method4


test('Testing whether the function will get the whole HTML code with the HTML tags', () => {
  expect(method3()).toBe('<div>Question:</div>');
});

// if you want to test if the function retrieves null, use the code below:

// test('Testing whether the function will get the whole HTML code with the HTML tags', () => {
//   expect(method3()).toBe(null);
// });

test('Testing whether the function will get the whole HTML code with the HTML tags', () => {
  expect(method4()).toBe('<article>Title:</article>');
});

test('Testing if the function will retrieve only the text (without the HTML tags)', () => {
  expect(method1()).toBe('Question:');
});

test('Testing if the function will retrieve only the text (without the HTML tags)', () => {
  expect(method2()).toBe('Title:');
});
