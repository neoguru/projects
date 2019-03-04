var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {

        axboot.ajax({
            type: "GET",
            url: "/api/v1/scheduler",
            success: function(res){ 
            	return res; 
            }
        });

        return false;
    },
    PAGE_SAVE: function (caller, act, data) {
    },
    RESIZE: function (caller, act, data) {

    	var sendData = [];
        var saveData = {};
        
        saveData = getSaveData(data.event);        
        saveData.tmStart = data.event.tmStart;

		var end_date = new Date(data.event.end.format());
		saveData.tmEnd = fillZero(end_date.getHours(), 2) + ":" + fillZero(end_date.getMinutes(), 2) + ":" + "00";
		
		sendData.saveData = saveData;
		sendData.eventData = data; 		
        
		ACTIONS.dispatch(ACTIONS.RESIZE_DROP_SAVE, sendData);
		
    },
    DROP: function (caller, act, data) {

    	var sendData = [];
        var saveData = {};
                      
        saveData = getSaveData(data.event);
        
        if (data.event.allDay == false){
    		var start_date = new Date(data.event.start.format());
    		saveData.tmStart = fillZero(start_date.getHours(), 2) + ":" + fillZero(start_date.getMinutes(), 2) + ":" + "00";
        	if (!data.event.tmStart) {        		
        		saveData.tmEnd = fillZero((start_date.getHours() + 2), 2) + ":" + fillZero(start_date.getMinutes(), 2) + ":" + "00";
        	} else {
        		saveData.tmEnd = data.event.tmEnd;
//        		var end_date = new Date(data.event.end.format());
//        		saveData.tmEnd = fillZero(end_date.getHours(), 2) + ":" + fillZero(end_date.getMinutes(), 2) + ":" + "00";
        	}
        }

		sendData.saveData = saveData;
		sendData.eventData = data; 		

		ACTIONS.dispatch(ACTIONS.RESIZE_DROP_SAVE, sendData);
		
    },
    RESIZE_DROP_SAVE: function (caller, act, data) {

		if (data.eventData.event.ynRepeat == "NONE")
			ACTIONS.dispatch(ACTIONS.SAVE, data.saveData);
		else {
			data.saveData.noChange = data.eventData.event.noChange;
			data.saveData.originalStart = data.eventData.event.originalStart;
			data.saveData.typeChange = "CHANGE";
			
			var changeData = setRepeatChange(data);

			ACTIONS.dispatch(ACTIONS.REPEAT_SAVE, changeData);
		}
                
    },
    SAVE: function (caller, act, data) {

        var calendar = $("#calendar");
        
        axboot.ajax({
            type: "PUT", 
            url: "/api/v1/scheduler", 
            data: JSON.stringify([data]),
            callback: function (res) {
    			calendar.fullCalendar('refetchEvents');
    	        axToast.push("변경 되었습니다");
            }
        });
    },
    REPEAT_SAVE: function (caller, act, data) {

        var calendar = $("#calendar");
        
        axboot.ajax({
            type: "PUT", 
            url: "/api/v1/schedulerrepeatchange", 
            data: JSON.stringify([data]),
            callback: function (res) {
    			calendar.fullCalendar('refetchEvents');
    	        axToast.push("변경 되었습니다");
            }
        });
    },
    MODAL: function (caller, act, data) {

//    	console.log(data);
    	
        axboot.modal.open({
            modalType: "SCHEDULER-MODAL",
            param: "",
            sendData: function(){
                return {
                	clickData: data
                };
            },
            callback: function (res) {

                var calendar = $("#calendar");
        		calendar.fullCalendar('refetchEvents');
                
                this.close();
            }
        });
    	
    	
    	/*
    	if (data.type == "day" || (data.type == "event" && data.ynRepeat == "NONE")) {

            axboot.modal.open({
                modalType: "SCHEDULER-MODAL",
                param: "",
                sendData: function(){
                    return {
                    	clickData: data
                    };
                },
                callback: function (res) {

                    var calendar = $("#calendar");
                    
                    if (res.crud != "delete")
                    	res.id = res.noSchedule;
                    
            		calendar.fullCalendar('refetchEvents');
                    
                    this.close();
                }
            });
    	}
    	*/
    },
    ITEM_ADD: function (caller, act, data) {
        caller.gridView01.addRow();
    },
    ITEM_DEL: function (caller, act, data) {
        caller.gridView01.delRow("selected");
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
    
    _this.pageButtonView.initView();
    _this.calendarView.initView();

//    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
};

fnObj.pageResize = function () {

};


fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
            },
            "save": function () {
            },
            "excel": function () {

            }
        });
    }
});

/**
 * calendarView
 */
fnObj.calendarView = axboot.viewExtend(axboot.calendarView, {
	
    initView: function () {

    	var session_noEmp = SCRIPT_SESSION.noEmp;
        this.target = $(document["calendarView"]);
        var calendar = $("#calendar");

        calendar.fullCalendar({
			header: {
				left: 'prev,next, today', 
				center: 'title', 
				right: 'month,agendaWeek,agendaDay,listMonth'
			},
			height: 700,        
            defaultView: 'month',   
			defaultDate: moment(calendar.fullCalendar('getDate')).format('YYYY-MM-DD'),
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			eventLimit: true, // allow "more" link when too many events
            googleCalendarApiKey : "AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE",      // Google API KEY --> fullcalendar
            allDaySlot: true,
//            allDayDefault: true,
            	
			eventSources: [
				// 대한민국의 공휴일
                {
                      googleCalendarId : "ko.south_korea#holiday@group.v.calendar.google.com"
                    , className : "koHolidays"
//                    , color : "#FF4500"
//                    , textColor : "#FFFFFF"
                      , color : "#ECF0F5"
                      , textColor : "#FF0000"
                },
                
                {
        		    events: function(start, end, timezone, callback) {
        	            $.ajax({
        		            url: "/api/v1/scheduler",
        		            type: "GET",
        			        data: {
        			        	baseDate: moment(calendar.fullCalendar('getDate')).format('YYYY-MM-DD'),
        			        	noEmp: session_noEmp
        		    		},	
        	                dataType: 'json',
        	                success: function(data) {
        	                    var events = [];
        	                    
        	                    data.forEach(function(a){        	                    	
        	                    	var add = [];

        	                    	add.id = a.noSchedule;
        	                    	add.title = a.title;
        	                    	add.start = a.start;
        	                    	add.allDay = a.allDay;
        	                    	add.ynRepeat = a.ynRepeat;
        	                    	add.memo = a.memo;
        	                    	
        	                    	if (add.allDay == false){
        	                    		add.end = a.end;
        	                    		add.start = add.start.concat("T").concat(a.tmStart)
        	                    		add.end = a.end.concat("T").concat(a.tmEnd)
        	                    		add.tmStart = a.tmStart;
        	                    		add.tmEnd = a.tmEnd;
        	                    	}

            	                    events.push(add);
        	                    });
        	                    
        	                    callback(events);
                             }
        	            });
        		    }
                
                },
                
                {
        		    events: function(start, end, timezone, callback) {
        	            $.ajax({
        		            url: "/api/v1/schedulerrepeat",
        		            type: "GET",
        			        data: {
        			        	baseDate: moment(calendar.fullCalendar('getDate')).format('YYYY-MM-DD'),
        			        	noEmp: session_noEmp
        		    		},	
        	                dataType: 'json',
        	                success: function(data) {
        	                    var events = [];
        	                    
        	                    var dtBase = moment(calendar.fullCalendar('getDate')).format('YYYY-MM-DD');
	                    		events = schedule_repeat(dtBase, data);
	                    		
        	                    callback(events);
                             }
        	            });
        		    }                
                }
                
		    ],	
		    
			views: {
				agenda: {
					eventLimit: 4 // adjust to 6 only for agendaWeek/agendaDay
				}
			},
			
			buttonText: {
			    today : "오늘",
			    month : "월별",
			    week : "주별",
			    day : "일별",
				listMonth : "월별목록"
			 },
			 dayClick: function(date, jsEvent, view) {
				 
				 var data = [];
				 
				 data.type = "day";
				 data.dtStart = date.format();
				 data.viewName = view.name;
				 
 				ACTIONS.dispatch(ACTIONS.MODAL, data);
			    },
			    eventClick: function(calEvent, jsEvent, view) {

			    	var data = [];
			    	
					data.type = "event";
					data.id = calEvent.id;
					data.noChange = calEvent.noChange;
					data.title = calEvent.title;
					data.allDay = calEvent.allDay;
					data.ynRepeat = calEvent.ynRepeat;
					data.memo = calEvent.memo;
					data.dtStart = calEvent.start.format();
					if (calEvent.end)
						data.dtEnd = calEvent.end.format();

					if (data.allDay == false) {
						data.tmStart = calEvent.tmStart;
						data.tmEnd = calEvent.tmEnd;
					}
					
			    	data.viewName = view.name;

//			    	console.log(calEvent);
//			    	console.log(data);
			    	
	 				ACTIONS.dispatch(ACTIONS.MODAL, data);	 				

			    },
			    eventResize: function(event, delta, revertFunc) {

			    	var sendData = [];
			    	sendData.event = event;
			    	sendData.delta = delta;

			    	if (event.ynRepeat == "NONE") 
				    	var sendMessage = event.title + " 종료시간을 변경하시겠습니까?";
			    	else 
				    	var sendMessage = event.title + " 현재 일정의 종료시간만 변경합니다!";

			        axDialog.confirm({
			        	title: "Confirm",
			            msg: sendMessage
			        }, function () {
			            if (this.key == "ok") {
			            	ACTIONS.dispatch(ACTIONS.RESIZE, sendData);
			            } else {
				            revertFunc();
			            }
			        });			        
			    	
			    },
			    eventDrop: function(event, delta, revertFunc) {
			    	
			    	var sendData = [];
			    	sendData.event = event;
			    	sendData.delta = delta;

	            	ACTIONS.dispatch(ACTIONS.DROP, sendData);
	            	/*
			    	if (event.ynRepeat == "NONE") 
				    	var sendMessage = event.title + " 일정을 변경하시겠습니까?";
			    	else 
				    	var sendMessage = event.title + " 현재 일정만 변경합니다!";

			        axDialog.confirm({
			        	title: "Confirm",
			            msg: sendMessage
			        }, function () {
			            if (this.key == "ok") {
			            	ACTIONS.dispatch(ACTIONS.DROP, sendData);
			            } else {
				            revertFunc();
			            }
			        });
			        */
			    },			    
			    eventRender: function(event, element) {
			    	var bar = '<h2><b>'+event.title+'</b></h2>';
			    	var contents = 
			    							  '<h3><b>시작:</b> '+event.start.format()+'<br />' + 
											  (event.end && '<h3><b>종료:</b> '+event.end.format()+'</h3>' || '') + 
											  (event.memo && '<h3><b>비고:</b> '+event.memo+'</h3>' || '') ;											  
			    	
			        element.qtip({
//			        	content.title: title,
			        	content: {
			        		text: contents,
			        		title: bar
			        	},
			            style: {
			                classes: 'qtip-blue'
			            },			        	
			        	position: {
			        		at: 'bottom left'
			            }
			            
			        });
			    }
			    
		});
/*        
        //이전버튼 클릭시
        $('.fc-prev-button').click(function(){
//        	console.log(moment(calendar.fullCalendar('getDate')).format('YYYY-MM-DD'));
//        	   alert('prev is clicked, do something');
        });

        //다음버튼 클릭시
        $('.fc-next-button').click(function(){
//        	console.log(moment(calendar.fullCalendar('getDate')).format('YYYY-MM-DD'));
//        	   alert('nextis clicked, do something');
        });
*/        
    },
    setAddedData: function(data) {

//    	console.log(data);
        var calendar = $("#calendar");

        calendar.fullCalendar( 'addEventSource', [data]);
    	
    	//.fullCalendar( 'addEventSource', source )
    },
    setUpdatedData: function(data) {
    	
//    	console.log(data);
        var calendar = $("#calendar");

        calendar.fullCalendar( 'updateEvent', [data]);
    	
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            
            boardSearch: this.boardSearch.val(),
            searchWord: this.searchWord.val()
          
        }
    }
});



