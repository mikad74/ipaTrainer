#!/bin/bash
FILES="*.ogg"
for f in $FILES
do
  ffmpeg -i $f -c:a aac -vn $f.m4a
done
