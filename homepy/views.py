import datetime
import json
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import psutil
from . import models


def uptime_to_str(td_):
    hours = td_.seconds // 3600
    minutes = (td_.seconds % 3600) // 60
    seconds = td_.seconds % 60
    return "%dd, %dh %dmin %ds" % (td_.days, hours, minutes, seconds)


@login_required
def home(request):
    links = json.loads(models.HomeSettings.load().json)
    boot_time = datetime.datetime.fromtimestamp(psutil.boot_time())
    uptime = uptime_to_str(datetime.datetime.now() - boot_time)
    return render(request, "homepy/home.html", {
        "links": links,
        "cpu": psutil.cpu_percent(),
        "ram": psutil.virtual_memory()._asdict()["percent"],
        "swap": psutil.swap_memory()._asdict()["percent"],
        "disk": psutil.disk_usage("/")._asdict()["percent"],
        "uptime": uptime,
        "users": [user._asdict() for user in psutil.users()]
    })
