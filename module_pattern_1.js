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

let obj02 = new myObj(); //새로운 객체를 만들때마다 비공개 멤버가 매번 재생성된다는 단점이있음.

//중복을 없애고 메모리 절약하려면 공통 프로퍼티와 메서드를 생성자의 prototype 프로퍼티에 추가해야 합니다.
//이렇게하면 동일한 생성자로 생성한 모든 인스턴스가 공통된 부분을 공유하게 된다!
//감춰진 비공개 멤버들도 모든 인스턴스가 함께 쓸수있다.
//이를 위해선 두가지 패턴, 생성자 함수 내부에 비공개 멤버를 만드는 패턴과 객체 리터럴로 비공개 멤버를 만드는 패턴을 
//함께 써야한다. 왜냐하면 prototype 프로퍼티도 결국 객체라서 객체 리터럴로 생성할 수 있기 때문이다.
function Gadget02(){
    //비공개 멤버
    let name = 'iPod'; 
    //공개함수
    this.getName = ()=>{
        return name;
    }
}

Gadget02.prototype = (function(){
    //비공개 멤버
    let browser = 'Mobile Webkit';
    //공개된 프로토타입 멤버
    return{
        getBrowser : ()=>{
            return browser;
        }
    }
})();

let toy02 = new Gadget02();
console.log(toy02.getName()); //객체 인스턴스 특권 메서드
console.log(toy02.getBrowser()); //프로토타입의 특권 메서드


//노출 패턴(revelation pattern)은 비공개 메서드를 구현하면서 동시에 공개 메서드로도 노출하는 것을 말합니다.
//객체의 모든 기능이 객체가 수행하는 작업에 필수불가결한 것들이라서 최대한 보호가 필요한데, 동시에 이 기능들을
//유용성 때문에 공개적인 접근도 허용하고 싶은 경우가 있을수있다.
let arr;
(function(){
    let astr = '[object Array]';
    let toString = Object.prototype.toString;

    function isArray(a){
        return toString.call(a) === astr;
    }

    function indexOf(haystack, needle){
        let i = 0,
            max = haystack.length;
        
        for(; i < max; i += 1){
            if(haystack[i] === needle){
                return i;
            }
        }
        return -1;
    }

    arr = {
        isArray : isArray,
        indexOf : indexOf,
        inArray : indexOf
    }
})();

console.log('arr.isArray([1, 2]): ', arr.isArray([1, 2]));
console.log('arr.isArray({0: 1}): ', arr.isArray({0: 1}));
console.log("arr.indexOf(['a', 'b', 's'], 's'): ", arr.indexOf(['a', 'b', 's'], 's'));
console.log("arr.inArray(['a', 'b', 's'], 's'): ", arr.inArray(['a', 'b', 's'], 's'));

//namespace 생성
var MYAPP = MYAPP || {};
MYAPP.namespace = function (ns_string) {
    var parts  = ns_string.split('.'),
        parent = MYAPP,
        i;

    // 처음에 중복되는 전역 객체명은 제거한다.
	if (parts[0] === 'MYAPP') {
      parts = parts.slice(1);
	}

	for (i = 0; i < parts.length; i += 1) {
		if (typeof parent[parts[i]] === 'undefined') {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	
	return parent;

};

//생성자를 생성하는 모듈
MYAPP.namespace('MYAPP.utilities.Array');

MYAPP.utilities.Array = (function(){
	// 의존 관계 선언
	var uobj  = MYAPP.utilities.object,
	    ulang = MYAPP.utilities.lang,
	    // 비공개 프로퍼티와 메서드를 선언한 후 ...
	    Constr;
	// var 선언을 마친다.
	
	// 필요하다면 일회성 초기화 절차를 실행한다.
	// ...
	
	// 공개 API - 생성자 함수
	Constr = function (o) {
		this.elements = this.toArray(o);
	};
	
	// 공개 API - 프로토타입
	Constr.prototype = {
		consturctor : MYAPP.utilities.Array,
		version : '2.0',
		toArray : function (obj) {
            let arry = [];
			for (key in obj) {
				arry.push(obj[key]);
			}
			return arry;
		}
	};
	
	// 생성자 함수를 반환한다.
	// 이 함수가 새로운 네임스페이스에 할당될 것이다.
	return Constr;
	
}());

// 위 생성자 함수는 다음과 같이 사용할 수 있다.
var arr001 = new MYAPP.utilities.Array({k1:'v1', k2:'v2', k3:'v3'});
console.log(arr001.version);

//샌드박스 패턴

