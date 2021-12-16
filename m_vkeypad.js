var isTimer = 0;

var mobileKeyWords = new Array('iPhone', 'iPad', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
for (var word in mobileKeyWords) {
	if (navigator.userAgent.match(mobileKeyWords[word]) != null) {
		//location.href = "http://www2n.hakwonsarang.co.kr/mmsc/h2cspage/virtualkeypad/m_vkeypad.asp?acamcode=JE41";
		break;
	}
}

var G = new Array('조운겸', '김태율', '서강호', '송주안', '김나연', '이예준한라', '홍윤제', '오지아', '김시은', '강다현', '문현지', '이지우', '박정우', '현가민', '이준상', '김연재', '서강민', '좌승혁', '우연수', '함윤지', '우희수', '이주아', '조세종');
var B = new Array('김다율', '김다정', '박소율', '고규림', '김다희', '이준빈', '방지우', '전성우', '고윤재', '김사랑', '송서현', '윤건웅', '김유민', '이영서　', '좌민호', '김지온', '이승준', '황재윤　', '채율찬', '성주현');
var O = new Array('고수운', '김하율', '김여준', '김성민', '오지훈', '김시현', '김시환', '양혜진', '김가현', '권다정', '김혜민', '이예주', '박소영', '손건우', '노태은', '함승지', '김민준');
var W = new Array('김도우', '송지윤', '고시연', '이윤서', '손세아');


$(document).ready(function(){
	
		$(".jDefaultText").show();
		$(".jStudentName").hide();
		//$('.jAttHelp').click(function(){});

		$('.jKeyNum').click(function(){		//키패드 숫자 눌렀을 때 동작
			var clickKeyNum = $(this).attr("keynum");
			var keyNum1 = $("#keynum1").text();
			var keyNum2 = $("#keynum2").text();
			var keyNum3 = $("#keynum3").text();
			var keyNum4 = $("#keynum4").text();

			if (keyNum1 == "") {		$("#keynum1").text(clickKeyNum);
			} else if (keyNum2 == "") {	$("#keynum2").text(clickKeyNum);
			} else if (keyNum3 == "") {	$("#keynum3").text(clickKeyNum);
			} else if (keyNum4 == "") {	$("#keynum4").text(clickKeyNum);
			}

			//원생체크
			var keyNum = keyNum1+keyNum2+keyNum3+keyNum4;
			if (keyNum.length == 3) {
				keyNum = keyNum1+keyNum2+keyNum3+keyNum4+clickKeyNum;
				CheckStudent(keyNum);
			} else {
    				if (keyNum.length < 4) {	$(".jStudentName").text("");	}
				$("#attdproctext").val("");
			}
		});

		$('.jKeyDelOne').click(function(){	// 키패드 ←버튼 눌렀을 때 동작
			var keyNum1 = $("#keynum1").text();
			var keyNum2 = $("#keynum2").text();
			var keyNum3 = $("#keynum3").text();
			var keyNum4 = $("#keynum4").text();

			if (keyNum4 != "")    {	$("#keynum4").text("");
			} else if (keyNum3 != "") {	$("#keynum3").text("");
			} else if (keyNum2 != "") {	$("#keynum2").text("");
			} else if (keyNum1 != "") {	$("#keynum1").text("");		
			}

			$(".jDefaultText").show();
			$(".jStudentName").text('');
			$(".jStudentName").hide();
			$("#studentnum").val('');
			$("#studentname").val('');
			$("#keypadnum").val('');

			$(".jStudentName").text("");
			$(".jStudentName").show();
			$(".jDefaultText").text("출결번호를 선택하세요");
			$(".jDefaultText").show();
		});

	
		$('.jKeyDelAll').click(function(){	// 키패드 X 버튼 눌렀을 때 동작
			$("#keynum1").text("");
			$("#keynum2").text("");
			$("#keynum3").text("");
			$("#keynum4").text("");

			$(".jDefaultText").show();
			$(".jStudentName").text('');
			$(".jStudentName").hide();
			$("#studentnum").val('');
			$("#studentname").val('');
			$("#keypadnum").val('');

			$(".jStudentName").text("");
			$(".jStudentName").show();
			$(".jDefaultText").text("출결번호를 선택하세요");
			$(".jDefaultText").show();

			$("div").text(title);
		});

		$('.jComeIn').click(function(){		StudentAtt(1);		});	// 등원버튼 눌렀

		$('.jComeOut').click(function(){	StudentAtt(2);		});	// 귀가버튼 눌렀
});	//여기까지 준비단계 함수//


function StudentAtt(atype){		//등원버튼 눌렀을 때 처리함수
	var sid = $("#sid").val();
	var studentnum = $("#studentnum").val();
	var studentname = $("#studentname").val();
	var keypadnum = $("#keypadnum").val();
	var strSfCode = $("strSfCode").val();
	var strRfKind = $("#strRfKind").val();

	var keyNum1 = $("#keynum1").text();
	var keyNum2 = $("#keynum2").text();
	var keyNum3 = $("#keynum3").text();
	var keyNum4 = $("#keynum4").text();

	var keyNum = "";
	keyNum = keyNum1+keyNum2+keyNum3+keyNum4;
	if (keyNum.length != 4)	{
		alert("출결번호 4자리를 정확히 선택하세요.");
		return false;
	} else {
		$("#strRfCardNum").val(keyNum);			//DB에 출결처리
		var strParam="strBrCode=JE41";			//학원코드
		strParam=strParam + "&strRfKind=E";		//출결기기종류(C:카드, F:지문, K:키패드 V:가상키패드)
		strParam=strParam + "&strRfCardNum="+keyNum;				//키패드에서 입력한 번호
		strParam=strParam + "&strInDTime=";		//카드읽힌시간:입력하지 않음
		strParam=strParam + "&strUserType=0";	//사용범위(0:원생+직원, 1:원생, 2:직원)
		strParam=strParam + "&strTimeType=A";	//반시간표타입"
		strParam=strParam + "&strLecCountType=3";//회차적용타입
		strParam=strParam + "&strLecCountAutoYN=Y";//회차차감의 출석연동여부(Y/N)
		strParam=strParam + "&smsallowyn=Y";		//SMS 미납으로 SMS 사용할 수 있는지 여부
		strParam=strParam + "&strAcamTel=01098406638";	//학원번호(전송자번호)
		strParam=strParam + "&strAcamName=";						//학원명
//여기 아작스 //등원 귀가처리 눌렀을 때

		
//AJAX 끝
	}	//키번호 네자리가 맞을 때
}	//출석처리 버튼 기능 끝

function playAudio(){	// Check for audio element support.

	if (window.HTMLAudioElement) {
		try {
			var oAudio = document.getElementById("myaudio");
			// Tests the paused attribute and set state.
			if (oAudio.paused) {	oAudio.play();	}
			else {			oAudio.pause();	}
		} catch (e) {
			// Fail silently but show in F12 developer tools console
			 if(window.console && console.error("Error:" + e));
		}
	}
}



//출결번호체크
function CheckStudent(keypadnum){
	$(".jStudentName").text("");
	$("#studentnum").val("");
	$("#studentname").val("");
	$("#keypadnum").val("");

var strURL="http://www2.hakwonsarang.co.kr/mmsc/h2cspage/virtualkeypad/getStNameByRfCardNo.asp?strbrcode=JE41&strRfKind=E&strRfCardNum="+keypadnum;
//여기부터 아작스  //DB에서 출결번호 존재여부 체크


// AJAX 끝
}	//CHECKnUM함수 끝
