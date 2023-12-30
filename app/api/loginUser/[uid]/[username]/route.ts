import { db } from "@/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params} : {params: {username: string, uid: string}}) {
  
  if(!params.uid){
    return new NextResponse('uid required',{status: 400});
  }
  else if(!params.username){
    return new NextResponse('username required',{status: 400});
  }
  try {
    const q = query(
      collection(db, "userpdfs"),
      where("uid", "==", params.uid)
    );
    const queryResult = await getDocs(q);
    if (queryResult.size == 0) {
      await addDoc(collection(db, "userpdfs"), {
        name: params.username,
        uid: params.uid,
        pdfs: []
      });
    }
    return new NextResponse(params.uid);
  } catch (err) {
    console.log("[LOGIN_USER]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
