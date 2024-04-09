import { db, storage } from "./firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
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

// To update the section rank array in the course document
const updateSectionRankArray = async (
  courseID,
  formattedSectionTitle,
  sectionRank
) => {
  const currentCourse = await getCourseFromCourseID(courseID);
  const courseRef = doc(db, "Courses", courseID);
  const sectionRankArray = currentCourse?.sections_rank;
  console.log("Original Section Rank Array: ", sectionRankArray);

  if (!sectionRankArray) {
    console.log("Adding the first section");
    await updateDoc(courseRef, {
      sections_rank: [formattedSectionTitle],
    });
    return "Section Added";
  } else if (sectionRank >= sectionRankArray?.length || sectionRank < 0) {
    console.log(
      "Adding at the end",
      sectionRank >= sectionRankArray?.length,
      sectionRank <= 0
    );
    await updateDoc(courseRef, {
      sections_rank: [...sectionRankArray, formattedSectionTitle],
    });
  } else {
    console.log("Adding at a specific position", sectionRank);
    const updatedSectionRankArray = [];
    // First push all the elements before the section rank
    for (let i = 0; i < sectionRank; i++) {
      updatedSectionRankArray.push(sectionRankArray[i]);
    }
    // Then push the new section
    updatedSectionRankArray.push(formattedSectionTitle);

    // Then push all the elements after the section rank
    for (let i = sectionRank; i < sectionRankArray.length; i++) {
      updatedSectionRankArray.push(sectionRankArray[i]);
    }

    console.log("Updated section rank array", updatedSectionRankArray);
    await updateDoc(courseRef, {
      sections_rank: updatedSectionRankArray,
    });
  }
};

// Function to add the section from a given course id
const addSection = async (courseID, sectionTitle, sectionRank) => {
  try {
    if (!courseID || !sectionTitle) {
      return "Unable to create a new section document: Course ID and Section Title is required";
    }

    // If sections collection exists then we need to create a new section document with the section title
    // else we need to create the sections collection first
    const formattedSectionTitle =
      "section_" + sectionTitle.toLowerCase().replace(/ /g, "_");

    const sectionRef = doc(
      collection(db, `Courses/${courseID}/sections`),
      formattedSectionTitle
    );

    // Check if the section doc already exists
    const sectionDoc = await getDoc(sectionRef);
    if (sectionDoc.exists()) {
      return "Unable to create a new Section document as it already exists";
    }

    // Create the section document
    await setDoc(sectionRef, {
      title: sectionTitle,
      Created_at: new Date().toISOString(),
      Updated_at: new Date().toISOString(),
    });

    // Now update the course document with the updated section rank array
    updateSectionRankArray(courseID, formattedSectionTitle, sectionRank);

    return "Section Added";
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Function to update the video rank array in the section document
const updateVideoRankArray = async (sectionDoc, videoTitle, videoRank) => {
  const videoRankArray = sectionDoc.data().video_rank;
  console.log(
    "Original Video Rank Array: ",
    videoRankArray,
    "Video Title: ",
    videoTitle,
    "Video Rank: ",
    videoRank
  );

  if (!videoRankArray) {
    console.log("Adding the first video");
    updateDoc(sectionDoc.ref, {
      video_rank: [videoTitle],
    });
  } else if (videoRank >= videoRankArray?.length || videoRank < 0) {
    console.log(
      "Adding at the end",
      videoRank >= videoRankArray?.length,
      videoRank <= 0
    );
    updateDoc(sectionDoc.ref, {
      video_rank: [...videoRankArray, videoTitle],
    });
  } else {
    console.log("Adding at a specific position", videoRank);
    const updatedVideoRankArray = [];
    // First push all the elements before the video rank
    for (let i = 0; i < videoRank; i++) {
      updatedVideoRankArray.push(videoRankArray[i]);
    }
    // Then push the new video
    updatedVideoRankArray.push(videoTitle);

    // Then push all the elements after the video rank
    for (let i = videoRank; i < videoRankArray.length; i++) {
      updatedVideoRankArray.push(videoRankArray[i]);
    }

    console.log("Updated video rank array", updatedVideoRankArray);
    updateDoc(sectionDoc.ref, {
      video_rank: updatedVideoRankArray,
    });
  }
};

// Function to add video to a given section id and course id
const addVideo = async (
  courseID,
  sectionID,
  videoFile,
  videoTitle,
  videoRank
) => {
  try {
    if (!courseID || !sectionID || !videoFile || !videoTitle) {
      throw new Error(
        "Unable to upload video: Course ID, Section ID, Video File, and Video Title is required"
      );
    }
    const formattedVideoTitle =
      "video_" +
      videoTitle.toLowerCase().replace(/ /g, "_") +
      `+${courseID}+${sectionID}`;

    // First put the videoTitle in the correct order in the video_rank array in the section document
    // Get the section document
    const sectionDocRef = doc(db, `Courses/${courseID}/sections`, sectionID);

    const sectionDoc = await getDoc(sectionDocRef);
    console.log(`Courses/${courseID}/sections`, sectionDoc.data());

    if (!sectionDoc.exists()) {
      throw new Error("Section document does not exist");
    }
    // Check in the section document if the video already exists
    if (sectionDoc.data()?.video_rank?.includes(formattedVideoTitle)) {
      throw new Error("Video already exists");
    }

    // Update the video rank array in the section document
    updateVideoRankArray(sectionDoc, formattedVideoTitle, videoRank);

    // Then upload the video to the storage and show the progress
    const videoRef = ref(storage, `courseVideos/${formattedVideoTitle}`);
    const uploadTask = uploadBytesResumable(videoRef, videoFile);
    uploadTask.on("state_changed", (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    });
    return "Video Uploaded Successfully";
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Function to make the status of the course as deleted
const deleteCourse = async (courseID) => {
  try {
    const courseRef = doc(db, "Courses", courseID);
    await updateDoc(courseRef, {
      status: "deleted",
    });
    return "Course Deleted";
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Function to make the status of the section from a given course id as deleted
const deleteSection = async (courseID, sectionID) => {
  try {
    const sectionRef = doc(db, `Courses/${courseID}/sections`, sectionID);
    await updateDoc(sectionRef, {
      status: "deleted",
    });
    return "Section Deleted";
  } catch (error) {
    console.log(error);
    return error;
  }
};
// Function to delete the video from a given section id

// Function to update the course
// Function to update the section from a given course id
// Function to update the video from a given section id

export { addCourse, addSection, addVideo, deleteCourse, deleteSection };
