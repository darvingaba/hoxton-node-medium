import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

const port = 3346;

app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany({ include: { comments: true } });
  res.send(posts);
});
app.get("/posts/:id", async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    include: { comments: true },
  });
  res.send(post);
});

app.patch("/posts/:id", async(req,res)=>{
  const id = Number(req.params.id)
  const postContent = req.body.content
  const updatedPost = await prisma.post.update(
    {where:{id},
    data:{
      content:postContent
    }
    })
    res.send(updatedPost)
})

app.post("/posts", async (req, res) => {
  const newPost = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.send(newPost);
});

app.delete("/posts/:id", async(req,res)=>{
  const deletedPost =await prisma.post.delete({where:{id:Number(req.params.id)}})
  res.send(deletedPost)
})

app.get("/comments", async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: { Post: true },
    });
    res.send(comments);
  } catch (error) {
    res.send(error);
  }
});

app.get("/comments/:id", async (req, res) => {
  const comment = await prisma.comment.findUnique({
    where: { id: Number(req.params.id) },
    include: { Post: true },
  });
  res.send(comment);
});
app.post("/comments", async (req, res) => {
  const newComment = await prisma.comment.create({
    data: {
      userName: req.body.userName,
      commentText: req.body.commentText,
      postId: req.body.postId,
    },
  });
  res.send(newComment)
});

app.patch("/comments/:id", async (req, res) => {
  const id = Number(req.params.id)
  const commentText = req.body.commentText
  const updatedComment = await prisma.comment.update(
    {where:{id},
    data:{commentText}
    })
    res.send(updatedComment)
})

app.listen(port, () => {
  console.log("server up");
});
