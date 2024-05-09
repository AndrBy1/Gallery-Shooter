class ShooterGame extends Phaser.Scene{
    
    constructor(){
        super("ShooterGame");
        this.my = {sprite: {}};
        this.startMove = true;
        this.justStart = true;
        this.startX =  400;
        this.startY = 550;
        this.leftKey = null;
        this.rightKey = null;
        this.shootKey = null;
        this.bulletCooldown = 5;
        this.bulletCounter = 3;
        this.bulletSpeed = 35;
        this.playerSpeed = 15;
        this.hitCooldown = false;
        this.enemyBulletCount = 30;
        this.enemyBulletCool = 7;
        this.enemyCount = 10;
        this.enemyStartX = 120;
        this.enemyStartY = 80;
        this.enemyPoints = null;
        this.enemyHealth = 3 + Math.ceil(Level / 2);
        this.enemyDown = 0;
        this.frame = 0;
    }

    init_game(){
        this.startMove = true;
        this.justStart = true;
        this.startX =  400;
        this.startY = 550;
        this.leftKey = null;
        this.rightKey = null;
        this.shootKey = null;
        this.bulletCooldown = 5;
        this.bulletCounter = 3;
        this.bulletSpeed = 35;
        this.playerSpeed = 15;
        this.hitCooldown = false;
        this.enemyBulletCount = 30;
        this.enemyBulletCool = 7;
        this.enemyCount = 10;
        this.enemyStartX = 120;
        this.enemyStartY = 80;
        this.enemyPoints = null;
        this.enemyHealth = 3 + Math.ceil(Level / 2);
        this.enemyDown = 0;
        this.frame = 0;
    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("character", "tile_0112.png");
        this.load.image("bullet", "effect_purple.png");
        this.load.image("enemyFire", "meteor_detailedSmall.png");
        this.load.image("alienShip1", "ship_E.png");
        this.load.image("alienShip2", "ship_H.png");
        this.load.bitmapFont('Ariel', 'Font_0.png', 'Font.xml');
    }

    create(){
        this.init_game();
        let my = this.my;
        this.healthTxt = this.add.bitmapText(10, 565, 'Ariel', "Health: " + Health);
        this.scoreTxt = this.add.bitmapText(650, 565, 'Ariel', "Score: " + Score);
        this.levelTxt = this.add.bitmapText(565, 10, 'Ariel', "Level: " + Level);

        this.leftKey = this.input.keyboard.addKey("A");
        this.rightKey = this.input.keyboard.addKey("D");
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.oKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

        this.trackEnemy = this.enemyCount;
        my.sprite.playerSprite = this.add.sprite(this.startX, this.startY, "character");
        my.sprite.playerSprite.setScale(2);

        document.getElementById('description').innerHTML = '<h2>move left: a</h2><h2>move right: d</h2><h2>shoot: SPACE</h2>'

        this.enemyPoints1 = [
            this.enemyStartX, this.enemyStartY,
            
            this.enemyStartX + 40, this.enemyStartY,
            this.enemyStartX + 60, this.enemyStartY,
            this.enemyStartX + 10, this.enemyStartY,
            this.enemyStartX - 40, this.enemyStartY,
            this.enemyStartX - 30, this.enemyStartY,
            this.enemyStartX, this.enemyStartY,
            this.enemyStartX + 1, this.enemyStartY,
            this.enemyStartX, this.enemyStartY,
            this.enemyStartX + 1, this.enemyStartY,
            this.enemyStartX + 20, this.enemyStartY,
            this.enemyStartX + 21, this.enemyStartY,
            this.enemyStartX + 20, this.enemyStartY,
        ];

        this.curve = new Phaser.Curves.Spline(this.enemyPoints1);

        my.sprite.enemyMover = this.add.follower(this.curve, 10, 10, "bullet");
        my.sprite.enemyMover.visible = false;

        my.sprite.enemy2 = this.add.sprite(my.sprite.playerSprite.x, 0, "alienShip2");

        my.sprite.bulletGroup = this.add.group({
            defaultKey: "bullet",
            maxSize: 10
        })
        my.sprite.bulletGroup.createMultiple({
            active: false,
            key: my.sprite.bulletGroup.defaultKey,
            repeat: my.sprite.bulletGroup.maxSize - 1
        });

        my.sprite.enemybulletGroup = this.add.group({
            defaultKey: "enemyFire",
            maxSize: this.enemyBulletCount
        })
        my.sprite.enemybulletGroup.createMultiple({
            active: false,
            key: my.sprite.enemybulletGroup.defaultKey,
            repeat: my.sprite.enemybulletGroup.maxSize - 1
        });

        my.sprite.enemyGroup1 = this.add.group({
            defaultKey: "alienShip1",
            maxSize: this.enemyCount
        })
        my.sprite.enemyGroup1.createMultiple({
            active: true,
            key: my.sprite.enemyGroup1.defaultKey,
            repeat: my.sprite.bulletGroup.maxSize - 1
        })
        my.sprite.enemyMover.x = this.curve.points[0].x;
        my.sprite.enemyMover.y = this.curve.points[0].y;
    }

    

    hit(bullet, target){
        if (Math.abs(bullet.x - target.x) > (bullet.displayWidth/2 + target.displayWidth/2)){
            return false;
        }
        if (Math.abs(bullet.y - target.y) > (bullet.displayHeight/2 + target.displayHeight/2)){
            return false;
        }
        return true;
    }

    update(){
        //console.log(" update() ");
        let my = this.my;
        this.frame++;
        this.bulletCounter--;

        this.healthTxt.setText("Health: " + Health);
        this.scoreTxt.setText("Score: " + Score);

        if (this.leftKey.isDown) { //move left
            
            if (my.sprite.playerSprite.x >= 0){
                my.sprite.playerSprite.x -= this.playerSpeed;
            }
        }

        if (this.rightKey.isDown) { //move right
            
            if (my.sprite.playerSprite.x <= 800){
                my.sprite.playerSprite.x += this.playerSpeed;
            }
        }

        if(this.shootKey.isDown){
            if(this.bulletCounter < 0){
                let bullet = my.sprite.bulletGroup.getFirstDead();
                bullet.setScale(0.3);
                if(bullet != null){
                    bullet.active = true;
                    bullet.visible = true;
                    bullet.x = my.sprite.playerSprite.x;
                    bullet.y = my.sprite.playerSprite.y - (my.sprite.playerSprite.displayHeight/2)
                    this.bulletCounter = this.bulletCooldown;
                }
            }
        }

        for(let bullet of my.sprite.bulletGroup.getChildren()){
            if(bullet.y < -(bullet.displayHeight/2)){
                bullet.active = false;
                bullet.visible = false;
            }
        }

        my.sprite.bulletGroup.incY(-this.bulletSpeed);

        my.sprite.enemy2.y = my.sprite.enemy2.y + 3;
        my.sprite.enemy2.flipY = true;

        if((this.frame % 80 == 0) && (my.sprite.enemy2.active == false)){
            console.log("check");
            my.sprite.enemy2.active = true;
            my.sprite.enemy2.visible = true;
            my.sprite.enemy2.health = 4;
            my.sprite.enemy2.y = 0;
            my.sprite.enemy2.x = my.sprite.playerSprite.x;
        }

        if(this.hit(my.sprite.enemy2, my.sprite.playerSprite) && this.hitCooldown){
            Health--;
            console.log("player hit");
            if(Health == 0){
                this.scene.start("endScreen");
            }
            this.hitCooldown = false;
        }

        let yPosition = 0;
        let xPosition = 0;
        //let enemyXMove = this.curve.points[0].x;
        //let enemyYMove = this.curve.points[0].y;
        let enemyDist = 65;
        
        if(this.startMove == true){
            my.sprite.enemyMover.startFollow({
                from: 0, 
                to: 1, 
                delay: 0, 
                duration: 2000, 
                ease: 'Sine.easeInOut', 
                repeat: -1, 
                yoyo: true, 
                rotateToPath: true, 
                rotationOffset: -90 
            }, 0);
            this.startMove = false;
        }

        //console.log(my.sprite.enemyMover.x);
        for(let enemy of my.sprite.enemyGroup1.getChildren()){
            
            enemy.flipY = true;
            enemy.x = my.sprite.enemyMover.x + xPosition;
            enemy.y = my.sprite.enemyMover.y + yPosition;
            enemy.setScale(0.3);
            
            if(this.justStart == true){
                enemy.health = this.enemyHealth;
                enemy.visible = true;
                my.sprite.enemy2.active = true;
                my.sprite.enemy2.health = 4;
                my.sprite.enemy2.y = 0;
                my.sprite.enemy2.x = my.sprite.playerSprite.x;
            }
            if(xPosition > 400)
            {
                yPosition += my.sprite.enemyMover.y;
                xPosition = this.enemyStartX;
            }
            for(let bullet of my.sprite.bulletGroup.getChildren()){
                if(this.hit(bullet, enemy))
                {
                    enemy.health--;
                    if(enemy.active == true){
                        bullet.active = false;
                        bullet.visible = false;
                    }
                    if(enemy.health == 0){
                        enemy.active = false;
                        enemy.visible = false;
                        Score++;
                        this.trackEnemy--;
                        console.log("track enemy" + this.trackEnemy);
                    }
                }
                if(this.hit(bullet, my.sprite.enemy2))
                {
                    my.sprite.enemy2.health--;
                    if(my.sprite.enemy2.active == true){
                        bullet.active = false;
                        bullet.visible = false;
                    }
                    if(my.sprite.enemy2.health == 0){
                        my.sprite.enemy2.active = false;
                        my.sprite.enemy2.visible = false;
                        Score++;
                        Health++;
                        console.log("track enemy 2" + this.trackEnemy);
                    }
                }
            }
            //console.log("enemy health: " + enemy.health);
            if(this.frame % 35 == 0 && enemy.active == true){
                let enemyBullet = my.sprite.enemybulletGroup.getFirstDead();
                enemyBullet.setScale(0.35);
                if(enemyBullet != null){
                    //console.log("check");
                    //console.log(enemy.x);
                    enemyBullet.active = true;
                    enemyBullet.visible = true;
                    enemyBullet.x = enemy.x;
                    enemyBullet.y = enemy.y + (enemy.displayHeight/2);
                }
            }
            for(let enemyBullet of my.sprite.enemybulletGroup.getChildren()){
                if(this.hit(enemyBullet, my.sprite.playerSprite) && this.hitCooldown){
                    Health--;
                    console.log("player hit");
                    if(Health == 0){
                        this.scene.start("endScreen");
                    }
                    enemyBullet.active = false;
                    enemyBullet.visible = false;
                    this.hitCooldown = false;
                }
            }
            xPosition += enemyDist;
        }
        my.sprite.enemybulletGroup.incY(this.bulletSpeed);

        if(Score > highScore)
        {
            highScore = Score;
        }
        

        for(let bullet of my.sprite.enemybulletGroup.getChildren()){
            if(bullet.y > (800)){
                bullet.active = false;
                bullet.visible = false;
            }
        }
        
        //this.projectile.y -= 5;
        if(this.frame % 100){
            this.hitCooldown = true;
        }

        if (Phaser.Input.Keyboard.JustDown(this.oKey)) {
            console.log("Output the points");

            for(let point of this.curve.points){
                console.log(point.x + ", " + point.y + " \n");
            }
        }
        this.justStart = false;
        if(Health == 0)
        {
            this.scene.start("endScreen");
        }
        if(this.trackEnemy == 0)
        {
            this.scene.start("newLvl");
        }
    }
}