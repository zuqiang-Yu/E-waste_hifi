document.addEventListener('DOMContentLoaded', function() {
    // game status
    const gameState = {
        timeLeft: 30, 
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
        returnToStartPageButton: document.getElementById('return-to-start-page-button'),
        correctCount: document.getElementById('correct-count'),
        timeUsed: document.getElementById('time-used'),
        leaderboardTable: document.querySelector('#leaderboard-table tbody'),
        startScreen: document.getElementById('start-screen'),
        gameScreen: document.getElementById('game-screen'),
        gameOverScreen: document.getElementById('game-over-screen'),
        gameOverTip: document.getElementById('game-over-tip')
    };

    const gameOverTips = [
        'E-waste is any electronic item that has reached the end of its life.',
        'E-waste is usually any item with a plug, battery or power cord.',
        'E-waste can contain hazardous chemicals or heavy metals like lead or mercury, so it should be disposed of properly.',
        'E-waste can contain valuable materials like gold, silver or platinum that can be recycled.',
        'You should recycle e-waste at e-waste collection programs or drop-off points.',
        'E-waste should never be thrown into regular landfill.',
    ];

    function updateScoreDisplay() {
        const percentage = (gameState.totalCount > 0) 
            ? Math.round((gameState.correctCount / gameState.totalCount) * 100) 
            : 0;
        
        elements.scoreDisplay.textContent = `Score: ${gameState.correctCount} (${percentage}%)`;
    }

    function preloadImages() {
        gameState.wasteData.map(item => {
            const img = new Image();
            img.onerror = () => {
                console.log("can't load image: " + img.src);
            }
            img.src = item.image;
        })
    }

    function initWasteData() {
        gameState.wasteData = generateWasteItems();
        preloadImages();
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
            { image: 'images/more/light_bulb1.jpg', type: 'non-recyclable' },
            { image: 'images/more/light_bulb2.jpg', type: 'non-recyclable' },
            { image: 'images/more/light_bulb4.jpg', type: 'non-recyclable' },
            { image: 'images/more/bag.jpg', type: 'non-recyclable' },
            { image: 'images/more/chips.jpg', type: 'non-recyclable' },
            { image: 'images/more/CN.jpg', type: 'non-recyclable' },
            { image: 'images/more/cup.jpg', type: 'non-recyclable' },
            { image: 'images/more/coffe_cup.jpg', type: 'non-recyclable' },
            { image: 'images/more/Foam_box.jpg', type: 'non-recyclable' },

            
            
            // // e-waste (20)
            { image: 'images/battery.jpg', type: 'e-waste' },
            { image: 'images/old_phones.jpg', type: 'e-waste' },
            { image: 'images/old_computers.jpg', type: 'e-waste' },
            { image: 'images/old_printers.jpg', type: 'e-waste' },
            { image: 'images/electroplax.jpg', type: 'e-waste' },
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
            { image: 'images/smartwatches.jpg', type: 'e-waste' },
            { image: 'images/more/laptop1.jpg', type: 'e-waste' },
            { image: 'images/more/laptop2.jpg', type: 'e-waste' },
            { image: 'images/more/laptop3.jpg', type: 'e-waste' },
            { image: 'images/more/laptop9.jpg', type: 'e-waste' },
            { image: 'images/more/phone1.jpg', type: 'e-waste' },
            { image: 'images/more/phone2.jpg', type: 'e-waste' },
            { image: 'images/more/phone3.jpg', type: 'e-waste' },
            { image: 'images/computer123.jpg', type: 'e-waste' },
            { image: 'images/headphone.jpg', type: 'e-waste' },
            { image: 'images/ipad.jpg', type: 'e-waste' },
            { image: 'images/keyboard.jpg', type: 'e-waste' },
            { image: 'images/mouse.jpg', type: 'e-waste' },
            { image: 'images/PS5.jpg', type: 'e-waste' },
            { image: 'images/switch.jpg', type: 'e-waste' },
            { image: 'images/wires.jpg', type: 'e-waste' },

            
            
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
                        showWrongFeedback(wasteType,binType);
                    }
                    
                    gameState.remainingItems--;
                    // updateRemainingDisplay();
        
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
            duration: 2000,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        // automatic remove element
        setTimeout(() => {
            feedback.remove();
        }, 800);
    }

    function showWrongFeedback(wasteType,binType) {
        const feedback = document.createElement('div');
        feedback.className = 'feedback-wrong';
        if (wasteType == "recyclable"){
            feedback.textContent = '✗ Wrong! \n' + '\nCorrect Answer: Recycling bin';
        }else if (wasteType == "e-waste"){
            feedback.textContent = '✗ Wrong! \n' + '\nCorrect Answer: \ne-waste collection point';
        }else{
            feedback.textContent = '✗ Wrong! \n' + '\nCorrect Answer: landfill';
        }
        //feedback.textContent = '✗ Wrong! \n' + 'Correct Answer: ' + binType;
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
            duration: 10000,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    
    function initGame() {
        gameState.timeLeft = 30;
        gameState.correctCount = 0;
        gameState.remainingItems = 50;
        gameState.usedIndexes = [];
        gameState.isPlaying = true;
        
        updateTimerDisplay();
        // updateRemainingDisplay();
        showNextWaste();
        
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
        }
        gameState.timerInterval = setInterval(updateTimer, 1000);
        
        elements.gameOverScreen.style.display = 'none';
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
        elements.timer.textContent = `Time left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // function updateRemainingDisplay() {
    //     elements.remaining.textContent = `rest : ${gameState.remainingItems}`;
    // }
    
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
        
        const timeUsed = 30 - gameState.timeLeft;
        const minutes = Math.floor(timeUsed / 60);
        const seconds = timeUsed % 60;
        const formattedTimeUsed = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        elements.correctCount.textContent = gameState.correctCount;
        elements.timeUsed.textContent = formattedTimeUsed;
        elements.gameOverScreen.style.display = 'block';

        elements.gameScreen.style.display = 'none';

        elements.gameOverTip.textContent = gameOverTips[Math.floor(Math.random() * gameOverTips.length)];
        
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
        elements.startScreen.style.display = 'none';
        elements.gameScreen.style.display = 'block';
    });
    elements.restartButton.addEventListener('click', function() {
        initGame();
        elements.gameOverScreen.style.display = 'none';
        elements.gameScreen.style.display = 'block';
    });
    elements.returnToStartPageButton.addEventListener('click', function() {
        elements.startScreen.style.display = 'block';
        elements.gameOverScreen.style.display = 'none';
    });
    function initApp() {
        initWasteData();
        setupDragEvents();
        updateLeaderboard(); 
    }
    initApp();
})
