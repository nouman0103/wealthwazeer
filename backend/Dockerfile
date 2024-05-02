# 
FROM python:3.12.2

# 
WORKDIR /code

# 
COPY . /code

# 
RUN pip install  -r /code/requirements.txt



#RUN alembic upgrade head
 

# 
RUN chmod +x /code/entrypoint.sh

ENTRYPOINT [ "/code/entrypoint.sh" ]