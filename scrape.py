import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime

page = BeautifulSoup(requests.get('http://www.foodispower.org/chocolate-list/').content, "html.parser")

entry = page.find("div", {"class": "post-entry"})

vendors = []

rating = ""

for x in entry.find_all(["a", "div"]):
    if x.has_attr("name"):
        rating = x['name']
        print(rating)
    else:
        if rating != "" and len(x) == 1:
            vendor = x.text.replace("\u2013 ", "")
            print("    " + vendor)
            vendors.append({"vendor": vendor, "rating": rating})

filename = "choclist.{0}.json".format(datetime.now().replace(microsecond=0).isoformat().replace(":", "-"))

print("writing to {0}".format(filename))

with open(filename, 'w') as outfile:
    json.dump(vendors, outfile, indent=4)
