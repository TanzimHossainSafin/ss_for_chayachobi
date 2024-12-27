import express from 'express';
import mongoose from 'mongoose';
import { userModel, contentModel} from './db';
import jwt from 'jsonwebtoken';
import {  UserMiddleware } from './Usermiddleware';
const JWT_SECRET="Code is the real love";
const app=express();
app.use(express.json());
app.post('/api/v1/signup',async (req,res)=>{
  try{
   const username=req.body.username;
   const is_exist=await userModel.findOne({
    username
  });
  if (is_exist){
    console.log(`Sorry This user name is already taken!`);
  }
   const password=req.body.password;
   await userModel.create({
     username:username,
     password:password
   })
   res.json(`You are signup`);
  }catch(e){
    console.error(e);
  }
   
});
app.post('/api/v1/signin',async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const is_exist=await userModel.findOne({
      username
    });
    if(!is_exist){
      res.json(
        {message:"Sorry user is not exist! Try with correct cridentials"}
      )
    }else{
      const id=is_exist._id;
      const token=await jwt.sign({id:id},JWT_SECRET);
      res.json({
        message:"You are signed in!",
        token:token
      })
    }
})
app.post('/api/v1/content',UserMiddleware,async(req,res)=>{
   try {
     const link=req.body.link;
     const type=req.body.type;
     await contentModel.create({
      link,
      type,
      //@ts-ignore
      userId:req.userId,
      tag:[]
     });
     res.json({
      message:"Successfully Added Content!"
     });
   } catch (error) {
     res.status(500).json({ error: 'Internal Server Error' });
   }
});
app.get('/api/v1/content',UserMiddleware,async(req,res)=>{
  // @ts-ignore
  const userId=req.userId;
  const content=await contentModel.findOne({
    userId,
  }).populate("userId","username");// to see the foreign key 
  if(content){
    res.json({
      content
    })
  }
});
app.delete('/api/v1/content',UserMiddleware,async(req,res)=>{
   const contentId=req.body.contentId;
   await contentModel.deleteMany({
    contentId,
    // @ts-ignore
    userId:req.userId
   })
   res.json({
    message:"Your content is Delete successfully"
   });
});
app.post('/api/v1/share',(req,res)=>{

});
app.post('/api/v1/brain:/shareLink',(req,res)=>{

})
async function main(){
  await mongoose.connect(``)
  app.listen(3000);
  console.log(`Server is Running`)
}
main();