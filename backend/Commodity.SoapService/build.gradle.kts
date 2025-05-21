plugins {
    kotlin("jvm") version "1.9.0" apply false
    id("application")
    id("com.github.johnrengelman.shadow") version "8.1.1"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
    maven("https://repo.eclipse.org/content/groups/releases/")
    maven("https://oss.sonatype.org/content/repositories/releases/")
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    implementation("jakarta.jws:jakarta.jws-api:3.0.0")
    implementation("jakarta.xml.ws:jakarta.xml.ws-api:3.0.1")
    implementation("com.sun.xml.ws:jaxws-rt:3.0.1")
}

tasks.test {
    useJUnitPlatform()
}

tasks {
    build {
        dependsOn(shadowJar)
    }
}

application {
    mainClass.set("org.example.Main")
}
