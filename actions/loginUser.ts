import { auth, db, provider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const loginUser = async (updateUser: Function) => {
try{
    const userAuth = await signInWithPopup(auth, provider);
    const q = query(collection(db, 'userpdfs'), where('email', '==', userAuth.user.email));
    const queryResult = await  getDocs(q);
    if(queryResult.size == 0){
        await addDoc(collection(db, 'userpdfs'),{
            name: userAuth.user.displayName,
            email: userAuth.user.email,
            pdfs: []
        })
        updateUser({email: userAuth.user.email});
        return 'ok'
    }
    else{
        updateUser({ email : queryResult.docs[0].data().email })
        return 'ok'
    }
}
catch(err){
    console.log('LOGIN_ERROR',err);
    return 'error'
}
}