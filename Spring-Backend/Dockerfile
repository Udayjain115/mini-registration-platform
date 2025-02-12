# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Optional: set a working directory
WORKDIR /app

# Copy the executable jar file from the build output (assumes you build with Gradle bootJar)
COPY build/libs/*.jar app.jar

# Expose the port your app listens on (default Spring Boot port 8080)
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app/app.jar"]