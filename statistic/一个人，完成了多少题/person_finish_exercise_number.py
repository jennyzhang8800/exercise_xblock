__author__ = 'zhangyanni'
# -*- coding:utf-8 -*-
import codecs
import json
import os
import os.path


def readFile(file_name):
    fileObj=codecs.open(file_name, encoding='utf-8')
    try:
        type_num=fileObj.readline()
        num=1
        answer=""
        for line in fileObj:
                if(line[0]=='>'):
                    if(num==4):
                        if (int(type_num)==1or int(type_num)==3):
                            for i in line[2:3]:
                                if i.isupper():
                                    answer+=i
                            break
                        elif(int(type_num)==2):
                            for i in line[2:6]:
                                if (i.isupper()):
                                    answer+=i
                                elif (i.isspace()):
                                    break



                        else:
                            answer=line[2:len(line)-2]
                    num+=1
        return (type_num,answer)
    except:
        print "cannot read!"
    finally:
        fileObj.close()


def saveFile(file_name,data):
    output = codecs.open(file_name+".json",'w',"utf-8")
    output.write(data)
    output.close()


def get_name_q_list():
    name_list=[]
    name_q_list={}
    file_dir="G:\GitHub\\answer-master-d2af31db044fadb955e46a89bcd02715f8234234"
    for dir in os.listdir(file_dir):
        cur_path=os.path.join(file_dir,dir)
        if os.path.isdir(cur_path):
            for name in os.listdir(cur_path):
                name_list.append(name)
                cur_path=os.path.join(cur_path,name)
                name_q_list[name]=[]
                for q_dir in os.listdir(cur_path):
                    last_path=os.path.join(cur_path,q_dir)
                    for q_num in os.listdir(last_path):
                        (shortname,extension) = os.path.splitext(q_num)
                        name_q_list[name].append(shortname)

    # print name_list
    #print name_q_list
    name_q_json=json.dumps(name_q_list)
    #saveFile("name_q_list",name_q_json)
    return name_q_json





if __name__ == '__main__':
    #type1,type2,type3,type4,type5=get_answer_list()
    
    name = raw_input('请输入要查询的用户名:')
    print name
    name_q_list=get_name_q_list()
    dic=eval('('+name_q_list+')')
    finished_numbers=len(dic[name])    
    print '%s:已提交的题数：%s,提交的题为：%s' %(name,finished_numbers,dic[name])
   









