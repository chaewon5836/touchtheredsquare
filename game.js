document.addEventListener('DOMContentLoaded', (event) => {
    const targets = [document.getElementById('blueTarget'), document.getElementById('yellowTarget'),
                     document.getElementById('greenTarget'), document.getElementById('purpleTarget'),
                     document.getElementById('pinkTarget'), document.getElementById('orangeTarget'),
                     document.getElementById('limeTarget'), document.getElementById('blackTarget')];
    const redTarget = document.getElementById('target');
    const scoreDisplay = document.getElementById('score');
    const gameOverText = document.getElementById('gameOver');
    let score = 0;
    let isGameOver = false; 
    let activeTargets = 0; 

    function moveTarget(target) {
        const gameArea = document.getElementById('gameArea');
        let x, y;

        do {
            x = Math.floor(Math.random() * (gameArea.clientWidth - target.clientWidth));
            y = Math.floor(Math.random() * (gameArea.clientHeight - target.clientHeight));
        } while (Array.from(document.getElementsByClassName('target')).some(el => isOverlapping(x, y, target.clientWidth, target.clientHeight, el) && el !== target));

        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    }

    function isOverlapping(x, y, width, height, targetElement) {
        const targetRect = targetElement.getBoundingClientRect();
        const newRect = {
            left: x,
            top: y,
            right: x + width,
            bottom: y + height
        };

        return !(newRect.right < targetRect.left ||
                 newRect.left > targetRect.right ||
                 newRect.bottom < targetRect.top ||
                 newRect.top > targetRect.bottom);
    }

    function activateNextTarget() {
        if (score >= 100 * (activeTargets + 1) && activeTargets < targets.length) {
            const newTarget = targets[activeTargets];
            newTarget.style.display = 'block';
            moveTarget(newTarget);
            newTarget.addEventListener('click', () => endGame()); 
            activeTargets++;
        }
    }

    redTarget.addEventListener('click', () => {
        if (isGameOver) return; 

        score++;
        scoreDisplay.textContent = score;
        moveTarget(redTarget);  
        
        targets.slice(0, activeTargets).forEach(target => moveTarget(target));
        
        activateNextTarget();
    });

    function endGame() {
        isGameOver = true;
        gameOverText.style.display = 'block';
        redTarget.style.display = 'none';
        targets.forEach(target => target.style.display = 'none');
    }

    moveTarget(redTarget); 
    
    targets.forEach(target => {
        target.addEventListener('click', () => {
            if (!isGameOver) endGame(); 
        });
    });
});
