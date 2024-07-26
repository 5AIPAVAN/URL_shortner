import supabase from "./supabase";

export async function getUrls(user_id){
    const{data,error} = await supabase
    .from("urls")  // from table name
    .select("*")   // what you want to select
    .eq("user_id",user_id);  // where it matched with user_id
    if(error) {
        console.error(error.message);
        throw new Error("Unable to load url's");
    }
    return data;
}

