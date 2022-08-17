<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [package-tls](./package-tls.md) &gt; [getDependencieNames](./package-tls.getdependencienames.md)

## getDependencieNames() function

获取 package.json 中配置的指定依赖类型中的所有依赖的名字列表 Get a list of names for all dependencies in the specified dependency type configured in package.json

<b>Signature:</b>

```typescript
export declare function getDependencieNames(packageConf: any, depTypes?: string | string[]): string[];
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  packageConf | any |  |
|  depTypes | string \| string\[\] | <i>(Optional)</i> 可选；默认值：\["dependencies","optionalDependencies","peerDependencies"\]；依赖类型的名字 或者 名字数组； Optional; default: \["dependencies","optionalDependencies","peerDependencies"\]; |

<b>Returns:</b>

string\[\]

Array<string> 返回包含指定依赖类型中的所有依赖名字的数组； Returns an array of all dependent names in the specified dependency type
