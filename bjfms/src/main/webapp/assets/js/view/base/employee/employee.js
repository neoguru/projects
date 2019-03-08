var fnObj = {}, CODE = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/employee",
            data: caller.searchView.getData(),
            callback: function (res) {
            	console.log(res);
                caller.gridView01.setData(res);
                caller.formView01.clear();
                caller.formView02.clear();
                caller.gridView02.clear();   
                caller.gridView03.clear();     

                caller.formView01.setInitValue();
                caller.formView02.setInitValue();
//                var newDate = new Date();
//                caller.formView01.setInitDtJoinValue(newDate);

                ACTIONS.dispatch(ACTIONS.ROLE_GRID_DATA_INIT, {userCd: "", roleList: []});
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
//                    console.log(err);
                }
            }
        });
        
		(function() {
			$("#formView02").find('[data-form-view-02-btn="form02-save"]').attr("disabled", "disabled");
		})();
		
        return false;
    },
    FORM01_SAVE: function (caller, act, data) {
    	
        if (caller.formView01.validate()) {
            var employeeData = caller.formView01.getData();
            employeeData.ynWorkplace = "N";
            
//				console.log(empFpcodeList);
           axboot.promise()
           		.then(function (ok, fail, data) {
           			axboot.ajax({
           				type: "PUT", 
           				url: "/api/v1/employee", 
//           				data: JSON.stringify([employeeData]),
           				data: JSON.stringify(employeeData),
           				callback: function (res) {
           					ok(res);
           					}
           				});
           			})  
               	.then(function (ok) {
               		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                     axToast.push("사원정보가 저장 되었습니다");
               		})
               	.catch(function (){
               		
               		});
        }

    },
    FORM02_SAVE: function (caller, act, data) {

        if (caller.formView02.validate()) {
            var userData = caller.formView02.getData();
            
  //          console.log(userData);

            axboot.promise()
            		.then(function (ok, fail, data) {
            			axboot.ajax({
            				type: "PUT", url: "/api/v1/users", data: JSON.stringify([userData]),
            				callback: function (res) {
            					ok(res);
            					}
            				});
            		})             		
               	.then(function (ok) {
//               		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                    axToast.push("로그인정보가 저장 되었습니다");
               		})
                    	.catch(function (){
                       		
                   	});
        }
    },
    FORM01_CLEAR: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
            	ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
//                caller.formView01.clear();
//                caller.gridView02.clear();   
                
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {
//        caller.formView01.setData(data);    	

    	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/employee",
            data: {noEmployee: data.noEmployee},
            callback: function (res) {
            	console.log(res);
//            	console.log(res.employeeWorkplaceList); 
                caller.formView01.setData(res);
//                caller.gridView02.setData(res.employeeWorkplaceList);
                if (typeof res.user == "undefined") {
                	
                		caller.formView02.clear();
                		ACTIONS.dispatch(ACTIONS.ROLE_GRID_DATA_INIT, {userCd: "", roleList: []});
                		
                		var user = caller.formView02.getData();
                		user.noEmployee = res.noEmployee;
                		user.userNm = res.nmEmployeeKor;
                		caller.formView02.setData(user);
                } else {
                		caller.formView02.setData(res.user);
                  }
//                console.log(res);
            }
        });
	/*	
        axboot.ajax({
            type: "GET",
            url: "/api/v1/workplaceemployee",
            data: {noEmployee: data.noEmployee},
            callback: function (res) {
            	console.log(res); 
//                caller.formView01.setData(res);
                caller.gridView02.setData(res);
            }
        });
     */
    },
    LIST_PRINT_MODAL: function (caller, act, data) {
    	    	
    	axboot.modal.open({
            modalType: "EMPLOYEE-REPORT-MODAL",
            param: "",
            header: {title: LANG("ax.admin.print")},
            sendData: function(){
                return {
                	
                    "print_title": "사 원 목 록",
                    "file_name": "employee_list",
                    "no_department": caller.searchView.getData().headNoDepartment
                    
                };
            },
            callback: function (data) {
            	
                this.close();
            }
        });
       
    },
    PRINT_MODAL: function (caller, act, data) {
    	
    	if (caller.formView01.getData().noEmployee) {

        	axboot.modal.open({
                modalType: "EMPLOYEE-REPORT-MODAL",
                param: "",
                header: {title: LANG("ax.admin.print")},
                sendData: function(){
                    return {
                    	
                        "print_title": "사 원 정 보",
                        "file_name": "employee",
                        "no_employee": caller.formView01.getData().noEmployee
                        
                    };
                },
                callback: function (data) {
                	
                    this.close();
                }
            });
    	} else {

            axDialog.confirm({
            	title: "Confirm", 
               msg: "인쇄할 사원을 선택하세요!"
            }, function () {
              });  

    	}
    	 
       
    },
    ZIPFIND: function (caller, act, data) {
        axboot.modal.open({
            modalType: "ZIPCODE",
            param: "",
            header:{title: LANG("ax.script.address.finder.title")},
            sendData: function(){
                return {};
            },
            callback: function (data) {
                //{zipcodeData: data, zipcode: data.zonecode || data.postcode, roadAddress: fullRoadAddr, jibunAddress: data.jibunAddress}
                caller.formView01.setZipValue({
                    zipcode: data.zipcode, roadAddress: data.roadAddress, jibunAddress: data.jibunAddress
                });
                this.close();
            }
        });
    },
    ROLE_GRID_DATA_INIT: function (caller, act, data) {
        var list = [];
        CODE.userRole.forEach(function (n) {
            var item = {roleCd: n.roleCd, roleNm: n.roleNm, hasYn: "N", userCd: data.userCd};

            if (data && data.roleList) {
                data.roleList.forEach(function (r) {
                    if (item.roleCd == r.roleCd) {
                        item.hasYn = "Y";
                    }
                });
            }
            list.push(item);
        });

        caller.gridView03.setData(list);
    },
    ROLE_GRID_DATA_GET: function (caller, act, data) {
        return caller.gridView03.getData("Y");
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

    axboot
        .call({
            type: "GET",
            url: ["commonCodes"],
            data: {groupCd: "USER_ROLE", useYn: "Y"},
            callback: function (res) {
                var userRole = [];
                res.list.forEach(function (n) {
                    userRole.push({
                        value: n.code, text: n.name + "(" + n.code + ")",
                        roleCd: n.code, roleNm: n.name,
                        data: n
                    });
                });
                this.userRole = userRole;
            }
        })
        .done(function () {

            CODE = this; // this는 call을 통해 수집된 데이터들.
 
            _this.pageButtonView.initView();  
            _this.searchView.initView();
            _this.gridView01.initView();
            _this.gridView02.initView();
            _this.gridView03.initView();
            _this.formView01.initView();
            _this.formView02.initView();
           
            console.log(SCRIPT_SESSION);
            /* 
            switch (SCRIPT_SESSION.details.authGroup){
            
            	case "S0001":
            	case "S0002":
            	case "S0003":
            		break;
            	case "S0004":
            	case "S0005":
            		$("#formView01").find('[id="body-input-clear"]').attr("style", "display:none");
            		$("#formView01").find('[id="bodyEmployeeModal"]').attr("style", "display:none");
            		$("#formView03").find('[id="eduButton"]').attr("style", "display:none");
            		$("#formView04").find('[id="suretyButton"]').attr("style", "display:none");
            		$("#formView05").find('[id="pointButton"]').attr("style", "display:none");
            		break;
            	
            }
*/
            ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
        });
};

fnObj.pageResize = function () {

};


fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            },
            "save": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SAVE);
            }
        });
    }
});

//== view 시작
/**
 * searchView
 */
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    initView: function () {
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        
        this.headNoDepartment = $("#headNoDepartment");
        this.headNmEmployee = $("#headNmEmployee");
        this.headYnRetire = $("#headYnRetire");
                
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            
            headNoDepartment: this.headNoDepartment.val(),
            headNmEmployee: this.headNmEmployee.val(),
            headYnRetire: this.headYnRetire.val(),
            ynWorkplace: "N"
        }
    }
});


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showRowSelector: false,
            frozenColumnIndex: 0,
            sortable: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "nmEmployee", label: COL("employee.nmEmployee"), width: 80, align: "center"},
                {key: "noEmployee", label: COL("employee.noEmployee"), width: 80, align: "center"},
                /*
                {key: "noDepartment", label: COL("employee.department"), width: 80, align: "center",  formatter: function () {                	
                    return parent.DEPT_CODE.map[this.value]
                	}},  
                */
                {key: "noDepartment", label: COL("employee.department"), width: 0, align: "center"},  
                {key: "department.nmDepartment", label: COL("employee.department"), width: 80, align: "center"},  
                {key: "cdJobgroup", label: COL("employee.jobGroup"), width: 80, align: "center",  formatter: function () {                	
                    return parent.COMMON_CODE["CD_JOBGROUP"].map[this.value]
            		}},  
                {key: "dtJoin", label: COL("employee.dtJoin"), width: 90, align: "center"}, 
                {key: "ynRetire", label: COL("employee.ynRetire"), width: 80, align: "center",  formatter: function () {                	
                    return parent.COMMON_CODE["YN_RETIRE"].map[this.value]
                	}},  
                {key: "dtRetire", label: COL("employee.dtRetire"), width: 90, align: "center"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            }
        });
        
        axboot.buttonClick(this, "data-grid-view-01-btn", {
            "list-print": function () {
                ACTIONS.dispatch(ACTIONS.LIST_PRINT_MODAL);
            }
        });
        
        /*
        axboot.buttonClick(this, "data-grid-view-01-btn", {
            "add": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_ADD);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_DEL);
            }
        });
        */
    },
    setData: function (_data) {
        this.target.setData(_data);
    },
    setSendData: function (_data) {
    	
    },
    getData: function () {
        return this.target.getData();
    },
    align: function () {
        this.target.align();
    }
});


/**
 * formView01
 */
fnObj.formView01 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {
        });
    },
    initView: function () {
        this.target = $("#formView01");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작
        this.initEvent();

//        console.log(this.getDefaultData());
        axboot.buttonClick(this, "data-form-view-01-btn", {
            "form01-clear": function () {
                ACTIONS.dispatch(ACTIONS.FORM01_CLEAR);
            },
            "form01-save": function () {
                ACTIONS.dispatch(ACTIONS.FORM01_SAVE);
            },
            "form01-print": function () {
                ACTIONS.dispatch(ACTIONS.PRINT_MODAL);
            },
            "zipFind": function () {
                ACTIONS.dispatch(ACTIONS.ZIPFIND);
            },
        });

        this.target.find('[data-ax5picker="basic"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
              }
        });
        this.setNoRegistFormatter();
        this.setInitValue();
//        var newDate = ax5.util.date(new Date());
//        this.setInitDtJoinValue(newDate);
        
    },
    initEvent: function () {
        var _this = this;
        /*
        this.model.onChange("ynRetire", function () {
            if (this.value == "Y") {
                _this.target.find('[data-ax-path="dtRetire"]').removeAttr("disabled");
            } else {
                _this.target.find('[data-ax-path="dtRetire"]').attr("disabled", "disabled");
                _this.target.find('[data-ax-path="dtRetire"]').val("");
            }
        });
        */
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
    setNoRegistFormatter: function () {

        this.target.find('[data-ax5formatter-custom="noRegist"]').ax5formatter({
        	
        	pattern: "custom",
        	getEnterableKeyCodes: function (_opts) {
        		
        		var enterableKeyCodes = {
        			'189': '-'
                };
        		return jQuery.extend(enterableKeyCodes, ax5.ui.formatter.formatter.ctrlKeys, ax5.ui.formatter.formatter.numKeys);
        		
            },
            getPatternValue: function (_opts, optIdx, e, val, eType) {
            	val = _opts.value.replace(/\D/g, "");
            	var regExpPattern = /^([0-9]{6})\-?([0-9]{1,7})?.*$/,
            		returnValue = _opts.value.replace(regExpPattern, function (a, b) {
            			var nval = [arguments[1]];
            			if (arguments[2]) nval.push(arguments[2]);
            			return nval.join("-");
                });
//            	console.log(returnValue);
                return returnValue;
            }
        });

    },
    setInitValue: function () {
//        this.model.set("noDepartment", "100203");
/*        
        var date = new Date(); 
        var date = Date.today(). toISOString();
       
        var year = date.getFullYear(); 
        var month = new String(date.getMonth()+1); 
        var day = new String(date.getDate()); 

        // 한자리수일 경우 0을 채워준다. 
        if(month.length == 1){ 
          month = "0" + month; 
        } 
        if(day.length == 1){ 
          day = "0" + day; 
        } 
        
        var today = year + "-" + month + "-" + day;
        
        this.model.set("dtJoin", today);
*/
        var date = Date.today(). toString("yyyy-MM-dd");
        this.model.set("dtJoin", date);
        
    },
    setInitDtJoinValue: function (newDate) {
        this.model.set("dtJoin", newDate);
    },
    setZipValue: function (data) {
        this.model.set("zipCode", data.zipcode);
        this.model.set("address", data.roadAddress);

    },
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
//            alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));

            axDialog.confirm({
            	title: "Confirm", 
               msg: LANG("ax.script.form.validate", rs.error[0].jquery.attr("title"))
            }, function () {
              });  

            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
//        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});

/**
 * formView02
 */
fnObj.formView02 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {
        });
    },
    initView: function () {
        this.target = $("#formView02");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작
        this.initEvent();

        axboot.buttonClick(this, "data-form-view-02-btn", {
            "form02-save": function () {
                ACTIONS.dispatch(ACTIONS.FORM02_SAVE);
            }
        });

        this.setInitValue();
        
        ACTIONS.dispatch(ACTIONS.ROLE_GRID_DATA_INIT, {});

        switch (SCRIPT_SESSION.details.authGroup){
        
        	case "S0001":
        	case "S0002":
        	case "S0003":
        		break;
        	case "S0004":
        	case "S0005":
        		this.target.find('[data-ax-path="useYn"]').attr("disabled", "disabled");
        		this.target.find('[data-ax-path="userStatus"]').attr("disabled", "disabled");
        		this.target.find('[id="groupSetting"]').attr("style", "display:none");
        		break;
        	
        }
        
    },
    initEvent: function () {
        var _this = this;
        this.model.onChange("password_change", function () {
            if (this.value == "Y") {
                _this.target.find('[data-ax-path="userPs"]').removeAttr("readonly");
                _this.target.find('[data-ax-path="userPs_chk"]').removeAttr("readonly");
            } else {
                _this.target.find('[data-ax-path="userPs"]').attr("readonly", "readonly");
                _this.target.find('[data-ax-path="userPs_chk"]').attr("readonly", "readonly");
            }
        });
    },
    getData: function () {
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.

        data.authList = [];

        data.authList.push({
        	userCd: data.userCd,
        	grpAuthCd: data.grpAuthCd
        });
        data.roleList = ACTIONS.dispatch(ACTIONS.ROLE_GRID_DATA_GET);

        return $.extend({}, data);
    },
    setInitValue: function () {
        this.model.set("menuGrpCd", "USER");
        this.model.set("grpAuthCd", "S0004");
    },
    setData: function (data) {

        if (typeof data === "undefined") data = this.getDefaultData();
        data = $.extend({}, data);

//    		 console.log(data);
        if (data.authList[0].grpAuthCd) 
        		data.grpAuthCd = data.authList[0].grpAuthCd;
        
        ACTIONS.dispatch(ACTIONS.ROLE_GRID_DATA_INIT, {userCd: data.userCd, roleList: data.roleList});

//		 	 console.log(data.grpAuthCd);
        data.userPs = "";
        data.password_change = "";
        this.target.find('[data-ax-path="userPs"]').attr("readonly", "readonly");
        this.target.find('[data-ax-path="userPs_chk"]').attr("readonly", "readonly");
        
        this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경


    },
    validate: function () {
        var rs = this.model.validate();
        var isOk = true;
        
        if (rs.error) {
//            alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));

            axDialog.confirm({
            	title: "Confirm", 
               msg: LANG("ax.script.form.validate", rs.error[0].jquery.attr("title"))
            }, function () {
              });  

            rs.error[0].jquery.focus();
            return false;
        }
    	
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
    }
});


/**
 * gridView
 */
fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    initView: function () {

        var _this = this;

        this.target = axboot.gridBuilder({
            showLineNumber: true,
            showRowSelector: false,
            frozenColumnIndex: 0,
            sortable: true,
            multipleSelect: false,
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
                {key: "workplace.nmWorkplace", label: COL("workplace.nmWorkplace"), width: 250, align: "left"},
                {key: "workplace.chief.nmEmployeeKor", label: COL("workplace.noChief"), width: 80, align: "center"},
                {key: "workplace.partner.nmPartner", label: COL("partner.order"), width: 150, align: "center"},            
                {key: "workplace.workplaceContractList[0].dtStart", label: COL("contract.dtStart"), width: 100, align: "center"},
                {key: "workplace.workplaceContractList[0].dtComplete", label: COL("contract.dtComplete"), width: 100, align: "center"},
                {key: "workplace.address", label: COL("address.workplace"), width: 400, align: "left"}
            ],
             
            body: {
                onClick: function () {
                    //this.self.select(this.dindex);
                    //ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            }
        });

        axboot.buttonClick(this, "data-grid-view-02-btn", {
            "item-add": function () {
                this.addRow();
            },
            "item-remove": function () {
                this.delRow();
            }
        });
    },
    setData: function (_data) {
//    	console.log(_data);
        this.target.setData(_data);
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                delete this.deleted;
                return this.key;
            });
        } else {
            list = _list;
        }
        return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "first");
    }
});



/**
 * gridView
 */
fnObj.gridView03 = axboot.viewExtend(axboot.gridView, {
    initView: function () {

        var _this = this;
        this.target = axboot.gridBuilder({
            showLineNumber: false,
            showRowSelector: false,
            frozenColumnIndex: 0,
            sortable: false,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-03"]'),
            columns: [
                {key: "hasYn", label: COL("ax.admin.select"), width: 50, align: "center", editor: "checkYn"},
                {key: "roleCd", label: COL("ax.admin.user.role.code"), width: 150},
                {key: "roleNm", label: COL("ax.admin.user.role.name"), width: 180},
            ],
            body: {
                onClick: function () {
                    //this.self.select(this.dindex);
                    //ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            }
        });
    },
    setData: function (_data) {
        this.target.setData(_data);
    },
    getData: function (hasYn) {
        hasYn = hasYn || "Y";
        var list = ax5.util.filter(this.target.getList(), function () {
            return this.hasYn == hasYn;
        });
        return list;
    },
    align: function () {
        this.target.align();
    }
});