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
import { v4 } from "uuid";
import { toast } from "react-toastify";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [courseCategory, setCourseCategory] = useState();
  const [courseDescription, setCourseDescription] = useState();
  const [courseType, setCourseType] = useState();
  const [video, setVideo] = useState(null);
  const [videoID, setVideoID] = useState("");
  const [videoName, setVideoName] = useState("");
  const [videoRank, setVideoRank] = useState(0);
  const [sectionName, setSectionName] = useState(null);
  const [sectionID, setSectionID] = useState(null);
  const [sectionRank, setSectionRank] = useState(0);
  const [allCourses, setAllCourses] = useState([]);

  const selectedCourseRef = useRef(null);
  const selectedUpdateCourseRef = useRef(null);
  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getAllCourses();
      setAllCourses(courses);
    };
    fetchCourses();
  }, []);

  const handleAddSection = async (event) => {
    const selectedCourseID = selectedCourseRef.current.value;
    event.preventDefault();
    const sectionID = v4();

    console.log("ADD SECTION ", selectedCourseID, sectionName);
    const res = await addSection(
      selectedCourseID,
      sectionID,
      sectionName,
      sectionRank
    );
    console.log(res);
  };

  const handleUploadVideo = async (event) => {
    if (!video || !videoName || !sectionID || !videoRank) {
      alert("Please fill in all the fields");
      return;
    }

    event.preventDefault();
    const selectedCourseID = selectedCourseRef.current.value;

    // With duplicate videos feature
    // const currentTimestamp = new Date().getTime();
    // const videoID =
    //   videoName + `+${selectedCourseID}+${sectionID}+${currentTimestamp}`;

    // Without duplicate videos feature
    const videoID = videoName + `+${selectedCourseID}+${sectionID}`;
    console.log(
      "Uploading Video",
      selectedCourseID,
      sectionID,
      videoID,
      video,
      videoName,
      videoRank
    );
    const res = await addVideo(
      selectedCourseID,
      sectionID,
      videoID,
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
  const handleCourseAdd = async (e) => {
    try {
      e.preventDefault();

      if (
        !courseTitle ||
        !courseCategory ||
        !courseDescription ||
        !thumbnail ||
        !courseType
      ) {
        toast.error("fill all requirements for course adding");
        return;
      }
      const courseID = v4();
      console.log("course type:", courseType);
      let res = await addCourse(
        courseID,
        courseTitle,
        courseCategory,
        courseDescription,
        thumbnail,
        courseType
      );
      console.log(res);
      setCourseCategory("");
      setCourseTitle("");
      setCourseDescription("");
      setCourseType("");
      setThumbnail("");

      return res;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles["adminCourse--main-container"]}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div className={styles["adminCourse--add-course-form-container"]}>
          <hr />
          {/*Course adding form start */}
          Add Course
          <div className={styles["adminCourse--add-course-form"]}>
            <div>
              <label
                for="course-title"
                className={styles["adminCourse--add-course-label"]}
              >
                Course title
              </label>
              <input
                type="text"
                id="course-title"
                placeholder="Course Title"
                value={courseTitle}
                onChange={(event) => setCourseTitle(event.target.value)}
                className={styles["adminCourse--add-course-input"]}
              />
            </div>
            <div>
              <label
                htmlFor="thumbnail_upload"
                className={styles["adminCourse--add-course-label"]}
              >
                Upload Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail_upload"
                onChange={(event) => {
                  return setThumbnail(event.target.files[0]);
                }}
                value={thumbnail}
                className={styles["adminCourse--add-course-input"]}
              />
            </div>
            <div>
              <label
                for="type"
                className={styles["adminCourse--add-course-label"]}
              >
                Course Type
              </label>
              <select
                id="type"
                onChange={(event) => {
                  console.log("course category: ", courseCategory);
                  setCourseType(event.target.value);
                  console.log("Course type: ", courseType);
                  setCourseCategory("");
                }}
                value={courseType}
                className={styles["adminCourse--add-course-input"]}
              >
                <option value="">Select Course type</option>
                <option value="product">Product Training</option>
                <option value="courses">Courses</option>
              </select>
            </div>
            <div>
              <label
                for="category"
                className={styles["adminCourse--add-course-label"]}
              >
                Course Category
              </label>
              <select
                id="category"
                onChange={(event) => {
                  console.log("This is the course category: ", courseCategory);
                  setCourseCategory(event.target.value);
                }}
                value={courseCategory}
                className={styles["adminCourse--add-course-input"]}
              >
                {courseType !== "product" ? (
                  <>
                    <option value="">Select Category</option>
                    <option value="Finance">Finance</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Policies">Policies</option>
                  </>
                ) : (
                  <>
                    <option value="">Select Category</option>
                    <option value="Poster Maker">Poster Maker</option>
                    <option value="Calculator">Finance Calculator</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className={styles["adminCourse--add-course-label"]}>
                Course Description
              </label>
              <input
                id="description"
                onChange={(event) => setCourseDescription(event.target.value)}
                className={styles["adminCourse--add-course-input"]}
                value={courseDescription}
              />
            </div>
          </div>
          <button
            className={styles["adminCourse--add-course-button"]}
            onClick={(e) => handleCourseAdd(e)}
          >
            {" "}
            Add Course
          </button>
        </div>
        <hr style={{ width: "100%" }} />
        {/*Adding section to courses start */}
        <div className={styles["adminCourse--section-add-container"]}>
          Add section for a course
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Select Course
            </label>
            <select
              ref={selectedCourseRef}
              className={styles["adminCourse--add-course-input"]}
            >
              {
                // only show courses that does not have status as deleted
                allCourses
                  .filter((course) => course.status !== "deleted")
                  .map((course) => {
                    // console.log(course.id, course.title);
                    return (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    );
                  })
              }
            </select>
          </div>
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Section Rank
            </label>
            <input
              type="number"
              onChange={(event) => setSectionRank(event.target.value)}
              placeholder="Section Rank (Start from 0 i.e for first position rank is 0)"
              className={styles["adminCourse--add-course-input"]}
            />
          </div>
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Section Title
            </label>
            <input
              type="text"
              name="section_title"
              placeholder="Section Title"
              onChange={(event) => setSectionName(event.target.value)}
              className={styles["adminCourse--add-course-input"]}
            />
          </div>
          <button
            onClick={handleAddSection}
            className={styles["adminCourse--add-course-button"]}
          >
            Add Section
          </button>
        </div>
        <hr style={{ width: "100%" }} />
        <div className={styles["adminCourse--section-add-container"]}>
          Upload Video
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Upload Video
            </label>
            <input
              type="file"
              name="video_upload"
              accept="video/mp4"
              placeholder="Video Upload"
              className={styles["adminCourse--add-course-input"]}
              onChange={(event) => {
                const selectedFile = event.target.files[0];
                setVideo(selectedFile);
                setVideoName(selectedFile?.name?.split(".")[0] || "");
              }}
            />
          </div>
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Section
            </label>
            <input
              type="text"
              placeholder="Section ID"
              className={styles["adminCourse--add-course-input"]}
              onChange={(event) => setSectionID(event.target.value)}
            />
          </div>
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Video Name
            </label>
            <input
              type="text"
              placeholder="Video Name"
              className={styles["adminCourse--add-course-input"]}
              value={videoName}
              onChange={(event) => setVideoName(event.target.value)}
            />
          </div>
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Video Rank
            </label>
            <input
              type="number"
              placeholder="Video Rank"
              className={styles["adminCourse--add-course-input"]}
              onChange={(event) => setVideoRank(event.target.value)}
            />
          </div>
          <button
            className={styles["adminCourse--add-course-button"]}
            onClick={handleUploadVideo}
          >
            Upload Video
          </button>
        </div>
        <hr style={{ width: "100%" }} />
        <div className={styles["adminCourse--section-add-container"]}>
          Delete Selected Course
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Select Course
            </label>
            <select
              ref={selectedCourseRef}
              className={styles["adminCourse--add-course-input"]}
            >
              {
                // only show courses that does not have status as deleted
                allCourses
                  .filter((course) => course.status !== "deleted")
                  .map((course) => {
                    // console.log(course.id, course.title);
                    return (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    );
                  })
              }
            </select>
          </div>
          <button
            className={styles["adminCourse--add-course-button"]}
            onClick={handleDeleteCourse}
          >
            Delete Course
          </button>
        </div>
        <hr style={{ width: "100%" }} />
        <div className={styles["adminCourse--section-add-container"]}>
          Delete Selected Section
          <button
            className={styles["adminCourse--add-course-button"]}
            onClick={handleDeleteSection}
          >
            Delete Section
          </button>
        </div>
        <hr style={{ width: "100%" }} />
        <div className={styles["adminCourse--section-add-container"]}>
          Delete Selected Video
          <input
            type="text"
            placeholder="Video ID"
            value={videoID}
            onChange={(event) => setVideoID(event.target.value)}
          />
          <button
            className={styles["adminCourse--add-course-button"]}
            onClick={handleDeleteVideo}
          >
            Delete Video
          </button>
        </div>
        <hr />
        {/* <h2>Update Courses</h2>
        <select ref={selectedUpdateCourseRef}>
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
        <button>Update Course</button>
        <input type="text" placeholder="Course Title" />
        <input type="text" placeholder="Course Category" />
        <input type="text" placeholder="Course Description" />
        <input type="file" placeholder="Course Thumbnail" /> */}
      </div>
    </div>
  );
};

export default AddCourse;
