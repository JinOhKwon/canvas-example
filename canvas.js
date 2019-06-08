// DOM 구조안에는 기본적이 이벤트 함수가 있으며, 상황에 맞게 내가 addEvenetListener에 등록 할수 있다.
// 그럼 내가 여기에서 어떻게 이벤트 등록 하는 방법 또는 사용 하는 방법에대해서 공부 하자!
// 특정 객체를 만들었을때 관련된 객체(클래스) 대한 API 글을 읽던지 아니면 객체를(개발자도구) 열어본다.
// 로직을 세운다는거는 나만의 스토리를 생각하자
// story example
// 사전조건) 내 사각형의 위치를 캐싱해논다.

// 1. 클릭 이벤트
// 1.1 클릭 상태를 설정한다
// 1.2 내가 클릭 한 마우스의 위치가 범위에 해당하는가?
// 1.3 내가 클릭한 위치의 x, y 좌표를 캐싱한다.

// 2. 무브 이벤트
// 2.1 내가 클릭한위치를 기준으로 마우스 이동 시  (이전)위치 ~ (이후)위치 만큼 사각형이 이동한다.

// 3. 마우스 업 이벤트
// 3.1 클릭상태를 해제한다.
// 3.2  2.1과 동일함.

/**
 * 캔버스 객체
 */
let canvas = document.getElementById('myCanvas');

/**
 * 캔버스 2D 객체
 */
let ctx = canvas.getContext('2d');

/**
 * 캔버스 가로값
 * 
 * @type { number }
 */
let widthX;

/**
 * 캔버스 세로값
 * 
 * @type { number }
 */
let widthY;

/**
 * 마우스 다운 가로값
 * 
 * @type { number }
 */
let mouseDownWidthX;

/**
 * 마우스 다운 높이값
 * 
 * @type { number }
 */
let mouseDownHeight;

/**
 * 다운 여부
 * 
 * @type { boolean }
 */
let isMouseDown = false;

/**
 * 클릭여부 
 * 
 * @type { boolean }
 */
let isClick = false;

/**
 * 화면 진입 초기화
 */
function init() {
    eventInit();
}

/**
 * 이벤트 초기화
 */
function eventInit() {
    // 캔버스
    // 콜백으로 내가 원하는 함수로 바인딩 되지 않음... 콜백 함수 구현체에다가 내가 만든 함수를 호출
    // 1. 캔버스 마우스진입해서 마우스 오버로 좌표를 체크한다.
    canvas.addEventListener('mousedown', (evt) => {
        getMouseDown(evt);
    });

    // 2. 마우스가 클릭이 시작되었을때 해당 좌표를 구하며 있다가 시작을 하였을때 좌표를 구한다.
    canvas.addEventListener('mousemove', (evt) => {
        getMouseMoveDraw(evt);
    });

    // 3. 마우스가 움직이는 거리마다 해당 좌표를 구한다.
    canvas.addEventListener('mouseup', (evt) => {
        getMouseUp(evt);
    });

    // 4. 해당 사각형을 확대해서 보여준다.
}

/**
 * 직사각형 그리기
 * 
 * @param {number} mouseDownWidthX 
 * @param {number} mouseDownHeight 
 */
function drawRectangle(mouseDownWidthX, mouseDownHeight) {
    // 이동한 위치값 : 마우스이동거리 - 현재값
    let width = mouseDownWidthX - widthX;
    let height = mouseDownHeight - widthY;
    ctx.beginPath();
    ctx.rect(widthX, widthY, width, height);
    ctx.stroke();
    console.log(`drawRectangle = widthX : ${widthX}, widthY : ${widthY}`);
}

/**
 * 마우스 좌표값을 구한다.
 * 
 * @param {Event} evt 이벤트
 */
function getMouseDown(evt) {
    // 현재 캔버스 객체에 윈도우 기준으로 어디 위치하고 있는지에 대한 함수... (활용 용도는 윈도우가 동적으로 변할시에따라 좌표값을 구할 수 있다.)
    // 브라우저에서 캔버스가 현재 위치한 좌표값
    // rect left 패딩 마진값 포함됨
    let rect = canvas.getBoundingClientRect();

    // 전체 가로 - 캔버스 왼쪽값 / 캔버스 오른쪽값 - 캔버스 왼쪽값 * 캔버스 가로
    widthX = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    widthY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;

    isMouseDown = true;
    // console.log(`getMouseDown = 가로값 : ${widthX} , 세로값 : ${widthY}`);
}

/**
 * 마우스 움직인 좌표를 구한다.
 * 
 * @param {Event} evt 이벤트
 */
function getMouseMoveDraw(evt) {
    // 현재 캔버스 객체에 윈도우 기준으로 어디 위치하고 있는지에 대한 함수... (활용 용도는 윈도우가 동적으로 변할시에따라 좌표값을 구할 수 있다.)
    let rect = canvas.getBoundingClientRect();
    mouseDownWidthX = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouseDownHeight = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;

    // 마우스가 up 이벤트가 들어오면 그리기를 끝낸다.
    if (!isMouseDown) {
        return;
    }

    // 사각형을 초기화한다.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 사각형을 그린다.
    drawRectangle(mouseDownWidthX, mouseDownHeight);
}

/**
 * 마우스 업일때 좌표를 구한다.
 * 
 * @param {Event} evt 이벤트
 */
function getMouseUp(evt) {
    widthX = evt.clientX - mouseDownWidthX;
    widthY = evt.clientY - mouseDownHeight;

    isMouseDown = false;
    console.log(`getMouseUp = widthX : ${widthX}, widthY : ${widthY}`);
}

/**
 * 초기화
 */
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
