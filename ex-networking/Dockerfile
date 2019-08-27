FROM golang as build

COPY ./src/goredchat.go /go/src/goredchat/

WORKDIR /go/src/goredchat

RUN go get -d -v github.com/soveran/redisurl && \
    go build -a -tags netgo -installsuffix netgo -ldflags -w -o goredchat

FROM alpine

COPY --from=build /go/src/goredchat/goredchat /

CMD ["--help"]

ENTRYPOINT ["/goredchat"]
