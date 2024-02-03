FROM golang:latest
WORKDIR /app
COPY main.go .

RUN GOOS=linux go build -o server main.go

CMD ["/app/server"]