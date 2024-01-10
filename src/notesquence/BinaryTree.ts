



export class BinaryTree<Key, Value>{

    constructor(){

    }

    /**
     * @description 将键值对存入表中
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    put(key:Key, val:Value){

    }

    /**
     * @description 获取键key对应的值（若键key不存在则返回null）
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    get(key:Key):Value{

    }

    /**
     * @description 
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    delete(key:Key){

    }

    /**
     * @description 键key是否存在于表中
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    contain(key:Key):boolean{
        return 
    }

    /**
     * @description 返回最小的键
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    min():Key{

    }

    /**
     * @description 返回最大的键
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    max():Key{

    }

    /**
     * @description 小于等于键key的最大键
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    floor(key:Key):Key{

    }

    /**
     * @description 大于等于键key的最小键
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    ceiling(key:Key):Key{

    }

    /**
     * @description 小于键key的键的数量
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    rank(key:Key):number{

    }

    /**
     * @description 返回排名为rank的键key
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    select(rank:number):Key{

    }
    
    /**
     * @description 返回[lower, higher]之间键值对的数量
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    sizeIn(lower:Key, higher:Key):number{
        
    }
    
    /**
     * @description 返回表中键值对的数量
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
     size():number{

    }

    /**
     * @description 返回[lower, higher]之间键的数组，已排序
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    keysIn(lower:Key, higher:Key):Key[]{
        
    }
    
    
    
    /**
     * @description 返回表中键的数组，已排序
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    keys():Key[]{

    }
}

class BinaryTreeNode{

    constructor(){

    }
}

