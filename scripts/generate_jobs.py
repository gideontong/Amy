from csv import DictReader as reader
from json import dump

jobs = {}
with open('jobs.csv', encoding='utf-8') as file, open('jobs.json', 'w') as out:
    i_reader = reader(file)
    for row in i_reader:
        job_id = ''.join(row['Job'].split()).lower()
        job = {
            'name': row['Job'],
            'level': int(row['Level']),
            'salary': int(row['Salary']),
            'image': row['Image'],
            'req': {
                'enabled': row['HireReq'] != 'None',
                'job': row['HireReq'] if row['HireReq'] != 'None' else None,
                'hours': int(row['HireReqHours']) if row['HireReq'] != 'None' else 0
            },
            'shift': {
                'type': row['Shift'],
                'weekdays': True if row['Weekdays'] == 'TRUE' else False,
                'weekends': True if row['Weekends'] == 'TRUE' else False
            },
            'bonus': {
                'enabled': True if row['Bonus'] == 'TRUE' else False,
                'max': int(row['BonusMax']),
                'chance': float(row['BonusChance'])
            },
            'description': row['Description']
        }
        jobs[job_id] = job
    dump(jobs, out)