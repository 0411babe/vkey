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

		$('.jAttHelp').click(function(){
			var strHelpMsg = "원생의 출석처리가 안되는 경우";
			strHelpMsg += "\nPC의 [학사관리>원생자료]에서\n[RF 카드번호]를 확인하세요.";
			//alert(strHelpMsg);
		});

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
			//if (keyNum.length == 3)
			//{
				keyNum = keyNum1+keyNum2+keyNum3+keyNum4+clickKeyNum;
			//}

			if (keyNum.length == 4) {
				CheckStudent(keyNum);
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
			//document.frm.action = "../rfpage/rf_page1.asp";	// - 학원사랑에 처리 페이지
			//document.frm.target = "ifrm";
			//document.frm.submit();
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
			//console.log("../rfpage/rf_page1.asp?"+strParam);
			
		
            var xhr = new XMLHttpRequest();
		    var url = "http://www2.hakwonsarang.co.kr/mmsc/h2cspage/rfpage/rf_page1.asp?";
		
            xhr.onreadystatechange = function() {
                
                if (xhr.readyState == 4 && xhr.status === 200) { 
                    var pstrResult=xhr.responseText
                    alert("로그인");
                    playAudio();

                    $("#proc_result").html(pstrResult);

                        if (pstrResult.length > 1) {
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
                                    $(".jDefaultText").text("");
                                    $(".jDefaultText").show();
                                    //처리전에 이미 이름을 보여주었다.
                                    //$(".jStudentName").text(arrResult[3].substr(2, 20));
                                    $(".jStudentName").show();
                                    //출석처리후 번호 Clear
                                    $("#keynum1").text("");
                                    $("#keynum2").text("");
                                    $("#keynum3").text("");
                                    $("#keynum4").text("");
                                    var strStData=arrResult[3].substr(2, 20)		//이름
                                    strStData=strStData+arrResult[7].substr(2, 20)	//수강반
                                    strStData=strStData+arrResult[5].substr(2, 20)	//체크일시
                                    var strDttm=arrResult[5].substr(2, 20)
                                    var strFmtDttm=strDttm;
                                    var strFmtYmd, strFmtHns
                                    if (strDttm.length == 14) { //YYYYMMDDHHNNSS
                                        strFmtYmd= strDttm.substring(0, 4)+"."+strDttm.substring(4, 6)+"."+strDttm.substring(6, 8);
                                        strFmtHns= strDttm.substring(8, 10)+":"+strDttm.substring(10, 12)+":"+strDttm.substring(12, 14);
                                        strFmtDttm=strFmtYmd+" "+strFmtHns;
                                    }
                                    //var rslt=document.getElementById("result_list")
                                    //rslt.innerHTML="<p>"+strStData+"</p>"+rslt.innerHTML;
                                    var objRsltTbl=document.getElementById("tblList")
                                    var curTr=objRsltTbl.insertRow(1);//objRsltTbl.rows.length
                                    var curTd1=curTr.insertCell(0);
                                        curTd1.className="attdlist";
                                        curTd1.innerHTML=strFmtDttm; //arrResult[5].substr(2, 20);
                                    var curTd2=curTr.insertCell(1);
                                        curTd2.className="attdlist";
                                        curTd2.innerHTML=arrResult[3].substr(2, 20);
                                    var curTd3=curTr.insertCell(2);
                                        curTd3.className="attdlist";
                                        curTd3.innerHTML=arrResult[7].substr(2, 20);
                                }
                            }
                        }
                        
                } else { //if (arrResult[1] == "0:-1") { //출석처리 성공
							$(".jDefaultText").text(arrResult[2].substr(2, 100));
							$(".jDefaultText").show();
							$(".jStudentName").text("");
							$(".jStudentName").show(); 
                }
            };

            xhr.open('GET',url, true);
	        xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://www6.hakwonsarang.co.kr/mmsc/');
	        xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	        xhr.setRequestHeader('Accept-Language', 'ko')
            xhr.send();
	};


	//출결번호체크
	function CheckStudent(keypadnum)
	{
		$(".jStudentName").text("");
		$("#studentnum").val("");
		$("#studentname").val("");
		$("#keypadnum").val("");

        var strURL="http://www2.hakwonsarang.co.kr/mmsc/h2cspage/virtualkeypad/getStNameByRfCardNo.asp?strbrcode=JE41&strRfKind=E&strRfCardNum="+keypadnum;
//DB에서 출결번호 존재여부 체크
        var xhr1 = new XMLHttpRequest();

		xhr1.onreadystatechange = function() {

            if (xhr1.readyState == 4 && xhr1.status === 200) { 
                    var pstrVal =  xhr1.responseText
					
                    if (pstrVal.length > 0) {
						var arrVal=pstrVal.split("|"); ///'''S|원생코드|원생명

						if (arrVal.length >= 3) {
							$("#studentnum").val(arrVal[1]);
							$("#studentname").val(arrVal[2]);
							if (arrVal[0] == "T") {
								$(".jStudentName").text(arrVal[2]+" 선생님");
							} else {
								$(".jStudentName").text(arrVal[2]+" 학생");
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
			}
		};
        xhr1.open('GET',strURL, true);
        xhr1.setRequestHeader('Access-Control-Allow-Origin', 'http://www2.hakwonsarang.co.kr/mmsc/');
        xhr1.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr1.setRequestHeader('Accept-Language', 'ko')
        xhr1.send();
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
