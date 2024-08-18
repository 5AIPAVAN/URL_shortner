import supabase from "./supabase";
import { UAParser } from "ua-parser-js";

export async function getClicksForUrls(urlIds){
    const {data,error} = await supabase
    .from("clicks")  // from table name
    .select("*")   // what you want to select
    .in("url_id",urlIds);  // in is user for arrays-> urlIds
    if(error) {
        console.error(error.message);
        return null;
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

export async function getClicksForUrl(url_id){  // user_id is necessary so we can compare -> the logged in user is owner or not
    const {data,error} = await supabase
    .from("clicks")  // from table name
    .select("*")   // what you want to select
    .eq("url_id",url_id)  // where it matched with url_id
    
    if(error) {
        console.error(error);
        throw new Error("Unable to get Click details of url");
    }
   
    return data;
}






