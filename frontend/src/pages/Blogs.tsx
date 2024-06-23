import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {

    const{loading,blogs}=useBlogs();
    if(loading){
        return <div>
            loading...
        </div>
    }
  return (<div>

   <Appbar/>
    <div className="flex justify-center">
       <BlogCard
       authorName={"abhilash"}
       title={"title of the blog"}
       content={"content of the blog"}
       publishedDate={" 26th March 2024"}
       />

    </div>
    </div>
  )
}
