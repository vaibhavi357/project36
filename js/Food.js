class Food{
    constructor(){
        this.img=loadImage('Milk.png');
        this.foodStock
    }

    getFoodStock(){
        this.foodStock=database.ref('Food');
        this.foodStock.on("value",function(data){
            foodS=data.val();
            
        });
    }

    updateFoodStock(){
        database.ref('/').update({
            Food:foodS
        });
        
    }

    display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.img,350,600,70,70);

        if(foodS!=0){
            for(var i=0;i<foodS;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.img,x,y,50,50)
                x=x+30;
            }
        }
    }

    bedroom(){
        imageMode(CENTER);
        image(bedroom,400,350,800,700)
    }

    garden(){
        imageMode(CENTER);
        image(garden,400,350,800,700)
    }

    washroom(){
        imageMode(CENTER);
        image(washroom,400,350,800,700)
    }
}