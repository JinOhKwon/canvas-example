/**
 * 개인 정리
 * 
 * @description DOM 내용
 * DOM 구조안에는 기본적이 이벤트 함수가 있으며, 상황에 맞게 내가 addEvenetListener에 등록 할수 있다.
 * 그럼 내가 여기에서 어떻게 이벤트 등록 하는 방법 또는 사용 하는 방법에대해서 공부 하자!
 * 특정 객체를 만들었을때 관련된 객체(클래스) 대한 API 글을 읽던지 아니면 객체를(개발자도구) 열어본다.
 * 로직을 세운다는거는 나만의 스토리를 생각하자
 * 
 * @description story example
 * 사전조건) 내 사각형의 위치를 캐싱해논다.
 * 1. 클릭 이벤트
 * 1.1 클릭 상태를 설정한다
 * 1.2 내가 클릭 한 마우스의 위치가 범위에 해당하는가?
 * 1.3 내가 클릭한 위치의 x, y 좌표를 캐싱한다.
 * 2. 무브 이벤트
 * 2.1 내가 클릭한위치를 기준으로 마우스 이동 시  (이전)위치 ~ (이후)위치 만큼 사각형이 이동한다.
 * 3. 마우스 업 이벤트
 * 3.1 클릭상태를 해제한다.
 * 3.2  2.1과 동일함.
 * 
 * @description 고쳐야할 습관
 * 자기세계에 갇힌 주석 및 변수명
 * 주석 작성시 함수명, 함수주석, 함수의 기능 을 명확히 하자
 * 작성로직 검증 할 생각을 안함
 * 혼자서 해결 하는게 아닌 인터넷에서 정답을 찾으려고만 함
 * 
 * @description TODO 공부해야할 내용
 * 전체 가로 - 캔버스 왼쪽값 / 캔버스 오른쪽값 - 캔버스 왼쪽값 * 캔버스 가로
 * let scaleWidthX = (evt.clientX - scaleRect.left) / (scaleRect.right - scaleRect.left) * scaleCanvas.width
 * let scaleWidthY = (evt.clientY - scaleRect.top) / (scaleRect.bottom - scaleRect.top) * scaleCanvas.height;
 */

/**
 * 캔버스 객체
 */
let baseCanvas = document.getElementById('baseCanvas');

/**
 * 캔버스 2D 객체
 */
let baseCtx = baseCanvas.getContext('2d');

/**
 * 스캐일 캔버스
 */
let scaleCanvas = document.getElementById('scaleCanvas');

/**
 * 스캐일 캔버스 2D객체
 */
let scaleCtx = scaleCanvas.getContext('2d');

/**
 * 기본 사각형값
 */
let baseRect = {
    x: 179, 
    y: 252, 
    w: 79, 
    h: 77
}

/**
 * 다운 여부
 * 
 * @type { boolean }
 */
let isMouseDown = false;

/**
 * 이미지
 * 
 * @type { Image }
 */
let img = new Image();

/**
 * 이미지 주소
 */
img.src = 'http://www.mhc.kr/files/attach/images/779/229/882/006/a9428b7f2adb9b5b243255d9c5c491dd.jpg';

/**
 * 초기화 함수다.
 */
function init() {
    // 1. 기본 캔버스를 그린다.
    drawBase();
    
    // 2. 확대영역 캔버스를 그린다.
    let scaleRange = getScaleRangeByRect(baseRect.x, baseRect.y, baseRect.w, baseRect.h);
    drawScale(scaleRange.x, scaleRange.y, scaleRange.w, scaleRange.h);
    
    // 3. 기본 캔버스의 사각형을 그린다.
    drawRectangle(baseRect.x, baseRect.y, baseRect.w, baseRect.h);
}

/**
 * 기본적인 그림을 그린다.
 */
function drawBase() {
    baseCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
    baseCtx.drawImage(img, 0, 0, baseCanvas.width, baseCanvas.height);
}

/**
 * 스케일을 그린다.
 * 
 * @param {*} x 가로
 * @param {*} y 높이
 * @param {*} w 이동한 가로값
 * @param {*} h 이동한 높이값
 */
function drawScale(x, y, w, h) {
    scaleCtx.drawImage(img, x, y, w, h, 0, 0, scaleCanvas.width, scaleCanvas.height);
}

/**
 * 사각형을 그린다.
 * 
 * @param {number} evt 이벤트
 */
function drawRectangle(x = baseRect.x, y = baseRect.y, w = baseRect.w, h = baseRect.y) {
    baseCtx.beginPath();
    baseCtx.rect(x, y, w, h);
    baseCtx.stroke();
}

/***********************************************************************************************
 *                                      Helper Objects                                         *
 ***********************************************************************************************/
/**
 * 마우스 좌표를 가져온다.
 * 
 * @param {*} evt 이벤트
 */
function getMousePos(evt) {
    return {
        x: evt.clientX - baseCanvas.getBoundingClientRect().left,
        y: evt.clientY - baseCanvas.getBoundingClientRect().top
    };
}

/**
 * 스케일영역을 사각형으로부터 반환한다.
 * 
 * @param {*} x 가로
 * @param {*} y 높이
 * @param {*} w 이동한 가로값
 * @param {*} h 이동한 높이값
 */
function getScaleRangeByRect(x, y, w, h) {
    return {
        x: x / baseCanvas.width * img.width,
        y: y / baseCanvas.height * img.height,
        w: w / baseCanvas.width * img.width,
        h: h / baseCanvas.height * img.height,
    }
}

/**
 * 이벤트 리스너를 등록한다.
 */
(function addListeners() {
    // 캔버스
    // 콜백으로 내가 원하는 함수로 바인딩 되지 않음... 콜백 함수 구현체에다가 내가 만든 함수를 호출
    // 1. 캔버스 마우스진입해서 마우스 오버로 좌표를 체크한다.
    baseCanvas.addEventListener('mousedown', (evt) => {
        isMouseDown = true;

        const coordinate = getMousePos(evt);
        // 전체 가로 - 캔버스 왼쪽값 / 캔버스 오른쪽값 - 캔버스 왼쪽값 * 캔버스 가로
        baseRect.x = coordinate.x;
        baseRect.y = coordinate.y;
    });

    // 2. 마우스가 클릭이 시작되었을때 해당 좌표를 구하며 있다가 시작을 하였을때 좌표를 구한다.
    baseCanvas.addEventListener('mousemove', (evt) => {
        // 마우스 클릭상태가 아니라면...
        if (!isMouseDown) {
            return;
        }

        const coordinate = getMousePos(evt);
        baseRect.w = coordinate.x - baseRect.x;
        baseRect.h = coordinate.y - baseRect.y;

        drawBase(evt);

        let scaleRect = getScaleRangeByRect(baseRect.x, baseRect.y, baseRect.w, baseRect.h);
        drawScale(scaleRect.x, scaleRect.y, scaleRect.w, scaleRect.h);

        drawRectangle(baseRect.x, baseRect.y, baseRect.w, baseRect.h);

        document.getElementById('x').innerHTML =
            `
            sx: ${baseRect.x} <br/>
            sy: ${baseRect.y} <br/>
            ex: ${coordinate.x} <br/>
            ey: ${coordinate.y} <br/>
            moveWidth: ${baseRect.w} <br/>
            moveHeight: ${baseRect.h} <br/>
        `;
    });

    // 3. 마우스가 움직이는 거리마다 해당 좌표를 구한다.
    baseCanvas.addEventListener('mouseup', (evt) => {
        isMouseDown = false;
    });
}());