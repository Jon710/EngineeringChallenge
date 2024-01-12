Notes/reasoning behind my decisions

Things I'd do if I had more time

* In a production app, I'd build an error handling layer to centralize errors by extending Nodejs Error class.
* Data validation would be in services and be handled with something like yup.
* I would never keep console.logs in production. I would log everything with a lib like Winston and send them to Cloudwatch/Sentry/New Relic... Like I do in my prod apps.
* Improve the types to leverage and justify TypeScript
* Increase the test coverage of the app with unit and e2e (supertest) tests
  - for example, calculations.ts should be heavily tested as there are lots of rules and it's the business core
  - controllers, services and repositories also should be tested

* For the sake of simplicity, I chose to implement Dependency Injection myself, however in bigger scale apps perhaps a library (TypeDI, TSyringe) would be more suitable. The fact the we'd be using TypeScript is also a plus as these libs work well with it. Or we could use NestJS which has it out of the box and is a robust framework.

- I used the repository pattern architecture because it decouples functionalities. It also helps in maintenance and testing when the app grows.

- I chose Postgres because I'm more familiar with it. However, given the scale of the problem, it could've been solved with any ohter database such as MongoDB.
I could've saved the scores in different rows, but I went for a jsonb data type because they are related and would be easier to query
them together and build the grap

- React Context was my choice for state management for 2 reasons:
 1) it comes out of the box and I aim for simplicity
 2) I didn't think there was a need to add another lib (redux thunk, saga etc...) given the size of app.

