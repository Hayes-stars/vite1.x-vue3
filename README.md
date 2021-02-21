# vite1.x-vue3.x

> 学习笔记文章来自：

`https://juejin.cn/post/6866373381424414734`

> vite1+vue3 视频来自：

`https://www.bilibili.com/video/BV1Wh411X7Xp?p=12&spm_id_from=pageDriver`

> 关于 vite 工程探索文章来自：

`https://juejin.cn/post/6910014283707318279`

#### vue-router4 变化记录

**实例创建方式发生变化**

- history 选项替代了 mode 选项
- history: createWebHistory()
- hash: createWebHashHistory()
- abstract: createMemoryHistory()

**base 选项移至 createWebHistory**

**通配符\*被移除**

**isReady()替代 onReady()**

```javascript
router.push()
// before:
router.onReady(onSuccess, onError)
// now:
router.isReady().then(onSuccess).catch(onError)
```

**scrollBehavior 滚动行为变化**

- x,y 变成 top,left

**现在 keep-alive 和 transition 必须用在 router-view 内部**

```html
<!-- before -->
<keep-alive>
  <router-view></router-view>
</keep-alive>

<!-- now -->
<router-view v-slot="{Component}">
  <keep-alive>
    <component :is="Component"></component>
  </keep-alive>
</router-view>
```

**router-link**移除了一波属性

- append

```html
<!-- before -->
<router-link to="child-route" append />

<!-- now 手动实现一个append方法  拼接 -->
<router-link to="child-route" />

app.config.globalProperties.append = (path, pathToAppend) => { return path +
pathToAppend }
```

- tag/event

```html
<!-- before -->
<router-link to="/xx" tag="span" event="dbclick" />
<!-- now -->
<router-link to="/xx" custom v-slot="{navigate}">
  <span @dbclick="navigate">xxx</span>
</router-link>
```

- exact: 现在完全匹配逻辑简化

**mixins 中的路由守卫将被忽略**

**match 方法被移除，使用 resolve 替代**

**移除 router.getMatchedComponents()**

```js
// 替代访问写法
router.currentRoute.value。matched
```

**包括首屏导航在内所有导航均为异步**

```js
app.use(router)
router.isReady().then(() => app.mount('#app))
```

> > > 如果首屏存在路由守卫，则可以不等待就绪直接挂载，产生结果将和 vue2 相同

**route 的 parent 属性被移除**

```js
// 父级路由替代写法
const parent = this.$route.matched[this.$route.matched.length - 2]
```

**pathToRegexpOptions 选项被移除**

- pathToRegexpOptions => strict
- caseSensitive => sensitive

```js
createRouter({
  strict: boolean,
  sensitive: boolean,
})
```

**使用 history.state**

```js
// before
history.pushState(myState, '', url)

//now
router.push(url)
// 如需用底层history则使用该方法不导致state丢失
history.replaceState({...history.state, ...myState}, '')
```

```js
// before
history.replaceState({}, '', url)
// now
history.replaceState(history.state, '', url)
```

**routes选项必填项**

```js
createRouter({routes:[]})
```

**跳转不存在命名路由报错**

```js
router.push({name: 'dashboard'})
```

**缺少必填参会抛出异常**

**命名子路由如果path为空的时候不再追加/**

```js
[
  path: 'dashboard',
  children: [
    {path: '', component: DashboardDefault}
  ]
]

// 以前生成url /dashboard/

```
- 副作用： 给设置了重定向redirect选项的子路由带来副作用

```js
[
  path: 'dashboard',
  children: [
    {path: '', redirect: '/dashboard/home'}
    {path: 'home', component: Home}
  ]
]

// 以前： /dashboard/home/

// /home

```

**$route属性编码行为**

- params/query/hash
  - path/fullpath 不再做解码
  - hash会被解码
  - push、resolve和replace，字符串参数，或者对象参数path属性必须编码
  - params 里面的斜杠"/" 会被解码
  - query中的+不做处理，如需处理：stringifyQuery


