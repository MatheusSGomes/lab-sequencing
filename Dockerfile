FROM node:18

# Instala o supervisor
RUN apt-get update && apt-get install -y supervisor

# Cria diretórios
RUN mkdir -p /app /var/log/supervisor
WORKDIR /app

# Copia arquivos
COPY . /app
COPY supervisord.conf /etc/supervisord.conf

# Instala dependências
RUN npm install

EXPOSE 3000

CMD ["supervisord", "-c", "/etc/supervisord.conf"]
