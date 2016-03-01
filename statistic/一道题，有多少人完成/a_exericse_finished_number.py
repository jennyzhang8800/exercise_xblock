__author__ = 'zhangyanni'

# -*- coding:utf-8 -*-
import codecs
import json
import os

#����ύ�������б�q_list��ȥ���ظ�
def get_q_list():
    q_list=[]
    answer_list_dir=r"G:\answer-master-3a46261e6190aa402b485d7147047ff701528626"
    #����answer_list_dirĿ¼�µ������ļ�������ύ�������б�
    for parent,dirnames,filenames in os.walk(answer_list_dir):
        for filename in filenames:
            (shortname,extension) = os.path.splitext(filename)
            if shortname.isdigit():
                if int(shortname) not in q_list:
                   q_list.append(int(shortname))
    return q_list

def commit_time(number):
    count=0
    answer_list_dir=r"G:\answer-master-3a46261e6190aa402b485d7147047ff701528626"
    #����answer_list_dirĿ¼�µ������ļ�������ύ�Ĵ���
    for parent,dirnames,filenames in os.walk(answer_list_dir):
        for filename in filenames:
            (shortname,extension) = os.path.splitext(filename)
            if shortname.isdigit():
                if shortname==number:
                   count+=1
    return count
    
    
    
def readFile(file_path):
    fileObj=codecs.open(file_path, encoding='utf-8')
    data=fileObj.read()
    return data

def saveFile(file_path,file_name,data):
    output = codecs.open(file_path+ "\\"+file_name+".json",'w',"utf-8")
    output.write(data)
    output.close()

if __name__ == '__main__':
    q_list=get_q_list()
    print '���ύ�����У�\n%s' %(q_list)
    number = raw_input('������Ҫ��ѯ�����:')
    count=commit_time(number)
    print '��ţ�%s,���ύ������%s' %(number,count)
    




