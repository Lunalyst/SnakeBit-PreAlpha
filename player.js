/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/
class player extends Phaser.Physics.Arcade.Sprite{
  // every class needs constructor
  constructor(scene, xPos, yPos,sex){
    //super() calls the constructor() from the parent class we are extending
    super(scene, xPos, yPos);
    //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
    //so here in the subclass of sprite its refering to the image object we just made. 
    scene.add.existing(this);
    //then we call this next line to give it collision
    scene.physics.add.existing(this);
    //now we can perform any specalized set ups for this object
    this.custom_id = 'player';// creates a custome property to make it easy to track the identity of the player sprite.
    this.idleTimer = 0;// give player a idle timer to tell if player is gone long enough to start sleeping animation.
    this.lastKey = "d";// adds a key to tell movement function what key was pressed last to keep animations facing the right way
    this.playerPreviousY = 0;
    this.body.setGravityY(600); // sets gravity 
    this.setPushable(false);
    this.setDepth(6);
    this.hitboxCoolDown = false;
    this.sliceDamage = 0;
    this.bluntDamage = 0;
    this.pierceDamage = 0;
    this.heatDamage = 0;
    this.lightningDamage = 0;
    this.coldDamage = 0;
    this.setScale(.34);

    //defines player animations.
    if(sex === 0){
    this.anims.create({key: 'pIdle',frames: this.anims.generateFrameNames('malePlayer', { start: 1, end: 9 }),frameRate: 6,repeat: -1});

    this.anims.create({key: 'pRight',frames: this.anims.generateFrameNames('malePlayer', { start: 10, end: 13 }),frameRate: 10,repeat: -1});
    this.anims.create({key: 'pLeft',frames: this.anims.generateFrameNames('malePlayer', { start: 14, end: 17 }),frameRate: 10 ,repeat: -1});

    this.anims.create({key: 'pJumpRightUp',frames: this.anims.generateFrameNames('malePlayer', { start: 20, end: 20 }),frameRate: 2 ,repeat: -1});
    this.anims.create({key: 'pJumpRightDown',frames: this.anims.generateFrameNames('malePlayer', { start: 22, end: 22 }),frameRate: 2 ,repeat: -1});

    this.anims.create({key: 'pJumpLeftUp',frames: this.anims.generateFrameNames('malePlayer', { start: 25, end: 25 }),frameRate: 2,repeat: -1});
    this.anims.create({key: 'pJumpLeftDown',frames: this.anims.generateFrameNames('malePlayer', { start: 27, end: 27 }),frameRate: 2,repeat: -1});

    this.anims.create({key: 'pSleep',frames: this.anims.generateFrameNames('malePlayer', { start: 28, end: 47 }),frameRate: 1.5,repeat: -1});
   
    this.anims.create({key: 'pAttackKnifeRight',frames: this.anims.generateFrameNames('malePlayer', { start: 48, end: 52 }),frameRate: 12,repeat: -1});
    this.anims.create({key: 'pAttackKnifeLeft',frames: this.anims.generateFrameNames('malePlayer', { start: 53, end: 57 }),frameRate: 12,repeat: -1});

    this.anims.create({key: 'pAttackAxeRight',frames: this.anims.generateFrameNames('malePlayer', { start: 58, end: 62 }),frameRate: 9,repeat: -1});
    this.anims.create({key: 'pAttackAxeLeft',frames: this.anims.generateFrameNames('malePlayer', { start: 63, end: 67 }),frameRate: 9,repeat: -1});

    this.anims.create({key: 'pAttackOarRight',frames: this.anims.generateFrameNames('malePlayer', { start: 68, end: 72 }),frameRate: 8,repeat: -1});
    this.anims.create({key: 'pAttackOarLeft',frames: this.anims.generateFrameNames('malePlayer', { start: 73, end: 77 }),frameRate: 8,repeat: -1});

    this.anims.create({key: 'pAttackUnarmedRight',frames: this.anims.generateFrameNames('malePlayer', { start: 78, end: 82 }),frameRate: 12,repeat: -1});
    this.anims.create({key: 'pAttackUnarmedLeft',frames: this.anims.generateFrameNames('malePlayer', { start: 83, end: 87 }),frameRate: 12,repeat: -1});
    }else{
    this.anims.create({key: 'pIdle',frames: this.anims.generateFrameNames('femalePlayer', { start: 1, end: 9 }),frameRate: 6,repeat: -1});

    this.anims.create({key: 'pRight',frames: this.anims.generateFrameNames('femalePlayer', { start: 10, end: 13 }),frameRate: 10,repeat: -1});
    this.anims.create({key: 'pLeft',frames: this.anims.generateFrameNames('femalePlayer', { start: 14, end: 17 }),frameRate: 10 ,repeat: -1});

    this.anims.create({key: 'pJumpRightUp',frames: this.anims.generateFrameNames('femalePlayer', { start: 20, end: 20 }),frameRate: 2 ,repeat: -1});
    this.anims.create({key: 'pJumpRightDown',frames: this.anims.generateFrameNames('femalePlayer', { start: 22, end: 22 }),frameRate: 2 ,repeat: -1});

    this.anims.create({key: 'pJumpLeftUp',frames: this.anims.generateFrameNames('femalePlayer', { start: 25, end: 25 }),frameRate: 2,repeat: -1});
    this.anims.create({key: 'pJumpLeftDown',frames: this.anims.generateFrameNames('femalePlayer', { start: 27, end: 27 }),frameRate: 2,repeat: -1});

    this.anims.create({key: 'pSleep',frames: this.anims.generateFrameNames('femalePlayer', { start: 28, end: 47 }),frameRate: 1.5,repeat: -1});
   
    this.anims.create({key: 'pAttackKnifeRight',frames: this.anims.generateFrameNames('femalePlayer', { start: 48, end: 52 }),frameRate: 12,repeat: -1});
    this.anims.create({key: 'pAttackKnifeLeft',frames: this.anims.generateFrameNames('femalePlayer', { start: 53, end: 57 }),frameRate: 12,repeat: -1});

    this.anims.create({key: 'pAttackAxeRight',frames: this.anims.generateFrameNames('femalePlayer', { start: 58, end: 62 }),frameRate: 9,repeat: -1});
    this.anims.create({key: 'pAttackAxeLeft',frames: this.anims.generateFrameNames('femalePlayer', { start: 63, end: 67 }),frameRate: 9,repeat: -1});

    this.anims.create({key: 'pAttackOarRight',frames: this.anims.generateFrameNames('femalePlayer', { start: 68, end: 72 }),frameRate: 8,repeat: -1});
    this.anims.create({key: 'pAttackOarLeft',frames: this.anims.generateFrameNames('femalePlayer', { start: 73, end: 77 }),frameRate: 8,repeat: -1});

    this.anims.create({key: 'pAttackUnarmedRight',frames: this.anims.generateFrameNames('femalePlayer', { start: 78, end: 82 }),frameRate: 12,repeat: -1});
    this.anims.create({key: 'pAttackUnarmedLeft',frames: this.anims.generateFrameNames('femalePlayer', { start: 83, end: 87 }),frameRate: 12,repeat: -1});
    }


    
  }
    
    
  
  
  //built in move player function to handle how the player moves and is animated while moving. parameters are inputA, inputD, inputSpace, and previous Y location
  movePlayer(keyA,keyD,space,playerPreviousY){
    //changes the hitbox ,true centeres the sprite. fixes an issue where player hit 
    //box would be disjointed from the sprite. caused by phaser inililizing the prite before hpysics is fully set up
    //might cause problems if hitbox needs to change as it it set after every call.
    //this.setSize(23,68,true);
    //console.log("player x: "+ this.x+" player y: "+ this.y);
    //player movement 
    if(keyA.isDown && this.body.blocked.down){
      this.setSize(50,210,true);
        this.lastKey = "a";
        this.idleTimer = 0;
        this.setVelocityX(-300);
        if(this.body.blocked.down){
          this.anims.play('pLeft',true);
          //console.log("moving left");
        }
      } else if(keyD.isDown && this.body.blocked.down){
        this.setSize(50,210,true);
        this.lastKey = "d";
        this.idleTimer = 0;
        this.setVelocityX(300);
        if(this.body.blocked.down){
          this.anims.play('pRight',true);
         //console.log("moving Right");
        }
      }else if(this.idleTimer === 2000){
        this.setVelocityX(0);
        this.anims.play('pSleep',true);
      }else{
        this.setSize(50,210,true);
        this.setVelocityX(0);
        /*if(this.lastKey === "d"){
          this.anims.play('pIdleRight',true);
        }else if(this.lastKey === "a"){
          this.anims.play('pIdleLeft',true);
        }*/
        this.anims.play('pIdle',true);
        //console.log("player is standing still");
        if(this.idleTimer < 2000){
          //console.log("Idle Timer: "+ this.idleTimer);
          this.idleTimer++;
        }
        
      }
   //checks to see if player space is down and player is on the ground to activate jump 
  if (space.isDown && this.body.blocked.down){
    this.idleTimer = 0;
    this.setVelocityY(-350);
    //console.log(" jumping");
    //checks to see if player is moving left and not touching the ground.
    }else if(keyA.isDown && !this.body.blocked.down){
      //console.log("IN AIR AND MOVING LEFT");
      this.setVelocityX(-300);
      
      if(playerPreviousY > this.y){
        this.anims.play('pJumpLeftUp',true);
      }else if(playerPreviousY <= this.y){
        this.anims.play('pJumpLeftDown',true);
      }
    //checks to see if player is moving right and not touching the ground.
    }else if(keyD.isDown && !this.body.blocked.down){
      //console.log("IN AIR AND MOVING RIGHT");
      this.setVelocityX(300);
      if(playerPreviousY > this.y){
        this.anims.play('pJumpRightUp',true);
      }else if(playerPreviousY <= this.y){
        this.anims.play('pJumpRightDown',true);
      }
      //does default if jumping without other input
    }else if(!this.body.blocked.down){
      this.idleTimer = 0;
      if(playerPreviousY > this.y && this.lastKey === "d"){
        this.anims.play('pJumpRightUp',true);
      }else if(playerPreviousY <= this.y && this.lastKey === "d"){
        this.anims.play('pJumpRightDown',true);
      }else if(playerPreviousY > this.y && this.lastKey === "a"){
        this.anims.play('pJumpLeftUp',true);
      }else if(playerPreviousY <= this.y && this.lastKey === "a"){
        this.anims.play('pJumpLeftDown',true);
      }
      //console.log("in the air");
      }
      //console.log("previous player y"+ playerPreviousY);
      playerPreviousY = this.y;
  }
  // note on animations, if the current animation wont play it may be because in two places animations are being called. they keep overriding eachother causeing only one frame to be displayed.
  attackPlayer(keyShift,scene){
    let that = this;
    if(this.body.blocked.down){
      if(this.lastKey === 'd' && keyShift.isDown && scene.inventoryDataArray[24] === 0){
        this.anims.play("pAttackUnarmedRight",true);
        this.setVelocityX(0);
        this.bluntDamage = 1;
        if(that.hitboxCoolDown === false){
          scene.attackHitBox.x = this.x;
          scene.attackHitBox.y = this.y+10000;
          setTimeout(function(){
            that.hitboxCoolDown = true;
          },200);
        }else if(that.hitboxCoolDown === true){
          scene.attackHitBox.x = this.x+20;
          scene.attackHitBox.y = this.y;
          that.hitboxCoolDown = false; 
        }
      }else if(this.lastKey === 'a'&& keyShift.isDown && scene.inventoryDataArray[24] === 0){
        this.anims.play("pAttackUnarmedLeft",true);
        this.setVelocityX(0);
        this.bluntDamage = 1;
        if(that.hitboxCoolDown === false){
          scene.attackHitBox.x = this.x;
          scene.attackHitBox.y = this.y+10000;
          setTimeout(function(){
            that.hitboxCoolDown = true;
          },200);
        }else if(that.hitboxCoolDown === true){
          scene.attackHitBox.x = this.x-20;
          scene.attackHitBox.y = this.y;
          that.hitboxCoolDown = false; 
        }
      }else if(this.lastKey === 'd' && keyShift.isDown && scene.inventoryDataArray[24] === 4){
        this.anims.play("pAttackKnifeRight",true);
        this.setVelocityX(0);
        this.sliceDamage = 4;
        if(that.hitboxCoolDown === false){
          scene.attackHitBox.x = this.x;
          scene.attackHitBox.y = this.y+10000;
          setTimeout(function(){
            that.hitboxCoolDown = true;
          },200);
        }else if(that.hitboxCoolDown === true){
          scene.attackHitBox.x = this.x+20;
          scene.attackHitBox.y = this.y;
          that.hitboxCoolDown = false; 
        }
      }else if(this.lastKey === 'a'&& keyShift.isDown && scene.inventoryDataArray[24] === 4){
        this.anims.play("pAttackKnifeLeft",true);
        this.setVelocityX(0);
        this.sliceDamage = 4;
        if(that.hitboxCoolDown === false){
          scene.attackHitBox.x = this.x;
          scene.attackHitBox.y = this.y+10000;
          setTimeout(function(){
            that.hitboxCoolDown = true;
          },200);
        }else if(that.hitboxCoolDown === true){
          scene.attackHitBox.x = this.x-20;
          scene.attackHitBox.y = this.y;
          that.hitboxCoolDown = false; 
        }
      }else if(this.lastKey === 'd' && keyShift.isDown && scene.inventoryDataArray[24] === 10){
        this.anims.play("pAttackAxeRight",true);
        this.setVelocityX(0);
        this.sliceDamage = 8;
        if(that.hitboxCoolDown === false){
          scene.attackHitBox.x = this.x;
          scene.attackHitBox.y = this.y+10000;
          setTimeout(function(){
            that.hitboxCoolDown = true;
          },300);
        }else if(that.hitboxCoolDown === true){
          scene.attackHitBox.x = this.x+20;
          scene.attackHitBox.y = this.y;
          that.hitboxCoolDown = false; 
        }
      }else if(this.lastKey === 'a'&& keyShift.isDown && scene.inventoryDataArray[24] === 10){
        this.anims.play("pAttackAxeLeft",true);
        this.setVelocityX(0);
        this.sliceDamage = 8;
        if(that.hitboxCoolDown === false){
          scene.attackHitBox.x = this.x;
          scene.attackHitBox.y = this.y+10000;
          setTimeout(function(){
            that.hitboxCoolDown = true;
          },300);
        }else if(that.hitboxCoolDown === true){
          scene.attackHitBox.x = this.x-20;
          scene.attackHitBox.y = this.y;
          that.hitboxCoolDown = false; 
        }
      }else if(this.lastKey === 'd' && keyShift.isDown && scene.inventoryDataArray[24] === 2){
        this.anims.play("pAttackOarRight",true);
        this.setVelocityX(0);
        this.bluntDamage = 2;
        if(that.hitboxCoolDown === false){
          scene.attackHitBox.x = this.x;
          scene.attackHitBox.y = this.y+10000;
          setTimeout(function(){
            that.hitboxCoolDown = true;
          },300);
        }else if(that.hitboxCoolDown === true){
          scene.attackHitBox.x = this.x+20;
          scene.attackHitBox.y = this.y;
          that.hitboxCoolDown = false; 
        }
      }else if(this.lastKey === 'a'&& keyShift.isDown && scene.inventoryDataArray[24] === 2){
        this.anims.play("pAttackOarLeft",true);
        this.setVelocityX(0);
        this.bluntDamage = 2;
        if(that.hitboxCoolDown === false){
          scene.attackHitBox.x = this.x;
          scene.attackHitBox.y = this.y+10000;
          setTimeout(function(){
            that.hitboxCoolDown = true;
          },300);
        }else if(that.hitboxCoolDown === true){
          scene.attackHitBox.x = this.x-20;
          scene.attackHitBox.y = this.y;
          that.hitboxCoolDown = false; 
        }else{
          scene.attackHitBox.x = this.x;
          scene.attackHitBox.y = this.y+10000;
          this.sliceDamage = 0;
          this.bluntDamage = 0;
          this.pierceDamage = 0;
          this.heatDamage = 0;
          this.lightningDamage = 0;
          this.coldDamage = 0;
        }
      }else if(keyShift.isDown){
        this.setVelocityX(0);
        this.setVelocityY(0);
        //this.anims.play('pIdleIdle',true);
      }else{
        scene.attackHitBox.x = this.x;
        scene.attackHitBox.y = this.y+10000;
      }
      /*else if(keyShift.isDown && this.lastKey === 'd'){
        this.setVelocityX(0);
        this.anims.play('pIdleRight',true);
      }else if(keyShift.isDown && this.lastKey === 'a'){
        this.setVelocityX(0);
        this.anims.play('pIdleLeft',true);
      }*/
    }
  
  }

}