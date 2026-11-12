FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY hello.py .
EXPOSE 8000
ENV FLASK_APP=hello.py
CMD ["python", "hello.py"]
