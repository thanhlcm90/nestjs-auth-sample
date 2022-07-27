# NestJS Authentication Sample

- [Overview](#overview)
- [Docker](#docker)
- [Installing](#installing)
- [Api Docs](#api-docs)
- [Unit test](#unit-test)
- [E2E test](#e2e-test)

## Overview

This is a sample nestjs project, include then authentication that use JWT Token.

## Docker

We need run MySQL database before running application

```bash
docker-compose up -d
```

## Installing

Install dependencies.

```bash
yarn
```

Start the project

```bash
yarn start
```

Start with watching

```bash
yarn start:dev
```

## Api Docs

You can visit the Api docs that generated by Swagger in http://localhost:3000/api-docs

## Unit test

Run the Unit test:

```bash
yarn test
```

Example:
```bash
 PASS  src/modules/user/user.service.spec.ts
 PASS  src/app.module.spec.ts
 PASS  src/modules/user/user.module.spec.ts
 PASS  src/modules/shared/services/config.service.spec.ts

Test Suites: 4 passed, 4 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        3.327 s
Ran all test suites.
Done in 3.80s.
```

## E2E test

Run the E2E test:

```bash
yarn test:e2e
```

Example
```bash
 PASS  test/app.e2e-spec.ts
  E2E Testing
    ✓ application should defined (1 ms)
    Unauthorize 401
      ✓ GET /api/v1/user/profile 401 (10 ms)
      ✓ PUT /api/v1/user/profile 401 (2 ms)
      ✓ PUT /api/v1/user/password 401 (2 ms)
    Register user
      ✓ POST /api/v1/auth/register 200 (64 ms)
      ✓ POST /api/v1/auth/register 500 - duplicate username (79 ms)
    Login user
      ✓ POST /api/v1/auth/login 200 (41 ms)
      ✓ POST /api/v1/auth/login 401 (41 ms)
      ✓ POST /api/v1/auth/login 200 (41 ms)
      ✓ POST /api/v1/auth/login 401 (42 ms)
    Get user profile
      ✓ GET /api/v1/user/profile 200 (4 ms)
    Change user profile
      ✓ PUT /api/v1/user/profile 200 (13 ms)
    Change user password
      ✓ PUT /api/v1/user/password 401 : wrong old password (41 ms)
      ✓ PUT /api/v1/user/password 200 (91 ms)
    Login user after change password
      ✓ POST /api/v1/auth/login 200 (41 ms)
      ✓ POST /api/v1/auth/login 401 (42 ms)

Test Suites: 1 passed, 1 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        2.672 s, estimated 3 s
Ran all test suites.
Done in 3.04s.
```