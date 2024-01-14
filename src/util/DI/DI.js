"use strict";
// Container.js
class Container {
    constructor() {
        this.registry = new Map();
    }
    // 注册依赖项
    register(name, dependencies, createFn) {
        this.registry.set(name, { dependencies, createFn });
    }
    // 解析依赖项
    resolve(name) {
        let { dependencies, createFn } = this.registry.get(name);
        let resolvedArgs = dependencies.map(depName => this.resolve(depName));
        return createFn(...resolvedArgs);
    }
}
示例;
// MyService.js
class MyService {
    constructor(dep1, dep2, dep3) {
        this.dep1 = dep1;
        this.dep2 = dep2;
        this.dep3 = dep3;
    }
    someMethod() {
        // 在方法中使用依赖项
        console.log(this.dep1, this.dep2, this.dep3);
    }
}
// Container.js
class Container {
    constructor() {
        this.registry = new Map();
    }
    // 注册依赖项
    register(name, dependencies, createFn) {
        this.registry.set(name, { dependencies, createFn });
    }
    // 解析依赖项
    resolve(name) {
        let { dependencies, createFn } = this.registry.get(name);
        let resolvedArgs = dependencies.map(depName => this.resolve(depName));
        return createFn(...resolvedArgs);
    }
}
// 创建容器
const container = new Container();
// 注册依赖项
container.register('dep1', [], () => 'dep1');
container.register('dep2', [], () => 'dep2');
container.register('dep3', [], () => 'dep3');
container.register('myService', ['dep1', 'dep2', 'dep3'], (dep1, dep2, dep3) => new MyService(dep1, dep2, dep3));
// 解析依赖项，并获取实例
const myService = container.resolve('myService');
// 调用方法
myService.someMethod();
