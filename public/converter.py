# json file format
"""
[
  {
    "question": "Что по определению может включать в себя ЭВМ (компьютер)?",
    "questionType": "text",
    "answerSelectionType": "multiple",
    "answers": [
      "один центральный процессор",
      "устройства ввода/вывода",
      "оперативная память",
      "процессоры ввода/вывода",
      "базы данных",
      "операционная система",
      "прикладные программы",
      "два и более центральных процессоров",
      "канал связи",
      "узел/узлы связи"
    ],
    "correctAnswer": [
      1,
      2,
      3,
      4
    ],
    "messageForCorrectAnswer": "Correct",
    "messageForIncorrectAnswer": "один центральный процессор, устройства ввода/вывода, оперативная память, процессоры ввода/вывода",
    "explanation": null,
    "point": "20"
  },
"""
# read json file
# read /tmp/pictures.txt where paths on each new line
# add new field for each question with path to picture

import json
import os

def read_file(path):
    with open(path, 'r') as f:
        return f.read()

def write_file(path, data):
    with open(path, 'w') as f:
        f.write(data)

def get_pictures(path):
    return read_file(path).split('\n')

def get_questions(path):
    return json.loads(read_file(path))

def add_pictures(questions, pictures):
    for question, picture in zip(questions, pictures):
      if picture == "null":
        question['questionPic'] = None
      else:
       question['questionPic'] = picture
    return questions

def main():
    questions = get_questions('telecom3.json')
    pictures = get_pictures('/tmp/pictures.txt')
    questions = add_pictures(questions, pictures)
    write_file('questions_with_pictures.json', json.dumps(questions, indent=2, ensure_ascii=False))

if __name__ == '__main__':
    main()
