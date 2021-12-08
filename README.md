<h2>Table of Contents:</h2><br>
-[Short Description:](#short-description)<br>
-[Definitions-Main parts](#definitions-main-parts)<br>
-[How to use](#how-to-use)<br>
-[Usage](#usage)<br>
-[Start & Run the Server](#start-&-run-the-server)<br>
-[Setup your plugins](#setup-your-plugins)<br>
-[Components](#components)<br>
-[Testing with Jest](#testing-with-jest)<br>

<h1>Plugin System Toolkit</h1>
<h3>Short Description:</h3>
The purpose of the project was to build a plugin system/toolkit to help developers create new plugins in the proper form and test them before the real hosting, in addition to produce a hosting application for plugins. It also can help the host application operators to test foreign plug-ins and implement them into their working webpages.<br>

Main repository of the project

<h1>Definitions-Main parts</h1>
<ul>
  <li> Toolkit: The main part of the plugin system. It does most of the jobs and connects all the other parts</li>
  <li> Live editors: One for the viewer and one for the editor plugin. They are part of the toolkit as codemirror textfields</li>
  <li> Editor iframe: hosted by node; inside a seamless iframe that is running an editor plugin html file</li>
  <li> Viewer iframe: hosted by node; inside a seamless iframe that is running a viewer plugin html file</li>
  <li> DATA section: Visually represents the data in a user friendly way that is being sent from viewer to editor </li>
</ul>

Used libraries:<br>
  For the live code editor: https://codemirror.net/  ; https://github.com/codemirror/CodeMirror/blob/master/LICENSE<br>
  For the inheritance and message sending: https://www.npmjs.com/package/seamless   ; https://github.com/travist/seamless.js/blob/master/LICENSE.txt<br>
  For the server: https://nodejs.org/en/<br>
  
  <br><br>
Source Code for testing:
  <br>

<h1>How to use</h1>
<h2>Usage</h2>
<ol>
  <li> The user opens a plugin for the editor. They can do this via a link <code>Src-Code into Editor Section</code> or just by opening a local file <code>choose a file</code></li>
  <li> After entering the link or selecting a file, the user needs to load the code to the live editor with the respective buttons <code>Load Editor-Codemirror</code> <code>Load the first editor</code></li>
  <li> On the fly adjustments can be made in the live editor, saving time reopening files after every modification</li>
  <li> Next, the editor iframe can be loaded with the <code>Reload editor</code> button. </li>
  <li> Then, the user has to do the same process with the viewer plugin with the buttons found under the <code>Viewer</code> label.</li>
  <li> Depending on the type of plugin the user needs to input some data into the editor section</li>
  <li> With the button inside the iframe, the data is sent to the toolkit and being shown in the DATA section.</li>
  <li> In the DATA section using the <code>Send data to viewer</code> button, we send the data from the toolkit to the viewer iframe</li>
  <li> Also depending of the viewer plugin implementation, the data is shown accordingly.</li>
  <li> Finally, we can upload a stylesheet to match the look of the website where the plugin is developed to. After the file is uploaded, its content is shown in a placeholder text field. Next to that field with pushing the <code>Submit</code> button the style is injected.</li>
</ol>
<p> The user is also able to download the edited codes</p>
<p><b>To use the toolkit copy the directory to your computer</b></p>
<br>
<h2>Start & Run the Server</h2>
<ol>
  <li> <code>cd</code> to the <code>Primary-rep</code>-Folder with a Terminal or Powershell</li>
  <li> Check if the <code>server.js</code> and <code>package.json</code> are inside the <code>Primary-rep</code>-Folder </li>
  <li> Go to your Terminal/Powershell again and type <code>npm i</code></li>
  <li> Then type <code>node server.js</code></li>
  <li> Go to any browser and enter <a href="http://localhost:8080/">http://localhost:8080/</a></li>
</ol>
<p> You should then see the successfully loaded Content Plugin System.</p>

<br>
<h2>Setup your plugins</h2>
<p> The plugin consists of two parts. The editor and viewer, both a separate html file.</p>
<p> Editor-Viewer communication is being done through the toolkit with help of a server.</p>
<p> Therefor there are some adjustments the plugin developers need to make for the toolkit to work</p>
<ul>
  <li> Linking the seamless library from the toolkit libraries. Include this script in both plugin headers</li>
  
```
<script src='http://localhost:8080/node_modules/seamless/build/seamless.child.min.js'></script>
```
  
  <li> User needs to estabilish a connection between parents and children. Include this code in beginning of the body</li>
  
  ```
  var parent = window.seamless.connect({
            url: 'http://localhost:8080/',
            allowStyleInjection: true,
        }); 
  ```
  <li> The editor needs a seamless function to send data to the toolkit. This infomation can be sent according to the seamless documentaion</li>
  <p> Sending a title input and question input. More detailed code in demo-plugins folder</p>
  
```
  // Send a message
        window.sendToParent = function(event) {
                event.preventDefault();
                parent.send({
                    // type helps the parent recognise message type
                    type: 'toViewer',
                    // data you send to viewer
                    title: document.getElementById('title').value,
                    question : document.getElementById('question').value
                    });
                };
```
  
  <li> The toolkit can receive and handle any number of data</li>
  <li> The viewer needs a seamless function to receive this information. Here the receiving differs from typical seamless. The use needs to handle the data as <cd>data.main[0]</cd>. This is an array of arrays that if you loop through can get the desired information.</li>
  
  ```
  connection.receive(function(data) {
            switch(data.type) {
                case 'setContent':
                    // parent for varying type of input sends data as special object; data.main[0] is the array of arrays with your message inside
                    for (var i = 1; i < data.main[0].length+1; i++){
                        // fill your viewer content with the recieved things
                        if (data.main[0][i][0]==('title')) {
                            // gets the input from the title
                            document.getElementById('title').innerHTML = data.main[0][i][1];
                        }
                        else if (data.main[0][i][0]==('question')) {
                            document.getElementById('question').innerHTML = data.main[0][i][1];
                        }
                        
                        
                    } 
                    break;     
            }
            });
  ```
  
  <p> For more information visit the seamless documentation: https://github.com/travist/seamless.js#readme</p>
  <p> For an example for our system see the example plugins and test them with the system.</p>
</ul>

<h1>Components</h1>
<h2>LiveEdit.html</h2>
<p> Basically the main part of the whole toolkit. It contains the html of the toolkit and some functions for seamless and codemirror.</p>
<h3>Functions</h3>
<ul>
  <li><b>child2load: </b> This function is called when the reload editor is clicked. Transforms the iframe into seamless, but also contains another subroutine, handling the receiving of the data from the editor: Since the number of inputs depends on the editor, it handles the data as an object.</li>
  <li><b>child1load:</b> It is called when reloading the viewer iframe. Transforms the iframe into seamless, and a subfunction handles the data sending to the viewer. This function is called when the user clicked send data to viewer. The type of data is setContent; the viewer has to handle the message accordingly. The data can be accessed with data.main[0] as an array of arrays-(contentType:content); The other subfunction is a similar sending protocol but with different type because it is used for injection.</li>
  <li><b>loadData: </b> displays a user friendly representation of the sent data</li>
  <li><b>readFileAsString: </b> This function is placed outside the script file and immidiately after the button that triggers it. It reads the css file that is to be injected to the viewer. After reading it places it into a placeholder text field.</li>
  <li><b>Codemirror.fromTextAre: </b> is called in two places. This tranforms the simple textares to codemorror editors and sets the basic settings like autocorrection. The functionality of the codemirror parts is expandable.</li>
  <li><b>loadData: </b> displays a user friendly representation of the sent data</li>
</ul>
<h2>script.js</h2>
<p> Contains the scripts that are not strictly seamless related, more like server and buttonclicks.</p>
<h3>Functions</h3>
<ul>
  <li><b>loadFileAsText: </b></li>
  <li><b>saveTextAsFile: </b> This function is called when the respective button is clicked. Saves the editot or viewer plugins after the user edited it in the live editors</li>
</ul>

<h2>server.js</h2>
<p>Contains </p>
<h3>Functions</h3>
<ul>
    <li> </li>
</ul>

<h1>Testing with Jest</h1>
<p>To set it up:<p>
<ol>
  <li>You need to go to the testing folder <code>'test'</code></li>
  <li>Open the terminal and type the following command: <code>npm init</code> to install json folder inside</li>
  <li>Then type: <code>install --save-dev jest</code> -> now you shall see json folder <code>package-lock.json</code> inside</li>
  <li>Open <code>package.json</code> and change <code>"test":"test"</code> to <code>"test":"jest"</code></li>
  <li>Finally, to test the code, type in the terminal: <code>npm test</code> and it should run properly</li>
</ol>
<h3>Optional:</h3>
<p>If you want to keep track of all the functions, branches and line of execution and testing, you can:</p>
<ol>
  <li>Open once again <code>package.json</code> file</li>
  <li>Insted of writing <code>"test":"jest"</code>, you have to write <code>"test":"jest --coverage"</code></li>
</ol>
<p>Thus, when testing the code with <code>npm test</code>, you can now see a table with details about all the functions being tested. If you need more details and visualisations, you can go to the folder <code>coverage</code>. Then you open folder <code>lcov-report</code> and there you can see a file called <code>index.html</code>. When opening it in the browser, you can have a deeper look at the functions and when clicking on the testing file, you can see them visualised in code and whether a mistake is made.</p>
