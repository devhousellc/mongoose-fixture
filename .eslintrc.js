/* eslint-disable */

'use strict';
module.exports = {
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'env': {
    'es6': true,
    'shared-node-browser': true,
    'mocha': true,
    'node': true,
  },
  'rules': {
    // require    = error if not (...)
    // disallow   = error if (...)
    // suggest    = warning if not (...)
    // warn       = warning if (...)

    //////// POSSIBLE ERRORS ////////

    // suggest comma at end of multiline object or array,
    // no comma at end of object or array on a single line
    'comma-dangle': [1, 'only-multiline'],

    // error if assignment inside condition, such as
    //    if(x = 3)
    'no-cond-assign': [2, 'except-parens'],

    // warn if condition is constant, such as
    //    if(false)
    'no-constant-condition': 1,

    // disallow debugger keyword
    'no-debugger': 2,

    // disallow multiple arguments with the same name, such as
    //    function(a, b, a) { ... }
    'no-dupe-args': 2,

    // disallow object literals with dupliate keys, such as
    //    { a: 1, b: 2, a: 1 }
    'no-dupe-keys': 2,

    // disallow switch with duplicate cases, such as
    //    switch(x) {
    //      case 1: // ...
    //      case 2: // ...
    //    }
    'no-duplicate-case': 2,

    // warn about empty character classes in regular expressions
    'no-empty-character-class': 1,

    // warn about unnecessary boolean casts, such as
    //    if(Boolean(x))
    'no-extra-boolean-cast': 1,

    // warn about unnecessary semicolons
    'no-extra-semi': 1,

    // disallow reassigning a function, such as
    //    function x() { }
    //    x = 3; // <-- error
    //    var x = 3; // <-- no error
    'no-func-assign': 2,

    // disallow function declarations inside nested scopes, such as
    //    if(true) {
    //      function foo() { }
    //    }
    'no-inner-declarations': 2,

    // warn about invalid regular expressions
    'no-invalid-regexp': 1,

    // disallow unusual whitespace characters outside string literals
    'no-irregular-whitespace': 2,

    // disallow negated left-hand side in statements such as
    //    for(!x in something)
    // instead use
    //    for(!(x in something))
    'no-negated-in-lhs': 2,

    // disallow calling known uncallable objects, such as Math and JSON
    'no-obj-calls': 2,

    // disallow sparse arrays, such as
    //    var x = [,,,];
    'no-sparse-arrays': 2,

    // disallow ambiguous linebreaks
    'no-unexpected-multiline': 2,

    // warn about unreachable statements, such as
    //    if(false) {
    //      console.log('unreachable');
    //    }
    'no-unreachable': 1,

    // require isNaN() instead of comparison with NaN
    'use-isnan': 2,

    // ensure that comparisons with typeof are valid
    'valid-typeof': 2,

    //////// BEST PRACTICES ////////

    // warn about certain callback methods (such as those of Array.map and Array.filter)
    // that must return a value if they don't
    'array-callback-return': 1,

    // require blocks for if, else if, for, etc. only if it would contain more than one statement,
    // or a nested block, stay consistent across if...else if...else... etc.
    // "curly": [ 1, "multi-or-nest", "consistent" ],

    // when putting a linebreak before a property, suggest putting the dot after the linebreak
    'dot-location': [1, 'property'],

    // when possible, suggesting using dot notation
    'dot-notation': [1, { 'allowKeywords': true }],

    // force === unless comparing with null
    'eqeqeq': [2, 'allow-null'],

    // disallow alert(), prompt() and confirm()
    'no-alert': 2,

    // disallow arguments.caller and arguments.callee
    'no-caller': 2,

    // warn about let or const declarations after case in a switch block
    'no-case-declarations': 1,

    // warn about empty destructuring patterns, such as
    //    var { } = { a: 3 };
    'no-empty-pattern': 1,

    // eval() is evil
    'no-eval': 2,

    // warn about extending native objects, such as String and Object
    'no-extend-native': 1,

    // warn about unnecessary .bind()
    'no-extra-bind': 1,

    // warn about unnecessary labels
    'no-extra-label': 1,

    // warn about fallthroughs in switch statements
    'no-fallthrough': 1,

    // warn about floating decimals, such as 1. or .3
    'no-floating-decimal': 1,

    // warn about implicit coercion, such as !!x or ""+x
    'no-implicit-coercion': 1,

    // eval() is still evil
    'no-implied-eval': 2,

    // no "this" outside classes or class-like objects
    'no-invalid-this': 1,

    // warn about deprecated __iterator__ property
    'no-iterator': 1,

    // warn about unnecessary blocks
    'no-lone-blocks': 1,

    // warn about functions in loops
    'no-loop-func': 0,

    // warn about multiple spaces ???
    'no-multi-spaces': 0, // ...?

    // disallow multiline strings, such as
    //    var x = "Line 1\
    //    Line 2";
    'no-multi-str': 2,

    // disallow reassignment of native objects
    'no-native-reassign': 2,

    // disallow new for side effects, such as
    //    new Person();
    // instead of
    //    var x = new Person();
    'no-new': 2,

    // disallow new Function()
    'no-new-func': 2,

    // disallow new String(), new Boolean(), new Number(), etc.
    // use String(), Boolean(), Number() instead
    'no-new-wrappers': 2,

    // warn about octal literals
    'no-octal': 1,

    // warn about octal escape sequences in strings
    'no-octal-escape': 1,

    // disallow deprecated __proto__ property, use .getPrototypeOf() instead
    'no-proto': 2,

    // disallow redeclarations of variables in same scope
    'no-redeclare': 1,

    // disallow assignment in return statements
    'no-return-assign': 2,

    // disallow assignment with self, such as
    //    var x = 3;
    //    x = x; // <-- error
    'no-self-assign': 2,

    // warn about comparing with self, such as
    //    if(x === x) // <--- warn
    'no-self-compare': 1,

    // warn about comma sequences, such as
    //    var x = 1, 2, 3; // <--- warn
    'no-sequences': 1,

    // warn about loops whose condition never appear to change, such as
    //    while(x) { console.log(x); }
    'no-unmodified-loop-condition': 1,

    // warn about unused expressions
    'no-unused-expressions': 1,

    // warn about unused labels
    'no-unused-labels': 1,

    // warn about useless .call() and .apply()
    'no-useless-call': 1,

    // warn about useless string concatenation, such as
    //    var x = "a" + "b";
    // instead of
    //    var x = "ab";
    'no-useless-concat': 1,

    // disallow void keyword
    'no-void': 2,

    // warn about TODO and FIXME comments in JavaScript code
    'no-warning-comments': 1,

    // disallow with keyword
    'no-with': 2,

    // suggest that immediately called functions are wrapped in parentheses, such as
    //    (function() { })();
    // instead of
    //    function() { }();
    'wrap-iife': [1, 'inside'],

    // warn about yoda conditions
    'yoda': [1, 'never'],

    //////// STRICT ////////

    // warn if "use strict" is not used at top of file,
    // or if used anywhere else
    'strict': [1, 'global'],

    //////// VARIABLES ////////

    // warn if a catch clause parameter shadows another variable in the
    // same scope
    'no-catch-shadow': 1,

    // disable delete statement on variables
    // (should only be used on properties)
    'no-delete-var': 2,

    // disallow labels that shadow a variable that is in scope
    'no-label-var': 2,

    // disallow shadowing restricted names such as undefined
    'no-shadow-restricted-names': 2,

    // show error when using unknown (undeclared) variables
    // global variables should be added to the top of the file in a
    // comment like this:
    //    /* global var1 var2 var3 var4 */
    'no-undef': 2,

    // warn about unused variables
    'no-unused-vars': [1, { 'vars': 'local', 'args': 'none' }],

    //////// NODE.JS AND COMMONJS ////////

    // require that callbacks handle their 'err' parameter
    'handle-callback-err': 1,

    // disallow calling new require('...') which almost always
    // is a mistake
    'no-new-require': 2,

    // warn when using synchronous functions
    'no-sync': 0, // ...???

    //////// STYLISTIC ISSUES ////////

    // use spacing inside arrays, such as [ 1, 2, 3 ] instead of [1,2,3]
    // "array-bracket-spacing": [ 1, "always" ],

    // use spacing inside blocks, such as { x = 3; } instead of {x=3;}
    'block-spacing': [1, 'always'],

    // use the one true brace style, such as
    //    if (x) {
    //      // ...
    //    } else {
    //      // ...
    //    }
    // allow singline expressions, such as
    //    if (x) { /* ... */ }
    'brace-style': [1, '1tbs', { 'allowSingleLine': true }],

    // use camelcase naming convention
    'camelcase': [1, { 'properties': 'never' }],

    // suggest space after but not before comma
    'comma-spacing': [1, { 'before': false, 'after': true }],

    // when breaking a line near a comma, suggest placing
    // the comma before the line break
    'comma-style': [1, 'last'],

    // warn if using spaces inside computer property, for instance
    //    x[ 3 ] // <--- warning
    'computed-property-spacing': [1, 'never'],

    // use var x = function() {} or function x() ...?
    'func-style': 0, // ...?

    // indent with a 2 spaces character
    'indent': ['error', 2, { 'SwitchCase': 1 }],

    // prefer double quotes in JSX (if applicable)
    'jsx-quotes': [1, 'prefer-double'],

    // suggest spacing after colon but not before in key: value pairs
    'key-spacing': [1, { 'beforeColon': false, 'afterColon': true, 'mode': 'minimum' }],

    // suggest spacing before and after keywords such as if, else, etc.
    'keyword-spacing': [1, { 'before': true, 'after': true }],

    // warn if not using unix linebreaks
    // "linebreak-style": [ 2, "unix", "windows" ],

    // warn if too many nested blocks
    // "max-depth": [ 1, 4 ],

    // warn if line is too long (1000 default) ???
    'max-len': [1, 1000, 2],

    // warn if too many nested callbacks
    // "max-nested-callbacks": [ 1, 3 ],

    // require parentheses after new operator
    'new-parens': 2,

    // disallow Array(...items) except Array(length)
    'no-array-constructor': 2,

    // warn about lonely if statements inside else blocks
    'no-lonely-if': 1,

    // warn about mixed spaces and tabs
    'no-mixed-spaces-and-tabs': 1,

    // warn about multiple empty lines in a row...???
    'no-multiple-empty-lines': 0, // ...?

    // disallow nested ternaries
    'no-nested-ternary': 2,

    // disallow new Object()
    'no-new-object': 2,

    // warn about spaces between function keyword and parentheses, or
    // between function name and parentheses
    'no-spaced-func': 1,

    // warn about trailing spaces
    'no-trailing-spaces': 1,

    // warn about unnecessary ternary operators
    'no-unneeded-ternary': 1,

    // warn about whitespace before properties, such as
    //     foo.   bar
    'no-whitespace-before-property': 1,

    // use spacing inside arrays, such as [ 1, 2, 3 ] instead of [1,2,3]
    'object-curly-spacing': [1, 'always'],

    // warn if a linebreak is put near an operator, and the
    // operator is before the line break, such as
    //    var x = 3 + // <-- warning
    //            2;
    // instead of
    //    var x = 3   // <-- no warning
    //          + 2;
    'operator-linebreak': [1, 'after', { 'overrides': { '?': 'before', ':': 'before' } }], // ...?

    // disallow empty lines at the start or end of a block
    'padded-blocks': [1, 'never'],

    // either quote all or none of the properties of an object
    'quote-props': [1, 'consistent'],

    // prefer single quotes
    'quotes': [1, 'single', 'avoid-escape'],

    // require semicolons
    'semi': [2, 'always'],

    // require space after semicolon, if multiple statements on the same line
    'semi-spacing': [1, { 'before': false, 'after': true }],

    // require space before blocks in if, else, etc., such as
    //    if (x) {
    //      //  ^-- space
    //    }
    'space-before-blocks': [1, 'always'],

    // warn about space before function call parentheses, such as
    //    foo (x)
    //    // ^-- space
    'space-before-function-paren': [1, 'never'],

    // warn about spaces in parentheses, such as
    //    var x = ( 1 + 3 ); // <-- warn
    'space-in-parens': [1, 'never'],

    // suggest spaces between infix operators, such as
    //    var x = 1 + 3;
    'space-infix-ops': 1,

    // suggest spaces after unary operators
    'space-unary-ops': [1, { 'words': true, 'nonwords': false }],

    // suggest space at beginning of comments
    'spaced-comment': [1, 'always'],

    //////// ECMASCRIPT 6 ////////

    // recommend blocks in arrow functions as needed
    'arrow-body-style': [1, 'as-needed'],

    // require parentheses around parameters in arrow functions
    'arrow-parens': [2, 'always'],

    // suggest spacing before and after arrow in arrow functions
    'arrow-spacing': [1, { 'before': true, 'after': true }],

    // check correct usage of super() in classes
    'constructor-super': 2,

    // suggest space after but not before star in generator, in other words
    //    function* () { ... }
    'generator-star-spacing': [1, { 'before': false, 'after': true }],

    // disallow reassignment of a class
    'no-class-assign': 2,

    // disallow reassignment of a const variable
    'no-const-assign': 2,

    // disallow duplicate class members
    'no-dupe-class-members': 2,

    // disallow new Symbol()
    'no-new-symbol': 2,

    // disallow this or super before super() call in constructor (when applicable)
    'no-this-before-super': 2,

    // warn about useless constructors in classes
    'no-useless-constructor': 1,

    // prefer let or const over var...?
    'no-var': 0, // ...?

    // warn when using object shorthand
    'object-shorthand': [0, 'never'], // ...?

    // suggest const when possible...?
    'prefer-const': 0, // ...?

    // prefer rest parameters instead of arguments variable
    'prefer-rest-params': 2,

    // prefer spread operator instead of .apply()
    'prefer-spread': 1,

    // require curly braces inside template strings
    'template-curly-spacing': 2,

    // suggest space after but not before star in yield operator
    'yield-star-spacing': [1, { 'before': false, 'after': true }],
  },
};
