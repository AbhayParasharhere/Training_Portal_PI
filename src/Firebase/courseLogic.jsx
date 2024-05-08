import { getDownloadURL, ref } from "firebase/storage";
import { auth, db, storage } from "./firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
} from "firebase/firestore";

const allCoursesRef = collection(db, "Courses");

// get all courses from the Courses collection
const getAllCourses = async () => {
  try {
    const courses = [];
    const snapshot = await getDocs(
      query(allCoursesRef, where("status", "!=", "deleted"))
    );

    snapshot?.forEach((doc) => {
      courses.push({ ...doc.data(), id: doc.id });
    });
    return courses;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getCourseFromCourseID = async (courseID) => {
  try {
    const courseRef = doc(db, "Courses", courseID);
    const courseSnapshot = await getDoc(courseRef);
    if (courseSnapshot.exists()) {
      return { ...courseSnapshot.data(), id: courseSnapshot.id };
    } else {
      console.log("No such course document!");
      return null;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

// get all the sections for a given course id
// sections are a subcollection of the course document
const getSectionsForCourse = async (courseID) => {
  try {
    console.log("Im called");
    const sections = {};
    const sectionsRef = collection(db, `Courses/${courseID}/sections`);
    const sectionsSnapshot = await getDocs(sectionsRef);
    sectionsSnapshot.forEach((doc) => {
      sections[doc.id] = { ...doc.data() };
    });
    return sections;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getVideosForCourseBySectionID = async (courseID, sectionID) => {
  try {
    const sectionRef = doc(db, `Courses/${courseID}/sections`, sectionID);
    const sectionSnapshot = await getDoc(sectionRef);
    if (sectionSnapshot.exists()) {
      return { ...sectionSnapshot.data(), id: sectionSnapshot.id };
    } else {
      console.log("No such section document!");
      return null;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const videoRef = ref(storage, "courseVideos/");

// get all videos from the storage from the list of video names in the array
const getVideoURLSFromVideoNames = async (videoNames) => {
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

export {
  getAllCourses,
  getSectionsForCourse,
  getVideoURLSFromVideoNames,
  getVideosForCourseBySectionID,
  getCourseFromCourseID,
};
