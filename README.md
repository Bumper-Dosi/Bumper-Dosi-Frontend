### 프로젝트 소개( Introduction )
---

본 프로젝트는 동적이고 인터랙티브한 웹사이트를 만들고 싶어 하는 모든 팀원들의 열정으로부터 비롯되었습니다. 이를 프로젝트로서 발전시키기 가장 좋은 테마가 게임이라 생각하였고, **일반게임에 비해 접근의 편리성이 월등한 웹 (게임)의 장점을 토대로** "범퍼도시(BumperDosi)"는 탄생하였습니다. <br /> ( 플레이 전까지의 모든 과정(프로그램 다운로드, 로그인 등)이 상대적으로 간략함 )

**[🚗 Do you want to play? (게임하러 가기)](https://www.bumperdosi.com/)**

### 💻 실행 방법( How to run )
---

* git clone

  ```
  $ git clone https://github.com/Bumper-Dosi/Bumper-Dosi-Frontend.git
  ```

* .env

  ```
  REACT_APP_API_KEY=AIzaSyCw52DSo82OtaWWlH7xJcsUYz9E8rZO2q8
  REACT_APP_AUTH_DOMAIN=bumper-dosi.firebaseapp.com
  REACT_APP_PROJECT_ID=bumper-dosi
  REACT_APP_STORAGE_BUCKET=bumper-dosi.appspot.com
  REACT_APP_MESSAGE_ID=419262394710
  REACT_APP_APP_ID=1:419262394710:web:87f34d2191695c889a66f7
  ```

* npm start

  ```
  $ npm start
  ```
* npm test

  ```
  $ npm test
  ```

### 📆 프로젝트 일정( Project Schedule )
---
* 전체 기간( Full Period )

  `2022년 05월 30일 ~ 2022년 06월 18일`

  ---

  <details><summary>Week 1 - 기획 및 설계</summary>

  `2022년 05월 30일 ~ 2022년 06월 05일`

  아이디어 수집 및 기술 검증 <br /> [목업](https://www.notion.so/vanillacoding/Mockup-ee338f7af47247ddafa95fca9e0e8a64) 작성 <br /> [KANBAN](https://www.notion.so/vanillacoding/9a26804a588e4e9fa7778c2d312a79c4?v=bda4b3b00cb744fcb00d33825ae915ef) 작성

  </details>

  <details><summary>Week 2 - 기능 개발</summary>

  `2022년 06월 06일 ~ 2022년 06월 12일`

  Firebase Authentication 기반 LoginWithGoogle/Github 구현 + Logout <br /> 대기실 및 게임모드 오브젝트 구현/배치 <br /> 자동차 물리 및 기술명세에 따른 기능 구현( hexColorCode 랜덤 부여 / EnergyBar 구현/배치 / useBox 기반의 충돌 구현 등 ) <br /> 재사용 가능 컴포넌트 구현( FriendList, ChatRoom, Countdown, AlarmModal, MatchResultModal 등 ) <br /> socket.io 구현( 채팅, 대기실, 게임모드 )

  </details>

  <details><summary>Week 3 - 기능 개발 + 시연 준비</summary>

  `2022년 06월 13일 ~ 2022년 06월 18일( PT Day )`

  게임모드 (Play)규칙 수정 <br /> 자동차 물리 구현 보완( 전후 수치 값 조절 / 엔진파워 상향조정 / 부스터 및 경적 기능 추가 등 ) <br /> socket.io 성능 최적화 <br /> 배포 완료( Netlify + AWS ElasticBeanstalk ) <br /> 기능상 버그 수정

  </details>

### 🎨 기술 스택( Tech )
---

- **Base** > **stack -** MERN

- **Language** > <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=Javascriipt&logoColor=white">
- **Style** > <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
- **Authentication** > <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
- **3D render** > <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=Three.js&logoColor=white"> @react-three/fiber + @react-three/cannon + @react-three/drei
- **Web-socket** > <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white">
- **Front** > **publish** <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=Netlify&logoColor=white">
<!-- - **Back** > **deploy** <img src="https://img.shields.io/badge/AWS Elasticbeanstalk-232F3E?style=for-the-badge&logo=Amazone AWS&logoColor=white"> aws elasticbeanstalk -->
- **[Convention](https://www.notion.so/Git-Docs-2767547655e14a3cac712740ca6ea59d)** > prettier + eslint + eslint-config-airbnb
- **[Version](https://www.notion.so/git-git-problem-case-2cb359f18d7041eda63dcd61d4f83af8)** > Girhub

### 📌 주요 기능( How to play )
---

| 페이지 | 기능( 컴포넌트 ) | 설명 |
| :---: | :---: | :---: |
| **Main** | Login | - Firebase Authentication 기반의 LoginWithGoogle / Github 기능 구현 |
|  | Logout | - 로그아웃 후, 로그인 페이지로 이동 |
|  | WaitingRoom | - 게임모드 진입 전, 유저대기실 <br />- 랜덤 색상의 차로 이동 가능 <br />- 하단의 기능 또한 사용 가능 |
|  | FriendList | - 좌측하단의 친구 아이콘 클릭 시, 유저의 친구 목록이 팝업됨 <br />- ➕ 버튼 클릭 시, 친구 추가 목적의  input창이 토글(open)됨 <br /> ( 이미 유저인 친구 이름에 한해, 입력 가능 ) <br />- 재클릭 시, 다시 토글(close)됨 <br />- ❌ 버튼 클릭 시, 팝업된 친구 목록이 OFF됨 |
|  | ChatRoom | - 팝업된 친구 목록의 친구 이름 클릭 시, 대화창(1:1)이 팝업됨 <br />- 하단의 input창에 메시지 입력 가능 <br />- 🔙 버튼 클릭 시, 친구 목록으로 돌아감 <br />- ❌ 버튼 클릭 시, 팝업된 대화창이 OFF됨 |
|  | ParkingZone | - **/gameroom** <br />- 일종의 포탈로, 게임모드(gameroom)로의 이동 가능 <br />- 🔲 오브젝트 안으로 진입 시, 5초의 카운트다운 시작 + 끝남과 동시에 특정 이벤트 효과와 함께 게임모드로 진입 <br />- **/github** <br />- 해당 프로젝트의 repository가 담긴 github 주소로 이동 |
|  | Countdown | - AlarmModal 재사용 기반 <br />- 게임모드 진입 전, 5초 카운트다운 <br />- 결과창 팝업 후, 10초 카운트다운 + 종료 시 대기실로 자동 이동               |
|  | AlarmModal | - 로그인 후, 대기실 입장 시 “Welcome” 모달 생성( 위 ⇒ 아래 / 이하상동 ) <br />- 이외 FriendList 친구 추가 기능의 input값에 따라, 관련 모달이 생성됨 |
| **GameRoom** | Car | - 게임모드 우측상단의 방향키 참고하여, 조작 가능 |
|  | BoostGuage | - 가속 정도에 따라, 좌측상단의 BoostGuage shape이 변형됨 |
|  | EnergyBar | - 전후좌우 여부에 따라, 받힌 차량의 감소하는 에너지 소모량이 다름 |
|  | MatchResultModal | - ⭕ (= 플레이가 불가한 상태 ) 표시된 유저의 차를 bump 시, MatchResultModal 이 해당 유저 모니터에 팝업됨( 플레이 중, kill한 횟수 ) <br />- 이때 해당 유저는 bump 당한 유저를 의미함 |
|  | MoveMainPage | - 좌측 상단의 🔙 버튼 클릭 시, 대기실(WaitingRoom)로 돌아감 |
|

### 🚀 Our Challenge
---

- [PT 자료](https://www.notion.so/vanillacoding/PT-f0c8e0a54375420cac3645b95c3daebc)

- Three.js + @react-three/fiber

  ![Three.js for Basic](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c50ae70e-7ee4-4999-a2f0-49530c7da0c7/threeJS-basic.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220621%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220621T081033Z&X-Amz-Expires=86400&X-Amz-Signature=26ff919042b7c6e570efdf432272d3a9809581c6c5ab63b4b0bbbd8f5537b41f&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22threeJS-basic.png%22&x-id=GetObject)

  Renderer는 Camera에 담긴 Scene을 웹 페이지에 구현하는 것으로, 이때 Scene은 Object 3D와 그것을 비추는 Light의 집합체입니다. Mesh를 의미하는 Object 3D의 경우 Geometry로 만들고자 하는 오브젝트 모양을, 그리고 Material로 색과 질감을 정함으로써 웹 페이지상 배치(구현)됩니다.

- 물리엔진 적용

  ![Physics engine on Object 3D](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/fa6dfaed-63f9-44cd-9236-279152324957/threeJS-rendering.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220621%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220621T082041Z&X-Amz-Expires=86400&X-Amz-Signature=26e6efc3a29050b9e746d15b87fa456c0fc233ff64116a4b966caed2163c9431&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22threeJS-rendering.gif%22&x-id=GetObject)

  위와 같이 무중력 공간에서의 Obejct 3D 대신 등장하는 모든 물체에 중력을 가함으로써 대지와 붙어 있는 모습을 구현하고자, 물리엔진 라이브러리를 적용하였습니다. 결과적으로 자동차 간 충돌 시 전후좌우 감지에 따른 데미지 및 자동차의 속력, 위치 계산 등 추가적인 물리 구현을 더하였습니다.

  물리엔진 또한 직접 구현을 초기 목표로 하였으나, Three.js의 4 x 4 매트릭스 기반의 물리를 모두 구현하는 데 프로젝트 기간상 어려움이 있어 라이브러리의 활용을 도모하게 되었습니다.

  ![Our Code](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5e44a701-181b-4166-b959-9e31851908b4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220621%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220621T234835Z&X-Amz-Expires=86400&X-Amz-Signature=d851eacf1c890bb87833a30529f17aa6bd6ab0aaddb76d125ada08c3eef60ac9&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

- Socket.io

  **For real-time communication, Socket.io**

  ![Our Code](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f64f64da-b0d5-4964-8255-c1c213504a83/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220621%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220621T235116Z&X-Amz-Expires=86400&X-Amz-Signature=bae086231c18e5df199b7521cae5caf9095064fd70929ba7558840085ae1c362&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

  지속적인 (소켓)통신을 기반으로 다른 유저의 움직임을 나타내야 했기에, 소켓에 대한 채팅 socket 이상의 이해가 필요하였습니다. 초반 로직의 경우 useEffect 내, dependency를 없애는 방향으로 접근하였는데 별도의 속도 제한이 없어, 성능 저하란 사이드 이펙트를 발견하였습니다. 그러한 딜레이를 최소화하기 위해 일반(대중적) 화면 주사율인 60FPS에 맞춤으로써 초당 60번의 요청을 보냄에 따라 최소한의 속도를 보장하게 하였습니다. 이때 1프레임을 재생하는 데 걸리는 시간은 15ms이므로, 해당 시간에 맞춰 15ms에 한 번 소켓통신하도록 설정하였습니다.

- React-three/fiber

  **React renderer, for Three.js**

  이번 프로젝트를 통하여 처음 시도해 본 React-three/fiber는 다음의 장점을 지닙니다. 먼저
  animation, 혹은 레이아웃 변경과 같은 효과의 사용 시 React보다 매끄러운 렌더링을 보장할 수 있습니다. 렌더링 대상을 나눠, 여러 프레임에 넣음으로써 리렌더링 최적화가 가능하기 때문입니다. 또한 Three.js와의 비교에 있어 다음과 같이 더 간단한 코드를 자랑합니다.

  ![Our Code](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/83bce036-d9ed-440c-ac81-8250ad0f6196/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220621%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220621T235403Z&X-Amz-Expires=86400&X-Amz-Signature=b4e7d7a044acfc4a5fbfdec02c353de43b1ec08c61b7af5a5575afcf3dbfc0cb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

  그럼에도 불구하고 PT를 준비하며 회고중, Object 3D를 구사하는 데 React-three/fiber보다 Three.js가 적절할 거 같다 생각이 들었던 이유는 바로 사용자가 적어 관련 정보를 수집하는 일이 쉽지 않았기 때문입니다. 또한 Three.js와 더불어 React를 함께 사용하다 보니(= React-three/fiber) 물리엔진까지 더해져, 프로그램이 다소 무겁게 느껴졌습니다.

- cf. 전역상태관리를 사용하지 않은 이유

  프로젝트 첫 주차 때 Redux와 같은 전역상태관리의 사용 여부에 대해 팀원들과 많은 논의를 거쳤습니다. Mockup 작업중 컴포넌트마다 쓰일 state를 열거해 보았고, 비교적 그 양이 많지 않을 거란 결론 끝에 전역상태관리를 사용하지 않기로 결정하였습니다. 더불어 Three.js를 사용하기에 페이지 간 이동이 빈번하지 않아, 컴포넌트 간 props 전달 또한 적을 것으로 판단했기 때문입니다.

### 💡 회고( Retrospect )
---

  <details><summary>김윤건</summary>

  첫 팀 프로젝트 시작할 땐, 다른 팀원들에게 기대지 말고, 내가 한 번 더 움직이고, 한 번 더 생각하자는 마음으로 시작했다. 처음 아이디어를 만들어가는 과정부터 많은 아이디어가 나왔고, 그중에서도 어려움이 클 것 같았던, 이동하면서 지도 로드뷰 하면 나오는 사진을 3D로 렌더링하기가 채택됐다. 너무 광범위한 범위를 3D로 렌더링한다는 게 프로젝트의 목적이 불분명한 것 같았고, 3D와 자동차에서 시작된 아이디어에 동적이고 인터랙티브한 웹사이트 구현 아이디어도 더해졌고, 3D 모형에 범퍼카 게임을 하는 아이디어로 발전했다. 처음 아이디어가 선택되고 계획을 세우는 첫 주에는, 계획을 세운 이후에는 계속 남아서 three.js 기초에 대해 공부를 했다. 첫 주에 기술 검증을 마치고, 하나하나 구현해나갈 때마다, 확신이 생겼고 모두가 하나의 목적을 위해서 노력해서 팀원들을 보면서 힘을 내서 프로젝트를 할 수 있었다. 새로운 아이디어, 포탈을 통해서 점프해서 이동하고, github 포탈 연결하기와 같은 아이디어들은 프로젝트에 대해 계속해서 생각하다가 우연히 이렇게 하면 재미있겠다, 하면서 번뜩인 생각들을 구현한 것인데, 처음 개발 공부를 시작하게 된 Interactive Developer 김종민 님의 포트폴리오 영상을 보면, 어떤 무언가를 보고 영감을 받고 그것을 프로그래밍해서 만들었다고 말했던 부분들이 생각났다. 또 우리 프로젝트에 몰입하고, 계속해서 프로젝트에 대해 생각을 하면서 관련된 아이디어들이 계속해서 생각나고, 당장은 구현하지 못한 코드, 해결하지 못한 문제들도, 집을 돌아가면서 길을 걷다가 해결 방법이 떠오르기도 하고, 추가할 만한 아이디어들이 떠오르는 경험을 3주 동안 많이 했다. 시간이 지나면서 점점 팀원들과 싱크가 맞아서 팀이 분업이 잘되는 걸 느끼면서, 팀으로부터 더 에너지를 받았고, 효율성도 높아졌다. 문제해결에 어려움이 있을 때는 끝까지 함께 남아서 해결하기도 했는데, 혼자라면 이렇게 까지 못했겠다는 생각을 정말 많이 했다. 처음 생각과 달리, 팀원들에게 의지하기도 하고, 힘도 많이 얻은 것 같다. 다행히 처음 계획했던 칸반대로 계획했던 기능구현들도 다 하고, 배포도 다 해서 베스트 팀이었구나! 다시 한번 느꼈다.

  팀 프로젝트를 통해 배운 것은 팀원들과의 소통하는 방법과 같이 일하는 사람한테 얻는 에너지였다. 서로 같은 이야기를 했어도, 결과물에 대해서 다르게 나타날 때가 있었다. 이번에는 결과 모달창 컴포넌트를 구현할 때 그랬는데, 이전과 비슷한 작업이었던, 알람모달창이나 카운트다운 모달창을 보고 결과 모달창도 비슷하게, 결과와 어디에 위치시킬지를 나타내는 props만 받으면 될 것으로 생각했고 모두 같이 이야기가 됐고, 이해했다고 생각했는데, 시간이 지나고 보니, 똑같이 생각했던 게 아니었고, 어떤 props를 받아야 될지 혼란이 있었다고 했다. 해당 컴포넌트에 대해 이야기할 때, 넘겨받는 값을 명확하게 이야기하지 않고 넘어간 것이 잘못이었고, 지레짐작으로 이해됐겠지, 하고 넘어간 게 의사소통에서의 문제였다. 해당 문제에 대해 해결하기 위해 다음 회의부턴 모두가 명확히 이해한 바를 묻고 애매한 부분들은 자세하게 짚고 넘어갔다. 그다음으론 함께 일하는 사람에게 받는 에너지였는데, 대부분 혼자 일하고, 독립적인 성향을 가진 사람으로 남에게 기대지 말고 바라지 말자는 생각으로 일했었다. 거기에서 사람에게서 기대감이나 신뢰감이 없어지기 때문에 그랬었다. 그래서 그냥 힘들더라도 내가 더 움직이고 하나 더 하자는 마음으로 일을 시작했는데, 처음 가장 막히고 두려움이 컸던 three.js를 이용해서 모델링하고 기틀을 잡을 때, 항상 나보다 늦게 가고 다음 날이 되면, 더 완성된 모습들을 볼 때, 또 소켓으로 고생하고 계속 막혀있을 때, 포기하지 않고 끝까지 이야기하고 의논해서 연결했을 때, AWS로 배포가 힘들 때도 결국엔 끝까지 해내고, 다른 일들을 분업화해서 회의록을 작성해 주시고, 필요한 문서들을 만들어 주시고, 칸 반 계획을 만들어 주시는 부분들까지 혼자라면 너무 힘들었겠지만, 팀원들 모두가 노력하고 피곤하더라도 서로가 포기하지 않고 기를 쓰는 모습을 보면서 더 힘을 얻었던 것 같다.

  </details>

  <details><summary>박수정</summary>

  **소프트 스킬의 성장**

  프로젝트를 시작하기에 앞서 협업에 임하는 본인의 자세는 어떠해야 하는지를 고민했을 때, '느려도 한 번 더 꼼꼼히' 란 다짐이 가장 먼저 떠올랐습니다. 기술적으로 부족한 부분은 팀원들과의 논의를 통하여, 그리고 기술(지식)을 공유함으로써 보완할 수 있는 부분이라 생각했습니다. 그러나 협업을 진행하는 데 가장 중요하지만, 점차 챙기기 힘들어질 부분에 보다 집중해보았는데요, 바로 기록의 습관화 및 생활패턴 공유 등의 문제였습니다. 공통의 규칙을 정하고, 지키는 것에 대한 중요성을 인지하고 있던 터라 우리는 프로젝트 초반부에 코드 컨벤션과 더불어 3주간 함께할 우리만의 규칙을 정하였습니다. 10시 출근을 생활화함으로써 협업 중 코어 타임을 준수할 수 있었습니다. 또한 회의 시 사전에 정해 둔 포지션대로 움직인 덕에, 정해진 시간 내 모두가 만족할 결론을 끌어낼 수 있었습니다. 더불어 기록의 습관화로 회의가 끝난 뒤에도 그러한 회의록을 참고하여 작업을 이어 나갔습니다. 무엇보다 코드 리뷰에 진심이었습니다. 팀원 모두의 approve가 있어야, 내 PR의 merge가 가능한 방식이었기에 다른 작업의 진행 여부와 상관없이 코드 리뷰와 그에 따른 리팩토링이 우선이었습니다. 처음 팀원의 코드 리뷰를 작성할 땐, 바삐 돌아가는 일상에 이 또한 일(?)처럼 느껴져 얼마나 상세히 작성해야 하는지에 대한 감이 부족했습니다. 그러나 점차 진심이 더해져, PR에서부터 내 작업 사항에 대해 보다 구체적인 기록을 남김은 물론 자연스레 비대면 의사소통에도 익숙해졌습니다. 이처럼 작지만, 소홀히 하면 더 큰 사이드 이펙트를 불러일으킬 수도 있는 작업에 모두가 최선이었기에 프로젝트 결과 또한 기대 이상의 모습을 보일 수 있었다고 저는 생각합니다.

  </details>

  <details><summary>허진권</summary>

  팀 프로젝트를 진행하면서 기술적 측면은 물론 협업에 필요한 커뮤니케이션을 많이 배웠습니다.

  **커뮤니케이션의 중요성**
  - 혼자서 개발할 때는 내가 하던 방식대로, 내가 편한 대로 코드를 써 내려가도 괜찮지만, 팀원과 같이 개발할 때는 특히 커뮤니케이션이 중요하다는 사실을 깨달았습니다.
    - 슬랙을 통한 데일리 스크럼 미팅 진행: 개발 기간 동안 매일 아침 같은 시간에 어제의 구현사항, 오늘의 일정, 딜레이 여부와 도움의 필요 유무를 게시해 간단한 미팅을 진행하였습니다. 하루의 업무를 시작하기 전에 지금까지의 작업 현황을 공유하고 앞으로의 일정을 이야기함으로써 다소 딜레이가 있는 태스크가 있더라도 유동적으로 프로젝트를 이어 나갈 수 있었습니다.
    - 프로젝트 진행 중의 갈등과 해소: 프로젝트를 진행하는 기간 동안은 기본적인 코드 컨벤션이나 간단한 버튼 모양에서부터 어떤 아이디어를 구체화하고 프로젝트 주제로 삼을 것인지 크고 작은 갈등의 연속이었습니다. 혼자서 하는 작업이 아니고 각자 본인이 선호하는 방식이 있으므로 갈등은 필연적으로 발생하는 것이지만 이를 해결하는 방식에 대해 많이 배웠습니다. 예를 들어, 유저가 잘못된 이름으로 친구등록을 하려고 할 때 어떤 방식으로 유저에게 표시해줄지에 대한 각자의 의견이 있었는데(모달창 vs 친구창에 텍스트 표시) 화면 상단에 알림창이 나타났다가 시간이 지나면 사라지고, 유저가 클릭해서도 닫을 수 있는 알림창을 만들기로 합의하였습니다. 이처럼 저희 팀의 경우 서로 의견충돌이 일어나는 경우 서로의 의견을 존중하면서 최대한 절충안을 찾으려고 노력하였고 좋은 결과로 이어질 수 있었습니다.
    - PR에 대한 코드 리뷰: 저희 팀은 팀원이 작업한 결과물에 대해 정말 꼼꼼하게 리뷰를 진행하였습니다. 기본적인 코드 컨벤션에서부터 변수명, 작성 로직까지 하나하나 이해하고 코멘트를 남겨서 소통하였습니다. 그 결과 팀원 모두가 납득할 수 있는 코드를 작성할 수 있었고 내가 작성한 코드가 아니더라도 전체적인 코드를 이해하고 있었고, 다른 사람이 작업을 이어받아 수행해도 큰 문제 없이 진행할 수 있었습니다.

  **새로운 기술 스택에 대한 배움과 적응**

  - three.js라는 완전히 새로운 기술 스택과 아직은 익숙하지 않았던 socket.io를 도입하였는데, 이를 통해 새로운 사항을 적용할 때는 어떻게 배우고 적응해야 하는지 배웠습니다.
    - 새로운 기술 스택을 배우기 위한 자세: three.js를 처음 사용해보기 때문에 우선 실제 사용 예를 찾아보았습니다. 이후에 어떤 식으로 기술을 사용할 수 있겠다는 생각이 들면 공식문서 등을 찾아보면서 기본적인 사항부터 순차적으로 작성해보고 적용해보는 방식으로 점점 익숙해지는 시간을 가졌습니다. 자료검색에 익숙해졌고 영어로 된 문서들을 보는 데에도 익숙해졌습니다.
    - 팀원들과 기술공요: 저희 팀은 총 세 가지의 소켓 모드를 개발했는데, 각자 하나씩 socket 개발을 수행하였고 3d 구현 또한 한 사람이 모두 만든 것이 아닌 각자 원하는 모델 등을 찾거나 만들어서 회의를 통해 우리 프로젝트에 적합한지, 배치하기에는 어렵지 않은지 논의한 후에 본인이 직접 배치하였습니다.
    이렇게 분업을 할 수 있었던 이유는 일정 기간마다 미팅을 통해 팀원들의 학습 진행도를 확인하고 서로의 지식을 공유했기 때문입니다. 이러한 기술 공유를 통해 한 사람이 모든 기능을 담당하는 것이 아닌 분업을 통해 일의 효율성을 높일 수 있었습니다.

  </details>

### 🙇‍♀️ 팀원
---

**`김윤건`** 📧ungun96@gmail.com

**`박수정`** 📧krystarline@gmail.com

**`허진권`** 📧hjinkwon912@gmail.com
