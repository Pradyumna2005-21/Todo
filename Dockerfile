# Use lightweight Nginx web server base image
FROM nginx:alpine

# Copy all static web files into Nginx's default public folder
COPY . /usr/share/nginx/html

# Expose port 80 for HTTP web traffic
EXPOSE 80