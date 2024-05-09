class endScreen extends Phaser.Scene{
    constructor(){
        super("endScreen");
        this.my = {sprite: {}};
        this.restartKey = null;
        this.frame = 0;
        this.visualX = 250;
        this.visualY = 450;
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("character", "tile_0112.png");
        this.load.bitmapFont('Ariel', 'Font_0.png', 'Font.xml');
    }
    create(){
        let my = this.my;
        this.endText = this.add.bitmapText(250, 250, 'Ariel', "You Died. Press R to restart");
        this.scoreTxt = this.add.bitmapText(400, 565, 'Ariel', "Score: " + Score);
        this.highTxt = this.add.bitmapText(550, 565, 'Ariel', "highScore: " + highScore);
        this.startKey = this.input.keyboard.addKey("R");
        my.sprite.playerSprite = this.add.sprite(this.visualX, this.visualY, "character");
        my.sprite.playerSprite.setScale(4);
    }
    update(){
        let my = this.my;
        this.frame++;
        if(this.frame % 11 == 0){
            my.sprite.playerSprite.flipY = true;
            
        }else if(this.frame % 5 == 0){
            my.sprite.playerSprite.flipx = true;
        }else if(this.frame % 23 == 0){
            my.sprite.playerSprite.flipx = false;
        }
        else{
            my.sprite.playerSprite.flipY = false;
        }
        if(this.startKey.isDown){
            Level = 1;
            Score = 0;
            Health = 4 + Level;
            this.scene.start("startScreen");
        }
    }
}