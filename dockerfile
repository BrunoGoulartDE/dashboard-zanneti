# Etapa de build
FROM node:18 AS builder

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos de configuração e dependências
COPY package*.json ./

# Instalando as dependências usando npm
RUN npm install

# Copiando o restante dos arquivos do projeto
COPY . .

# Rodando o build do TypeScript e do Vite
RUN npm run build

# Etapa de produção
FROM nginx:1.23-alpine AS production

# Definindo o diretório onde os arquivos serão armazenados
WORKDIR /usr/share/nginx/html

# Removendo configurações padrão do Nginx
RUN rm -rf ./*

# Copiando os arquivos do build da etapa anterior
COPY --from=builder /app/dist .

# Copiando uma configuração personalizada do Nginx para servir o Vite
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expondo a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
