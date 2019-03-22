var fnObj = {}, CODE = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/request",
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
    	
        if (caller.formView01.validate()) {
        	
            var partnerData = caller.formView01.getData();
            var chargeListq = [].concat(caller.gridView02.getData());
            chargeListq = chargeListq.concat(caller.gridView02.getData("deleted"));
            
            partnerData.chargeListq = chargeListq;
           
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "PUT", 
                        url: "/api/v1/partner", 
                        data: JSON.stringify([partnerData]),
                        callback: function (res) {
                            ok(res);
                        	}
                    	});
                	})   
                .then(function (ok) {
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                    axToast.push("거래처 정보가 저장되었습니다!!");
                	})
                .catch(function () {

                	});
        }

    },
    FORM01_CLEAR: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                caller.formView01.clear();
                caller.gridView02.clear();
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {
//        console.log(data);
        caller.formView01.setData(data);
        caller.gridView02.setData(data.chargeList);
    	
    },
    HEAD_PARTNER_CLEAR: function (caller, act, data) {
    	
    	caller.searchView.setHeadPartnerValue({
    		headNoPartner: "", headNmPartner: ""
        });
    },
    HEAD_PARTNER_MODAL: function (caller, act, data) {
        axboot.modal.open({
            modalType: "PARTNER-MODAL",
            param: "",
            sendData: function(){
                return {
                };
            },
            callback: function (data) {
            	
                caller.searchView.setHeadPartnerValue({
                    headNoPartner: data.noPartner, 
                    headNmPartner: data.nmPartner
                });
                this.close();
            }
        });
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

		this.headNoPartner = $("#headNoPartner");
		this.headNoProject = $("#headNoProject");
        
        this.initEvent();

        axboot.buttonClick(this, "data-search-view-01-btn", {
            "head-partner-clear": function () {
                ACTIONS.dispatch(ACTIONS.HEAD_PARTNER_CLEAR);
            }, 
        	"head-partner-modal": function () {
        		ACTIONS.dispatch(ACTIONS.HEAD_PARTNER_MODAL);
        	},
            "head-project-clear": function () {
                ACTIONS.dispatch(ACTIONS.HEAD_PROJECT_CLEAR);
            }, 
        	"head-project-modal": function () {
        		ACTIONS.dispatch(ACTIONS.HEAD_PROJECT_MODAL);
        	}
        });
    },
    initEvent: function () {
        var _this = this;
    },
    setHeadPartnerValue: function (data) {
    	
        this.model.set("headNoPartner", data.headNoPartner);
        this.model.set("headNmPartner", data.headNmPartner);

    },
    setHeadProjectValue: function (data) {
    	
        this.model.set("headNoProject", data.headNoProject);
        this.model.set("headNmProject", data.headNmProject);

    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,

            headNoPartner: this.headNoPartner.val(),
            headNoProject: this.headNoProject.val()
            
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
                {key: "partner.nmPartner", label: COL("nmPartner"), width: 100, align: "center"},
                {key: "project.nmProject", label: COL("nmProject"), width: 140, align: "center"},
                {key: "dtRequest", label: COL("dtRequest"), width: 100, align: "center"},
                {key: "place", label: COL("place"), width: 300}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
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
            "zipFind": function () {
                ACTIONS.dispatch(ACTIONS.ZIPFIND);
            }
        });
        
        this.target.find('[data-ax5picker="basic"]').ax5picker({
            direction: "auto",
            content: {
                type: 'date'
            }
        });

        this.target.find('[data-ax5formatter-custom="noCorp"]').ax5formatter({
        	
        	pattern: "custom",
        	getEnterableKeyCodes: function (_opts) {
//        		console.log(this);
        		
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
    initEvent: function () {
        var _this = this;
        
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
    setZipValue: function (data) {
        this.model.set("zipCode", data.zipcode);
        this.model.set("address", data.roadAddress);

    },
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
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
                {key: "grade", label: COL("grade"), width: 80, align: "center", formatter: function () {
                    return parent.COMMON_CODE["GRADE"].map[this.value]}, editor: {
                        type: "select", config: {
                            columnKeys: {
                                optionValue: "code", optionText: "name"
                              	},
                            options: parent.COMMON_CODE["GRADE"]
                           	}	
                    }
                },
                {key: "task", label: COL("task"), width: 100, align: "center", formatter: function () {
                    return parent.COMMON_CODE["TASK"].map[this.value]}, editor: {
                        type: "select", config: {
                            columnKeys: {
                                optionValue: "code", optionText: "name"
                              	},
                            options: parent.COMMON_CODE["TASK"]
                           	}	
                    }
                },
                {key: "headCount", label: COL("request.headCount"), width: 80, align: "center", editor: {type: "text"}},
                {key: "costRequest", label: COL("request.cost"), width: 100, formatter: "money", align: "center", editor: {type: "money"}},
                {key: "dtStart", label: COL("request.dtStart"), width: 100, align: "center", editor: {type: "date"}},
                {key: "dtEnd", label: COL("request.dtEnd"), width: 100, align: "center", editor: {type: "date"}},
                {key: "inputMm", label: COL("request.inputMM"), width: 100, align: "center", editor: {type: "money"}},
                {key: "ynFinish", label: COL("request.ynFinish"), width: 100, align: "center", formatter: function () {
                    return parent.COMMON_CODE["YN_FINISH"].map[this.value]}, editor: {
                        type: "select", config: {
                            columnKeys: {
                                optionValue: "code", optionText: "name"
                              	},
                            options: parent.COMMON_CODE["YN_FINISH"]
                           	}	
                    }
                },
                {key: "remark", label: COL("remark"), width: 300,editor: {type: "text"}}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                }
            }
        });

        axboot.buttonClick(this, "data-grid-view-02-btn", {
            "gridView02-add": function () {
                this.addRow();
            },
            "gridView02-del": function () {
                this.delRow("selected");
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
                return this.noCharge;
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



