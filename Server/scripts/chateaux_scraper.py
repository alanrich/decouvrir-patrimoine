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

# Wikipedia URL for the Châteaux list
WIKI_URL = "https://fr.wikipedia.org/wiki/Liste_de_ch%C3%A2teaux_en_France"

# Function to extract château details
def extract_chateau_details(chateau_page_url):
    response = requests.get(chateau_page_url)
    soup = BeautifulSoup(response.content, "html.parser")

    details = {
        "commune": None,
        "type": None,
        "Période ou style": None,
        "region": None,
        "region historique": None,
        "department": None,
        "Propriétaire actuel": None,
        "Coordonnées": None
    }

    # Find all tables that have class 'infobox'
    info_boxes = soup.find_all("table", class_=re.compile("infobox"))

    # Iterate through all found tables
    for info_box in info_boxes:
        rows = info_box.find_all("tr")
        for row in rows:
            header = row.find("th")
            data = row.find("td")
            
            if header and data:
                header_text = header.get_text().strip().lower()
                data_text = data.get_text().strip()

                if "commune" in header_text and not details["commune"]:
                    details["commune"] = data_text
                elif "type" in header_text and not details["type"]:
                    details["type"] = data_text
                elif "période ou style" in header_text and not details["Période ou style"]:
                    details["Période ou style"] = data_text
                elif "région" in header_text and "historique" not in header_text and not details["region"]:
                    details["region"] = data_text
                elif "région historique" in header_text and not details["region historique"]:
                    details["region historique"] = data_text
                elif "département" in header_text and not details["department"]:
                    details["department"] = data_text
                elif "propriétaire actuel" in header_text and not details["Propriétaire actuel"]:
                    details["Propriétaire actuel"] = data_text
                elif "coordonnées" in header_text and not details["Coordonnées"]:
                    latitude, longitude = dms_to_decimal(data_text)
                    if latitude and longitude:
                        details["Coordonnées"] = {
                            "latitude": latitude,
                            "longitude": longitude
                        }

    return details

# Main function to get the list of Châteaux and extract relevant information
def fetch_chateaux_list():
    response = requests.get(WIKI_URL)
    soup = BeautifulSoup(response.content, "html.parser")

    chateaux_list = []
    
    colonnes_divs = soup.find_all("div", class_="colonnes")
    
    for colonnes_div in colonnes_divs:
        chateau_items = colonnes_div.find_all("li")

        for idx, chateau in enumerate(chateau_items):
            chateau_link = chateau.find("a")
            if chateau_link and 'href' in chateau_link.attrs:
                chateau_name = chateau_link.get_text()
                chateau_url = f"https://fr.wikipedia.org{chateau_link['href']}"

                chateau_details = extract_chateau_details(chateau_url)
                chateau_data = {
                    "id": len(chateaux_list) + 1,
                    "name": chateau_name,
                    "url": chateau_url,
                    "commune": chateau_details["commune"],
                    "type": chateau_details["type"],
                    "Période ou style": chateau_details["Période ou style"],
                    "region": chateau_details["region"],
                    "region historique": chateau_details["region historique"],
                    "department": chateau_details["department"],
                    "Propriétaire actuel": chateau_details["Propriétaire actuel"],
                    "Coordonnées": chateau_details["Coordonnées"]
                }
                
                chateaux_list.append(chateau_data)

    return chateaux_list

if __name__ == "__main__":
    chateaux_data = fetch_chateaux_list()

    with open("chateaux_list.json", "w", encoding="utf-8") as f:
        json.dump(chateaux_data, f, ensure_ascii=False, indent=4)

    print("Châteaux data has been saved to chateaux_list.json")
