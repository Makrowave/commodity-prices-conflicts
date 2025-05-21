FROM gradle:8.7.0-jdk17 AS builder

WORKDIR /app
COPY ./backend/Commodity.SoapService/ .

RUN ./gradlew clean build --no-daemon

FROM openjdk:17-jdk-slim

WORKDIR /app
COPY --from=builder /app/commodities.xml commodities.xml
COPY --from=builder /app/build/libs/*-all.jar app.jar

CMD ["java", "-jar", "app.jar"]
