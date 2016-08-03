import json
import MySQLdb

chart_date_need = {
	"chart_user_count":['user_count'],
	"chart_median_timeused":['median_timeused'],
	"chart_avg_channel_time":['avg_channel_time'],
	"chart_avg_carrier_match":['avg_carrier_match'],
	"chart_history_match":['history_match'],
	"chart_average_online":['average_online'],
	"chart_avg_databyte":['avg_databyte'],
	"chart_online_time":['average_online','online_fractile_5','online_fractile_20','online_fractile_50','online_fractile_80','online_fractile_95'],
	"chart_data_byte":['avg_databyte','data_byte_fractile_50','data_byte_fractile_80','data_byte_fractile_95'],
	"chart_online_section":['online_section_4h','online_section_8h','online_section_12h','online_section_16h','online_section_20h','online_section_24h'],
	"chart_data_byte_section":['data_byte_section_100k','data_byte_section_1m','data_byte_section_10m','data_byte_section_100m']

}

class LL_data_loader(object):
	def __init__(self):
		self.conn=MySQLdb.connect("localhost","chenxingyou","123456","LL_data");
		self.cursor = self.conn.cursor()	
		self.str_select_date = " where log_date >= '%s' and log_date <= '%s';"

	def __del__(self):
		self.conn.close()
		self.cursor.close()

	def get_date_list(self, chart_name, product_type ,phone_platform):
		
	

		print "get_date_list"
		data_kind =" " 
		
		for  one_data_kind in chart_date_need[chart_name]:
			data_kind += one_data_kind + ','

		data_kind = data_kind[:-1]
		
		str_select = "select " + data_kind + " from " + "LL_" + product_type + "_" + phone_platform  + self.str_select_date
		print str_select % (self.date_dict["start_date"],self.date_dict["end_date"])
		self.cursor.execute( str_select % (self.date_dict["start_date"],self.date_dict["end_date"]))
		org_one_data_list = self.cursor.fetchall()
		
		
		one_chart_data = {}
		num = 0
		for  one_data_kind in chart_date_need[chart_name]:
			one_chart_data[one_data_kind] = [x[num] for x in org_one_data_list]
			num += 1
		
		return one_chart_data

	def get_data_json(self, date_json, charts_name, product_type,phone_platform_list):
		
		print 1
		self.date_dict = json.loads(date_json)

		data_dict = self.date_dict.copy()
		data_dict['ios']={}
		data_dict['android']={}
		for  one_chart_name in charts_name:
			for  phone_platform in phone_platform_list:
				data_dict[phone_platform][one_chart_name] = self.get_date_list(one_chart_name, product_type ,phone_platform)

		data_json = json.dumps(data_dict)
		print data_json
		return data_json

		
		
		


