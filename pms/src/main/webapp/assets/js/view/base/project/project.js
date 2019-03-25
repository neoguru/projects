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
        	
            var projectData = caller.formView01.getData();
            
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "PUT", 
                        url: "/api/v1/project", 
                        data: JSON.stringify([projectData]),
                        callback: function (res) {
                            ok(res);
                        	}
                    	});
                	})   
                .then(function (ok) {
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                    axToast.push("프로젝트 정보가 저장되었습니다!!");
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
                caller.gridView01.clearSelect();
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {
//        console.log(data);
        caller.formView01.setData(data);
    	
    },
    CUSTOMER_CLEAR: function (caller, act, data) {
    	
    	console.log(data);
    	if (data == "head") {
        	caller.searchView.setCustomerValue({
        		noCustomer: "", nmCustomer: ""
            });
    	} else if (data == "body"){
    		caller.formView01.setCustomerValue({
        		noCustomer: "", nmCustomer: ""
            });
    	}
    },
    CUSTOMER_MODAL: function (caller, act, data) {
    	var type = data;
    	
        axboot.modal.open({
            modalType: "CUSTOMER-MODAL",
            param: "",
            sendData: function(){
                return {
                };
            },
            callback: function (data) {
            	if (type == "head") {
                    caller.searchView.setCustomerValue({
                        noCustomer: data.noCustomer, 
                        nmCustomer: data.nmCustomer
                    });
            	} else if (type == "body") {
                    caller.formView01.setCustomerValue({
                        noCustomer: data.noCustomer, 
                        nmCustomer: data.nmCustomer
                    });
            	}
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
    	var type = data;
    	
        axboot.modal.open({
            modalType: "PARTNER-MODAL",
            param: "",
            sendData: function(){
                return {
                };
            },
            callback: function (data) {
                caller.formView01.setPartnerValue({
                	noPartner: data.noPartner, 
                	nmPartner: data.nmPartner
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

		this.headNmProject = $("#headNmProject");
		this.headNoCustomer = $("#headNoCustomer");
        
        this.initEvent();

        axboot.buttonClick(this, "data-search-view-01-btn", {
            "head-customer-clear": function () {
                ACTIONS.dispatch(ACTIONS.CUSTOMER_CLEAR, "head");
            }, 
        	"head-customer-modal": function () {
        		ACTIONS.dispatch(ACTIONS.CUSTOMER_MODAL, "head");
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
            "body-customer-clear": function () {
                ACTIONS.dispatch(ACTIONS.CUSTOMER_CLEAR, "body");
            }, 
        	"body-customer-modal": function () {
        		ACTIONS.dispatch(ACTIONS.CUSTOMER_MODAL, "body");
        	},
            "body-partner-clear": function () {
                ACTIONS.dispatch(ACTIONS.PARTNER_CLEAR)
            }, 
        	"body-partner-modal": function () {
        		ACTIONS.dispatch(ACTIONS.PARTNER_MODAL)
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
        
    },
    getData: function () {
    	    	
        var data = this.modelFormatter.getClearData(this.model.get()); // 모델의 값을 포멧팅 전 값으로 치환.
        
        return $.extend({}, data);
    },
    setData: function (data) {

        if (typeof data === "undefined") data = this.getDefaultData();
        data = $.extend({}, data);
        
        if (data.partner){
            this.model.set("nmPartner", data.partner.nmPartner);
        }
        
        this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
        
    },
    setCustomerValue: function (data) {
    	
        this.model.set("noCustomer", data.noCustomer);
        this.model.set("nmCustomer", data.nmCustomer);

    },
    setPartnerValue: function (data) {
    	
        this.model.set("noPartnerMain", data.noPartner);
        this.model.set("nmPartner", data.nmPartner);

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

