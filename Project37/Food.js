class Foods{
    constructor(){
        //var foodStock;
        //var lastFed;
        this.image = loadImage("Milk.png");
        this.foodStock;

    }

    getFoodStock(){
     this.foodStock = this.foodStock;       
    }
    updatefoodStock(){
        var x = 100;
        this.foodStock= x;
    }
    deductFood(){
        this.foodStock = this.foodStock-1;
    }
   

    display(){
       var x=80,y=100;

       imageMode(CENTER);
       image(this.image,720,220,70,70);

       if(this.foodStock!=0){
           for(var i=0;i<30;i++){
               if(i%10===0){
                   x=80;
                   y=y+50;
               }
               image(this.image,x,y,50,50);
               x=x+30;
           }
       }

    }
}