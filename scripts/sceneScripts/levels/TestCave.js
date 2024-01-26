
class TestCave extends defaultScene {
  
  constructor(){
    // scene settings
    super({key: 'TestCave',active: false ,physics:{default:'arcade'}});
    //variables attached to the scene

    //this varialve stores the key so that when the player saves they load back in the correct location
    this.playerLocation = "TestCave";

    //calls function apart of default scene to set up variables everyscene should need
    this.constructStockSceneVariables();

    //defines scene specific variables
    //map needs to be define in the level with tileset json and tileset image.
    this.processMap;
    this.myMap;

    //definition for enemy variables
    //this.slimes;
    //this.slimeId = 0;

    

    }

    preload(){

      this.load.tilemapTiledJSON("test_cave_map" , "assets/tiledMap/LockWood/Test_Cave.json");
      
      this.defaultPreload();

    }

    create(){

      //sets up gameover location
      this.setupGameoverLocation("caveGameover");
    
      //sets up player controls
      this.setUpPlayerInputs();
    
      //loads local save data.
      console.log("activating function to load game");

      this.loadGame();
      
      this.grabbed = false;

      //creates tileset
      this.setUpTileSet("test_cave_map","Forest_Large_Tiles","source_map");
    
      //creates player object
      this.setUpPlayer();

      //sets up the player key prompts for when the player is grabbed
      this.setUpKeyPrompts();

      //adds colliders to player as well as slimes to the tiled level
      this.setUpPlayerCollider();
      this.setUpSlimeCollider();

      //sets up the player camera
      this.setUpPlayerCamera();
      
      //creates a warp sprite and gives it a tag to tell it where to send the player.
      this.portals = this.physics.add.group();
      this.signPoints = this.physics.add.group();
      this.saveStonePoints = this.physics.add.group();
      
      
      
      //this.initSavePoints(2050,558);
        // as well as signs.

      //this sets up the text box which will be used by the signs to display text.
      this.setUpTextBox();

      this.initSigns(443,797+12,
        "Why did I move here? I guess it was the weather. Or the... Ah, I don't know, that thing.  ",
        ['signLoop']);

      //this.initSavePoints(896,1230);

      this.initPortals(343,829-12,2566,1373,"warpCaveInside","ForestRavineHome");
      

      //sets up containers
      this.setUpContainers();

      let knife = {
        itemID: 4,
        itemStackable: 0,
        itemAmount: 1
    };
    
    //creates the container object in the scene takes, x and y in scene, a item object, a bool if it should only be opened once, and a flag to tell.
    this.initItemContainer(563,765-3,knife,true,"cave_chest_with_knife");

    let speedRing = {
      itemID: 8,
      itemStackable: 0,
      itemAmount: 1
  };
  
  //creates the container object in the scene takes, x and y in scene, a item object, a bool if it should only be opened once, and a flag to tell.
  this.initItemContainer(1608,765-3,speedRing,true,"cave_chest_with_speedRing");

      let axe = {
          itemID: 10,
          itemStackable: 0,
          itemAmount: 1
      };
      
      //creates the container object in the scene takes, x and y in scene, a item object, a bool if it should only be opened once, and a flag to tell.
      this.initItemContainer(1403,666,axe,true,"cave_chest_with_axe");
      //sets up item drops for the scene

      this.setUpItemDrops();
      this.setUpItemDropCollider();

      //time out function to spawn enemys. if they are not delayed then the physics is not properly set up on them.
      let thisScene = this;
        setTimeout(function(){
          //generates enemys
          //thisScene.initSlimes(863, 797, 1,thisScene.playerSex);
          thisScene.initSlimes(1073, 893, 1,thisScene.playerSex);
          thisScene.initSlimes(1173, 893, 1,thisScene.playerSex);
          //thisScene.initSlimes(1391, 797, 1,thisScene.playerSex);
      
          thisScene.spawnedEnemys = true;
        },1000);

        //calls the time outs for various things.
        this.setUpDefaultTimeOuts();
    }

    update(){
      
      //calls the built in update function
      this.defaultUpdate();

      //handles slime interactions
      this.slimeUpdate();

    }

}
  

  