# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.10.7-slim-buster

# Allow statements and log messages to immediately appear in the logs
ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install production dependencies.
RUN apt-get update
RUN apt-get -y install default-libmysqlclient-dev
RUN apt-get install libssl-dev -y
RUN apt-get install python-dev default-libmysqlclient-dev -y
RUN apt-get install python3-dev python3-wheel python-wheel python-pip python-dev build-essential -y
RUN pip install --upgrade pip
RUN pip install wheel setuptools --upgrade
RUN pip install cmake
RUN pip install mysqlclient
RUN pip install --no-cache-dir -r requirements.txt

# Run the web service on container startup. Here we use the gunicorn
# webserver, with one worker process and 8 threads.
# For environments with multiple CPU cores, increase the number of workers
# to be equal to the cores available.
# Timeout is set to 0 to disable the timeouts of the workers to allow Cloud Run to handle instance scaling.
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app