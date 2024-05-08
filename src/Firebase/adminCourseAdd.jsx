import { db, storage } from "./firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getCourseFromCourseID } from "./courseLogic";
import { toast } from "react-toastify";

const generateThumbnailName = (courseID, file) => {
  if (!file) {
    return "No file provided";
  }
  const extension = file?.name.split(".")[file?.name.split(".").length - 1];
  const res =
    "thumbnail+" + "course_" + String(courseID) + "." + String(extension);
  console.log(res);
  return res;
};

const uploadThumbnail = async (courseID, thumbnailImage, thumbnailName) => {
  const thumbnailStorageRef = ref(
    storage,
    `courses/${courseID}/${thumbnailName}`
  );
  let res = "";
  const uploadedImage = await uploadBytes(thumbnailStorageRef, thumbnailImage);
  res = await getDownloadURL(uploadedImage.ref);
  return res;
};

const addCourse = async (
  courseID,
  title,
  category,
  description,
  thumbnailImage,
  courseType
) => {
  try {
    if (!title) {
      return "Title is required";
    }
    // const formattedTitle = "course_" + title.toLowerCase().replace(/ /g, "_");
    if (await getCourseFromCourseID(courseID)) {
      throw new Error("Course already exists");
    }
    await addModifyCourse(
      courseID,
      title,
      category,
      description,
      thumbnailImage,
      courseType
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
  courseID,
  title,
  category,
  description,
  thumbnailImage,
  courseType
) => {
  try {
    let downloadURL = "";
    console.log(
      "This is all the data for the course: ",
      title,
      category,
      description,
      thumbnailImage,
      "coourse type: ",
      courseType
    );

    // Store the image in the firebase storage and get the download URL
    if (thumbnailImage) {
      const thumbnailName = generateThumbnailName(courseID, thumbnailImage);
      downloadURL = await uploadThumbnail(
        courseID,
        thumbnailImage,
        thumbnailName
      );
      console.log(thumbnailImage, thumbnailName, downloadURL);
    }
    if (!courseType) {
      toast.error("No course type");
      return;
    }
    // Add the course to the database with doc id as the formatted title
    const docRef = doc(collection(db, "Courses"), courseID);

    await setDoc(docRef, {
      title: title,
      category: category,
      description: description,
      thumbnailURL: downloadURL,
      products: courseType === "product",
      Created_at: new Date().toISOString(),
      status: "active",
      Updated_at: new Date().toISOString(),
    });
    toast.success("Course Added sucessfully");
    return "Course Added";
  } catch (error) {
    toast.error("Error adding course");
    return error;
  }
};

// To update the section rank array in the course document
const updateSectionRankArray = async (courseID, sectionID, sectionRank) => {
  const currentCourse = await getCourseFromCourseID(courseID);
  const courseRef = doc(db, "Courses", courseID);
  const sectionRankArray = currentCourse?.sections_rank;
  console.log("Original Section Rank Array: ", sectionRankArray);

  if (!sectionRankArray) {
    console.log("Adding the first section");
    await updateDoc(courseRef, {
      sections_rank: [sectionID],
    });
    return "Section Added";
  } else if (sectionRank >= sectionRankArray?.length || sectionRank < 0) {
    console.log(
      "Adding at the end",
      sectionRank >= sectionRankArray?.length,
      sectionRank <= 0
    );
    await updateDoc(courseRef, {
      sections_rank: [...sectionRankArray, sectionID],
    });
  } else {
    console.log("Adding at a specific position", sectionRank);
    const updatedSectionRankArray = [];
    // First push all the elements before the section rank
    for (let i = 0; i < sectionRank; i++) {
      updatedSectionRankArray.push(sectionRankArray[i]);
    }
    // Then push the new section
    updatedSectionRankArray.push(sectionID);

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
const addSection = async (courseID, sectionID, sectionTitle, sectionRank) => {
  try {
    if (!courseID || !sectionTitle) {
      return "Unable to create a new section document: Course ID and Section Title is required";
    }

    // If sections collection exists then we need to create a new section document
    // else we need to create the sections collection first

    const sectionRef = doc(
      collection(db, `Courses/${courseID}/sections`),
      sectionID
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
    updateSectionRankArray(courseID, sectionID, sectionRank);
    toast.success("Section added sucessfully");
    return "Section Added";
  } catch (error) {
    toast.error("Failed to add section");

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

// videoID format = videoName + `+${selectedCourseID}+${sectionID}+${currentTimestamp}`;
// This function can allow and disallow duplicates based on the videoID,
// if you want to allow duplicates then do not concatenate the currentTimestamp
// if you want to disallow duplicates then concatenate the currentTimestamp
// Function to add video to a given section id and course id
const addVideo = async (
  courseID,
  sectionID,
  videoID,
  videoFile,
  videoTitle,
  videoRank
) => {
  try {
    if (!courseID || !sectionID || !videoID || !videoFile || !videoTitle) {
      throw new Error(
        "Unable to upload video: Course ID, Section ID, Video File, and Video Title is required"
      );
    }

    // First put the videoTitle in the correct order in the video_rank array in the section document
    // Get the section document
    const sectionDocRef = doc(db, `Courses/${courseID}/sections`, sectionID);

    const sectionDoc = await getDoc(sectionDocRef);
    console.log(`Courses/${courseID}/sections`, sectionDoc.data());

    if (!sectionDoc.exists()) {
      throw new Error("Section document does not exist");
    }
    // Check in the section document if the video already exists
    if (sectionDoc.data()?.video_rank?.includes(videoID)) {
      throw new Error("Video already exists");
    }

    // Update the video rank array in the section document
    updateVideoRankArray(sectionDoc, videoID, videoRank);

    // Then upload the video to the storage and show the progress
    const videoRef = ref(storage, `courseVideos/${videoID}`);
    await uploadBytesResumable(videoRef, videoFile);

    const videoURL = await getDownloadURL(videoRef);

    // Also add the video id to the videos_array in the course document
    await updateDoc(doc(db, "Courses", courseID), {
      videos_array: arrayUnion({ videoID, videoURL }),
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

    // Remove the section from the section_rank array in the course document
    const courseRef = doc(db, "Courses", courseID);
    const courseDoc = await getDoc(courseRef);
    const sectionRankArray = courseDoc.data().sections_rank;
    const updatedSectionRankArray = sectionRankArray.filter(
      (section) => section !== sectionID
    );
    await updateDoc(courseRef, { sections_rank: updatedSectionRankArray });

    return "Section Deleted";
  } catch (error) {
    console.log(error);
    return error;
  }
};

// WARNING: This function will permanently delete the video from the storage and the video_rank array in the section document
// Function to delete the video from a given section id
const deleteVideo = async (courseID, sectionID, videoID) => {
  try {
    // Remove the video from the video_rank array in the section document
    const sectionRef = doc(db, `Courses/${courseID}/sections`, sectionID);
    const sectionDoc = await getDoc(sectionRef);
    const videoRankArray = sectionDoc.data().video_rank;
    const updatedVideoRankArray = videoRankArray.filter(
      (video) => video !== videoID
    );
    await updateDoc(sectionRef, { video_rank: updatedVideoRankArray });

    // Delete the video file from the storage
    const videoRef = ref(storage, `courseVideos/${videoID}`);
    await deleteObject(videoRef);

    return "Video Deleted";
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Function to update the course
// Function to update the section from a given course id
// Function to update the video from a given section id

export {
  addCourse,
  addSection,
  addVideo,
  deleteCourse,
  deleteSection,
  deleteVideo,
};
