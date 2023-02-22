import React from "react";
import LectureDetailScheduleCard from "./StudioLectureDetailScheduleCard";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SelfImprovementOutlinedIcon from '@mui/icons-material/SelfImprovementOutlined';

const StudioLectureDetailSchedule = (props) => {
  const lectureSchedule = props.lectureSchedule;
  const startDate = props.startDate;
  const endDate = props.endDate;

  return (
    <div className="my-7">
      <p className="text-lg font-bold text-accent mb-5">수업일정</p>
      <div className="text-sm mb-4 ml-5"><CalendarMonthIcon style={{fontSize: "large"}}/>&nbsp;{startDate}&nbsp;&nbsp;~&nbsp;&nbsp;{endDate}</div>
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
