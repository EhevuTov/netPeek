#!/usr/bin/env sh
gource -1280x720 --stop-at-end --key --hide filenames -s 1 -a 2 -c 2.5 -o - | ffmpeg -y -b 10000K -r 60 -threads 4 -f image2pipe -vcodec ppm -i - -vcodec libx264 ~/Desktop/gource.x264.mp4
