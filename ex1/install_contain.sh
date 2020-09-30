#!/bin/bash
gcc -o contain contain.c -lrt
chown root.root ./contain
mv ./contain /usr/local/bin