//Create variables here
var foodS,fedTime,lastFed,foodObj,gameState,readState,changeState,bedroom,garden,washroom;
function preload()
{
  //load images here
  dogImg=loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png");
  bedroom=loadImage('Bed Room.png');
  garden=loadImage('Garden.png');
  washroom=loadImage('Wash Room.png');
  sadDog=loadImage('deadDog.png');
}

function setup() {
  createCanvas(800, 700);
  database=firebase.database();

  readState=database.ref('gameState');
  readState.on('value',function(data){
    gameState=data.val();
  })

  dog=createSprite(400,600);
  dog.addImage('hi',dogImg);
  dog.addImage('why',happyDog);
  dog.scale=0.2;

  feed=createButton('Feed the Dog');
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood=createButton('Add Food');
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  foodObj=new Food
}


function draw() {  
  background(46,139,87);

  fedTime=database.ref('FeedTime');
  fedTime.on('value',function(data){
    lastFed=data.val();
  })

  foodObj.display();
  foodObj.getFoodStock();
  drawSprites();

  //add styles here
  
  currentTime=hour();
  
  if(currentTime==(lastFed+1)){
    update('playing');
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update('sleeping');
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update('bathing');
    foodObj.washroom();
  }else{
    update('hungry');
    foodObj.display();
  }
  
  if(gameState!='hungry'){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else if(gameState==='hungry'){
    feed.show();
    foodObj.display();
    addFood.show();
    dog.addImage(sadDog)
  }


  textSize(15);
  fill(255,255,254);
  text('Food left: '+foodS,200,30)
  if(lastFed>=12){
    text('Last Fed: '+lastFed%12+'PM',350,30)
  }
  else if(lastFed===0){
    text('Last Fed: 12 AM ',350,30)
  }
  else{
    text('Last Fed: '+lastFed+'AM',350,30)
  }
}

function feedDog(){
  dog.changeImage('why');
  foodS=foodS-1;
  foodObj.updateFoodStock();
  database.ref('/').update({
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
  })
}



