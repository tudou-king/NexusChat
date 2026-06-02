# NexusChat - Docker Deployment
# Build: docker build -t nexuschat .
# Run: docker run -p 8080:80 nexuschat

FROM nginx:alpine

# Copy static files
COPY . /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
