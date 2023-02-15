import React from "react";

const StudioMainDescription = (props) => {

    const {studioDetail} = props;

    return (
        <>
            <div className={'pt-16 mb-12'}>
                <div className={'flex'}>
                    <p className={'text-3xl font-bold text-accent mb-6 mr-3'}>{studioDetail.nickname}</p>
                    <p className={'text-sm font-bold text-accent mb-6'}>STUDIO</p>
                </div>
                <div className={'flex flex-col justify-center items-center mt-0'}>
                    <img src="./assets/studioDescDeco.png" className={'w-8'}></img>
                    <p className={'text-center my-6 text-sm text-accent leading-10 whitespace-normal'}>
                        {studioDetail.description}
                    </p>
                    <img src="./assets/studioDescDeco.png" className={'w-8'}></img>
                </div>
            </div>
        </>
    )
}

export default StudioMainDescription;