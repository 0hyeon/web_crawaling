FROM node:18

# Step 1: Install Chrome
RUN apt-get update && apt-get install -y wget gnupg
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update && apt-get install -y google-chrome-stable

# Step 2: Set Chrome executable path as an environment variable
ENV CHROME_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Step 3: Install necessary dependencies
RUN apt-get install -y xvfb

# Step 4: Create app directory and install dependencies
WORKDIR /app
COPY package.json .
RUN npm install

# Step 5: Copy the app
COPY . .

CMD ["npm", "run", "start"]
