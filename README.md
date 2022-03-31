# Demo for ReactJS Meetup Gothenburg, 31/03 2022

Using [graphql-code-generator.com](https://graphql-code-generator.com)

# How to use

Since this is just a quick demo, it's a little janky.

Make sure you have `docker` installed, and run `yarn` in each subfolder. Then run `docker compose up`.

The gateway is accessed through `http://localhost:4000` and the web client is at `http://localhost:3000`.

If the gateway starts before the services, introspection will fail, so just open up `gateway/src/index.ts` and save it to trigger a restart once everything else is running.
