# 코딩 컨벤션

## FrontEnd

- 디렉토리 구조 (React)
    - [파일 구조 – React (reactjs.org)](https://ko.reactjs.org/docs/faq-structure.html) ← 공식 문서
    - 정해진 구조는 없으나 공식 문서에서 추천하는 방식들
        1. 기능 또는 경로 별 그룹화
            
            ![Untitled](image/Untitled.png)
            
        2. 파일 유형별 그룹화
            
            ![Untitled](image/Untitled%201.png)
            
            1. 추가적으로 역할에 따라 컴포넌트를 다른 폴더로 분리할 수도 있다.
    - 디렉토리의 depth가 너무 깊어지는(중첩이 너무 많아지는) 경우는 지양

![Untitled](image/Untitled%202.png)

- 변수
    - var 사용 금지 let, const 사용
    - 문자열의 경우 single quote(’ ’) 사용
    - Boolean 값인 경우 is를 접두사로 붙인다
        
        ```jsx
        const isAdmin = true;
        ```
        
- 함수
    - 동사 혹은 전치사로 시작
        
        ```jsx
        function sumAgeAndHeight() {};
        function toConstArray() {};
        ```
        
- 네이밍
    - PascalCase - 컴포넌트명
    - camelCase - 변수명, 함수명, Props, Hook
    - UPPER_SNAKE_CASE - 내부값이 변하지 않는 리스트(tuple), 상수(const)
- 들여쓰기
    - tab = 띄어쓰기(space bar) * 4
    - 스코프마다 tab 1번씩 들여쓰기
- 중괄호
    - 한 줄만 들어가도 생략 X
    - 중괄호(줄바꿈 X)
        
        ```jsx
        if(true) {
        	console.log('hello react');
        }
        
        if(true)
        {
        	console.log('bad case');
        }
        
        ```
        
- 주석
    - 주석 및 디버깅용 console.log는 최종 제출 때 삭제(그전까진 유도리있게 commit)
    - 컴포넌트 앞에서는 **/* 주석 */** 으로 컴포넌트 설명, 내부에서는 **// 주석**
        
        ```jsx
        /**
         * 
         * @param {string} title - set title of modals 
         * @returns React.Components
         */
        
        const BasicModal = ({title , description , buttonText , onButtonClick , modalState , setModalState}) => {
            return (
                    modalState ? <Layout>
                    <Container>
                        <Title>{title}</Title>
                        <Description>{ description}</Description>
                        <Button onClick={() => {
                            onButtonClick()
                            setModalState(false)
                        } }>
                            {buttonText}
                        </Button>
                    </Container>
                </Layout> : null
                
            )
        }
        ```
        
        ![Image Pasted at 2023-1-16 15-41.png](image/Image_Pasted_at_2023-1-16_15-41.png)
        
- 컴포넌트 형태(함수, 클래스)
    - 함수형 컴포넌트 사용을 Default로
    - 함수형에서 구현 불가한 기능은 클래스 컴포넌트 일부 사용
- 이벤트 핸들러 네이밍
    - camelCase로 작성
    
    ```jsx
    <button onclick="activateLasers()"> // 기존 Vue 방식
      Activate Lasers
    </button>
    			↓
    
    <button onClick={activateLasers}> // React 방식
      Activate Lasers
    </button>
    ```
    
- 문법 관련 규칙
    
    [GitHub - tipjs/javascript-style-guide: Airbnb JavaScript 스타일 가이드 한국어](https://github.com/tipjs/javascript-style-guide)
    
