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

# Wikipedia URL for the list of cathedrals
WIKI_URL = "https://fr.wikipedia.org/wiki/Liste_de_cath%C3%A9drales_catholiques_en_France"

# Function to extract cathedral details
def extract_cathedral_details(cathedral_page_url):
    response = requests.get(cathedral_page_url)
    soup = BeautifulSoup(response.content, "html.parser")

    details = {
        "Style dominant": None,
        "Site web": None,
        "Department": None,
        "Region": None,
        "Ville": None,
        "Coordonnées": None
    }

    info_box = soup.find("table", {"class": "infobox"})
    
    if info_box:
        rows = info_box.find_all("tr")
        for row in rows:
            header = row.find("th")
            data = row.find("td")

            if header and data:
                header_text = header.get_text().strip().lower()
                data_text = data.get_text().strip()

                if "style dominant" in header_text:
                    details["Style dominant"] = data_text
                elif "site web" in header_text:
                    details["Site web"] = data.find("a")["href"] if data.find("a") else None
                elif "département" in header_text:
                    details["Department"] = data_text
                elif "région" in header_text:
                    details["Region"] = data_text
                elif "ville" in header_text:
                    details["Ville"] = data_text
                elif "coordonnées" in header_text:
                    latitude, longitude = dms_to_decimal(data_text)
                    if latitude and longitude:
                        details["Coordonnées"] = {
                            "latitude": latitude,
                            "longitude": longitude
                        }

    return details

# Main function to get the list of cathedrals and extract relevant information
def fetch_cathedrals_list():
    response = requests.get(WIKI_URL)
    soup = BeautifulSoup(response.content, "html.parser")

    cathedrals_list = []

    table_body = soup.find("table", {"class": "wikitable"}).find("tbody")
    rows = table_body.find_all("tr")[1:]  # Skip header row

    for idx, row in enumerate(rows):
        cells = row.find_all("td")
        if len(cells) > 1:
            cathedral_link = cells[1].find("span").find("a")
            if cathedral_link:
                cathedral_name = cathedral_link.get_text()
                cathedral_url = f"https://fr.wikipedia.org{cathedral_link['href']}"

                cathedral_details = extract_cathedral_details(cathedral_url)
                cathedral_data = {
                    "id": idx + 1,
                    "name": cathedral_name,
                    "url": cathedral_url,
                    "Style dominant": cathedral_details["Style dominant"],
                    "Site web": cathedral_details["Site web"],
                    "Department": cathedral_details["Department"],
                    "Region": cathedral_details["Region"],
                    "Ville": cathedral_details["Ville"],
                    "Coordonnées": cathedral_details["Coordonnées"]
                }

                cathedrals_list.append(cathedral_data)

    return cathedrals_list

if __name__ == "__main__":
    cathedrals_data = fetch_cathedrals_list()

    with open("cathedrals_list.json", "w", encoding="utf-8") as f:
        json.dump(cathedrals_data, f, ensure_ascii=False, indent=4)

    print("Cathedrals data has been saved to cathedrals_list.json")
