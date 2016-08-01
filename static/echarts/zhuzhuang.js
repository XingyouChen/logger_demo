var myChart = echarts.init(document.getElementById('zhuzhuang'),'macarons');
var date=[];
var ios_data=[];
var android_data=[];

myChart.setOption({
    title : {
        text: '使用用户数量',
            subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['IOS','Android']
        },
        toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [{
        type : 'category',
        data : date
    }],
    yAxis : [
    {
        type : 'value',
        axisLabel : {formatter:'{value} '}
    }
    ],
    series : [
    {
        name:'IOS',
        type:'bar',
        data:ios_data,
        markPoint : {
            data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
            ]
        },
        markLine : {
            data : [
                {type : 'average', name: '平均值'}
            ]
        }
    },
    {
        name:'Android',
        type:'bar',
        data:android_data,
        markPoint : {
            data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
            ]
        },
        markLine : {
            data : [
                {type : 'average', name : '平均值'}
            ]
        }
    }
    ]
});

function get_date_list(start_date, end_date){
	start_date = new Date(start_date.replace(/-/g, "/"));
	end_date = new Date(end_date.replace(/-/g,  "/"));
	new_date = [];
	for(var day = start_date;day < end_date; day.setDate( day.getDate() + 1)){
		new_date.push(day.toLocaleDateString());
	}
	return new_date;
}



function update_data(org_data_json){
	var org_data = eval('(' + org_data_json + ')');
	ios_data = org_data.ios_data;
	android_data = org_data.android_data;

	date = get_date_list(org_data.start_date, org_data.end_date);	

	myChart.setOption({
	xAxis : [{
		type : 'category',
		data : date
    	}],
	series : [
	    {
		name:'IOS',
		data:ios_data[0],
	    },
	    {
		name:'Android',
		data:android_data[0],
	    }
	    ]
	})
}


