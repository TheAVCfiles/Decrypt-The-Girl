import * as f from "firebase-functions";
export const agent=f.https.onRequest(async(req,res)=>{res.send(`Agent received: ${req.body?.prompt??"(none)"}`)});
