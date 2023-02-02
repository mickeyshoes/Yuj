import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';

const LectureDetailCarousel = () => {
    return (
        <div>
            <div className="carousel w-96">
                <div id="item1" className="carousel-item relative justify-center w-full h-60">
                    <div className='w-80 self-center'>
                        <img src="./assets/Sample.jpg" className="w-full" />
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/2">
                        <a href="#item3" className="btn btn-circle btn-xs btn-ghost">❮</a>
                        <a href="#item2" className="btn btn-circle btn-xs btn-ghost">❯</a>
                    </div>
                </div>
                <div id="item2" className="carousel-item relative justify-center w-full h-60">
                    <div className='w-80 self-center'>
                        <img src="./assets/Sample2.jpg" className="w-full" />
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/2">
                        <a href="#item1" className="btn btn-circle btn-xs btn-ghost">❮</a>
                        <a href="#item3" className="btn btn-circle btn-xs btn-ghost">❯</a>
                    </div>
                </div>
                <div id="item3" className="carousel-item relative justify-center w-full h-60">
                    <div className='w-80 self-center'>
                        <img src="./assets/Sample3.jpg" className="w-full" />
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/2">
                        <a href="#item2" className="btn btn-circle btn-xs btn-ghost">❮</a>
                        <a href="#item1" className="btn btn-circle btn-xs btn-ghost">❯</a>
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-96 py-0 gap-2">
                <a href="#item1" className='px-1'><CircleIcon style={{ fontSize: '0.4rem' }} /></a>
                <a href="#item2" className='px-1'><CircleIcon style={{ fontSize: '0.4rem' }} /></a>
                <a href="#item3" className='px-1'><CircleIcon style={{ fontSize: '0.4rem' }} /></a>
            </div>
        </div>
    )
}

export default LectureDetailCarousel