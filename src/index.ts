import "es-expand"

/**
 * Remove the scope prefix for the package name
 * 去除包名的 scope 前缀
 *
 * @param  pkgName - name of the package 包的名字
 * @returns string  Return the name after removing the scope prefix  返回去除 scope 前缀后的名字
 */
export function removeScope(pkgName:string):string {return pkgName.replace(/@[^/]+\//,"")}


/**
 * convert the name of the package from a divider format to a hump format, and the scope prefix is automatically removed
 * 把包的名字从分隔线格式转换成驼峰格式，并且会自动去除 scope 前缀
 *
 * @param  pkgName - name of the package 包的名字
 * @param initial - 是否大写首字母，默认：true
 * @param separators -  optional; default: ["-","_"] ; separator or separator good array ["-","_"]； 可选；默认值：["-","_"] ；分隔符，或 包含多个分隔符的数组
 * @returns string  return hump format string  返回驼峰格式的字符串
 */
export function getBaseNameOfHumpFormat(pkgName:string,initial:boolean = true,separators ?: string | string[]):string {
	const hump = removeScope(pkgName).toHumpFormat(separators);
	return initial ? hump.charAt(0)!.toUpperCase()+hump.slice(1) : hump;
}


/**
 * 获取 package.json 中配置的指定依赖类型中的所有依赖的名字列表
 * Get a list of names for all dependencies in the specified dependency type configured in package.json
 * @param package -  必选；package.json 中的配置对象； Configuration objects in package.json
 * @param depTypes -  可选；默认值：["dependencies","optionalDependencies","peerDependencies"]；依赖类型的名字 或者 名字数组；     Optional; default: ["dependencies","optionalDependencies","peerDependencies"];
 * @returns Array<string>  返回包含指定依赖类型中的所有依赖名字的数组； Returns an array of all dependent names in the specified dependency type
 */
export function getDependencieNames(packageConf:any,depTypes?: string | string[]):string[] {
	depTypes = depTypes ? (typeof depTypes === "string" ? [depTypes] : depTypes) : ["dependencies","optionalDependencies","peerDependencies"];
	return Object.keys(Object.assign({},...depTypes.map(depType=>packageConf[depType])));
}



/**
 * 将 target 转成字符串类型    Turn target into a string type
 * - 如果 target 是 null 或 undefined 返回 空字符串 ""      If target is null or undefined returns an empty string ""
 * - 否则，如果 target 是 String 对象， 返回 该对象表示的字符串       Otherwise, if the target is a String object, returns the string represented by the object
 * - 否则，如果 target 是 其它 对象类型， 返回 该对象的 JSON 字符串    Otherwise, if target is a different object type, returns the object's JSON string
 * @param target - 要被转成字符串的对象
 * @param space -  缩进的空格，当 target 序列化成 JSON 时，会用到这个参数作为 `JSON.stringify` 的第三个参数 space 
 */
export function toString(target:any,space?: string | number | null){
	if (typeof target === "string") return target;
	if (target instanceof String) return target.toString();
	if (target == null) return "";
	return JSON.stringify(target,undefined,space as string | number);
}





/**
 * 将标签模板字符串的标签函数的参数拼接成字符串
 * @param space -  缩进的空格，当 标签模板字符中的插值是对象时 会用到这个参数作为 `JSON.stringify` 的第三个参数 space 将插值转成 JSON 字符串
 * @param strPieces -  标签模板字符串的标签函数的第一个参数
 * @param interpolation    包含标签模板字符串的所有插值的数组
 */
function stringTagWithSpace(space: string | number | undefined | null,strPieces:string[],interpolation:any[]){
	const allStrPieces = interpolation.reduce(function(allStrs,arg,index){
		allStrs.push(toString(arg,space),strPieces[index + 1]);
		return allStrs;
	},[strPieces[0]]);
	return allStrPieces.join("");
}



 /**
 * 生成 标签模板字符串的标签函数
 * @param space - 可靠；将模板字符串插件对象转成 JSON 字符串的 缩进的空格
 * 示例：
 * toStringTag(2)`个人信息${name:"郭斌勇",email: "guobinyong@qq.com"}`
 */
export function toStringTag(space?: string | number): (strPieces:string[],...interpolation:any[])=>string;


/**
 * 标签模板字符串的标签函数
 * 模板字符中的参数会经过 toString 方法处理
 */
export function toStringTag(strPieces:string[],...interpolation:any[]):string;
export function toStringTag(strsOrSpace:string | number | undefined | null | string[],...interpolation:any[]){
	if (Array.isArray(strsOrSpace)){
		return stringTagWithSpace(undefined,strsOrSpace,interpolation);
	}

	return function(strPieces:string[],...interpolation:any[]){
		return stringTagWithSpace(strsOrSpace as  string | number,strPieces,interpolation);
	}
}