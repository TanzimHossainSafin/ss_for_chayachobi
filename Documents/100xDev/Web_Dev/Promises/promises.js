// function wait3sec(resolve){
//       setTimeout(resolve,3000);
// }
// function main(){
//     console.log("hi i'm clicked");
// }
// const a=new Promise(wait3sec);//this is called 
// a.then(main)
// console.log(a);
// function setTimeoutPromisefied(duration){
//     return new Promise(function(resolve){
//       setTimeout(resolve,duration)
//     });
// }
// const p=setTimeoutPromisefied(3000);
// console.log(p);
// p.then(function(){
//     console.log(`promise resolve!`);
// });

//this code is read a file from another one and write it to another file with using promises
const fs=require('fs');
function readFile() {
    return new Promise(function(resolve, reject) {
        fs.readFile('text.txt', 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

readFile().then(function(data) {
    console.log(data);
    fs.writeFile('resultext.txt', data, function(err) {
       if(err){
        console.log(`Error`);
       }else{
        console.log('Writing successful!');
       }
    });
}).catch(function(err){
    console.log(err);
});
console.log(`Reading file...`);