
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rage Game</title>
    <link rel="stylesheet" href="css/rage.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>
<body>
    <header>
        <menu id="nav-menu">
            <li><a href="#title">About</a></li>
            <li><a href="#gamecanvas">Play</a></li>
            <li ><a href="#Gameplay">Gameplay</a></li>
            
        </menu>
    </header>
    <section id="title">
        <h1>Rage Game</h1>
    </section>
    <main>
        <h2>About Game</h2>
        <p>
            Box finds itself in a land full of obstacles. It has to survive in this strange land and gather as many coins as possible. 
        </p>
        <p> Enjoy the game!</p>
    </main>
    <section>
        <div>
        <canvas id="gamecanvas" ></canvas>
        </div>
        <p id="start" onclick="start()">Start Game</p>
        <div style="text-align:center;">
            <button onmousedown="moveUp()"  onmouseup="clearMove()" ontouchstart="moveUp()">Up</button><br><br>
            <button onmousedown="moveLeft()" onmouseup="clearMove()" ontouchstart="moveLeft()">Left</button>
            <button onmousedown="moveRight()"  onmouseup="clearMove()" ontouchstart="moveRight()">Right</button><br><br>
            <button onmousedown="moveDown()"  onmouseup="clearMove()" ontouchstart="moveDown()">Down</button>
        </div>
        <p id="start" onclick="pause()">Pause Game</p>
    </section>
    <main id="Gameplay">
        <h2>Gameplay</h2>
        <p>
            Move box Up and Down with the use of the "Up" and "Down" scroll buttons to dodge the box obstacles.
        </p>
        <p>
            Everytime box collides with a box obstacle, box's life is reduced by 1/3.
            When the live becomes 0, the game ends.
            You can collect "red balls" to increase life by 1/3.
        </p>
        <p>
            At the end of the game, the final score is the maximum of
            the raw score or the raw score multiplied by the number of coins.
        </p>
        <h3>Game Moves</h3>
        <ul>
            <li>Arrow Up - Move box up</li>
            <li>Arrow Down - Move box down</li>
            <li>Arrow Left - Move box to start horizontal position</li>
            <li>Arrow Right - Move box to a fixed position forward</li>
        </ul>

        <h3>Game States</h3>
        <ul>
            <li>Start Game - Enter</li>
            <li>Play/Pause - Escape</li>
        </ul>
        
    </main>
    <footer>
        <p> Copyright <span> <i class="fa fa-copyright"></i> </span> Nathan Awuku Amoako 2024</p>

    </footer>

    <script src="js/rage.js"></script>
</body>
</html>
