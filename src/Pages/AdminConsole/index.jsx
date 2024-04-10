import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import {
  addCourse,
  addSection,
  addVideo,
  deleteCourse,
  deleteSection,
  deleteVideo,
} from "../../Firebase/adminCourseAdd";
import { getAllCourses } from "../../Firebase/courseLogic";

const AdminConsole = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [videoRank, setVideoRank] = useState(0);
  const [sectionName, setSectionName] = useState(null);
  const [sectionRank, setSectionRank] = useState(0);
  const [allCourses, setAllCourses] = useState([]);

  const selectedCourseRef = useRef(null);
  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getAllCourses();
      setAllCourses(courses);
    };
    fetchCourses();
  }, []);

  const handleAddSection = async (event) => {
    const selectedCourse = selectedCourseRef.current.value;
    event.preventDefault();
    console.log(allCourses);
    console.log(selectedCourse, sectionName);
    const res = await addSection(selectedCourse, sectionName, sectionRank);
    console.log(res);
  };

  const handleUploadVideo = async (event) => {
    event.preventDefault();
    const selectedCourse = selectedCourseRef.current.value;

    console.log(
      "Uploading Video",
      selectedCourse,
      sectionName,
      video,
      videoName,
      videoRank
    );
    const res = await addVideo(
      selectedCourse,
      sectionName,
      video,
      videoName,
      videoRank
    );
    console.log(res);
  };

  const handleDeleteCourse = async (event) => {
    event.preventDefault();
    const selectedCourse = selectedCourseRef.current.value;
    const confirmation = window.confirm(
      "Are you sure you want to delete this course?" + " " + selectedCourse
    );

    if (!confirmation) return;

    const res = await deleteCourse(selectedCourse);
    console.log(res);
  };

  const handleDeleteSection = async (event) => {
    event.preventDefault();
    const selectedCourse = selectedCourseRef.current.value;
    const selectedSection = window.prompt(
      "Enter the section name in the course: " + selectedCourse
    );

    if (!selectedSection) return;

    const confirmation = window.confirm(
      "Are you sure you want to delete this section?" +
        " " +
        selectedSection +
        " in the course " +
        selectedCourse
    );

    if (!confirmation) return;

    const res = await deleteSection(selectedCourse, selectedSection);
    console.log(res);
  };

  const handleDeleteVideo = async (event) => {
    event.preventDefault();
    const selectedCourse = selectedCourseRef.current.value;
    const selectedSection = window.prompt(
      "Enter the section name in the course: " + selectedCourse
    );

    const videoID =
      "video_" +
      videoName.toLowerCase().replace(/ /g, "_") +
      `+${selectedCourse}+${selectedSection}`;
    const confirmation = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (!selectedSection || !videoID) return;

    if (confirmation) {
      console.log("Deleting Video", selectedCourse, selectedSection, videoID);
      const res = await deleteVideo(selectedCourse, selectedSection, videoID);
      console.log(res);
    }
  };

  return (
    <div>
      <hr />
      <form style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        Add Course
        <label htmlFor="thumbnail_upload">Upload Thumbnail</label>
        <input
          type="file"
          name="thumbnail_upload"
          onChange={(event) => {
            return setThumbnail(event.target.files[0]);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            let res = addCourse(
              "Test Course 6",
              "Test Category 3",
              "Test Description 2",
              thumbnail
            );
            console.log(res);
            return res;
          }}
        >
          {" "}
          Add Course
        </button>
        <hr />
        Section Add for a given course
        <select ref={selectedCourseRef}>
          {
            // only show courses that does not have status as deleted
            allCourses
              .filter((course) => course.status !== "deleted")
              .map((course) => {
                return (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                );
              })
          }
        </select>
        <input
          type="number"
          onChange={(event) => setSectionRank(event.target.value)}
          placeholder="Section Rank"
        />
        <input
          type="text"
          name="section_title"
          placeholder="Section Title"
          onChange={(event) => setSectionName(event.target.value)}
        />
        <button onClick={handleAddSection}>Add Section</button>
        <hr />
        Upload Video
        <input
          type="file"
          name="video_upload"
          accept="video/mp4"
          placeholder="Video Upload"
          onChange={(event) => {
            const selectedFile = event.target.files[0];
            setVideo(selectedFile);
            setVideoName(selectedFile?.name?.split(".")[0] || "");
          }}
        />
        <input
          type="text"
          placeholder="Video Name"
          value={videoName}
          onChange={(event) => setVideoName(event.target.value)}
        />
        <input
          type="number"
          placeholder="Video Rank"
          onChange={(event) => setVideoRank(event.target.value)}
        />
        <button onClick={handleUploadVideo}>Upload Video</button>
        <hr />
        Delete Selected Course
        <button onClick={handleDeleteCourse}>Delete Course</button>
        Delete Selected Section
        <button onClick={handleDeleteSection}>Delete Section</button>
        Delete Selected Video
        <button onClick={handleDeleteVideo}>Delete Video</button>
      </form>
    </div>
  );
};

export default AdminConsole;
