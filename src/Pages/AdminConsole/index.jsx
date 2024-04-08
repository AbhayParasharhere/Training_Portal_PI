import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { addCourse } from "../../Firebase/adminCourseAdd";

const AdminConsole = () => {
  const [thumbnail, setThumbnail] = useState(null);

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
    </div>
  );
};

export default AdminConsole;
