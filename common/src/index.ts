import z, { ZodDate, date } from "zod"

export const signupInput =z .object({
    email : z.string().email(),
    password: z.string().min(6),
    name:z.string().optional()

})
//types inference

export type SignupInput =z.infer<typeof signupInput>

//signin

export const signinInput =z .object({
    email : z.string().email(),
    password: z.string().min(6),
    

})
//types inference

export type SigninInput =z.infer<typeof signinInput>

export const createBlogInput =z .object({
    title : z.string(),
    content: z.string(),
    Date:z.date()
    
})
export type CreateBlogInput =z.infer<typeof createBlogInput>

export const updateBlogInput =z .object({
    title : z.string(),
    content: z.string(),
    id: z.number(),
    Date:z.date()
    
})
export type UpdateBlogInput =z.infer<typeof updateBlogInput>