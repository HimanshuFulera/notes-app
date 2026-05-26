# Use an official lightweight Python/Node image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (e.g., 5000 for Flask)
EXPOSE 5000

# Command to run the application
CMD ["python", "app.py"]