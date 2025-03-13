<h1> Wurdle Royale </h1>
A multiplayer version of Wordle

<h1> Technologies Used </h1>
<ul>
  <li> Flask: Backend server management </li>
  <li> Docker: Containerization for ease of deployment </li>
  <li> MongoDB: Data storage and management </li>
  <li> WebSockets: Real-time multiplayer communication </li>
</ul>

<h1> How to run </h1>
<ul>
  <li> Ensure Docker is installed on your machine </li>
  <li> Run the following command to start the application: <pre><code>docker compose up --build </code></pre> </li>
  <li> Open your browser and navigate to: http://localhost:8080/ </li>
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

<h1> Additional Features </h1>
<ul>
  <li> In-Game Chat: Registered users can chat with other players during gameplay </li>
  <li> Profile Customization: Users can update their profile picture by clicking on their profile icon </li>
</ul>
