import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { addCourse, addSection } from "../../Firebase/adminCourseAdd";
import { getAllCourses } from "../../Firebase/courseLogic";

const AdminConsole = () => {
  const [thumbnail, setThumbnail] = useState(null);
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

  return (
    <div>
      <label htmlFor="thumbnail_upload">Upload Thumbnail</label>
      <input
        type="file"
        name="thumbnail_upload"
        onChange={(event) => {
          return setThumbnail(event.target.files[0]);
        }}
      />
      <button
        onClick={() => {
          let res = addCourse(
            "Test Course 3",
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
      <form style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        Section Add for a given course
        <select ref={selectedCourseRef}>
          {allCourses.map((courses) => {
            return (
              <option key={courses.id} value={courses.id}>
                {courses.title}
              </option>
            );
          })}
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
      </form>
    </div>
  );
};

export default AdminConsole;
