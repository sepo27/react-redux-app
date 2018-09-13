## Table of Contents
* [Table of Contents](#table-of-contents)
* [Project structure](#project-structure)
* [Modules](#modules)
* [Conventions](#conventions)
   * [Common](#common)
   * [Actions](#actions)
   * [Flow types](#flow-types)
   * [Reducers](#reducers)
* [Styling](#styling)
   * [Color variables](#color-variables)
   * [Basic rules](#basic-rules)
   * [Theming](#theming)
      * [Example](#example)
* [Typical flow when creating new features](#typical-flow-when-creating-new-features)
   * [Data flow](#data-flow)
   * [UI](#ui)
   * [Parallel](#parallel)

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
    CommentCom.jsx
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
        PostsCom.jsx
        PostDetailCom.jsx
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
  - `Com` suffix
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
// modules/posts/components/PostsCom.jsx
import {Post} from './types.js';

type Props = {
  posts: Array<Post>,
};

export const PostsCom = (props: Props) => (...);

// modules/posts/components/PostItemCom.jsx
import {Post} from './types.js';

type Props = {
  post: Post,
};

export const PostCom = (props: Props) => (...);

// modules/posts/types.js
export type Post {...};
```

### Reducers
- fn / file name always has `Reducer` suffix

## Styling
Styling is done with the use of [css modules](https://github.com/css-modules/css-modules) and [sass](http://sass-lang.com/).

### Color variables
No pure color values are used, only through variables (e.g. `colors.scss`).
Variable naming is done using [the tool](http://chir.ag/projects/name-that-color/#FCFCFC).

### Basic rules
Common classes are 'inherited' using `composes` css modules feature.
This way no duplicate of css code (contrary to sass mixins).
Styles files are named after component's one excluding `Com` suffix (e.g. `MyDemoCom.jsx` -> `MyDemo.scss`).

### Theming
The styling always starts from using just `styles` for the component.
Semantic markup is used for the component as possible.
For small components - exposure of one `className` only in combinations with semantic markup
is enough to theme it from outside.
When component structure grows and multiple parts of it needs to be restyled from different places - a theming approach is used.
The basic rules are the following:
- extend component props with `theme` property and give it its own type (e.g. `Theme`)
- instantiate local property / variable inside component with theme type
- use `composeStyles` (TODO: provide link) to compose theme object
- use `theme` object instead of `styles` now where appropriate

#### Example
Before theming:
```javascript
// MyCom.jsx

import styles form './My.scss';

export const MyCom = () => (
  <div className={styles.container}>
    <header>
      <h1 className={styles.headerTitle}>My Component</h1>
    </header>
    <section>
      <div className={styles.content}>My Content</div>
    </section>
  </div>
);
```
```css
// My.scss

.container {
  width: 300px;
  height: 300px;
}

.container > header {
  margin-bottom: 15px;
}

.headerTitle {
  font-size: 16px;
}

.container > section {
  padding: 5px;
}

.content {
  font-size: 12px;
}
```

*(i) NOTE*: on the specificity. Because direct children selector (`>`) is used, in order to overwrite the rules we would need to expose classes for `header` / `section` via `theme`.
And other (e.g. `.content`) classes will need to be prepended with parent class where restyling of `MyCom` is done. (See below).

After:
```javascript
// MyCom.jsx

import styles from './MyCom.scss';

type Theme = {
  container?: string,
  header?: string,
  content?: string,
};

type Props = {
  theme?: Theme,
};

const MyCom = (props: Props) => {
  const theme: Theme = composeStylesTheme(styles, props.theme || {});
  return (
    <div className={theme.container}>
      <header className={theme.header}>
        <h1 className={styles.headerTitle}>My Component</h1>
      </header>
      <section>
        <div className={theme.content}>My Content</div>
      </section>
    </div>
  );
};
```
*(i) NOTE:* We only replace `styles` with `theme` where needed.
This way, shield other parts from accidental overruling and IDE continues to nicely hint on styles object.
(`Theme` type also partly serves purpose of type hinting).

Now, after 'theming' some parts of the component we can restyle it:
```javascript
// MyWrapperCom.jsx

import styles from './MyWrapperCom.scss';
import { MyCom } from './MyCom';

export const MyWrapperCom = () => (
  <MyCom
    theme={{
      container: styles.myContainer,
      header: styles.myHeader,
      content: styles.myContent,
    }}
  />
);
```
```css
// MyWrapperCom.scss

.myContainer {
  width: 500px;
  height: 500px;
}

.myContainer > header.myHeader {
  margin-bottom: 25px;
}

.myContainer .content {
  font-size: 13px;
}
```

*(i) NOTE:* how specificity is overruled because `.myContainer` parent was prepended

## Typical flow when creating new features
### Data flow
1. Design the state. So a `types` file should be an outcome of this step.
1. Write `actions`
1. Cover each action with reducer and tests in iterations:
    1. Write unit test for an action and fail it
    1. Write reducer for an action
    1. Pass the test
1. Cover 'compound actions' with middleware and tests in iterations:
    1. Write integration test for an action and fail it
    1. Cover an action with the logic
    1. Pass the test

*(i)* Here integration tests implies using dispatching actions directly

### UI
At this point, when data flow is well tested we can design the UI.
1. Write layout markup based on the wireframes
1. Break UI onto separate logical "areas" (e.g. drop down, search box, list, etc)
1. For each area
    1. Update integration test to deal with real elements
    1. Write detailed markup
    1. Cover with styles
    1. Add handlers

### Parallel
Working on data flow / UI can be simultaneous.
For that:
1. Design the state => state `types`
1. Work on data flow as described above
1. For UI we would need to add some stubs:
    1. Mock state data, which will come in props eventually
    1. Add empty event handlers
    1. Skip integration tests for now
1. Work on UI as described above
