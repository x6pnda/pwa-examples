module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "@vue/typescript/recommended",
        "@vue/prettier",
        "@vue/prettier/@typescript-eslint",
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "@typescript-eslint/ban-ts-comment": "off",
        'prettier/prettier': [
            'error',
            {
                "trailingComma": "es5",
                "tabWidth": 4,
                "semi": true,
                "singleQuote": true,
                "printWidth": 160,
                "vueIndentScriptAndStyle": true,
                "endOfLine": "auto",
                "useTabs": false
            }
        ]
    }
};
