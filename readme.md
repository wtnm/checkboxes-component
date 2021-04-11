

<!-- toc -->



<!-- tocstop -->

## Overview
`react-checkboxes` - component that renders several checkboxes (or radio) as single input.

## Installation

To install the stable version:

```
npm install --save react-checkboxes
```

## Usage
```
import {Checkboxes} from 'react-merge'
```

## Documentation

####Checkboxes(props: CheckboxesProps)
`CheckboxesProps` - object with following properties:
  - `_$useTag: string | FunctionComponent` - tag than will be used for chexboxes, default is `Checkbox`.
  - `$enum: Array<string | number>` - array of possible values.
  - `$staticProps: anyObject` - props that passed to every inner checkbox. `onChange` or `onClick` should be passed here.
  - `$enumExten: anyObject` - extension of `$enum`, props that passed to inner checkbox individually.
  - `name: string` - name for inner checkboxes.
  - `type: string` - type of checkboxes (`radio` or `chexbox` for input)
  - `value: any` - value

  - `[key: string]: any` - rest props will be passed to the root element unchanged.

####Checkbox(props: CheckboxProps)
`CheckboxesProps` - object with following properties:
- `name: string` - name
- `type: string` - type of checkbox (`radio` or `chexbox` for input)
- `label: string` - label
- `value: any` - value
- `$extend` - Component `Checkbox` consists of 3 inner elements: `checkbox`, `input`, `label`. 
  Elements `input` and `label` are inner elements of `checkbox` element. Each element can be extended with custom props passed in `$extend[elementName]`. 
  For example, to add to `label` prop `onClick` should be like: `$extend = {label: {onClick:()=>alert('label')}}`

- `[key: string]: any` - rest props will be passed to the input element unchanged.
