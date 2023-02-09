import React from "react";

const StudioMainBanner = (props) => {
    
    const {studioBannerImage} = props;

    return (
        <>
        <div className="flex">
            <div className={'w-full flex h-60 overflow-hidden items-center justify-center'}>
                <img className={''} src="./assets/Sample3.jpg" />
                {/* <img className={''} src={studioBannerImage} /> */}
            </div>
        </div>
        </>
    )
}

export default StudioMainBanner;