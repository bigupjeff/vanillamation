# Vanillamation

## Animation engine in vanilla js.

Another answer to simple timelines, animation chaining and fancy eases etc.

Orginally cobbled together to provide an open-source animation engine for use in my WordPress
plugins where non-GNU license compatible frameworks are not allowed.

## Current state

At the moment, it only handles basic from-to animations allowing a single element per call. Of
course calls can be run parrallel in a `Promise.all()` but I want to make this ability native to the
engine.

See the modal demo as an example of animating multiple elements/properties in parallel.

## Plans

- Enable multiple elements per call.
- Enable multiple properties per call.
- Enable chaining with promise callbacks.
- Support differnt timeline types such as 'to', 'from-to' and 'set'.
- Enable parrallel chains with a synchronous 'ticker'.
- Modularise the code.
- More demos!