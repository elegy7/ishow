module.exports = {
  root: false,
  env: {
    node: true
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  extends: ["plugin:vue/recommended", "eslint:recommended"],
  // 0无视 1警告 2错误
  "rules": {
    /* 未定义变量 */
    "no-undef": 0,
    /* 多余的空格 */
    "no-multi-spaces": 1,
    /* 注释前后空格 */
    "spaced-comment": 0,
    /* 代码缩进 */
    "indent": [0, 4],
    /* 取原型数据警告 */
    "no-proto": 1,
    /* ==强制=== */
    "eqeqeq": 0,
    "no-useless-escape": 0,
    "no-unused-vars": 1,
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-console": process.env.NODE_ENV === 'production' ? 1 : 0,
    // return
    "no-unreachable": 1,
    // 空行
    "no-trailing-spaces": 0,
    // 强制使用单引号
    "quotes": ["error", "single"],
    // 结尾不加分号
    "semi": [2, "never"],
    "one-var": 0,
    "brace-style": 0,
    // 方法括号前空格
    "space-before-function-paren": 0,
    "no-new": 0,
    "no-var": 1,
    "vue/max-attributes-per-line": 0,
    "vue/attributes-order": 0,
    "vue/valid-v-for": 0,
    "vue/multiline-html-element-content-newline": 0,
    "vue/html-closing-bracket-newline": 0,
    "vue/mustache-interpolation-spacing": 0,
    "vue/singleline-html-element-content-newline": 0,
    "vue/order-in-components": 0,
    "vue/require-v-for-key": 0,
    "vue/html-self-closing": 0,
    "vue/require-prop-types": 0
  }
}
