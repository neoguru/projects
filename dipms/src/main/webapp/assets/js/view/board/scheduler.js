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
	/*
    PAGE_SEARCH: function (caller, act, data) {
    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/scheduler",
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
                caller.formView01.clear();
                caller.formView04.clear();
                caller.gridView02.clear();
                caller.gridView03.clear();
                caller.gridView04.clear();
                               
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                }
            }
        });

        return false;
    },
    */
    PAGE_SAVE: function (caller, act, data) {
        var saveList = [].concat(caller.gridView01.getData("modified"));
        saveList = saveList.concat(caller.gridView01.getData("deleted"));

        axboot.ajax({
            type: "PUT",
            url: ["samples", "parent"],
            data: JSON.stringify(saveList),
            callback: function (res) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                axToast.push("저장 되었습니다");
            }
        });
    },
    MODAL: function (caller, act, data) {

        axboot.modal.open({
            modalType: "SCHEDULER-MODAL",
            param: "",
            sendData: function(){
                return {
                	clickData: data
                };
            },
            callback: function (data) {
            	
            	//callback로 modal서 받은 데이터를 calendar의 events에 display하는 루틴을 추가.....
            	caller.calendarView.setAddedData(data);
            	/*
                caller.formView.setSaveValue({
                    noCustomer: data.noCustomer, noInsurant: data.noInsurant, nmInsurant: data.nmInsurant
                });
                */
                this.close();
            }
        });
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
                    , color : "#FF0000"
                    , textColor : "#FFFFFF"
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
        	                    console.log(data);
        	                    console.log(typeof(data));
        	                    
        	                    data.forEach(function(a){
        	                    	var add = [];
        	                    	add.id = a.noSchedule;
        	                    	add.title = a.title;
        	                    	add.start = a.start;
        	                    	add.allDay = a.allDay;
        	                    	if (add.allDay == "FALSE"){
        	                    		add.end = a.end;
        	                    		add.start = add.start.concat("T").concat(a.tmStart)
        	                    		add.end = a.end.concat("T").concat(a.tmEnd)
        	                    	}
        	                    	events.push(add);
//        	                    	console.log(a);
        	                    });
        	                    
        	                    console.log(events);
        	                    callback(events);
                             }
        	             
        	            });
        		    }
                }  
		    ],	
			views: {
				agenda: {
					eventLimit: 6 // adjust to 6 only for agendaWeek/agendaDay
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
				 
				 console.log(data);

 				ACTIONS.dispatch(ACTIONS.MODAL, data);
			    },
			    eventClick: function(event, jsEvent, view) {

			    	var data = [];
			    	
					data.type = "event";
					data.id = event.id;
					data.title = event.title;
					data.allDay = event.allDay;
					data.dtStart = event.start;
					data.dtEnd = event.end;
					
			    	data.viewName = view.name;

					 console.log(data);
	 				ACTIONS.dispatch(ACTIONS.MODAL, data);
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

    	console.log(data);
        var calendar = $("#calendar");

        calendar.fullCalendar( 'addEventSource', [data]);
    	
    	//.fullCalendar( 'addEventSource', source )
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



