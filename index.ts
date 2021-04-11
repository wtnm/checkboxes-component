import {createElement as h, forwardRef, FunctionComponent, isValidElement, PureComponent} from "react";
import {isArray, isFunction, isString} from "is-fns";
import {objKeys, push2array, toArray, setIn, anyObject} from "objects-fns";


function extendProps(key: string, base: any, extend: any = {}, opts: any = {}) {
  if (isValidElement(extend)) return extend;
  if (isFunction(extend)) return extend(base, key);
  let {tagName = '_$useTag', defaultTag: Tag = 'div', elementProp = 'data-element'} = opts;  // wrapName = '_$wrap',
  let rest = base ? {key, ...base, ...extend} : {key, ...extend};
  if (elementProp) rest[elementProp] = key;
  if (rest[tagName]) {
    Tag = rest[tagName];
    delete rest[tagName];
  }
  return h(Tag, rest);
}


type CheckboxProps = {
  type: string,
  label: string,
  value?: any,
  name?: string,
  $extend?: anyObject,
  // children?: any
  [key: string]: any
}

const Checkbox = forwardRef(({$extend = {}, children = [], label, type = "checkbox", className = "", ...rest}: CheckboxProps,
                             ref) => {

  let {input: inputExtend, label: labelExtend, checkbox: checkboxExtend, ...restExtend} = $extend;

  return extendProps('checkbox', {
    _$useTag: 'label', className,
    children: [
      extendProps('input', {_$useTag: 'input', ref, type, ...rest}, inputExtend),
      extendProps('label', {_$useTag: 'span', children: [label]}, labelExtend),
      ...(objKeys(restExtend).map(k => extendProps(k, restExtend[k]))),
      ...toArray(children || []).map((elm, idx) => isValidElement(elm) ? elm : extendProps(elm.key || idx, elm))
    ]
  }, $extend);
});

type CheckboxesProps = {
  _$useTag: string | FunctionComponent,
  $enum: Array<string | number>,
  $enumExten: anyObject,
  $staticProps: anyObject,
  name: string,
  type: string,
  value?: any,
  // children?: any
  [key: string]: any
}

class Checkboxes extends PureComponent<CheckboxesProps, any> {
  $refs: any[] = []

  protected _setRef = (name: string | string[]) => {
    return (v: any) => setIn(this.$refs, v, isString(name) ? name.split('/') : name)
  };

  render() {
    let {
      _$useTag = 'div', $enum, $enumExten = {}, $staticProps,
      type = "radio", value = [], name = '', children: passedChildren = [], ...rest
    } = this.props;
    value = toArray(value);
    if (!$enum) $enum = isArray($enumExten) ? $enumExten.map(k => k.value) : objKeys($enumExten);
    if (name) name = type === 'radio' ? name : name + '[]';
    let children = $enum.map((val: any) => {
      let baseProps = {...$staticProps};
      baseProps.checked = !!~value.indexOf(val);
      baseProps.type = type;
      baseProps.name = name;
      baseProps.value = val;
      baseProps.label = val;
      baseProps._$useTag = baseProps._$useTag || Checkbox;
      baseProps.ref = this._setRef(name);
      return extendProps(val, baseProps, $enumExten[val] ? (isString($enumExten[val]) ? {label: $enumExten[val]} : $enumExten[val]) : {})
    });
    push2array(children, toArray(passedChildren || []).map((elm: any, idx) => isValidElement(elm) ? elm : extendProps(elm.key || idx, elm)));

    return h(_$useTag, rest, children);
  }
}


export {Checkbox, Checkboxes}
