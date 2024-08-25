import re
import requests
import json
from bs4 import BeautifulSoup
from urllib.parse import urljoin


def eventbrite_find_events() -> dict:
    """
    Finds all event urls from each event category and returns dictionary separated by category
    :return: Dictionary of all event urls
    """
    output_dict = {}

    event_types = {
        "music": "https://www.eventbrite.com.au/b/local/music",
        "nightlife": "https://www.eventbrite.com.au/b/local/nightlife",
        "arts": "https://www.eventbrite.com.au/b/local/arts",
        "holiday": "https://www.eventbrite.com.au/b/local/holiday",
        "dating": "https://www.eventbrite.com.au/b/local/home-and-lifestyle/dating",
        "hobbies": "https://www.eventbrite.com.au/b/local/hobbies",
        "business": "https://www.eventbrite.com.au/b/local/business",
        "food-and-drink": "https://www.eventbrite.com.au/b/local/food-and-drink"
    }

 

    event_type_names = list(event_types.keys())

    for event_type in event_type_names:
        temp_ls = []
        url = event_types[event_type]
        response = requests.get(url)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            links = soup.find_all('a')

            # Extract and print the absolute URLs
            for link in links:
                href = link.get('href')
                if href:
                    # Convert relative URLs to absolute URLs
                    full_url = urljoin(url, href)

                    if full_url.__contains__("/e/"):
                        temp_ls.append(full_url + '\n')

        output_dict[event_type] = temp_ls

    return output_dict


def eventbrite_strip_event_info(URLs: list) -> list:
    pages = []

    for i in range(len(URLs)):
        url = URLs[i]
        page_text = (requests.get(url).text).split("\n")
        page_info = {}

        for line in page_text:
            # retrieving sitename
            if "og:site_name" in line:
                match = re.search(r'content="([^"]*)"', line)
                if match:
                    result = match.group(1)
                    page_info['site_name'] = result
                    continue

            # retrieving image url
            if "og:image" in line:
                match = re.search(r'content="([^"]*)"', line)
                if match:
                    result = match.group(1)
                    page_info['image_url'] = result
                    continue

            # retrieving title
            if "og:title" in line:
                match = re.search(r'content="([^"]*)"', line)
                if match:
                    result = match.group(1)
                    page_info['title'] = result
                    continue

            # retrieving description
            if "og:description" in line:
                match = re.search(r'content="([^"]*)"', line)
                if match:
                    result = match.group(1)
                    page_info['description'] = result
                    continue

            # retrieving url
            if "og:url" in line:
                match = re.search(r'content="([^"]*)"', line)
                if match:
                    result = match.group(1)
                    page_info['url'] = result
                    continue

            # retrieving type
            if "og:type" in line:
                match = re.search(r'content="([^"]*)"', line)
                if match:
                    result = match.group(1)
                    page_info['type'] = result
                    continue

            # retrieving latitude
            if "event:location:latitude" in line:
                match = re.search(r'content="([^"]*)"', line)
                if match:
                    result = match.group(1)
                    page_info['latitude'] = result
                    continue

            # retrieving longitude
            if "event:location:longitude" in line:
                match = re.search(r'content="([^"]*)"', line)
                if match:
                    result = match.group(1)
                    page_info['longitude'] = result
                    continue

            # retrieving start time
            if "event:start_time" in line:
                match = re.search(r'content="([^"]*)"', line)
                if match:
                    result = match.group(1)
                    page_info['start_time'] = result
                    continue

            # retrieving end time
            if "event:end_time" in line:
                match = re.search(r'content="([^"]*)"', line)
                if match:
                    result = match.group(1)
                    page_info['end_time'] = result
                    continue

        pages.append(page_info)

    return pages


def convert_to_json(page_info: list):
    """
    Structure Idea:

    {
        "eventbrite": {
            "music": [
                {
                    "name": "one",
                    "desc": "two",
                    "image": "three",
                },
                {
                    "name": "one",
                    "desc": "two",
                    "image": "three",
                }
            ],
            "nightlife": [
                {
                    "name": "one",
                    "desc": "two",
                    "image": "three",
                },
                {
                    "name": "one",
                    "desc": "two",
                    "image": "three",
                }
            ]
        }
        "website_two": {
            ...
            ...
            ...
        }
    }

    :param page_info:
    :return:
    """

    existing_websites_ls = []
    websites = {}

    for i in range(len(page_info)):
        # for eventbrite
        if i == 0:
            existing_websites_ls.append('eventbrite')
            websites['eventbrite'] = {}

            for event_type in page_info[i].keys():
                websites['eventbrite'][event_type] = page_info[i][event_type]

    with open('output.json', 'w') as f:
        json.dump(websites, f)


def main():
    # scraping off eventbrite
    eventbrite_urls = eventbrite_find_events()
    event_types = ['music', 'nightlife', 'arts', 'holiday', 'dating',
                     'hobbies', 'business', 'food-and-drink']

    eventbrite_event_info = {}

    for event_type in event_types:
        event_info_ls = eventbrite_strip_event_info(eventbrite_urls[event_type])
        eventbrite_event_info[event_type] = event_info_ls


    website_ls = [eventbrite_event_info]
    convert_to_json(website_ls)



if __name__ == "__main__":
    main()
