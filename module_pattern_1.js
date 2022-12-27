/* 모듈패턴 #1 ---------------------------------------------------------------------*/
//클로저 (내부변수, 내부함수) - 인스턴스 여러개 생성가능
var module = (function () {
    /*------------------------------
    * 모듈 패턴을 구현한  클로저 코드
    *-------------------------------*/
    
    //은닉될 멤버 정의
    var privateKey = 0;
    function privateMethod(){
        return ++privateKey;
    }

    //공개될 멤버 정의
    return {
        publicKey : privateKey,
        publicMethod : function(){
            return privateMethod();
        }
    }
//})(); //즉시실행
});

//console.log(module.publicMethod()); // 즉시실행 함수일때 (인스턴스 하나)

//다중 인스턴스 예제
//객체1
var obj1 = module();
console.log('obj1.publicMethod(): ', obj1.publicMethod());
console.log('obj1.publicMethod(): ', obj1.publicMethod());
//객체2
var obj2 = module();
console.log('obj2.publicMethod(): ', obj2.publicMethod());
console.log('obj2.publicMethod(): ', obj2.publicMethod());



/* 모듈패턴 #2 ---------------------------------------------------------------------*/
//(1)네임스페이스 
//-위험하다 중복가능성...
var MYAPP = {};

//개선안 (체크필요)
if(typeof MYAPP === 'undefined'){
    MYAPP = {};
}

// 또는 더 짧게 작성가능
var MYAPP = MYAPP || {};

//(2)비공개 멤버의 헛점 (외부 코드에서 비공개 변수값 수정 가능) 
function Gadget(){
    //비공개 멤버
    var specs = {
        screen_width : 320,
        screen_height: 480,
        color : "width"
    };

    //공개함수
    this.getSpecs = function(){
        return specs;
    };
}

var toy = new Gadget();
specs = toy.getSpecs();
specs.color = "black"; //값변경
specs.price = "free"; //값추가
console.log('toy.getSpecs(): ', toy.getSpecs()); //원본값이 변경되다니! 젠장! 


//(3)모듈화(캡슐화)
// 전역 스코프(gloval scope)
// 변수(멤버변수)
//var sayHi = "안녕";

// //함수 영역
// var moduleFunc = function(){
//     //함수 스코프(새로운 영역이 생성됨)
// }

//위의 멤버변수와 함수영역을 하나의 코드블럭을 생성한다
//즉, 위의 코드는 전역에 정의되어 있지만 멤버변수와 함수영역을 전역 스코프와 상관없이
//하나의 새로운 범위를 생성, 관리하기위해 모듈화 시킨다

//새로운 모듈화(캡슐화)
//자가 실행 함수
(function(){
    let sayHi = "안녕";

    let moduleFunc = ()=>{
        return sayHi;
    }

    console.log(moduleFunc()); //같은 스코프안에서 함수 호출함
}())// 즉시 실행 함수

//외부에서 호출
//console.log(sayHi); //Uncaught ReferenceError ReferenceError: sayHi is not defined
//console.log(moduleFunc()); //Uncaught ReferenceError ReferenceError: moduleFunc is not defined

//모듈패턴(싱글톤)
// let singleton = {
//     name : value,
//     method : function(){
//         //메소드 코드
//     }
// }

//객체 리터럴과 비공개 멤버
let myObj = function(){
    //고유멤버
    let sayHi = "안녕하세요!!";
    let intCnt = 0;
    
    let hi = ()=>{
        intCnt += 1;
        return sayHi;
    }

    let cnt = ()=>{
        return intCnt;
    }

    return {
        getHi : ()=>{
            return sayHi;
        },
        getHi2 : ()=>{
            return "반갑습니다!";
        },
        getHi3 : hi,
        getHi4 : intCnt, //*intCnt를 직접 외부에 반환시켜주면 증가된 값이 출력되지 않는다.
        getHi5 : cnt
    }
};


