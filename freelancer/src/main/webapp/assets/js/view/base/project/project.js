var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/project",
            data: caller.searchView.getData(),
            callback: function (res) {
                caller.gridView01.setData(res);
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
    	    	
    	var isOk = false;
        var saveList = [].concat(caller.gridView01.getData());
        saveList = saveList.concat(caller.gridView01.getData("deleted"));
        
        if (saveList.length == 0) {
			axDialog.confirm({
				 title: "Confirm", 
				 msg: "저장할 프로젝트 정보를 입력하세요!!"
			}, function () {
			});  
			return false;        			    		
        }
        // saveList validation : 필수입력필드 validation        
        isOk = saveList.some(function (a) {
        	if ((a.nmProject == null) || (a.nmCustomer == null)) {        		
        		console.log("aaaaaaaaaaaa");
        		return ;
        	}
        });
        if (isOk) {
			axDialog.confirm({
				 title: "Confirm", 
				 msg: "프로젝트명과 고객명은 필수입력사항 입니다.!!"
			}, function () {
			});  
			return false;
        }
        
        axboot.ajax({
            type: "PUT",
            url: "/api/v1/project",
            data: JSON.stringify(saveList),
            callback: function (res) {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                axToast.push("저장 되었습니다");
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {

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

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    this.pageButtonView.initView();
    this.searchView.initView();
    this.gridView01.initView();

    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
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
		this.headNmCustomer = $("#headNmCustomer");
    },
    getData: function () {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,

            headNmProject: this.headNmProject.val(),
            headNmCustomer: this.headNmCustomer.val()
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
            showRowSelector: true,
            frozenColumnIndex: 0,
            sortable: true,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "noProject", label: COL("noProject"), width: 0, align: "center"},
                {key: "nmProject", label: COL("nmProject"), width: 300, editor: "text"},
                {key: "nmCustomer", label: COL("nmCustomer"), width: 200, editor: "text"},
                {key: "dtStart", label: COL("dtStart"), width: 120, align: "center", editor: {type: "date"}},
                {key: "duration", label: COL("project.duration"), width: 140, align: "center", editor: "text"},
                {key: "place", label: COL("place"), width: 300, editor: "text"},
                {key: "remark", label: COL("remark"), width: 400, editor: "text"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
//                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
                }
            },
            onPageChange: function (pageNumber) {
                _this.setPageData({pageNumber: pageNumber});
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
            }
        });

        axboot.buttonClick(this, "data-grid-view-01-btn", {
            "girdView01-add": function () {
                this.addRow();
            },
            "girdView01-delete": function () {
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
                return this.noProject;
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
