import { db } from "./firebaseConfig";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  onSnapshot,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";

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
const userChatCollectionRef = collection(db, "userChats");
const userCollectionRef = collection(db, "userDetail");

export async function createUserChats(currentUser) {
  //created chats info doc for each user after registration
  try {
    console.log("Current user id: ", currentUser);
    const res = await setDoc(doc(db, "userChats", currentUser), {});
    console.log("Response for adding doc in user chat collection", res);
  } catch (err) {
    console.log(err);
    return err;
  }
}
export async function searchUser(searchUserName, setUser) {
  try {
    console.log("searching");
    const userSearch = query(
      userCollectionRef,
      where("name", "==", searchUserName)
    );
    const querySnapshot = await getDocs(userSearch);
    const allUsers = [];
    console.log("This is the query snapshot: ", querySnapshot);
    querySnapshot.forEach((doc) => {
      allUsers.push({ ...doc.data(), id: doc.id });
    });
    console.log("These are all the users ", allUsers);
    setUser(allUsers);
  } catch (err) {
    console.log(err);
  }
}

export async function checkChatExist(combinedId) {
  //Checking if the chat already exists
  console.log("checking starts");

  const res = await getDoc(doc(db, "chats", combinedId));
  console.log("This is the response for checking: ", res);
  return res;
}

export async function createNewChat(combinedId) {
  const res = await setDoc(doc(db, "chats", combinedId), { messages: [] });
}

export async function updateUserChat(
  currentUserId,
  combinedId,
  userId,
  userName
) {
  try {
    console.log("Making user chat");
    const res = await updateDoc(doc(db, "userChats", currentUserId), {
      [combinedId + ".userInfo"]: {
        uid: userId,
        displayName: userName,
        date: serverTimestamp(),
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function getCurrentUser(setCurrentUserDetails, uid) {
  try {
    const userDoc = await getDoc(doc(db, "userDetail", uid));

    setCurrentUserDetails(userDoc.data());
  } catch (err) {
    console.log(err);
  }
}

export async function getUserChats(currentId, setAllChats) {
  try {
    onSnapshot(doc(db, "userChats", currentId), (doc) => {
      setAllChats(doc.data());
    });
  } catch (err) {
    console.log(err);
  }
}

export async function saveMessage(message, chatId, userId) {
  try {
    const res = updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion({
        message: message,
        userId: userId,
        time: Timestamp.now(),
      }),
    });
    return res;
  } catch (err) {
    console.log("Saving messsage error: ", err);
  }
}
export async function getAllMessages(chatId, setAllMessages) {
  onSnapshot(doc(db, "chats", chatId), (response) => {
    setAllMessages(response.data());
  });
}
