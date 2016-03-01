__author__ = 'zhangyanni'

# -*- coding:utf-8 -*-
import codecs
import json
import os

#获得提交的问题列表q_list，去掉重复
def get_q_list():
    q_list=[]
    answer_list_dir=r"G:\answer-master-3a46261e6190aa402b485d7147047ff701528626"
    #遍历answer_list_dir目录下的所有文件，获得提交的问题列表
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
    #遍历answer_list_dir目录下的所有文件，获得提交的次数
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
    print '己提交的题有：\n%s' %(q_list)
    number = raw_input('请输入要查询的题号:')
    count=commit_time(number)
    print '题号：%s,已提交人数：%s' %(number,count)
    




