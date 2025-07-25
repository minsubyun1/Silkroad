# Java 17 기반 이미지 사용
FROM openjdk:17

# JAR 파일 복사 (빌드시 ARG로 이름 설정 가능)
ARG JAR_FILE=build/libs/*.jar
COPY app.jar app.jar
COPY .env .env

# 3003 포트 오픈
EXPOSE 3002

# 실행 명령
ENTRYPOINT ["java", "-jar", "/app.jar"]