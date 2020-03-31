import os
import requests

for les in range(2, 51):
    lesson_numb = '{}'.format(les).zfill(2)
    os.chdir('audio/lesson_{}/example'.format(lesson_numb))
    with open('00.mp3', 'ab') as final_file:
        for f in os.listdir():
            with open(f, 'rb') as rf:
                for line in rf:
                    final_file.write(line)
    os.chdir('..')
    os.chdir('vocabulary')
    with open('00.mp3', 'ab') as final_file:
        for f in os.listdir():
            with open(f, 'rb') as rf:
                for line in rf:
                    final_file.write(line)
    os.chdir('../../..')
    print(os.getcwd())

# os.chdir('audio/lesson_01/example')

# for f in os.listdir():
#     f_name, f_ext = os.path.splitext(f)
#     print(f_ext)
#     new_name = '{}.mp3'.format(f_name.zfill(2), f_ext)
#     os.rename(f, new_name)
#     # print(f)
