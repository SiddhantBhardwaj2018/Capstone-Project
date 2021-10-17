import random

quiz_data = [{"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']},
             {"Question":"What is your name ?","Answers":['A','B','C','D']}]

correct_ans = {"Q1":"A1","Q2":"A2","Q3":"A3","Q4":"A4","Q5":"A5","Q6":"A6",
               "Q7":"A7","Q8":"A8","Q9":"A9","Q10":"A10","Q11":"A11","Q12":"A12",
               "Q13":"A13","Q14":"A14","Q15":"A15","Q16":"A16","Q17":"A17","Q18":"A18",
               "Q19":"A19","Q20":"A20"}

def send_questions():
    indexes = random.sample(range(0,20),5)
    ans = [quiz_data[i] for i in indexes]
    return ans

def generate_score(responses):
    count = 0
    for response in responses:
        if responses[response] == correct_ans[response]:
            count += 1
    return count // 5