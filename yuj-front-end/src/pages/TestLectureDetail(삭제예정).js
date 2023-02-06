// import React from "react";
// import { Link } from "react-router-dom";
// import StudioSidebar from "../components/StudioSidebar";
// import LectureDetailCarousel from "../components/StudioLectureDetailCarousel";
// import LectureDetailInfoBox from "../components/StudioLectureDetailInfoBox";
// import LectureDetailSchedule from "../components/StudioLectureDetailSchedule";

// //수강생 -> 수강 신청(수강 취소), 목록으로
// //강사 -> 수정하기, 폐강하기, 목록으로
// const lectureDetailButtons = [
//   {
//     name: "수강하기",
//     path: "/studio"
//   },
//   {
//     name: "목록으로",
//     path: "/studio"
//   }
// ];

// const TestLectureDetail = () => {
//   return (
//     <>
//       <div className="flex w-full">
//         <StudioSidebar />
//         <div className="px-40 overflow-hidden">
//           <div className="mt-5">
//             <LectureDetailCarousel />
//           </div>
//           <div className="mt-5">
//             <LectureDetailInfoBox />
//           </div>
//           <div className="mt-3">
//             <LectureDetailSchedule />
//           </div>
//           {/* 강사 및 수강생 별로 버튼 다르게 */}
//           <div className="flex justify-end gap-2">
//             {lectureDetailButtons.map((buttons, index) => {
//               return (
//                 <button className="btn" key={index}>
//                   <Link to={buttons.path} className="lecture-detail-button">
//                     {buttons.name}
//                   </Link>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TestLectureDetail;
