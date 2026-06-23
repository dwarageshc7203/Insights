# =============================================================
# Stage 1: Build
#   Base : Eclipse Temurin 17 JDK on Debian Bookworm Slim
#   Goal : Download dependencies and produce the fat JAR using
#          the project's own Maven wrapper so the build is
#          reproducible without a pre-installed Maven binary.
# =============================================================
FROM eclipse-temurin:17-jdk-jammy AS builder

WORKDIR /app

# Copy the Maven wrapper first so Docker layer-caches the
# wrapper download even when source code changes.
COPY .mvn/  .mvn/
COPY mvnw   mvnw
RUN chmod +x mvnw

# Pull dependencies before copying source so this expensive layer
# is cached as long as pom.xml does not change.
COPY pom.xml pom.xml
RUN ./mvnw dependency:go-offline -q

# Copy source and build.  -DskipTests speeds up the image build;
# tests should be run in CI before building the Docker image.
COPY src/ src/
RUN ./mvnw clean package -DskipTests -q

# =============================================================
# Stage 2: Runtime
#   Base : Eclipse Temurin 17 JRE on Debian Bookworm Slim
#          (no JDK tools → smaller attack surface)
#   Goal : Run the fat JAR produced in stage 1.
# =============================================================
FROM eclipse-temurin:17-jre-jammy AS runtime

# Create a non-root user to run the application.
# Running as root inside a container is unnecessary and risky.
RUN groupadd --system appgroup && \
    useradd  --system --gid appgroup --no-create-home appuser

WORKDIR /app

# Copy only the fat JAR from the build stage — nothing else.
COPY --from=builder /app/target/*.jar app.jar

# Grant ownership to the non-root user.
RUN chown appuser:appgroup app.jar

USER appuser

# Render (and most container platforms) inject $PORT at runtime.
# The app reads it via server.port=${PORT:8080} in application.properties.
EXPOSE 8080

# JVM flags explained:
#   -XX:+UseContainerSupport          — respect cgroup CPU/memory limits (default on JDK 11+, explicit for clarity)
#   -XX:MaxRAMPercentage=75.0         — cap heap at 75 % of container RAM, leaving headroom for metaspace / threads
#   -XX:+ExitOnOutOfMemoryError       — crash-fast so the container restarts rather than limping along OOM
#   -Djava.security.egd=...urandom    — faster SecureRandom seeding; avoids startup hangs on entropy-starved VMs
#   -Dspring.profiles.active=...      — SPRING_PROFILES_ACTIVE env var selects the profile; default is 'prod'
#                                        in Docker (safe), overridden to 'dev' locally via .env
ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-XX:+ExitOnOutOfMemoryError", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]