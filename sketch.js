var player
var npc1, npc2, npc3
var platform
var enemy1
var backg, ts, titleN
var gameState = "title"
var button
var PG




function preload(){

    bgImg = loadImage("images/Bg.png")

    PlayerW = loadAnimation("images/Walk1.png", "images/Walk2.png","images/Walk3.png","images/Walk4.png","images/Walk5.png")
    PlayerI = loadAnimation("images/Idle.png")
    PlayerJ = loadAnimation("images/Jump.png")

 

    NpcI1 = loadImage("images/Npc1.png")
    NpcI2 = loadImage("images/Npc2.png")
    NpcI3 = loadImage("images/Npc3.png")

    EnemyI1 = loadImage("images/Enemy1.png")
    Enemy2W = loadAnimation("images/Enemy2W1.png","images/Enemy2W2.png","images/Enemy2W3.png")
    Enemy2I = loadAnimation("images/Enemy2.png")

    PlatformI1 = loadImage("images/Platform1.png")
    PlatformI2 = loadImage("images/Platform2.png")

    bgTitle = loadImage("images/Title.png")
    Ntitle1 = loadImage("images/Logo.png")
    Ntitle2 = loadImage("images/Logo(alt).png")

    ChainI = loadImage("images/Chain.png")

}

function setup(){
    createCanvas(windowWidth , windowHeight)

    PG = new Group()

    //background
    backg = createSprite(windowWidth/2 , windowHeight/2)
    backg.addImage(bgImg)
    backg.scale = 2.5
    backg.visible = false

    //platform = createSprite(windowWidth/2,windowHeight-100, 500, 400)
    createPlatform(windowWidth/2,windowHeight-100, 2,0.5)

    createPlatform(windowWidth/2 + 400 ,windowHeight-100 , 2,0.5)
   
    PG.setVisibleEach(false)


    npc1 = createSprite(windowWidth/2+450 , windowHeight/2+150)
    npc1.addImage(NpcI1)
    npc1.scale = 0.20


    player = createSprite(windowWidth/2 , windowHeight/2+100)
    player.addAnimation("walk", PlayerW)
    player.addAnimation("idle", PlayerI)
    player.addAnimation("jump",PlayerJ)
    player.changeAnimation("idle",PlayerI)
    player.scale = 0.35

    
    //player.debug = true
    //platform.debug = true

    ts = createSprite(windowWidth/2, windowHeight/2)
    ts.addImage(bgTitle)
    ts.scale = 2.8
    ts.visible = false

    titleN = createSprite(windowWidth/2, windowHeight/2-200)
    titleN.addImage(Ntitle2)
    titleN.scale = 2.5
    titleN.visible = false
        
}

function draw(){
    background(255)
  


   //console.log(gameState)


    if(gameState === "play"){
     
      
        //====================GAME START===============================
        backg.visible = true
        ts.visible = false
        titleN.visible = false
        PG.setVisibleEach(true)
   
        //===========================camera============================
        camera.position.x = player.x

       
       
        player.collide(PG)
        //===================gravity===================================
        player.velocityY += 1
        
        //=======================player================================


        //JUMP
        if(keyWentDown("W")){
            player.changeAnimation("jump",PlayerJ)
            player.velocityY = -20
        }
        if(keyWentUp("W")){
            player.changeAnimation("idle",PlayerI)
        }


        //RIGHT
        if(keyDown("D")){
            player.changeAnimation("walk",PlayerW)
            player.velocityX = 5
        }
        if(keyWentUp("D")){
            player.velocityX = 0
            player.changeAnimation("idle",PlayerI)
        }

        //LEFT
        if(keyDown("A")){
            player.changeAnimation("walk",PlayerW)
            player.velocityX = -5
        }
        if(keyWentUp("A")){
            player.velocityX = 0
            player.changeAnimation("idle",PlayerI)
        }


        
    }  

   if(gameState === "title"){
        ts.visible = true
        titleN.visible = true
    }
    drawSprites()
    
if(gameState==="title"){

    textSize(25)
    fill("#5dcad8")
    strokeWeight(3)
    stroke(0)
    text("Press 'SPACE' to start", windowWidth/2 -150, windowHeight/2 +70)

    if(keyDown("SPACE")){
        gameState = "play"
    }
    
}

}



function createPlatform(xpos,ypos,type, scale){

 

    platform = createSprite(xpos,ypos)
    
    platform.setCollider("rectangle",0,0,550,450)

    if(type === 1){
        platform.addImage(PlatformI1)
        platform.scale = scale
        
    }
    if(type === 2){
        platform.addImage(PlatformI2)
        platform.scale = scale
    }

    PG.add(platform)

}