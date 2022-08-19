import time
import datetime
import sys
import os
import logging
import pandas as pd
import csv
from selenium import webdriver
from bs4 import BeautifulSoup as bs4
from fake_useragent import UserAgent
import requests
import base64
import pymysql


host = '13.125.117.41'
user = 'hyun'
db = 'bunjang'
password = 'rkcjsdlalwlzocl'

ua = UserAgent()
fake = ua.random
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument("--remote-debugging-port=9222")
chrome_options.add_argument('enable-automation')
chrome_options.add_argument('--disable-gpu')


chrome_options.add_argument(fake)
binary = "chromedriver"
driver = webdriver.Chrome(binary, chrome_options=chrome_options)



def read(driver, url):
    count = 0
    articledid = 154642724
    baseurl = url + '/product/'


    print(baseurl)
    while True:

        driver.get(baseurl + str(articledid + count))
        time.sleep(1)
        soups = bs4(driver.page_source, 'html.parser')

        delete = soups.find('div', class_='sc-ffCbqV OQVpM')
        complete = soups.find('div', class_='sc-gSbCxx gVkoGG')

        if (delete or complete) is None:
            result = info(soups, articledid + count)
            print(result)

            count += 1

            conn = pymysql.connect(host=host, user=user, password=password, db=db, charset='utf8mb4')
            cursor = conn.cursor()

            cursor.execute("insert into bunjang_c(articledid, category, title, nickname, price, date) values (%s, %s, %s, %s, %s, %s)", (result[0], result[1], result[2], result[3], result[4], result[5]))
            conn.commit()

        else:
            print("삭제된 게시물입니다.")
            count += 1


def info(soups, articledid):
    res = []

    try:
        category = soups.find('span', class_='sc-cIsjWt jZRAEL').string
    except Exception as e:
        category = "None"

    try:
        price = soups.find('div', class_='sc-jLrYHE dGLmJI').text
        price_remov1 = price.replace('원','')
        price_remov2 = price_remov1.replace(',','')
    except Exception as e:
        price_remov2 = 0

    try:
        nickname = soups.find('a', class_='sc-kJdAmE gMmnDl').string
    except Exception as e:
        nickname = "None"

    try:
        title = soups.find('div', class_='sc-kyCyAI gXBiJn').string
    except Exception as e:
        title = "None"

    try:
        date_re = date_check(soups)
    except Exception as e:
        date_re = "None"

    res.append(articledid)
    res.append(category)
    res.append(title)
    res.append(nickname)
    res.append(int(price_remov2))
    res.append(date_re)

    return res

def date_check(soup):

    date = soup.find_all('div', class_='sc-hAcydR hMHQPo')[2].text
    current = datetime.datetime.now()

    if '초' in date:
        date_re1 = date.replace(" ", "")
        date_re2 = date_re1.replace("초전", "")

        date_result = current - datetime.timedelta(microseconds=int(date_re2))
        date_result_update = date_result.strftime('%Y-%m-%d-%H:%M:%S')

    elif '분' in date:
        date_re1 = date.replace(" ", "")
        date_re2 = date_re1.replace("분전", "")

        date_result = current - datetime.timedelta(minutes=int(date_re2))
        date_result_update = date_result.strftime('%Y-%m-%d-%H:%M:%S')

    elif '시간' in date:
        date_re1 = date.replace(" ", "")
        date_re2 = date_re1.replace("시간전", "")

        date_result = current - datetime.timedelta(hours=int(date_re2))
        date_result_update = date_result.strftime('%Y-%m-%d-%H:%M:%S')

    elif '일' in date:
        date_re1 = date.replace(" ", "")
        date_re2 = date_re1.replace("일전", "")

        date_result = current - datetime.timedelta(days=int(date_re2))
        date_result_update = date_result.strftime('%Y-%m-%d')

    elif '주' in date:
        date_re1 = date.replace(" ", "")
        date_re2 = date_re1.replace("주전", "")

        date_result = current - datetime.timedelta(weeks=int(date_re2))
        date_result_update = date_result.strftime('%Y-%m-%d')

    else:
        pass

    return date_result_update

def crawl():
    url = "https://m.bunjang.co.kr/"

    read(driver, url)

    driver.close()

crawl()