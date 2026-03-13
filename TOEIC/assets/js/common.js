
/*************************************************************************************************
                                            test.html
*************************************************************************************************/
/**
 * 
 * 파이프라인
 * 
 * 데이터 로딩
 *  - 1. question.js에서 문제 데이터를 받아서 문제 템플릿을 만들어서 해당 데이터 객체에 맞는 템플릿 그려서 화면에 송출
 *  - 2. 문제 풀기 기능 만들기
 *        2-1. 문제 템플릿 옆에 체크한 답안이 표시되는 답안 템플릿 만들기
 *        2-2. 체크한 답안의 문제를 체크해서
 *        2-3. 답안지에 있는 해당 문제에 (2-1) 값에 클래스를 줘서 체크 표시 만들기
 *  (추가)2-4. 문제 풀이 현황 체크 
 *  - 3. 문제에서 체크 답안 이벤트 실행
 *        3-1. 체크한 답안들에 체크 표시 주기
 *        3-2. 문제지 답안들과 와 답안지의 답안들과 체크 표시 연동하기 
 * 
 * 데이터 수집
 *  - 4. 제출할 때 체크한 값들 객체로 저장하기
 *  - 5. 저장한 객체를 로컬스토리지에 저장해놓기
 * 
 * 
 * => 문제를 다 풀었으면 result.html로 못풀었으면 이동 못함!!
 * 
 * 
*/


// 1. 준비!
  
// 변수 정의 : 입력 답을 넣을 객체 
let answers = {};

// 2. 데이터 로딩 : 문제 데이터를 받아서 문제 리스트 템플릿 만들기
const test = () => {
  // 문제 리스트 담을 변수 정의 
  // -> 아이디는 한 파일에 고유하게 하나만 가능하기 때문에 querySelector이 아닌 querySelectorAll로 지정
  const list = document.querySelector("#test"); 

  // list 변수 안에 html 집어넣기
  list.innerHTML = question.map(item => { // 데이터 원본을 수정하는 것은 위험하기 때문에 map으로 원본 복사해서 새 배열 생성하기
    // 변수 정의 : 문제에 이미지가 있으면 이미지 노출 / mp3파일이면 오디오 노출 -> 둘 다 없을 경우 에러가 아닌 undefined 반환 (옵셔널체이닝)
    const media = item.media ? `
      <div class="testContents ${item.media?.includes("mp3") ? "mp3" : "img"}">
        ${item.media?.includes("mp3") ? `<audio controls><source src="${item.media}"></audio>` 
        : `<img src="../assets/media/images/${item.media}">`}
      </div>
    `: ""
    // 문제 html 템플릿 그리기
    return `
      <li>
        <div class="testQuestion">
          <div class="testTitle">
            <div class="num">
              <span class="testNum">문제 ${item.id}</span>
              <span>part ${item.part}.</span>
              <span>${item.category}</span>
            </div>
            <p>${item.content}</p>
          </div>
          ${media}
          <div class="testOption">
            <ol class="optionList">
              ${item.options.map((option,index) =>{
                  // 반복문을 사용하여 답안 만들기
                  // name에 문제 id값을 넣어 해당 문제의 답안을 묶어주기 -> 예) 이 답안들은 1번 문제의 답안들이다~
                  // value 값에 답안 번호 저장 (index는 0부터 시작이고 답은 1부터라서 index+1로 설정)
                  return `<li class="radioWrap">
                    <input type="radio" class="radio" id="chk-${item.id}-${index}" name="${item.id}" value="${index+1}"/>
                    <label for="chk-${item.id}-${index}"><span>${index + 1}.</span> ${option}
                  </li>` 
                }).join("")
              }
            </ol>
          </div>
        </div>
      </li>
    `;
  }).join("");
}
test();

const progress = () => {
  const chkItems = document.querySelectorAll("input[type='radio']:checked"); // 변수 정의 : 체크한 답
  
  
  // 문제 푼 현황
  let persent = document.querySelector("#persent");
  let bar = document.querySelector("#progressIng");

  persent.innerHTML = `
    ${chkItems.length} / ${question.length}
  `
  bar.style.width = `${(chkItems.length/question.length) * 100}%`
}

// 2. 문제 풀기 기능
const checkEvent = () => {
// 문제에서 체크한 답과 답안 목록 부분이랑 동일하게 만들기
  const answersWrap = document.querySelector("#answersWrap"); // 변수 정의 : 답안 리스트 
  const input = document.querySelectorAll("input[type='radio']");// 변수 정의 : 모든 라디오 항목들
  
  progress();

  // li는 options 갯수만큼
  answersWrap.innerHTML = question.map((item, index) => { 
    // question 객체만큼 돌리고 (ul 갯수)
    // question의 options(답안갯수)만큼 돌려서 li 만들기 (index는 0부터니까 +1 해주기)
    return `
      <div class="questionBox">
        <div class="qeustionNum">${index+1}</div>
        <ul class="answerList">
          ${item.options.map((_, idx) => `<li class="li"><button type="button" class="btn" data-id="chk-${index+1}-${idx}">${idx + 1}</button></li>`).join("")} 
        </ul>
      </div>
  `}).join("");
  
// 푼 문제 체크 후 답안지에 반영

  // 답안 리스트
  const answersList = document.querySelectorAll(".answerList");

  answersList.forEach(list => {
    const answerBtn = list.querySelectorAll(".btn");

    answerBtn.forEach(btn => {
      btn.classList.remove("active");

      // 답안지의 버튼 클릭
      btn.addEventListener("click", (e) => { // 답안지의 버튼 클릭시
        const silbing = e.target.closest(".answerList").querySelectorAll(".btn"); // 선택한 버튼의 다른 형제 버튼들을 찾아서
        silbing.forEach(item => item.classList.remove("active")); // active 클래스를 모두 지워 초기화 해주고 (미선택 표시)
        const btnId = e.target.dataset.id // 클릭한 답안의 data-id를 가져와서
        document.getElementById(btnId).checked = true; // 값이 일치하는 input id를 찾아 체크하고
        e.target.classList.add("active"); // 클릭한 답안에 active 클래스를 줌
        progress();
      });
    });
  });

  // 체크시 클래스 추가
  input.forEach(item => {

    // 선택한 답안 해당 문제 찾기
    const questionId = Number(item.name) -1; // -1 하는 이유 : 0부터 시작하는데 보여지는 문제의 id 값은 1부터 시작하기 때문
    const targetList = answersList[questionId]

    // 선택한 옵션값 저장
    const option = Number(item.value) -1; // -1 하는 이유 : 인덱스는 0부터 시작하는데 문제 답 번호와 싱크를 맞추려고 index를 1씩 더했기 때문
    
    // 이벤트리스너 : 라디오를 클릭시 체인지 이벤트 실행 (푼 문제 체크 후 답안지에 반영)
    item.addEventListener("change", () => { 
      // 1번에서 정의 한 answer 객체에 프로퍼티(푼 문제) 담기
      answers[item.name] = item.value;

      targetList.querySelectorAll("li").forEach(li => { // active 초기화 (중복 선택 방지)
        li.querySelector(".btn").classList.remove("active");
      })
      targetList.children[option].querySelector(".btn").classList.add("active"); // 선택한 타켓에 클래스를 주어 체크 표시
      progress();
    });
  });
}
checkEvent();

// 3. 답안 전송 이벤트
const submit = () => {    
  // 변수 정의 : 전체 라디오와 체크된 라디오 
  const chkItems = document.querySelectorAll("input[type='radio']:checked"); // 푼 문제 확인

  let result; // 문제 다 풀었는지 확인 여부 변수 

  // 라디오는 한개만 선택 가능하기 때문에 선택된 라디오 값과 문제수가 동일하면 통과    
  if(chkItems.length === question.length) {
    result = true; // 문제 다 풀었으면 true

    // 데이터 수집 : 로컬스토리지에 보낼 데이터 정의
    const answesrData = {
      test: answers, // "시험" : "푼 문제"
    }

    // 데이터 전달 : localStorage에 데이터를 저장하여 다른 페이지에서도 해당 데이터를 사용할 수 있게 함
    localStorage.setItem("testResult", JSON.stringify(answesrData)); // localStorage key:value 저장
    location.href = "result.html" // 데이터 전달 후 result 페이지로 이동
  } else {
    result = false; // 다 안풀었으면 false
  }

  // result 값이 true일 경우 제출 완료 -> 결과페이지 이동 / 아니면 안 푼 문제 풀라고 안내
  alert(result ? "제출 완료! 답안 확인!" : `안푼 문제 푸세용`);
}

/**
 * 
 * 보완사항!
 * 1. 체크박스일 경우 중복 체크일때 (답이 여러개일 수 있는 경우)
 * 2. 안 풀고 제출하면 안 푼 문제 확인해주기!!
 * 3. 한문씩 뜨게 하고 다음 문제 넘어가게 해보기
 *
*/


/*************************************************************************************************
                                            result.html
*************************************************************************************************/

/**
 * 
 * 파이프라인
 * 
 * 데이터 복원
 *   - 1. test.html 에서 로컬스토리지에 저장한 답안들 가져오기
 * 
 * 복원된 데이터 처리
 *   - 2. 정답 체크
 *         2-1. 로컬스토리지에 저장한 답들과 question.js의 answer 답과 일치한지 확인
 *              * 문제 번호와 그에 해당하는 답안들이 서로 일치하는지 확인 !!
 *         2-2. 만약 로컬스토리지에 저장한 답들과 question.js의 answer 답이 일치한다면 -> 정답처리
 *              그렇지 않다면 -> 오답 처리
 *              * 정답일 경우 correct 클래스 추가 / 오답일 경우 wrong 클래스 추가
 *         2-3. 1문제당 점수 = (100/총 문제수): 올림 처리 
 *              => 내점수 : (현재 점수 / 전체 점수) * 100 (최고 100점)
 * 
 * 데이터 로딩
 *   - 3. 해당 문제에 대한 문제 해설 데이터를 가져와서 템플릿에 그린 후 화면에 노출
 * 
 * 
*/

const resultData = () => {
  
  // 1. 로컬스토리지에 저장한 답안들 가져오기
  // 데이터가 있으면 문제 템플릿을 / 없으면 nodata를
  const data = localStorage.getItem("testResult");
  const result = document.querySelector("#result");

  const userdata = JSON.parse(data); // JSON 문자열을 객체로 변환

  // 불러온 데이터 처리 후 화면 노출
  if(!data) {
    // 데이터업쪙ㅠㅠ
    result.innerHTML = `<div class="noData">문제를 풀지 않았어요</div>`
    document.querySelector(".title").style.display = "none";
    document.querySelector(".desc").style.display = "none";
    document.querySelector(".btn").textContent = "돌아가기";  
    document.querySelector(".btn").setAttribute("href", "test.html")
  } else {

    
    let score = 0; // 내점수 숫자로 초기화
    result.innerHTML = question.map((item, idx) => {
      // 내 대답 숫자로 가져오깅
      const userAnswer = Number(userdata.test[idx+1]);

      // 점수 체크
      if (userAnswer === item.answer) score += Math.ceil(100 / question.length);

      // 점수가 백점일 경우 강조 클래스 
      const resultScore = (score === 100 ? "total100" : "myScore");
  
      document.querySelector("#score").innerHTML = `
        <p class="${resultScore}">${score}점 <span class="total">/ 100점</span></p>
      `

      // 정답 체크하기
      // 정답일 경우 resultBox에 correct 클래스 추가 / 오답일 경우 wrong 추가
      return `<div class="resultBox ${userAnswer === item.answer ? "correct" : "wrong"}">
        <div class="resultTitle">
          <span>part ${item.part}</span>
          <span>문제 ${item.id}</span>
        </div>
        <div class="resultCon">
          <p class="reaultQuestion">${item.content}</p>

          내 정답 : ${userAnswer}
          찐 정답 : ${item.answer}


          <ol class="resultList">
            ${item.options.map((option,index) =>{  
              // 클래스명 담을 변수
              let classname = "";

              // 찐 정답 표시 => index+1(답안 번호랑) 찐 정답이 일치하는 li에 클래스 추가할꼬야
              if(item.answer === index+1) {
                classname += "correctOption"
              
              // 오답 표시 => 내가 고른 답안이랑 찐 답안이랑 다르쟈나?
              } else if((userAnswer === index+1) !== (item.answer === index+1)) { 
                 classname += "wrongOption"

              // 정답도 오답도 아닌 기본 클래스~
              } else {
                classname="option"
              }
              // 기본
              return `<li class="${classname}">${index+1}. ${option}</li>` 
              
              }).join("")
            }
            <li></li>
          </ol>
        </div>
        <div class="explanation">${item.explanation}</div>
      </div>`
    }).join(" ");
  }
}
resultData();
