var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
        	console.log(parent);
            parent.axboot.modal.close();
        }
    },
    PAGE_CHOICE: function (caller, act, data) {
    	
        if (parent && parent.axboot && parent.axboot.modal) {
            parent.axboot.modal.callback(data);
        }
    },
    REPEAT_BASE_SEARCH: function (caller, act, id) {

        axboot.ajax({
            type: "GET",
            url: "/api/v1/schedulerrepeat",
            data: {noSchedule: id},
            callback: function (res) {            	
//            	console.log(res);
                caller.formView01.setRepeatData(res);
            }
        });
        
    },
    PAGE_SAVE: function (caller, act, data) {

        if (caller.formView01.validate()) {
        	
        	if (data.type == "day" || (data.type == "event" && data.ynRepeat == "NONE")) {

            	var schedulerData = ACTIONS.dispatch(ACTIONS.SET_SCHEDULER_DATA);
                                        
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
                    	schedulerData.crud = "save";
                        ACTIONS.dispatch(ACTIONS.PAGE_CHOICE, schedulerData);
                    })
                    .catch(function () {
                    });
                
        	} else if (data.type == "event" && data.ynRepeat == "REPEAT") {
                ACTIONS.dispatch(ACTIONS.REPEAT_UPDATE_SAVE, data);
        	}
        	
        }

    },
    SET_SCHEDULER_DATA: function (caller, act, data) {    	

        var getData = caller.formView01.getData();
        var schedulerData = {};

//        console.log(caller.formView01.getData());
        
        schedulerData = getSchedulerData(getData);
        
        if (schedulerData.ynRepeat == "REPEAT"){
        	
        	var repeatData = {};        	
        	repeatData = getRepeatData(getData);
        	
        	if (repeatData.repeatCycle == "YEAR") {
        		
//        		var baseDate = Date.parse(new Date(schedulerData.start));   
        		var baseDate = new Date(schedulerData.start);   
        		
        		repeatData.dayDate = "DATE";
        		repeatData.date = baseDate.getDate();
        		repeatData.month = baseDate.getMonth();
        		
        	}

        	if (repeatData.repeatEnd == "INFINITE") 
        		repeatData.dtEndRepeat = "9999-12-31";
        	else if (repeatData.repeatEnd == "COUNT") {
        		
//        		var endDate = Date.parse(new Date(schedulerData.start));   
        		var endDate = new Date(schedulerData.start);   
        		var cnt = parseInt(repeatData.repeatCount);
        		
        		if ((repeatData.repeatCycle == "WEEK") && (endDate.getDay() != repeatData.day))  {
        			endDate = getWeekRepeatStartDate(endDate, repeatData.day);		
        		}        		
        		        		
        		endDate = getRepeatEndDate(endDate, repeatData, cnt);
        		repeatData.dtEndRepeat = endDate.toISOString().substring(0,10);
        	}
//        	console.log(repeatData.dtEndRepeat);
        	schedulerData.repeatSave = repeatData;
        }
        return schedulerData;
    },
    PAGE_DELETE: function (caller, act, data) {
    	
        var getData = caller.formView01.getData();
        getData.noSchedule = getData.id;
        getData.noChange = data.noChange;
        
        if (data.ynRepeat == "NONE") {

	        axDialog.confirm({
	        	title: "Confirm",
	            msg: data.title + " 일정을 삭제하시겠습니까?"
	        }, function () {
	            if (this.key == "ok") 
	            	ACTIONS.dispatch(ACTIONS.DELETE_SCHEDULE, getData);
	        });
	        
        } else {

            var $headView = $('#head-button');
            var $formView = $('#formView01');
            
        	(function() {
        		$headView.find('[id="modal-button"]').attr("style", "display:none;");
        		$headView.find('[id="repeat-button"]').attr("style", "display:none;");
        		$headView.find('[id="repeat-detail-button"]').attr("style", "display:none;");
        		$formView.find('[id="modal-panel"]').attr("style", "display:none;");
        		$formView.find('[id="repeat-update"]').attr("style", "display:none;");
        		
        		$headView.find('[id="confirm-button"]').attr("style", "display:block;");
        		$formView.find('[id="repeat-delete-update-panel"]').attr("style", "display:block;");
        		$formView.find('[id="repeat-delete"]').attr("style", "display:block;");
        	})();

            caller.formView01.setRepeatDeleteUpdate("delete");

        }
    },
    DELETE_SCHEDULE: function (caller, act, data) {

        axboot.ajax({
            type: "PUT",
            url: "/api/v1/scheduler/delete",
            data: JSON.stringify([data]),
            callback: function (res) {
            	res.crud = "delete";
                ACTIONS.dispatch(ACTIONS.PAGE_CHOICE, res);
            }
        });
        
    },
    PAGE_DETAIL: function (caller, act, data) {

        var $headView = $('#head-button');
        var $formView = $('#formView01');
        
    	(function() {
    		$headView.find('[id="modal-button"]').attr("style", "display:none;");
    		$headView.find('[id="repeat-button"]').attr("style", "display:none;");
    		$headView.find('[id="repeat-detail-button"]').attr("style", "display:none;");
    		$formView.find('[id="modal-panel"]').attr("style", "display:none;");
    		$formView.find('[id="repeat-delete"]').attr("style", "display:none;");
    		
    		$headView.find('[id="confirm-button"]').attr("style", "display:block;");
    		$formView.find('[id="repeat-delete-update-panel"]').attr("style", "display:block;");
    		$formView.find('[id="repeat-update"]').attr("style", "display:block;");
    	})();

        caller.formView01.setRepeatDeleteUpdate("update");

    },
    PAGE_CANCEL: function (caller, act, data) {

    	caller.formView01.setInitData(data);
  	
        var $formView = $('#formView01');
        
    	(function() {
    		$formView.find('[id="modal-panel"]').attr("style", "display:block;");

    		$formView.find('[id="repeat-panel"]').attr("style", "display:none;");
    		$formView.find('[id="repeat-delete-update-panel"]').attr("style", "display:none;");
    		$formView.find('[id="repeat-delete"]').attr("style", "display:none;");
    		$formView.find('[id="repeat-update"]').attr("style", "display:none;");
    		$formView.find('[id="ynRepeat"]').attr("disabled", "disabled");	
    	})();

        ACTIONS.dispatch(ACTIONS.HEAD_BUTTON_INIT, data);
    },
    PAGE_CONFIRM: function (caller, act, data) {

        var getData = caller.formView01.getData();        

        axboot.ajax({
            type: "GET",
            url: "/api/v1/schedulerrepeat",
            data: {noSchedule: data.id},
            callback: function (res) {          
            	res.clickData = data;
                if (getData.repeatDeleteUpdate == "delete") {
                	ACTIONS.dispatch(ACTIONS.REPEAT_DELETE, res);                	
                } else {
                	ACTIONS.dispatch(ACTIONS.REPEAT_UPDATE, res);         
                }
            }
        });
        
    },
    REPEAT_DELETE: function (caller, act, data) {

        var getData = caller.formView01.getData();      
        var _url = "";
        var sendData = [];
        var returnData = {};
        
    	if (getData.repeatDelete == "THIS") {											//scheduler_repeat_change table insert

    		_url = "/api/v1/schedulerrepeatchange";
    		returnData = getRepeatDeleteThis(data)
    		
    	} else if (getData.repeatDelete == "NEXT") {								//scheduler_repeat table의 dt_end_repeat column의 종료일을 현 dtStart에서 1day minus
    		
    		returnData = getRepeatDeleteNext(data)    		
    		if (returnData.deleteType == "ALL") {
        		_url = "/api/v1/schedulerrepeat/deleteAll";
        		retrunData = data;
    		} else {
        		_url = "/api/v1/schedulerrepeat/deleteNext";
        		returnData = returnData.data;
        	}
    		
    	} else if (getData.repeatDelete == "ALL") {									//scheduler, scheduler_repeat, scheduler_repeat_change table 삭제 (id(noSchedule))
    		_url = "/api/v1/schedulerrepeat/deleteAll";
    		returnData = data;
    	}
    	sendData.url = _url;
    	sendData.data = returnData;

    	ACTIONS.dispatch(ACTIONS.REPEAT_UPDATE_DELETE_ACTION, sendData);         
    },
    REPEAT_UPDATE: function (caller, act, data) {

        var getData = caller.formView01.getData();      
//        console.log(data);
        
        var $headView = $('#head-button');
        var $formView = $('#formView01');
        
    	(function() {
    		$headView.find('[id="repeat-detail-button"]').attr("style", "display:block;");    		
    		$headView.find('[id="modal-button"]').attr("style", "display:none;");    		
    		$headView.find('[id="repeat-button"]').attr("style", "display:none;");    		
    		$headView.find('[id="confirm-button"]').attr("style", "display:none;");    		

    		$formView.find('[id="repeat-delete-update-panel"]').attr("style", "display:none;");
    		$formView.find('[id="repeat-delete"]').attr("style", "display:none;");
    		$formView.find('[id="repeat-update"]').attr("style", "display:none;");
    		
    		$formView.find('[id="modal-panel"]').attr("style", "display:block;");    	
    		$formView.find('[id="repeat-panel"]').attr("style", "display:block;");    	
    		$formView.find('[id="ynRepeat"]').removeAttr("disabled", "disabled");	
    	})();

        caller.formView01.setRepeatData(data);
        
    	if (getData.repeatUpdate == "ALL") {
    		$formView.find('[id="ynRepeat"]').removeAttr("disabled", "disabled");	
        	caller.formView01.setRepeatUpdate(data.scheduler);
    	} else {
    		$formView.find('[id="ynRepeat"]').attr("disabled", "disabled");	
    		
    		var start = new Date(data.clickData.dtStart);
    		data.clickData.start = moment(start).format('YYYY-MM-DD');
    		
    		if (data.clickData.dtEnd) {
        		var end = new Date(data.clickData.dtEnd);
        		data.clickData.end = moment(end).format('YYYY-MM-DD');
    		} else
    			data.clickData.end = moment(start).format('YYYY-MM-DD');
    		
    		
        	caller.formView01.setRepeatUpdate(data.clickData);
    	}

    },
    REPEAT_UPDATE_SAVE: function (caller, act, data) {

        var getData = caller.formView01.getData();      
        var _url = "";
        var sendData = [];
        var returnData = {};
        
        axboot.ajax({
            type: "GET",
            url: "/api/v1/schedulerrepeat",
            data: {noSchedule: data.id},
            callback: function (res) {        
            	res.clickData = data;
            	res.getData = getData;
            	
            	if (getData.repeatUpdate == "THIS") {											//scheduler_repeat_change table insert

            		_url = "/api/v1/schedulerrepeatchange";
            		returnData = getRepeatUpdateThis(res)            		
            		
            	} else if (getData.repeatUpdate == "NEXT") {								//scheduler_repeat table의 dt_end_repeat column의 종료일을 현 dtStart에서 1day minus

            		returnData = getRepeatUpdateNext(res)    		
            		if (returnData.updateType == "ALL") {
                		_url = "/api/v1/scheduler";
                		returnData = ACTIONS.dispatch(ACTIONS.SET_SCHEDULER_DATA);
            		} else {
                		_url = "/api/v1/schedulerrepeat/updateNext";
                		returnData = returnData.data;

                    	sendData.url = _url;
                    	sendData.data = returnData;
                    	
                    	ACTIONS.dispatch(ACTIONS.REPEAT_UPDATE_DELETE_ACTION, sendData);        

                		_url = "/api/v1/scheduler";
                		returnData = ACTIONS.dispatch(ACTIONS.SET_SCHEDULER_DATA);         
                		returnData.noSchedule = null;
                	}
            		
            	} else if (getData.repeatUpdate == "ALL") {									//scheduler, scheduler_repeat 수정, scheduler_repeat_change table 삭제 (id(noSchedule))
            		_url = "/api/v1/scheduler";
            		returnData = ACTIONS.dispatch(ACTIONS.SET_SCHEDULER_DATA);
            	}

            	sendData.url = _url;
            	sendData.data = returnData;

            	ACTIONS.dispatch(ACTIONS.REPEAT_UPDATE_DELETE_ACTION, sendData);        
            	
            }
        });
        
    },
    REPEAT_UPDATE_DELETE_ACTION: function (caller, act, data) {
    	
        axboot.ajax({
            type: "PUT",
            url: data.url,
            data: JSON.stringify([data.data]),
            callback: function (res) {
//            	res.crud = "delete";
                ACTIONS.dispatch(ACTIONS.PAGE_CHOICE, res);
            }
        });
        
    },
    FORMVIEW_INIT: function (caller, act, data) {

        var $formView = $('#formView01');
        
//        console.log(data);
        
    	(function() {
    		$formView.find('[id="repeat-panel"]').attr("style", "display:none;");
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
//    		$formView.find('[id="tmStart"]').attr("disabled", "disabled");
//    		$formView.find('[id="tmEnd"]').attr("disabled", "disabled");
//    		$formView.find('[data-ax-path="day"]').attr("disabled", "disabled");
    		$formView.find('[data-ax-path="dtStartRepeat"]').attr("readonly", "readonly");
    	})();

        ACTIONS.dispatch(ACTIONS.HEAD_BUTTON_INIT, data);
        
    },
    HEAD_BUTTON_INIT: function(caller, act, data) {

        var $headView = $('#head-button');
        
        if (data.ynRepeat == "REPEAT"){
        	
        	$headView.find('[id="modal-button"]').attr("style", "display:none;");
        	$headView.find('[id="confirm-button"]').attr("style", "display:none;");
        	$headView.find('[id="repeat-detail-button"]').attr("style", "display:none;");

        	$headView.find('[id="repeat-button"]').attr("style", "display:block;");
        } else {

        	$headView.find('[id="modal-button"]').attr("style", "display:block;");
        	$headView.find('[id="confirm-button"]').attr("style", "display:none;");
        	$headView.find('[id="repeat-detail-button"]').attr("style", "display:none;");

        	$headView.find('[id="repeat-button"]').attr("style", "display:none;");
        }
        
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
    	if (!data.gap) {
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
    
//    console.log(clickData);
    
    _this.pageButtonView.initView(clickData);
	_this.formView01.initView(clickData);

};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
	
    initView: function (data) {

    	var clickData = data;
    	
 //   	console.log(clickData);
    	
        axboot.buttonClick(this, "data-page-btn", {
            "close": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            },
            "save": function () {
            	clickData.button = "save";
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE, clickData);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_DELETE, clickData);
            },
            "detail": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_DETAIL, clickData);
            },
            "cancel": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CANCEL, clickData);
            },
            "confirm": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CONFIRM, clickData);
            },
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

    	this.setInitRepeat();
        this.initEvent(data);

        this.setInitData(data);																				//modal화면 로링시 초기 데이터 set

        ACTIONS.dispatch(ACTIONS.FORMVIEW_INIT, data);
        
    },
    initEvent: function (data) {

        var _this = this;        
        var $formView = $('#formView01');
        
//        console.log(data);

        _this.target.find('[data-picker-date="date"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
            }
        });
        
        _this.model.onChange("allDay", function () {
        	
            if (this.value == "false") {
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
            } else {
//        		_this.setDataInit();
            	(function() {
            		$formView.find('[id="repeat-panel"]').attr("style", "display:none;");
            	})();
//        		ACTIONS.dispatch(ACTIONS.FORMVIEW_INIT, data);
//        		_this.setRepeatDataInit();
            }
        });

        if (data.ynRepeat == "REPEAT") {
        	
    		$formView.find('[id="ynRepeat"]').attr("disabled", "disabled");
        }
        	
        _this.model.onChange("repeatCycle", function () {

    		$formView.find('[id="repeat-panel"]').attr("style", "display:block;");
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
    	this.model.set("gap", "");
    	this.model.set("intervalCycle", "");
    	
    	this.setRepeatDataInit();
    	
    },
    setRepeatDataInit: function() {
    	this.model.set("day", "");
    	this.model.set("date", "");
    	this.model.set("dayDate", "");
    	this.model.set("repeatEnd", "");
    	this.model.set("repeatCount", "");
    	this.model.set("dtEndRepeat", "");
    },
    setInitData: function(data) {										

        /*********************************************************************************
         * modal화면 로링시 초기 데이터 set
         * 1. dayClick event와 eventClick event 처리
         * 2. '종일'인 경우와 아닌경우 처리 : 시작일, 시작시간, 종료일, 종료시간 처리 
         *      - dayClicke의 경우 month view에서 click 또는 week, day view에서 종일 부분 click시 '종일'로 처리-------> 날짜의 length로 구분
         *      - dayClick의 경우 week, day view에서 특정시간을 클릭시 '종일'이 아닌것으로 처리-------> 날짜의 length로 구분
         *      - eventClick의 경우 해당 시작일시, 종료일시를 display
         *********************************************************************************/
    	var clickInitData = [];
    	
        if (data.type == "day") {																							//dayClick의 경우 처리

    		if (data.dtStart.length == 10) 																				
    			clickInitData = setInitDayDateData(data);														//'종일'인경우
    		else 																														
    			clickInitData = setInitDayDateTimeData(data)    											//'종일'이 아닌경우		
    			
    		clickInitData.ynRepeat = "NONE";
        } else {																														//eventClick의 경우 처리
        	
        	if (data.allDay == true)
        		clickInitData = setInitDayDateData(data);														//eventClick시 '종일'인 경우는 dayClcik의 '종일'과 동일하게 처리
    		else 
    			clickInitData = setInitEventDateTimeData(data);
    		
        }
//        console.log(clickInitData);
        this.setInitClickValue(clickInitData);            
/*
    	if (data.ynRepeat == "REPEAT"){
    		ACTIONS.dispatch(ACTIONS.REPEAT_BASE_SEARCH, data.id);   
    	}
*/    	
    },
    setInitClickValue: function(data) {

 //   	console.log(data);
    	this.model.set("id", data.id);
    	this.model.set("title", data.title);
        this.model.set("dtStart", data.dtStart);        
    	this.model.set("dtEnd", data.dtEnd); 
    	
        this.model.set("dtStartRepeat", data.dtStart);    
        
        if (data.allDay == true)
        	this.model.set("allDay", "true");
        else
        	this.model.set("allDay", "false");
        
        this.model.set("ynRepeat", data.ynRepeat);
        this.model.set("memo", data.memo);
        
        this.setTime(data);
    },
    setTime: function(data) {
    	var tmStart = data.tmStart;
    	var tmEnd = data.tmEnd;
    	
    	if (data.tmStart) {
        	if (data.tmStart.length > 5) {
            	tmStart = data.tmStart.substr(0, 5);
            	tmEnd = data.tmEnd.substr(0, 5);
        	} 
    	}
    	
    	this.model.set("tmStart", tmStart);
    	this.model.set("tmEnd", tmEnd);
    },
    setInitRepeat: function() {    	
    	this.model.set("ynRepeat", "NONE");    	
    	this.model.set("repeatDelete", "THIS");    	
    	this.model.set("repeatUpdate", "THIS");    	
    },
    setRepeatUpdate: function(data) {    	
        this.model.set("dtStart", data.start);        
    	this.model.set("dtEnd", data.end); 

        this.setTime(data);
    },
    setRepeatData: function(data) {
    	
//    	console.log(data);
    	    	
    	this.model.set("repeatCycle", data.repeatCycle);
    	this.model.set("gap", data.gap);
    	this.model.set("dayDate", data.dayDate);
    	this.model.set("day", data.day);
    	this.model.set("dayCount", data.dayCount);
    	this.model.set("date", data.date);
    	this.model.set("month", data.month);
    	this.model.set("dtStartRepeat", data.scheduler.start);
    	this.model.set("repeatEnd", data.repeatEnd);
    	this.model.set("repeatCount", data.repeatCount);
    	this.model.set("dtEndRepeat", data.dtEndRepeat);
    	this.model.set("memo", data.scheduler.memo);

    },
    allDayChange(data, value){
    	
    	var time = [];
    	
    	if (value == "false"){
    		if (data.type == "day" && data.dtStart.length > 10)
    			time = setInitDayDateTimeData(data);
    		else if (data.type == "event" && data.allDay == false)
    			time = setInitEventDateTimeData(data);
    		else {
        		time.tmStart = "00:00";
        		time.tmEnd = "00:00";
    		}
    	} else {
    		time.tmStart = "00:00";
    		time.tmEnd = "00:00";
    	}
    	
		this.setTime(time);
		
    },
    setIntervalCycle: function(data) {
    	this.model.set("gap", "1");
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
    setRepeatDeleteUpdate: function(data) {
    	this.model.set("repeatDeleteUpdate", data);
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});


