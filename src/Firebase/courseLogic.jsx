import { auth, db } from "./firebaseConfig";
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

export { getAllCourses, getSectionsForCourse };
