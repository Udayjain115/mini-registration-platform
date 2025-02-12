# Stage 1: Build the application using the Gradle image
FROM gradle:7.6.0-jdk17-alpine AS build
WORKDIR /home/gradle/project
# Copy the source code to the container
COPY --chown=gradle:gradle . .
# Build the application (this will produce a jar under build/libs)
RUN gradle bootJar --no-daemon

# Stage 2: Create the final image with the built jar
FROM openjdk:17-jdk-alpine
WORKDIR /app
# Copy the jar file from the build stage to the runtime image
COPY --from=build /home/gradle/project/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]