d3.csv("1.csv", function(data)  { // table binding 
	if (error) throw error;
	console.log(data);
	alert(data);
	columns = ['name','age'] // 컬럼명을 지정해서 넣어준다. 
	tabulate(data,columns) // tabulate 라는 함수에 data와 columns를 넣는다. 
	}) ;
	tabulate = function (data,columns) { // tabulate를 정의하는 부분이다. 
								table = d3.select('body').append('table') // d3를 통해 body를 가져오고 table태그를 append를 통해 추가
								thead = table.append('thead') // table에 thead를 추가한 값을 thead라는 변수명에 저장한다. 
								tbody = table.append('tbody') // tr이 담겨있는 body형태의 tbody를 tbody라는 변수명에 저장한다. 
								thead.append('tr') // thead를 만드는 부분으로 tr태그를 append 한다. 
									.selectAll('th') // 모든 th를 가져온다. .data(columns) // 데이터 바인딩은 columns로 사용한다. 
									.enter() // 데이터의 개수만큼 진행하는데 
									.append('th') //columns 만큼 th를 만든다. 
						.text(function (d) { return d }) // th에 text를 넣는데 text의 값은 data의 값을 넣는다. 
					rows = tbody.selectAll('tr') // row를 만드는 부분으로 모든 tr태그를 가져오는데 
						.data(data) // 데이터 바인딩에 data 값을 넣어준다. 
						.enter() // data의 개수만 큼 진행하는데 .append('tr') // tr태그를 data의 개수만큼 추가한다. 
					cells = rows.selectAll('td') // cells를 만드는 부분으로 모든 td값을 가져오는데 
						.data(function(row) { // 데이터 바인딩을 하는데 있어서 그 값을 function(row)의 반환값으로 한다. 
						return columns.map(function (column) { // columns.map을 리턴하는데 columns.map안에 들어가는 값이 function(column)으로 
							return { column: column, value: row[column] } //column : column, value: row[column]로 key value 형식으로 들어가는 것 같다. 
			})
		}) 
			.enter() //데이터 바인딩 한 값 만큼 진행하는데 
			.append('td') //td를 데이터 개수만큼 추가한다. 
			.text(function (d) { return d.value }) //text 값을 추가하는데 그 값은 윗 부분의 data의 value 값을 넣어준다. 
		
		return table; //table 을 리턴한다. 
} </script>


	<div style="width:100%;height:100%;padding-top:4%;margin:0 auto;">
		<div class="key_box" style="display:table-cell;float:left">
			<!--학원명-->
			<div class="d_tb aca_name">
				<div>블루플래닛 제주</div>
			</div>

			<!--출결번호 영역-->
			<div style="width:100%;height:28%;" class="d_tb">
				<div class="d_tc" style="padding-top:10px;">
					<p class="tx_20 jDefaultText" style="display:none;">출결번호를 선택하세요</p>
					<p class="tx_24 jStudentName">학생이름</p>
					<div class="nb_box">
						<div id="keynum1"></div>
						<div id="keynum2"></div>
						<div id="keynum3"></div>
						<div id="keynum4"></div>
					</div>
				</div>
			</div>

<!--
			<div style="width:100%;height:5%;">
				<p class="tx_gid jAttHelp">
					<img src="./images/pcweb/icon_gid.png" width="18" style="position:relative;top:4px;cursor:pointer;"> <span style="cursor:pointer;">출결처리가 안되세요?</span>
				</p>
			</div>
-->

			<!--번호판 영역-->
			<div style="width:98%;height:54%;margin:0 auto;">
				<div class="keybox jKeyNum" keynum=1>
					<div>1</div>
				</div>
				<div class="keybox jKeyNum" keynum=2>
					<div>2</div>
				</div>
				<div class="keybox jKeyNum" keynum=3>
					<div>3</div>
				</div>
				<div class="keybox jKeyNum" keynum=4>
					<div>4</div>
				</div>
				<div class="keybox jKeyNum" keynum=5>
					<div>5</div>
				</div>
				<div class="keybox jKeyNum" keynum=6>
					<div>6</div>
				</div>
				<div class="keybox jKeyNum" keynum=7>
					<div>7</div>
				</div>
				<div class="keybox jKeyNum" keynum=8>
					<div>8</div>
				</div>
				<div class="keybox jKeyNum" keynum=9>
					<div>9</div>
				</div>
				<div class="keybox jKeyDelOne">
					<div><img src="./images/pcweb//key_back.png" width="28" alt="back"></div>
				</div>
				<div class="keybox jKeyNum" keynum=0>
					<div>0</div>
				</div>
				<div class="keybox jKeyDelAll">
					<div><img src="./images/pcweb//key_clear.png" width="28" alt="clear"></div>
				</div>

				<!--등원/하원 버튼-->
				<div class="keybox_btn jComeIn">
					<div class="btn1">등원/귀가 처리</div>
				</div>
				<!--div class="keybox_btn jComeOut">
					<div class="btn2">하원</div>
				</div-->
			</div>
		</div>

<!--출석처리 내역 보여주는 테이블 출석처리 내역 보여주는 테이블-->
		<div class="key_box" style="display:table-cell;float:left">
			<div class="d_tb aca_name">
				<div>출석처리 내역</div>
			</div>

			<div class="tx_list" id="result_list">
				<table width="100%" border="0" cellpadding="1" cellspacing="1" bgcolor="#dcdcdc" id="tblList">
					<tr bgcolor="#f5f5f5">
						<td align="center" width="30%">체크일시</td>
						<td align="center" width="20%">이름</td>
						<td align="center" width="50%">반명</td>			//여기에 출석내용 들어감
					</tr>
				</table>
			</div>
		</div>
	</div>
</form>

<script type="text/javascript">

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
    
   /*   //2020-10-08 KHAN 방역관리 자가진단 입력

// eemd
function StudentAtt(atype)		//StudentAtt(1) 등원   StudentAtt(2) 하원
	{
		var sid = $("#sid").val();
		var studentnum = $("#studentnum").val();
		var studentname = $("#studentname").val();
		var keypadnum = $("#keypadnum").val();
		var strSfCode = $("strSfCode").val();
		var strRfKind = $("#strRfKind").val();

        alert(strSfCode);
        alert(strRfKind);
		
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
			//document.frm.action = "http://www2.hakwonsarang.co.kr/mmsc/h2cspage/rfpage/rf_page1.asp";	// - 학원사랑에 처리 페이지
			//document.frm.target = "ifrm";			//document.frm.submit();
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
			alert(strParam);
			/* 'http://www2.hakwonsarang.co.kr/mmsc/h2cspage/rfpage/rf_page1.asp?
				strBrCode=JE41&
				strRfKind=E&
				strRfCardNum=7917&
				strUserType=0&
				strTimeType=A&
			 strLecCountType=3&
			 strLecCountAutoYN=Y&
			 smsallowyn=Y&
			 strAcamTel=01098406638 		*/
            //등원생 확인 팝업창 열기
 
//출석-귀가 버튼 눌렀을 때 동작
	$.ajax({
			headers: { "Access-Control-Allow-Origin": "http://www2.hakwonsarang.co.kr", //헤더를 이렇게 바꾸니까 되느 듯
					   "Access-Control-Allow-Headers": '*'		 					 },
			Origin : "http://www2.hakwonsarang.co.kr/mmsc/h2cspage/rfpage/rf_page1.asp",
			crossOrigin:true,
			type: "POST",
			url: "http://www2.hakwonsarang.co.kr/mmsc/h2cspage/rfpage/rf_page1.asp?",
			data: strParam,
			dataType: "html",
			

            success:function(pstrResult){
                   //출석시 띵동소리내기		playAudio();
	               $("#proc_result").html(pstrResult);
            
					if (pstrResult.length > 1) {
						var arrResult=$("#proc_result").text().split("returnval_");
                        //alert(arrResult);
						if (arrResult.length > 1) {
							if (arrResult[1] == "0:1") {
								$(".jDefaultText").text("");
								$(".jDefaultText").show();

								//처리전에 이미 이름을 보여주었다.
								$(".jStudentName").text(arrResult[3].substr(2, 20));
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

								var objRsltTbl=document.getElementById("tblList")
								var curTr=objRsltTbl.insertRow(1);

								var curTd1=curTr.insertCell(0);
									curTd1.className="attdlist";
									curTd1.innerHTML=strFmtDttm;
								var curTd2=curTr.insertCell(1);
									curTd2.className="attdlist";
									curTd2.innerHTML=arrResult[3].substr(2, 20);
								var curTd3=curTr.insertCell(2);
									curTd3.className="attdlist";
									curTd3.innerHTML=arrResult[7].substr(2, 20);
//출석처리 성공 시
							} else { 
								$(".jDefaultText").text(arrResult[2].substr(2, 100));
								$(".jDefaultText").show();
								$(".jStudentName").text("");
								$(".jStudentName").show();							
							}
						}
					}
				},
				
			error:function(xhr,status,error){
				alert("출석실패");
			console.log("code:"+xhr.status+"\n"+"message:"+xhr.response+"\n"+"error:"+error);
			}
			});

		}
	}


//출결번호체크
	function CheckStudent(keypadnum){   
	
		$(".jStudentName").text("");
		$("#studentnum").val("");
		$("#studentname").val("");
		$("#keypadnum").val("");
		//var strURL=                                                       "./getStNameByRfCardNo.asp?strbrcode=JE41&strRfKind=E&strRfCardNum="+keypadnum;
        var strURL="http://www2.hakwonsarang.co.kr/mmsc/h2cspage/virtualkeypad/getStNameByRfCardNo.asp?strbrcode=JE41&strRfKind=E&strRfCardNum="+keypadnum;

		//DB에서 출결번호 존재여부 체크
		$.ajax({
				headers: { 'Access-Control-Allow-Origin': '*' },
				header : "http://www2n.hakwonsarang.co.kr",
				//header : "http://www2.hakwonsarang.co.kr/mmsc/h2cspage/rfpage/rf_page1.asp",
				crossOrigin: true,
				url  : strURL,	// - 학원사랑에 처리 페이지
				type :"post",
				async: false,		//순서가 중요할 때는 동기식으로 바꿔준다.
				dataType:"html",
			   
				error:function(){												
					alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				    alert("오류가 발생하였습니다. ajax에서 오류 나네 기다료 왜 안되노");
			    },
		   		success:function(pstrVal) {     //접속 성공하면, 받은 데이터 'S|원생코드|원생명'를   // |으로 나눠서 
				
                   	if (pstrVal.length > 0) {
					
						var arrVal=pstrVal.split("|"); ///S|원생코드|원생명|등원-귀가
								if (arrVal.length >= 3) { 
									$("#studentnum").val(arrVal[1]);   // #studentnum에 학생코드
									$("#studentname").val(arrVal[2]);  // #studentname에 이름
									
									if (arrVal[0] == "T") {			$(".jStudentName").text(arrVal[2]+" 선생님");
									} else {
										
										if (arr_M0.indexOf(arrVal[2])>= 0)	{$(".jStudentName").text(arrVal[2]+" A 자리") }; //이거 내가 쓴거						
										if (arr_M1.indexOf(arrVal[2])>= 0)	{$(".jStudentName").text(arrVal[2]+" B 자리") }; //이거 내가 쓴거};		
										if (arr_M2.indexOf(arrVal[2])>= 0)	{$(".jStudentName").text(arrVal[2]+" C 자리") }; //이거 내가 쓴거};
										//$(".jStudentName").text(arrVal[2]+" 학생");  }
									}
										$("#keypadnum").val(keypadnum);  
								}

							$(".jDefaultText").hide();		//이름 들어오는 자리 / 출결번호를 선택하세요.
							$(".jStudentName").show();		//이름 들어오는 자리

			//출석 성공시 arrVal[2] == 리스트에 있는 값으로 백그라운드 바꾸기
							if (arr_M0.indexOf(arrVal[2])>= 0)	{$('.key_box').css("background-Color", 'Green')}; //이거 내가 쓴거
							if (arr_M1.indexOf(arrVal[2])>= 0)	{$('.key_box').css("background-Color", 'Blue')}; //이거 내가 쓴거};		
							if (arr_M2.indexOf(arrVal[2])>= 0)	{$('.key_box').css("background-Color", 'Orange')}; //이거 내가 쓴거};

					} else {
							$(".jStudentName").text("존재하지 않은 출결번호");
							$(".jDefaultText").hide();
							$(".jStudentName").show();
					}
			   		}
		});
		
	}


	//로그인하기
	$.ajax({
               headers: { 'Access-Control-Allow-Origin': '*' },
               crossOrigin: true,
			   //url  : "http://www6.hakwonsarang.co.kr/mmsc/login_proc.asp?txtbr_code=JE41&txtmb_id=je41admin&txtmb_pw=tnejrfh41!" 
			   url  : "http://www6.hakwonsarang.co.kr/mmsc/student/st07pop_attdStList.asp",
			   type :"post",
			   async: "true",		//순서가 중요할 때는 동기식으로 바꿔준다.
			   dataType: "html",
               contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            
			   error:function(){
                   	alert("오류...등원생 확인 호출하기 통신 실패");
			     },
			   success:function(data){               // |으로 나눠서 
                   //alert("리스트 접근 완료하지만 한글은 깨짐")//(data);
				    var refine = $("#aa").html(data).find('tr');
                  	$("#aa").html(refine);

			     }
			});   



function readTextFile(file)			//csv파일 읽기
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
				console.log(allText);
            }
        }
    }
    rawFile.send();
}
readTextFile("file:///C:/Users/Dustin/Documents/tong/1.txt");
	
		

	$(function(){			//csv파일 읽기
		var fileName = "file:///C:/Users/Dustin/Documents/tong/1.txt";	//로컬파일 읽어야 하는데
		//var fileName = "https://drive.google.com/file/d/1pGEGOu8AQCJt3BLM-rXkgheD_6_rbjjT/view?usp=sharing/1.txt";	

		$('#btn1').click(function(){
			//텍스트 파일 읽어오기	//지금은 서버에서 데이터를 생성해서 리턴을 못하기 때문에 파일을 만들어서 읽지만 나중에는 파일 이름을 적지 않고 URL을 기재해서 데이터를 읽어올 것이다.
			$('#disp').load(fileName);
		});
		$('#btn2').click(function(){
			// html 파일 가져오기
			$('#disp').load("https://drive.google.com/file/d/1pGEGOu8AQCJt3BLM-rXkgheD_6_rbjjT/view?usp=sharing/1.txt");
		});
	});


	$.ajax({
    		url: "C:/Users/Dustin/Documents/tong/1.txt",
      		success: function(data) {
				  alert(data);
        				var array1 = data.split(",");
        				var array2 = new Array();
				    
						for (var i = 0; i < array1.length; i++) {
            				array2.push(array1[i].split(","));
            					for (var j = 0; j < array2[i].length; j++) {
                					$('ul').append('<li>'+array2[i][j]+'</li>');
            }               
            $('ul').append('<li><hr></li>');
        		}
      		},
			  error:function(data){
                   	alert("오류...csv호출하기 통신 실패");
			     }

    });
