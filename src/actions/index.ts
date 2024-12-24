'use server';

import { db } from "@/db";
import { redirect } from "next/navigation";
export async function editSnippet(id:number , code:string){


    console.log(id , code);
    await db.snippet.update({
        where: {id} , 
        data: {code}
    });

    redirect(`/snippets/${id}`);


}

export async function deleteSnippet(id:number){
    await db.snippet.delete({
        where:{id}
    });
    redirect('/');
}

export async function createSnippet(formState: {message:string} , formData: FormData ) {
  
    // // Check the user's inputs and make sure they're valid
    const title = formData.get('title');
    const code = formData.get('code');
    // Create a new record in the database

    if(typeof title !=='string' || title.length < 3){
        return {
            message: "Title must be longer"
        }
    }
    
    if(typeof code !=='string' || code.length < 10){
        return {
            message: "Code must longer"
        }
    }

    const snippet = await db.snippet.create({
        data: {
            title,
            code
        }
    })
    redirect('/')

}