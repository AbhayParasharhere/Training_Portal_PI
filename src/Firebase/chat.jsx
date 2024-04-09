import { db } from "./firebaseConfig";
import { setDoc, doc, collection } from "firebase/firestore";

const userChatRef = collection(db, "userChats");

export function createUserChats(currentUser) {
  {
    /*
        Logic: There are going to be 2 new collections :
        1.) Chats: here all the chats will be stored, each conversation messages will be separated by
            the (unique) combined id for each coversation (combined id: currentuser.id > user.id ? currenuser.id + user.id : user.id+currentuser.id)
            {This will insure that the combined id is same for all people}  

        2.) UserChats: When the user is registered, there will be a created with the users id,
            This doc will store all the conversation details (not the messages only details like:
            other users name, profile picture, when the conversation was created and last message etc),
            in a systematic nested object method. Ex:
            
            UserChats:
                1) User1.id:{
                        chat1.id:{
                            otherUserDetails:{
                                name,uid etc
                            }
                            timeCreated:"",
                            lastMessage:[]
                        }
                }
    */
  }
  setDoc(userChatRef, currentUser, {});
}
