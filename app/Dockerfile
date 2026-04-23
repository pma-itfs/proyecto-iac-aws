# Imagen base ligera de Node.js
FROM node:20-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos el package.json primero para aprovechar caché de Docker
COPY package.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto que usará la aplicación
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
