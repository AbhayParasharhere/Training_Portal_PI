import { db, storage } from "./firebaseConfig";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getCourseFromCourseID } from "./courseLogic";

const generateThumbnailName = (title, file) => {
  if (!file) {
    return "No file provided";
  }
  const extension = file?.name.split(".")[file?.name.split(".").length - 1];
  const res = "thumbnail+" + String(title) + "." + String(extension);
  console.log(res);
  return res;
};

const uploadThumbnail = async (
  formattedTitle,
  thumbnailImage,
  thumbnailName
) => {
  const thumbnailStorageRef = ref(
    storage,
    `courses/${formattedTitle}/${thumbnailName}`
  );
  let res = "";
  const uploadedImage = await uploadBytes(thumbnailStorageRef, thumbnailImage);
  res = await getDownloadURL(uploadedImage.ref);
  return res;
};

const addCourse = async (title, category, description, thumbnailImage) => {
  try {
    if (!title) {
      return "Title is required";
    }
    const formattedTitle = "course_" + title.toLowerCase().replace(/ /g, "_");
    if (await getCourseFromCourseID(formattedTitle)) {
      throw new Error("Course already exists");
    }
    await addModifyCourse(
      formattedTitle,
      category,
      description,
      thumbnailImage
    );
    return "Course Added";
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Function to add or modify the course
// We will get the course title, category, description, and the course raw image
const addModifyCourse = async (
  formattedTitle,
  category,
  description,
  thumbnailImage
) => {
  try {
    let downloadURL = "";

    // Store the image in the firebase storage and get the download URL
    if (thumbnailImage) {
      const thumbnailName = generateThumbnailName(
        formattedTitle,
        thumbnailImage
      );
      downloadURL = await uploadThumbnail(
        formattedTitle,
        thumbnailImage,
        thumbnailName
      );
      console.log(thumbnailImage, thumbnailName, downloadURL);
    }

    // Add the course to the database with doc id as the formatted title
    const docRef = doc(collection(db, "Courses"), formattedTitle);

    await setDoc(docRef, {
      title: formattedTitle,
      category: category,
      description: description,
      thumbnailURL: downloadURL,
      Created_at: new Date().toISOString(),
      Updated_at: new Date().toISOString(),
    });

    return "Course Added";
  } catch (error) {
    return error;
  }
};

// Function to add the section from a given course id
// Function to add video to a given section id'

// Function to delete the course
// Function to delete the section from a given course id
// Function to delete the video from a given section id

// Function to update the course
// Function to update the section from a given course id
// Function to update the video from a given section id

export { addCourse };
