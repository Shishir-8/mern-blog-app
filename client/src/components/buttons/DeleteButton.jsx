import { useDispatch } from "react-redux"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "react-toastify"
import { deleteBlog } from "@/redux/blog/blogThunk"


export function DeleteButton({blogId}) {
    const dispatch = useDispatch()

    const handleDelete = async (blogId) => {
        try {
            await dispatch(deleteBlog(blogId)).unwrap()
            toast.success("Blog deleted succesfully") 
        } catch (error) {
            toast.error(error || "Failed to delete blog")
        }
    }
    
 
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Confirm Delete ?</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this blog?
                </DialogDescription>
            </DialogHeader>

            <DialogFooter>
             <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
            onClick={()=> handleDelete(blogId)}
            type="submit" variant={"destructive"}>Yes, Delete</Button>
          </DialogFooter>

        </DialogContent>
       
      </form>
    </Dialog>
  )
}

