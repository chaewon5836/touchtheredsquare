document.addEventListener('DOMContentLoaded', (event) => {
    const target = document.getElementById('target');
    const scoreDisplay = document.getElementById('score');
    let score = 0;

    function moveTarget() {
        const gameArea = document.getElementById('gameArea');
        const x = Math.floor(Math.random() * (gameArea.clientWidth - target.clientWidth));
        const y = Math.floor(Math.random() * (gameArea.clientHeight - target.clientHeight));
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    }

    target.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
        moveTarget();
    });

    moveTarget();
});
