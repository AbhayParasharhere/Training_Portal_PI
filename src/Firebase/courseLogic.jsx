import { getDownloadURL, ref } from "firebase/storage";
import { auth, db, storage } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const allCoursesRef = collection(db, "Courses");

// get all courses from the Courses collection
const getAllCourses = async () => {
  try {
    const courses = [];
    const allCoursesSnapshot = await getDocs(allCoursesRef);
    allCoursesSnapshot.forEach((doc) => {
      courses.push({ ...doc.data(), id: doc.id });
    });
    return courses;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// get all the sections for a given course id
// sections are a subcollection of the course document
const getSectionsForCourse = async (courseID) => {
  try {
    const sections = [];
    const sectionsRef = collection(db, `Courses/${courseID}/sections`);
    const sectionsSnapshot = await getDocs(sectionsRef);
    sectionsSnapshot.forEach((doc) => {
      sections.push({ ...doc.data(), id: doc.id });
    });
    return sections;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const videoRef = ref(storage, "videos/");

// get all videos from the storage from the list of video names in the array
const getVideos = async (videoNames) => {
  try {
    const videoURLs = [];
    videoNames.forEach(async (videoName) => {
      const videoURL = await getDownloadURL(ref(videoRef, videoName));
      videoURLs.push(videoURL);
    });
    return videoURLs;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getAllCourses, getSectionsForCourse };
