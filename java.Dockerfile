FROM eclipse-temurin:23-jdk AS builder

WORKDIR /app
COPY ./backend/Commodity.SoapService/ .

RUN chmod +x ./gradlew
RUN ./gradlew clean build --no-daemon

FROM eclipse-temurin:23-jdk

WORKDIR /app
COPY --from=builder /app/commodities.xml commodities.xml
COPY --from=builder /app/build/libs/*-all.jar app.jar

CMD ["java", "--add-opens=java.base/java.lang=ALL-UNNAMED", "--add-opens=java.base/java.lang.invoke=ALL-UNNAMED", "-Dcom.sun.xml.bind.v2.bytecode.ClassTailor.noOptimize=true", "-jar", "app.jar"]