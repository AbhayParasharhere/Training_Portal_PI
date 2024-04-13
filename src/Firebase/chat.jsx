import { db } from "./firebaseConfig";

// Firebase import and setup
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

import {
  setDoc,
  doc,
  collection,
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

// userChatCollectionRef and userCollectionRef definitions

export async function createUserChats(currentUser) {
  try {
    const res = await setDoc(doc(db, "userChats", currentUser), {});
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function searchUser(searchUserName, setUser) {
  try {
    const userSearch = query(
      userCollectionRef,
      where("name", "==", searchUserName)
    );
    const querySnapshot = await getDocs(userSearch);
    const allUsers = [];
    querySnapshot.forEach((doc) => {
      allUsers.push({ ...doc.data(), id: doc.id });
    });
    setUser(allUsers);
  } catch (err) {
    console.log(err);
  }
}

export async function checkChatExist(combinedId) {
  const res = await getDoc(doc(db, "chats", combinedId));
  return res;
}

export async function createNewChat(combinedId) {
  const res = await setDoc(doc(db, "chats", combinedId), { messages: [] });
  return res;
}

export async function updateUserChat(
  currentUserId,
  combinedId,
  userId,
  userName
) {
  try {
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
    const unsubscribe = onSnapshot(doc(db, "userChats", currentId), (doc) => {
      setAllChats(doc.data());
    });
    return unsubscribe;
  } catch (err) {
    console.log(err);
  }
}

export async function saveMessage(message, chatId, userId) {
  try {
    const res = await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion({
        message: message,
        userId: userId,
        time: Timestamp.now(),
      }),
    });
    return res;
  } catch (err) {
    console.log("Saving message error: ", err);
  }
}

export async function getAllMessages(chatId, setAllMessages) {
  try {
    const unsubscribe = onSnapshot(doc(db, "chats", chatId), (response) => {
      setAllMessages(response.data());
    });
  } catch (err) {
    console.log(err);
  }
}
