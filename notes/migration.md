# Upgrade Project to **Java 21** and **Spring Boot 3.3.x** using OpenRewrite

This guide demonstrates how to use *OpenRewrite* to migrate a Java/Spring Boot codebase safely and automatically.

* ✅ Java 21
* ✅ Spring Boot 3.3.x
* ✅ Latest Spring Boot best practices
* ✅ Updated deprecated APIs and properties

OpenRewrite performs safe, automated refactoring across the entire codebase.

---

## Prerequisites

Before running the migration:

| Requirement | Version                                     |
| ----------- | ------------------------------------------- |
| JDK         | **21** installed locally                    |
| Maven       | 3.8+                                        |
| Git         | Clean working tree (no uncommitted changes) |

> Commit all changes before running rewrite.

---

## Step 1 : Add OpenRewrite Maven Plugin

Add the following plugin to your **pom.xml**

```xml
<plugin>
    <groupId>org.openrewrite.maven</groupId>
    <artifactId>rewrite-maven-plugin</artifactId>
    <version>6.28.0</version>

    <configuration>
        <exportDatatables>true</exportDatatables>
        <activeRecipes>
            <recipe>org.openrewrite.java.migrate.UpgradeToJava21</recipe>
            <recipe>org.openrewrite.java.spring.boot3.SpringBootProperties_3_3</recipe>
            <recipe>org.openrewrite.java.spring.boot3.UpgradeSpringBoot_3_3</recipe>
            <recipe>org.openrewrite.java.spring.boot3.SpringBoot33BestPractices</recipe>
            <recipe>org.openrewrite.java.spring.boot3.SpringBoot3BestPracticesOnly</recipe>
        </activeRecipes>
    </configuration>

    <dependencies>
        <!-- Java migration recipes -->
        <dependency>
            <groupId>org.openrewrite.recipe</groupId>
            <artifactId>rewrite-migrate-java</artifactId>
            <version>3.26.0</version>
        </dependency>

        <!-- Spring + Boot recipes -->
        <dependency>
            <groupId>org.openrewrite.recipe</groupId>
            <artifactId>rewrite-spring</artifactId>
            <version>6.23.0</version>
        </dependency>
    </dependencies>
</plugin>
```

---

## Step 2 : Dry Run (See what will change)

This shows what OpenRewrite will modify **without touching files**.

```bash
mvn rewrite:dryRun
```

Open the generated reports:

```
target/rewrite/reports/rewrite.patch
target/rewrite/reports/datatable/
```

Review the patch.

---

## Step 3 : Apply the Migration

Once verified:

```bash
mvn rewrite:run
```

This will:

* Update Java source compatibility to 21
* Upgrade Spring Boot to 3.3.x
* Migrate deprecated APIs
* Update `application.properties` / `yaml`
* Fix imports, annotations, configuration classes
* Apply Spring Boot 3 best practices

---

## Step 4 : Review Changes

Check Git diff carefully:

```bash
git diff
```

Common changes you will notice:

* `javax.*` → `jakarta.*`
* Updated Spring Security config
* Updated Spring Boot properties
* Removal of deprecated APIs
* Improved bean definitions

---

## Step 5 : Compile & Fix Remaining Errors

Run:

```bash
mvn clean install
```

Fix any manual issues if reported (usually very few).

Typical fixes (if any):

* Third-party libraries not supporting Jakarta
* Old security configuration
* Custom filters/interceptors

---

## Step 6 : Remove the Plugin

After successful migration, you can remove the rewrite plugin from `pom.xml`.

---

## Step 7 — Check DataTables (What exactly changed)

Open:

```
target/rewrite/reports/datatable/
```

These CSV files tell:

* Which recipes were applied
* Which files changed
* What transformations happened

Very useful for audit.

---

## What These Recipes Do

| Recipe                       | Purpose                                   |
| ---------------------------- | ----------------------------------------- |
| UpgradeToJava21              | Migrates source/target, language features |
| UpgradeSpringBoot_3_3        | Upgrades Boot version and dependencies    |
| SpringBootProperties_3_3     | Updates deprecated properties             |
| SpringBoot33BestPractices    | Applies recommended config changes        |
| SpringBoot3BestPracticesOnly | Improves Spring usage patterns            |

---

## Recommended Order

If project is very old, run in this order:

1. `UpgradeToJava21`
2. `UpgradeSpringBoot_3_3`
3. Best practices recipes

You can comment/uncomment recipes and run multiple times.

---

## If Something Breaks

You can revert easily:

```bash
git reset --hard
```

Then run recipes one by one.

---

## Final Verification Checklist

* [ ] Application starts
* [ ] All tests pass
* [ ] No `javax` imports remain
* [ ] Security config works
* [ ] Swagger / OpenAPI works
* [ ] Actuator endpoints work

---

## Result

After this process, the project will be:

* On **Java 21**
* On **Spring Boot 3.3.x**
* Fully Jakarta compliant
* Using modern Spring best practices

---
