---
title: Bing Wallpaper downloader
layout: post
tags: [Bing Wallpapers, python]
---
In the past I have tried to use Bing as search engine, I just don't like it. One thing I do like about Bing is the daily wallpaper so this little script will download it for you

```python
import urllib2
import json
from os.path import expanduser

req = urllib2.urlopen("http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US")
resp = json.load(response)

urlbase = (resp['images'][0]['urlbase'])
name = (resp['images'][0]['fullstartdate'])
url = 'http://www.bing.com' + urlbase + '_1920x1080.jpg'
home = expanduser('~')
path = home +'/Pictures/bing-wallpapers/'+name+'.jpg'
print ("Downloading %s to %s" % (url, path))
f = open(path, 'w')
pic = urllib2.urlopen(url)
f.write(pic.read())
```

Then its simply a case of a cron job to run the script as required

```
20  9,12,15,19,22  *      *     *    python ~/Pictures/wallpaper.py
```