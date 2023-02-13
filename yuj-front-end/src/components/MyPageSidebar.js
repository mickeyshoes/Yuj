import React from 'react';
import Styles from './MyPageSidebar.module.css';


import { Link, Route } from 'react-router-dom';

function MyPageSidebar() {

  // 사이드바 메뉴 추가하려면 아래 입력
  const sidebarMenu = [
    {
      name: "대시보드",
      path: "/mypage/dashboard",
    },
    {
      name: "내 정보",
      path: "/mypage/info",
    },
    {
      name: "수강목록",
      path: "/mypage/lecture",
    },
  ];

  return (

    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className={"flex items-start justify-between menu p-5  bg-primary text-base-content " + Styles.myPageSidebar}>
        <div>
          {/* 사이드바 내용물 map이용 출력 */}
          {sidebarMenu.map((menu, index) => {
            return (
              <li key={index}>
                <Link to={menu.path} className={Styles.sidebarMenu}>
                  {menu.name}
                </Link>
              </li>
            );
          })}
        </div>

        <img className={Styles.myPageSidebarYujLogo + " mb-10"} src='/assets/mypage-sidebar-yuj-logo.png' alt='yuj sidebar logo' />
      </ul>
    </div>


  );
}
export default MyPageSidebar;