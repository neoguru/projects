/******************************************************** 
   파일명 : compDate.js
   설명    : 모든 일자관련 계산 script
                  : Datejs, moment js 이용
*********************************************************/ 

function getMM(dtStart, dtEnd){
/* 
	    ****************************************************************************************************
	   *  함수설명: 시작일자, 종료일자를 받아 공수를 산정하는 함수
	    *
	   * 사용예
	    ****************************************************************************************************
*/
	
	var sdt = new Date(dtStart);
	var edt = new Date(dtEnd);
	
	if (sdt >= edt){
		return 0;
	}
	
	var syy = sdt.getFullYear();
	var smm = sdt.getMonth() ;
	var sdd = sdt.getDate();
	
	var eyy = edt.getFullYear();
	var emm = edt.getMonth() ;
	var edd =edt.getDate();
	
	var cyy = eyy - syy;
	var cmm = ((cyy * 12) + emm) - smm;
	var cdd = 0;
			
	if ((sdd == 1) && (edd == 15)) {
		cdd = 0.5;
	} else if ((sdd == 16) && (edd == edt.moveToLastDayOfMonth().getDate())) {
		cdd = 0.5;
	} else if ((sdd == 1) && (edd == edt.moveToLastDayOfMonth().getDate())) {
		cdd = 1;
	} else if ((sdd - edd) >= 1){
		if ((sdd - edd) == 1) {
			cdd = 0;
		} else if (smm == emm){
			cdd = (((edd - sdd) +1) / sdt.moveToLastDayOfMonth().getDate());
		} else {
			cmm = cmm -1;
			cdd = (((sdt.moveToLastDayOfMonth().getDate() - sdd) + 1) / sdt.moveToLastDayOfMonth().getDate()) + (edd / edt.moveToLastDayOfMonth().getDate());
		}
	} else {
		cdd = ((edd - (sdd -1)) / edt.moveToLastDayOfMonth().getDate());
	}
	cmm = cmm + cdd;
	cmm = cmm.toFixed(2);
	return cmm;
}		
	
function getMMDate(dtStart){
    /* 
	    ****************************************************************************************************
	    *  함수설명: date(yyyy-mm-dd)를 입력받아 해당월의 1MM 일자를 YYYY-MM-DD형태로 return
	    *
	    * 사용예
	    ****************************************************************************************************
	    */
	var newDate = new Date(dtStart);
	
	var year = newDate.getFullYear();
	var month = newDate.getMonth() + 1;
	var day = newDate.getDate() ;
	
	var dtEnd = new Date(year, month , day);
	return dtEnd.toISOString().substring(0, 10);
}






