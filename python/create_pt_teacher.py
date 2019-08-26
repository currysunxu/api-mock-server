import os
import jmespath
from python.libs.load_data import JsonsData



def create_teacher():

  teacher_base_info = {
    'teacher_id': 60003,
    'teacher_login_email': 'pt2@teacher.com',
    'display_name': 'pt teacher1',
    'country_school': [{'CN':['BJP']}, {'RU':['RUS','RUR']}]
  }

  teacher_json = JsonsData(os.path.abspath('../data/teachers.json'))

  teacher_email_list = jmespath.search('[].id', teacher_json.params)
  teacher_id_list = jmespath.search('[].data', teacher_json.params)

  if teacher_base_info['teacher_id'] in teacher_id_list:
    raise Exception('Existing teacher id')
  if teacher_base_info['teacher_login_email'] in teacher_email_list:
    raise Exception('Existing teacher email')
  new_teacher ={
    "id": teacher_base_info['teacher_login_email'],
    "data": teacher_base_info['teacher_id']
  }
  teacher_json.update(new_teacher)

  user_json = JsonsData(os.path.abspath('../data/users.json'))
  country_school =[]
  for country in teacher_base_info['country_school']:
    school={
            "CountryCode": list(country.keys())[0],
            "SchoolCodes":list(country.values())[0]
          }
    country_school.append(school)

  new_teacher_profile = {
    "id": teacher_base_info['teacher_id'],
    "data": {
      "UserId": teacher_base_info['teacher_id'],
      "AvatarURL": None,
      "FirstName": teacher_base_info['display_name'],
      "LastName": None,
      "Gender": None,
      "DisplayName": teacher_base_info['display_name'],
      "SchoolsInCounty": country_school
    }
  }
  user_json.update(new_teacher_profile)

if __name__ == '__main__':
  create_teacher()
