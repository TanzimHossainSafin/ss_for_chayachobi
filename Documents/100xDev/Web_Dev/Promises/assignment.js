const fs=require('fs');
function cleanFilePromisefied(resolve){
         resolve();
}
function extract(err,data){
    console.log(data.trim());
    return data.trim();
}
function main(){
    const my_data=fs.readFile('text.txt','utf8',extract);  
    console.log(my_data)  ;
    return my_data;
}
const a=new Promise(cleanFilePromisefied).then(main);
console.log(a);

fs.writeFile('text.txt',a,(err)=>{
    if (err) {
        console.error(err);
    } else {
        console.log('File written successfully');
    }
});
console.log(a)
fs.readFile('text.txt','utf8',(err,data)=>{
    if(err){
        console.log('Failed!')
    }else{
        console.log(data);
    }
});