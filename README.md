# Backend Test Case

## Usage Installation

- Clone Repo

```shell
git clone https://github.com/muhammadisa-n/backend-test-case.git
```

- Create .env file

```shell
cp .env.example .env
```

- Run npm install

```shell
npm install
```

- Run prisma

```shell
npx prisma migrate dev
```

```shell
npx prisma generate
```

- Run Server

```shell
npm start
```

Or

```shell
npx run dev
```

- If you want test using swagger, please seeding first use command in below

```shell
npm run seed
```

## URL

- BASE_URL = http://localhost:3000/api
- Access Swagger Documentation = http://localhost:3000/api-docs
