import os

number_of_lessons = 50

for i in range(42, number_of_lessons+1):
    # if (i < 10):
    #     os.makedirs('audio/lesson_{}'.format('0'+i))
    #     os.makedirs('text/lesson_{}'.format('0'+i))
    #     os.makedirs('audio/lesson_{}/vocabulary'.format('0'+i))
    #     os.makedirs('audio/lesson_{}/example'.format('0'+i))
    #     os.makedirs('text/lesson_{}/vocabulary'.format('0'+i))
    #     os.makedirs('text/lesson_{}/example'.format('0'+i))
    # else:
    os.makedirs('audio/lesson_{}'.format(i))
    os.makedirs('text/lesson_{}'.format(i))
    os.makedirs('audio/lesson_{}/vocabulary'.format(i))
    os.makedirs('audio/lesson_{}/example'.format(i))
    os.makedirs('text/lesson_{}/vocabulary'.format(i))
    os.makedirs('text/lesson_{}/example'.format(i))
