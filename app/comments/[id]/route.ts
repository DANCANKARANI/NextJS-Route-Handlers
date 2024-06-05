import { redirect } from "next/navigation";
import { comments } from "../data";

 export async function GET(
     //underscore since we're not using the request parameter
     _request:Request,
     {params}:{params:{id:string}}

 ){
    if (parseInt(params.id)>comments.length){
        redirect("/comments")
    }
     const comment =comments.find(
         (comment)=>comment.id ===parseInt(params.id)
     )
     return  Response.json(comment);
 }

export async function PATCH(
    request:Request,
    {params}:{params:{id:string}}
){
    //getting the parsed data and storing in a body const
    const body=await request.json();
    //get the text from the body
    const {text} =body;
    //finding the comment that matches the parsed id
    const index =comments.findIndex(
        comment => comment.id ===parseInt(params.id)
    )
    //storing the updated text in the comment
    comments[index].text=text;


    return  Response.json(comments[index]);
}

export async function DELETE(
    //parsing the parameters
    request:Request,
    {params}:{params:{id:string}}
){
    //finding the comment with the parsed id
    const index=comments.findIndex(
        (comment) => comment.id === parseInt(params.id)
    )

    const deletedComment = comments[index]
    //splice removes the comment with the specified id
    comments.splice(index, 1)
    return  Response.json(deletedComment);
}