# nest learn with ShenGuang's handbook

## IOC

### 1.0 后端开发对象间的依赖关系

```js
const config = new Config({ username: 'xxx', password: 'xxx'});

const dataSource = new DataSource(config);

const repository = new Repository(dataSource);

const service = new Service(repository);

const controller = new Controller(service);
```

> 要使用controller 需要一系列的初始化之后才能使用，这种依赖关系是一种紧耦合的关系，如果要修改其中的某一个类，就需要修改整个依赖链，这种紧耦合的关系会导致代码的可维护性变差，可扩展性变差，可测试性变差。
>
> 使用：它有一个放对象的容器，程序初始化的时候会扫描 class 上声明的依赖关系，然后把这些 class 都给 new 一个实例放到容器里。
> IOC的核心思想是将对象的创建和组装交给容器来完成，而不是手动创建和组装。这种方式可以大大减少代码的重复性，提高代码的可维护性和可扩展性。同时，IOC也是依赖注入的一种实现方式，通过声明依赖关系，容器可以自动注入依赖对象。这种方式可以减少代码的耦合性，提高代码的可测试性。

### 什么是IOC

Inverse Of Control，控制反转。从主动创建依赖到被动等待依赖注入。

### Nest 中的模块

nest 就会从 AppModule 开始解析 class 上通过装饰器声明的依赖信息，自动创建和组装对象。

nest 还加了模块机制，可以把不同业务的 controller、service 等放到不同模块里。import 的模块，被 import 的模块 exports 的 provider 就可以在当前模块注入了。

### 多种Provider 

provider 一般都是用 @Injectable 修饰的 class

```javascript
@Injectable()
export class AppService {
}
```

在 Module 的 providers 里声明

```javascript
@Module({
  providers: [AppService]
})
export class AppModule {
}

//  上面写法等价于
@Module({
  providers: [{
    provide: AppService,
    useClass: AppService
  }]
})
export class AppModule {
}
```

属性注入

```js
@Controller()
export class AppController {
  @Inject(AppService) // 也可以 @Inject('AppService'), 
  private readonly appService: AppService;
}
```

自定义 provider 的方式里，最常用的是 useClass，不过我们一般会用简写，也就是直接指定 class。

useClass 的方式由 IOC 容器负责实例化，我们也可以用 useValue、useFactory 直接指定对象。
