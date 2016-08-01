import json
import MySQLdb
class LL_data_loader(object):
	def __init__(self):
		self.conn=MySQLdb.connect("localhost","chenxingyou","123456","LL_data");
		self.cursor = self.conn.cursor()	
		self.str_select_date = " where log_date >= '%s' and log_date <= '%s';"
		self.datalist = {'ios':[],'android':[]}

	def __del__(self):
		self.conn.close()
		self.cursor.close()

	def get_date_list(self, data_name_list, product_type ,phone_platform):
		
		self.datalist[phone_platform] =[]
		
		print data_name_list
		for  one_data_kind in data_name_list:
			str_select = "select " + one_data_kind + " from " + "LL_" + product_type + "_" + phone_platform  + self.str_select_date
			self.cursor.execute( str_select % (self.date_dict["start_date"],self.date_dict["end_date"]))
			org_one_data_list = self.cursor.fetchall()
			one_data_list = []
			for onedata in org_one_data_list:
				one_data_list.append(onedata[0])
			self.datalist[phone_platform] .append(one_data_list)

	def get_data_json(self, date_json, data_name_list, product_type,phone_platform_list):
		print "data_json start"
		self.date_dict = json.loads(date_json)

		for  phone_platform in phone_platform_list:
			self.get_date_list(data_name_list, product_type ,phone_platform)
		
		data_dict = self.date_dict.copy()

		if 'ios' not in phone_platform_list:
			data_dict['ios_data'] = None
		else:
			data_dict['ios_data'] = self.datalist['ios']

		if 'android' not in phone_platform_list:
			data_dict['android_data'] = None
		else:
			data_dict['android_data'] = self.datalist['android']

		data_json = json.dumps(data_dict)
		print "data_json ok"
		return data_json

		
		
		


