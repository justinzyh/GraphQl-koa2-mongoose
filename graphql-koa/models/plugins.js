/**
 * @author:水痕
 * @time:2017-12-31 16:42
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:plugins.js
 * @describe:定义一个插件
 */
'use strict';
import isodate from 'isodate';

const lastModified = (schema, option) => {
  schema.add({lastMod: Date});
  schema.pre('save', function (next) {
    this.lastMod = isodate(new Date);
    next();
  })
}

export default lastModified;