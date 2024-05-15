import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const updateSales = async (updatedSales, salesId) => {
  try {
    const salesRef = doc(db, "userSales", salesId); // Assuming db is your Firestore instance
    await updateDoc(salesRef, { ...updatedSales, updated_at: new Date() });
    toast.success("Document successfully updated!");
  } catch (error) {
    toast.error("Error updating document: ", error);
  }
};
const updateClient = async (updatedClient, clientId) => {
  try {
    console.log(
      "Hello this is running with this data: ",
      updatedClient,
      clientId
    );
    const clientRef = doc(db, "clients", clientId); // Assuming db is your Firestore instance
    await updateDoc(clientRef, { ...updatedClient, updated_at: new Date() });
    toast.success("Document successfully updated!");
  } catch (error) {
    toast.error("Error updating document: ", error);
  }
};
const addClientDocument = async (file, fileName, clientId, uid) => {
  try {
    if (!file) {
      throw new Error("file");
    }
    if (!fileName || !clientId || !uid) {
      throw new Error(
        "Unable to upload document: Please provide all the details"
      );
    }
    const docId = `${v4()} + ${fileName}`;
    const documentRef = ref(storage, `clients/${uid}/${clientId}/${docId}`);
    await uploadBytesResumable(documentRef, file);
    toast.success("Document uploaded successfully");

    const documentURL = await getDownloadURL(documentRef);
    console.log("This is the document id", docId);
    await updateDoc(doc(db, "clients", clientId), {
      documents: arrayUnion({
        document_name: docId,
        document_URL: documentURL,
      }),
    });
    toast.success("Document saved in databse");
  } catch (err) {
    console.log(err);
    toast.error("Failed to upload document");
  }
};
export { updateSales, updateClient, addClientDocument };
