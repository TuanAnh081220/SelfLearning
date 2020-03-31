import os
import requests
from bs4 import BeautifulSoup

source = requests.get(
    'https://www.howtostudykorean.com/unit1/unit-1-lessons-1-8/unit-1-lesson-1/').text


soup = BeautifulSoup(source, 'lxml')

audio_file_count = 1

path = os.path.join(os.getcwd(),
                    '{}.txt'.format(audio_file_count))

# audio_file_count = audio_file_count + 1


# with open(path, 'w') as f:
article = soup.find('div')

with open('1.txt', 'wb') as f:
    f.write((article.text).encode("utf-8"))

# print(article.text)
# p = article.find('p')
# f.write(p.text)
