import web
from data_load import LL_data_loader
data_loader = LL_data_loader()
json_data = '{"start_date":"2016-01-01","end_date":"2016-01-07","ios_data":[1,2,3,4,5,6,7],"android_data":[7,6,5,4,3,2,1]}'
render = web.template.render('templates/')
urls = ('/','home_page',
	'/homepage','home_page',
        '/daydata','day_data',
        '/datedata','date_data'
        )

class home_page:
    def GET(self):
        return render.home_page()

    def POST(self):
        data = web.data()
        print data
        return

class day_data:
    def GET(self):
        return render.day_data()

    def POST(self):
	date_json = web.data()
	new_data_json = data_loader.get_data_json(date_json, ["chart_online_section","chart_data_byte_section"],"bibi",['ios','android'])
	return new_data_json

class date_data:
    def GET(self):
	
        return render.date_data()

    def POST(self):
        date_json = web.data()
	new_data_json = data_loader.get_data_json(date_json, ["chart_call_num","chart_call_fail","chart_user_count","chart_avg_timeused","chart_avg_channel_time","chart_avg_carrier_match","chart_history_match","chart_online_time",'chart_data_byte',"chart_avg_databyte","chart_average_online"],"bibi",['ios','android'])
        return new_data_json

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()
