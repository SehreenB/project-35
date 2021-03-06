var dog, happyDog, foodS, foodStock;
var dogImg, happydogImg;
var database;

function preload()
{
  dogImg = loadImage("Dog.png");
  dogHappy = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,300);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  fill("black")
  textSize(15)
  text("Food Remaining: " + foodS,190,200)
  drawSprites();
  //add styles here
  fill("black")
  textSize(20)
  text("Press the up arrow to feed the Dog",100,100)

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


