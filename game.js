document.addEventListener('DOMContentLoaded', function() {
    // game status
    const gameState = {
        timeLeft: 60, 
        correctCount: 0,
        remainingItems: 50,
        wasteData: [], 
        usedIndexes: [], // used images
        totalCount: 0,
        timerInterval: null,
        isPlaying: false
    };
    
    const elements = {
        scoreDisplay: document.getElementById('score-display'),
        timer: document.querySelector('.timer'),
        remaining: document.querySelector('.remaining'),
        currentWaste: document.getElementById('current-waste'),
        recyclableBin: document.getElementById('recyclable-bin'),
        nonRecyclableBin: document.getElementById('non-recyclable-bin'),
        eWasteBin: document.getElementById('e-waste-bin'),
        startButton: document.getElementById('start-button'),
        restartButton: document.getElementById('restart-button'),
        gameOver: document.getElementById('game-over'),
        correctCount: document.getElementById('correct-count'),
        timeUsed: document.getElementById('time-used'),
        leaderboardTable: document.querySelector('#leaderboard-table tbody')
    };

    function updateScoreDisplay() {
        const percentage = (gameState.totalCount > 0) 
            ? Math.round((gameState.correctCount / gameState.totalCount) * 100) 
            : 0;
        
        elements.scoreDisplay.textContent = `Score: ${gameState.correctCount} (${percentage}%)`;
    }


    function initWasteData() {
        gameState.wasteData = generateWasteItems();
    }

    function generateWasteItems() {
        return [
            // recyclable waste (15)
            { image: 'images/plastic-bottle.jpg', type: 'recyclable' },
            { image: 'images/paper.jpg', type: 'recyclable' },
            { image: 'images/glass-bottle.jpg', type: 'recyclable' },
            { image: 'images/can.jpg', type: 'recyclable' },
            { image: 'images/newspaper.jpg', type: 'recyclable' },
            { image: 'images/bottle_beer.jpg', type: 'recyclable' },
            { image: 'images/papper_bag.jpg', type: 'recyclable' },
            { image: 'images/p_bottle.jpg', type: 'recyclable' },
            { image: 'images/can_1.jpg', type: 'recyclable' },
            { image: 'images/zhike.jpg', type: 'recyclable' },
            { image: 'images/xizipan.jpg', type: 'recyclable' },
            
            
            
            // // non-recyclable waste (15)
            { image: 'images/more/fluorescent_tube1.jpg', type: 'non-recyclable' },
            { image: 'images/more/fluorescent_tube2.jpg', type: 'non-recyclable' },
            { image: 'images/more/fluorescent_tube3.jpg', type: 'non-recyclable' },
            { image: 'images/more/fluorescent_tube4.jpg', type: 'non-recyclable' },
            { image: 'images/more/fluorescent_tube5.jpg', type: 'non-recyclable' },
            { image: 'images/more/fridge1.jpg', type: 'non-recyclable' },
            { image: 'images/more/fridge2.jpg', type: 'non-recyclable' },
            { image: 'images/more/fridge3.jpg', type: 'non-recyclable' },
            { image: 'images/more/fridge4.jpg', type: 'non-recyclable' },
            { image: 'images/more/fridge5.jpg', type: 'non-recyclable' },
            { image: 'images/more/fridge6.jpg', type: 'non-recyclable' },
            { image: 'images/more/fridge7.jpg', type: 'non-recyclable' },
            { image: 'images/more/fridge8.jpg', type: 'non-recyclable' },
            { image: 'images/more/fridge9.jpg', type: 'non-recyclable' },
            { image: 'images/more/laptop1.jpg', type: 'non-recyclable' },
            { image: 'images/more/laptop2.jpg', type: 'non-recyclable' },
            { image: 'images/more/laptop3.jpg', type: 'non-recyclable' },
            { image: 'images/more/laptop4.jpg', type: 'non-recyclable' },
            { image: 'images/more/laptop5.jpg', type: 'non-recyclable' },
            { image: 'images/more/laptop6.jpg', type: 'non-recyclable' },
            { image: 'images/more/laptop8.jpg', type: 'non-recyclable' },
            { image: 'images/more/laptop9.jpg', type: 'non-recyclable' },
            { image: 'images/more/light_bulb1.jpg', type: 'non-recyclable' },
            { image: 'images/more/light_bulb2.jpg', type: 'non-recyclable' },
            { image: 'images/more/light_bulb4.jpg', type: 'non-recyclable' },
            { image: 'images/more/light_bulb5.jpg', type: 'non-recyclable' },
            { image: 'images/more/light_bulb7.jpg', type: 'non-recyclable' },
            { image: 'images/more/light_bulb8.jpg', type: 'non-recyclable' },
            { image: 'images/more/light_bulb9.jpg', type: 'non-recyclable' },
            { image: 'images/more/light_bulb10.jpg', type: 'non-recyclable' },
            { image: 'images/more/light_bulb11.jpg', type: 'non-recyclable' },
            { image: 'images/more/phone1.jpg', type: 'non-recyclable' },
            { image: 'images/more/phone2.jpg', type: 'non-recyclable' },
            { image: 'images/more/phone3.jpg', type: 'non-recyclable' },
            { image: 'images/more/phone4.jpg', type: 'non-recyclable' },
            { image: 'images/more/phone5.jpg', type: 'non-recyclable' },
            { image: 'images/more/phone6.jpg', type: 'non-recyclable' },
            { image: 'images/more/phone7.jpg', type: 'non-recyclable' },
            
            
            // // e-waste (20)
            { image: 'images/battery.jpg', type: 'e-waste' },
            { image: 'images/old_phones.jpg', type: 'e-waste' },
            { image: 'images/old_computers.jpg', type: 'e-waste' },
            { image: 'images/old_printers.jpg', type: 'e-waste' },
            { image: 'images/electroplx.jpg', type: 'e-waste' },
            { image: 'images/air_conditioner.jpg', type: 'e-waste' },
            { image: 'images/chargers.jpg', type: 'e-waste' },
            { image: 'images/digital_cameras.jpg', type: 'e-waste' },
            { image: 'images/earphones.jpg', type: 'e-waste' },
            { image: 'images/electric cooker.jpg', type: 'e-waste' },
            { image: 'images/fax_machines.jpg', type: 'e-waste' },
            { image: 'images/microwaves.jpg', type: 'e-waste' },
            { image: 'images/remote_controls.jpg', type: 'e-waste' },
            { image: 'images/routers.jpg', type: 'e-waste' },
            { image: 'images/TVs.jpg', type: 'e-waste' },
            { image: 'images/washing_machine.jpg', type: 'e-waste' },
            { image: 'images/smartwatches.jpg', type: 'e-waste' }
            
            
        ];
    }
    
    function setupDragEvents() {
        elements.currentWaste.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.dataset.type);
        });

        [elements.recyclableBin, elements.nonRecyclableBin, elements.eWasteBin].forEach(bin => {
            bin.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.style.transform = 'scale(1.1)';
            });

            bin.addEventListener('dragleave', function() {
                this.style.transform = 'scale(1)';
            });

            bin.addEventListener('drop', function(e) {
                e.preventDefault();
                this.style.transform = 'scale(1)';
                
                if (gameState.isPlaying) {
                    const wasteType = e.dataTransfer.getData('text/plain');
                    const binType = this.dataset.type;
                    
                    if (wasteType === binType) {
                        gameState.correctCount++;
                        showCorrectFeedback();
                    }else{
                        showWrongFeedback();
                    }
                    
                    gameState.remainingItems--;
                    updateRemainingDisplay();
        
                    if (e.dataTransfer.getData('text/plain') === this.dataset.type) {
                        console.log("√");
                        gameState.correctCount++;
                    } else {
                        console.log("×");
                    }

                    const isCorrect = (wasteType === binType);
                    if (isCorrect) {
                        this.style.boxShadow = '0 0 15px green'; 
                        gameState.correctCount++;
                    } else {
                        this.style.boxShadow = '0 0 15px red';   
                    }
        
                    setTimeout(() => {
                        this.style.boxShadow = 'none';
                    }, 1000);
                    
                    // display nest one
                    if (gameState.remainingItems > 0 && gameState.timeLeft > 0) {
                        updateScoreDisplay();
                        showNextWaste();
                    } else {
                        endGame();
                    }
                }
                
            });
        });
    }

    function showCorrectFeedback() {
        const feedback = document.createElement('div');
        feedback.className = 'feedback-correct';
        feedback.textContent = '✓ Correct! +3';
        document.body.appendChild(feedback);
        
        feedback.style.position = 'fixed';
        feedback.style.top = '50%';
        feedback.style.left = '50%';
        feedback.style.transform = 'translate(-50%, -50%)';
        feedback.style.fontSize = '4rem';
        feedback.style.color = '#4CAF50';
        feedback.style.fontWeight = 'bold';
        feedback.style.zIndex = '1000';
        feedback.style.pointerEvents = 'none';
        
        feedback.animate([
            { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' },
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1.2)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        // automatic remove element
        setTimeout(() => {
            feedback.remove();
        }, 800);
    }

    function showWrongFeedback() {
        const feedback = document.createElement('div');
        feedback.className = 'feedback-wrong';
        feedback.textContent = '✗ Wrong!';
        document.body.appendChild(feedback);
        
        // red display
        feedback.style.position = 'fixed';
        feedback.style.top = '50%';
        feedback.style.left = '50%';
        feedback.style.transform = 'translate(-50%, -50%)';
        feedback.style.fontSize = '4rem';
        feedback.style.color = '#F44336';
        feedback.style.fontWeight = 'bold';
        feedback.style.zIndex = '1000';
        feedback.style.pointerEvents = 'none';
        
        feedback.animate([
            { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' },
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1.2)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        setTimeout(() => {
            feedback.remove();
        }, 800);
    }

    
    function initGame() {
        gameState.timeLeft = 60;
        gameState.correctCount = 0;
        gameState.remainingItems = 50;
        gameState.usedIndexes = [];
        gameState.isPlaying = true;
        
        updateTimerDisplay();
        updateRemainingDisplay();
        showNextWaste();
        
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
        }
        gameState.timerInterval = setInterval(updateTimer, 1000);
        
        elements.gameOver.style.display = 'none';
    }
    
    function showNextWaste() {
        if (gameState.remainingItems <= 0 || !gameState.isPlaying) {
            endGame();
            return;
        }
        
        let availableItems = gameState.wasteData.filter((_, index) => !gameState.usedIndexes.includes(index));
        
        if (availableItems.length === 0) {
            gameState.usedIndexes = [];
            availableItems = [...gameState.wasteData];
        }
        
        const randomIndex = Math.floor(Math.random() * availableItems.length);
        const wasteItem = availableItems[randomIndex];
        
        const actualIndex = gameState.wasteData.findIndex(item => 
            item.image === wasteItem.image && item.type === wasteItem.type
        );
        gameState.usedIndexes.push(actualIndex);
        elements.currentWaste.dataset.type = wasteItem.type;
        
        elements.currentWaste.style.backgroundImage = `url(${wasteItem.image})`;
        elements.currentWaste.dataset.type = wasteItem.type;
    }
    
    function updateTimerDisplay() {
        const minutes = Math.floor(gameState.timeLeft / 60);
        const seconds = gameState.timeLeft % 60;
        elements.timer.textContent = `time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    function updateRemainingDisplay() {
        elements.remaining.textContent = `rest : ${gameState.remainingItems}`;
    }
    
    function updateTimer() {
        gameState.timeLeft--;
        updateTimerDisplay();
        
        if (gameState.timeLeft <= 0) {
            endGame();
        }
    }
    
    function endGame() {
        clearInterval(gameState.timerInterval);
        gameState.isPlaying = false;
        
        const timeUsed = 60 - gameState.timeLeft;
        const minutes = Math.floor(timeUsed / 60);
        const seconds = timeUsed % 60;
        const formattedTimeUsed = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        elements.correctCount.textContent = gameState.correctCount;
        elements.timeUsed.textContent = formattedTimeUsed;
        elements.gameOver.style.display = 'block';
        
        saveToLeaderboard(gameState.correctCount, timeUsed);
        
        updateLeaderboard();
    }
    
    function saveToLeaderboard(score, timeUsed) {
        const now = new Date();
        const entry = {
            score: score,
            time: timeUsed,
            date: now.toLocaleString()
        };
        
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        
        leaderboard.push(entry);
        
        leaderboard.sort((a, b) => {
            if (a.score !== b.score) {
                return b.score - a.score;
            } else {
                return a.time - b.time;
            }
        });
        
        // only display first 10
        leaderboard = leaderboard.slice(0, 10);
        
        // store in localStorage
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        console.log("leaderboard updated:", leaderboard);
    }
    
    function updateLeaderboard() {
        elements.leaderboardTable.innerHTML = '';
        
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        console.log("load leaderboard data:", leaderboard);
        
        if (leaderboard.length === 0) {
            elements.leaderboardTable.innerHTML = '<tr><td colspan="4">no history </td></tr>';
            return;
        }
        
        leaderboard.forEach((entry, index) => {
            const row = document.createElement('tr');
            
            const rankCell = document.createElement('td');
            rankCell.textContent = index + 1;
            row.appendChild(rankCell);
            
            const scoreCell = document.createElement('td');
            scoreCell.textContent = entry.score;
            row.appendChild(scoreCell);
            
            const minutes = Math.floor(entry.time / 60);
            const seconds = entry.time % 60;
            const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            const timeCell = document.createElement('td');
            timeCell.textContent = timeString;
            row.appendChild(timeCell);
            
            const dateCell = document.createElement('td');
            dateCell.textContent = entry.date;
            row.appendChild(dateCell);
            
            elements.leaderboardTable.appendChild(row);
        });
    }
    elements.startButton.addEventListener('click', function() {
        initGame();
        this.style.display = 'none';
    });
    elements.restartButton.addEventListener('click', function() {
        initGame();
        elements.gameOver.style.display = 'none';
    });
    function initApp() {
        initWasteData();
        setupDragEvents();
        updateLeaderboard(); 
    }
    initApp();
})
