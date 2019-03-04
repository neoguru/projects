/******************************************************** 
   파일명 : gaCommon.js
   파일내용 : gaMis에서 사용하는 javascript 모음
*********************************************************/ 

function delChar(str, ch){
    /*
    *********************************************************************************************************
    *   함수설명  : 문자열에서 특정문자를 제거한 새로운 문자열을 만든다.
    * str    : 문자열
    * ch    : 제거할 문자
    ***********************************************************************************************************
    */
 var len = str.length;
 var ret = "";
 
 //문자열에서 ch 문자를 제거한다. 예) ,  - 등등
 for (i=0; i<len; ++i)
 {
  if (str.substring(i,i+1) != ch)
   ret = ret + str.substring(i,i+1);
 }
 
 return ret;
}

function replace(str,oldChar,newChar){
    /*
    *********************************************************************************************************
    *   함수설명  : 문자열에서 특정문자를 다른 문자로 치환한 새로운 문자열을 만든다.
    * str    : 문자열
    * oldChar   : 바꾸기 전의 문자
    * newChar   : 바꿔서 넣을 문자
    ***********************************************************************************************************
    */
    var oldstr="";
    
    while(oldstr!=str){
     oldstr=str;
     str=str.replace(oldChar,newChar);
    }

 return str;
}

function fillZero(n, width) {
    /*
	    *********************************************************************************************************
	    *   함수설명  : 숫자 -> 문자 전환시 00 -> '00', 01 -> '01' 형태로 0을 채워주는 함수
	    * n    : 숫자
	    * width    : 문자수
	    ***********************************************************************************************************
	    */
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	}

function getDateDiff(start, end) {
    /*
	    *********************************************************************************************************
	    *   함수설명  : 두날짜 사이의 일수를 계산
	    *   start : 시작일자, 
	    *   end  : 종료일자
	    ***********************************************************************************************************
	    */
	var cnt = 0;
	
	var dtStart = moment(start.toISOString().substring(0,10), "YYYY-MM-DD");
	var dtEnd = moment(end.toISOString().substring(0,10), "YYYY-MM-DD");
	
	cnt = dtEnd.diff(dtStart, "days");
	
	return cnt;
}

function getMonthDiff(start, end) {
    /*
	    *********************************************************************************************************
	    *   함수설명  : 두날짜 사이의 월수를 계산
	    *   start : 시작일자, 
	    *   end  : 종료일자
	    ***********************************************************************************************************
	    */
	var cnt = 0;
	
	var dtStart = new Date(start).moveToFirstDayOfMonth();	
	var dtEnd = new Date(end).moveToFirstDayOfMonth();	
	
	dtStart = moment(dtStart, "YYYY-MM-DD");
	dtEnd = moment(dtEnd, "YYYY-MM-DD");
		
	cnt = dtEnd.diff(dtStart, "months");
	
	return cnt;
}

function getYearDiff(start, end) {
    /*
	    *********************************************************************************************************
	    *   함수설명  : 두날짜 사이의 년수를 계산
	    *   start : 시작일자, 
	    *   end  : 종료일자
	    ***********************************************************************************************************
	    */
	var cnt = 0;
	
	var dtStart = new Date(start).moveToMonth(0).moveToFirstDayOfMonth();	
	var dtEnd = new Date(end).moveToMonth(0).moveToFirstDayOfMonth();	
	
	dtStart = moment(dtStart, "YYYY-MM-DD");
	dtEnd = moment(dtEnd, "YYYY-MM-DD");
		
	cnt = dtEnd.diff(dtStart, "years");
	
	return cnt;
}






function lTrim(str){
    /*
    *********************************************************************************************************
    *   함수설명  : 문자열에서 왼쪽의 공백을 제거한다.
    * str    : 문자열
    ***********************************************************************************************************
    */
  var i;
  i = 0;
  while (str.substring(i,i+1) == ' ' || str.substring(i,i+1) == '　')  i = i + 1;
  return str.substring(i);
}

function rTrim(str){
    /*
    *********************************************************************************************************
    *   함수설명  : 문자열에서 오른쪽의 공백을 제거한다.
    * str    : 문자열
    ***********************************************************************************************************
    */


  var i = str.length - 1;
  while (i >= 0 && (str.substring(i,i+1) == ' ' || str.substring(i,i+1) == '　')) i = i - 1;
  return str.substring(0,i+1);
}

function trim(str){
    /*
    *********************************************************************************************************
    *   함수설명  : 문자열에서 양쪽의 공백을 제거한다.
    * str    : 문자열
    ***********************************************************************************************************
    */
    if( str == "" || str.length ==0 ) 
    {
      return str; 
    } 
    else
    {
      return(lTrim(rTrim(str)));
    }   
}

 

//오른쪽에 ch 문자 채우기

function rPadString(str, ch, len){
    /*
    *********************************************************************************************************
    *   함수설명  : 문자열을 정해진 길이만큼 오른쪽을 특정 문자로 채운다.
    * str    : 문자열
 * len    : 총길이
    ***********************************************************************************************************
    */
 var strlen = trim(str).length;
 var ret = "";
 var alen = len - strlen;
 var astr = ""; 
 
 //부족한 숫자만큼  len 크기로 ch 문자로 채우기
 for (i=0; i<alen; ++i)
 {
  astr = astr + ch;
 }
 
 ret = trim(str) + astr; //뒤에서 채우기
 return ret;
}

function lPadString(str, ch, len){
    /*
    *********************************************************************************************************
    *   함수설명  : 문자열을 정해진 길이만큼 왼쪽을 특정 문자로 채운다.
    * str    : 문자열
 * len    : 총길이
    ***********************************************************************************************************
    */
 var strlen = trim(str).length;
 var ret = "";
 var alen = len - strlen;
 var astr = ""; 
 
 
 //부족한 숫자만큼  len 크기로 ch 문자로 채우기
 for (i=0; i<alen; ++i)
 {
  astr = astr + ch;
 }
 
 ret = astr + trim(str); //앞에서 채우기
 return ret;
}

function formatComma(argStr){
    /*
    *********************************************************************************************************
    *   함수설명  : 숫자를 세자리마다 컴마를 찍은 형식으로 바꾸어 준다.
    * argStr    : argument
    ***********************************************************************************************************
    */
 if (argStr == null)  return;
 var argStr = argStr + ""; //숫자인 경우 문자열로 변환
 var rule = /[^0-9-.]/g;  // 숫자, 부호 및 소수점 이외의 데이터 제거

 argStr = getFilledCommaStr(argStr.replace(rule, ""));
 return argStr;
}

function getFilledCommaStr(argNumber) {
    /*
    *********************************************************************************************************
    *   함수설명  : 숫자에 천단위로 ','를 붙여서 반환
    * argNumber   : 숫자
    ***********************************************************************************************************
    */
        argNumber = argNumber.toString();

        if (isEmpty(argNumber))  return argNumber;

        // 숫자 항목에서 부호(-), 소수점(.) 체크
        var sourceStr = trim(argNumber);
        var signStr   = ""
        var dotStr    = "";

        if (sourceStr.substring(0, 1) == "-") {
            signStr   = "-";
            sourceStr = sourceStr.substring(1, sourceStr.length);
        }
        if (sourceStr.indexOf(".") >= 0) {
            dotStr    = sourceStr.substring(sourceStr.indexOf("."), sourceStr.length);
            sourceStr = sourceStr.substring(0, sourceStr.indexOf("."));
        }

        var sourceLen = sourceStr.length;
        var filledStr = "";
        var checkIdx  = 0;

        for (var idx = sourceLen - 1; idx >= 0; idx--) {
            if (checkIdx++ % 3 == 0 && idx != sourceLen -1) {
                filledStr = "," + filledStr;
                checkIdx = 1;
            }
            filledStr = sourceStr.substring(idx, idx + 1) + filledStr;
        }
        return signStr + filledStr + dotStr;
}
