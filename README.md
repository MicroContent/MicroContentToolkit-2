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
  <li> Data section: Visually represents the data that is being sent from viewer to editor in a user friendly way</li>
</ul>

Used libraries:<br>
  For the live code editor: https://codemirror.net/  ; https://github.com/codemirror/CodeMirror/blob/master/LICENSE<br>
  For the inheritance and message sending: https://www.npmjs.com/package/seamless   ; https://github.com/travist/seamless.js/blob/master/LICENSE.txt<br>
  For the server: https://nodejs.org/en/<br>
  
  <br><br>
Source Code for testing:
  <br>

<h1>How to use</h1>
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
<h2>Setup</h2>
<ol>
  <li> </li>
  
</ol>
