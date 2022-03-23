# mngyuan.com

This is a single page static Github Pages hosted site with routing by `react-router` and static route support by `react-snap`.

images are compressed using the following imagemagick commands:
```
# regular images
mogrify -strip -quality 80 -monitor -interlace Plane -rotate "-90<" -geometry 1500x1500^ src/photos/to-matt/*.jpg
# thumbnails
mogrify -rotate "-90>" -geometry 500x500^ src/photos/to-matt/thumbs/*.jpg
```
