import * as PIXI from 'pixi.js'

class MyCanvas{
    my_width=window.innerWidth;
    my_height=window.innerHeight;
    sec_hand=new PIXI.Container();
    min_hand=new PIXI.Container();
    hour_hand=new PIXI.Container();
    date=new Date();
    init(){
        const canvas=document.getElementById("mycanvas")
        const app=new PIXI.Application({
            view: canvas,
            width:this.my_width,
            height:this.my_height,
            antialias:true,
            backgroundColor:0xAAAAAA,
            resizeTo:window})
        const circle=new PIXI.Graphics();
        circle.x=app.renderer.width/2;
        circle.y=app.renderer.height/2;
        circle.lineStyle(3,0x000000);
        circle.beginFill(0xffffff);
        circle.drawCircle(0,0,100);
        circle.endFill();
        app.stage.addChild(circle);
       

        this.secline(circle.x,circle.y);
        this.minline(circle.x,circle.y);
        this.hourline(circle.x,circle.y);
        
        app.stage.addChild(this.sec_hand);
        app.stage.addChild(this.min_hand);
        app.stage.addChild(this.hour_hand);

        this.sec_hand.position.set(circle.x,circle.y);
        this.sec_hand.pivot.x = circle.x;
        this.sec_hand.pivot.y =  circle.y;

        this.min_hand.position.set(circle.x,circle.y);
        this.min_hand.pivot.x = circle.x;
        this.min_hand.pivot.y =  circle.y;

        this.hour_hand.position.set(circle.x,circle.y);
        this.hour_hand.pivot.x = circle.x;
        this.hour_hand.pivot.y =  circle.y;
        app.ticker.add((delta)=>{ 
            this.mytime();
        })
        app.ticker.start();
        /*
        this.sec_hand.rotation += 0.00833333333;
        this.min_hand.rotation += 0.000833333333;
        this.hour_hand.rotation += 0.0000833333333;
        */
    }
    secline(x_pos,y_pos){
        const sec_pointer=new PIXI.Graphics();
        sec_pointer.lineStyle(1,0xff0000);
        sec_pointer.beginFill(0xff0000);
        sec_pointer.moveTo(x_pos,y_pos);
        sec_pointer.lineTo(x_pos,y_pos-90);
        sec_pointer.endFill();
        this.sec_hand.addChild(sec_pointer);

    }
    minline(x_pos,y_pos){
        const min_pointer=new PIXI.Graphics();
        min_pointer.lineStyle(3,0x000000);
        min_pointer.beginFill(0x000000);
        min_pointer.moveTo(x_pos,y_pos);
        min_pointer.lineTo(x_pos,y_pos-80);
        min_pointer.endFill();
        this.min_hand.addChild(min_pointer);
    }
    hourline(x_pos,y_pos){
        const hour_pointer=new PIXI.Graphics();
        hour_pointer.lineStyle(5,0x000000);
        hour_pointer.beginFill(0x000000);
        hour_pointer.moveTo(x_pos,y_pos);
        hour_pointer.lineTo(x_pos,y_pos-50);
        hour_pointer.endFill();
        this.hour_hand.addChild(hour_pointer);
    }
 
    toRadian(deg)
    {
        return deg*Math.PI/180;
    }

    mytime(){
        this.date=new Date();
        const nano=this.date.getMilliseconds();
        const seconds=this.date.getSeconds();
        const minutes=this.date.getMinutes();
        const hours=this.date.getHours();//to get 12 hr format
        
        const no_of_mills=seconds*1000+nano;
        this.sec_hand.rotation=this.toRadian(360/60/1000*no_of_mills);
        const no_of_current_seconds=minutes*60+seconds;
        this.min_hand.rotation=this.toRadian((360/60/60)*no_of_current_seconds);
        const no_of_mins=hours*60+minutes;

        this.hour_hand.rotation=this.toRadian((360/12/60*no_of_mins));
    }
   
}
const clock=new MyCanvas()
clock.init()


