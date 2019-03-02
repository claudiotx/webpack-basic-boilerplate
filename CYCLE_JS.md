# Running the Playground
touch entry.js
npm run dev
npm run build

# TODO
Check Build Files Sizes
Create a more complex app

# Simple Express Server (with CORS, scaffold)
$ cd api-server
$ express .
$ npm install cors --save
$ npm start
$ http://localhost:3000/

# Why?
Frameworks help us to achieve faster results, providing some structure to more complex apps together by providing an opinionated API and automatic unbinding of streams/events.
Some people select a framework without thinking that there may be a better way or tool to build a web app.
Reactive Programming with CycleJS
Basically we code with asynchornous streams of data.
We observe streams of events (clicks, API calls) and do operations over them (aka side effects, like updating the DOM)
We create a stream of data from anything.
All the side effects will have the same abstraction.
This is easier to Test, more solid, easier to code (consistent) and maintain.
Write the code in the same way for Web Scokets, API Calls, Clicks, Touches, etc. it doesn't matter.
Like said before, everything is a stream and a stream has a common base set of operations (like map() and filter()).
This stream operations will return always another stream.
An efficient ecosystem: 'Webpack + CycleJS + Xstream + Babel'.

In Cycle, each application has a main() pure function which receives inputs and writes to some output (side effects on the outside world).
Side effects is done with Drivers.
Drivers are plugins which cause side effects on DOM, HTTP, within others.
Each cycle component is atomic.
The cycle API has only one function: run(app, drivers);
Cycle.js does a unique thing by looping data flow between your application and the outside world

# Real World Examples
## Good for Big Data
200 Components on the page for example.
Each of them is isolated and runs as pure function.

## Unopinionated
You can write whatever you want inside the main()

## Implicit Data Flow
You don't think on data flow, you just care about your logic.

## Zero Side Effects
Your drivers (the built-in ones) will handle all side effects for you.

## Pure Functional Programming
No Classes, No Objects, No this.
Functional paradigms only.
Everything is a function that doesn't depend on any state.
Good to maintain and test.

## Good for dynamic websites only
You shouldn't use Cycle for a blog or media website.

## Strongly Typed
The Library is written in typescript, so strongly typed.

## Bit of a learning curve
The learning curves with Cycle.js are learning to use streams as means of pushing data in the data flow.
It's good to learn because the future maybe functional and concurrent.


# Cycle.js
https://github.com/staltz/xstream
https://cycle.js.org/api/http.html
https://github.com/cyclejs/cyclejs/tree/master/examples/autocomplete-search/src
https://cycle.js.org/basic-examples.html
https://github.com/cyclejs-community/create-cycle-app-flavors/tree/master/packages/cycle-scripts-one-fits-all/scripts
https://medium.com/@fkrautwald/plug-and-play-all-your-observable-streams-with-cycle-js-e543fc287872
https://github.com/cyclejs/cycle-notification-driver

Cycle.js is a functional and reactive JavaScript framework.
Any Cycle.js app can be reused as a component in a larger Cycle.js app.

Cycle JS is just run(main);
Application has a single entry point: main() and creates a cycle closed loop between inputs and outputs.
We receive messages via drivers (sources - inputs), process them and send them over via drivers (sinks - outputs)

* drivers >>> main >>> drivers *

Ideal for highly dynamic websites.

Drivers are functions(). *DOM drivers, HTTP Drivers, Fake Drivers, etc..
Source and sink names are just literal object keys in the sources object and sinks object.
Do not use key$ because a literal object key shouldn't be named as a stream (despite a stream can be picked up from the value of the source object keys)

/!\ Object-oriented programming conventions are irrelevant, there are rarely (or never) classes in Cycle.js apps.

main() is just a function taking inputs from the external world and generating outputs in return
>>> [sources] >>> run(main,soures) >>> (sinks) >>>>>
*sources and sinks have drivers to handle any side effects (HTTP, DOM, etc.);
Managing side effects is done using drivers.
Drivers are plugins that handle DOM effects, HTTP effects, and web sockets etc.

Convention: Variables with streams are suffixed with $.
Ideal for Data Flow (we just write functions to operate with data)

## Trivia
- The sinks (vdom) is reacting to sources, but sources is reacting to sinks.
- On a simple interactive DOM element, to make the "wheel spin", we need a .startWith() to give a default value to be converted to a VNode Stream.
- main() is just assembling the wheel for interaction, and then letting subsequent actions be mutual reactions between main() and the DOM Driver.


## Large Scale Ecosystem (composition of dataflow components)
Sources and sinks are the interface between the application and the drivers.
They are also the interface between a child component and its parent.

For a dataflow component the parent can be a driver if the component is the root, or any other component

main(); // dataflow component 1
main(); // dataflow component 2

(source$) >>> dfComponent1 >>> (sink$)
dfComponent1 (source$) >>> dfComponent2 >>> (sink$) (source$) >>> dfComponent1 >>> (sink$)

### Example 1
(user event$)               >>> dfComponent1 >>> (vdom$)
(host component props$)     >>> dfComponent1 >>> (vdom$)

### Isolated Components Rules
A component’s sources are not affected by other components’ sources.
A component’s sinks do not affect other components’ sinks.

## Drivers
Drivers should always be associated with some I/O effect.
Avoid making drivers if they do not have effects to the external world somehow

makeDOMDriver  (Client Side Rendering)
makeHTMLDriver (Server Side Rendering)

[DOM Driver] plugs as a source into the main()
main() output sink plugs a source into the [DOM Driver]
main() input are sources from a Driver Output and returns sinks which will be an input to the Driver
domDriver() takes sinks as input, performs write and read effects, returns sources.

      >[DOM Driver]> vdom$ > main() > vdom >[DOM Driver]
     |                                                 |
     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


### Custom Drivers
Drivers are functions that listen to sink streams (their input), perform imperative side effects, and may return source streams (their output).
Whenever you have a JavaScript function such as doSomething() which returns nothing, it should be contained in a driver.
CycleJS is the Operating System (main()) - executed over the browser JS Engine
We need drivers to allow OS CycleJS to interface with the DOM (UI), NodeJS (Backend) and the network (XHR).

Driver: takes sinks (to describe a write) and return sources (to catch reads)

The input to the driver function is expected to be a single xstream stream.




## XS Streams
xs.of(x) - creates a stream which just emits x once


* Each component is just one pure function that can run independently.
run(app, drivers);

@cycle/dom – a collection of drivers that work with DOM; it has a DOM driver and HTML driver, based on the snabdom virtual DOM library
@cycle/history – a driver for the History API
@cycle/http – a driver for HTTP requests, based on superagent
@cycle/isolate – a function for making scoped dataflow components
@cycle/jsonp – a driver for making HTTP requests through JSONP
@cycle/most-run – a run function for apps made with most
@cycle/run – a run function for apps made with xstream
@cycle/rxjs-run – a run function for apps made with rxjs

## Reactive Programming with Streams of Data
Reactive programming (RP) is programming with asynchronous data streams.
Click events are asynchronous data streams.
We can observe them and perform some actions.
Ability to create data streams from anything and manipulate with them.
Then we have the same abstraction for all our side effects which is easier to use, maintain, and test.
Reactive programming will help you unify your code and make it more consistent.
Just write the code in the same way, no matter what data you work on (click events, HTTP calls, web sockets…).
Everything is a stream of data and each stream has many functions that you can use to work with it, such as map, and filter.
Then this functions over streams will return new streams.

## RxJS vs Most.js vs xtream
You can create an Observable (a stream of data), and manipulate it with various functions.
Most.js is faster than RxJS.
xstream.js is even faster (From the creator of cycle js)

## Example App
We will see how handling DOM events and re-rendering the DOM works in Cycle.js

