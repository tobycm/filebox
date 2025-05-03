FROM oven/bun:alpine

WORKDIR /app

# Install dependencies
COPY package.json bun.lock* ./

RUN bun install

COPY . .

CMD ["bun", "run", "dev"]