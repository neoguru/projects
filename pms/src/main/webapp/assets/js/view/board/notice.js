var fnObj = {};
var ACTIONS = axboot.actionExtend(fnObj, {
    PAGE_SEARCH: function (caller, act, data) {
        axboot.ajax({
            type: "GET",
            url: "/api/v1/notice",
            data: $.extend({}, caller.searchView.getData(), caller.gridView01.getPageData()),
            callback: function (res) {
            	console.log(res);
                caller.gridView01.setData(res);
                caller.formView01.clear();
                caller.gridView02.clear();
                
                CKEDITOR.instances.context.setData();
                
                $("#formView01").find('[id="title"]').attr("readonly", "readonly");
                $("#formView01").find('[id="title"]').removeAttr("style", "border-color:Orange");
  //              $("#formView01").find('[id="file-search"]').attr("disabled", "disabled");
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
//                    console.log(err);
                }
            }
        });

        return false;
    },
    PAGE_SAVE: function (caller, act, data) {
    	
        if (caller.formView01.validate()) {
            var noticeData = caller.formView01.getData();
            var attachList = [].concat(caller.gridView02.getData());
            
            noticeData.nmWriter = SCRIPT_SESSION.userNm;
            noticeData.noEmp = SCRIPT_SESSION.noEmp;
            noticeData.attachList = attachList;
            
				console.log(noticeData);
           axboot.promise()
           		.then(function (ok, fail, data) {
           			axboot.ajax({
           				type: "PUT", url: "/api/v1/notice", data: JSON.stringify([noticeData]),
           				callback: function (res) {
           					ok(res);
           					}
           				});
           			})  
               	.then(function (ok) {
               		ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                     axToast.push("공지사항이 저장되었습니다!");
               		})
               	.catch(function (){
               		
               		});
        }

    },
    FORM_CLEAR: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.form.clearconfirm")
        }, function () {
            if (this.key == "ok") {
                caller.formView01.clear();
                caller.gridView02.clear();
                
                CKEDITOR.instances.context.setData();
                CKEDITOR.instances.context.setReadOnly(false);
                
//                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);            
                
                $("#formView01").find('[id="title"]').removeAttr("readonly");
                $("#formView01").find('[id="title"]').attr("style", "border-color:Orange");
                $("#formView01").find('[id="file-search"]').removeAttr("disabled");
                $("#formView01").find('[id="nmWriter"]').val(SCRIPT_SESSION.userNm);

            }
        });

    },
    FORM_EDIT: function (caller, act, data) {
        axDialog.confirm({
            msg: LANG("ax.script.updateconfirm")
        }, function () {
            if (this.key == "ok") {
                CKEDITOR.instances.context.setReadOnly(false);
//                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                $("#formView01").find('[id="file-search"]').removeAttr("disabled");
            }
        });
    },
    ITEM_CLICK: function (caller, act, data) {
        $("#formView01").find('[id="title"]').attr("readonly", "readonly");
        $("#formView01").find('[id="title"]').removeAttr("style", "border-color:Orange");
//        $("#formView01").find('[id="file-search"]').attr("disabled", "disabled");
        CKEDITOR.instances.context.setReadOnly(true);

        $("#formView01").find('[id="file-search"]').removeAttr("disabled");
        caller.formView01.setData(data);
//        caller.gridView02.setData(data.attachList);

        caller.uploadView.setNoNotice({
        	noNotice: data.noNotice
        });
        
        axboot.ajax({
            type: "GET",
            url: "/api/v1/notice",
            data: {noNotice: data.noNotice},
            callback: function (res) {
            	console.log(res);
                caller.gridView02.setData(res.attachList);
            }
        });
        
    },
    UPDATE_uploaded: function (caller, act, data) {
        
        caller.gridView02.setData(data);
    },
    DELETE_files: function (caller, act, data) {
    	
    	var list = [].concat(caller.gridView02.getData("selected"));
    	list.forEach(function(n){
    		n.__deleted__ = true;
    	});

        axboot.ajax({
        	type: "PUT",
        	url: "/api/v1/noticeattach",
        	data: JSON.stringify(list),
        	success: function (res) {
        		if (res.error) {
        			alert(res.error.message);
            		return;
            	}
            	caller.gridView02.delRow("selected");
            	axToast.push("파일이 삭제 되었습니다");
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

var CODE = {};

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {
    var _this = this;
    
    _this.pageButtonView.initView();
    _this.searchView.initView();
    _this.gridView01.initView();
    _this.gridView02.initView();
    _this.uploadView.initView();
    _this.formView01.initView();

    CKEDITOR.config.height = 250;
    CKEDITOR.config.width = 'auto';
    CKEDITOR.config.readOnly = true;
//    CKEDITOR.instances.context.setReadOnly( true );
    
    console.log(SCRIPT_SESSION);

    $("#formView01").find('[id="file-search"]').attr("disabled", "disabled");
    
    switch (SCRIPT_SESSION.details.authGroup){

    	case "S0001":
    	case "S0002":
    	case "S0003":
        	$("#formView01").find('[id="dragover"]').attr("disabled", true);
    		break;
    	case "S0004":
    	case "S0005":
    		$("#formView01").find('[data-form-view-01-btn="form-clear"]').attr("style", "display:none");
    		$("#formView01").find('[data-form-view-01-btn="form-edit"]').attr("style", "display:none");
    		$("#formView01").find('[id="left"]').attr("style", "display:none");
    		$("#formView01").find('[id="file-delete"]').attr("style", "display:none");
        	$("#formView01").find('[id="dragover"]').attr("disabled", true);
    		break;
    	
    }
    ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);

};

fnObj.pageResize = function () {

};

fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
        axboot.buttonClick(this, "data-page-btn", {
            "search": function () {
                ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
                CKEDITOR.instances.context.setReadOnly(true);
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
        
        this.boardSearch = $("#boardSearch");
        this.searchWord = $("#searchWord");
        
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


/**
 * gridView
 */
fnObj.gridView01 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 20
    },

    initView: function () {

    	var _this = this;
    	this.target = axboot.gridBuilder({
    	
    		showLineNumber: true,
    		showRowSelector: false,
    		frozenColumnIndex: 0,
    		sortable: false,
    		multipleSelect: false,
    		target: $('[data-ax5grid="grid-view-01"]'),
    		columns: [
    			{key: "title", label: COL("subject"), width: 300, align: "left"},
    			{key: "employee.nmEmp", label: COL("admin.board.nmWriter"), align: "center"}, 
    			{key: "visitCnt", label: COL("admin.board.visitCnt"), align: "center"},
    			{key: "dtWrite", label: COL("admin.board.dtWrite"), align: "center"}
    		],
    		body: {    	   
    			onClick: function () {
    				this.self.select(this.dindex);
    				ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                }
            },
            page: {
                navigationItemCount: 5
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
    getData: function () {
        var list = [];
        var _list = this.target.getList(_type);

        if (_type == "modified" || _type == "deleted") {
            list = ax5.util.filter(_list, function () {
                return true;
            });
        } else {
            list = _list;
        }
        return list;
//        return this.target.getData();
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
            "form-clear": function () {
                ACTIONS.dispatch(ACTIONS.FORM_CLEAR);
            },
            "form-edit": function () {
                ACTIONS.dispatch(ACTIONS.FORM_EDIT);
            },
        });

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
        data.context = CKEDITOR.instances.context.getData();
        
        return $.extend({}, data);
    },
    setData: function (data) {

        if (typeof data === "undefined") data = this.getDefaultData();
        data = $.extend({}, data);
        
        this.model.setModel(data);
        this.model.set("nmWriter", data.employee.nmEmp);
        this.modelFormatter.formatting(); // 입력된 값을 포메팅 된 값으로 변경
        
        CKEDITOR.instances.context.setData();  //  에디터에 내용 초기화(비우기)
//        CKEDITOR.instances.context.setData(data.context);  					//text
//        CKEDITOR.instances.context.document.getBody().setHtml(data.context); //html
        CKEDITOR.document.getById('context').setHtml(data.context); //html
        
    },
    validate: function () {
        var rs = this.model.validate();
        if (rs.error) {
//            alert(LANG("ax.script.form.validate", rs.error[0].jquery.attr("title")));
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
 * gridView02
 */

fnObj.gridView02 = axboot.viewExtend(axboot.gridView, {
    page: {
        pageNumber: 0,
        pageSize: 4
    },

    initView: function () {

        var _this = this;

        this.target = axboot.gridBuilder({
            showLineNumber: false,
            showRowSelector: true,
            frozenColumnIndex: 0,
            sortable: false,
            multipleSelect: true,
            target: $('[data-ax5grid="grid-view-02"]'),
            columns: [
                {key: "fileNm", label: COL("board.nmFile"), width: 500, align: "left"},
                {key: "fileSize", label: COL("board.sizeFile"), width: 100, align: "right", formatter: function () {
                    return ax5.util.number(this.value, {"byte": true});
                  }},
                {key: "extension", label: COL("board.extension"), width: 100, align: "center"},
      //          {key: "dtWrite", label: COL("createdAt"), width: 100, align: "center"},
                {key: "download", label: "down", width: 60, align: "center", formatter: function () {
                    return '<i class="cqc-download" aria-hidden="true"></i>'
                  }}
            ],
            body: {
                onClick: function () {
                    //this.self.select(this.dindex);
                    //ACTIONS.dispatch(ACTIONS.ITEM_CLICK, this.list[this.dindex]);
                	if(this.column.key == "download" && this.item.download){
                		location.href = this.item.download;
                    }
                  }
             },
             page: {
                 navigationItemCount: 5
             },
             onPageChange: function (pageNumber) {
                 _this.setPageData({pageNumber: pageNumber});
                 ACTIONS.dispatch(ACTIONS.PAGE_SEARCH);
             }
         });
    
        axboot.buttonClick(this, "data-grid-view-02-btn", {
            "file-delete": function () {
            		if (this.getData("selected").length > 0){
            			axDialog.confirm({
            				title: "Confirm",
            				msg: LANG("ax.script.deleteconfirm")
                     }, function () {
                    	 	if (this.key == "ok"){  
                    	 		ACTIONS.dispatch(ACTIONS.DELETE_files);
                    	 	}
                     	});        
            		} else {
            			axDialog.confirm({
            				title: "Error",
            				msg: LANG("ax.script.requireselect")
            			}, function () {
                    	});            		
            		}
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
                return this.noSeq;
            });
        } else {
            list = _list;
        }
        return list;
    },
    addRow: function () {
        this.target.addRow({__created__: true}, "last");
    },
    align: function () {
        this.target.align();
    }
});


fnObj.uploadView = axboot.viewExtend(axboot.commonView, {
    initView: function () {
    	
    	var DRAGOVER = $("#dragover");
    	var DIALOG = new ax5.ui.dialog({
            title: "AX5UI"
        });
    	var upload1 = new ax5.ui.uploader();

    	upload1.setConfig({
            //debug: true,
            target: $('[data-ax5uploader="upload1"]'),
            form: {
            		action: "/api/v1/noticeattach/upload",
            		fileName: "file"
             },
            multiple: true,
//            manualUpload: false,
            progressBox: true,
            dropZone: {            		
            		target: $(document.body),
            		onclick: function () {
            			// 사용을 원하는 경우 구현
            			return;
            			if (!this.self.selectFile()) {
            				console.log("파일 선택 지원 안됨");
            			}
            		},
            		ondragover: function () {
            			//this.self.$dropZone.addClass("dragover");
            			DRAGOVER.show();
            			DRAGOVER.on("dragleave", function () {
            				DRAGOVER.hide();
            			});
            		},
            		ondragout: function () {
                    //this.self.$dropZone.removeClass("dragover");
            		},
            		ondrop: function () {
            			DRAGOVER.hide();
            		}
            	},
            	validateSelectedFiles: function () {
            		console.log(this);
            		// 10개 이상 업로드 되지 않도록 제한.
            		if (this.uploadedFiles.length + this.selectedFiles.length > 10) {
            			alert("You can not upload more than 10 files.");
            			return false;
                	}
            		return true;
            	},
            	onuploaderror: function () {
            		console.log(this.error);
            		DIALOG.alert(this.error.message);
            	},
            	onuploadComplete: function () {
//            		ACTIONS["UPDATE_uploaded"](this.self.uploadedFiles);
                	ACTIONS.dispatch(ACTIONS.UPDATE_uploaded, this.self.uploadedFiles);
            	}   	
        });
    	/*
        /// ACTIONS
        var ACTIONS = {
            "INIT": function () {
                // 컨트롤 버튼 이벤트 제어
                uploadView.initView();
            },
            "GET_grid": function (data) {
                return gridView02.getList(data);
            },
            "GET_uploaded": function () {
                // 업로드 파일 가져오기
                $.ajax({
                    method: "GET",
                    url: API_SERVER + "/api/v1/ax5uploader",
                    success: function (res) {
                        uploadView.setData(res);
                    }
                });
            },
            "DELETE_files": function (data) {
                $.ajax({
                    contentType: "application/json",
                    method: "PUT",
                    url: API_SERVER + "/api/v1/ax5uploader/delete",
                    data: JSON.stringify(data),
                    success: function (res) {
                        if (res.error) {
                            alert(res.error.message);
                            return;
                        }
                        ACTIONS["GET_uploaded"]();
                    }
                });
            },
            "UPDATE_uploaded": function (data) {
            	gridView02.setData(data);
            }
        };
        
    	  /// uploadView
        var uploadView = {
            initView: function () {
                $('[data-btn-wrap]').clickAttr(this, "data-upload-btn", {
                    "removeFile": function () {
                        var deleteFiles = ACTIONS["GET_grid"]("selected");
                        if (deleteFiles.length == 0) {
                            alert("No list selected.");
                            return;
                        }
                        DIALOG.confirm({
                            title: "AX5UI",
                            msg: "Are you sure you want to delete it?"
                        }, function () {
                            if (this.key == "ok") {
                                ACTIONS["DELETE_files"](deleteFiles);
                            }
                        });
                    }
                });
            },
            setData: function (data) {
            	upload1.setUploadedFiles(data);
            	gridView02.setData(upload1.uploadedFiles);
            }
        };
        */
    },
    setNoNotice: function (data) {
    	console.log(data);
    	console.log(data.noNotice);
//    	var a = document.getElementById('noNotice');
    	var a = $("#noNotice");
    	a.value = data.noNotice;
    },
});

