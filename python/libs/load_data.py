import json


class JsonsData():

  def __init__(self, json_path):
    self.json_path = json_path
    with open(json_path) as f:
      self.params = json.load(f)


  @property
  def dict(self):
    return self.__dict__

  def save(self):
    with open(self.json_path, 'w') as f:
      json.dump(self.params, f, indent=4)

  def update(self, new):
    self.params.append(new)
    self.save()





