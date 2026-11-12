FROM rust:1-bookworm AS builder
RUN apt-get update && apt-get install -y libpq-dev pkg-config && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ARG DATABASE_URL=postgres://postgres:postgres@db:5432/postgres
ENV DATABASE_URL=$DATABASE_URL
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y libpq5 ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/local/bin
COPY --from=builder /app/target/release/rust-crud-api .
CMD ["./rust-crud-api"]
