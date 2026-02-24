# How to Run the Resume Builder

## Local Development
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.

## Docker
1. Create a `Dockerfile` in the root directory:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```
2. Build the image:
   `docker build -t resume-builder .`
3. Run the container:
   `docker run -p 5000:5000 resume-builder`

## VPS Deployment
1. Set up a VPS (e.g., DigitalOcean, AWS EC2, Linode).
2. Install Node.js, Git, and PM2.
3. Clone your repository:
   `git clone <repository-url> && cd <repository>`
4. Install dependencies and build:
   `npm install && npm run build`
5. Start the application with PM2:
   `pm2 start npm --name "resume-builder" -- start`
6. Make PM2 start on boot:
   `pm2 startup && pm2 save`

## Domains
1. Purchase a domain from a registrar (e.g., Namecheap, Cloudflare, GoDaddy).
2. In your DNS settings, point the A record (@) to your VPS IP address.
3. Set up a reverse proxy (like Nginx or Caddy) to route HTTP/HTTPS traffic to port 5000.
4. For Nginx, create a configuration file in `/etc/nginx/sites-available/resume-builder`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
5. Enable the site and restart Nginx:
   `ln -s /etc/nginx/sites-available/resume-builder /etc/nginx/sites-enabled/`
   `nginx -t && systemctl restart nginx`
6. Secure your domain with SSL using Certbot:
   `certbot --nginx -d yourdomain.com`