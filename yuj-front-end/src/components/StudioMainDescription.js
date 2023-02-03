import React from "react";

const StudioMainDescription = () => {
    return (
        <>
            <div className={'pt-32'}>
                <div className={'flex'}>
                    <p className={'text-4xl font-bold text-accent mb-6 mr-3'}>요가 소년</p>
                    <p className={'text-xl font-bold text-accent mb-6'}>STUDIO</p>
                </div>
                <div className={'flex flex-col justify-center items-center mt-12'}>
                    <img src="./assets/studioDescDeco.png" className={'w-12'}></img>
                    <p className={'text-center my-10 text-accent leading-10'}>
                        반갑습니다, 저는 미국에서 ‘요가소년’ 으로 활동하고 있는 요가 크리에이터 한지훈입니다.<br/>
                        “젊고 어리니까 괜찮아” 라는 생각으로 되는대로 살았습니다. 그러던 어느 날, 망가진 나의 몸을 만납니다. 아프지 않은 곳이 없더라고요.<br/>
                        그렇게 요가를 만났습니다. 그리고 지금은 하루 대부분의 시간을 요가로 채우고 있지요. 요가로 즐겁습니다. 그 즐거움을 보다 더 많은 이들과 나누고 싶네요.<br/>
                        하루에 단 10분, 15분이라도 내 몸에 귀를 기울이며 동작 하나하나를 함께 할게요. 저와 함께 매일 조금씩 틈을 내는 동안 내 몸의 근력과 유연성이 향상 되고,<br/>
                        그로 하여금 체형과 자세도 균형있게 다듬어 질 것입니다.<br/>
                    </p>
                    <img src="./assets/studioDescDeco.png" className={'w-12'}></img>
                </div>
            </div>
        </>
    )
}

export default StudioMainDescription;