FROM ubuntu:16.04

# install psql and node
RUN apt-get update && apt install -y --no-install-recommends wget ca-certificates lsb-release curl && \
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - && \
  sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list' && \
  curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
  apt-get update && apt-get install -y postgresql-11 postgresql-contrib-11 nodejs redis-tools

WORKDIR /usr/src/career-day

COPY . .

RUN npm install

# verify versions for everything
RUN node -v && npm -v && psql --version

EXPOSE 3000