class startScreen extends Phaser.Scene{
    constructor(){
        super("startScreen");
        this.startKey = null;
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.bitmapFont('Ariel', 'Font_0.png', 'Font.xml');
    }
    create(){
        this.startText = this.add.bitmapText(62, 250, 'Ariel', "Aliens are attacking! Press the space bar to fight back!");
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        if(this.startKey.isDown){
            this.scene.start("ShooterGame");
        }
    }
}