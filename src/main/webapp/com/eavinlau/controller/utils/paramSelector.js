/**
 * Created by yfyuan on 2017/5/2.
 */
elCube.controller('paramSelector', function ($scope, $uibModalInstance, dataService, param, filter, getSelects, ok) {
    $scope.type = ['=', '≠', '>', '<', '≥', '≤', '(a,b]', '[a,b)', '(a,b)', '[a,b]'];
    $scope.param = param;
    $scope.paramTypes = ['datesinglepicker','daterangepicker','single','multiple'];

    $scope.dateSinglePicker = {

    		date: {sDate: $scope.param.values[$scope.param.values.length - 1]},
            options: {
    	    	autoApply : true,
    	    	singleDatePicker: true, //单日历
    	        locale: {
    	        	separator: '~',
    	            applyClass: 'btn-green',
    	            applyLabel: "确定",
    	            cancelLabel: '取消',
    	            fromLabel: "开始",
    	            format: "YYYY-MM-DD",
    	            toLabel: "到",
    	            customRangeLabel: '自定义时间',
    	            daysOfWeek: [ '日', '一', '二', '三', '四', '五', '六' ],
    	            firstDay: 1,
    	            monthNames: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ]
    	          },
    	    	      "alwaysShowCalendars": true,
    	    	      "showCustomRangeLabel": false    
    	    }
    	    
    };
    
    $scope.dateRangePicker = {

    		date: {startDate: $scope.param.values[0], endDate: $scope.param.values[$scope.param.values.length - 1]},
            options: {
    	    	autoApply : true,
    	        locale: {
    	        	separator: '~',
    	            applyClass: 'btn-green',
    	            applyLabel: "确定",
    	            cancelLabel: '取消',
    	            fromLabel: "开始",
    	            format: "YYYY-MM-DD",
    	            toLabel: "到",
    	            customRangeLabel: '自定义时间',
    	            daysOfWeek: [ '日', '一', '二', '三', '四', '五', '六' ],
    	            firstDay: 1,
    	            monthNames: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ]
    	          },
    	     ranges: {
    	    	        "今天": [
    	    	          moment(),
    	    	          moment()
    	    	        ],
    	    	        "昨天": [
    	    	          moment().subtract(1, 'days'),
    	    	          moment().subtract(1, 'days'),
    	    	        ],
    	    	        "过去7天": [ moment().subtract(7, 'days'), moment().subtract(1, 'days') ],
    	    	        "过去15天": [ moment().subtract(15, 'days'), moment().subtract(1, 'days') ],
    	    	        "过去30天": [ moment().subtract(30, 'days'), moment().subtract(1, 'days') ]
    	    	      },
    	    	      "alwaysShowCalendars": true,
    	    	      "showCustomRangeLabel": false    
    	    }
    	    
    };
 
    $scope.operate = {};
    $scope.filter = filter;
    $scope.byFilter = {a: false};
    $scope.loadSelect = true;
    $scope.getSelects = function () {
        $scope.loading = true;
        getSelects($scope.byFilter.a, $scope.param.col, function (d) {
            $scope.selects = d;
            $scope.loading = false;
        });
    };

    var showValues = function () {
        var equal = ['=', '≠'];
        var openInterval = ['>', '<', '≥', '≤'];
        var closeInterval = ['(a,b]', '[a,b)', '(a,b)', '[a,b]'];
        $scope.operate.equal = $.inArray($scope.param.type, equal) > -1 ? true : false;
        $scope.operate.openInterval = $.inArray($scope.param.type, openInterval) > -1 ? true : false;
        $scope.operate.closeInterval = $.inArray($scope.param.type, closeInterval) > -1 ? true : false;
    };
    showValues();
    $scope.dbclickPush = function (o) {
        if ($scope.operate.equal) {
            if($scope.param.values.length == 1 && (_.isUndefined($scope.param.values[0]) || $scope.param.values[0]=='')){
                $scope.param.values.length = 0;
            }
            $scope.param.values.push(o);
        }
        if ($scope.operate.openInterval) {
            $scope.param.values[0] = o;
        }
        if ($scope.operate.closeInterval) {
            if ($scope.param.values[0] == undefined || $scope.param.values[0] == '') {
                $scope.param.values[0] = o;
            } else {
                $scope.param.values[1] = o;
            }
        }
    };
    $scope.deleteValues = function (array) {
        if ($scope.operate.equal) {
            $scope.param.values = _.difference($scope.param.values, array);
        }
    };
    $scope.pushValues = function (array) {
        if($scope.param.values.length == 1 && (_.isUndefined($scope.param.values[0]) || $scope.param.values[0]=='')){
            $scope.param.values.length = 0;
        }
        if ($scope.operate.openInterval) {
            array.splice(1, array.length - 1);
        }
        if ($scope.operate.closeInterval) {
            array.splice(2, array.length - 2);
        }
        _.each(array, function (e) {
            $scope.param.values.push(e);
        });
    };
    $scope.selected = function (v) {
        return _.indexOf($scope.param.values, v) == -1;
    };
    $scope.filterType = function () {
        $scope.param.values = [];
        $scope.param.values.length = 1;
        showValues();
    };
    $scope.close = function () {
        $uibModalInstance.close();
    };
    $scope.ok = function () {
        $uibModalInstance.close();
        if($scope.param.paramType =='datesinglepicker'){
        	$scope.param.values = [moment($scope.dateSinglePicker.date.sDate).format('YYYY-MM-DD')];
        }
        if($scope.param.paramType =='daterangepicker'){
        	$scope.param.type = '[a,b]'
        	$scope.param.values = [moment($scope.dateRangePicker.date.startDate).format('YYYY-MM-DD'),moment($scope.dateRangePicker.date.endDate).format('YYYY-MM-DD')]
        }
        if($scope.param.paramType =='single'){
        	$scope.param.values = [$scope.param.values];
        }
        if($scope.param.paramType =='multiple'){
        	$scope.param.values	= $scope.param.values;
        }
        $scope.param.values = _.filter($scope.param.values, function(e){
                return e != null && !_.isUndefined(e);
            }
        );
        ok($scope.param);
    };
    $scope.initValues = function () {
        if($scope.param.values.length==0){
            $scope.param.values.length = 1;
        }
    };
    $scope.getSelects();
    $scope.loadSelect=false;
});