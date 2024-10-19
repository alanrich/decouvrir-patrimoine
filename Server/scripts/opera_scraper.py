import requests
from bs4 import BeautifulSoup
import json
import re

# Function to convert DMS to Decimal Degrees
def dms_to_decimal(coord_string):
    pattern = re.compile(r"(\d+)°\s*(\d+)′\s*(\d+)″\s*([nsewNSEW]+)")
    matches = pattern.findall(coord_string)
    
    if len(matches) == 2:
        lat_deg, lat_min, lat_sec, lat_dir = matches[0]
        latitude = int(lat_deg) + int(lat_min) / 60 + int(lat_sec) / 3600
        if lat_dir.lower() == 's':
            latitude = -latitude

        lon_deg, lon_min, lon_sec, lon_dir = matches[1]
        longitude = int(lon_deg) + int(lon_min) / 60 + int(lon_sec) / 3600
        if lon_dir.lower() == 'w':
            longitude = -longitude

        return latitude, longitude
    return None, None

# Wikipedia URL for the list of opera houses in France
WIKI_URL = "https://fr.wikipedia.org/wiki/Cat%C3%A9gorie:Salle_d%27op%C3%A9ra_en_France"

# Function to extract opera house details
def extract_opera_details(opera_page_url):
    response = requests.get(opera_page_url)
    soup = BeautifulSoup(response.content, "html.parser")

    details = {
        "Type": None,
        "Lieu": None,
        "Architecte": None,
        "Inauguration": None,
        "Capacité": None,
        "Site web": None,
        "Coordonnées": None
    }

    # Find the infobox element on the page
    infobox = soup.find(class_=re.compile("infobox"))
    
    if infobox:
        tbody = infobox.find("tbody")
        if tbody:
            rows = tbody.find_all("tr")
            for row in rows:
                header = row.find("th")
                data = row.find("td")

                if header and data:
                    header_text = header.get_text().strip().lower()
                    data_text = data.get_text().strip()

                    if "type" in header_text:
                        details["Type"] = data_text
                    elif "lieu" in header_text:
                        details["Lieu"] = data_text
                    elif "architecte" in header_text:
                        details["Architecte"] = data_text
                    elif "inauguration" in header_text:
                        details["Inauguration"] = data_text
                    elif "capacité" in header_text:
                        details["Capacité"] = data_text
                    elif "site web" in header_text:
                        details["Site web"] = data.find("a")["href"] if data.find("a") else None
                    elif "coordonnées" in header_text:
                        latitude, longitude = dms_to_decimal(data_text)
                        if latitude and longitude:
                            details["Coordonnées"] = {
                                "latitude": latitude,
                                "longitude": longitude
                            }

    return details

# Main function to get the list of opera houses and extract relevant information
def fetch_opera_list():
    response = requests.get(WIKI_URL)
    soup = BeautifulSoup(response.content, "html.parser")

    opera_list = []
    
    category_div = soup.find("div", {"class": "mw-category mw-category-columns"})
    if category_div:
        groups = category_div.find_all("div", {"class": "mw-category-group"})

        for group in groups:
            opera_items = group.find_all("li")

            for idx, opera in enumerate(opera_items):
                opera_link = opera.find("a")
                if opera_link and 'href' in opera_link.attrs:
                    opera_name = opera_link.get_text()
                    opera_url = f"https://fr.wikipedia.org{opera_link['href']}"

                    # Extract the details from the opera page
                    opera_details = extract_opera_details(opera_url)
                    opera_data = {
                        "id": len(opera_list) + 1,
                        "name": opera_name,
                        "url": opera_url,
                        "Type": opera_details["Type"],
                        "Lieu": opera_details["Lieu"],
                        "Architecte": opera_details["Architecte"],
                        "Inauguration": opera_details["Inauguration"],
                        "Capacité": opera_details["Capacité"],
                        "Site web": opera_details["Site web"],
                        "Coordonnées": opera_details["Coordonnées"]
                    }

                    opera_list.append(opera_data)

    return opera_list

if __name__ == "__main__":
    opera_data = fetch_opera_list()

    with open("opera_houses_list.json", "w", encoding="utf-8") as f:
        json.dump(opera_data, f, ensure_ascii=False, indent=4)

    print("Opera houses data has been saved to opera_houses_list.json")

