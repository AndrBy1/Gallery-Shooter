class newLvl extends Phaser.Scene{
    graphics;
    constructor(){
        super("newLvl");
        this.startKey = null;
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.bitmapFont('Ariel', 'Font_0.png', 'Font.xml');
        this.load.image("character", "tile_0112.png");
    }
    create(){
        this.startText = this.add.bitmapText(62, 250, 'Ariel', "You completed this wave the next one is coming! \nPress the space bar to fight back!");
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
    }
    update(){
        if(this.startKey.isDown){
            Level++;
            Health++;
            this.scene.start("ShooterGame");
        }
    }
}