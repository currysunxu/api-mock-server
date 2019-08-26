import os
import jmespath
from python.libs.load_data import JsonsData
from python.libs.group_info import GroupDataMapping,InprogressGroup



def create_pt_session():

  session_base_info = {
    'teacher_id': 60003,
    'session_data': '2019-08-20',
    'product': 'TB_v3bk1',  #SS, HF, (find the supported group product in group_info.py
    'classroom': 'Romaye'

  }
  group_key = session_base_info['product']

  session_json = JsonsData(os.path.abspath('../data/sessions.json'))


  session_group_id = getattr(GroupDataMapping, group_key)['GroupId']
  session_group_code = getattr(GroupDataMapping,group_key)['GroupCode']
  session_coursetype_level_code = getattr(InprogressGroup,group_key)['CourseTypeLevel']['Code']
  new_session = {
    "id": '_'.join([str(session_base_info['teacher_id']),session_base_info['session_data']]),
    "data": [
      {
          "GroupId": session_group_id,
          "CourseTypeCode": session_base_info['product'],
          "CourseTypeLevelCode": session_coursetype_level_code,
          "StartTime": session_base_info['session_data'] +"T10:00:00",
          "EndTime": session_base_info['session_data'] + "T11:00:00",
          "GroupCode": session_group_code,
          "Classroom": session_base_info['classroom']
      }
    ]
  }
  session_json.update(new_session)

  #create session members
  pt_groupmembers_json = JsonsData(os.path.abspath('../data/groupinfos.json'))

  group_session_id_list = jmespath.search('[].id', pt_groupmembers_json.params)
  if session_group_id in group_session_id_list:
    return
  else:
    members_in_group= get_student_list_from_group(session_group_id)

    student_profile_json = JsonsData(os.path.abspath('../data/profiles.json'))

    group_student_list = list(map(lambda x:jmespath.search("[?id=='{0}' || id == `{0}`].data".format(x), student_profile_json.params)[0],members_in_group))



    new_session_member = {
      "id": session_group_id,
      "data": group_student_list
    }

    pt_groupmembers_json.update(new_session_member)


def get_student_list_from_group(group_id):
  inprogress_groups_json = JsonsData(os.path.abspath('../data/inprogressgroups.json'))
  student_list = []
  for student in inprogress_groups_json.params:
    if group_id in jmespath.search('data[].GroupId',student):
      student_list.append(str(jmespath.search('id', student)))
  return student_list




if __name__ == '__main__':
  create_pt_session()
