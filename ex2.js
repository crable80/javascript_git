(function () {
	window.hanssem = window.hanssem || {},
		function (hanssem) {
			hanssem.address = {};
			hanssem.address.version = "201020";
			hanssem.address.load = function (a) {
				a && "function" === typeof a && a()
			}
		}(window.hanssem);

	var util = {};

	util.extend = function () {
		if (0 === arguments.length) {
			return null;
		}
		var a = Array.prototype.slice.call(arguments)
			, b = a.shift()
			, c = a.slice(0);
		if (c.length >= 1) {
			for (var d = 0, e = c.length; e > d; d++) {
				var f = c[d];
				for (var g in f) {
					f.hasOwnProperty(g) && (b[g] = f[g]);
				}
			}
		}
		return b;
	}

	

	var v1 = v1 || {};
	!function (v1, window, document, location) {
		v1.CONF = {
			MIN_WIDTH: 1024,
			MIN_HEIGHT: 768,
			DEFAULT_WIDTH: 1920,
			DEFAULT_HEIGHT: 1080,
			PROTOCOL: location.protocol,
			INPUTSYS: "",
			SIDEVIEW: "Y",
			HOUSEDNGCD: "",
			HOUSEHOCD: "",
			BLDGMGMTNO: "",
			SERVERMODE: "PROD",
			SERVICEGUBUN: "addr",
			POPUP: "window",
			SEARCHDATA: {
				sido: "",
				sigungu: "",
				dng: ""
			}
		};
		v1.URL = "";
	}(v1, window, document, location)

	var v1 = v1 || {};
	!function (v1, util, window) {
		v1.frame = function () {
			function stringByOption(a, b, c) {
				var d = "";
				for (var e in a) {
					a.hasOwnProperty(e) && (d += e + b + a[e], d += c);
				}

				return d = d.slice(0, d.length - 1)
			}

			function popupOpen(param) {
				// 주소검색 서비스로 전달할 값 세팅
				hanssem.address.inputSys = (v1.CONF.inputSys === null || v1.CONF.inputSys === "") ? v1.CONF.INPUTSYS : v1.CONF.inputSys;
				hanssem.address.sideView = (v1.CONF.sideView === null || v1.CONF.sideView === "") ? v1.CONF.SIDEVIEW : v1.CONF.sideView;
				hanssem.address.houseDngCd = (v1.CONF.houseDngCd === null || v1.CONF.houseDngCd === "") ? v1.CONF.HOUSEDNGCD : v1.CONF.houseDngCd;
				hanssem.address.houseHoCd = (v1.CONF.houseHoCd === null || v1.CONF.houseHoCd === "") ? v1.CONF.HOUSEHOCD : v1.CONF.houseHoCd;
				hanssem.address.bldgMgmtNo = (v1.CONF.bldgMgmtNo === null || v1.CONF.bldgMgmtNo === "") ? v1.CONF.BLDGMGMTNO : v1.CONF.bldgMgmtNo;
				hanssem.address.serviceUrl = v1.CONF.serviceUrl;
				hanssem.address.naverApiKey = param.clientId;
				hanssem.address.serviceGubun = (v1.CONF.serviceGubun === null || v1.CONF.serviceGubun === "") ? v1.CONF.SERVICEGUBUN : v1.CONF.serviceGubun;
				hanssem.address.searchData = (v1.CONF.searchData === null || v1.CONF.searchData === "") ? v1.CONF.SEARCHDATA : v1.CONF.searchData;

				if (v1.CONF.popup === "layer") {
					var layerOption = {
						width: (v1.CONF.width > v1.CONF.DEFAULT_WIDTH) ? v1.CONF.DEFAULT_WIDTH : (v1.CONF.width < v1.CONF.MIN_WIDTH) ? v1.CONF.MIN_WIDTH : v1.CONF.width,
						height: (v1.CONF.height > v1.CONF.DEFAULT_HEIGHT) ? v1.CONF.DEFAULT_HEIGHT : (v1.CONF.height < v1.CONF.MIN_HEIGHT) ? v1.CONF.MIN_HEIGHT : v1.CONF.height,
					}
					layerOption.top = (((window.innerHeight - layerOption.height) / 2) + window.scrollY);
					layerOption.left = (((window.innerWidth - layerOption.width) / 2) + window.scrollX);

					var layerBoxHeight = (window.innerHeight > document.querySelector("body").offsetHeight) ? window.innerHeight : document.querySelector("body").offsetHeight;
					var layerBox = document.createElement("div");
					layerBox.setAttribute("id", "hanssemMapLayer");
					layerBox.style.width = "100%";
					layerBox.style.backgroundColor = "rgba(180,180,180,0.5)";
					layerBox.style.height =  layerBoxHeight + "px";
					layerBox.style.position = "absolute";
					layerBox.style.top = 0;
					layerBox.style.left = 0;

					var layerPopup = document.createElement("div");
					layerPopup.style.position = "absolute";
					layerPopup.style.width = layerOption.width + "px";
					layerPopup.style.height = layerOption.height + "px";
					layerPopup.style.backgroundColor = "#FFF";
					layerPopup.style.left = (layerOption.left < 0) ? "0" : layerOption.left + "px";
					layerPopup.style.top = (layerOption.top < 0) ? "0" : layerOption.top + "px";
					layerPopup.style.zIndex = 9999;
					layerPopup.style.boxShadow = "0 0 11px 5px rgb(0 0 0 / 21%)";
					layerPopup.style.border = "1px solid #c5c5c5;";

					var btnClose = document.createElement("button");
					btnClose.style.position = "absolute";
					btnClose.style.right = "20px";
					btnClose.style.top = "7px";
					btnClose.style.width = "17px";
					btnClose.style.height = "17px";
					btnClose.style.background = "url("+ v1.CONF.serviceUrl +"/resources/images/aptsearch/bt_close.png) no-repeat center 50%";
					btnClose.style.backgroundSize = "35px";
					btnClose.style.textIndent = "-9999px";
					btnClose.style.fontFamily = "inherit"
					btnClose.style.border = "0";
					btnClose.style.cursor = "pointer";
					btnClose.type = "button";
					btnClose.addEventListener("click", function (e) {
						try{
							document.querySelector("#hanssemMapLayer").remove();
						}catch(e){
							document.querySelector("body").removeChild(document.querySelector("#hanssemMapLayer"));
						}
						document.querySelector("body").style.overflow = "auto";
					});
					layerPopup.appendChild(btnClose);

					var addressFrame = document.createElement("iframe");
					addressFrame.src = v1.URL;
					addressFrame.style.width = layerOption.width + "px";
					addressFrame.style.height = layerOption.height + "px";
					addressFrame.style.border = "0";
					addressFrame.style.backgroundColor = "#FFF";
					addressFrame.id = "addressMapFrame";
					layerPopup.appendChild(addressFrame);
					layerBox.appendChild(layerPopup);
					document.querySelector("body").insertBefore(layerBox, this.nextSibling);
					document.querySelector("body").style.overflow = "hidden";

					v1.CONF.addressMapLayer = layerPopup;
				} else {
					var popupOption = {
						toolbar: "no",
						scrollbars: "no",
						menubar: "no",
						titlebar: "no",
						resizeble: "no",
						location: "no",
						status: "no",
						width: (v1.CONF.width > v1.CONF.DEFAULT_WIDTH) ? v1.CONF.DEFAULT_WIDTH : (v1.CONF.width < v1.CONF.MIN_WIDTH) ? v1.CONF.MIN_WIDTH : v1.CONF.width,
						height: (v1.CONF.height > v1.CONF.DEFAULT_HEIGHT) ? v1.CONF.DEFAULT_HEIGHT : (v1.CONF.height < v1.CONF.MIN_HEIGHT) ? v1.CONF.MIN_HEIGHT : v1.CONF.height,
						top: (v1.CONF.top > 0) ? v1.CONF.top : 0,
						left: (v1.CONF.left > 0) ? v1.CONF.left : 0
					}
					var addressMapPopup = window.open("about:blank", "addressMapPopup", stringByOption(popupOption, "=", ","));

					if (null === addressMapPopup) {
						return alert("팝업을 열 수 없습니다.\n브라우저의 팝업 차단 기능이 활성화 되어 있는지 확인해주세요.");
					} else {
						addressMapPopup.focus();

						addressMapPopup.location.href = v1.URL;
						v1.CONF.addressMapPopup = addressMapPopup;
					}

					return addressMapPopup;
				}
			}

			

			function getNaverApiKey(param,callback){
				var xhr = new XMLHttpRequest();
				var url = v1.CONF.serviceUrl+"/api/getNaverApiKey.do";
				xhr.open("POST",url,false);
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.onreadystatechange = function(){
					if(xhr.readyState === 4 && xhr.status === 200){
						var json = JSON.parse(xhr.responseText);
						param.clientId = json.clientId;
						callback(param);
					}
				}
				xhr.send();
			}

			return {
				popup: {
					create: function (param) {
						getNaverApiKey(param,popupOpen);
					}
				}
			}
		};
	}(v1, util, window);

	var v1 = v1 || {};
	!function (v1, util, window) {
		function addr(conf) {
			var config = {
				width: v1.CONF.DEFAULT_WIDTH,
				height: v1.CONF.DEFAULT_HEIGHT,
				inputSys: v1.CONF.INPUTSYS,
				sideView: v1.CONF.SIDEVIEW,
				houseDngCd: v1.CONF.HOUSEDNGCD,
				houseHoCd: v1.CONF.HOUSEHOCD,
				bldgMgmtNo: v1.CONF.BLDGMGMTNO,
				serverMode: v1.CONF.SERVERMODE,
				popup: v1.CONF.POPUP,
				serviceGubun: v1.CONF.SERVICEGUBUN,
				searchData: v1.CONF.SEARCHDATA,
				onComplete: function () {
				}
			}
			util.extend(config, conf);
			util.extend(v1.CONF, config);
			if (v1.CONF.serverMode.toUpperCase() === "DEV") {
				v1.URL = "https://sisdev.hanssem.com/addrSearch/main.do";
				v1.CONF.serviceUrl = "https://sisdev.hanssem.com";
			} else if (v1.CONF.serverMode.toUpperCase() === "LOCAL") {
				v1.URL = "http://sislocal.hanssem.com:8080/addrSearch/main.do";
				v1.CONF.serviceUrl = "http://sislocal.hanssem.com:8080";
			} else {
				v1.URL = "https://map.hanssem.com/addrSearch/main.html";
				v1.CONF.serviceUrl = "https://map.hanssem.com";
			}
			this._opt_ = config;

			window.addEventListener("message", complete);
		}

		function complete(response) {
			var data = response.data;
			if (data.action === "done") {
				if (typeof v1.CONF.onComplete === "function") {
					delete data.action;
					v1.CONF.onComplete(data);
				}
				if(v1.CONF.popup === "layer"){
					try{
						document.querySelector("#hanssemMapLayer").remove();
					}catch(e){
						document.querySelector("body").removeChild(document.querySelector("#hanssemMapLayer"));
					}
					document.querySelector("body").style.overflow = "auto";
				}else{
					v1.CONF.addressMapPopup.close();
				}
			}else if(data.action === "getData"){
				var sendData = {
					"bldgMgmtNo": hanssem.address.bldgMgmtNo,
					"houseDngCd": hanssem.address.houseDngCd,
					"houseHoCd": hanssem.address.houseHoCd,
					"inputSys": hanssem.address.inputSys,
					"naverApiKey": hanssem.address.naverApiKey,
					"serviceUrl": hanssem.address.serviceUrl,
					"serviceGubun": hanssem.address.serviceGubun,
					"sideView": hanssem.address.sideView,
					"searchData": hanssem.address.searchData,
					"targetOrigin": window.location.origin,
					"action": "sendData"
				}

				if(v1.CONF.popup === "layer"){
					document.querySelector("#addressMapFrame").contentWindow.postMessage(sendData,v1.CONF.serviceUrl);
				}else{
					v1.CONF.addressMapPopup.postMessage(sendData,v1.CONF.serviceUrl);
				}
			}
		}

		addr.prototype = {
			open: function () {
				try {
					var param = {};
					v1.frame().popup.create(param);
				} catch (e) {
					console.error(e);
					var msg = "";
					msg = [
						'한샘 주소검색 서비스 호출 시 오류가 발생 했습니다. 관리자에게 문의해 주시기 바랍니다.',
						'Error Code : ' + e.code,
						'Error Massage : ' + e.name
					].join("\n");
					alert(msg);
					return false;
				}
			}
		};

		window.hanssem.Address = addr;

	}(v1, util, window);
})();






