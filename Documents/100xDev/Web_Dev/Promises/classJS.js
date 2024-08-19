class Rectangle{
    constructor(length,width){
        this.length=length;
        this.width=width;
    }
    area(){
        return this.length*this.width;
    }
    distroy(){

    }
}
const obj1=new Rectangle(10,20);
console.log(obj1);
const area=obj1.area();
obj1.distroy();
console.log(area);