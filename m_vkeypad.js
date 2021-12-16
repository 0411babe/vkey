var isTimer = 0;

var mobileKeyWords = new Array('iPhone', 'iPad', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
for (var word in mobileKeyWords) {
	if (navigator.userAgent.match(mobileKeyWords[word]) != null) {
		//location.href = "http://www2n.hakwonsarang.co.kr/mmsc/h2cspage/virtualkeypad/m_vkeypad.asp?acamcode=JE41";
		break;
	}
};

var G = new Array('조운겸', '김태율', '서강호', '송주안', '김나연', '이예준한라', '홍윤제', '오지아', '김시은', '강다현', '문현지', '이지우', '박정우', '현가민', '이준상', '김연재', '서강민', '좌승혁', '우연수', '함윤지', '우희수', '이주아', '조세종');
var B = new Array('김다율', '김다정', '박소율', '고규림', '김다희', '이준빈', '방지우', '전성우', '고윤재', '김사랑', '송서현', '윤건웅', '김유민', '이영서　', '좌민호', '김지온', '이승준', '황재윤　', '채율찬', '성주현');
var O = new Array('고수운', '김하율', '김여준', '김성민', '오지훈', '김시현', '김시환', '양혜진', '김가현', '권다정', '김혜민', '이예주', '박소영', '손건우', '노태은', '함승지', '김민준');
var W = new Array('김도우', '송지윤', '고시연', '이윤서', '손세아');



$(document).ready(function(){
	
		$(".jDefaultText").show();
		$(".jStudentName").hide();
		$('.jAttHelp').click(function(){});
		$('.jKeyNum').click(function(){
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

		$('.jKeyDelOne').click(function(){
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

	
		$('.jKeyDelAll').click(function(){

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

		$('.jComeIn').click(function(){		StudentAtt(1);		});

		$('.jComeOut').click(function(){	StudentAtt(2);		});
	});
//여기까지 준비단계 함수//

	function StudentAtt(atype)
	{
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
//여기 아작스
//등원 귀가처리 눌렀을 때 
	$.ajax({
            type: "GET",
            url: "http://www2.hakwonsarang.co.kr/mmsc/h2cspage/rfpage/rf_page1.asp?",
            data: strParam,
            dataType: "JSONP",      //
	    	headers: { 'Access-Control-Allow-Origin': '*' },
            crossDomain: true,
	    	success:function(pstrResult){
                $("#proc_result").html(pstrResult);

                if (pstrResult.length > 1) {
                    playAudio(1);
                    var arrResult=$("#proc_result").text().split("returnval_");		//등원생 정보를 arrResult배열에 넣기
                    if (arrResult.length > 1) {
                        if (arrResult[1] == "0:1") { //출석처리 성공
//returnval_0:1<br>		'출결처리성공여부	//returnval_1:0110017<br>	'원생/직원코드
//returnval_2:박서준<br> '원생/직원명		//returnval_3:<br>		'원생/직원사진
//returnval_4:20211214225342<br> '출결일시 [0:7]->연월일 [8:13]->시분초	//returnval_5:<br>'미납여부
//returnval_6:영어C_12달(-432천원장기할인)(잔여회차:104)(종료예정일:11/30),*영어E_3개월_M4-1 12,영어A_추가3회_사본(잔여회차:-1)(종료예정일:11/30)<br>	'수강반리스트
//returnval_7:0<br>	'원생의 현재 포인트
//returnval_8:하원하였습니다<br>
                            if (11 > 2 ) {
                                doingtimer(arrResult[3].substr(2, 20)+" "+$("#attdproctext").val())
                            } else {
				//$(".jStudentName").text(arrResult[3].substr(2, 20));	//처리전에 이미 이름을 보여줌
                                $(".jStudentName").text(arrResult[3].substr(2, 20)+" "+$("#attdproctext").val());
                                $(".jStudentName").show();

                                //출석처리후 번호 Clear
                                $("#keynum4").text("");
                                $("#keynum3").text("");
                                $("#keynum2").text("");
                                $("#keynum1").text("");

                                $("#attdproctext").val("");
                            }
                        } else { //if (arrResult[1] == "0:-1") { //출석처리 성공
                            //response.write "returnval_0:-1<br>"
                            //response.write "returnval_E:에러메시지<br>"
                            //alert(arrResult[2].substr(2, 100));
                            if (1 == 1) {
                                doingtimer(arrResult[2].substr(2, 100))
                            } else {
                                $(".jDefaultText").text(arrResult[2].substr(2, 100));
                                $(".jDefaultText").show();
                                $(".jStudentName").text("");
                                $(".jStudentName").show();
                            }
                        }
                    }
                }
            },

        error:function(pstrResult){	 //2017-11-08:arrowroot	//alert(pstrResult)
                if ( $(".jStudentName").text().indexOf("선생님" ,0) != -1 ) {	alert("선생님의 출근시간 입력상태를\n확인하십시요.");
                } else {
                    alert(pstrResult)
                }
            },

		complete: function (pstrResult) {        	alert("complete="+pstrResult)        }
        });
	}
};


//자바스크립트 요일구하기|작성자 하이	//new Date().getDay()  일=0, 월=1, 화=2, 수=3, 목=4, 금=5, 토=6
//function getTodayLabel() {
//    var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
//    var today = new Date().getDay();	// switch today=1 월요일값 가져와서 색바꿔주기
//    var todayLabel = week[today];
//	console.log(today);
//    return todayLabel;
//}
//console.log(getTodayLabel());
//자바스크립트 요일구하기|작성자 하이




   function playAudio()
	{
		// Check for audio element support.
		if (window.HTMLAudioElement) {
			try {
				var oAudio = document.getElementById("myaudio");

				// Tests the paused attribute and set state.
				if (oAudio.paused) {
					oAudio.play();
				}
				else {
					oAudio.pause();
				}
			}
			catch (e) {
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

// 	$.ajax({
// 	    	strURL: "http://www2.hakwonsarang.co.kr/mmsc/h2cspage/virtualkeypad/getStNameByRfCardNo.asp?strbrcode=JE41&strRfKind=E&strRfCardNum="+keypadnum,	// - 학원사랑에 처리 페이지
//            	type : "GET",
//             	async: false,		//순서가 중요할 때는 동기식으로 바꿔준다.
//       	    	dataType:"JSONP",
// 		//dataType:"text",
// 		crossDomain: true,
// 		contentType: 'application/text; charset=utf-8',
// 	    	headers: { 'Access-Control-Allow-Origin': '*' },
	$.ajax({
		url  : strURL,	// - 학원사랑에 처리 페이지
		type :"post",
		async: false,		//순서가 중요할 때는 동기식으로 바꿔준다.
		dataType:"text",
		crossOrigin: true,
		headers: { 'Access-Control-Allow-Origin': '*' },
		
		success : function(xhr, pstrVal) {
			
			var jStr = pstrVal.text;
			alert( jStr);
			 console.log(jStr);
			
			
			alert("success");
		    if(xhr.status == 200)	    	 {	alert("200이자나");	};
			
			
			
		if(xhr.status != 200)	    	 {	alert("석세스고 200아닌데");	};
			
	    
		    console.log(xhr.responseText);
		    
		    $("div").text("되는데");	
		    
		    if (pstrVal.length > 0) {
			    var arrVal=pstrVal.split("|"); ///'''S|원생코드|원생명|등원

			    if (arrVal.length >= 4) {	//arrVal.length가 4이상이라는 것은 S|원생코드|원생명|등원 익
				    $("#studentnum").val(arrVal[1]);
				    $("#studentname").val(arrVal[2]);
				    if (arrVal[0] == "T") {
					    $(".jStudentName").text(arrVal[2]+" 선생님");
					    $("#attdproctext").val("선생님이 "+arrVal[3] + " 하였습니다."); //홍길동 선생님이 출근 하였습니다.
				    } else {
					    $(".jStudentName").text(arrVal[2]+" 학생");
					    $("#attdproctext").val("학생이 "+arrVal[3] + " 하였습니다."); //홍길동 학생이 등원 하였습니다.
				    }
			   	    $("#keypadnum").val(keypadnum);
			    }

		    $(".jDefaultText").hide();
		    $(".jStudentName").show();
			    
	//출석 성공시 arrVal[2] == 리스트에 있는 값으로 백그라운드 바꾸기
		    if (G.indexOf(arrVal[2])>= 0)	{$('.key_box').css("background-Color", 'Green')}; //이거 내가 쓴거
		    if (B.indexOf(arrVal[2])>= 0)	{$('.key_box').css("background-Color", 'Blue')}; //이거 내가 쓴거};		
		    if (O.indexOf(arrVal[2])>= 0)	{$('.key_box').css("background-Color", 'Orange')}; //이거 내가 쓴거};
		    if (W.indexOf(arrVal[2])>= 0)	{$('.key_box').css("background-Color", 'White')}; //이거 내가 쓴거};

		    } else {
                    $(".jStudentName").text("존재하지 않은 출결번호");
                    $(".jDefaultText").hide();
                    $(".jStudentName").show();
                	}
           },
		error:function(xhr, data){	
			var jStr = data.text;
			alert("jStr"+jStr);
			 console.log("jStr"+jStr);
			
		
			alert(xhr.responseText);
			
			var jsonStr = JSON.stringify(xhr.responseText);
			alert(jsonStr);
			
			
			if(xhr.status != 200)	{	alert(data);	};
			console.log(data);		
			alert("이름만띄우는함수 오류");	
                	}
    });
	
//DB에서 출결번호 존재여부 체크
}
