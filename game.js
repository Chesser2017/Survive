const gameState = {score: 0};

class GameScene extends Phaser.Scene{

    constructor(){
        super({key: 'GameScene'})
    }

    preload(){
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/enemy.png');
    }

    create(){
        gameState.isActive = true;
        
        //Player settings
        gameState.player = this.physics.add.sprite(300, 150, 'player');
        gameState.player.setCollideWorldBounds(true);
        gameState.player.speed = 200;
    
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        gameState.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        gameState.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        gameState.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
        const font = {font: '60px Arial', fill: '#FFFFFF'}
        gameState.scoreText = this.add.text(0, 0, 'Score: 0', font).setOrigin(0, 0)
    
        gameState.enemyLoop = this.time.addEvent({
            delay: 250,
            callback: () => {
                const XCoor = Math.floor(Math.random()*550);
                const YCoor = Math.floor(Math.random()*250);
    
                gameState.enemy = this.physics.add.sprite(XCoor, YCoor, 'enemy');
                gameState.enemy.setCollideWorldBounds(true);
                gameState.enemy.setVelocityX(Phaser.Math.Between(-100, 100)); 
                gameState.enemy.setVelocityY(Phaser.Math.Between(-100, 100));
                gameState.enemy.setBounce(1, 1);
                
                this.physics.add.overlap(gameState.player, gameState.enemy, (player, enemy) => {
                    gameState.player.destroy();
                    gameState.enemyLoop.destroy();
                    gameState.scoreText.destroy();
                    gameState.isActive = false;

                    this.add.text(config.width/2,
                         config.height/2 - 60,
                        `Game Over! Your final score is: ${gameState.score}`,
                         {font: '45px Arial'}).setOrigin(0.5, 0.5);
                    this.add.text(config.width/2, config.height/2,'Click to restart.', {font:'60px Arial'}).setOrigin(0.5, 0.5)
                    this.input.on('pointerup', () => {
                        this.scene.restart();
                        gameState.isActive = true;
                    })
                    gameState.score = 0;
                })
                gameState.score += 5;
                gameState.scoreText.setText(`Score: ${gameState.score}`)
            },
            callbackScope: this,
            repeat: -1
        })
    }
    
    update(){
        if(gameState.cursors.up.isDown && gameState.isActive){
            gameState.player.setVelocityY(-gameState.player.speed);
        }
        if(gameState.cursors.down.isDown && gameState.isActive){
            gameState.player.setVelocityY(gameState.player.speed);
        }
        if(gameState.cursors.left.isDown && gameState.isActive){
            gameState.player.setVelocityX(-gameState.player.speed);
        }
        if(gameState.cursors.right.isDown && gameState.isActive){
            gameState.player.setVelocityX(gameState.player.speed);
        }
        if(!gameState.cursors.right.isDown && !gameState.cursors.down.isDown && !gameState.cursors.up.isDown && !gameState.cursors.left.isDown && gameState.isActive){
            gameState.player.setVelocityX(0);
            gameState.player.setVelocityY(0);
        }
        if(!gameState.cursors.right.isDown && !gameState.cursors.left.isDown && gameState.isActive){
            gameState.player.setVelocityX(0);
        }
        if(!gameState.cursors.up.isDown && !gameState.cursors.down.isDown && gameState.isActive){
            gameState.player.setVelocityY(0);
        }

        if(gameState.keyW.isDown && gameState.isActive){
            gameState.player.setVelocityY(-gameState.player.speed);
        }
        if(gameState.keyS.isDown && gameState.isActive){
            gameState.player.setVelocityY(gameState.player.speed);
        }
        if(gameState.keyA.isDown && gameState.isActive){
            gameState.player.setVelocityX(-gameState.player.speed);
        }
        if(gameState.keyD.isDown && gameState.isActive){
            gameState.player.setVelocityX(gameState.player.speed);
        }
        if(!gameState.keyD.isDown && !gameState.keyA.isDown && !gameState.keyS.isDown && !gameState.keyW.isDown && gameState.isActive && !gameState.cursors.right.isDown && !gameState.cursors.down.isDown && !gameState.cursors.up.isDown && !gameState.cursors.left.isDown){
            gameState.player.setVelocityX(0);
            gameState.player.setVelocityY(0);
        }
        if(!gameState.keyA.isDown && !gameState.keyD.isDown && gameState.isActive && !gameState.cursors.right.isDown && !gameState.cursors.left.isDown){
            gameState.player.setVelocityX(0);
        }
        if(!gameState.keyW.isDown && !gameState.keyS.isDown && gameState.isActive && !gameState.cursors.up.isDown && !gameState.cursors.down.isDown){
            gameState.player.setVelocityY(0);
        }
    }
    
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '0xd3d3d3',
    scene: [GameScene],
    physics: {
        default: 'arcade'
    }
}


const game = new Phaser.Game(config);