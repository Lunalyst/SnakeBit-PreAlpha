/*
https://phaser.io/examples/v3/view/input/mouse/click-sprite
https://phaser.io/examples/v2/input/pointer-over
 */
let gameoverThat;
class gameOver extends Phaser.Scene {
    constructor(){
        // scene settings
        super({key: 'gameOverForest',active: false,physics:{default:'arcade'}});
        //variables attached to the scene
        this.newGame;
        this.processMap;
        this.enemy;
        this.gameOverSign;
        this.tryAgain;
        this.allFunctions;
        this.keyA;
    this.keyW;
    this.keyD;
    this.keyS;
    this.space;
    this.shift;
    this.mycamera;
    this.processMap;
    this.backround;
    this.myMap;
    this.activateFunctions;

    this.warpToX = 450;
    this.warpToY = 600;
    this.inventoryDataArray;
    this.playerSex;
    this.playerLocation = "forestHome";
    this.playerInventoryAmountData;
    this.playerBestiaryData;
    this.playerSkillsData;
    this.playerSaveSlotData;
    this.flagValues = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    
    this.enemyThatDefeatedPlayer ="";
    
   
    gameoverThat = this;
        }

        preload(){
            this.load.image("gameOverbackground" , "assets/titleScreenBackground.png");
            this.load.image("source_map" , "assets/tiledMap/Tile Set V.0.8.png");
            this.load.spritesheet("gameOverSign" , "assets/gameoversign.png" , {frameWidth: 720 , frameHeight: 300 });
            //this.load.spritesheet("tryAgianSign" , "assets/try agian.png",{frameWidth: 200, frameHeight: 70});
            this.load.spritesheet("tryAgianSign" , "assets/try agian.png" , {frameWidth: 200 , frameHeight: 70 });
            
            
             //load in the JSON file for the bitmap
            this.load.tilemapTiledJSON("mapGameover" , "assets/tiledMap/gameOverForest.json");
            this.load.spritesheet('blueSlime', 'assets/CommonBlueSlime.png',{frameWidth: 100, frameHeight: 100 });

            
           
           
            
        }

        create(){
            this.allFunctions = new allSceneFunctions;
            this.allFunctions.loadGameoverFile(this);
            console.log("this.playersex: "+ this.playerSex);
            console.log("now in gameover scene");
            let backround = this.add.sprite(450, 0, "gameOverbackground");
            backround.setScale(1.5,1.5);
            this.tryAgian = this.add.sprite(450, 345, "tryAgianSign").setInteractive();
            this.anims.create({key: 'tryAgianInActive',frames: this.anims.generateFrameNames('tryAgianSign', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'tryAgianActive',frames: this.anims.generateFrameNames('tryAgianSign', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'gameoverTitleAnimation',frames: this.anims.generateFrameNames('gameOverSign', { start: 0, end: 5 }),frameRate: 3,repeat: 0});
            this.anims.create({key: 'gameoverTitleAnimationLoop',frames: this.anims.generateFrameNames('gameOverSign', { start: 2, end: 5 }),frameRate: 3,repeat: -1});
            this.tryAgian.anims.play('tryAgianInActive');
            this.tryAgian.setScale(.5);
            this.tryAgian.setDepth(7);

            gameoverThat.tryAgian.visible = false;
             
            console.log("loading gameover tileset");
            let myMap = this.make.tilemap({ key: "mapGameover" });
            //creates a new level object which is used to display map. sends scene and mapdata
            this.processMap = new level(this,myMap);
            //calls function that loads the tiles from the json
            this.processMap.tilesetNameInTiled = "Tile Set V.0.8";
            this.processMap.setTiles();
            if(this.enemyThatDefeatedPlayer === "blueSlime"){
                this.enemy = new blueSlime(this,450, 280,this.playerSex);
                this.enemy.slimeGameOver();
            }else if(this.enemyThatDefeatedPlayer === "largeBlueSlime"){
                this.enemy = new blueSlime(this,450, 280,this.playerSex);
                this.enemy.slimeSize = 2;
                this.enemy.largeSlimeGameOver();
                this.enemy.y-500;
            
            }
            this.physics.add.collider(this.processMap.layer1, this.enemy);
            //sets up camera to follow player.
            this.mycamera = this.cameras.main;
            this.mycamera.startFollow(this.enemy);
            this.mycamera.setBounds( 0, 0, myMap.widthInPixels, myMap.HeightInPixels); 
            this.cameras.main.zoom = 1.7;
            this.gameOverSign = this.add.sprite(450,160,"gameOverSign");
            this.gameOverSign.setScale(.3);
            this.gameOverSign.setDepth(7);
            this.cameras.main.zoom = 3;
            this.cameras.main.followOffset.set(0,50);
            let that = this;
            

            setTimeout(function(){
                gameoverThat.gameOverSign.anims.play("gameoverTitleAnimation");
              },200);

              setTimeout(function(){
                gameoverThat.gameOverSign.anims.play("gameoverTitleAnimationLoop");
              },220);
           
              setTimeout(function(){
                gameoverThat.tryAgian.visible = true;
              },1000);
            
            this.tryAgian.on('pointerdown', function (pointer) {

                let tempPlayerSaveSlotData = gameoverThat.playerSaveSlotData;
                let tempPlayerSex = gameoverThat.playerSex;
                //console.log("gameoverThat.playerSex: ",gameoverThat.playerSex);
                gameoverThat.allFunctions.loadGameFile(gameoverThat,gameoverThat.playerSaveSlotData.saveSlot);

                if(gameoverThat.playerBestiaryData !== undefined && gameoverThat.playerBestiaryData !== null){
                    for(let [key,value] of Object.entries(gameoverThat.playerBestiaryData)){
                        //console.log("gameoverThat.enemyThatDefeatedPlayer: ", gameoverThat.enemyThatDefeatedPlayer," key: ",key);
                        if(gameoverThat.enemyThatDefeatedPlayer === key){
                            console.log("found bestiary entry : ", key);
                            gameoverThat.playerBestiaryData[key] = 1;
                        }
                      }
                    /*saveGame(
                        nextSceneX,
                        nextSceneY,
                        playerHp,
                        playerSex,
                        playerInventoryData,
                        playerInventoryAmountData,
                        playerBestiaryData,
                        playerSkillsData,
                        playerSaveSlotData,
                        gameFlags)*/
                    gameoverThat.allFunctions.saveGame(
                    gameoverThat.warpToX,
                    gameoverThat.warpToY,
                    gameoverThat.playerHealth,
                    gameoverThat.playerSex,
                    gameoverThat.inventoryDataArray,
                    gameoverThat.playerInventoryAmountData,
                    gameoverThat.playerBestiaryData,
                    gameoverThat.playerSkillsData,
                    gameoverThat.playerSaveSlotData,
                    gameoverThat.flagValues
                    );
                    gameoverThat.scene.start(gameoverThat.playerLocation); 
                }else if(tempPlayerSex === 1){
                    let playerBestiaryData = {
                        blueSlime:0,
                        largeBlueSlime:0,
                        axolotlMale:0,
                        axolotlfemale:0,
                        largePurpleSlugFemale:0,
                        largePurpleSlugMale:0,
                        rabbitfemale:0,
                        rabbitMale:0,
                        cowFemale:0,
                        cowMale:0,
                        blueSlimeHumanoidFemale:0,
                        blueSlimeHumanoidFemaleLarge:0,
                        sharkFemale:0,
                        sharkMale:0
                     };

                     for(let [key,value] of Object.entries(playerBestiaryData)){
                        //console.log("gameoverThat.enemyThatDefeatedPlayer: ", gameoverThat.enemyThatDefeatedPlayer," key: ",key);
                        if(gameoverThat.enemyThatDefeatedPlayer === key){
                            console.log("found bestiary entry : ", key);
                            playerBestiaryData[key] = 1;
                        }
                      }
        
                     let playerSkillsData = {
                        jump:0,
                        dash:0,
                        strength:0,
                        mimic:0,
                        looting:0
                     };

        
                     let gameFlags = {
                        cutTree1:0
        
                     };
        
                    gameoverThat.allFunctions.saveGame(
                        1650,//nextSceneX
                        542,//nextSceneY
                        2,//playerHp
                        1,//playerSex
                        [2,4,6,8,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//playerInventoryData
                        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//playerInventoryAmountData
                        playerBestiaryData,//playerBestiaryData
                        playerSkillsData,//playerSkillsData
                        tempPlayerSaveSlotData,//playerSaveSlotData(saveslotID,currency, bestiary percentage)
                        gameFlags//gameFlags
                        );
                        gameoverThat.scene.start('forestHome');
                }else if(tempPlayerSex === 0){
                    let playerBestiaryData = {
                        blueSlime:0,
                        largeBlueSlime:0,
                        axolotlMale:0,
                        axolotlfemale:0,
                        largePurpleSlugFemale:0,
                        largePurpleSlugMale:0,
                        rabbitfemale:0,
                        rabbitMale:0,
                        cowFemale:0,
                        cowMale:0,
                        blueSlimeHumanoidFemale:0,
                        blueSlimeHumanoidFemaleLarge:0,
                        sharkFemale:0,
                        sharkMale:0
                     };

                     for(let [key,value] of Object.entries(playerBestiaryData)){
                        //console.log("gameoverThat.enemyThatDefeatedPlayer: ", gameoverThat.enemyThatDefeatedPlayer," key: ",key);
                        if(gameoverThat.enemyThatDefeatedPlayer === key){
                            console.log("found bestiary entry : ", key);
                            playerBestiaryData[key] = 1;
                        }
                      }
        
                     let playerSkillsData = {
                        jump:0,
                        dash:0,
                        strength:0,
                        mimic:0,
                        looting:0
                     };
        
                     let gameFlags = {
                        cutTree1:0
        
                     };
        
                    gameoverThat.allFunctions.saveGame(
                        1650,//nextSceneX
                        542,//nextSceneY
                        2,//playerHp
                        0,//playerSex
                        [2,4,6,8,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//playerInventoryData
                        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//playerInventoryAmountData
                        playerBestiaryData,//playerBestiaryData
                        playerSkillsData,//playerSkillsData
                        tempPlayerSaveSlotData,//playerSaveSlotData(saveslotID,currency, bestiary percentage)
                        gameFlags//gameFlags
                        );
                        gameoverThat.scene.start('forestHome');
                }
        
            });

            this.tryAgian.on('pointerover',function(pointer){
                gameoverThat.tryAgian.anims.play("tryAgianActive");
            })
            this.tryAgian.on('pointerout',function(pointer){
                gameoverThat.tryAgian.anims.play("tryAgianInActive");
            })

            

        }

        update(){
            
        }

}