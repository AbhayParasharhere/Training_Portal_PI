import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import {
  addCourse,
  addSection,
  addVideo,
  deleteCourse,
  deleteSection,
  deleteVideo,
  getSectionsFromCourseID,
} from "../../Firebase/adminCourseAdd";
import { getAllCourses } from "../../Firebase/courseLogic";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { set } from "firebase/database";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [courseCategory, setCourseCategory] = useState();
  const [courseDescription, setCourseDescription] = useState();
  const [courseType, setCourseType] = useState();
  const [video, setVideo] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [videoRank, setVideoRank] = useState(0);
  const [sectionName, setSectionName] = useState(null);
  const [sectionRank, setSectionRank] = useState(0);
  const [allCourses, setAllCourses] = useState([]);

  // State for deleting a course
  const [selectedCourseCourseDelete, setSelectedCourseCourseDelete] =
    useState("");

  // State for deleting a section
  const [selectedCourseSectionDelete, setSelectedCourseSectionDelete] =
    useState("");
  const [selectedSectionSectionDelete, setSelectedSectionSectionDelete] =
    useState(null);
  const [allSectionsSectionDelete, setAllSectionsSectionDelete] = useState([]);

  // State for selected course for the upload video feature
  const [selectedCourseVideoAdd, setSelectedCourseVideoAdd] = useState(null);
  const [allSectionsVideoAdd, setAllSectionsVideoAdd] = useState([]);
  const [selectedSectionVideoAdd, setSelectedSectionVideoAdd] = useState(null);

  // State for deleting a video
  const [selectedCourseVideoDelete, setSelectedCourseVideoDelete] =
    useState("");
  const [selectedSectionVideoDelete, setSelectedSectionVideoDelete] =
    useState("");
  const [selectedVideoVideoDelete, setSelectedVideoVideoDelete] = useState("");
  const [allSectionsVideoDelete, setAllSectionsVideoDelete] = useState([]);
  const [allVideosVideoDelete, setAllVideosVideoDelete] = useState([]);

  console.log("All videos: ", allVideosVideoDelete);
  const handleCourseDropdownChangeVideoDelete = async (event) => {
    setSelectedCourseVideoDelete(event.target.value);
    const selectedCourseID = event.target.value;
    const sections = await getSectionsFromCourseID(selectedCourseID);
    setAllSectionsVideoDelete(sections);

    console.log("Selected Course: ", event.target.value);
  };

  const selectedCourseRef = useRef(null);
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
    // Reset the states
    setSectionName("");
    setSectionRank(null);
    selectedCourseRef.current.value = "";

    console.log(res);
  };

  const handleUploadVideo = async (event) => {
    if (
      !video ||
      !videoName ||
      !selectedCourseVideoAdd ||
      !selectedSectionVideoAdd ||
      videoRank === null
    ) {
      console.log(
        "Video: ",
        video,
        "Video Name: ",
        videoName,
        "Selected Course: ",
        selectedCourseVideoAdd,
        "Selected Section: ",
        selectedSectionVideoAdd,
        "Video Rank: ",
        videoRank
      );
      toast.error("Please fill in all the fields");
      return;
    }

    event.preventDefault();
    toast.info("Uploading Video", { autoClose: 7000 });

    const videoID =
      videoName + `+${selectedCourseVideoAdd}+${selectedSectionVideoAdd}`;
    console.log(
      "Uploading Video",
      selectedCourseVideoAdd,
      selectedSectionVideoAdd,
      videoID,
      video,
      videoName,
      videoRank
    );

    await addVideo(
      selectedCourseVideoAdd,
      selectedSectionVideoAdd,
      videoID,
      video,
      videoName,
      videoRank
    );

    // Reset the states
    setVideo(null);
    setVideoName("");
    setSelectedCourseVideoAdd("");
    setSelectedSectionVideoAdd("");
    setVideoRank(null);
  };

  const handleDeleteCourse = async (event) => {
    event.preventDefault();
    if (!selectedCourseCourseDelete) {
      toast.error("Please select a course to delete");
      return;
    }
    const confirmation = window.confirm(
      "Are you sure you want to delete the selected course?"
    );

    if (!confirmation) return;

    const res = await deleteCourse(selectedCourseCourseDelete);
    // refresh the page
    window.location.reload();
    console.log(res);

    // Reset the states
    setSelectedCourseCourseDelete("");
  };

  const handleDeleteSection = async (event) => {
    event.preventDefault();
    if (!selectedCourseSectionDelete || !selectedSectionSectionDelete) {
      toast.error("Please fill in all the fields");
      return;
    }

    const res = await deleteSection(
      selectedCourseSectionDelete,
      selectedSectionSectionDelete
    );

    window.location.reload();
    // Reset the states
    setSelectedCourseSectionDelete("");
    setSelectedSectionSectionDelete("");
    console.log(res);
  };

  const handleDeleteVideo = async (event) => {
    event.preventDefault();

    if (
      !selectedCourseVideoDelete ||
      !selectedSectionVideoDelete ||
      !selectedVideoVideoDelete
    ) {
      toast.error("Please fill in all the fields");
      return;
    }
    const res = await deleteVideo(
      selectedCourseVideoDelete,
      selectedSectionVideoDelete,
      selectedVideoVideoDelete
    );

    window.location.reload();

    // Reset the states
    setSelectedCourseVideoDelete("");
    setSelectedSectionVideoDelete("");
    setSelectedVideoVideoDelete("");

    console.log(res);
  };
  const handleCourseAdd = async (e) => {
    try {
      e.preventDefault();

      if (
        !courseTitle ||
        !courseCategory ||
        !courseDescription ||
        !courseType
      ) {
        console.log(
          "title:",
          courseTitle,
          "category:",
          courseCategory,
          "description:",
          courseDescription,
          "thumbnail:",
          thumbnail,
          "type:",
          courseType
        );
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
  const handleDropdownChangeCourseAdd = async (event) => {
    setSelectedCourseVideoAdd(event.target.value);
    const selectedCourseID = event.target.value;
    const sections = await getSectionsFromCourseID(selectedCourseID);
    console.log("Sections for video add: ", sections);
    setAllSectionsVideoAdd(sections);

    console.log(
      "Selected Course: ",
      event.target.value,
      selectedCourseVideoAdd
    );
  };

  const handleDropdownChangeSectionDelete = async (event) => {
    setSelectedCourseSectionDelete(event.target.value);
    const selectedCourseID = event.target.value;
    const sections = await getSectionsFromCourseID(selectedCourseID);
    setAllSectionsSectionDelete(sections);
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
          Add a Course
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
                // value={thumbnail}
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

        <div className={styles["adminCourse--section-add-container"]}>
          Add section for any course
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Select Course
            </label>
            <select
              ref={selectedCourseRef}
              className={styles["adminCourse--add-course-input"]}
            >
              <option value="">Select Course</option>
              {
                // only show courses that does not have status as deleted
                allCourses
                  .filter((course) => course.status !== "deleted")
                  .sort((a, b) => a.title.localeCompare(b.title))
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
              Section Position
            </label>
            <input
              type="number"
              onChange={(event) =>
                setSectionRank(Number(event.target.value) - 1)
              }
              placeholder="Section Position (1 for first section, 2 for second, etc.)"
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
          Upload a video to a section
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
              Select Course
            </label>
            <select
              className={styles["adminCourse--add-course-input"]}
              value={selectedCourseVideoAdd}
              onChange={(event) => {
                handleDropdownChangeCourseAdd(event);
              }}
            >
              <option value="">Select Course</option>
              {
                // only show courses that does not have status as deleted
                allCourses
                  .filter((course) => course.status !== "deleted")
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((course) => {
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
              Select Section
            </label>
            <select
              className={styles["adminCourse--add-course-input"]}
              value={selectedSectionVideoAdd}
              onChange={(event) =>
                setSelectedSectionVideoAdd(event.target.value)
              }
            >
              <option value="">Select Section</option>
              {allSectionsVideoAdd?.map((section) => (
                <option value={section.id}>{section.title}</option>
              ))}
            </select>
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
              Video Position
            </label>
            <input
              type="number"
              className={styles["adminCourse--add-course-input"]}
              placeholder="Video Position (1 for first video, 2 for second, etc.)"
              onChange={(event) => setVideoRank(Number(event.target.value) - 1)}
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
          Delete a Course
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Select Course
            </label>
            <select
              className={styles["adminCourse--add-course-input"]}
              value={selectedCourseCourseDelete}
              onChange={(event) =>
                setSelectedCourseCourseDelete(event.target.value)
              }
            >
              <option value="">Select Course</option>
              {
                // only show courses that does not have status as deleted
                allCourses
                  .filter((course) => course.status !== "deleted")
                  .sort((a, b) => a.title.localeCompare(b.title))
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
          Delete a section for a course
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Select Course
            </label>
            <select
              className={styles["adminCourse--add-course-input"]}
              value={selectedCourseSectionDelete}
              onChange={(event) => handleDropdownChangeSectionDelete(event)}
            >
              <option value="">Select Course</option>
              {allCourses
                .filter((course) => course.status !== "deleted")
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((course) => {
                  return (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Select Section
            </label>
            <select
              className={styles["adminCourse--add-course-input"]}
              value={selectedSectionSectionDelete}
              onChange={(event) =>
                setSelectedSectionSectionDelete(event.target.value)
              }
            >
              <option value="">Select Section</option>
              {allSectionsSectionDelete.map((section) => (
                <option value={section.id}>{section.title}</option>
              ))}
            </select>
          </div>
          <button
            className={styles["adminCourse--add-course-button"]}
            onClick={handleDeleteSection}
          >
            Delete Section
          </button>
        </div>
        <hr style={{ width: "100%" }} />
        <div className={styles["adminCourse--section-add-container"]}>
          Delete a video for a section
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Select Course
            </label>
            <select
              className={styles["adminCourse--add-course-input"]}
              value={selectedCourseVideoDelete}
              onChange={(event) => handleCourseDropdownChangeVideoDelete(event)}
            >
              <option value="">Select Course</option>
              {allCourses
                .filter((course) => course.status !== "deleted")
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((course) => {
                  return (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Select Section
            </label>
            <select
              className={styles["adminCourse--add-course-input"]}
              value={selectedSectionVideoDelete}
              onChange={(event) =>
                setSelectedSectionVideoDelete(event.target.value)
              }
            >
              <option value="">Select Section</option>
              {allSectionsVideoDelete.map((section) => (
                <option value={section.id}>{section.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles["adminCourse--add-course-label"]}>
              Select Video
            </label>
            <select
              className={styles["adminCourse--add-course-input"]}
              value={selectedVideoVideoDelete}
              onChange={(event) =>
                setSelectedVideoVideoDelete(event.target.value)
              }
            >
              <option value="">Select Video</option>
              {allSectionsVideoDelete
                .filter((section) => section.id === selectedSectionVideoDelete)
                .map((section) => {
                  console.log("Dropdown making Section: ", section);
                  return section.video_rank?.map((video) => (
                    <option value={video}>{video?.split("+")[0]}</option>
                  ));
                })}
            </select>
          </div>
          <button
            className={styles["adminCourse--add-course-button"]}
            onClick={handleDeleteVideo}
          >
            Delete Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
