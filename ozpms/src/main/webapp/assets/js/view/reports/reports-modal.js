var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    PAGE_SEARCH: function (caller, act, data) {
    	console.log(data);
        axboot.ajax({
            type: "GET",
            url: "/api/v1/employee/report/employee_list",
            data: {file_name:data,
            		   noEmployee: SCRIPT_SESSION.noEmployee},
//            data: caller.pageStart.getData(),
            callback: function (res) {
            	console.log(res);
            	console.log(res.map.returnValue);         
            	
            	ACTIONS.dispatch(ACTIONS.VIEW_REPORT, res.map.returnValue);
            	/*
            	caller.reportView.setData({
                    data: res.map.returnValue
                });
                */
            }
        });
        return false;
    },

    VIEW_REPORT: function (caller, act, data) {

    	
    },    	
    PAGE_CHOICE: function (caller, act, data) {
        var list = caller.gridView01.getData("selected");
        if (list.length > 0) {
            if (parent && parent.axboot && parent.axboot.modal) {
                parent.axboot.modal.callback(list[0]);
            }
        } else {
        	
            axDialog.confirm({
            	title: "Confirm", 
               msg: LANG("ax.script.requireselect")
            }, function () {
            });  
			
//            alert(LANG("ax.script.requireselect"));
        }
    },
    ITEM_CLICK: function (caller, act, data) {
        ACTIONS.dispatch(ACTIONS.PAGE_CHOICE);
    },
    GRID_0_PAGING: function (caller, act, data) {
        caller.searchView.setPageNumber(data);
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
    /*
    var print_title = parent.axboot.modal.getData().print_title;
    var file_name = parent.axboot.modal.getData().file_name;
    var no_department = parent.axboot.modal.getData().no_department;
	*/
    var title = parent.axboot.modal.getData().print_title;
    var name = parent.axboot.modal.getData().file_name;
    
    if (name == "employee_list")
    	var parameter = parent.axboot.modal.getData().no_department;    
    else if (name == "employee")
    	var parameter = parent.axboot.modal.getData().no_employee;
       
    
    var noEmployee = SCRIPT_SESSION.noEmployee;

	(function() {
		document.getElementById("title").innerHTML = title;
	})();
    
    _this.pageButtonView.initView();
    _this.reportView.initView(name, parameter);
    
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH, file_name);

};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "close": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            }
        });
    }
});

//== view 시작
/**
 * report view
 */

fnObj.reportView = axboot.viewExtend(axboot.commonView, {

    initView: function (file_name, parameter) {
    	
//    	this.target = $("#report");

        console.log(file_name, "  ", parameter);
        
    	var iframe = document.getElementById("reportView");
    	
    	var url = "http://192.168.2.3:9090/birt/";
    	var format = "frameset?__report=";
    	var design = "bjmis/" + file_name + ".rptdesign";
    	
    	if (file_name == "employee_list") {    		
        	if (parameter) 
            	var parameter1 = "&pNoDepartment=" + parameter ;
        	else
        		var parameter1 = "&pNoDepartment=0";
    	} else if (file_name == "employee") {
        	if (parameter) 
            	var parameter1 = "&pNoEmployee=" + parameter ;
        	else
        		var parameter1 = "&pNoEmployee=0";
    	}
    	
//    	var size = " width=" + "'" + 100% + "'" + ", height=" + "'" + 500px + "'" + "'";
    	
    	var reportSrc = url + format + design + parameter1 ;
    	
    	iframe.src = reportSrc;
    	console.log(reportSrc);
    	 
        
    },
    
    setData: function (data) {
    	
    }
	
});
	




