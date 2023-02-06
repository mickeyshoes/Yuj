import React from 'react'

const StudioLectureDetailInfoBox = () => {
    const content = " 나의 몸과 마음에 귀를 기울여봅시다. \n 남과 나를 비교하는 것이 일상이 된 경쟁 사회 속에서 오롯이 나의 몸과 마음에 귀를 기울이는 시간은 얼마나 될까요? 하루 15분, 요가를 통해 내 몸과 마음을 집중해서 들여다 봅시다. 매트 위에서 호흡을 느끼고, 몸을 움직이다 보면 어느새 몸과 마음이 풀려 있는 자신을 만날 수 있을 거예요. 부담 없이 꾸준히 할 수 있는 요가. 요가는 유연하거나 근력이 있는 사람들만을 위한 것이 절대 아닙니다. 요가를 처음 접하시는 분들도, 요가를 잘 모르는 분들도 모두 쉽게 시작할 수 있습니다. \n\n 현재 나의 상태를 이해하고, 점진적으로 수련을 이어나가다 보면 어느새 몸도 유연해지고, 마음도 차분하고 강해져 있을 겁니다. 기초부터 차근차근 나의 몸을 이해하며 부상없이 안전하게 수련할 수 있도록 제가 옆에서 열심히 도와드릴게요. \n\n 아침, 점심, 저녁 하루의 리듬에 맞추어 시간대별로 가볍게 수련할 수 있는 요가 루틴입니다. 짧은 시간을 효율적으로 활용하여 순식간에 몸과 마음이 편안하고 튼튼해질 수 있는 데일리 루틴입니다. 반복해서 수련해도 정말 좋아요!"

    return (
        <div>
            <div className='badge badge-outline bg-accent px-6 py-4 mb-3 text-sm font-semibold rounded-lg' style={{ color: '#fff', border: '0' }}>Raja</div>
            <p className='text-xl font-bold text-accent mb-6'>천천히 그리고 꾸준히, 요가 소년과 함께 하는 힐링 요가</p>
            <p className='text-xs whitespace-pre-wrap'>{content}</p>
        </div>
    )
}

export default StudioLectureDetailInfoBox