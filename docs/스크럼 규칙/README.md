## Rule

1. 시간은 길지 않게 진행할 것
2. 팀원들이 모두 돌아가면서 아래의 질문에 대답한다.
    1. 지난 데일리 스크럼부터 지금까지 내가 완수한 것이 무엇인가
    2. 다음 데일리 스크럼까지 내가 하기로 한 것이 무엇인가
    3. 현재 장애가 되고 있는 것(곤란하고 어려운 것)이 무엇인가
3. 스크럼 도중 미안해 금지!


# 230118 Daily Scrum

# 스크럼 도중 미안해 금지

### 진행했던 일

- **재성**
    - 알고리즘 공부
- 호준
    - webRTC 구조 공부
    - JPA 지연로딩, 즉시로딩 공부
- 인중
    - IaC(Infrastructure as Code) 학습
- 진호
    - 책보며 리액트
    - SpringBoot Validation
        - 유효성 검사
            
            ```java
            public class UserCreateRequestDto {
            
                @NotBlank(message="NAME_IS_MANDATORY")
                private String name;
                @NotBlank(message="PASSWORD_IS_MANDATORY")
                private String password;
                @Email(message = "NOT_VALID_EMAIL")
                private String email;
            
                public User toEntity(){
                    return User.builder()
                            .user_name(name)
                            .email(email)
                            .password(password)
                            .build();
                }
            }
            
            @Null  // null만 혀용합니다.
            @NotNull  // null을 허용하지 않습니다. "", " "는 허용합니다.
            @NotEmpty  // null, ""을 허용하지 않습니다. " "는 허용합니다.
            @NotBlank  // null, "", " " 모두 허용하지 않습니다.
            
            @Email  // 이메일 형식을 검사합니다. 다만 ""의 경우를 통과 시킵니다. @Email 보다 아래 나올 @Patten을 통한 정규식 검사를 더 많이 사용합니다.
            @Pattern(regexp = )  // 정규식을 검사할 때 사용됩니다.
            @Size(min=, max=)  // 길이를 제한할 때 사용됩니다.
            
            @Max(value = )  // value 이하의 값을 받을 때 사용됩니다.
            @Min(value = )  // value 이상의 값을 받을 때 사용됩니다.
            
            @Positive  // 값을 양수로 제한합니다.
            @PositiveOrZero  // 값을 양수와 0만 가능하도록 제한합니다.
            
            @Negative  // 값을 음수로 제한합니다.
            @NegativeOrZero  // 값을 음수와 0만 가능하도록 제한합니다.
            
            @Future  // 현재보다 미래
            @Past  // 현재보다 과거
            
            @AssertFalse  // false 여부, null은 체크하지 않습니다.
            @AssertTrue  // true 여부, null은 체크하지 않습니다.
            ```
            
- 현규
    - 피그마 목업 손보기
    - 스택 구조 학습
- 성민
    - webRTC 학습
        - openVIDU, Kurento
        - 둘 다 도커 이미지로 배포되고 있어서 도커 개념이 선행 되어야 할 것 같다.
    - 명세서 2회독
        - baseEntity 라는
    

### 진행할 일

- **재성**
    - WebRTC 개념 공부 → DB 설계에 쓸 수 있을 정도로
    - DB 설계 마무리
- 호준
    - 개인공부 - WebRtc (2hr)
    - 테이블 설계
    - API 명세서 작성
- 인중
    - 목업 제작
- 진호
    - 🤕 10시쯤 안과 방문
    - 프로님 상담 예정
    - 목업 만들기
- 현규
    - 목업 제작 → 컴포넌트 구체화 및 디자인 통일성 제고
- 성민
    - 오전 : 개인 공부(webRTC)
    - 오후 : 데이터베이스 설계 → 끝나면 API 문서 작성 예정
