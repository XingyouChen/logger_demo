var date=[];
var ios_data=[];
var android_data=[];
var Charts_one = {};
var Charts_mix = {};

var charts_name_format = {
	"chart_user_count":"用户数量",
	"chart_avg_timeused":'平均信令延时',
	"chart_avg_channel_time":'平均CHANNEL存活时间',
	"chart_avg_carrier_match":'运营商匹配度',
	"chart_history_match":'客户端沉淀策略匹配度',
	"chart_call_num":'每日总通话次数',
	"chart_call_fail":'每日信令失败率',
	"chart_average_online":'平均在线时长',
	"chart_avg_databyte":'平均流量消耗',
	"chart_online_time":'平均在线时长分位图',
	"chart_data_byte":'平均流量消耗分位图'
}

var charts_unit = {
	"chart_user_count":["人",1],
	"chart_avg_timeused":['s',1],
	"chart_avg_channel_time":['s',1],
	"chart_avg_carrier_match":['',0.01],
	"chart_history_match":['',0.01],
	"chart_call_num":['',1],
	"chart_call_fail":['',0.01],
	"chart_average_online":['s',1],
	"chart_avg_databyte":['K',1024],
	"chart_online_time":['s',1],
	"chart_data_byte":['K',1024]
}
var chart_one_data_need = {
	"chart_user_count":'user_count',
	"chart_avg_timeused":'avg_timeused',
	"chart_avg_channel_time":'avg_channel_time',
	"chart_avg_carrier_match":'avg_carrier_match',
	"chart_history_match":'history_match',
	"chart_call_num":'call_num',
	"chart_call_fail":'call_fail',
	"chart_average_online":'average_online',
	"chart_avg_databyte":'avg_databyte',
}

var chart_mix_data_need = {
	"chart_online_time":['平均在线时长','5分位','20分位','50分位','80分位','95分位'],
	"chart_online_time_EN":['average_online','online_fractile_5','online_fractile_20','online_fractile_50','online_fractile_80','online_fractile_95'],
	"chart_data_byte":['平均流量消耗','50分位','80分位','95分位'],
	"chart_data_byte_EN":['avg_databyte','data_byte_fractile_50','data_byte_fractile_80','data_byte_fractile_95']
}


function create_zhexian_one(div_id, chart_name, product_name, platform){
	
	var new_myChart= echarts.init(document.getElementById(div_id),'macarons');
	Charts_one[chart_name] = new_myChart;
	new_myChart.setOption({
	    title : {
		text: charts_name_format[chart_name],
	    },
	    tooltip : {
		trigger: 'axis'
	    },
	    legend: {
		data:['ios','android']
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
		scale:true,
		axisLabel : {formatter:'{value}' + charts_unit[chart_name][0]}
	    }
	    ],
	    series : [
	    {
		name:'ios',
		type:'line',
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
		},
		itemStyle : {
          		normal : {
          			lineStyle : {
          				width : 2
          				
       				 }
       			 }
        	}
	    },
	    {
		name:'android',
		type:'line',
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
		},
		itemStyle : {
          		normal : {
          			lineStyle : {
          				width : 2
          				
       				 }
       			 }
        	}
	    }
	    ]
	});

}

function create_zhexian_mix(div_id, chart_name, product_name, platform){
	var new_myChart= echarts.init(document.getElementById(div_id),'macarons');
	Charts_mix[platform + '_' + chart_name ] = new_myChart;
	new_myChart.setOption({
	    title : {
		text: platform + charts_name_format[chart_name],
	    },
	    tooltip : {
		trigger: 'axis'
	    },
	    legend: {
		data:chart_mix_data_need[chart_name]
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
		axisLabel :  {formatter:'{value}' + charts_unit[chart_name][0]}
	    }
	    ],
	    series :function(){
		var serie=[];
		for( var i=0;i < chart_mix_data_need[chart_name].length;i++){
			var item={
			name:chart_mix_data_need[chart_name][i],
			data:[],
			type:'line',
			
			}
			serie.push(item);
		};
		return serie;
		}()
	});

}


function get_date_list(start_date, end_date){
	start_date = new Date(start_date.replace(/-/g, "/"));
	end_date = new Date(end_date.replace(/-/g,  "/"));
	new_date = [];
	for(var day = start_date;day <= end_date; day.setDate( day.getDate() + 1)){
		new_date.push(day.toLocaleDateString());
	}
	return new_date;
}

function update_data(org_data_json){
	eval('var org_data ='+org_data_json);
	ios_data = org_data['ios'];
	android_data = org_data['android'];
	date = get_date_list(org_data['start_date'], org_data['end_date']);	
	for(var chart_name in Charts_one){
		Charts_one[chart_name].setOption({
			xAxis : [{
				type : 'category',
				data : date
		    	}],
			series: [
			{
				name:'ios',
				data:ios_data[chart_name][chart_one_data_need[chart_name]],
				type:'line'
			},
			{
				name:'android',
				data:android_data[chart_name][chart_one_data_need[chart_name]],
				type:'line'
			}]
		});
	}
	for(var chart_name in Charts_mix){
		
		
		var mix_data;
		var real_name;
		if(chart_name[0] == 'i'){
			mix_data = ios_data;
			real_name = chart_name.substr(4);
		}
		else{
			mix_data = android_data;
			real_name = chart_name.substr(8);
		}
		
		Charts_mix[chart_name].setOption({
			xAxis : [{
				type : 'category',
				data : date
		    	}],
			series: function(){
				var serie=[];
				for( var i=0;i < chart_mix_data_need[real_name].length;i++){
					
					if(chart_mix_data_need[real_name+'_EN'][i].indexOf('avg') >=0 || chart_mix_data_need[real_name+'_EN'][i].indexOf('average') >= 0){
						var item={
						name:chart_mix_data_need[real_name][i],
						data:mix_data[real_name][chart_mix_data_need[real_name+'_EN'][i]],
						type:'line',
						itemStyle: {
							normal: {
							    color: 'red',
							    lineStyle: {       
								width: 2,
								type: 'dashed'
							    }
							}
						}
						}
						serie.push(item);
						
					}
					else{
						var item={
						name:chart_mix_data_need[real_name][i],
						data:mix_data[real_name][chart_mix_data_need[real_name+'_EN'][i]],
						type:'line',
						itemStyle: {normal: {areaStyle: {type: 'default'}}},
						}
						serie.push(item);
					}
				};
				return serie;
				}()
		});
	}

	
}


