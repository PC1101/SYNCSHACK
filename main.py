import re
import requests

URLs = [
    "https://www.eventbrite.com.au/e/colour-me-with-confidence-sydney-conference-tickets-942688997167?aff=ehometext",
    "https://www.eventbrite.com.au/e/aibconnect-sydney-tickets-948657037737?aff=ehometext",
    "https://www.eventbrite.com.au/e/propagation-workshop-at-watsons-bay-library-registration-943149183597?aff=ehometext",
    "https://www.eventbrite.com.au/e/2024-culture-leadership-conference-sydney-tickets-894033717917?aff=ehometext",
    "https://www.eventbrite.com.au/e/poof-doof-red-rave-sydney-tickets-953137960297?aff=ehometext",
    "https://www.eventbrite.com.au/e/second-life-archive-sydney-alpha-tickets-978139540697?aff=ehometext",
    "https://www.eventbrite.com.au/e/the-travel-associates-luxury-event-cruise-sydney-tickets-933037218437?aff=ehometext",
    "https://www.eventbrite.com.au/e/colour-me-with-confidence-sydney-conference-tickets-942688997167?aff=ehometext"
]

pages = []

with open('page0.html', 'r') as f:
    page_text = f.readlines()

    for line in page_text:
        # retrieving title
        if line.__contains__("og:title"):
            start = re.search("content=\"", line)
            end = re.search("\" />", line)

            print(line[start.end()+1:end.start])

            # page_info['title'] = line[start.end()+1:end.start]
            break

# for i in range(len(URLs)):
#     url = URLs[i]
    
#     with open(f'page{i}.html', 'w') as f:
#         page_text = requests.get(url).text

#         page_info = {}

#         for line in page_text:
#             # retrieving title
#             if line.__contains__("og:title"):
#                 start = re.search("content=\"", line)
#                 end = re.search("\" />", line)

#                 page_info['title'] = line[start.end()+1:end.start]
#                 break

#         pages.append(page_info)

# print(pages)