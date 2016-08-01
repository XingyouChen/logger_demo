import web
from data_load import LL_data_loader

json_data = '{"start_date":"2016-01-01","end_date":"2016-01-07","ios_data":[1,2,3,4,5,6,7],"android_data":[7,6,5,4,3,2,1]}'
render = web.template.render('templates/')
urls = ('/','index',
        '/about','index',
        '/sysdata','sysdata'
        )

class index:
    def GET(self):
        return render.about()

    def POST(self):
        data = web.data()
        print data
        return

class sysdata:
    def __init__(self):
	self.data_loader = LL_data_loader()

    def GET(self):
	
        return render.sysdata()

    def POST(self):
        date_json = web.data()
        print date_json
	new_data_json = self.data_loader.get_data_json(date_json, ["user_count"],"bibi",["ios","android"])
	f=open("datajson.json","w")
	f.write(new_data_json)

        return new_data_json

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()