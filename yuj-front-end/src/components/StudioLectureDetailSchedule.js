import React from "react";
import LectureDetailScheduleCard from "./StudioLectureDetailScheduleCard";

const StudioLectureDetailSchedule = (props) => {
  const lectureSchedule = props.lectureSchedule;

  return (
    <div className="my-7">
      <p className="text-lg font-bold text-accent mb-5">수업일정</p>
      <div className="flex gap-3 flex-wrap justify-start">
        {lectureSchedule.map((schedule) => (
          <LectureDetailScheduleCard
            schedule={schedule}
            key={schedule.scheduleId}
          />
        ))}
      </div>
    </div>
  );
};

export default StudioLectureDetailSchedule;
