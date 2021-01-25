import datetime
import json
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import psutil
from piweb.decorators import require_app_access
from . import models


def uptime_to_str(td_):
    hours = td_.seconds // 3600
    minutes = (td_.seconds % 3600) // 60
    seconds = td_.seconds % 60
    return "%dd, %dh %dmin %ds" % (td_.days, hours, minutes, seconds)


def get_home_settings(request):
    if hasattr(request.user, "homesettings"):
        return request.user.homesettings
    return models.HomeSettings.objects.create(user=request.user)

def get_server_stats():
    boot_time = datetime.datetime.fromtimestamp(psutil.boot_time())
    return {
        "cpu": psutil.cpu_percent(),
        "ram": psutil.virtual_memory()._asdict()["percent"],
        "swap": psutil.swap_memory()._asdict()["percent"],
        "disk": psutil.disk_usage("/")._asdict()["percent"],
        "uptime": uptime_to_str(datetime.datetime.now() - boot_time),
    }

@require_app_access("homepy")
def home(request):
    home_settings = get_home_settings(request)
    links = json.loads(home_settings.json)
    return render(request, "homepy/home.html", {
        "links": links,
        "stats": get_server_stats()
    })


@require_app_access("homepy")
def edit(request):
    home_settings = get_home_settings(request)
    if request.method == "POST":
        home_settings.json = request.POST.get("json", [])
        home_settings.save()
    links = json.loads(home_settings.json)
    return render(request, "homepy/edit.html", {
        "links": links
    })