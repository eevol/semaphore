#!/bin/bash

git clone --recursive "$1" $2
if [ $? -ne 0 ]; then
	exit 2
fi
