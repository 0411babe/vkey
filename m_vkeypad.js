
alert("js읽어옴");

var isTimer = 0;
	var timerInterval

	$(document).ready(function(){

		$(".jDefaultText").show();
		$(".jStudentName").hide();

		$('.jAttHelp').bind('touchstart', function(event){
			var strHelpMsg = "원생의 출석처리가 안되는 경우";
			strHelpMsg += "\nPC의 [학사관리>원생자료]에서\n[RF 카드번호]를 확인하세요.";
			alert(strHelpMsg);
		});

		$('.jKeyNum').bind('touchstart', function(event){

			CheckTimer();

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

		$('.jKeyDelOne').bind('touchstart', function(event){

			CheckTimer();

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
		});

		$('.jKeyDelAll').bind('touchstart', function(event){

			CheckTimer();

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

		});

		$('.jComeIn').click(function(){
			CheckTimer();
			selfDiagnosis(1);
		});

		$('.jComeOut').click(function(){
			CheckTimer();
			selfDiagnosis(2);
		});

		//document.getElementById("myaudio").load();
		$("#myaudio")[0].load();
	});

//2020-10-08 KHAN 방역과리 자가진단 입력
	var curAttType = "";
	function selfDiagnosis(pAttType) {
		curAttType = pAttType
		var strURLPreventCheck = "./prevent.asp?cmd=checkPrevent&br_code=&mb_no="+$("#studentnum").val();
		$.ajax({
		   url:strURLPreventCheck,
		   type:'post',
		   async: false,		//순서가 중요할 때는 동기식으로 바꿔준다.
		   dataType:'json',
		   success:function(obj){
				if (obj.returnCode == 1 && obj.bIsOpen == "Y"){
					window.name = "keypad";
					var strURL = 'http://pfapp.tongtongtong.co.kr/prevent/self_diagnosis.asp?deviceOS=MOBILE_WEB&bcode=&mbno='+$("#studentnum").val();
					window.open(strURL, "SelfDiagnosis", "width=800,height=700,scrollbars=yes")
				}else{
					//console.log(obj.returnMessage);
					StudentAtt(pAttType);
				}
			},
			error:function(xhr,status,error){
				console.log(xhr);
				//alert("에러가 발생했습니다."+error);
				//StudentAtt(pAttType);
			}
		});
	}
	function callbackSelfDiagnosis() {
		StudentAtt(curAttType);
	}

	function StudentAtt(atype)
	{
		var sid = $("#sid").val();
		var studentnum = $("#studentnum").val();
		var studentname = $("#studentname").val();
		var keypadnum = $("#keypadnum").val();

		var strSfCode = $("strSfCode").val();
		var strRfKind = $("#strRfKind").val();

		//출결키패드 사용학원여부 체크
		if (strSfCode == "" || strRfKind == "")
		{
			// 학원사랑에 맞게 하세요.
			alert("로그인 후에 사용 하세요.");
			return false;
		}

		var keyNum1 = $("#keynum1").text();
		var keyNum2 = $("#keynum2").text();
		var keyNum3 = $("#keynum3").text();
		var keyNum4 = $("#keynum4").text();

		var keyNum = "";
		keyNum = keyNum1+keyNum2+keyNum3+keyNum4;
		if (keyNum.length != 4)
		{
			alert("출결번호 4자리를 정확히 선택하세요.");
			return false;
		} else {
			$("#strRfCardNum").val(keyNum);

			//DB에 출결처리
			//document.frm.action = "";	// - 학원사랑에 처리 페이지
			//document.frm.target = "ifrm";
			//document.frm.submit();

			var strParam="strBrCode=";					//학원코드
			strParam=strParam + "&strRfKind=";			//출결기기종류(C:카드, F:지문, K:키패드 V:가상키패드)
			strParam=strParam + "&strRfCardNum="+keyNum;				//키패드에서 입력한 번호
			strParam=strParam + "&strInDTime=";							//카드읽힌시간:입력하지 않음
			strParam=strParam + "&strUserType=";		//사용범위(0:원생+직원, 1:원생, 2:직원)
			strParam=strParam + "&strTimeType=";	//반시간표타입"
			strParam=strParam + "&strLecCountType=";//회차적용타입
			strParam=strParam + "&strLecCountAutoYN=";//회차차감의 출석연동여부(Y/N)
			strParam=strParam + "&smsallowyn=";		//SMS사용료 미납으로 인하여 SMS를 사용할 수 있는지 여부
			strParam=strParam + "&strAcamTel=";	//학원번호(전송자번호)
			strParam=strParam + "&strAcamName=";						//학원명

			$.ajax({
				type: "POST",
				url: "",
				data: strParam,
				dataType: "html",
				success:function(pstrResult){
					$("#proc_result").html(pstrResult);

					if (pstrResult.length > 1) {
						playAudio(1);

						var arrResult=$("#proc_result").text().split("returnval_");
						if (arrResult.length > 1) {
							if (arrResult[1] == "0:1") { //출석처리 성공
								//response.write "returnval_0:1<br>"							'출결처리성공여부
								//response.write "returnval_1:" & strStCode & "<br>"			'원생/직원코드
								//response.write "returnval_2:" & strStName & "<br>"			'원생/직원명
								//response.write "returnval_3:" & strStPhoto & "<br>"			'원생/직원사진
								//response.write "returnval_4:" & strCurDateTime & "<br>"		'출결일시
								//response.write "returnval_5:" & "미납" & "<br>"				'미납여부
								//response.write "returnval_6:" & RegClName & "<br>"			'수강반리스트
								//response.write "returnval_7:" & strMyPoint & "<br>"			'원생의 현재 포인트
								if (11 > 2 ) {
									doingtimer(arrResult[3].substr(2, 20)+" "+$("#attdproctext").val())
								} else {
									//처리전에 이미 이름을 보여주었다.
									//$(".jStudentName").text(arrResult[3].substr(2, 20));
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
				//complete: function (pstrResult) {
				//	alert("complete="+pstrResult)
				//},
				error:function(xhr,status,error){
					//alert(xhr.responseText)
					//2017-11-08:arrowroot
					if ( $(".jStudentName").text().indexOf("선생님" ,0) != -1 ) {
						alert("선생님의 출근시간 입력상태를\n확인하십시요.");
					} else {
						alert(xhr.responseText)
					}
				}
			});

		}
	}

	//출결번호체크
	function CheckStudent(keypadnum)
	{
		$(".jStudentName").text("");
		$("#studentnum").val("");
		$("#studentname").val("");
		$("#keypadnum").val("");
		$("#attdproctext").val("");

		var strURL="http://www2.hakwonsarang.co.kr/mmsc/h2cspage/virtualkeypad/getStNameByRfCardNo.asp?strbrcode=JE41&strRfKind=&strRfCardNum="+keypadnum;

		var xhr = new XMLHttpRequest();
    	xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status === 200) {
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
				console.log(xhr.responseText);
				alert(" 출결번호 존재 오류가 발생");
			}    
		};
        
		xhr.open('GET',strURL, true);
		xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://www6.hakwonsarang.co.kr/mmsc/');
		xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Accept-Language', 'ko')
		
		xhr.send();

		
		//DB에서 출결번호 존재여부 체크


	}

	function CheckTimer()
	{
		if (isTimer==1)
		{
			clearInterval(timerInterval);
			$(".jDefaultText").text('출결번호 4자리를 선택하세요');
			isTimer = 0;
		}
	}

	function doingtimer(retmsg)
	{
		isTimer = 1;
		$("#keynum1").text("");
		$("#keynum2").text("");
		$("#keynum3").text("");
		$("#keynum4").text("");
		$(".jDefaultText").text(retmsg);
		$(".jDefaultText").show();
		$(".jStudentName").text("");
		$(".jStudentName").hide();
		$("#studentnum").val("");
		$("#studentname").val("");
		$("#keypadnum").val("");

		//초를나타내는 변수
		var sec = 2;
		timerInterval = setInterval(function(){
			sec = sec-1
			if(sec == 0){
				clearInterval(timerInterval);
				$(".jDefaultText").text('출결번호 4자리를 선택하세요');
				isTimer = 0;

				playAudio(0);
			}
		},1000);
	}

	function playAudio(nPlayStat)
	{
		// Check for audio element support.
		if (window.HTMLAudioElement) {
			try {
				//var oAudio = document.getElementById("myaudio");
				var oAudio = $("#myaudio")[0];

				//audio.currentTime=0;  //현재 재생위치 보기
				//audio.volume = 0.5;	//소리 크기를 설정
				//audio.readyState;		//현재 Audio 상태 확인하기
				if (1 > 2) {
					alert("audio.currentTime ="+oAudio.currentTime )
					alert("audio.volume ="+oAudio.volume )
					alert("audio.readyState="+oAudio.readyState)
					alert("audio.paused="+oAudio.paused)
				}

				// Tests the paused attribute and set state.
				if (nPlayStat == 1) {
					if (! oAudio.paused) {
						oAudio.pause();
					}
					oAudio.play();
				}
				else {
					if (! oAudio.paused) {
						oAudio.pause();
					}
				}
			}
			catch (e) {
				// Fail silently but show in F12 developer tools console
				 if(window.console && console.error("Error:" + e));
			}
		}
	}

