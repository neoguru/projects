/******************************************************** 
   파일명 : scheduler-modal-setData.js
   처리내용 : scheduler-modal관련 data setting
*********************************************************/ 

function setInitDayDateData (data) {
	/*
	 * 1. dayClick event시 '종일'인 경우 : month view에서 click, 또는 week, day view에서 '종일'위치 click
	 * 2. eventClick event시 allDay == 'true'('종일')인 경우  
	 */
	var dayClickInitData = [];

	dayClickInitData.id = data.id;
	dayClickInitData.title = data.title;
	dayClickInitData.dtStart = data.dtStart;
	dayClickInitData.tmStart = "00:00";
	dayClickInitData.dtEnd = data.dtStart;
	dayClickInitData.tmEnd = "00:00";
	dayClickInitData.allDay = true;
	dayClickInitData.ynRepeat = data.ynRepeat;
	dayClickInitData.memo = data.memo;
	
	return dayClickInitData;
	
}

function setInitDayDateTimeData (data) {
		/*
		 * 1. dayClick event시 '종일'이 아닌경우 처리 
		 *     - 종료일시는 시작일시 + 30분으로 처리
		 */
 	var dayClickInitData = [];
 	var newDate = new Date(data.dtStart);
 	
 	dayClickInitData = setInitDateTimeData(data.type, newDate, newDate)
	dayClickInitData.title = data.title;
	dayClickInitData.id = data.id;
	dayClickInitData.ynRepeat = data.ynRepeat;
	dayClickInitData.memo = data.memo;
		 	
	return dayClickInitData; 	 
 }

function setInitEventDateTimeData (data) {
	/*
	 * 1. eventClick event시 '종일'이 아닌경우 처리 
	 */

	var eventClickInitData = [];
	
	var dtStart = new Date(data.dtStart);
	if (!data.dtEnd)
		var dtEnd = dtStart;
	else
		var dtEnd = new Date(data.dtEnd);

	eventClickInitData = setInitDateTimeData(data.type, dtStart, dtEnd);
	eventClickInitData.title = data.title;
	eventClickInitData.id = data.id;
	eventClickInitData.ynRepeat = data.ynRepeat;
	eventClickInitData.memo = data.memo;
	
	return eventClickInitData;
}

function setInitDateTimeData (type, dtStart, dtEnd) {

 	data = []; 		
 	
	var startHour = fillZero(dtStart.getHours(), 2).toString();
	var startMin = fillZero(dtStart.getMinutes(), 2).toString();
		
	if (type == "day") {
		var endMin = fillZero(dtStart.addMinutes(30).getMinutes(), 2).toString();
		var endHour = fillZero(dtStart.getHours(), 2).toString();
	} else {
		var endHour = fillZero(dtEnd.getHours(), 2).toString();
		var endMin = fillZero(dtEnd.getMinutes(), 2).toString();
	}

	data.dtStart = dtStart.toISOString().substring(0, 10);
	data.tmStart = startHour.concat(":").concat(startMin);
		
	if (type == "day") 
		data.dtEnd = data.dtStart;
	else 
		data.dtEnd = dtEnd.toISOString().substring(0, 10);
		
	data.tmEnd = endHour.concat(":").concat(endMin);
	data.allDay = false;
		
	return data;
 }

function getSchedulerData(data) {

	var schedulerData = {};
	
    schedulerData.noSchedule = data.id;
    schedulerData.noEmp = SCRIPT_SESSION.noEmp;
    schedulerData.title = data.title;
    
    schedulerData.start = data.dtStart;
    schedulerData.end = data.dtEnd;
    
    if (data.allDay == "false")
    	schedulerData.allDay = false;
    else
    	schedulerData.allDay = true;
    
    if (schedulerData.allDay == false) {
    	schedulerData.tmStart = data.tmStart;
    	schedulerData.tmEnd = data.tmEnd;
    }        
    
    schedulerData.ynRepeat = data.ynRepeat;
    schedulerData.memo = data.memo;
    
    return schedulerData;
}

function getRepeatData(data) {

	var repeatData = {};
	
	repeatData.repeatCycle = data.repeatCycle;
	repeatData.gap = parseInt(data.gap);
	repeatData.dayDate = data.dayDate;
	repeatData.day = parseInt(data.day);
	repeatData.dayCount = data.dayCount;
	repeatData.date = data.date;
	repeatData.month = parseInt(data.month);
	repeatData.repeatEnd = data.repeatEnd;
	repeatData.repeatCount = parseInt(data.repeatCount);
	repeatData.dtEndRepeat = data.dtEndRepeat;
	
	return repeatData;
}
	

function getRepeatDeleteNext(data) {
	
	var sendData = {};
	var isOk = false;
	var changeList = data.changeList;
	
	var clickStart = new Date(data.clickData.dtStart);
	var schedulerStart = new Date(data.scheduler.start);
	
	if (changeList) {
		
		isOk = changeList.some(function(a) {
						var changeStart = new Date(a.start);
						if (clickStart == changeStart) {
							var originalStart = new Date(a.originalStart);
							clickStart = originalStart;

							return true;
						} 						
					});
	}

	if (Date.compare(clickStart, schedulerStart) <= 0) {
		sendData.deleteType = "ALL";
		sendData.noSchedule = data.noSchedule;
		return sendData;
	}

	var dtEndRepeat = clickStart;
	dtEndRepeat = dtEndRepeat.addDays(-1);	
	
//	console.log(dtEndRepeat);
	
	sendData.deleteType = "NEXT";
	sendData.noSchedule = data.noSchedule;
	data.dtEndRepeat = dtEndRepeat;
	
	sendData.data = data;
	
	return sendData;
	
}

function getRepeatUpdateNext(data) {

	var sendData = {};
	var isOk = false;
	var changeList = data.changeList;
	
	var clickStart = new Date(data.clickData.dtStart);
	var schedulerStart = new Date(data.scheduler.start);
	
	if (changeList) {
		
		isOk = changeList.some(function(a) {
						var changeStart = new Date(a.start);
						if (clickStart == changeStart) {
							var originalStart = new Date(a.originalStart);
							clickStart = originalStart;

							return true;
						} 						
					});
	}

	if (Date.compare(clickStart, schedulerStart) <= 0) {
		sendData.updateType = "ALL";
		sendData.noSchedule = data.noSchedule;
		return sendData;
	}

	var dtEndRepeat = clickStart;
	dtEndRepeat = dtEndRepeat.addDays(-1);	
	
	sendData.deleteType = "NEXT";
	sendData.noSchedule = data.noSchedule;
	data.dtEndRepeat = dtEndRepeat;
	
	sendData.data = data;
	
	return sendData;
	
}


function getRepeatDeleteThis(data) {

    var saveData = {};
    var changeList = data.changeList;
    
    if (data.clickData.noChange) {

        var isOk = false;
        
    	isOk = changeList.some(function(a) {
    				
    					if (data.clickData.noChange == a.noChange) {
    						saveData = a;
    						saveData.typeChange = "DELETE";
    						
    						return true;
    					}
    				});
    	if (isOk)
    		return saveData;
    	
    }
    
    saveData = data.scheduler;    
    saveData.originalStart = data.clickData.dtStart;
	saveData.typeChange = "DELETE";
    
    return saveData;
}

function getRepeatUpdateThis(data) {

    var saveData = {};
    var changeList = data.changeList;
    
//    console.log(data);
    
    if (data.clickData.noChange) {

        var isOk = false;
        
    	isOk = changeList.some(function(a) {
    				
    					if (data.clickData.noChange == a.noChange) {
    						saveData = a;
    						saveData = getRepeatEventData(saveData, data);

    						return true;
    					}
    				});
    	if (isOk)
    		return saveData;
    	
    }
    
    saveData = data.scheduler;    
    saveData.originalStart = data.clickData.dtStart;
    saveData = getRepeatEventData(saveData, data);
    
    return saveData;
}

function getRepeatEventData(saveData, data) {

	saveData.typeChange = "CHANGE";
	
	var dtStart = new Date(data.getData.dtStart);
	saveData.start = dtStart.toISOString().substring(0, 10);

	var dtEnd = new Date(data.getData.dtEnd);
	saveData.end = dtEnd.toISOString().substring(0, 10);

	saveData.allDay = data.getData.allDay;
	saveData.memo = data.getData.memo;   			
	
	if (saveData.allDay == false) {
		saveData.tmStart = data.getData.tmStart;
		saveData.tmEnd = data.getData.tmEnd;		
	}
	return saveData;
}
	
function getRepeatUpdateAll(data) {
	
	var saveData = {};
	var scheduler = {};
	
//	console.log(data);
//	console.log(data.noSchedule);
	
	saveData = data.schedulerData.repeatSave;
	saveData.noSchedule = data.noSchedule;
	
	scheduler.noSchedule = data.noSchedule;
	scheduler.noEmp = data.schedulerData.noEmp;
	scheduler.title = data.schedulerData.title;
    
	scheduler.start = data.scheduler.start;
	scheduler.end = data.scheduler.end;

	scheduler.allDay = data.schedulerData.allDay;
	scheduler.tmStart = data.schedulerData.tmStart;
	scheduler.tmEnd = data.schedulerData.tmEnd;
	
    scheduler.ynRepeat = data.schedulerData.ynRepeat;
    scheduler.memo = data.schedulerData.memo;
    
    saveData.scheduler = scheduler;     
	saveData.changeList = data.changeList;
	
	return saveData;
	
}


function getRepeatEndDate(endDate, repeatData, cnt) {

	var endDate = new Date(endDate);
	
	switch (repeatData.repeatCycle){
		case "DAY":
			endDate = endDate.addDays((cnt - 1) * repeatData.gap);
			break;
		case "WEEK":
			endDate = endDate.addWeeks((cnt - 1) * repeatData.gap);
			break;
		case "MONTH":
			endDate = endDate.addMonths((cnt - 1) * repeatData.gap);
			if (repeatData.dayDate == "DAY")
				endDate.moveToNthOccurrence(repeatData.day, repeatData.dayCount);	
			break;
		case "YEAR":
			endDate = endDate.addYears((cnt - 1) * repeatData.gap);
			break;
	}
	
	return endDate;
}
	





