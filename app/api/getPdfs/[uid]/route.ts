import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: {uid: string}}) {
    try{
        const q = query(collection(db, 'userpdfs'), where('uid', '==', params.uid));
        const queryResult = await getDocs(q);
        if(queryResult.empty){
          return new NextResponse('')
        }
        const pdfs = queryResult.docs[0].data().pdfs;        
        return new NextResponse(JSON.stringify(pdfs));
      }
      catch(err){
        console.log('[GET_PDFS]',err);
        return new NextResponse('Internal Server Error', {status: 500});    
      }
}