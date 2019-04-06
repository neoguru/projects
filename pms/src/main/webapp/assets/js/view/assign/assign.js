var fnObj = {}, CODE = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/project",
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
                caller.formView01.clear();
                caller.gridView02.clear();
                
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
    PAGE_SAVE: function (caller, act, data) {
    	
    	var saveData = [].concat(caller.gridView02.getData());    	
    	saveData = saveData.concat(caller.gridView02.getData("deleted"));
    	
    	if (saveData.length > 0) {
    		
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "PUT", 
                        url: "/api/v1/assign", 
                        data: JSON.stringify(saveData),
                        callback: function (res) {
                            ok(res);
                        	}
                    	});
                })   
                .then(function (ok) {
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                    axToast.push("프로젝트 인원 배치정보가 저장되었습니다!!");
                })
                .catch(function () {

                });
        	
    	} else {
            axDialog.confirm({
            	title: "Confirm", 
               msg: "저장할 데이터가 없습니다!"
            }, function () {
            });  
    	}
    },
    CUSTOMER_CLEAR: function (caller, act, data) {

    	caller.searchView.setCustomerValue({
    		noCustomer: "", nmCustomer: ""
        });
    },
    CUSTOMER_MODAL: function (caller, act, data) {
    	
        axboot.modal.open({
            modalType: "CUSTOMER-MODAL",
            param: "",
            sendData: function(){
                return {
                };
            },
            callback: function (data) {
                caller.searchView.setCustomerValue({
                    noCustomer: data.noCustomer, 
                    nmCustomer: data.nmCustomer
                });
                this.close();
            }
        });
    },
    GET_FORM01_DATA: function (caller, act, data) {
    	return caller.formView01.getData();
    },
    FORM01_CLEAR: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                caller.formView01.clear();
                caller.gridView02.clearSelect();
//                caller.gridView01.clearSelect();
                $("#formView01Button").find('[data-form-view-01-btn="form01-add"]').removeAttr("disabled", "disabled");
                $("#formView01Button").find('[data-form-view-01-btn="form01-apply"]').attr("disabled", "disabled");
                $("#formView01Button").find('[data-form-view-01-btn="form01-del"]').attr("disabled", "disabled");
            }
        });
    },
    FORM01_ADD: function (caller, act, data) {
    	
    	if (caller.formView01.validate()) {
    		
    		var addData = caller.formView01.getData();
    		console.log(addData);
    		addData.noProject = caller.gridView01.getData("selected")[0].noProject;
    		
    		caller.gridView02.addRow();
    		caller.gridView02.updateRow(addData, 0);
        	caller.formView01.clear();

    	}
    	
    },
    FORM01_APPLY: function (caller, act, data) {
    	
    	var index = parseInt(caller.gridView02.getData("selected")[0].__index);
//    	console.log(index);
    	
    	if (caller.formView01.validate()) {    	
    		var updateData = caller.formView01.getData();    		
    		caller.gridView02.updateRow(updateData, index);    		
        	caller.formView01.clear();
    	}
    },
    FORM01_DEL: function (caller, act, data) {
    	caller.gridView02.delRow();
    	caller.formView01.clear();

        $("#formView01Button").find('[data-form-view-01-btn="form01-add"]').removeAttr("disabled", "disabled");
        $("#formView01Button").find('[data-form-view-01-btn="form01-apply"]').attr("disabled", "disabled");
        $("#formView01Button").find('[data-form-view-01-btn="form01-del"]').attr("disabled", "disabled");
    },
    VALIDATE_FORM01_SELECT: function(caller, act, data) {
    	
    	var validateData = caller.formView01.getData();
    	
    	if (!validateData.projectRole) {
            axDialog.confirm({
            	title: "Confirm", 
               msg: "프로젝트 담당역할을 선택하세요!"
            }, function () {
            });  
    		return false;
    	}
    	if (!validateData.projectTask) {
            axDialog.confirm({
            	title: "Confirm", 
               msg: "개발업무 담당영역을 선택하세요!"
            }, function () {
            });  
    		return false;
    	}
    	if (!validateData.typeDeveloper) {
            axDialog.confirm({
            	title: "Confirm", 
               msg: "개발자구분을 선택하세요!"
            }, function () {
            });  
    		return false;
    	}
    	if (validateData.typeDeveloper) {
    		if (validateData.typeDeveloper == "PTR") {
    			if (!validateData.noPartner) {
    	            axDialog.confirm({
    	            	title: "Confirm", 
    	               msg: "개발자 소속거래처를 선택하세요!"
    	            }, function () {
    	            });  
    	    		return false;
    			}
    		}
    	}
    	if (!validateData.inputGrade) {
            axDialog.confirm({
            	title: "Confirm", 
               msg: "개발자 투입등급을 선택하세요!"
            }, function () {
            });  
    		return false;
    	}
    	if (!validateData.typeAdjust) {
            axDialog.confirm({
            	title: "Confirm", 
               msg: "정산기준을 선택하세요!"
            }, function () {
            });  
    		return false;
    	}
    	if (!validateData.typePayment) {
            axDialog.confirm({
            	title: "Confirm", 
               msg: "지급유형을 선택하세요!"
            }, function () {
            });  
    		return false;
    	}
    	if (!validateData.targetPayment) {
            axDialog.confirm({
            	title: "Confirm", 
               msg: "지급예정일을 선택하세요!"
            }, function () {
            });  
    		return false;
    	}
    	return true;
    	
    },    
    SET_TARGETMM_VALUE: function (caller, act, data) {
    	
    	var targetMM = data.concat(" MM")
    	
    	caller.formView01.setTargetMmValue({
            mm: targetMM
        });
    },
    DEVELOPER_CLEAR: function (caller, act, data) {

    	caller.formView01.setDeveloperValue({
            noDeveloper: "", nmDeveloper: ""
        });
    },
    DEVELOPER_MODAL: function (caller, act, data) {
        axboot.modal.open({
            modalType: "DEVELOPER-MODAL",
            param: "",
            sendData: function(){
                return {
//                    "headNoDept": caller.searchView.getData().headNoDept
                };
            },
            callback: function (data) {
                caller.formView01.setDeveloperValue({
                    noDeveloper: data.noDeveloper, 
                    nmDeveloper: data.nmDeveloper,
                    ynContracted: data.ynContracted,
                    grade: data.grade,
                    cost: data.cost,
                    typeAdjust: data.typeAdjust,
                    typePayment: data.typePayment,
                    targetPayment: data.targetPayment
                });
                this.close();
            }
        });
    },
    PARTNER_CLEAR: function (caller, act, data) {

    	caller.formView01.setPartnerValue({
            noPartner: "", nmPartner: ""
        });
    },
    PARTNER_MODAL: function (caller, act, data) {
        axboot.modal.open({
            modalType: "PARTNER-MODAL",
            param: "",
            sendData: function(){
                return {
//                    "headNoDept": caller.searchView.getData().headNoDept
                };
            },
            callback: function (data) {
                caller.formView01.setPartnerValue({
                	noPartner: data.noPartner, nmPartner: data.nmPartner
                });
                this.close();
            }
        });
    },
    GRID01_CLICK: function (caller, act, data) {
        console.log(data);
        caller.formView01.clear();
        caller.gridView02.clearSelect();
        caller.gridView02.setData(data.assignList);
        
        $("#formView01Button").find('[data-form-view-01-btn="form01-clear"]').removeAttr("disabled", "disabled");
        $("#formView01Button").find('[data-form-view-01-btn="form01-add"]').removeAttr("disabled", "disabled");
        $("#formView01Button").find('[data-form-view-01-btn="form01-apply"]').attr("disabled", "disabled");
        $("#formView01Button").find('[data-form-view-01-btn="form01-del"]').attr("disabled", "disabled");
    	
    },
    GRID02_CLICK: function (caller, act, data) {
      console.log(data);
//      caller.formView01.setData(data);
      caller.formView01.setData(data);
      
      $("#formView01Button").find('[data-form-view-01-btn="form01-apply"]').removeAttr("disabled", "disabled");
      $("#formView01Button").find('[data-form-view-01-btn="form01-del"]').removeAttr("disabled", "disabled");
      $("#formView01Button").find('[data-form-view-01-btn="form01-clear"]').removeAttr("disabled", "disabled");
      $("#formView01Button").find('[data-form-view-01-btn="form01-add"]').attr("disabled", "disabled");
  	
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

fnObj.pageStart = function () {
    var _this = this;

    axboot.promise()
        .then(function (ok) {
            _this.pageButtonView.initView();
            _this.searchView.initView();
            _this.gridView01.initView();
            _this.gridView02.initView();
            _this.formView01.initView();
            
            $("#formView01Button").find('[data-form-view-01-btn="form01-clear"]').attr("disabled", "disabled");
            $("#formView01Button").find('[data-form-view-01-btn="form01-add"]').attr("disabled", "disabled");
            $("#formView01Button").find('[data-form-view-01-btn="form01-apply"]').attr("disabled", "disabled");
            $("#formView01Button").find('[data-form-view-01-btn="form01-del"]').attr("disabled", "disabled");

            ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
        })
        .catch(function () {

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
            },
            "excel": function () {

            }
        });
    }
});

//== view 시작
/**
 * searchView
 */
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    getDefaultData: function () {
        return $.extend({}, axboot.searchView.defaultData, {});
    },
    initView: function () {
        this.target = $(document["searchView0"]);
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");

		this.headNmProject = $("#headNmProject");
		this.headNoCustomer = $("#headNoCustomer");
        
        this.initEvent();

        axboot.buttonClick(this, "data-search-view-01-btn", {
            "head-customer-clear": function () {
                ACTIONS.dispatch(ACTIONS.CUSTOMER_CLEAR);
            }, 
        	"head-customer-modal": function () {
        		ACTIONS.dispatch(ACTIONS.CUSTOMER_MODAL);
        	}
        });
    },
    initEvent: function () {
        var _this = this;
    },
    setCustomerValue: function (data) {
    	
        this.model.set("headNoCustomer", data.noCustomer);
        this.model.set("headNmCustomer", data.nmCustomer);

    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,

            headNmProject: this.headNmProject.val(),
            headNoCustomer: this.headNoCustomer.val()
            
        }
    }
});

/**
 * gridView01
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
    initView: function () {
        var _this = this;

        this.target = axboot.gridBuilder({
            showLineNumber: true,
            showRowSelector: false,
            frozenColumnIndex: 0,
            sortable: true,
            multipleSelect: false,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "noProject", label: COL("noProject"), width: 0, align: "center"},
                {key: "nmProject", label: COL("nmProject"), width: 140, align: "center"},
                {key: "customer.nmCustomer", label: COL("nmCustomer"), width: 120, align: "center"},
                {key: "dtStart", label: COL("dtStart"), width: 90, align: "center"},
                {key: "dtEnd", label: COL("ax.admin.dtEnd"), width: 90, align: "center"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.GRID01_CLICK, this.item);
                }
            },
            onPageChange: function (pageNumber) {
                _this.setPageData({pageNumber: pageNumber});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });

    },
    setData: function (_data) {
        this.target.setData(_data);
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                return this.key;
            });
        } else {
            list = _list;
        }
        return list;
    },
    clearSelect: function() {
    	this.target.clearSelect();
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "first");
    }
});

/**
 * formView01
 */
fnObj.formView01 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {
//        	customerPersonal: {},
//    		customerCorp: {}
        });
    },
    initView: function () {
    	
        this.target = $("#formView01");
        this.model = new ax5.ui.binder();
        this.model.setModel(this.getDefaultData(), this.target);
        this.modelFormatter = new axboot.modelFormatter(this.model); // 모델 포메터 시작
        this.initEvent();

        axboot.buttonClick(this, "data-form-view-01-btn", {
            "form01-clear": function () {
            	ACTIONS.dispatch(ACTIONS.FORM01_CLEAR);
            },
            "form01-add": function () {
            	ACTIONS.dispatch(ACTIONS.FORM01_ADD);
            },
            "form01-apply": function () {
            	ACTIONS.dispatch(ACTIONS.FORM01_APPLY);
            },
            "form01-del": function () {
            	ACTIONS.dispatch(ACTIONS.FORM01_DEL);
            },
            "body-developer-clear": function () {
                ACTIONS.dispatch(ACTIONS.DEVELOPER_CLEAR);
            },
            "body-developer-modal": function () {																
                ACTIONS.dispatch(ACTIONS.DEVELOPER_MODAL);
            },
            "body-partner-clear": function () {
                ACTIONS.dispatch(ACTIONS.PARTNER_CLEAR);
            },
            "body-partner-modal": function () {																
                ACTIONS.dispatch(ACTIONS.PARTNER_MODAL);
            }
        });

        this.target.find('[data-ax5picker="basic"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
              }
        });

    },
    initEvent: function () {
        var _this = this;

  		this.model.onChange("typeDeveloper", function () {
            if (this.value == "PARTNER") {
            	_this.target.find('[id="noPartner"]').attr("style", "border-color:Orange;");
            	_this.target.find('[id="nmPartner"]').attr("style", "border-color:Orange;");
            	_this.target.find('[id="bodyPartnerModal"]').attr("style", "border-color:Orange;");
            	_this.target.find('[id="bodyPartnerModal"]').removeAttr("disabled");
            	_this.target.find('[id="bodyPartnerErase"]').removeAttr("disabled");
            } else  {
            	_this.target.find('[id="noPartner"]').removeAttr("style", "border-color:Orange;");
            	_this.target.find('[id="nmPartner"]').removeAttr("style", "border-color:Orange;");
            	_this.target.find('[id="bodyPartnerModal"]').removeAttr("style", "border-color:Orange;");
            	_this.target.find('[id="bodyPartnerModal"]').attr("disabled", "disabled");
            	_this.target.find('[id="bodyPartnerErase"]').attr("disabled", "disabled");
            }
        });
  		
  		this.model.onChange("dtInput", function () {
  			
  			var data = ACTIONS.dispatch(ACTIONS.GET_FORM01_DATA);
  			if (data.dtTarget) {
  	  			var dtInput = new Date(this.value);
  	  			var dtTarget = new Date(data.dtTarget);  	  			
  				if (dtTarget.compareTo(dtInput) == 1) {
  					ACTIONS.dispatch(ACTIONS.SET_TARGETMM_VALUE, getMM(dtInput, dtTarget));
  				}
  			}
  		});

  		this.model.onChange("dtTarget", function () {
  			
  			var data = ACTIONS.dispatch(ACTIONS.GET_FORM01_DATA);
  			if (data.dtInput) {
  	  			var dtTarget = new Date(this.value);
  	  			var dtInput = new Date(data.dtInput);  	  			
  				if (dtTarget.compareTo(dtInput) == 1) {
  					ACTIONS.dispatch(ACTIONS.SET_TARGETMM_VALUE, getMM(dtInput, dtTarget));
  				}
  			}
  		});

  		this.model.onChange("typeAdjust", function () {
  			
  			var data = ACTIONS.dispatch(ACTIONS.GET_FORM01_DATA);
  			if (data.typePayment) {
  	  			var dtTarget = new Date(this.value);
  	  			var dtInput = new Date(data.dtInput);  	  			
  				if (dtTarget.compareTo(dtInput) == 1) {
  					ACTIONS.dispatch(ACTIONS.SET_TARGETMM_VALUE, getMM(dtInput, dtTarget));
  				}
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
    setDeveloperValue: function (data) {    	

        this.model.set("noDeveloper", data.noDeveloper);
        this.model.set("nmDeveloper", data.nmDeveloper);
        if (data.ynContracted == "Y") {
        	this.model.set("typeDeveloper", "CONTRACTED");
        	this.model.set("inputGrade", data.grade);
        	this.model.set("costInput", data.cost);
        	this.model.set("typeAdjust", data.typeAdjust);
        	this.model.set("typePayment", data.typePayment);
        	this.model.set("targetPayment", data.targetPayment);
        }
    },
    setPartnerValue: function (data) {    	
        this.model.set("noPartner", data.noPartner);
        this.model.set("nmPartner", data.nmPartner);
    },
    setTargetMmValue: function (data) {    	
        this.model.set("targetMm", data.mm);
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

    	isOk = ACTIONS.dispatch(ACTIONS.VALIDATE_FORM01_SELECT); 
    	
    	if (isOk == false){
        	return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
//        this.setInitValue();
//        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});

/**
 * gridView02
 */
fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 10
    },
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
                {key: "noAssign", label: COL("noAssign"), width: 0, align: "center"},
                {key: "noProject", label: COL("noProject"), width: 0, align: "center"},
                {key: "noDeveloper", label: COL("noCharge"), width: 0, align: "center"},
                {key: "nmDeveloper", label: COL("nmDeveloper"), width: 100, align: "center"},
                {key: "typeDeveloper", label: COL("typeDeveloper"), width: 80, align: "center",  formatter: function () {                	
                    return parent.COMMON_CODE["TYPE_DEVELOPER"].map[this.value]
                }},  
                {key: "nmPartner", label: COL("nmPartner"), width: 100, align: "center"},
                {key: "projectRole", label: COL("ax.admin.role"), width: 100, align: "center",  formatter: function () {                	
                    return parent.COMMON_CODE["PROJECT_ROLE"].map[this.value]
                }},  
                {key: "projectTask", label: COL("ax.admin.task"), width: 100, align: "center",  formatter: function () {                	
                    return parent.COMMON_CODE["PROJECT_TASK"].map[this.value]
                }},  
                {key: "dtInput", label: COL("dtInput"), width: 90, align: "center"},
                {key: "dtTarget", label: COL("dtTarget"), width: 90, align: "center"},
                {key: "targetMm", label: COL("targetMM"), width: 100, align: "center"},
                {key: "costInput", label: COL("cost.input"), width: 100, align: "right", formatter:"money"},
                {key: "remark", label: COL("remark"), width: 200, editor: "text"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.GRID02_CLICK, this.item);
                }
            }
        });

    },
    setData: function (_data) {

    	console.log(_data);
    	_data.forEach(function(a) {
    		a.nmDeveloper = a.developer.nmDeveloper;
    		if (a.partner) {
    			a.nmPartner = a.partner.nmPartner;
    		}
    	});
    	console.log(_data);
        this.target.setData(_data);
    },
    getData: function (_type) {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                return this.noAssign;
            });
        } else {
            list = _list;
        }
        return list;
    },
    clearSelect: function() {
    	this.target.clearSelect();
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "first");
    },
    updateRow: function (_data, _index) {
        this.target.updateRow(_data, _index);
    }
});

