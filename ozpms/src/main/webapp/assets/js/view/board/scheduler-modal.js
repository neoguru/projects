var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    PAGE_CHOICE: function (caller, act, data) {
    	
    	console.log(data);
    	
        if (parent && parent.axboot && parent.axboot.modal) {
            parent.axboot.modal.callback(data);
        }
    },
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/scheduler",
            data: caller.searchView.getData(),
            callback: function (res) {
//            	console.log(res);
                caller.gridView01.setData(res);
            }
        });
        return false;
    },
    PAGE_SAVE: function (caller, act, data) {

        if (caller.formView01.validate()) {
        	
        	var schedulerData = ACTIONS.dispatch(ACTIONS.SET_SCHEDULER_DATA);
            
            console.log(schedulerData);
                        
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "PUT", 
                        url: "/api/v1/scheduler", 
                        data: JSON.stringify([schedulerData]),
                        
                        callback: function (res) {
                            ok(res);
                        }
                    });
                })            
                .then(function (ok) {
                    ACTIONS.dispatch(ACTIONS.PAGE_CHOICE, schedulerData);
                })
                .catch(function () {
                });
            
//            ACTIONS.dispatch(ACTIONS.PAGE_CHOICE. schedulerData);
        }

    },
    PAGE_DELETE: function (caller, act, data) {
    	
    	console.log(data);
    	
    },
    SET_SCHEDULER_DATA: function (caller, act, data) {    	

        var getData = caller.formView01.getData();
        var schedulerData = {};
        
        schedulerData.noEmp = SCRIPT_SESSION.noEmp;
        schedulerData.title = getData.title;
        
        schedulerData.start = getData.dtStart;
        schedulerData.end = getData.dtEnd;
        
        schedulerData.allDay = getData.allDay;
        if (schedulerData.allDay == "FALSE") {
        	schedulerData.tmStart = getData.tmStart;
        	schedulerData.tmEnd = getData.tmEnd;
        }        
        
        schedulerData.ynRepeat = getData.ynRepeat;
        schedulerData.memo = getData.memo;
        
        if (schedulerData.ynRepeat == "REPEAT"){
        	var repeatData = [];
        	repeatData.repeatCycle = getData.repeatCycle;
        	repeatData.interval = getData.interval;
        	repeatData.dayDate = getData.dayDate;
        	repeatData.day = getData.day;
        	repeatData.dayCount = getData.dayCount;
        	repeatData.date = getData.date;
        	repeatData.month = getData.month;
        	repeatData.repeatEnd = getData.repeatEnd;
        	repeatData.repeatCount = getData.repeatCount;
        	repeatData.dtEnd = getData.dtEnd;
        	
        	if (repeatData.repeatCycle == "YEAR") {
        		
        		var baseDate = Date.parse(new Date(schedulerData.start));   
        		
        		repeatData.dayDate = "DATE";
        		repeatData.date = baseDate.getDate();
        		repeatData.month = baseDate.getMonth();
        	}
        	
        	if (repeatData.repeatEnd == "INFINITE") 
        		repeatData.dtEnd = "9999-12-31";
        	else if (repeatData.repeatEnd == "COUNT") {
        		
        		var endDate = Date.parse(new Date(schedulerData.start));   
        		var cnt = parseInt(repeatData.repeatCount);

        		switch (repeatData.repeatCycle){
            		case "DAY":
            			endDate = endDate.addDays(cnt);
            			break;
            		case "WEEK":
            			endDate = endDate.addWeeks(cnt);
            			break;
            		case "MONTH":
            			endDate = endDate.addMonths(cnt);
            			break;
            		case "YEAR":
            			endDate = endDate.addYears(cnt);
            			break;
        		}
        		repeatData.dtEnd = endDate.toISOString().substring(0,10);
        	}
        	schedulerData.schedulerRepeat = repeatData;
        }
        
    	
        return schedulerData;
    },
    FORMVIEW_INIT: function (caller, act, data) {
    	
        var $formView = $('#formView01');
        
    	(function() {
    		$formView.find('[id="repeat-panel"]').attr("style", "display:none;");
    		$formView.find('[id="summary"]').attr("style", "display:none;");
    		$formView.find('[id="interval"]').attr("style", "display:none;");
    		$formView.find('[id="day"]').attr("style", "display:none;");
    		$formView.find('[id="dayDate"]').attr("style", "display:none;");
    		$formView.find('[id="base"]').attr("style", "display:none;");
    		$formView.find('[id="dateBase"]').attr("style", "display:none;");
    		$formView.find('[id="dayBase"]').attr("style", "display:none;");
    		$formView.find('[id="dtStartRepeat"]').attr("style", "display:none;");
    		$formView.find('[id="repeatEnd"]').attr("style", "display:none;");
    		$formView.find('[id="repeatCount"]').attr("style", "display:none;");
    		$formView.find('[id="dtEndRepeat"]').attr("style", "display:none;");
    		$formView.find('[id="intervalCycle"]').attr("disabled", "disabled");
    		$formView.find('[id="tmStart"]').attr("disabled", "disabled");
    		$formView.find('[id="tmEnd"]').attr("disabled", "disabled");
    		$formView.find('[data-ax-path="day"]').attr("disabled", "disabled");
    		$formView.find('[data-ax-path="dtStartRepeat"]').attr("readonly", "readonly");
    	})();

    },
    VALIDATE_FORMVIEW: function(caller, act, data) {
 
    	var validateData = caller.formView01.getData();
    	
    	if (validateData.ynRepeat == "REPEAT") {
    		
    		var returnValue = true;    		
    		returnValue = ACTIONS.dispatch(ACTIONS.VALIDATE_REPEAT, validateData);
    		
    		if (returnValue == false)
    			return false;    		
    	}
    	
    	
    	return true;
    	
    },    
    VALIDATE_REPEAT: function(caller, act, data) {

    	if (!data.repeatCycle) {
            axDialog.confirm({
            	title: "Confirm", 
               msg: "반복주기를 선택하세요!"
            }, function () {
            });  
    		return false;
    	}
    	if (!data.interval) {
            axDialog.confirm({
            	title: "Confirm", 
               msg: "간격을 입력하세요!"
            }, function () {
            });  
    		return false;
    	}
    	if (data.repeatCycle == "MONTH") {
    		var isOk = true;
    		if (!data.dayDate) {
                axDialog.confirm({
                	title: "Confirm", 
                   msg: "날짜/요일 기준을 선택하세요!"
                }, function () {
                });                  
        		isOk = false;
    		}
    		if (isOk == false)
    			return isOk;
    	}

    	if (data.repeatEnd == "COUNT") {
    		var isOk = true;
    		if (!data.repeatCount) {
                axDialog.confirm({
                	title: "Confirm", 
                   msg: "반복횟수를 입력하세요!"
                }, function () {
                });  
        		isOk = false;
    		}
    		if (isOk == false)
    			return isOk;
    	}

    	if (data.repeatEnd == "DATE") {
    		var isOk = true;
    		if (!data.dtEndRepeat) {
                axDialog.confirm({
                	title: "Confirm", 
                   msg: "종료일자를 입력하세요!"
                }, function () {
                });  
        		isOk = false;
    		}
    		if (isOk == false)
    			return isOk;
    	}
    },
    dispatch: function (caller, act, data) {
        var result = ACTIONS.exec(caller, act, data);
        if (result != "error") {
            return result;
        } else {
            // 직접코딩
            return false;
        }
    }
});

var CODE = {};

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
	
    var _this = this;    

    var clickData = parent.axboot.modal.getData().clickData;
    
    _this.pageButtonView.initView();
	_this.formView01.initView(clickData);
    
};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
	
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "close": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
            "save": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_DELETE);
            }
        });
    }
});

//== view 시작

fnObj.formView01 = axboot.viewExtend(axboot.formView, {
	
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {        	
        });
    },
    initView: function (data) {
    	
        this.target = $("#formView01");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작
        this.initEvent(data);
        
        this.setInitData(data);																				//modal화면 로링시 초기 데이터 set

        this.setInitRepeat();
    },
    initEvent: function (data) {
    	
        var _this = this;        
        var $formView = $('#formView01');

        ACTIONS.dispatch(ACTIONS.FORMVIEW_INIT);

        _this.target.find('[data-picker-date="date"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
            }
        });
        
        _this.model.onChange("allDay", function () {
        	
            if (this.value == "FALSE") {
        		$formView.find('[id="tmStart"]').removeAttr("disabled", "disabled");
        		$formView.find('[id="tmEnd"]').removeAttr("disabled", "disabled");     
            } else {	
        		$formView.find('[id="tmStart"]').attr("disabled", "disabled");
        		$formView.find('[id="tmEnd"]').attr("disabled", "disabled");
            }
            _this.allDayChange(data, this.value);
        });

        _this.model.onChange("ynRepeat", function () {

            if (this.value == "REPEAT") {
        		$formView.find('[id="repeat-panel"]').attr("style", "display:block;");
        		$formView.find('[id="summary"]').attr("style", "display:block;");
            } else {
        		$formView.find('[id="repeat-panel"]').attr("style", "display:none;");
        		$formView.find('[id="summary"]').attr("style", "display:none;");
        		_this.setDataInit();
        		ACTIONS.dispatch(ACTIONS.FORMVIEW_INIT);
            }
        });

        _this.model.onChange("repeatCycle", function () {

    		$formView.find('[id="repeat-panel"]').attr("style", "display:block;");
    		$formView.find('[id="summary"]').attr("style", "display:block;");
    		$formView.find('[id="interval"]').attr("style", "display:block;");
    		$formView.find('[id="dtStartRepeat"]').attr("style", "display:block;");
    		$formView.find('[id="repeatEnd"]').attr("style", "display:block;");
    		
            if (this.value == "DAY") {
        		$formView.find('[id="day"]').attr("style", "display:none;");
        		$formView.find('[id="dayDate"]').attr("style", "display:none;");
          		$formView.find('[id="base"]').attr("style", "display:none;");          		
            } else if (this.value == "WEEK") {
        		$formView.find('[id="day"]').attr("style", "display:block;");
        		$formView.find('[id="dayDate"]').attr("style", "display:none;");
          		$formView.find('[id="base"]').attr("style", "display:none;");          		
                _this.setDay(data);
            } else if (this.value == "MONTH") {
        		$formView.find('[id="dayDate"]').attr("style", "display:block;");
        		$formView.find('[id="day"]').attr("style", "display:none;");            	
            } else if (this.value == "YEAR") {
        		$formView.find('[id="dayDate"]').attr("style", "display:none;");
        		$formView.find('[id="day"]').attr("style", "display:none;");     
          		$formView.find('[id="base"]').attr("style", "display:none;");          	       	
            }

            _this.setIntervalCycle(this.value);
        });

        _this.model.onChange("repeatEnd", function () {

             if (this.value == "INFINITE") {
          		$formView.find('[id="repeatCount"]').attr("style", "display:none;");
           		$formView.find('[id="dtEndRepeat"]').attr("style", "display:none;");
             } else if (this.value == "COUNT") {
          		$formView.find('[id="repeatCount"]').attr("style", "display:block;");
           		$formView.find('[id="dtEndRepeat"]').attr("style", "display:none;");
             } else if (this.value == "DATE") {
           		$formView.find('[id="dtEndRepeat"]').attr("style", "display:block;");
          		$formView.find('[id="repeatCount"]').attr("style", "display:none;");
             }
        });

        _this.model.onChange("dayDate", function () {

      		$formView.find('[id="base"]').attr("style", "display:block;");
      		
             if (this.value == "DATE") {
          		$formView.find('[id="dateBase"]').attr("style", "display:block;");
           		$formView.find('[id="dayBase"]').attr("style", "display:none;");
           		_this.setDate(data);
             } else if (this.value == "DAY") {
          		$formView.find('[id="dayBase"]').attr("style", "display:block;");
           		$formView.find('[id="dateBase"]').attr("style", "display:none;");     		
                _this.setDay(data);
             } 
        });
        
    },
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.

        return $.extend({}, data);
    },
    setData: function (data) {

        if (typeof data === "undefined") data = this.getDefaultData();
        data = $.extend({}, data);

        this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
        
    },
    setDataInit: function() {												//입력된 각종 데이터를 초기화
    	this.model.set("repeatCycle", "");
    	this.model.set("interval", "");
    	this.model.set("intervalCycle", "");
    	this.model.set("day", "");
    	this.model.set("date", "");
    	this.model.set("dayDate", "");
    	this.model.set("repeatEnd", "");
    	this.model.set("repeatCount", "");
    	this.model.set("dtEndRepeat", "");
    },
    /*********************************************************************************
     * modal화면 로링시 초기 데이터 set
     * 1. dayClick event와 eventClick event 처리
     * 2. '종일'인 경우와 아닌경우 처리 : 시작일, 시작시간, 종료일, 종료시간 처리 
     *      - dayClicke의 경우 month view에서 click 또는 week, day view에서 종일 부분 click시 '종일'로 처리-------> 날짜의 length로 구분
     *      - dayClick의 경우 week, day view에서 특정시간을 클릭시 '종일'이 아닌것으로 처리-------> 날짜의 length로 구분
     *      - eventClick의 경우 해당 시작일시, 종료일시를 display
     *********************************************************************************/
    setInitData: function(data) {										
    	
        if (data.type == "day") {																							//dayClick의 경우 처리

        	var dayClickInitData = [];
        	
    		if (data.dtStart.length == 10) 																				
    			dayClickInitData = this.setInitDayDateData(data);										//'종일'인경우
    		else 																														
    			dayClickInitData = this.setInitDayDateTimeData(data)    							//'종일'이 아닌경우		
    		
            this.setInitDayClickValue(dayClickInitData);            
    		
        } else {																														//eventClick의 경우 처리
        	
        	var eventClickInitData = [];
        	
        	if (data.allDay == "true")
        		eventClickInitData = this.setInitDayDateData(data);									//eventClick시 '종일'인 경우는 dayClcik의 '종일'과 동일하게 처리
    		else 
    			eventClickInitData = this.setInitEventDateTimeData(data);
        }
        
    },
    setInitDayDateData: function(data) {
    	
    	var dayClickInitData = [];

    	dayClickInitData.dtStart = data.dtStart;
    	dayClickInitData.tmStart = "00:00";
    	dayClickInitData.dtEnd = data.dtStart;
    	dayClickInitData.tmEnd = "00:00";
    	dayClickInitData.allDay = "TRUE";
    	
    	return dayClickInitData;
    },
    setInitDayDateTimeData: function(data) {

    	var dayClickInitData = [];
		var newDate = new Date(data.dtStart);        	

		dayClickInitData = setInitEventDateTimeData(data.type, newDate, newDate)
    	
		var startHour = fillZero(newDate.getHours(), 2).toString();
		var startMin = fillZero(newDate.getMinutes(), 2).toString();
		var endMin = fillZero(newDate.addMinutes(30).getMinutes(), 2).toString();
		var endHour = fillZero(newDate.getHours(), 2).toString();
		
		dayClickInitData.dtStart = newDate.toISOString().substring(0, 10);
		dayClickInitData.tmStart = startHour.concat(":").concat(startMin);
		dayClickInitData.dtEnd = dayClickInitData.dtStart;
		dayClickInitData.tmEnd = endHour.concat(":").concat(endMin);
		dayClickInitData.allDay = "FALSE";
		
		return dayClickInitData;
    },
    setInitEventDateTimeData: function(data) {

    	var eventClickInitData = [];
    	
    	var dtStart = new Date(data.dtStart._i);
    	var dtEnd = new Date(data.dtEnd._i);

    	eventClickInitData = setInitEventDateTimeData(data.type, dtStart, dtEnd)

		return eventClickInitData;
    },
    setInitDateTimeData: function(type, dtStart, dtEnd) {

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
		data.allDay = "FALSE";
		
		return data;
    },
    setInitDayClickValue: function(data) {

        this.model.set("dtStart", data.dtStart);        
    	this.model.set("dtEnd", data.dtEnd); 
    	
        this.model.set("dtStartRepeat", data.dtStart);    
        this.model.set("allDay", data.allDay);
        
        this.setTime(data);
    },
    setTime: function(data) {
    	this.model.set("tmStart", data.tmStart);
    	this.model.set("tmEnd", data.tmEnd);
    },
    setInitRepeat: function() {    	
    	this.model.set("ynRepeat", "NONE");
    	
    },
    setIntervalCycle: function(data) {
    	this.model.set("interval", "1");
    	this.model.set("intervalCycle", data);
    },
    setDay: function(data) {																							//요일
    	
    	var baseDate = new Date(data.dtStart.toString());
    	var day = baseDate.getDay();
    	var cnt = Math.ceil(baseDate.getDate()/7);
    	
    	if (cnt == 5)
    		cnt = "END";
    	
    	this.model.set("day", day);
    	this.model.set("dayCount", cnt);
    	
    },
    setDate: function(data) {																								//날짜
    	
    	var baseDate = new Date(data.dtStart.toString());
    	var date = baseDate.getDate();
    	
    	if (date == 31)
    		date = "END";
    	this.model.set("date", date);
    },
    setInitEventClickValue: function(data) {
    	
    	
    },
    allDayChange(data){
    	
    },
    validate: function () {
        var rs = this.model.validate();
        var isOk = true;

        if (rs.error) {
        	
            axDialog.confirm({
            	title: "Confirm", 
               msg: LANG("ax.script.form.validate", rs.error[0].jquery.attr("title"))
            }, function () {
            });  
            rs.error[0].jquery.focus();
            return false;
        } 

    	isOk = ACTIONS.dispatch(ACTIONS.VALIDATE_FORMVIEW); 
    	
    	if (isOk == false){
        	return false;
        }
       
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});


