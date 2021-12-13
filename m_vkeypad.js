var isTimer = 0;

var mobileKeyWords = new Array('iPhone', 'iPad', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
for (var word in mobileKeyWords) {
	if (navigator.userAgent.match(mobileKeyWords[word]) != null) {
		location.href = "http://www2n.hakwonsarang.co.kr/mmsc/h2cspage/virtualkeypad/m_vkeypad.asp?acamcode=JE41";
		break;
	}
};

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

			if (keyNum1 == "") {
				$("#keynum1").text(clickKeyNum);
			} else if (keyNum2 == "") {
				$("#keynum2").text(clickKeyNum);
			} else if (keyNum3 == "") {
				$("#keynum3").text(clickKeyNum);
			} else if (keyNum4 == "")	{
				$("#keynum4").text(clickKeyNum);
			}

			//원생체크
			var keyNum = keyNum1+keyNum2+keyNum3+keyNum4;
			if (keyNum.length == 3) {
				keyNum = keyNum1+keyNum2+keyNum3+keyNum4+clickKeyNum;
				CheckStudent(keyNum);
			} else {
				if (keyNum.length < 4) {
					$(".jStudentName").text("");
				}
				$("#attdproctext").val("");
			}
		});

		$('.jKeyDelOne').click(function(){
			var keyNum1 = $("#keynum1").text();
			var keyNum2 = $("#keynum2").text();
			var keyNum3 = $("#keynum3").text();
			var keyNum4 = $("#keynum4").text();

			if (keyNum4 != "") {
				$("#keynum4").text("");
			} else if (keyNum3 != "") {
				$("#keynum3").text("");
			} else if (keyNum2 != "") {
				$("#keynum2").text("");
			} else if (keyNum1 != "")	{
				$("#keynum1").text("");
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

		$('.jComeIn').click(function(){
			StudentAtt(1);
		});

		$('.jComeOut').click(function(){
			StudentAtt(2);
		});
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

		//출결키패드 사용학원여부 체크
		if (strSfCode == "" || strRfKind == ""){
			alert("로그인 후에 사용 하세요.");
			return false;
		}

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
//여기 아작스
		}
	};
	//출결번호체크

function CheckStudent(keypadnum){
alert("CheckStudent호출");
	alert(keypadnum);
	$(".jStudentName").text("");
	$("#studentnum").val("");
	$("#studentname").val("");
	$("#keypadnum").val("");
	        
        var strURL="http://www2.hakwonsarang.co.kr/mmsc/h2cspage/virtualkeypad/getStNameByRfCardNo.asp?strbrcode=JE41&strRfKind=E&strRfCardNum="+keypadnum;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status === 200) { 
                alert("로그인");	
                var pstrVal = xhr.responseText;
                if (pstrVal.length > 0) {
                    var arrVal=pstrVal.split("|"); ///'''S|원생코드|원생명|등원

                    if (arrVal.length >= 4) {
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

                } else {
                    $(".jStudentName").text("존재하지 않은 출결번호");
                    $(".jDefaultText").hide();
                    $(".jStudentName").show();
                }


            } else { 
                alert("오류가 발생하였습니다.");
                console.log(xhr.responseText);
            };    
        }
	alert("xhr열어");
        xhr.open('GET', strURL, true);
	xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://www2.hakwonsarang.co.kr/mmsc');
        xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
	xhr.send();	
	
                    
    //DB에서 출결번호 존재여부 체크
      
}
     

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
