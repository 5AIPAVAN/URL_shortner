import Error from "@/components/error";
import supabase,{supabaseUrl} from "./supabase";

export async function getUrls(user_id){
    let {data,error} = await supabase
    .from("urls")  // from table name
    .select("*")   // what you want to select
    .eq("user_id",user_id);  // where it matched with user_id
    if(error) {
        console.error(error);
        throw new Error("Unable to load url's");
    }
    console.log('data in urlapiiiiii',data);
    return data;
}

export async function deleteUrl(url_id){  // delete the url eith given url_id
    let {data,error} = await supabase
    .from("urls")  // from table name
    .delete()   // as we want to delete
    .eq("id",url_id);  // where id matches the given url_id
    if(error) {
        console.error(error);
        throw new Error("Unable to delete url");
    }

    return data;
}


export async function createUrl({title,longUrl,customUrl,user_id},qrcode){

    const short_url = Math.random().toString(36).substring(2,6);
    const fileName = `qr-${short_url}`;
    // same as done for profile_pic duing signup(apiAuth.js)
    const {error:storageError} = await supabase.storage.from("qrs").upload(fileName,qrcode);

    if(storageError) throw new Error(storageError.message);

     const qr=`${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

     const {data,error} = await supabase.from("urls").insert([
        {
            title,
            original_url : longUrl,
            custom_url: customUrl || null,
            user_id,
            short_url,
            qr,
        }
     ]).select();  // .select() is used to return once it is created

     if(error){
        console.error(error.message);
        throw new Error("Error while creating a new Url");
     }

     return data;


}



