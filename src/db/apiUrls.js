import Error from "@/components/error";
import supabase,{supabaseUrl} from "./supabase";
import { UAParser } from "ua-parser-js";

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


export async function getLongUrl(id){  
    let {data,error} = await supabase
    .from("urls")  // from table name
    .select("id, original_url")   // as we want original url
    .or(`short_url.eq.${id},custom_url.eq.${id}`) // either of these matches the id
    .single();
    if(error) {
        console.error(error);
        throw new Error("Unable to get long url");
    }

    return data;
}

// to get device information -> we are going to use UAParser

const parser = new UAParser();
export const storeClicks = async({id,originalUrl})=>{

    try{
        const res = parser.getResult();
        const device = res.type || "desktop";

        const response =  await fetch("https://ipapi.co/json");
         const{city,country_name : country} = await response.json();

         await supabase.from("clicks").insert({
            url_id:id,
            city:city,
            country:country,
            device:device,
         });

         window.location.href = originalUrl;

    }catch(error){

        console.error('Error while storing clicks',error);
    }

}




