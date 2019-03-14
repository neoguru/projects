var fnObj = {}, CODE = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/developer",
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
                caller.formView01.clear();
                
                caller.formView01.setInitValue();
                
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                }
            }
        });
        
		(function() {
			$("#formView01").find('[id="panel-free"]').attr("style", "display:block;");
			$("#formView01").find('[id="panel-partner"]').attr("style", "display:none;");
		})();
		
        return false;
    },
    PAGE_SAVE: function (caller, act, data) {
    	
        if (caller.formView01.validate()) {
            var developerData = caller.formView01.getData();

            developerData.noCompany = SCRIPT_SESSION.noCompany;
            
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "PUT", url: "/api/v1/developer", data: JSON.stringify([developerData]),
                        callback: function (res) {
                            ok(res);
                        	}
                    	});
                	})    
                .then(function (ok) {
                    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                	})
                .catch(function () {

                	});
        }

    },
    FORM_CLEAR: function (caller, act, data) {
        axDialog.confirm({
        	title: "Confirm", 
           msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {
//        console.log(data);
        caller.formView01.setData(data);
    },
    BODYPARTNERMODAL: function (caller, act, data) {
        axboot.modal.open({
            modalType: "PARTNER-MODAL",
            param: "",
            sendData: function(){
                return {
                    "sendData": "purchase"
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
			_this.gridView02.initView();
			
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
			
			this.headNmDeveloper = $("#headNmDeveloper");
			
			this.initEvent();

    },
  initEvent: function () {
	  		var _this = this;
    },
  getData: function () {
	  		return {
	  				pageNumber: this.pageNumber,
            pageSize: this.pageSize,

            headNmDeveloper: this.headNmDeveloper.val()
            
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
                {key: "noDeveloper", label: COL("noDeveloper"), width: 100, align: "center"},
                {key: "nmDeveloper", label: COL("nmDeveloper"), width: 120, align: "center"},
                {key: "dtJoin", label: COL("dtJoin"), width: 90, align: "center"}, 
                {key: "noMobile", label: COL("noMobile"), width: 100, align: "center"}
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
            "form-clear": function () {
                ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
            },
            "partnerModal": function () {
                ACTIONS.dispatch(ACTIONS.BODYPARTNERMODAL);
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
    initEvent: function () {
        var _this = this;
        this.setInitValue();
        
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
    setInitValue: function () {

        var date = Date.today(). toString("yyyy-MM-dd");
        this.model.set("dtJoin", date);
        
    },
    setPartnerData: function (data) {
    	
        this.model.set("nmPartner", data.nmPartner);

    },
    setPartnerValue: function (data) {
    	
        this.model.set("noPartner", data.noPartner);
        this.model.set("nmPartner", data.nmPartner);

    },
    setZipValue: function (data) {
        this.model.set("zipCode", data.zipcode);
        this.model.set("address", data.roadAddress);

    },
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
        	/*
            alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
            rs.error[0].jquery.focus();
            return false;
			*/
        	
            axDialog.confirm({
            	title: "Confirm", 
               msg: LANG("ax.script.form.validate",  rs.error[0].jquery.attr("title"))
            }, function () {
            });  
			
            rs.error[0].jquery.focus();
            return false;
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});


/**
 * gridView02 : 개발자 프로젝트 이력
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
                {key: "workplace.nmWorkplace", label: COL("nmProject"), width: 200, align: "left"},
                {key: "workplace.chief.nmEmployeeKor", label: COL("nmCustomer"), width: 150, align: "center"},
                {key: "workplace.workplaceContractList[0].dtComplete", label: COL("typeDeveloper"), width: 80, align: "center"},
                {key: "workplace.partner.nmPartner", label: COL("ax.admin.dtStart"), width: 90, align: "center"},            
                {key: "workplace.partner.nmPartner", label: COL("ax.admin.dtEnd"), width: 90, align: "center"},            
                {key: "workplace.partner.nmPartner", label: COL("ax.admin.cost"), width: 90, align: "right"},            
                {key: "workplace.address", label: COL("remark"), width: 300, align: "left"}
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

