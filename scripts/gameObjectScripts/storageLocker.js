//storrage object to let the player store extra items they obtain.
class storageLocker extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'storageLocker');
        //then we add new instance into the scene.
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //object set to not be pushable. 
        this.setPushable(false);
        //sets scale to 1 third. sprites are upscaled by 3 times so they look sharper.
        this.setScale(1/3,1/3);
        //changes collision box size.
        this.setSize(40,50,true);
   
        //warp sprite animations
        this.anims.create({key: 'closed',frames: this.anims.generateFrameNames('storageLocker', { start: 0, end: 0}),frameRate: 8,repeat: -1});
        this.anims.create({key: 'opening',frames: this.anims.generateFrameNames('storageLocker', { start: 0, end: 0}),frameRate: 8,repeat: 0});
        this.anims.create({key: 'closing',frames: this.anims.generateFrameNames('storageLocker', { start: 0, end: 0}),frameRate: 8,repeat: 0});
    
        this.anims.play('closed',true);

        this.scene = scene;

        this.lockerKeyPrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
        this.lockerKeyPrompts.visible = false;
        this.promptCooldown = false;
        this.alreadyOpened = false;

        //variables use to protect the object from being called at the wrong time.
        this.safeToOpen = false;
        this.openCoolDown= false;
        
    }

    //function which saves the game to the hard memory file when the boject is interacted with
    activateStorage(scene1,keyW){
        
        //console.log("this.safeToOpen: ",this.safeToOpen, " keyW.isDown: ", keyW.isDown," this.openCoolDown: ",this.openCoolDown);

        //if the player is withing the correct range, and the press w and the cooldown is false then save the game
        if( this.safeToOpen === true && keyW.isDown && this.openCoolDown === false){
            
            console.log('activating locker');
            // call the emitter to check if the value already was picked up.
            inventoryKeyEmitter.emit(inventoryKey.activateStorage,this.scene);
           
            // functions been activated so create set save cooldown to true
            this.openCoolDown = true; 
            
             let thisLocker = this;
             setTimeout(function () {
                thisLocker.openCoolDown = false;    
            }, 1000);

        //this code plays the animation for the w key under the save stone
        }else if( this.safeToOpen === true && this.promptCooldown === false){
            console.log("prompts active");
            this.lockerKeyPrompts.visible = true;
            this.lockerKeyPrompts.playWKey();
            this.promptCooldown = true;       
        }

        //set w key prompt to be invisible if the play is not over it.
        if(this.safeToOpen === false){
            this.lockerKeyPrompts.visible = false;
            this.promptCooldown = false;
        }
          
    }
}