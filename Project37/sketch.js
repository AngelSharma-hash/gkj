var dog;
var dogIMG,doghappy;
var database;
var foodStock;
//var food;
var foodS;
var button1,button2;
var foodObj;
var lastFed;
var FedTime;
var gameState;
var readState;
var bedroom;
var garden;
var washroom;

function preload()
{
  dogIMG = loadImage("Dog.png");
  doghappy = loadImage("happydog.png");
  sadDog = loadImage("virtual pet images/deadDog.png")
  bedroom = loadImage("virtual pet images/Lazy.png");
  gardens = loadImage("virtual pet images/Garden.png");
  washrooms = loadImage("virtual pet images/Wash Room.png");

}

function setup() {
	

  database = firebase.database();
  //console.log(database);

  foodObj = new Foods(200,200,10,10);

  createCanvas(1000,500);

  dog = createSprite(300,300,20,20);
  dog.addImage(dogIMG);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  FedTime = database.ref('lastFed');
  FedTime.on("value", function(data){
    lastFed=data.val;

    readState = database.ref('gameState');
    readState.on("value",function(data){
      gameState = data.val();
    })
  
  })

   feed = createButton("feed the dog");
  feed.position(400,200);
  feed.mousePressed(feedDog);

   addFood=createButton("Add Food");
  addFood.position(300,500);
  addFood.mousePressed(addFoods);

}  

function draw() { 
  background(46, 139, 87) 

/*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(doghappy);
  }*/ 
  //console.log(Food);
  
  fill("red");
   text(foodS,200,300);

   foodObj.display();
    
  drawSprites();

  
  
  currentTime= hour();
  if(currentTime===(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime===(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }

  if(gameState!="Hungry"){
     feed.hide();
     addFood.hide(); 
     dog.remove();
    }
    else{
      feed.show();
      addFood.show();
      dog.addImage(sadDog);
    }

    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("Last feed: "+times%12+"PM",300,300);
    }
    else if(lastFed==0){
      text("Last Feed :",300,300);
    }
    else{
      text("Last Feed :",lastFed+"PM",500,300);
    }

    fill("red"); 
  text("Press UP_ARROW key to feed the dog",100,150);

}

function readStock(data){
  foodS=data.val();
  
 }

 function readTime(data){
  times=data.val();
  
 }

function writeStock(x){
  var dataRef = database.ref("Food");

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({Food:x})

}

function feedDog(){
  dog.addImage(doghappy);

  foodObj.updatefoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}

function bedrooms(){
  background(bedroom,550,500);
}

 function garden(){
  background(gardens,550,500);
}

function washroom(){
  background(washrooms,550,500);
}


