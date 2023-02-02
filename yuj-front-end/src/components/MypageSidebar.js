import React from 'react';
import './Component.css';

import { Link, Route } from 'react-router-dom';

function MypageSidebar() {

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
          <ul className="menu p-10  bg-primary text-base-content mypage-sidebar" >
            {/* 사이드바 내용물 map이용 출력 */}
            {sidebarMenu.map((menu) => {
              return (
                <li>
                  <Link to={menu.path} className="sidebar-menu">
                    {menu.name}
                  </Link>
                </li>
              );
            })}
            <img className='mypage-sidebar-yuj-logo' src='/assets/mypage-sidebar-yuj-logo.png' alt='yuj sidebar logo' />

          </ul>
        </div>


  );
}
export default MypageSidebar;