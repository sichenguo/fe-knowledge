function observer(value) {
  if (typeof value === 'object' && typeof vlaue !== null) {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        defineReacticve(value, key, value[key])
      }
    }
  }
}

function defineReacticve(obj, key, value) {
  observer(value)
  Object.defineProperty(obj, key, {
    get() {
      // 在get的时候收集依赖 ，因为Vue的颗粒度是组件，所以这里收集的是有用到这个数据的组件的Vue实例。
      console.log(`我在这里读取${key}了喂`)
      return value
    },
    set(newVal) {
      if (newVal !== value) {
        value = newVal // set说明数据发生了变化，在这里调取对应的方法（重新执行渲染函数）
        console.log(`我在这里修改${key}了喂`)
      }
    }
  })
}

let testObj = { man: { name: '张三', age: 20 } }
observer(testObj)
console.log(testObj)
testObj.man
testObj.man.age = 30

// -----------------------------分割线-----------------------
// vue3的响应式
let handler = {
  set(target, key, value) {
    return Reflect.set(targer, key, value)
  },
  get(target, key) {
    // get 的时候才会去进行下一层代理
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(targer[key], handler)
    }
  }
}

let testObj = { man: { name: '张三', age: 20 } }
let proxy = new Proxy(testObj, handler)
