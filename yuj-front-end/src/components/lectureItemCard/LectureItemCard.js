import React from 'react'

const LectureItemCard = () => {
    return (
        <div>
            <div className='card w-80 bg-base-100 shadow-xl'>
                <figure className='relative'>
                    {/* a 태그는 차후 Link 태그 등으로 교체 */}
                    <a href=''> 
                        <div className='card-actions absolute top-4 left-6'>
                            <div className='badge badge-outline bg-accent p-4 text-xs font-semibold rounded-xl' style={{ color: '#fff', border: '0' }}>Raja</div>
                            <div className='badge badge-outline bg-success p-4 text-xs font-semibold rounded-xl' style={{ color: '#fff', border: '0' }}>완료</div>
                        </div>
                        <img src='./assets/Sample.jpg' alt='Card Image' />
                    </a>
                </figure>
                <div className='card-body'>
                    <div className='flex'>
                        <a href='' className='flex align-center'>
                            <img className='h-3.5 pr-2' src='./assets/YujMainLogo.svg' />
                            <div className='text-xs font-bold'>요가소년</div>
                        </a>
                        <div></div>
                    </div>
                    <p className='card-title text-base'>
                        {/* 글자수 제한 및 대체 기능 구현 */}
                        속근육 강화를 위한 20분 파트별 요...
                    </p>
                    <p className='text-xs'>이 요가 루틴 영상은 코어근육을 강화하는 데에 초점을 두고 구성한 프로그램입니다. 다 마치고 나면 몸 전체에...</p>

                </div>
            </div>
        </div>
    )
}

export default LectureItemCard