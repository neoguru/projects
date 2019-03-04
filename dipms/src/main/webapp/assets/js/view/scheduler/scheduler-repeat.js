/******************************************************** 
   파일명 : scheduler-modal-setData.js
   처리내용 : scheduler-modal관련 data setting   
					- 이벤트 시작일자가 기준월의 말일보다는 작거나 같고
					- 이벤트 종료일자가 기준월의 1일보다는 크거나 같은 경우        	   
*********************************************************/ 

function schedule_repeat (baseDate, data) {
	var add = [];
	var repeat = [];	
	
	var dtBase = new Date(baseDate);
	
	data.forEach(function(a){    

		switch (a.repeatCycle){
			case "DAY":
			case "WEEK":
				repeat = repeat_day_week(dtBase, a);
				break;
			case "MONTH":
				repeat = repeat_month(dtBase, a);
				break;
			case "YEAR":
				repeat = repeat_year(dtBase, a);
				break;    
		}

		if (a.changeList.length > 0) {
			var changeList = [].concat(a.changeList);
			
			changeList.forEach(function(c) {
				
				var originalStart = new Date(c.originalStart);
				originalStart = originalStart.toISOString().substring(0,10);
				
				repeat.forEach(function(r, index) {
					var repeatStart = new Date(r.start);
					repeatStart = repeatStart.toISOString().substring(0,10);
					
					if (originalStart == repeatStart) {
						
						if (c.typeChange == "CHANGE") {
							r.noChange = c.noChange;
							r.originalStart = c.originalStart;
							r.start = moment(c.start).format('YYYY-MM-DD');
							r.end = c.start;
							r.tmStart = c.tmStart;
							r.tmEnd = c.tmEnd;
							r.allDay = c.allDay;
							r.memo = c.memo;
							
							if (r.allDay == false) {
								r.start = r.start.concat("T").concat(c.tmStart);
								r.end = r.end.concat("T").concat(c.tmEnd);
							}
						} else {

							var idx = index
							repeat.splice(idx, 1);
						}

					}				
				});
			});
		}

//		console.log(repeat);
		Array.prototype.push.apply(add, repeat);
		
	});

//	console.log(add);
    return add;
}

/******************************************************** 
   - getDateDiff(date1, date2) : 두 날짜간 날짜수를 계산하는 함수로 gaCommon.js에 있음...
*********************************************************/ 

function repeat_day_week(baseDate, data) {
	var day_week = [];
	
	var dtBase = new Date(baseDate).moveToFirstDayOfMonth();	 							//기준일 : 해당월의 1일 (Datejs함수) ex) 2017-10-01
	var dtStart = new Date(data.scheduler.start);															//시작일: 이벤트 시작일 (Scheduler 테이블의 start 컬럼)
	var dtEndRepeat = new Date(data.dtEndRepeat);													//반복 종료일 : 반복 종료일 (SchedulerRepeat 테이블의 dtEndRepeat 컬럼)
	var dtBaseLast = new Date(dtBase).moveToLastDayOfMonth();			 				//말일 : 기준일의 말일 (Datejs 함수)

	var dtBaseStart = new Date(dtBase).addMonths(-1);												//기준월 -1월  
	dtBaseStart.moveToFirstDayOfMonth();
	var dtBaseEnd = new Date(dtBase).addMonths(1);													//기준월 +1월 :
	dtBaseEnd.moveToLastDayOfMonth();																		//기준월 +1월의 말일
	
	var cnt = 0;

	if (data.repeatCycle == "WEEK" && dtStart.getDay() != data.day) 
			dtStart = getWeekRepeatStartDate(dtStart, data.day);		

	var dtStartEvent = dtStart;
	
	if (dtStart.between(dtBaseStart, dtBaseEnd)) {															//이벤트 시작일이 기준월-1월 1일이후이고 기준월+1월 말일 사이인 경우 (Datejs 함수)
		
		if (Date.compare(dtEndRepeat, dtBaseEnd) == 1) {													// - 이벤트 반복 종료일이 기준월+1월의 말일 이후인 경우 
			cnt = getDateDiff(dtStart, dtBaseEnd);																			// - 시작일자와 기준월+1월의 말일사이의 날짜차이를 계산
			day_week = getDayWeekRepeatEvent(dtStartEvent, dtBaseEnd, cnt, data);
		} else {																															// - 이벤트 반복 종료일이 기준월+1월의 말일이전인 경우										
			cnt = getDateDiff(dtStart, dtEndRepeat);
			day_week = getDayWeekRepeatEvent(dtStartEvent, dtEndRepeat, cnt, data);
		}
		
	} else if (dtStart.compareTo(dtBaseStart) == -1) {														//이벤트 시작일이 기준일 이전인 경우 (Datejs 함수)
		
		dtStartEvent = getDtStartEvent(dtStart, dtBaseStart, data);										//dtBaseStart와 dtBaseEnd사이의 첫 event 일자를 계산
		
		if (Date.compare(dtStartEvent, dtBaseEnd) != 1) {

			if (Date.compare(dtEndRepeat, dtBaseEnd) == 1) {																		// - 이벤트 반복 종료일이 기준월의 말일 이후인 경우 
				cnt = getDateDiff(dtStartEvent, dtBaseEnd);																					// - 시작일자와 말일사이의 날짜차이를 계산
				day_week = getDayWeekRepeatEvent(dtStartEvent, dtBaseEnd, cnt, data);
			} else {																															// - 이벤트 반복 종료일이 기준월중인 경우										
				cnt = getDateDiff(dtStartEvent, dtEndRepeat);
				day_week = getDayWeekRepeatEvent(dtStartEvent, dtEndRepeat, cnt, data);
			}
			
		}
		
	}
	
	return day_week;
}

function getWeekRepeatStartDate(dtStart, day) {

	var dtWeekStart = dtStart;   
	var dtWeekStartDay = dtWeekStart.getDay();
	
	if (day > dtWeekStartDay)
		dtWeekStart.addDays(day - dtWeekStartDay);
	else if (day < dtWeekStartDay)
		dtWeekStart.addDays((7 - dtWeekStartDay) + day);
	
	dtStart = dtWeekStart;
	
	
	return dtStart;
}
	
function getDtStartEvent(dtStart, dtBaseStart, data) {
	
	var cnt = 0;
	var count = 0;

	if (data.repeatCycle == "DAY" || data.repeatCycle == "WEEK") {
		cnt = getDateDiff(dtStart, dtBaseStart);																	//반복이벤트 시작일자와 기준일자 시작일 사이의 일수를 계산 
		if (data.repeatCycle == "DAY")
			count = parseInt(cnt / data.gap);																				//
		else
			count = parseInt(cnt / (data.gap * 7));
	} else if (data.repeatCycle == "MONTH") {
		cnt = getMonthDiff(dtStart, dtBaseStart);
		count = parseInt(cnt / data.gap);
	}

//	console.log(count);
	
	if (count < 1)
		count = 0;
	
	var dtStartEvent = dtStart;
	
	if (data.repeatCycle == "DAY")
		dtStartEvent = dtStartEvent.addDays(count);
	else if (data.repeatCycle == "WEEK")
		dtStartEvent = dtStartEvent.addWeeks(count);
	else if (data.repeatCycle == "MONTH") {
		dtStartEvent = dtStartEvent.addMonths(count);
	}
	
	if (Date.compare(dtStartEvent, dtBaseStart) == -1) {	

		if (data.repeatCycle == "DAY")
			dtStartEvent = dtStartEvent.addDays(data.gap);
		else if (data.repeatCycle == "WEEK")
			dtStartEvent = dtStartEvent.addWeeks(data.gap);
		else if (data.repeatCycle == "MONTH") {
			dtStartEvent = dtStartEvent.addMonths(data.gap);
		}
	}

	return dtStartEvent;
}

function getDayWeekRepeatEvent(dtStartEvent, dtLast, cnt, data) {
	var events = [];
	
	if (data.repeatCycle == "DAY") 
		var count = parseInt(cnt / data.gap);
	else
		var count = parseInt(cnt / (data.gap * 7));

	count += 1;		
	var start = dtStartEvent;	
	var last = dtLast;
	
	for (i = 0; i < count; i++) {
		var repeat = [];

		repeat = getRepeatEvent(start, data);
		
		if (data.repeatCycle == "DAY") 
			start.addDays(data.gap);	
		else
			start.addWeeks(data.gap);	
		
		events.push(repeat); 		
	}
	
	return events;
	
}

function getRepeatEvent(dtStart, data) {
	var repeat = [];
	var start = new Date(dtStart);
	var ok = false;
	
	if (data.date == "END") 
		start.moveToLastDayOfMonth();
	
	repeat.id = data.noSchedule;
	repeat.title = data.scheduler.title;
	repeat.start = moment(start).format('YYYY-MM-DD');
	repeat.end = repeat.start;
	
	repeat.allDay = data.scheduler.allDay;
	repeat.ynRepeat = data.scheduler.ynRepeat;
	repeat.memo = data.scheduler.memo;
	
	if (repeat.allDay == false) {
		repeat.start = repeat.start.concat("T").concat(data.scheduler.tmStart);
		repeat.end = repeat.end.concat("T").concat(data.scheduler.tmEnd);
		repeat.tmStart = data.scheduler.tmStart;
		repeat.tmEnd = data.scheduler.tmEnd;
	}
	
	return repeat;
}

function repeat_month(baseDate, data) {
	var month = [];

	var dtBase = new Date(baseDate).moveToFirstDayOfMonth();	 							//기준일 : 해당월의 1일 (Datejs함수) ex) 2017-10-01
	var dtStart = new Date(data.scheduler.start);															//시작일: 이벤트 시작일 (Scheduler 테이블의 start 컬럼)
	var dtEndRepeat = new Date(data.dtEndRepeat);													//반복 종료일 : 반복 종료일 (SchedulerRepeat 테이블의 dtEndRepeat 컬럼)
	var dtBaseLast = new Date(dtBase).moveToLastDayOfMonth();			 				//말일 : 기준일의 말일 (Datejs 함수)
	var dtStartEvent = dtStart;
	
	var dtBaseStart = new Date(dtBase).addMonths(-1);												//기준월 -1월  
	dtBaseStart.moveToFirstDayOfMonth();
	var dtBaseStartLast = new Date(dtBaseStart).moveToLastDayOfMonth();
	
	var dtBaseEnd = new Date(dtBase).addMonths(1);													//기준월 +1월 :
	dtBaseEnd.moveToLastDayOfMonth();																		//기준월 +1월의 말일
	var dtBaseEndFirst = new Date(dtBaseEnd).moveToFirstDayOfMonth();
	
	var cnt = 0;

	
	
	if (dtStart.between(dtBaseStart, dtBaseEnd)) {															//이벤트 시작일이 기준월-1월 1일이후이고 기준월+1월 말일 사이인 경우 (Datejs 함수)

		if (Date.compare(dtEndRepeat, dtBaseEnd) == 1) {
			cnt = getMonthDiff(dtStart, dtBaseEnd);
			month = getMonthRepeatEvent(dtStartEvent, dtBaseEnd, cnt, data);
		}		
		else {
			cnt = getMonthDiff(dtStart, dtEndRepeat);
			month = getMonthRepeatEvent(dtStartEvent, dtEndRepeat, cnt, data);
		}
		
	} else if (dtStart.compareTo(dtBaseStart) == -1) {														//이벤트 시작일이 기준일 이전인 경우 (Datejs 함수)
		
		dtStartEvent = getDtStartEvent(dtStart, dtBaseStart, data);
		
		if (data.dayDate == "DAY") {
			dtStart.moveToNthOccurrence(data.day, data.dayCount);																//해당월의 x번째 요일 - Datejs 사용
		}
		
		if (Date.compare(dtStartEvent, dtBaseEnd) != 1) {

			if (Date.compare(dtEndRepeat, dtBaseEnd) == 1) {																		// - 이벤트 반복 종료일이 기준월의 말일 이후인 경우 
				cnt = getMonthDiff(dtStartEvent, dtBaseEnd);																					// - 시작일자와 말일사이의 날짜차이를 계산
				month = getMonthRepeatEvent(dtStartEvent, dtBaseEnd, cnt, data);	
			} else {																															// - 이벤트 반복 종료일이 기준월중인 경우										
				cnt = getMonthDiff(dtStartEvent, dtEndRepeat);
				month = getMonthRepeatEvent(dtStartEvent, dtEndRepeat, cnt, data);	
			}
			
		}
	}
	return month;
}

function getMonthRepeatEvent(dtStartEvent, dtLast, cnt, data) {
	var events = [];
	var start_date = new Date(data.scheduler.start);

//	console.log(start_date);
	if (cnt == 0) 
		var count = 0;
	else
		var count = parseInt(cnt / data.gap);

	count += 1;		
	var start = new Date(dtStartEvent);	
	var last = dtLast;
	
	for (i = 0; i < count; i++) {
		var repeat = [];

		repeat = getRepeatEvent(start, data);
		start.addMonths(data.gap);	

		if (start.getMonth() != 1) {
			if (start.getDate() != start_date.getDate())
				start.setDate(start_date.getDate());
		}

		if (data.dayDate == "DAY") 
			start.moveToNthOccurrence(data.day, data.dayCount);																//해당월의 x번째 요일 - Datejs 사용
		
		events.push(repeat); 		
		
	}
	
	return events;
	
}

function repeat_year(baseDate, data) {
	var year = [];
	var event = [];

	var dtBase = new Date(baseDate).moveToFirstDayOfMonth();	 							//기준일 : 해당월의 1일 (Datejs함수) ex) 2017-10-01
	var dtStart = new Date(data.scheduler.start);															//시작일: 이벤트 시작일 (Scheduler 테이블의 start 컬럼)
	var dtEndRepeat = new Date(data.dtEndRepeat);													//반복 종료일 : 반복 종료일 (SchedulerRepeat 테이블의 dtEndRepeat 컬럼)

	var dtBaseStart = new Date(dtBase).addMonths(-1);												//기준월 -1월  	
	var dtBaseEnd = new Date(dtBase).addMonths(1);													//기준월 +1월 :
	
	var dtStartEvent = getDtEventYear(dtBaseStart, data);

	if (dtStartEvent.between(dtBaseStart, dtBaseEnd)) 
		event = getRepeatEvent(dtStartEvent, data);			
	
	year.push(event);
//	console.log(year);
	return year;
}

function getDtEventYear(dtBaseStart,data) {
	
	var dtStartEvent = new Date(dtBaseStart);
	
	if (data.date == "END"){
		dtStartEvent.moveToLastDayOfMonth();
		dtStartEvent.set({month: data.month});
	} else {
		dtStartEvent.set({month: data.month, day: parseInt(data.date)});
	}

//	console.log(dtStartEvent);
	return dtStartEvent;
	
	//set({ millisecond: 500, second: 30, minute: 45, hour: 18, day: 15, month: 6, year: 2008 });
}

function getChangedRepeat(data) {
	
}




function getSaveData(data) {
	/******************************************************** 
	   - eventDrop, eventResize 에 대한 기본 저장데이터 처리
	*********************************************************/ 

    var saveData = {};
    
    saveData.noSchedule = data.id;
    saveData.noEmp = SCRIPT_SESSION.noEmp;
    saveData.title = data.title;
    saveData.start = data.start;
    
    if (data.end)
    	saveData.end = data.end;
    else
    	saveData.end = data.start;

    saveData.allDay = data.allDay;
    
    saveData.ynRepeat = data.ynRepeat;
    saveData.memo = data.memo;
    
    return saveData;

}

function setRepeatChange(data) {

    var saveData = {};
    
    saveData = data.saveData;
    
    if (data.saveData.originalStart)
    	var dtStart = new Date(data.saveData.originalStart);
    else {
        var dtStart = new Date(data.eventData.event.start.format());
    	dtStart.add({days: -(data.eventData.delta._data.days), months: -(data.eventData.delta._data.months)});    
    }
    
    saveData.originalStart = moment(dtStart).format('YYYY-MM-DD');
    return saveData;

}














