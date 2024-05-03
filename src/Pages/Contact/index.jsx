import React from "react";
import styles from "./styles.module.scss";

export default function ContactDetails() {
  const contactData = [
    {
      team: "Senior Management",
      people: [
        {
          position: "President",
          name: "Leslie Alexander",
          number: "(480) 555-0103",
          email: "example@example.com",
        },
      ],
    },
    {
      team: "Department Heads",
      people: [
        {
          position: "Head of claims",
          name: "Leslie Alexander",
          number: "(480) 555-0103",
          email: "example@example.com",
        },
        {
          position: "Head of sales",
          name: "Courtney Henry",
          number: "(480) 555-0103",
          email: "example@example.com",
        },
        ,
        {
          position: "Head of Marketing",
          name: "Marketing head",
          number: "(480) 555-0103",
          email: "example@example.com",
        },
      ],
    },
    {
      team: "Senior Management",
      people: [
        {
          position: "President",
          name: "Leslie Alexander",
          number: "(480) 555-0103",
          email: "example@example.com",
        },
      ],
    },
  ];

  const renderContact = contactData.map((team) => {
    return (
      <div className={styles["contact--sub-container"]}>
        <p className={styles["contact--team-heading"]}>{team.team}</p>
        <div className={styles["contact--grid"]}>
          {team.people.map((member) => {
            return (
              <div className={styles["contact--person-details-container"]}>
                <p className={styles["contact--person-name"]}>
                  {member.position}
                </p>
                <div
                  className={styles["contact--person-details-inner-container"]}
                >
                  <p className={styles["contact--person-details"]}>
                    {member.name}
                  </p>
                  <p className={styles["contact--person-details"]}>
                    {member.number}
                  </p>
                  <p className={styles["contact--person-details"]}>
                    {member.email}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
  return (
    <div className={styles["contact--main-container"]}>
      <p className={styles["contact--heading"]}>Contact Details</p>
      <div className={styles["contact--grid"]}>
        <div className={styles["contact--person-details-container"]}>
          <p className={styles["contact--person-name"]}>
            CEO (Cheif Executive Officer)
          </p>
          <div className={styles["contact--person-details-inner-container"]}>
            <p className={styles["contact--person-details"]}>
              Leslie Alexander
            </p>
            <p className={styles["contact--person-details"]}>(480) 555-0103</p>
            <p className={styles["contact--person-details"]}>
              example@example.com
            </p>
          </div>
        </div>
        <div className={styles["contact--person-details-container"]}>
          <p className={styles["contact--person-name"]}>
            CEO (Cheif Executive Officer)
          </p>
          <div className={styles["contact--person-details-inner-container"]}>
            <p className={styles["contact--person-details"]}>Courtney Henry</p>
            <p className={styles["contact--person-details"]}>(480) 555-0103</p>
            <p className={styles["contact--person-details"]}>
              example@example.com
            </p>
          </div>
        </div>
      </div>

      {/* <div className={styles["contact--sub-container"]}>
        <p className={styles["contact--team-heading"]}>Senior Managament</p>
        <div className={styles["contact--grid"]}>
          <div className={styles["contact--person-details-container"]}>
            <p className={styles["contact--person-name"]}>President</p>
            <div className={styles["contact--person-details-inner-container"]}>
              <p className={styles["contact--person-details"]}>
                Leslie Alexander
              </p>
              <p className={styles["contact--person-details"]}>
                (480) 555-0103
              </p>
              <p className={styles["contact--person-details"]}>
                example@example.com
              </p>
            </div>
          </div>
        </div>
      </div> */}
      {renderContact}
    </div>
  );
}
