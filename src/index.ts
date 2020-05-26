import "es-expand"

/**
 * Remove the scope prefix for the package name
 * 去除包名的 scope 前缀
 *
 * @param  pkgName : string    name of the package 包的名字
 * @returns string  Return the name after removing the scope prefix  返回去除 scope 前缀后的名字
 */
export function removeScope(pkgName:string):string {return pkgName.replace(/@[^/]+\//,"")}


/**
 * convert the name of the package from a divider format to a hump format, and the scope prefix is automatically removed
 * 把包的名字从分隔线格式转换成驼峰格式，并且会自动去除 scope 前缀
 *
 * @param  pkgName : string    name of the package 包的名字
 * @param separators ?: string | Array<string>   optional; default: ["-","_"] ; separator or separator good array ["-","_"]； 可选；默认值：["-","_"] ；分隔符，或 包含多个分隔符的数组
 * @returns string  return hump format string  返回驼峰格式的字符串
 */
export function getBaseNameOfHumpFormat(pkgName:string, separators ?: string | string[]):string {return removeScope(pkgName).toHumpFormat(separators)}


/**
 * 获取 package.json 中配置的指定依赖类型中的所有依赖的名字列表
 * Get a list of names for all dependencies in the specified dependency type configured in package.json
 * @param package:object  必选；package.json 中的配置对象； Configuration objects in package.json
 * @param depTypes?: string | string[]    可选；默认值：["dependencies","optionalDependencies","peerDependencies"]；依赖类型的名字 或者 名字数组；     Optional; default: ["dependencies","optionalDependencies","peerDependencies"];
 * @returns Array<string>  返回包含指定依赖类型中的所有依赖名字的数组； Returns an array of all dependent names in the specified dependency type
 */
export function getDependencieNames(packageConf:any,depTypes?: string | string[]):string[] {
	depTypes = depTypes ? (typeof depTypes === "string" ? [depTypes] : depTypes) : ["dependencies","optionalDependencies","peerDependencies"];
	return Object.keys(Object.assign({},...depTypes.map(depType=>packageConf[depType])));
}
