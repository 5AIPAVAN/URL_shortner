import supabase from "./supabase";

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

