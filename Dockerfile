# Stage 1: Build (Compiles your code inside Render)
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Run (The actual lightweight server)
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
# We copy the result from the 'build' stage above
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]