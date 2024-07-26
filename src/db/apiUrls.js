import supabase from "./supabase";

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



