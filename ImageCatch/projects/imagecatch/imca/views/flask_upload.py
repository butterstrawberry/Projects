import shutil

from flask import Blueprint, url_for, render_template, request
from werkzeug.utils import secure_filename
from PIL import Image
import imagehash
import numpy as np
import os, re
import sys


bp = Blueprint('image', __name__, url_prefix='/image')

@bp.route('/')
def render_file():
    return render_template('check/imagetest.html')

@bp.route('/fileupload', methods = ['GET', 'POST'])
def upload_file():
    image_hash = []
    search = "/home/ubuntu/Gachon_uni/projects/imagecatch/imca/static/image/image_compare"
    noread = "/home/ubuntu/Gachon_uni/projects/imagecatch/imca/static/image/hashvalue"

    if request.method == 'POST':

        def average_hash(fname, size=16):
            print(fname, sep='\n')

            cache = noread + "/" + fname.replace('/', '_') + ".csv"

            if not os.path.exists(cache):

                img = Image.open(fname)

                img = img.convert('L').resize((size, size), Image.ANTIALIAS)
                pixels = np.array(img.getdata())
                avg = pixels.mean()
                px = 1 * (pixels > avg)
                np.savetxt(cache, px, fmt="%.0f", delimiter=",")

            else:
                print("cache is exist")
                px = np.loadtxt(cache, delimiter=",")

            return px

        def enum_all_files(path):
            for root, dirs, files in os.walk(path):
                for f in files:
                    fname = os.path.join(root, f)
                    fname1 = fname.replace("\\", '/')

                    if re.search(r'\.(jpg|jpeg|png)$', fname):
                        yield fname1

        def hamming_dist(data1, data2):

            image1 = data1.reshape(1, -1)
            image2 = data2.reshape(1, -1)
            dist = (image1 != image2).sum()

            return dist

        def find_image(fname, rate):

            src = average_hash(fname)


            for fname1 in enum_all_files(search):

                dst = average_hash(fname1)
                diff_r = hamming_dist(src, dst) / 256

                if diff_r < rate:
                    f_1 = fname1.replace("\\", '/')

                    f_1_update = os.path.basename(f_1)
                    yield (diff_r, f_1_update)

        #image_test Algorithm
        def image_test(image):
            origininal_image = secure_filename(image.filename)
            print('original_image:', origininal_image)
            img_test = Image.open(image)
            print(img_test)
            print("success")


            img_hash_value = imagehash.average_hash(img_test)
            img_hash_value_r = str(img_hash_value)
            print(img_hash_value_r)

            f = open('/home/ubuntu/Gachon_uni/projects/imagecatch/imca/views/imagehash.txt', 'r')

            image_hash = []

            while True:
                line = f.readline()
                line1 = line.rstrip()
                image_hash.append(line1)

                if not line:
                    break

            f.close()
            print(image_hash)

            #original
            if img_hash_value_r in image_hash:
                print('file already exist')
                img_test.save('/home/ubuntu/Gachon_uni/projects/imagecatch/imca/static/image/' + img_hash_value_r + "_" + origininal_image)
                result_c = img_hash_value_r

            #mimic
            else:
                f = open('/home/ubuntu/Gachon_uni/projects/imagecatch/imca/views/imagehash.txt', 'a')
                f.write('{0}'.format(img_hash_value_r))
                f.write('\n')
                print('success')
                img_test.save('/home/ubuntu/Gachon_uni/projects/imagecatch/imca/static/image/' + img_hash_value_r + "_" + origininal_image)
                result_c = img_hash_value_r

                f.close()

            print(image_hash)
            print(result_c)

            return result_c

        f = request.files['file']
        original = secure_filename(f.filename)
        print(f)

        testimage = image_test(f)

        srcfile = ("/home/ubuntu/Gachon_uni/projects/imagecatch/imca/static/image/" + testimage + "_" + original)

        sim = list(find_image(srcfile, 0.15))
        sim = sorted(sim, key=lambda x: x[0])

    return render_template('check/test.html',  data1= sim, image_file= 'image/' + testimage + '_' + original, image_file1 = 'image/apology.png')



