// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { resolve } from "path";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI-rT8ZHozpFCgDOpNiDnycg_0FaJTtD8",
  authDomain: "tech-tonic-workplace.firebaseapp.com",
  projectId: "tech-tonic-workplace",
  storageBucket: "tech-tonic-workplace.firebasestorage.app",
  messagingSenderId: "386342982287",
  appId: "1:386342982287:web:7c3ea38cc4edd50e3696fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file:File, setProgress?: (progress: number) => void){
    return new Promise((resolve,reject) =>{
        try{
            const storageRef = ref(storage,file.name)
            const uploadTask = uploadBytesResumable(storageRef,file)

            uploadTask.on("state_changed",
            snapshot =>{
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                
                if(setProgress) setProgress(progress)
                switch (snapshot.state){
                    case "paused":
                        console.log("Upload is paused")
                        break
                    case "running":
                        console.log("Upload is running")
                        break
                }
                    
            },
            (error) =>{
                reject(error)
            },
            () =>{
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>{
                    resolve(downloadURL)
                })
            }
            )

        }
        catch(error){
            console.error(error)
            reject(error)
        }
    })
}
    