import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UpdateUserProps{
    uid?: string,
    currentPdf?: string,
    randomVar?: boolean
}

interface UserProps {
    uid: string,
    currentPdf: string,
    randomVar: boolean,
    updateUser: (props: UpdateUserProps)=>void,
    refetchPdfs: () => void,
    logoutUser: () => void
}
 
export const useUser = create(persist<UserProps>(
    (set) => ({
       uid: '',
       currentPdf: '',
       randomVar: false,
       refetchPdfs: () => set((state)=>({randomVar: !state.randomVar})),
       updateUser: (props: UpdateUserProps) => set((state)=> ({...state, ...props})),
       logoutUser: () => set(()=>({email: '', pdfs: [], currentPdf: ''}))
    }),
    {
        name: 'dop-storage',
        storage: createJSONStorage(()=>localStorage)
    }
));