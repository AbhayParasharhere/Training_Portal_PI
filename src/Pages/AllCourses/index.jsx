import { useState, useEffect } from "react";
import {
  getAllCourses,
  getSectionsForCourse,
} from "../../Firebase/courseLogic";

// Step by step implementation plan
// 1- We need to display all the courses in the course root collection
//      a-> display each course title, thumbnail for the course, and the category of the course
//      b-> NOTE-> we are also storing course description and feedback for he course in the course document
//      c-> We need to store the Feedback as a subcollection in the course document need to figure this out later

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getAllCourses();
      setCourses(courses);
    };
    fetchCourses();
    console.log(courses);

    const fetchSections = async () => {
      // Say the first course is selected
      // We need to get all the sections for the course

      const courseID = courses[0]?.id;
      const sections = await getSectionsForCourse(courseID);
      console.log("Sections for the selected course", sections);
      return sections;
    };
    const videoNames = fetchSections();
    console.log("Video Names", videoNames);

    // Say we have the video names for the first section of the first course
    // We need to get the video URLs for the videos
    const fetchVideos = async () => {
      const selectedSectionVideoNames = videoNames[0];
      console.log("Selected Section Video Names", selectedSectionVideoNames);
    };
    fetchVideos();
  }, [courses?.length]);
  return <div>AllCourses</div>;
};

export default AllCourses;
