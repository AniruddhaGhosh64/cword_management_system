# Step 1: Build React app
FROM node:18 as build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Step 2: Serve with nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

<<<<<<< HEAD
CMD ["nginx", "-g", "daemon off;"]
=======
CMD ["nginx", "-g", "daemon off;"]
>>>>>>> 6cbe9c2 (Final update - production backend URL + deployment ready)
