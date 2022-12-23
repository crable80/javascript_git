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
//#네임스페이스
// 위험하다
var MYAPP = {};

//개선안
if(typeof MYAPP === 'undefined'){
    MYAPP = {};
}

// 또는 더 짧게 작성가능
var MYAPP = MYAPP || {};