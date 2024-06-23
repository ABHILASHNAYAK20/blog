import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput } from "@abhilash_26/medium-common";
import { updateBlogInput } from "@abhilash_26/medium-common";


export const blogRouter=new Hono<{
    Bindings:{
      DATABASE_URL :string,
      JWT_SECRET:string
    },
    Variables:{
        userId: string;
    }
    
  }>();

  // Middleware

blogRouter.use('/*', async(c,next)=>{

    const authHeader =c.req.header("authorization") || "";
  
      //Bearer token =>["Bearer", "token"];
    //   const token =authHeader.split(" ")[1]
  try{
    const user = await verify(authHeader, c.env.JWT_SECRET)
    if(user){
        c.set("userId", user.id)
       await next()
    }else{
      c.status(403)
      return c.json({error:"unauthorized"})
    }
} catch(e){
    c.status(403);
    return c.json({
        message :"You are not logged in"
    })
}
  })


blogRouter.post('/', async(c) => {
    const authorId = c.get("userId");
    const body = await c.req.json();
    const prisma =new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const { success } =createBlogInput.safeParse(body);
      if(!success){
          c.status(411);
          return c.json({
              message:"Inputs not correct"
          })
      }
    
      const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
      })
    return c.json({
        id:blog.id
    })
  })


  blogRouter.put('/', async(c) => {
    const body = await c.req.json();
    const prisma =new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const { success } =updateBlogInput.safeParse(body);
      if(!success){
          c.status(411);
          return c.json({
              message:"Inputs not correct"
          })
      }
      const blog = await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title: body.title,
            content: body.content,
            
        }
      })
    return c.json({
        id:blog.id
    })
  
  })

//pagination
blogRouter.get('/bulk', async(c) => {
    const prisma =new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const blogs =await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
      });

    return c.json({
        blogs
    })
})


blogRouter.get('/:id', async(c) => {
    const id =  c.req.param("id");
    const prisma =new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
      try{
        const blog = await prisma.post.findUnique({
            where:{
                id:Number(id)
            },
          })
        return c.json({
           blog
        })
      }
   catch(e){
    c.status(411);
    return c.json({
        message:"Error while fetching Blog"
    })
}
   
})

