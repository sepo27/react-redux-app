## Table of Contents
* [Project structure](#project-structure)
* [Modules](#modules)
* [Conventions](#conventions)
   * [Common](#common)
   * [Actions](#actions)
   * [Flow types](#flow-types)
   * [Reducers](#reducers)
* [Data flow](#data-flow)
* [Typical flow for creating a feature](#typical-flow-for-creating-a-feature)

## Project structure

```
dist/
scripts/
src/
  dev/ (env, log, etc)
  flow-typed/
  lib/ (aka utils, with possible extraction)
  modules/ (see below for more)
  sandbox/ (for testing resuable components inside app)
  - .flowconfig
  - AppProdiver.jsx
  - createAppStore.js
  - index.js
test/
  assertions/ (reusable test expect functions)
  data/ (test data / fixtures)
  generators/
  integration/
webpack/
  config/
  utils/
  loaders/
  hooks/
- .babelrc
- .eslintrc
- ...etc
```

## Modules
Module is a set of files groupped together by *functionality*.
The *functionality* is the only distinguishing feature of a module.
It can hold files of any type.
The structure of a module is arbitrary.
When module is created - all files are a flat list inside.
When it grows, structure is formed to reflect purpose of module.
Module can hold child modules.
Normally, *core* module the one includes `appReducer` and `App.jsx`.

For example: post module, comments list module, comment detail module, etc.

Simple module example:
```
modules/
  comment/
    commentReducer.js
    commentReducer.test.js
    CommentCmp.jsx
    actions.js
    types.js
    constants.js
    selectors.js
```

Advanced module example:
```
modules/
  posts/
    list/
      components/
        PostsCmp.jsx
        PostDetailCmp.jsx
      functions/ (aka utils)
      reducers/
        postsReducer.js
        addPostReducer.js
        updatePostReducer.js
        removePostReducer.js
        ... etc
      - actions.js
      - types.js
    popups/ (some posts related popups with their reducers)
```
Component less module example:
`TODO`

## Conventions
### Common
- no default exports
- component file name:
  - `Cmp` suffix
  - `.jsx` extension

### Actions
- actions are stored in `actions.js` file
- always three components of an action:
  - flow type
  - type (=string)
  - creator (returns an action object)
- action creator has `Action` suffix
- action always has: `type` and `payload`
- other (e.g. meta) info can be added to action objects

Example:
```javascript
// modules/comment/actions.js

type AddCommentAction = {type: 'ADD_COMMENT_ACTION', payload: string};
export const
  ADD_COMMENT_ACTION = 'ADD_COMMENT_ACTION',
  addCommentAction = (content: string): AddCommentAction => ({
    type: ADD_COMMENT_ACTION,
    payload: content,
  });

type RemoveCommentAction = {type: 'REMOVE_COMMENT_ACTION', payload: string};
export const
  REMOVE_COMMENT_ACTION = 'REMOVE_COMMENT_ACTION',
  removeCommentAction = (id: string): RemoveCommentAction => ({
    type: REMOVE_COMMENT_ACTION,
    payload: id,
  });
```

### Flow types
- starting to reside near the place used (e.g. in the component file)
- when reused: placed to `types.js` files and exported

Combined example:
```javascript
// modules/posts/components/PostsCmp.jsx
import {Post} from './types.js';

type Props = {
  posts: Array<Post>,
};

export const PostsCmp = (props: Props) => (...);

// modules/posts/components/PostItemCmp.jsx
import {Post} from './types.js';

type Props = {
  post: Post,
};

export const PostCmp = (props: Props) => (...);

// modules/posts/types.js
export type Post {...};
```

### Reducers
- fn / file name always has `Reducer` suffix

## Data flow
- all state is stored in redux only (not in react state)
- possible exceptions: `TODO`

### Typical flow for creating a feature
- design state with flow types
- add action (flow type / type / creator)
- write corresponding reducer using an action
- write test for reducer and make sure it passes
- implement ui Component dispatching an action
- verify data flow is correct
  - update reducer / test if needed
- write integration test if needed
- apply Component styles
