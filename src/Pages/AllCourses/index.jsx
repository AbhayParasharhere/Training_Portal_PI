import { useState, useEffect } from "react";
import {
  getAllCourses,
  getSectionsForCourse,
  getVideoURLSFromVideoNames,
  getVideosForCourseBySectionID,
  getCourseFromCourseID,
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

    // Get the course document with the id course_test2
    const fetchCourse = async () => {
      const courseID = "course_test2";
      const course = await getCourseFromCourseID(courseID);
      console.log("Course from ID", course);
    };
    fetchCourse();

    const fetchSections = async () => {
      // Say the first course is selected
      // We need to get all the sections for the course

      const courseID = courses[0]?.id;
      const sections = await getSectionsForCourse(courseID);
      console.log("Sections for the selected course", sections);
      return sections;
    };
    // console.log("Video Names", videoNames);

    // Say we have the video names for the first section of the first course
    // We need to get the video URLs for the videos
    const fetchVideos = async () => {
      const videoNames = await fetchSections();
      const selectedSectionVideoNames = videoNames[1]?.videos;

      if (!selectedSectionVideoNames) {
        return;
      }
      // add mp4 extension to the video names
      selectedSectionVideoNames.forEach((videoName, index) => {
        selectedSectionVideoNames[index] = videoName + ".mp4";
      });

      console.log("Video Names", selectedSectionVideoNames);
      const selectedVideoURLS = await getVideoURLSFromVideoNames(
        selectedSectionVideoNames
      );
      console.log("Video URLs", selectedVideoURLS);
    };
    fetchVideos();

    // try fetching the video names for the section id of "Compound Interest"
    const fetchVideosForSection = async () => {
      const courseID = courses[0]?.id;
      const sectionID = "Compound Interest";
      const videoNames = await getVideosForCourseBySectionID(
        courseID,
        sectionID
      );
      console.log("Video Names for the Compound Interest section", videoNames);
    };
    fetchVideosForSection();
  }, [courses?.length]);
  return <div>AllCourses</div>;
};

export default AllCourses;
