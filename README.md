# Notes/Kanban app - mobservable port

This repository contains [mobservable](https://mweststrate.github.io/mobservable/) ports of [SurviveJS - Webpack and React](http://survivejs.com/) book examples. You can study them to see how to implement the same application in a different kind of architecture.

Mobservable provides a way to make data structures reactive and makes it easy to consume them. It can be used with or without Flux. In this case we'll be relying directly on mobservable for our data needs and skip Flux altogether. The most interesting thing to notice is how much it cuts out code.

We are triggering our mobservable stores directly and more pedantic people might implement classes in between. For a simple case such as this the current approach is enough.

## Demo

1. `cd notes_app` or `cd kanban_app`
1. `npm i`
2. `npm start`
3. Surf to `localhost:8080`

## License

MIT.
