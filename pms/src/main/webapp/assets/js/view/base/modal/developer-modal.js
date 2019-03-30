var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_CLOSE: function (caller, act, data) {
        if (parent) {
            parent.axboot.modal.close();
        }
    },
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/developer",
            data: caller.searchView.getData(),
            callback: function (res) {
//            	console.log(res);
                caller.gridView01.setData(res);
            }
        });
        return false;
    },
    PAGE_CHOICE: function (caller, act, data) {
        var list = caller.gridView01.getData("selected");
        if (list.length > 0) {
            if (parent && parent.axboot && parent.axboot.modal) {
                parent.axboot.modal.callback(list[0]);
            }
        } else {
            alert(LANG("ax.script.requireselect"));
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
    
//    console.log(parent.axboot.modal.getData());

//    var typePartner = parent.axboot.modal.getData().sendData;
    
    _this.pageButtonView.initView();
    _this.searchView.initView();
    _this.gridView01.initView();    

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
            "choice": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CHOICE);
            },
            "fn1": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_DEL);
            },
            "close": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_CLOSE);
            }
        });
    }
});

//== view 시작
/**
 * searchView
 */
fnObj.searchView = axboot.viewExtend(axboot.searchView, {
    initView: function (typePartner) {
        this.target = $(document["searchView0"]);
        this.target.attr("onsubmit", "return ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);");
        this.headNmDeveloper = $("#headNmDeveloper");
//        this.modalType = typePartner;
//        console.log(this.headCdTeam);
    },
    setPageNumber: function (pageNumber) {
        this.pageNumber = pageNumber;
        ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
    },
    getData: function () {
        return {
        	headNmDeveloper: this.headNmDeveloper.val()
//            modalType: this.modalType
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
            showLineNumber: false,
            showRowSelector: true,
            frozenColumnIndex: 0,
            target: $('[data-ax5grid="grid-view-01"]'),
            columns: [
                {key: "noDeveloper", label: COL("noDeveloper"), width: 100, align: "center"},
                {key: "nmDeveloper", label: COL("nmDeveloper"), width: 120, align: "center"},
                {key: "noMobile", label: COL("noMobile"), width: 100, align: "center", formatter: "phone"},
                {key: "dtJoin", label: COL("dtRegist"), width: 100, align: "center"}
            ],
            body: {
                onClick: function () {
                    this.self.select(this.dindex);
                    ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.item);
                }
            }
        });

        axboot.buttonClick(this, "data-grid-view-01-btn", {
            "add": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_ADD);
            },
            "delete": function () {
                ACTIONS.dispatch(ACTIONS.ITEM_DEL);
            }
        });
    }
});