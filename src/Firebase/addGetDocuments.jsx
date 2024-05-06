import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

const uploadDocument = async (formData) => {
  try {
    if (!formData?.file) {
      throw new Error("file");
    }
    if (
      !formData?.documentName ||
      !formData?.type ||
      !formData?.category ||
      !formData?.file
    ) {
      throw new Error(
        "Unable to upload document: Please provide all the details"
      );
    }
    const docId = `${v4()} + ${formData?.category} + ${formData?.documentName}`;
    const documentRef = ref(
      storage,
      `documents/${formData?.category}/${docId}`
    );
    await uploadBytesResumable(documentRef, formData?.file);
    toast.success("Document uploaded successfully");

    const documentURL = await getDownloadURL(documentRef);
    console.log("This is the document id", docId);
    await setDoc(doc(db, "documents", docId), {
      documentName: formData?.documentName,
      category: formData?.category,
      type: formData?.type,
      download_URL: documentURL,
    });
    toast.success("Document saved in databse");
  } catch (err) {
    console.log(err);
    toast.error("Failed to upload document");
  }
};
const getAllDocuments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "documents"));
    let allDocuments = [];
    querySnapshot.forEach((doc) => {
      allDocuments.push({ id: doc.id, ...doc.data() });
      // Process each document here as needed
    });
    // After collecting all documents, set the state using setDocuments
    console.log("These are the documents in the function: ", allDocuments);
    return allDocuments;
  } catch (err) {
    console.log("Error getting the documents:", err);
  }
};

export { uploadDocument, getAllDocuments };
