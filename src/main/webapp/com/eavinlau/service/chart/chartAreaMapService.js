/**
 * Created by hj on 2017/07/26.
 */
elCube.service('chartAreaMapService', function($state, $window) {
	this.render = function(containerDom, option, scope, persist, drill,
			relations, chartConfig) {
		var render = new ELCubeEChartRender(containerDom, option);
		render.addClick(chartConfig, relations, $state, $window);
		return render.chart(null, persist);
	};

	this.parseOption = function(data) {
		var chartConfig = data.chartConfig;
		var casted_keys = data.keys;
		var casted_values = data.series;
		var aggregate_data = data.data;
		var tunningOpt = chartConfig.option;

		var code = 'china';
		if (chartConfig.city && chartConfig.city.code) {
			code = chartConfig.city.code;
		} else if (chartConfig.province && chartConfig.province.code) {
			code = chartConfig.province.code;
		}
		var url, zoomLevel;
		if (code == 'china') {
			url = 'plugins/FineMap/mapdata/china.json'
			zoomLevel = 1;
		} else if (code.length > 2) {
			zoomLevel = 3;
			url = 'plugins/FineMap/mapdata/geometryCouties/' + code + '.json';
		} else {
			zoomLevel = 2;
			url = 'plugins/FineMap/mapdata/geometryProvince/' + code + '.json';
		}
		var mapOption = null;
		var groups = _.map(casted_values, function(val) {
			return val.join("-")
		});
		var series = [];
		for (var i = 0; i < groups.length; i++) {
			var data = [];
			for (var j = 0; j < aggregate_data[i].length; j++) {
				var rawName = casted_keys[j][chartConfig.keys.length - 1];
				var name = !tunningOpt.hasSuffix ? processLocName(rawName,
						zoomLevel) : rawName;
				var e = {
					"name" : name,
					"value" : aggregate_data[i][j] ? aggregate_data[i][j] : 0
				};
				data.push(e);
			}
			var e = {
				name : groups[i],
				type : 'map',
				map : code,
				tooltip : {
					trigger : 'item',
					position: function (point, params, dom, rect, size) {
	                     return [point[0]+8, point[1]+8];
					}
				},
				label : {
					normal : {
						show : true,
						textStyle : {
							fontSize : 12,
							color : '#fff'
						}
					},
					emphasis : {
						show : true,
						textStyle : {
							fontSize : 12,
							color : '#F39C12'
						}
					}
				},
				
				showLegendSymbol : false,
				
				itemStyle: {
                    normal: {
                    	borderWidth: 1,
                        areaColor: '#C1C1C1',
                        borderColor: "#43d0d6" //地图边框颜色
                    },
                    emphasis: {
                        borderWidth: 1,
                        areaColor: 'skyblue',
                        borderColor: "#43d0d6", //地图边框颜色
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowColor: 'rgba(0,0,0,0.5)'
                    }
                },
				 
				data : data
			};
			series.push(e);
		}
		
		console.log(series, "series")
		/*求出Y轴最大值，并设置visualMap最大值为Y轴最大值50的倍数*/
		var maxValArr = [];
		for (var i = 0; i < series[0].data.length; i++) {
			maxValArr.push(series[0].data[i].value);
		}
		var maxValTem = Math.max.apply(null,maxValArr);
		var maxVal = (50-maxValTem%50)+maxValTem;
		/*求出Y轴最大值，并设置visualMap最大值为Y轴最大值50的倍数*/

		var totals = [];
		for (var i = 0; i < casted_values.length; i++) {
			var total = Math.max.apply(null, aggregate_data[i])
			totals.push(total);
		}
		totals.sort(function(a, b) {
			return a - b;
		});
		var max = totals[totals.length - 1];
		$.ajax({
			type : "get",
			url : url,
			async : false,
			success : function(cityJson) {
				echarts.registerMap(code, cityJson);
				mapOption = {
					/*
					 * legend: { orient: 'vertical', left: 'left', textStyle:{
					 * color: '#fff'//字体颜色 }, data: groups },
					 */
					// 左侧小导航图标
					visualMap : {
						show : true,
						x : 'left',
						y : 'center',
						textStyle : {
							color : '#00299a'
						},
						/*
						 * pieces: [ {min: 9000}, // 不指定 max，表示 max
						 * 为无限大（Infinity）。 {min: 8700, max: 8900}, {min: 8500,
						 * max: 8700}, {min: 8200, max: 8500}, {min: 8000, max:
						 * 8200}, {max: 100} // 不指定 min，表示 min 为无限大（-Infinity）。 ],
						 */
						splitNumber : 5,
						min : 0,
						max : maxVal,
						color : [  '#D9505C', '#DC6456', '#DF7C4E', '#E39546','#E6AE3E' ,'#EAC537']
					},
					series : series
				};
			}
		});
		console.log(mapOption, 'map-1订单出发省份中国地图')
		return mapOption;
	};

	function processLocName(rawName, zoomLevel) {
		var result = rawName;
		var suffixList = [ '省', '市', '县', '区' ];
		var needProcess = true;
		_.each(suffixList, function(suffix) {
			if (rawName.indexOf(suffix) >= 0) {
				needProcess = false;
			}
		});
		if (!needProcess) {
			return rawName;
		}
		var trimedName = rawName.replace(/省|市|县|区|特别行政/gi, '');
		var zxs = [ '北京', '上海', '天津', '重庆' ];
		var suffix;
		switch (zoomLevel) {
		case 1:
			if (_.contains(zxs, trimedName)) {
				suffix = '市';
			} else {
				suffix = '省';
			}
			break;
		case 2:
			if (_.contains(zxs, trimedName)) {
				suffix = '区';
			} else {
				suffix = '市';
			}
			break;
		}

        console.log(result, suffix, "result-suffix")
		return result + suffix;
	}
});
