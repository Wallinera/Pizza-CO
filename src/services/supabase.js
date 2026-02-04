import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://llcuojxfarmstiidbufz.supabase.co";
const supabaseKey = "sb_publishable_55bVycRP5XVPDE93yp2A9A_OlvhouTx";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
