//create bird constructor
function Bird(){
    this.y = height/2;
    this.x = 25;

    this.gravity = 0.6;
    this.velocity = 0;
    this.upForce = -10;


    this.show = function(){
        noStroke();
        fill(255,255,0);
        ellipse(this.x, this.y, 32, 32);
    }

    this.up = function() {
        this.velocity += this.upForce;
    };

    this.update = function(){
        this.velocity += this.gravity;
        this.velocity *= 0.9; //air resistance (we shrink the number each time)
        this.y += this.velocity;


        //if bird falls of screen
        if(this.y > height){
            this.y = height;
            this.velocity = 0;
        }

        //if bird goes above the screen
        if(this.y < 0){
            this.y = 0;
            this.velocity = 0;
        }
    }


}