FROM ubuntu:latest

ENV PYTHONUNBUFFERED True

ENV APP_HOME /app

ENV PORT 5000

WORKDIR $APP_HOME

COPY . ./

RUN set -xe \
    && apt-get update \
    && apt-get install python3-pip
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools
RUN pip install ez_setup
RUN pip install --no-cache-dir -r requirements.txt

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app
