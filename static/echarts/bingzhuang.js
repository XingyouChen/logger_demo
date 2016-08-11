var date=[];
var ios_data=[];
var android_data=[];
var Charts = {};

var charts_name_format = {
	"chart_online_section":"平均在线时间百分比",
	"chart_data_byte_section":'平均流量消耗百分比',
}
var chart_two_data_need = {
	"chart_online_section":['0h-4h','4h-8h','8h-12h','12h-16h','16h-20h','20h-24h'],
	"chart_data_byte_section":['0-1k','1k-10k','10k-100k','100k-1m','1m-5m','5m-10m','10m-30m','30m-80m','80m-200m','200m-1g'],
	"chart_online_section_EN":['online_section_4h','online_section_8h','online_section_12h','online_section_16h','online_section_20h','online_section_24h'],
	"chart_data_byte_section_EN":['data_byte_section_1k','data_byte_section_10k','data_byte_section_100k','data_byte_section_1m','data_byte_section_5m','data_byte_section_10m','data_byte_section_30m','data_byte_section_80m','data_byte_section_200m','data_byte_section_1g']
}

function create_bingzhuang(div_id, chart_name, product_name, platform){
	var new_myChart= echarts.init(document.getElementById(div_id),'macarons');
	Charts[chart_name] = new_myChart;

	new_myChart.setOption ( {
	    baseOption: {
		timeline: {
		    axisType: 'category',
		    autoPlay: true,
		    playInterval: 1000,
		    data: [],
		    label : {
			    formatter : function(s) {
				return s.slice(5, 9);
			    }
			}
		},
		title: {
		    subtext: 'ios --- android',
		    x : 'center'
		},
		legend: {
		    orient : 'vertical',
	       		x : 'left',
		    data: [],
		},
		tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c}%"
		    },
		calculable : true,
			toolbox: {
			show : true,
			feature : {
			    mark : {show: true},
			    dataView : {show: true, readOnly: false},
			    magicType : {
				show: true, 
				type: ['pie', 'funnel'],
				option: {
				    funnel: {
				        x: '25%',
				        width: '50%',
				        funnelAlign: 'left',
				        max: 1548
				    }
				}
			    },
			    restore : {show: true},
			    saveAsImage : {show: true}
			}
		    },
		series: [
		    {
		        name: 'ios',
		        type: 'pie',
		    	radius : '50%',
		    	center: ['30%', '50%'],
		    },
				{
		        name: 'android',
		        type: 'pie',
		    	radius : '50%',
		    	center: ['70%', '50%'],
		    }
        	]
    	},
   	 options: [{}]
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

function get_item(j,platform,chart_name){
	var item_data = [];
	var real_data = {};
	if(platform =='ios'){
		real_data = ios_data;
	}else{
		real_data = android_data;
	}
	for( var i=0;i < chart_two_data_need[chart_name].length;i++){
		var item={
			name:chart_two_data_need[chart_name][i],
			value:real_data[chart_name][chart_two_data_need[chart_name+'_EN'][i]][j],
		}
		item_data.push(item);
	};
	return item_data;
}

function get_serie(j,chart_name){
	var serie=[];
	var item_data = {
		data:get_item(j,'ios',chart_name)
	};
	serie.push(item_data );
	item_data = {
		data:get_item(j,'android',chart_name)
	};
	serie.push(item_data );
	return serie;
}

function update_data(org_data_json){
	eval('var org_data ='+org_data_json);
	ios_data = org_data['ios'];
	android_data = org_data['android'];
	date = get_date_list(org_data['start_date'], org_data['end_date']);
	for(var chart_name in Charts){
		Charts[chart_name].setOption ({
		    baseOption: {
			timeline: {
			    data: date,
			},
			title: {
			    text : "iOS ——— " + charts_name_format[chart_name] + " ——— Android",
			},
			legend: {
			    orient : 'vertical',
		       		x : 'left',
			    data: chart_two_data_need[chart_name],
			},
			calculable : true,
	    	    },
			options:function() 
			{
				var option = [];
				for(var j = 0; j <7; j++){
					var item_serie = {
				    		series:get_serie(j,chart_name)
					}
					option.push(item_serie);
				}
				return option;
			}()
		}); 
	}
	
}


