# Primary-repo
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
  <li> DATA section: Visually represents the data that is being sent from viewer to editor in a user friendly way</li>
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
  <p> For more information visit the seamless documentation.</p>
  https://github.com/travist/seamless.js#readme
  <p> For an example for our system see the example plugins and test them with the system.</p>
</ul>
