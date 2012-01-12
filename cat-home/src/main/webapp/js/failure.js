		var jsObject = eval(jsonDate);
		var threadArray = new Array();
		threadArray.push('Minute');

		for (i = 0; i < jsObject.threads.threads.length; i++) {
			threadArray.push(jsObject.threads.threads[i]);
		}

		var colModelArray = new Array();

		for (i = 0; i < threadArray.length; i++) {
			var object = {
				"name" : threadArray[i],
				"index" : threadArray[i],
				"sorttype" : "string"
			};
			colModelArray.push(object);
		}

		$(function() {
			$("#failureTable").jqGrid({
				datatype : "local",
				colNames : threadArray,
				colModel : colModelArray,
				viewrecords : true,
				caption : "Failure Report",
				height : 250,
				loadComplete : function() {
					var grid = $("#failureTable");
					var ids = grid.getDataIDs();
					for ( var i = 0; i < ids.length; i++) {
						grid.setRowData(ids[i], false, {
							height : 25
						});
					}
					grid.setGridHeight('auto');
				}
			}).navGrid('#pager2', {
				edit : false,
				add : false,
				del : false
			});
			
			jQuery("#failureTable").jqGrid('setGridWidth','1500');
			for ( var i = 0; i < jsObject.segments.length; i++) {
				var segments = jsObject.segments[i];
				for(var j=0;j<segments.length;j++){
					
				
				//for ( var minute in segments) {
					var threadResult = creatNewArray(threadArray.length);
					threadResult[0] = minute;
				var segment = segments[j];
					//	var segment = segments[minute];
					for ( var j = 0; j < segment.entries.length; j++) {
						var entry = segment.entries[j];
						var threadId = entry.threadId;
						var type = entry.type;
						var messageId = entry.messageId;
						var text = entry.text;
						
						var index = getIndex(threadId, threadArray);
						var url = getUrl(type,text, messageId);
						if(threadResult[index]==""){
						threadResult[index] = threadResult[index] + url;
						}
						else{
							threadResult[index] = threadResult[index] +'</br>'+ url;
						}
					}
					var minuteData = {};
					for ( var i = 0; i < threadArray.length; i++) {
						minuteData[threadArray[i]] =  threadResult[i];
					}
					jQuery("#failureTable").jqGrid('addRowData', i + 1,
							minuteData);
				}
			}
		});
		function creatNewArray(length) {
			var array = new Array();
			for ( var i = 0; i < length; i++) {
				array.push("");
			}
			return array;
		}

		function getIndex(object, array) {
			for ( var i = 0; i < array.length; i++) {
				if (array[i] == object)
					return i;
			}
		}

		function getUrl(type, text ,messageId) {
			if (type == 'RuntimeException') {
				return '<a target=\'_blank\' style=\'background:red;\' href=\'www.dianping.com/messageId=' + messageId + '\'>' + text + '</a>';
			} else if (type == 'Exception') {
				return '<a target=\'_blank\' style=\'background:#FFFF00;\' href=\'www.dianping.com/messageId=' + messageId + '\'>' + text + '</a>';
			} else if (type == 'Error') {
				return '<a target=\'_blank\' style=\'background:#FF00FF;\' href=\'www.dianping.com/messageId=' + messageId + '\'>' + text + '</a>';
			} else {
				return '<a target=\'_blank\' style=\'background:#CC99FF;\' href=\'www.dianping.com/messageId=' + messageId + '\'>' + text + '</a>';
			}
		}