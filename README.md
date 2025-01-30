<h1> Wurdle Royale </h1>
A multiplayer version of Wordle

<h1> Technologies Used </h1>
<ul>
  <li> App managed with Flask server </li>
  <li> Docker for containerization </li>
  <li> MongoDB for data storage and management </li>
  <li> WebSockets for live multiplayer communication </li>
</ul>

<h1> How to run </h1>
<ul>
  <li> Ensure you have Docker installed </li>
  <li> Run <pre><code>docker compose up --build </code></pre> </li>
  <li> Navigate to http://localhost:8080/ </li>
</ul>

<h1> How to Play </h1>
To play the game, you need to be logged in and have a registered account.
<br><br>
<ol>
  <li> Press the start button to start the timer, you can then start guessing words within the time limit </li>
  <li> Press ENTER to send in your guess. The number of points rewarded are inversely proportional to your number of guesses </li>
  <li> Once the timer ends, the leaderboard will update if you scored higher than your previous score </li>
</ol>

For testing purposes, you can see the answer in the console.

<h1> Other Features </h1>
<ul>
  <li> Registered users can communicate with others via the chat </li>
  <li> Registered users have the ability to change their profile picture by clicking their profile </li>
</ul>
