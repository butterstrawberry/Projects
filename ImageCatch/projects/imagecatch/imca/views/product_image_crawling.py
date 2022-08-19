import time
import urllib3
import urllib
import os
import datetime
from selenium import webdriver
from bs4 import BeautifulSoup as bs4


chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument("--remote-debugging-port=9222")
binary = "chromedriver"
driver = webdriver.Chrome(binary, chrome_options=chrome_options)


def read(driver, url):
    count = 0
    articledid = 154635606
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

            if ('에어팟 프로' or '에어팟프로' or '다이슨에어랩' or '다이슨 에어랩') in result:
                print('Image Downloading.......')
                img_exist = img_chk()
                image_download(img_exist)

                count += 1
            else:

                count += 1

        else:
            count += 1


def info(soups, articledid):
    res = []

    category = soups.find('span', class_='sc-cIsjWt jZRAEL').string
    price = soups.find('div', class_='sc-jLrYHE dGLmJI').text
    price_remov1 = price.replace('원','')
    price_remov2 = price_remov1.replace(',','')
    nickname = soups.find('a', class_='sc-kJdAmE gMmnDl').string
    title = soups.find('div', class_='sc-kyCyAI gXBiJn').string
    date_re = date_check(soups)



    return title



def image_download(image_url):
    for img in image_url:

        url = urllib.parse.unquote(img)

        tmp = url.split('/')[-1]
        file_name = tmp.split('?')[0]
        file_name = file_name.split('"')[0]

        print(file_name)

        path = ('/home/ubuntu/Gachon_uni/projects/imagecatch/imca/static/image/image_compare' + '/' + file_name)

        if not os.path.isfile(str(path)):
            http = urllib3.PoolManager()
            url_handle = http.request('GET', img)

            with open(path, 'wb') as f:
                image_read = url_handle.data
                f.write(image_read)
            f.close()

        else:
            print("File exist")





def img_chk():
    soups = bs4(driver.page_source, 'html.parser')

    img = []
    images = soups.find('div', class_='sc-kvkilB kQzwDq').find_all('img')

    for image in images:
        img.append(image['src'])
    return img


def crawl():
    url = "https://m.bunjang.co.kr/"

    read(driver, url)

    driver.close()

crawl()