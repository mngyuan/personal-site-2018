# mngyuan.com

![Screenshot of website showing a print spread](screenshot.png)

This is a single page static Github Pages hosted site with routing by `react-router` and static route support by `react-snap`.

images are compressed using the following imagemagick commands:

```
# regular images
mogrify -strip -quality 80 -monitor -interlace Plane -rotate "-90<" -geometry 1500x1500^ src/photos/to-matt/*.jpg
# thumbnails
mogrify -rotate "-90>" -geometry 500x500^ src/photos/to-matt/thumbs/*.jpg
```

## Deploy

```
yarn build
# copy build files somewhere
git checkout gh-pages
# copy build files into repo
git add -A .
git commit -m 'build'
```
