#!/bin/bash
echo "========== AFTER INSTALL =========="
echo "Setting permissions and preparing environment..."
sudo chown -R ec2-user:ec2-user /var/www/html
sudo cp -r /home/ec2-user/src/index.html /var/www/html/
