var fnObj = {}, CODE = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/developer",
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.formView01.clear();
                caller.formView02.clear();
                caller.gridView01.setData(res);
                
                caller.formView01.setInitValue();
                console.log(res);

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
    FORM01_SAVE: function (caller, act, data) {

        if (caller.formView01.validate()) {
        	
            var developerData = caller.formView01.getData();
            
            axboot.promise()
                .then(function (ok, fail, data) {
                    axboot.ajax({
                        type: "PUT", url: "/api/v1/developer", 
                        data: JSON.stringify([developerData]),
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
    FORM02_SAVE: function (caller, act, data) {
    	
    	var selectedData = caller.gridView01.getData("selected");
		if (selectedData.length == 0) {
				axDialog.confirm({
    				 title: "Confirm", 
    				 msg: "개발자를 선택하세요!!"
    			}, function () {
    			});  
    			return false;        			    		
		}
    	
        if (caller.formView02.validate()) {
        	
            var developerData = caller.formView02.getData();
            console.log(developerData);
            
         // 업종 bizArea
            var bizAreaList = [];
            if (developerData.bizArea) {
                if (developerData.bizArea.length > 0) {
                	developerData.bizArea.forEach(function (a) {
                		bizAreaList.push({
                			noDeveloper: selectedData[0].noDeveloper,
                			bizArea: a
                		});
                	});
                }
            }
         // 업종 상세 enterpriseArea
            var bizEnterpriseList = [];
            if (developerData.enterpriseArea) {
                if (developerData.enterpriseArea.length > 0) {
                	developerData.enterpriseArea.forEach(function (b) {
                		bizEnterpriseList.push({
                			noDeveloper: selectedData[0].noDeveloper,
                			enterpriseArea: b
                		});
                	});
                }
            }
         // 업종 상세 financeArea
            var bizFinanceList = [];
            if (developerData.financeArea) {
                if (developerData.financeArea.length > 0) {
                	developerData.financeArea.forEach(function (c) {
                		bizFinanceList.push({
                			noDeveloper: selectedData[0].noDeveloper,
                			financeArea: c
                		});
                	});
                }
            }
         //업무영역 enterprise
            var taskEnterpriseList = [];
            if (developerData.enterpriseTask) {
                if (developerData.enterpriseTask.length > 0) {
                	developerData.enterpriseTask.forEach(function (d) {
                		taskEnterpriseList.push({
                			noDeveloper: selectedData[0].noDeveloper,
                			enterpriseTask: d
                		});
                	});
                }
            }
         //업무영역 finance
            var taskFinanceList = [];
            if (developerData.financeTask) {
                if (developerData.financeTask.length > 0) {
                	developerData.financeTask.forEach(function (e) {
                		taskFinanceList.push({
                			noDeveloper: selectedData[0].noDeveloper,
                			financeTask: e
                		});
                	});
                }
            }
         //개발언어
            var devLangList = [];
            if (developerData.devLang) {
                if (developerData.devLang.length > 0) {
                	developerData.devLang.forEach(function (f) {
                		devLangList.push({
                			noDeveloper: selectedData[0].noDeveloper,
                			devLang: f
                		});
                	});
                }
            }	
         //개발프레임워크
            var devFrameList = [];
            if (developerData.devFrame) {
                if (developerData.devFrame.length > 0) {
                	developerData.devFrame.forEach(function (g) {
                		devFrameList.push({
                			noDeveloper: selectedData[0].noDeveloper,
                			devFrame: g
                		});
                	});
                }
         }
         //uiTool
         var uiToolList = [];
         if (developerData.uiTool) {
             if (developerData.uiTool.length > 0) {
             	developerData.uiTool.forEach(function (h) {
             		uiToolList.push({
             			noDeveloper: selectedData[0].noDeveloper,
             			uiTool: h
             		});
             	});
             }
         }
         //database
         var dbList = [];
         if (developerData.database) {
             if (developerData.database.length > 0) {
             	developerData.database.forEach(function (i) {
             		dbList.push({
             			noDeveloper: selectedData[0].noDeveloper,
             			devDb: i
             		});
             	});
             }
         }
         
         axboot.promise()
         	.then(function (ok, fail, data) {
         		axboot.ajax ({
         			type: "PUT",
         			url: "/api/v1/developerbizarea",
         			data: JSON.stringify(bizAreaList),
         			callback: function (res) {
         				ok(res);
         			}
         		});
         	})
         	.then(function (ok, fail, data) {
         		axboot.ajax ({
         			type: "PUT",
         			url: "/api/v1/developerbizenterprise",
         			data: JSON.stringify(bizEnterpriseList),
         			callback: function (res) {
         				ok(res);
         			}
         		});
         	})
         	.then(function (ok, fail, data) {
         		axboot.ajax ({
         			type: "PUT",
         			url: "/api/v1/developerbizfinance",
         			data: JSON.stringify(bizFinanceList),
         			callback: function (res) {
         				ok(res);
         			}
         		});
         	})
         	.then(function (ok, fail, data) {
         		axboot.ajax ({
         			type: "PUT",
         			url: "/api/v1/developertaskenterprise",
         			data: JSON.stringify(taskEnterpriseList),
         			callback: function (res) {
         				ok(res);
         			}
         		});
         	})
         	.then(function (ok, fail, data) {
         		axboot.ajax ({
         			type: "PUT",
         			url: "/api/v1/developertaskfinance",
         			data: JSON.stringify(taskFinanceList),
         			callback: function (res) {
         				ok(res);
         			}
         		});
         	})
         	.then(function (ok, fail, data) {
         		axboot.ajax ({
         			type: "PUT",
         			url: "/api/v1/developerdevlang",
         			data: JSON.stringify(devLangList),
         			callback: function (res) {
         				ok(res);
         			}
         		});
         	})
         	.then(function (ok, fail, data) {
         		axboot.ajax ({
         			type: "PUT",
         			url: "/api/v1/developerdevframe",
         			data: JSON.stringify(devFrameList),
         			callback: function (res) {
         				ok(res);
         			}
         		});
         	})
         	.then(function (ok, fail, data) {
         		axboot.ajax ({
         			type: "PUT",
         			url: "/api/v1/developerdevuitool",
         			data: JSON.stringify(uiToolList),
         			callback: function (res) {
         				ok(res);
         			}
         		});
         	})
         	.then(function (ok, fail, data) {
         		axboot.ajax ({
         			type: "PUT",
         			url: "/api/v1/developerdevdb",
         			data: JSON.stringify(dbList),
         			callback: function (res) {
         				ok(res);
         			}
         		});
         	})    
         	.then(function(ok){
         		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                axToast.push("개발자 상세정보가 저장 되었습니다");
         	})
         	.catch(function() {
         		
         	});
           
        }
    },
    ITEM_CLICK: function (caller, act, data) {
        console.log(data);
        caller.formView01.setData(data);
        caller.formView02.setData(data);
        
        if (data.ynLicense == "Y") {
    		(function() {
    			$("#formView01").find('[data-ax-path="nmLicense"]').removeAttr("readonly");
    			$("#formView01").find('[data-ax-path="nmLicense"]').attr({style:"border-color:Orange;"});
    		})();
        } else {
    		(function() {
    			$("#formView01").find('[data-ax-path="nmLicense"]').attr("readonly", "readonly");
    			$("#formView01").find('[data-ax-path="nmLicense"]').removeAttr("style");
    		})();
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
            _this.formView02.initView();

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

			this.initEvent();

			this.headNmDeveloper = $("#headNmDeveloper");
			this.headYnCareer = $("#headYnCareer");
			this.headYnLicense = $("#headYnLicense");
			
			this.headBizArea = $("#headBizArea");
			this.headEnterpriseArea = $("#headEnterpriseArea");
			this.headFinanceArea = $("#headFinanceArea");
			this.headEnterpriseTask = $("#headEnterpriseTask");
			this.headFinanceTask = $("#headFinanceTask");

			this.headDevLang = $("#headDevLang");
			this.headDevFrame = $("#headDevFrame");
			this.headUiTool = $("#headUiTool");
			this.headDb = $("#headDb");
			
    },
  initEvent: function () {
	  		var _this = this;
	  		
	  		this.model.onChange("headBizArea", function () {
	            if (this.value == "ENTERPRISE_AREA") {
	            	_this.target.find('[id="headBizAreaDetailEnterprise"]').attr("style", "display:block;");
	            	_this.target.find('[id="headBizAreaDetailFinance"]').attr("style", "display:none");
	            } else if (this.value == "FINANCE_AREA") {
	            	_this.target.find('[id="headBizAreaDetailEnterprise"]').attr("style", "display:none;");
	            	_this.target.find('[id="headBizAreaDetailFinance"]').attr("style", "display:block");
	            } else  {
	            	_this.target.find('[id="headBizAreaDetailEnterprise"]').attr("style", "display:none;");
	            	_this.target.find('[id="headBizAreaDetailFinance"]').attr("style", "display:none");
	            }
	        });
    },
  getData: function () {
	  		return {
	  				pageNumber: this.pageNumber,
	  				pageSize: this.pageSize,

	  				headNmDeveloper: this.headNmDeveloper.val(),
	  				headYnCareer: this.headYnCareer.val(),
	  				headYnLicense: this.headYnLicense.val(),

	  				headBizArea : this.headBizArea.val(),
	  				headEnterpriseArea :  this.headEnterpriseArea.val(),
	  				headFinanceArea : this.headFinanceArea.val(),
	  				headEnterpriseTask : this.headEnterpriseTask.val(),
	  				headFinanceTask : this.headFinanceTask.val(),

	  				headDevLang : this.headDevLang.val(),
	  				headDevFrame : this.headDevFrame.val(),
	  				headUiTool : this.headUiTool.val(),
	  				headDb :  this.headDb.val()
	  				
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
                {key: "noDeveloper", label: COL("noDeveloper"), width: 0, align: "center"},
                {key: "nmDeveloper", label: COL("nmDeveloper"), width: 100, align: "center"},
                {key: "noMobile", label: COL("noMobile"), width: 100, align: "center", formatter: "phone"},
                {key: "ynCareer", label: COL("ynCareer_1"), width: 80, align: "center",  formatter: function () {                	
                    return parent.COMMON_CODE["YES_NO"].map[this.value]
                }},  
                {key: "ynLicense", label: COL("ynLicense_1"), width: 80, align: "center",  formatter: function () {                	
                    return parent.COMMON_CODE["YES_NO"].map[this.value]
                }},  
                {key: "dtJoin", label: COL("dtRegist"), width: 90, align: "center"}
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
                ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
            },
            "form01-save": function () {
                ACTIONS.dispatch(ACTIONS.FORM01_SAVE);
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

        this.model.onChange("ynLicense", function () {
            if (this.value == "Y") {
                _this.target.find('[data-ax-path="nmLicense"]').removeAttr("readonly");
                _this.target.find('[data-ax-path="nmLicense"]').attr({style:"border-color:Orange;"});
            } else {
                _this.target.find('[data-ax-path="nmLicense"]').attr("readonly", "readonly");
                _this.target.find('[data-ax-path="nmLicense"]').removeAttr("style");
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
    setInitValue: function () {

        var date = Date.today(). toString("yyyy-MM-dd");
        this.model.set("dtJoin", date);
        
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
               msg: LANG("ax.script.form.validate",  rs.error[0].jquery.attr("title"))
            }, function () {
            });  
			
            rs.error[0].jquery.focus();
            return false;
        } else {
        	var getData = this.getData();
        	if (getData.ynLicense == "Y") {
        		if (!getData.nmLicense) {
        				 axDialog.confirm({
        					 title: "Confirm", 
        					 msg: "자격증명을 입력하세요!"
        				 }, function () {
        				 });  
        				 return false;        			
        		}
        	}
        }
        return true;
    },
    clear: function () {
        this.model.setModel(this.getDefaultData());
//        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
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

/**
 * formView02
 */
fnObj.formView02 = axboot.viewExtend(axboot.formView, {
    getDefaultData: function () {
        return $.extend({}, axboot.formView.defaultData, {
//        	customerPersonal: {},
//    		customerCorp: {}
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
        
//        console.log(data);
      // 업종 bizArea 
        if (data.bizAreaList) {
            data.bizArea = [];
            data.bizAreaList.forEach(function (a) {
            	data.bizArea.push(a.bizArea);
            });
        }
      // 업종상세 bizEnterprise
        if (data.bizEnterpriseList) {
            data.enterpriseArea = [];
            data.bizEnterpriseList.forEach(function (b) {
            	data.enterpriseArea.push(b.enterpriseArea);
            });
        }
      // 업종상세 bizFinance
        if (data.bizFinanceList) {
            data.financeArea = [];
            data.bizFinanceList.forEach(function (c) {
            	data.financeArea.push(c.financeArea);
            });
        }
      // 업무영역 taskEnterprise
        if (data.taskEnterpriseList) {
            data.enterpriseTask = [];
            data.taskEnterpriseList.forEach(function (d) {
            	data.enterpriseTask.push(d.enterpriseTask);
            });
        }
      // 업무영역 taskFinance
        if (data.taskFinanceList) {
            data.financeTask = [];
            data.taskFinanceList.forEach(function (e) {
            	data.financeTask.push(e.financeTask);
            });
        }
      // 개발언어  devLang 
        if (data.devLangList) {
            data.devLang = [];
            data.devLangList.forEach(function (f) {
            	data.devLang.push(f.devLang);
            });
        }
      // 개발프레임워크  devFrame 
        if (data.devFrameList) {
            data.devFrame = [];
            data.devFrameList.forEach(function (g) {
            	data.devFrame.push(g.devFrame);
            });
        }
      // uiTool  devUitool
        if (data.devUitoolList) {
            data.uiTool = [];
            data.devUitoolList.forEach(function (h) {
            	data.uiTool.push(h.uiTool);
            });
        }
      // database  devUitool
        if (data.devDbList) {
            data.database = [];
            data.devDbList.forEach(function (i) {
            	data.database.push(i.devDb);
            });
        }
        
        this.model.setModel(data);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
    },
    validate: function () {
    	
        var rs = this.model.validate();
        
        if (rs.error) {
        	
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
//        this.target.find('[data-ax-path="key"]').removeAttr("readonly");
    }
});

