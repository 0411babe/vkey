
var arr_M0 = new Array("박하준", "박서준")
var arr_M1 = new Array("박하준")
var arr_M2 = new Array("이서우")
var arr_T0 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_T1 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_T2 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_W0 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_W1 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_W2 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_Th0 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_Th1 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_Th2 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_F0 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_F1 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_F2 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_S0 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_S1 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")
var arr_S2 = new Array("박서준", "박하준", "이이이", "김서하", "이서우")


var isTimer = 10;

	$(document).ready(function(){      //준비단계. 키패드 누르기
		$(".jDefaultText").hide();    
		$(".jStudentName").hide();
		$('.jAttHelp').click(function(){	//출석처리 안되는 경우
			var strHelpMsg = "원생의 출석처리가 안되는 경우";
			strHelpMsg += "\nPC의 [학사관리>원생자료]에서\n[RF 카드번호]를 확인하세요.";
			alert(strHelpMsg);		});

		$('.jKeyNum').click(function(){		//번호누르면 입력되도록
			var clickKeyNum = $(this).attr("keynum");

			var keyNum1 = $("#keynum1").text();
			var keyNum2 = $("#keynum2").text();
			var keyNum3 = $("#keynum3").text();
			var keyNum4 = $("#keynum4").text();

				   if (keyNum1 == "") {			$("#keynum1").text(clickKeyNum);
			} else if (keyNum2 == "") {			$("#keynum2").text(clickKeyNum);
			} else if (keyNum3 == "") {			$("#keynum3").text(clickKeyNum);
			} else if (keyNum4 == "") {			$("#keynum4").text(clickKeyNum);
			}

		//원생체크
			var keyNum = keyNum1+keyNum2+keyNum3+keyNum4;
			
			if (keyNum.length == 3)	{
			    keyNum = keyNum1+keyNum2+keyNum3+keyNum4+clickKeyNum;
			}

			if (keyNum.length == 4) {
				CheckStudent(keyNum);		//ajax로 출석번호가 학원에 있는지 호출한다		
			}
		});

		$('.jKeyDelOne').click(function(){
			var keyNum1 = $("#keynum1").text();
			var keyNum2 = $("#keynum2").text();
			var keyNum3 = $("#keynum3").text();
			var keyNum4 = $("#keynum4").text();

				   if (keyNum4 != "") {		$("#keynum4").text("");
			} else if (keyNum3 != "") {		$("#keynum3").text("");
			} else if (keyNum2 != "") {		$("#keynum2").text("");
			} else if (keyNum1 != "") {		$("#keynum1").text("");
			}

			$(".jDefaultText").show();
			$(".jStudentName").text('');
			$(".jStudentName").hide();
			$("#studentnum").val('');
			$("#studentname").val('');
			$("#keypadnum").val('');


			$(".jStudentName").text("");
			$(".jStudentName").show();
			$(".jDefaultText").text("출결번호를 누르세요");
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

		$('.jComeIn').click(function(){		//등원시 처리
			StudentAtt(1);
		});

		$('.jComeOut').click(function(){	//하원시 처리
			StudentAtt(2);
		});
	});
    
function StudentAtt(atype)		//StudentAtt(1) 등원   StudentAtt(2) 하원
	{
		var sid = $("#sid").val();
		var studentnum = $("#studentnum").val();
		var studentname = $("#studentname").val();
		var keypadnum = $("#keypadnum").val();
		var strSfCode = $("strSfCode").val();
		var strRfKind = $("#strRfKind").val();

		if (strSfCode == "" || strRfKind == "")		//출결키패드 사용학원여부 체크
		{
			alert("로그인 후에 사용 하세요.");
			return false;
		}

		var keyNum1 = $("#keynum1").text();
		var keyNum2 = $("#keynum2").text();
		var keyNum3 = $("#keynum3").text();
		var keyNum4 = $("#keynum4").text();

		var keyNum = "";
		keyNum = keyNum1+keyNum2+keyNum3+keyNum4;
		if (keyNum.length != 4)			//번호 4자리가 아닐때
		{
			alert("출결번호 4자리를 정확히 선택하세요.");
			return false;

//번호 4자리 맞으면
		} else {	
			
			$("#strRfCardNum").val(keyNum);
			//DB에 출결처리
			var strParam="strBrCode=JE41";					//학원코드
			strParam=strParam + "&strRfKind=E";			//출결기기종류(C:카드, F:지문, K:키패드 V:가상키패드)
			strParam=strParam + "&strRfCardNum="+keyNum;				//키패드에서 입력한 번호
			strParam=strParam + "&strInDTime=";							//카드읽힌시간:입력하지 않음
			strParam=strParam + "&strUserType=0";		//사용범위(0:원생+직원, 1:원생, 2:직원)
			strParam=strParam + "&strTimeType=A";	//반시간표타입"
			strParam=strParam + "&strLecCountType=3";//회차적용타입
			strParam=strParam + "&strLecCountAutoYN=Y";//회차차감의 출석연동여부(Y/N)
			strParam=strParam + "&smsallowyn=Y";		//SMS사용료 미납으로 인하여 SMS를 사용할 수 있는지 여부
			strParam=strParam + "&strAcamTel=01098406638";	//학원번호(전송자번호)
			strParam=strParam + "&strAcamName=";						//학원명
				
			console.log(strParam);
//등원생 확인 팝업창 열기
 
//출석-귀가 버튼 눌렀을 때 동작

		}
	}


//출결번호체크
function CheckStudent(keypadnum){

$(".jStudentName").text("");
$("#studentnum").val("");
$("#studentname").val("");
$("#keypadnum").val("");

var strURL="http://www2.hakwonsarang.co.kr/mmsc/h2cspage/virtualkeypad/getStNameByRfCardNo.asp?strbrcode=JE41&strRfKind=E&strRfCardNum="+keypadnum;

//DB에서 출결번호 존재여부 체크
$.ajax({
		headers: { 'Access-Control-Allow-Origin': '*' },
		header :'Allow-Control-Allow-Origin: *',
		header : "http://www2n.hakwonsarang.co.kr",
		crossOrigin: true,
		url  : strURL,	// - 학원사랑에 처리 페이지
		type :"post",
		async: false,		//순서가 중요할 때는 동기식으로 바꿔준다.
		dataType:"html",
			   
		error:function(){												
			alert("오류가 발생하였습니다. ajax 하긴하고 에러왔냐");
		},
	
		success:function(pstrVal) {     //접속 성공하면, 받은 데이터 'S|원생코드|원생명'를 |으로 나눠서 
                   alert("접속성공!!ㅁ");
		}
	});
}
