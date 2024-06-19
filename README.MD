# XUnit Testing formatter
**VISIT RESULT:**
[Here!](https://x-unit-test-base-code-generator-3ldmvmxzf.vercel.app)  
Try the next class names:
- CreateUserCommandHandler
- GetUserCommentsByPostIdQuery

### What is
Testing endpoints in ASP.NET is a repetitive Task.
This web generates codes from a name and configurations.

### Kind of tests
Until 24/04/2024 (release)
This web only generates templates according to CQRS (Command Query Responsibility Segregation) pattern.

The Test library is XUnit, with the help of NSubstitute for mocking and
Fluent Assertions for data comparison with lambda predicates. So the templates are
made including those three libraries as default.

Also, templates are using the next working flow
- Command/Query -> Stores the expected data to request
- Validators -> Validates the request info (request: Command or query) in order to prevent unwished results.
- Handlers -> Manages the data in order to do something (DB storage in command cases, getting data in query cases)
  
This kind of test, therefore, tends to test the Handler part.
Usually tests includes correct sections (when validators and other stuff is correctly declared)
and incorrect sections

For example, the next endpoint: **(HTTPGet) GetUserById/{userIdd} returns a Entity User** should work as a query ('cause is getting data from db, not storing nor updating anything') so its query name is GetUserByIdQuery

Query request = (GetUserByIdQuery) string userId
Validator = (GetUserByIdQueryValidator) validates request existence (userId), then validates there's a user with that id associated.
Handler = (GetUserByIdQueryHandler) process the request (with a ORM or raw db processing) and returns expected data or an exception (validation failed)

So we need at least 5 Test
* Expecting correct: User returned
* Expecting incorrect: User does not exist (this can be a Correct with an empty result)
* Expecting incorrect: Bad Request, UserId request is empty
* Expecting incorrect: Bad Request, request user Id is not a valid string
* Expecting incorrect: Unauthorized(it depends) requester has not permissions

So, the test structure is, or should be
* Class Name = Command/Query + Test (GetUserByIdQueryTest).  
* Dependency services mocking (with NSubstitute) based on the Handler, for example logging service: ILogger _logger = Substitute.For<ILogger<GetUserByIdQueryHandler>>();
* Handler declaration GetUserByIdQueryHandler _sut;
* Constructor initialization: _sut = new GetUserByIdQueryHandler(services)
* Testing methods [Fact] expected result method

This is very repetitive. That's why you can generate the entire initial template
only providing the Command, Query, Handler or Test name with a simple initial configuration. Or the methods' names if you already have the class declared


