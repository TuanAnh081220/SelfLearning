from bs4 import BeautifulSoup
import requests
import os

# source = requests.get(
#     'https://www.howtostudykorean.com/unit1/unit-1-lessons-17-25-2/lesson-{}/'.format(les)).text
source = requests.get(
    'https://www.howtostudykorean.com/unit1/unit-1-lessons-1-8/unit-1-lesson-6/').text

soup = BeautifulSoup(source, 'lxml')

article = soup.find('div', class_='entry-content')

flag = 0
vocab_file_count = 1
example_file_count = 1
audio_dir = os.path.join(os.getcwd(), 'audio', 'lesson_{}'.format('06'))
#    '{}.mp3'.format(audio_file_count))
text_dir = os.path.join(os.getcwd(), 'text', 'lesson_{}'.format('06'))
#   '{}.txt'.format(text_file_count))
for paragraph in article.find_all('p'):
    try:
        link = paragraph.a.get('href')
        if (link.find('.mp3') > -1):
            vocab = paragraph.find('span')
            if (vocab != None):
                vocab_info = article.find(
                    'div', id='target-' + vocab.get('id')).text
                audio_file_path = os.path.join(
                    audio_dir, 'vocabulary', '{}.mp3'.format(vocab_file_count))
                text_file_path = os.path.join(
                    text_dir, 'vocabulary', '{}.txt'.format(vocab_file_count))
                with open(audio_file_path, 'wb') as a:
                    a.write(requests.get(link).content)
                with open(text_file_path, 'wb') as t:
                    t.write(vocab_info.encode("utf-8"))
                vocab_file_count = vocab_file_count + 1
            else:
                example_info = paragraph.text
                audio_file_path = os.path.join(
                    audio_dir, 'example', '{}.mp3'.format(example_file_count))
                text_file_path = os.path.join(
                    text_dir, 'example', '{}.txt'.format(example_file_count))
                with open(audio_file_path, 'wb') as a:
                    a.write(requests.get(link).content)
                with open(text_file_path, 'wb') as t:
                    t.write(example_info.encode("utf-8"))
                example_file_count = example_file_count + 1
        else:
            continue
    except Exception as e:
        pass
