## Intro
Cycle
> Computer > Screen > User > Mouse > Computer >

UI's are cycles, UI's are functions, UI's are async, UI's are symmetric, User is a function ()

Input Device    (mouse)
Output Device   (screen)

> Input > FUNCTION  > Output >
    x       f()        f(x)


Screen OUTPUT       Mouse INPUT
            function()
Eyes   INPUT        Hand  OUTPUT

Event Streams = Sequences in time
Event Streams are infinite

>>>>>>> interaction events >>>>>>> (url)
            COMPUTER
>>>>>>> screen events >>>>>>>> (render)

function computer (x: EventStream<String>) : EventStream<Screen> {
    //...
}

var screenEvents = computer(interactionEvents);
var interactionEvents = user(screenEvents);

var a = f(b);
var b = g(a);

PROBLEM!!


var interactionEvents = makeEmptyEventStream();
var screenEvents = computer(interactionEvents);
var interactionEvents2 = user(screenEvents); //real

 >>>> interactionEvents2 >>>> interactionEvents >>>>  LOOP

 MVC is from the 70's


 > User > Mouse (intent) > Browser (model) > Screen (view) >

>>>>>>>>>>>>>>>>>>>>>
 INTENT = Any User Interaction
 MODEL = Data Transforms
 VIEW = DOM
>>>>>>>>>>>>>>>>>>>>>


applyToDom(container, fn)
registerCustomElement (tagName, defintionFn)


view() >> user() >> intent() >> model()

JUST FUNCTIONS!!

Unidirectional Data Flow
Functional Programming (immutability)


