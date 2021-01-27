import os
import jmespath
from python.libs.load_data import JsonsData
from python.libs.group_info import GroupDataMapping, InprogressGroup, BookableGroup


def create_student(group_id = None):
  # input the student info,only support 1 student with 1 group
  student_course_type = ['SS', 'v3bk1'] # ss:['SS','v3bk1] tb['TB','v3bk1'] HF:['HF','C'],['HFV3','C']
  student_base_info = {
    'student_id': '10471',
    'ilab_user_name': 'ss35.cn.01',
    'student_english_name': 'ss35test',
    'studdent_last_name': 'test',
    'business_line_code':'OWN',
    "deepblue_schoolcode": "China_Omni",
    "school_code": "SNA",
    "gp_user": True
  }
  students_json = JsonsData(os.path.abspath('../data/students.json'))
  student_ilab_list =jmespath.search('[].id',students_json.params)
  student_id_list = jmespath.search('[].data.CustomerId', students_json.params)

  if student_base_info['student_id'] in student_id_list:
    raise Exception('Existing Student id')
  if student_base_info['ilab_user_name'] in student_ilab_list:
    raise Exception('Existing ilab username')

  # add students.json
  new_student = {
    "id": student_base_info['ilab_user_name'],
    "data": {
      "CustomerId": student_base_info['student_id']
    }
  }
  students_json.update(new_student)


  gpgroup_json = JsonsData(os.path.abspath('../data/gpgroups.json'))


  if student_base_info['gp_user']:
    new_gpgroup = {
      "id": int(student_base_info['student_id']),
      "data": {
        "StartDate": "1970-01-01T00:00:00.000Z",
        "ExpireDate": "2028-01-01T00:00:00.000Z"
      }
    }
  else:
    new_gpgroup = {
      "id": int(student_base_info['student_id']),
      "data": {
        "StartDate": "1970-01-01T00:00:00.000Z",
        "ExpireDate": "1970-01-01T00:00:00.000Z"
      }
    }

  gpgroup_json.update(new_gpgroup)

  # add inprogressgroup
  inprogressgroup_json = JsonsData(os.path.abspath('../data/inprogressgroups.json'))
  product_group = getattr(GroupDataMapping, '_'.join(student_course_type)).copy()

  product_group.update(getattr(InprogressGroup, '_'.join(student_course_type)))

  new_ingressgroup = {
    "id": int(student_base_info['student_id']),
    'data': [product_group]

  }
  inprogressgroup_json.update(new_ingressgroup)

  # add enrolled groups
  enrollgroup_json = JsonsData(os.path.abspath('../data/enrolledgroups.json'))
  new_enrolled_group = {
    'id': int(student_base_info['student_id']),
    'data': [
      {
        "CourseTypeCode": student_course_type[0][:2],
        "CourseLevelCodes": [student_course_type[1]],
        "RemainingACH": 0
      }
    ]
  }
  enrollgroup_json.update(new_enrolled_group)


  #add pt review group
  ptreview_group_json = JsonsData(os.path.abspath('../data/groups.json'))
  base_group_info  = getattr(GroupDataMapping, '_'.join(student_course_type))
  addtional_group_info  = getattr(InprogressGroup, '_'.join(student_course_type))
  if addtional_group_info['CourseType']['Name'] =='HF':
    program = 'High Flyers'
  elif addtional_group_info['CourseType']['Name'] == 'SS':
    program = 'Small Stars'
  elif addtional_group_info['CourseType']['Name'] == 'TB':
    program = 'Traiblazers'
  else:
    program = 'High Flyers'
  new_pt_review_group = {
    "id": int(student_base_info['student_id']),
    "data": {
      "groups": [
        {
          "usedACH": 36,
          "totalACH": 60,
          "timezone": "Asia/Shanghai",
          "status": "current",
          "programLevelId": "100544",
          "programLevel":addtional_group_info['CourseTypeLevel']['Name'],
          "program": program,
          "name": base_group_info['GroupName'],
          "leftACH": 0,
          "isCurrentGroup": True,
          "id": "null",
          "allSessions": []
        }
      ],
      "customerPhotoUrl": "https://salesforce-integration-staging.s3.cn-north-1.amazonaws.com.cn/Account/45670366_mqyhgw.jpg",
      "customerId": student_base_info['student_id']
    }
  }
  ptreview_group_json.update(new_pt_review_group)

  # student profile
  student_profile_json = JsonsData(os.path.abspath('../data/profiles.json'))
  new_student_profile = {
    "id": int(student_base_info['student_id']),
    "data": {
      "CustomerId": student_base_info['student_id'],
      "CountryCode": "CN",
      "EnglishFirstName": student_base_info['student_english_name'],
      "EnglishLastName": student_base_info['studdent_last_name'],
      "Status": "Student",
      "StatusUpdatedUtcDateTime": "2019-07-18T06:25:03",
      "AvatarURL": "https://salesforce-integration-staging.s3.cn-north-1.amazonaws.com.cn/Account/0016D000002HSyJQAW_Avatar_URL__c",
      "PreferredLanguageCode": None,
      "Gender": None,
      "Address": None,
      "Email": 'test@ef.com',
      "HomePhoneNumber": "13671888379",
      "MobilePhoneNumber": "13671888379",
      "JoinedDate": None,
      "DateOfBirth": None,
      "WechatOpenIds": [],
      "FirstName": "auto",
      "LastName": 'Test',
      "KidsILabUserName": student_base_info['ilab_user_name']
    }
  }
  student_profile_json.update(new_student_profile)

  new_student_buisnessline = new_student_profile.copy()
  additional_data = {

      "CurrentGroup": None,
      "GroupsInProgress": [
      ],
      "BusinessLineCode": student_base_info['business_line_code'],
      "DeepBlueSchoolCode": student_base_info['deepblue_schoolcode'],
      "SchoolCode":student_base_info['school_code']
    }

  new_student_buisnessline['data'].update(additional_data)
  student_businessline_json = JsonsData(os.path.abspath('../data/student-businessline.json'))
  student_businessline_json.update(new_student_buisnessline)

  # add online credits info, bookablegroup for highflyer only
  if student_course_type[0] in ('HF', 'HFV3'):
    credits_json = JsonsData(os.path.abspath('../data/creditsinfo.json'))
    if student_course_type[0] == 'HF':
      program = 'HFV2'
    else:
      program = 'HFV3Plus'
    new_credits = {
      "id": student_base_info['student_id'],
      "data": [
        {
          "quantity": 45,
          "program": program
        }
      ]
    }
    credits_json.update(new_credits)

    bookable_group_json = JsonsData(os.path.abspath('../data/bookablegroup.json'))
    print(GroupDataMapping.HF_C)
    bookbable_group = getattr(GroupDataMapping, '_'.join(student_course_type)).copy()
    bookbable_group.update(getattr(BookableGroup, '_'.join(student_course_type)))
    new_bookable_group = {
      "id": student_base_info['student_id'],
      'data': [bookbable_group]

    }
    bookable_group_json.update(new_bookable_group)

    # onlineprofile
    online_profile_json = JsonsData(os.path.abspath('../data/online-profiles.json'))
    new_online_profile = {
      "id": int(student_base_info['student_id']),
      "data": "KSD"
    }
    online_profile_json.update(new_online_profile)

    # add all groups
    all_group_json = JsonsData(os.path.abspath('../data/allgroups.json'))
    new_all_group = {
    "id": int(student_base_info['student_id']),
    "data": [
      {
        "StartDate": "2020-05-08",
        "ProgramLevel": student_course_type[1],
        "Program": student_course_type[0],
        "GroupType": "Classroom",
        "GroupStatus": "Activated",
        "GroupNumber": "100148735",
        "GroupId": "a0B6D000005CLTHUA4",
        "EndDate": "2029-10-05",
        "CustomerProductionStatus": "Activated",
        "CountryCode": "CN",
        "ContentPath": "small-stars-3-5/book-1"
      }
     ]
    }
    all_group_json.update(new_all_group)

if __name__ == '__main__':
  create_student()
