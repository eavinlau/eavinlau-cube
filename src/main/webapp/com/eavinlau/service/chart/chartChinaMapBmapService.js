/**
 * Created by jintian on 2017/8/23.
 */
elCube.service('chartChinaMapBmapService', function () {
    this.render = function (containerDom, option, scope, persist,drill) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return;
        }
        var height;
        scope ? height = scope.myheight - 20 : null;
        return new ELCubeBMapRender(containerDom, option).chart(height, persist);
    };

    this.parseOption = function (data) {
        var optionData = [];
        var seriesData = [];
        var data_keys = data.keys;
        var data_series = data.series;

        //var planePath = 'path://M1136.047896 339.882267C1112.706905 143.149344 1017.345943-0.2756 900.268988 0.0004L358.6862 1.290399c-117.106954 0.276-211.762917 144.067944-234.275909 340.954867C42.146324 391.197247-0.27366 490.974208 0.00134 606.394163c0.184 85.699967 24.016991 162.533937 69.902973 216.394916l0.46 191.364925 212.804916-0.49-0.276-112.077956 697.337728-1.687 0.276 112.076957 212.805917-0.521-0.46-191.364925c45.639982-54.014979 69.134973-131.001949 68.919973-216.700916-0.245-115.205955-43.185983-214.890916-125.725951-263.506897zM358.9312 74.320371l541.583788-1.289c75.392971-0.184 141.491945 101.98596 166.489935 240.563907-11.532995-2.299999-23.648991-3.709999-36.193986-4.446999 0-0.307 0.338-0.92 0.062-0.889999-101.89396 0.246-70.055973 0.154-141.799944 0.337999s-46.559982 0.092-118.118954 0.276l-523.669796 1.257c-19.016993 0.031-36.990986 2.085999-53.983979 5.551998C217.807255 176.920331 283.538229 74.473371 358.9312 74.320371zM218.298255 702.030126c-46.590982 0.092-84.317967-42.787983-84.440967-95.973963-0.123-53.093979 37.419985-96.249962 83.980967-96.372962 46.376982-0.092 84.103967 42.879983 84.256967 95.974962 0.123 53.277979-37.389985 96.249962-83.796967 96.371963z m656.972743-18.126993l-488.365809 0.583c-76.12997 0.184-77.78597-131.124949-0.307-131.308949l488.366809-1.166c71.219972-0.184 71.527972 131.707949 0.306 131.891949z m168.667934 16.133994c-46.468982 0.122-84.195967-42.757983-84.318967-95.943963-0.122-53.093979 37.419985-96.279962 83.858967-96.372962 46.499982-0.122 84.256967 42.849983 84.379967 95.973962 0.03 53.278979-37.450985 96.280962-83.919967 96.342963z'
        //var planePath = 'path://M726.353 191.887c1.257 32.687 1.257 65.375 2.514 98.062 15.087 7.543 28.915 18.858 41.488 37.715v17.601l-40.231-11.314c5.029 192.352 7.543 389.732-3.771 582.084-1.257 21.373-25.144 76.689-45.259 82.976-114.405 32.687-213.724 33.944-331.901 0-21.373-6.286-50.288-61.602-51.545-82.976-12.571-189.837-7.543-388.475-3.771-582.084l-40.231 11.314v-17.601c11.314-18.858 25.144-30.173 40.231-37.715 1.257-32.687 1.257-65.375 2.514-98.062 1.257-67.889 22.63-124.463 65.375-152.121 76.689-50.288 199.895-51.545 279.099-11.314 54.059 25.144 82.976 88.004 85.49 163.436zM327.82 276.119c10.057 47.774 30.173 94.29 52.802 140.807 40.231-11.314 84.233-16.344 128.234-17.601v-8.8h-20.115c-3.771 0-6.286-2.514-6.286-6.286s2.514-6.286 6.286-6.286h52.802c3.771 0 6.286 2.514 6.286 6.286s-2.514 6.286-6.286 6.286h-21.373v8.8c42.745 0 86.747 6.286 125.72 17.601 21.373-42.745 38.974-90.519 52.802-140.807-99.319-36.458-272.812-36.458-370.874 0zM694.922 970.094l-86.747 22.63v13.83c41.488-8.8 82.976-17.601 86.747-36.458zM332.848 970.094c3.771 20.115 45.259 27.658 86.747 36.458v-13.83l-86.747-22.63zM337.878 249.718c12.571-81.719 40.231-158.408 84.233-226.296-2.514 0-6.286 1.257-8.8 1.257-57.831 20.115-88.004 62.859-98.062 119.434l61.602-65.375c-27.658 49.031-44.002 105.604-54.059 167.208v20.115c5.029-6.286 10.057-11.314 15.087-16.344zM702.466 142.856c-10.057-56.574-40.231-99.319-98.062-119.434-2.514 0-6.286-1.257-8.8-1.257 45.259 67.889 71.66 144.578 84.233 226.296 5.029 5.029 10.057 10.057 15.087 16.344v-20.115c-10.057-61.602-26.401-116.92-54.059-167.208l61.602 65.375zM396.966 645.735c-20.115 51.545-38.974 99.319-56.574 143.321 82.976 66.632 261.498 66.632 343.215 0-17.601-44.002-36.458-91.776-56.574-143.321-62.859 21.373-168.465 21.373-230.068 0zM702.466 382.98c-2.514-5.029-5.029-11.314-6.286-16.344-15.087 45.259-32.687 77.946-47.774 111.891v140.807l51.545 1.257c3.771-79.203 5.029-147.092 2.514-237.611zM650.921 635.678c12.571 37.715 27.658 60.345 44.002 77.946 1.257-26.401 2.514-51.545 3.771-74.175l-47.774-3.771zM317.762 376.695c-2.514 91.776-1.257 162.179 2.514 243.897l51.545-1.257v-148.349c-18.858-32.687-35.201-67.889-47.774-111.891-1.257 6.286-3.771 11.314-6.286 17.601zM369.308 635.678l-47.774 3.771c1.257 23.887 2.514 47.774 3.771 74.175 16.344-18.858 31.43-41.488 44.002-77.946z'
        var planePath = 'image://data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCI+Cjx0aXRsZT48L3RpdGxlPgo8ZyBpZD0iaWNvbW9vbi1pZ25vcmUiPgo8L2c+CjxwYXRoIGZpbGw9IiM1YzU0NmEiIGQ9Ik02ODggODB2ODY0YzAgMTcuNjc0LTE0LjMyNiAzMi0zMiAzMmgtMzJ2LTg5Nmg2NHoiPjwvcGF0aD4KPHBhdGggZmlsbD0iIzhhODg5NSIgZD0iTTI4OCA2ODh2MjQwYzAgOC44NDQgNy4xNjQgMTYgMTYgMTZoMTkyYzguODQ0IDAgMTYtNy4xNTYgMTYtMTZ2LTI0MGMwLTguODQ0LTcuMTU2LTE2LTE2LTE2aC0xOTJjLTguODM2IDAtMTYgNy4xNTYtMTYgMTZ6Ij48L3BhdGg+CjxwYXRoIGZpbGw9IiNmZmQxMDAiIGQ9Ik0yNDAgNDk2djI0MGMwIDguODQ0IDcuMTY0IDE2IDE2IDE2aDE5MmM4Ljg0NCAwIDE2LTcuMTU2IDE2LTE2di0yNDBjMC04Ljg0NC03LjE1Ni0xNi0xNi0xNmgtMTkyYy04LjgzNiAwLTE2IDcuMTU2LTE2IDE2eiI+PC9wYXRoPgo8cGF0aCBmaWxsPSIjZTcwMDFlIiBkPSJNNjI5LjE4OCAyNDQuMjA0bC0xOTIgMTc2Yy0zLjE5NCAyLjkzMi01LjE4OCA3LjEyNi01LjE4OCAxMS43ODUgMCAwLjAwNCAwIDAuMDA4IDAgMC4wMTF2NTU5Ljk5OWMwIDE3LjY0IDE0LjM2IDMyIDMyIDMyaDEyOGMzNS4yOTYgMCA2NC0yOC43MDQgNjQtNjR2LTcwNGMwLTAuMDAyIDAtMC4wMDQgMC0wLjAwNSAwLTYuNTAzLTMuODg1LTEyLjA5OS05LjQ2MS0xNC41OTRsLTAuMTAxLTAuMDQxYy0xLjg5OC0wLjg1OC00LjExNC0xLjM1OC02LjQ0OC0xLjM1OC00LjE3IDAtNy45NjggMS41OTctMTAuODE0IDQuMjEybDAuMDEyLTAuMDEweiI+PC9wYXRoPgo8cGF0aCBmaWxsPSIjZmY0ZjE5IiBkPSJNNDMyIDUyLjU0NmwtMjUuMDk0IDEyOS4wNTAtMTE5LjM5IDQyLjg4NmMtMjguODY4IDEyLjgzLTQ3LjUxNiA0MS41MTgtNDcuNTE2IDczLjExMnYxMDIuNDA2YzAgMjYuNDY4IDIxLjUzMiA0OCA0OCA0OGgyNzJjNTIuOTM4IDAgOTYtNDMuMDYyIDk2LTk2di0zMDRjMC0yNi40NjgtMjEuNTMyLTQ4LTQ4LTQ4aC0xMjhjLTMwLjkzOCAwLTQyLjQ1NCAyMi4wOTQtNDggNTIuNTQ2eiI+PC9wYXRoPgo8cGF0aCBmaWxsPSIjZmZkMTAwIiBkPSJNNTI4IDB2NTZjMCAxMy4yNTQtMTAuNzQ2IDI0LTI0IDI0cy0yNC0xMC43NDYtMjQtMjR2LTU2eiI+PC9wYXRoPgo8cGF0aCBmaWxsPSIjNWM1NDZhIiBkPSJNMjg4IDgzMnYtMzJoMTQ0djMyek0yODggODk2di0zMmgxNDR2MzJ6Ij48L3BhdGg+CjxwYXRoIGZpbGw9IiNmZjRmMTkiIGQ9Ik01NzYgMTAyNGMwLTI2LjUxLTIxLjQ5LTQ4LTQ4LTQ4aC00OGMtOC44MzcgMC0xNiA3LjE2My0xNiAxNnYwIDMyaDExMnoiPjwvcGF0aD4KPHBhdGggZmlsbD0iIzVjNTQ2YSIgZD0iTTY3MiA5MTEuOTk4YzYxLjg1NiAwIDExMi01MC4xNDQgMTEyLTExMnMtNTAuMTQ0LTExMi0xMTItMTEydjBjLTYxLjg1NiAwLTExMiA1MC4xNDQtMTEyIDExMnM1MC4xNDQgMTEyIDExMiAxMTJ2MHoiPjwvcGF0aD4KPHBhdGggZmlsbD0iIzhhODg5NSIgZD0iTTY3MiA4NjMuOTk4YzM1LjM0NiAwIDY0LTI4LjY1NCA2NC02NHMtMjguNjU0LTY0LTY0LTY0djBjLTM1LjM0NiAwLTY0IDI4LjY1NC02NCA2NHMyOC42NTQgNjQgNjQgNjR2MHoiPjwvcGF0aD4KPHBhdGggZmlsbD0iIzVjNTQ2YSIgZD0iTTY3MiAyNzJjNjEuODU2IDAgMTEyLTUwLjE0NCAxMTItMTEycy01MC4xNDQtMTEyLTExMi0xMTJ2MGMtNjEuODU2IDAtMTEyIDUwLjE0NC0xMTIgMTEyczUwLjE0NCAxMTIgMTEyIDExMnYweiI+PC9wYXRoPgo8cGF0aCBmaWxsPSIjOGE4ODk1IiBkPSJNNjcyIDIyNGMzNS4zNDYgMCA2NC0yOC42NTQgNjQtNjRzLTI4LjY1NC02NC02NC02NHYwYy0zNS4zNDYgMC02NCAyOC42NTQtNjQgNjRzMjguNjU0IDY0IDY0IDY0djB6Ij48L3BhdGg+CjxwYXRoIGZpbGw9IiM1YzU0NmEiIGQ9Ik0yODcuNTE2IDIyNC40ODRjLTUuNjI2IDIuNS0xMC43MjggNS43NTgtMTUuNTE2IDkuMzY4djE2Ni4xNDhoMTAyLjkwNmMxNy42NzIgMCAzMi0xNC4zMjggMzItMzJ2LTE4Ni40MDJsLTExOS4zOSA0Mi44ODZ6Ij48L3BhdGg+CjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik00ODAgMzJ2LTMyaDQ4djMyeiI+PC9wYXRoPgo8cGF0aCBmaWxsPSIjZmY5NTAwIiBkPSJNMjg4IDc1MnYtMjcyaDMydjI3MnoiPjwvcGF0aD4KPHBhdGggZmlsbD0iI2ZmOTUwMCIgZD0iTTM2OCA3NTJ2LTI3MmgzMnYyNzJ6Ij48L3BhdGg+Cjwvc3ZnPgo='
            
        var fromName;
        var fromN;
        var fromL;
        var toName;
        var toN;
        var toL;
        var effectScatterValue;
        var max;
        var min;
        var j = 0;
        var maxScatter;
        
        /*添加飞线数据*/
        var lineSum = [];
        //var pointSum = [];
        //var pointSumHas = false;
        for (var i = 0; i < data.data[0].length; i++) {
        	lineSum.push(0)
		}
        /*添加飞线数据*/
    	
        for(var serieConfig in data.seriesConfig){
            var serieType = data.seriesConfig[serieConfig].type;
            //重置为null，防止脏数据
            fromName = null;
            fromN = null;
            fromL = null;
            if(data_series[j].length > 3){
                fromName = data_series[j][2];
                fromN = parseFloat(data_series[j][0]);
                fromL = parseFloat(data_series[j][1]);
            }else if(data_series[j].length == 3){
                fromName = data_series[j][1];
                fromN = parseFloat(data_series[j][0].split(",")[0]);
                fromL = parseFloat(data_series[j][0].split(",")[1]);
            }

            //根据不同的地图类型获取不同的series
            switch (serieType){
                case "markLine" :
                    var lineData = [];
                    var lineData1 = [];
                    var lineData2 = [];
                    
                    /*求飞线数据和飞线点数据*/
                    //var pointSumIn = 0;
                    var sersdata=data.data;
    				for (var n = 0; n < data.data[j].length; n++) {
    					if (typeof(data.data[j][n])!="undefined") {
    						//pointSumIn += parseInt(data.data[j][n]);
    						lineSum[n] += parseInt(data.data[j][n]);
    					}
    				}
    				
    				//pointSum.push(pointSumIn);
    				//console.log(lineSum)
    				//console.log(pointSum)
                    /*求飞线数据和飞线点数据*/
                    
                    if(fromN && fromL){
                        for(var i = 0; data_keys[0] && i < data_keys.length; i++){
                            toName = null;
                            toN = null;
                            toL = null;
                            if(data_keys[i].length > 2){
                                toName = data_keys[i][2];
                                toN = parseFloat(data_keys[i][0]);
                                toL = parseFloat(data_keys[i][1]);
                            }else if(data_keys[i].length == 2){
                                toName = data_keys[i][1];
                                toN = parseFloat(data_keys[i][0].split(",")[0]);
                                toL = parseFloat(data_keys[i][0].split(",")[1]);
                            };
                            

                            if(data.data[j][i] && toN && toL){
                                lineData.push({
                                	fromName: fromName,
                                    toName: toName,
                                    coords: [[fromN,fromL],[toN, toL]],
                                    value: data.data[j][i]    
                                });
                                lineData1.push({
                                	name: fromName,
                                	value: [fromN, fromL]
                                });
                                lineData2.push({
                                	name: toName,
                                	value: [toN, toL,parseFloat(lineSum[i])]
                                });

                                if(max == null || max <= parseFloat(data.data[j][i])){
                                    max = parseFloat(data.data[j][i]) + 10;
                                }
                                if(min == null || min >= parseFloat(data.data[j][i])){
                                    min = parseFloat(data.data[j][i]) - 10;
                                }
                            }
                        };
                        
                        if(lineData.length > 0){
                            seriesData.push(
                                {
                                    name:fromName,
                                    type: 'lines',
                                    coordinateSystem: 'bmap',
                                    symbol: ['none', 'arrow'],
                                    symbolSize: 6,
                                    tooltip: {
                                    },
                                    effect: {
                                    	show: true,
                                        period: 6,
                                        trailLength: 0,
                                        symbol: planePath,
                                        symbolSize: 22
                                    },
                                    lineStyle: {
                                          normal: {
                                          color: '#C5F80E',
                                          width: 1,
                                          opacity: 0.6,
                                          curveness: 0.2
                                         }
                                     },
                                    data: lineData
                                },{
                                    name: fromName,
                                    type: 'effectScatter',
                                    coordinateSystem: 'bmap',
                                    data: lineData1,
                                    symbolSize: function (val) {
                                        /*return val[2] / 5;*/
                                    	return 16
                                    },
                                    showEffectOn: 'render',
                                    rippleEffect: {
                                        brushType: 'stroke'
                                    },
                                    hoverAnimation: true,
                                    label: {
                                        normal: {
                                            formatter: '{b}',
                                            position: 'right',
                                            show: true
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#f4e925'
                                        }
                                    },
                                    zlevel: 1
                                },{
                                    name: toName,
                                    type: 'effectScatter',
                                    coordinateSystem: 'bmap',
                                    data: lineData2,
                                    symbolSize: function (val) {
                                        /*return val[2] / 5;*/
                                    	return 16
                                    },
                                    showEffectOn: 'render',
                                    rippleEffect: {
                                        brushType: 'stroke'
                                    },
                                    hoverAnimation: true,
                                    label: {
                                        normal: {
                                            formatter: '{b}',
                                            position: 'right',
                                            show: true
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#f4e925'
                                        }
                                    },
                                    zlevel: 1
                                }
                            );
                            optionData.push(fromName);
                        }
                    }
                    break;
                case "heat" :
                    var heatmapData = [];
                    for(var i = 0; data_keys[0] && i < data_keys.length; i++){
                        toName = null;
                        toN = null;
                        toL = null;
                        if(data_keys[i].length > 2){
                            toName = data_keys[i][2];
                            toN = parseFloat(data_keys[i][0]);
                            toL = parseFloat(data_keys[i][1]);
                        }else if(data_keys[i].length == 2){
                            toName = data_keys[i][1];
                            toN = parseFloat(data_keys[i][0].split(",")[0]);
                            toL = parseFloat(data_keys[i][0].split(",")[1]);
                        };

                        if(data.data[j][i]){
                            heatmapData.push([toN,toL,parseFloat(data.data[j][i])]);

                            if(max == null || max <= parseFloat(data.data[j][i])){
                                max = parseFloat(data.data[j][i]) + 10;
                            }
                            if(min == null || min >= parseFloat(data.data[j][i])){
                                min = parseFloat(data.data[j][i]) - 10;
                            }
                        }
                    }
                    if(heatmapData.length > 0){
                        seriesData.push(
                            {
                                name: serieConfig,
                                type: 'heatmap',
                                coordinateSystem: 'bmap',
                                data: heatmapData
                            }
                        );
                        optionData.push(serieConfig);
                    }
                    break;

                case "scatter" :
                    var scatterData = [];
                    for(var i = 0; data_keys[0] && i < data_keys.length; i++){
                        toName = null;
                        toN = null;
                        toL = null;
                        if(data_keys[i].length > 2){
                            toName = data_keys[i][2];
                            toN = parseFloat(data_keys[i][0]);
                            toL = parseFloat(data_keys[i][1]);
                        }else if(data_keys[i].length == 2){
                            toName = data_keys[i][1];
                            toN = parseFloat(data_keys[i][0].split(",")[0]);
                            toL = parseFloat(data_keys[i][0].split(",")[1]);
                        };

                        if(data.data[j][i]){
                            scatterData.push({
                                name:toName,
                                value:[toN,toL,parseFloat(data.data[j][i])]
                            });
                            if(maxScatter == null || maxScatter < parseFloat(data.data[j][i])){
                                maxScatter = parseFloat(data.data[j][i]);
                            }

                            if(max == null || max <= parseFloat(data.data[j][i])){
                                max = parseFloat(data.data[j][i]) + 10;
                            }
                            if(min == null || min >= parseFloat(data.data[j][i])){
                                min = parseFloat(data.data[j][i]) - 10;
                            }
                        }
                    }
                    
                    
                    if(scatterData.length > 0){
                        seriesData.push(
                            {
                                name: serieConfig,
                                type: 'scatter',
                                coordinateSystem: 'bmap',
                                
                                lineStyle: {
                                      normal: {
                                      color: '#C5F80E',
                                      width: 1,
                                      opacity: 0.6,
                                      curveness: 0.2
                                     }
                                 },
                                
                                data: scatterData,
                                symbolSize : function (val) {
                                	if (val[2] * 30 / maxScatter<8) {
                                		return 8;
									}else if (val[2] * 30 / maxScatter>20) {
										return 20;
									}else {
										return val[2] * 30 / maxScatter;
									}
                                },
                                label: {
                                    normal: {
                                        formatter: '{b}',
                                        position: 'right',
                                        show: false
                                    },
                                    emphasis: {
                                        show: true
                                    }
                                }
                            }
                        );
                        optionData.push(serieConfig);
                    }
            }
            j++;
        }


        var startPoint = {
            x: 104.114129,
            y: 37.550339
        };
        // 地图自定义样式
        var bmap = {
            center: [startPoint.x, startPoint.y],
            zoom: 5,
            roam: true,
            mapStyle: {
                styleJson: [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#0A5AED'
                    }
                }, {
                    'featureType': 'land',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#263C7C'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#93EBF8'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                },
//                {
//                    'featureType': 'label',
//                    'elementType': 'labels.text.fill',
//                    'stylers': {
//                        'color': '#5F6368'
//                    }
//                }
                ]
            }
        };
        var  mapOption = {
            bmap: bmap,
//            legend: {
//                orient: 'vertical',
//                top: 'top',
//                left: 'left',
//                selectedMode: 'multiple',
//                data: optionData
//            },
            visualMap: {
                min: min,
                max: max,
                x : 'left',
				y : 'center',
				show: false,
                //text: ['High', 'Low'],
                inRange: {
                    color: ['#d94e5d','#eac736'].reverse()
                },
                
                textStyle: {
                    color: '#d94e5d'
                }
            },
            tooltip : {
            	trigger: 'item',
                formatter:function(params, ticket, callback){
                  if(params.seriesType=="effectScatter") {
                	  if (params.data.value[2]) {
                		  return params.data.name+":"+params.data.value[2];
					}else {
						return params.data.name
					}
                  }else if(params.seriesType=="lines"){
                    return params.data.fromName+"->"+params.data.toName+"<br />"+params.data.value;
                  }else{
                    return params.name+":"+params.data.value[2];
                  }
                }
              },
            series:seriesData
        };
        console.log(mapOption, "mapOption-2")
        return mapOption;
    };
});
