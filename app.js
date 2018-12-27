(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList === 'function' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done(elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done(elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done(elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? elm$http$Http$GoodStatus_ : elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return elm$core$Dict$empty;
	}

	var headers = elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(elm$core$Dict$update, key, function(oldValue) {
				return elm$core$Maybe$Just(elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? elm$core$Maybe$Just(event.total) : elm$core$Maybe$Nothing
		}))));
	});
}

// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		out.push(A4(elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		return replacer(A4(elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var author$project$Types$EN = {$: 'EN'};
var author$project$Types$Hidden = {$: 'Hidden'};
var author$project$Types$Unauthenticated = {$: 'Unauthenticated'};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Basics$False = {$: 'False'};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Main$init = function (flags) {
	return _Utils_Tuple2(
		{
			auth: author$project$Types$Unauthenticated,
			fields: {loginPassword: '', loginProjectID: '', newMember: '', newMemberWeight: '', newProjectEmail: '', newProjectError: elm$core$Maybe$Nothing, newProjectName: '', newProjectPassword: ''},
			locale: author$project$Types$EN,
			modal: author$project$Types$Hidden,
			project: elm$core$Maybe$Nothing
		},
		elm$core$Platform$Cmd$none);
};
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var author$project$Main$subscriptions = function (model) {
	return elm$core$Platform$Sub$none;
};
var elm$core$String$foldl = _String_foldl;
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$or = _Bitwise_or;
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var truqu$elm_base64$Base64$Encode$intToBase64 = function (i) {
	switch (i) {
		case 0:
			return 'A';
		case 1:
			return 'B';
		case 2:
			return 'C';
		case 3:
			return 'D';
		case 4:
			return 'E';
		case 5:
			return 'F';
		case 6:
			return 'G';
		case 7:
			return 'H';
		case 8:
			return 'I';
		case 9:
			return 'J';
		case 10:
			return 'K';
		case 11:
			return 'L';
		case 12:
			return 'M';
		case 13:
			return 'N';
		case 14:
			return 'O';
		case 15:
			return 'P';
		case 16:
			return 'Q';
		case 17:
			return 'R';
		case 18:
			return 'S';
		case 19:
			return 'T';
		case 20:
			return 'U';
		case 21:
			return 'V';
		case 22:
			return 'W';
		case 23:
			return 'X';
		case 24:
			return 'Y';
		case 25:
			return 'Z';
		case 26:
			return 'a';
		case 27:
			return 'b';
		case 28:
			return 'c';
		case 29:
			return 'd';
		case 30:
			return 'e';
		case 31:
			return 'f';
		case 32:
			return 'g';
		case 33:
			return 'h';
		case 34:
			return 'i';
		case 35:
			return 'j';
		case 36:
			return 'k';
		case 37:
			return 'l';
		case 38:
			return 'm';
		case 39:
			return 'n';
		case 40:
			return 'o';
		case 41:
			return 'p';
		case 42:
			return 'q';
		case 43:
			return 'r';
		case 44:
			return 's';
		case 45:
			return 't';
		case 46:
			return 'u';
		case 47:
			return 'v';
		case 48:
			return 'w';
		case 49:
			return 'x';
		case 50:
			return 'y';
		case 51:
			return 'z';
		case 52:
			return '0';
		case 53:
			return '1';
		case 54:
			return '2';
		case 55:
			return '3';
		case 56:
			return '4';
		case 57:
			return '5';
		case 58:
			return '6';
		case 59:
			return '7';
		case 60:
			return '8';
		case 61:
			return '9';
		case 62:
			return '+';
		default:
			return '/';
	}
};
var truqu$elm_base64$Base64$Encode$toBase64 = function (_int) {
	return _Utils_ap(
		truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 18)),
		_Utils_ap(
			truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 12)),
			_Utils_ap(
				truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 6)),
				truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 0)))));
};
var truqu$elm_base64$Base64$Encode$add = F2(
	function (_char, _n0) {
		var res = _n0.a;
		var count = _n0.b;
		var acc = _n0.c;
		var current = (acc << 8) | _char;
		if (count === 2) {
			return _Utils_Tuple3(
				_Utils_ap(
					res,
					truqu$elm_base64$Base64$Encode$toBase64(current)),
				0,
				0);
		} else {
			return _Utils_Tuple3(res, count + 1, current);
		}
	});
var truqu$elm_base64$Base64$Encode$chomp = F2(
	function (char_, acc) {
		var _char = elm$core$Char$toCode(char_);
		return (_char < 128) ? A2(truqu$elm_base64$Base64$Encode$add, _char, acc) : ((_char < 2048) ? A2(
			truqu$elm_base64$Base64$Encode$add,
			128 | (63 & _char),
			A2(truqu$elm_base64$Base64$Encode$add, 192 | (_char >>> 6), acc)) : (((_char < 55296) || ((_char >= 57344) && (_char <= 65535))) ? A2(
			truqu$elm_base64$Base64$Encode$add,
			128 | (63 & _char),
			A2(
				truqu$elm_base64$Base64$Encode$add,
				128 | (63 & (_char >>> 6)),
				A2(truqu$elm_base64$Base64$Encode$add, 224 | (_char >>> 12), acc))) : A2(
			truqu$elm_base64$Base64$Encode$add,
			128 | (63 & _char),
			A2(
				truqu$elm_base64$Base64$Encode$add,
				128 | (63 & (_char >>> 6)),
				A2(
					truqu$elm_base64$Base64$Encode$add,
					128 | (63 & (_char >>> 12)),
					A2(truqu$elm_base64$Base64$Encode$add, 240 | (_char >>> 18), acc))))));
	});
var truqu$elm_base64$Base64$Encode$initial = _Utils_Tuple3('', 0, 0);
var truqu$elm_base64$Base64$Encode$wrapUp = function (_n0) {
	var res = _n0.a;
	var cnt = _n0.b;
	var acc = _n0.c;
	switch (cnt) {
		case 1:
			return res + (truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc >>> 2)) + (truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc << 4)) + '=='));
		case 2:
			return res + (truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc >>> 10)) + (truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc >>> 4)) + (truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc << 2)) + '=')));
		default:
			return res;
	}
};
var truqu$elm_base64$Base64$Encode$encode = function (input) {
	return truqu$elm_base64$Base64$Encode$wrapUp(
		A3(elm$core$String$foldl, truqu$elm_base64$Base64$Encode$chomp, truqu$elm_base64$Base64$Encode$initial, input));
};
var truqu$elm_base64$Base64$encode = truqu$elm_base64$Base64$Encode$encode;
var author$project$Api$alwaysEncode = function (string) {
	return truqu$elm_base64$Base64$encode(string);
};
var elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var elm$http$Http$header = elm$http$Http$Header;
var author$project$Api$headersForAuth = function (auth) {
	if (auth.$ === 'Unauthenticated') {
		return A2(elm$http$Http$header, 'Authorization', '');
	} else {
		var username = auth.a;
		var password = auth.b;
		return A2(
			elm$http$Http$header,
			'Authorization',
			'Basic ' + author$project$Api$alwaysEncode(username + (':' + password)));
	}
};
var author$project$Api$iHateMoneyUrl = 'https://ihatemoney.org/api';
var author$project$Types$MemberAdded = function (a) {
	return {$: 'MemberAdded', a: a};
};
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === 'RBNode_elm_builtin') {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === 'RBNode_elm_builtin') {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === 'RBNode_elm_builtin') {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var elm$http$Http$Timeout_ = {$: 'Timeout_'};
var elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			elm$core$Basics$identity,
			A2(elm$core$Basics$composeR, toResult, toMsg));
	});
var elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var elm$http$Http$NetworkError = {$: 'NetworkError'};
var elm$http$Http$Timeout = {$: 'Timeout'};
var elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return elm$core$Result$Err(
					elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return elm$core$Result$Err(elm$http$Http$Timeout);
			case 'NetworkError_':
				return elm$core$Result$Err(elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return elm$core$Result$Err(
					elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					elm$core$Result$mapError,
					elm$http$Http$BadBody,
					toResult(body));
		}
	});
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			elm$http$Http$expectStringResponse,
			toMsg,
			elm$http$Http$resolve(
				function (string) {
					return A2(
						elm$core$Result$mapError,
						elm$json$Json$Decode$errorToString,
						A2(elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2(elm$json$Json$Encode$encode, 0, value));
};
var elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var elm$http$Http$init = elm$core$Task$succeed(
	A2(elm$http$Http$State, elm$core$Dict$empty, _List_Nil));
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Process$kill = _Scheduler_kill;
var elm$core$Process$spawn = _Scheduler_spawn;
var elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _n2 = A2(elm$core$Dict$get, tracker, reqs);
					if (_n2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _n2.a;
						return A2(
							elm$core$Task$andThen,
							function (_n3) {
								return A3(
									elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2(elm$core$Dict$remove, tracker, reqs));
							},
							elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						elm$core$Task$andThen,
						function (pid) {
							var _n4 = req.tracker;
							if (_n4.$ === 'Nothing') {
								return A3(elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _n4.a;
								return A3(
									elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3(elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			elm$core$Task$andThen,
			function (reqs) {
				return elm$core$Task$succeed(
					A2(elm$http$Http$State, reqs, subs));
			},
			A3(elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _n0) {
		var actualTracker = _n0.a;
		var toMsg = _n0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? elm$core$Maybe$Just(
			A2(
				elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : elm$core$Maybe$Nothing;
	});
var elm$http$Http$onSelfMsg = F3(
	function (router, _n0, state) {
		var tracker = _n0.a;
		var progress = _n0.b;
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$filterMap,
					A3(elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var elm$http$Http$subMap = F2(
	function (func, _n0) {
		var tracker = _n0.a;
		var toMsg = _n0.b;
		return A2(
			elm$http$Http$MySub,
			tracker,
			A2(elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager(elm$http$Http$init, elm$http$Http$onEffects, elm$http$Http$onSelfMsg, elm$http$Http$cmdMap, elm$http$Http$subMap);
var elm$http$Http$command = _Platform_leaf('Http');
var elm$http$Http$subscription = _Platform_leaf('Http');
var elm$http$Http$request = function (r) {
	return elm$http$Http$command(
		elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Api$addMemberToProject = F2(
	function (auth, name) {
		var projectID = function () {
			if (auth.$ === 'Basic') {
				var user = auth.a;
				return user;
			} else {
				return '';
			}
		}();
		return elm$http$Http$request(
			{
				body: elm$http$Http$jsonBody(
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'name',
								elm$json$Json$Encode$string(name))
							]))),
				expect: A2(elm$http$Http$expectJson, author$project$Types$MemberAdded, elm$json$Json$Decode$int),
				headers: _List_fromArray(
					[
						author$project$Api$headersForAuth(auth)
					]),
				method: 'POST',
				timeout: elm$core$Maybe$Nothing,
				tracker: elm$core$Maybe$Nothing,
				url: author$project$Api$iHateMoneyUrl + ('/projects/' + (projectID + '/members'))
			});
	});
var hecrj$elm_slug$Slug$Slug = function (a) {
	return {$: 'Slug', a: a};
};
var elm$core$String$map = _String_map;
var elm$core$String$toLower = _String_toLower;
var elm$core$String$words = _String_words;
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var hecrj$elm_slug$Slug$isAlphanumeric = function (c) {
	return ((_Utils_cmp(
		c,
		_Utils_chr('0')) > -1) && (_Utils_cmp(
		c,
		_Utils_chr('9')) < 1)) || ((_Utils_cmp(
		c,
		_Utils_chr('a')) > -1) && (_Utils_cmp(
		c,
		_Utils_chr('z')) < 1));
};
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm$regex$Regex$fromString = function (string) {
	return A2(
		elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var elm$regex$Regex$never = _Regex_never;
var hecrj$elm_slug$Slug$simpleQuoteRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('\''));
var hecrj$elm_slug$Slug$processWords = function () {
	var mapHelp = function (c) {
		return hecrj$elm_slug$Slug$isAlphanumeric(c) ? c : _Utils_chr(' ');
	};
	return A2(
		elm$core$Basics$composeR,
		A2(
			elm$regex$Regex$replace,
			hecrj$elm_slug$Slug$simpleQuoteRegex,
			function (_n0) {
				return '';
			}),
		A2(
			elm$core$Basics$composeR,
			elm$core$String$toLower,
			A2(
				elm$core$Basics$composeR,
				elm$core$String$map(mapHelp),
				elm$core$String$words)));
}();
var hecrj$elm_slug$Slug$generate = function (text) {
	var words = hecrj$elm_slug$Slug$processWords(text);
	return _Utils_eq(
		words,
		_List_fromArray(
			[''])) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(
		hecrj$elm_slug$Slug$Slug(
			A2(elm$core$String$join, '-', words)));
};
var hecrj$elm_slug$Slug$toString = function (_n0) {
	var s = _n0.a;
	return s;
};
var author$project$Api$encodeProject = F3(
	function (projectName, projectCode, projectEmail) {
		var slug = function () {
			var _n0 = hecrj$elm_slug$Slug$generate(projectName);
			if (_n0.$ === 'Just') {
				var s = _n0.a;
				return hecrj$elm_slug$Slug$toString(s);
			} else {
				return '';
			}
		}();
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'name',
					elm$json$Json$Encode$string(projectName)),
					_Utils_Tuple2(
					'id',
					elm$json$Json$Encode$string(slug)),
					_Utils_Tuple2(
					'password',
					elm$json$Json$Encode$string(projectCode)),
					_Utils_Tuple2(
					'contact_email',
					elm$json$Json$Encode$string(projectEmail))
				]));
	});
var author$project$Types$ProjectCreated = function (a) {
	return {$: 'ProjectCreated', a: a};
};
var elm$json$Json$Decode$string = _Json_decodeString;
var author$project$Api$createProject = F3(
	function (projectName, projectCode, projectEmail) {
		return elm$http$Http$request(
			{
				body: elm$http$Http$jsonBody(
					A3(author$project$Api$encodeProject, projectName, projectCode, projectEmail)),
				expect: A2(elm$http$Http$expectJson, author$project$Types$ProjectCreated, elm$json$Json$Decode$string),
				headers: _List_Nil,
				method: 'POST',
				timeout: elm$core$Maybe$Nothing,
				tracker: elm$core$Maybe$Nothing,
				url: author$project$Api$iHateMoneyUrl + '/projects'
			});
	});
var author$project$Types$Member = F5(
	function (id, name, weight, activated, balance) {
		return {activated: activated, balance: balance, id: id, name: name, weight: weight};
	});
var elm$json$Json$Decode$bool = _Json_decodeBool;
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$map5 = _Json_map5;
var elm$json$Json$Decode$succeed = _Json_succeed;
var author$project$Api$decodeMember = A6(
	elm$json$Json$Decode$map5,
	author$project$Types$Member,
	A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
	A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'weight', elm$json$Json$Decode$int),
	A2(elm$json$Json$Decode$field, 'activated', elm$json$Json$Decode$bool),
	elm$json$Json$Decode$succeed(0.0));
var author$project$Types$MemberEdited = function (a) {
	return {$: 'MemberEdited', a: a};
};
var elm$json$Json$Encode$int = _Json_wrap;
var author$project$Api$editProjectMember = F4(
	function (auth, member_id, name, weight) {
		var projectID = function () {
			if (auth.$ === 'Basic') {
				var user = auth.a;
				return user;
			} else {
				return '';
			}
		}();
		return elm$http$Http$request(
			{
				body: elm$http$Http$jsonBody(
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'name',
								elm$json$Json$Encode$string(name)),
								_Utils_Tuple2(
								'weight',
								elm$json$Json$Encode$int(weight))
							]))),
				expect: A2(elm$http$Http$expectJson, author$project$Types$MemberEdited, author$project$Api$decodeMember),
				headers: _List_fromArray(
					[
						author$project$Api$headersForAuth(auth)
					]),
				method: 'PUT',
				timeout: elm$core$Maybe$Nothing,
				tracker: elm$core$Maybe$Nothing,
				url: author$project$Api$iHateMoneyUrl + ('/projects/' + (projectID + ('/members/' + elm$core$String$fromInt(member_id))))
			});
	});
var author$project$Types$Project = F4(
	function (name, contact_email, members, bills) {
		return {bills: bills, contact_email: contact_email, members: members, name: name};
	});
var elm$json$Json$Decode$list = _Json_decodeList;
var elm$json$Json$Decode$map4 = _Json_map4;
var author$project$Api$decodeProjectInfo = A5(
	elm$json$Json$Decode$map4,
	author$project$Types$Project,
	A2(elm$json$Json$Decode$field, 'name', elm$json$Json$Decode$string),
	A2(elm$json$Json$Decode$field, 'contact_email', elm$json$Json$Decode$string),
	A2(
		elm$json$Json$Decode$field,
		'members',
		elm$json$Json$Decode$list(author$project$Api$decodeMember)),
	elm$json$Json$Decode$succeed(_List_Nil));
var author$project$Types$ProjectFetched = function (a) {
	return {$: 'ProjectFetched', a: a};
};
var elm$http$Http$emptyBody = _Http_emptyBody;
var author$project$Api$fetchProjectInfo = F2(
	function (auth, projectID) {
		return elm$http$Http$request(
			{
				body: elm$http$Http$emptyBody,
				expect: A2(elm$http$Http$expectJson, author$project$Types$ProjectFetched, author$project$Api$decodeProjectInfo),
				headers: _List_fromArray(
					[
						author$project$Api$headersForAuth(auth)
					]),
				method: 'GET',
				timeout: elm$core$Maybe$Nothing,
				tracker: elm$core$Maybe$Nothing,
				url: author$project$Api$iHateMoneyUrl + ('/projects/' + projectID)
			});
	});
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$List$sortBy = _List_sortBy;
var author$project$Main$setEditedProjectMember = F2(
	function (member, project) {
		var members = A2(
			elm$core$List$sortBy,
			function ($) {
				return $.name;
			},
			A2(
				elm$core$List$append,
				_List_fromArray(
					[member]),
				A2(
					elm$core$List$filter,
					function (m) {
						return !_Utils_eq(m.id, member.id);
					},
					project.members)));
		return _Utils_update(
			project,
			{members: members});
	});
var author$project$Main$setLoginPassword = F2(
	function (value, fields) {
		return _Utils_update(
			fields,
			{loginPassword: value});
	});
var author$project$Main$setLoginProjectID = F2(
	function (value, fields) {
		return _Utils_update(
			fields,
			{loginProjectID: value});
	});
var author$project$Main$setMemberToProject = F2(
	function (member, project) {
		return _Utils_update(
			project,
			{
				members: _Utils_ap(
					project.members,
					_List_fromArray(
						[member]))
			});
	});
var author$project$Main$setNewMemberName = F2(
	function (newMember, fields) {
		return _Utils_update(
			fields,
			{newMember: newMember});
	});
var author$project$Main$setNewMemberWeight = F2(
	function (newWeight, fields) {
		return _Utils_update(
			fields,
			{newMemberWeight: newWeight});
	});
var author$project$Main$setNewProjectEmail = F2(
	function (value, fields) {
		return _Utils_update(
			fields,
			{newProjectEmail: value});
	});
var author$project$Main$setNewProjectError = F2(
	function (value, fields) {
		return _Utils_update(
			fields,
			{
				newProjectError: elm$core$Maybe$Just(value)
			});
	});
var author$project$Main$setNewProjectName = F2(
	function (value, fields) {
		return _Utils_update(
			fields,
			{newProjectError: elm$core$Maybe$Nothing, newProjectName: value});
	});
var author$project$Main$setNewProjectPassword = F2(
	function (value, fields) {
		return _Utils_update(
			fields,
			{newProjectPassword: value});
	});
var author$project$Types$Basic = F2(
	function (a, b) {
		return {$: 'Basic', a: a, b: b};
	});
var elm$core$Debug$log = _Debug_log;
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$String$toInt = _String_toInt;
var author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'NewMemberName':
				var value = msg.a;
				var fields = A2(author$project$Main$setNewMemberName, value, model.fields);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{fields: fields}),
					elm$core$Platform$Cmd$none);
			case 'NewMemberWeight':
				var value = msg.a;
				var fields = A2(author$project$Main$setNewMemberWeight, value, model.fields);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{fields: fields}),
					elm$core$Platform$Cmd$none);
			case 'AddMember':
				var _n1 = model.project;
				if (_n1.$ === 'Just') {
					var project = _n1.a;
					return _Utils_Tuple2(
						model,
						A2(author$project$Api$addMemberToProject, model.auth, model.fields.newMember));
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'TriggerEditMember':
				var member_id = msg.a;
				var _n2 = model.project;
				if (_n2.$ === 'Just') {
					var project = _n2.a;
					return _Utils_Tuple2(
						model,
						A4(
							author$project$Api$editProjectMember,
							model.auth,
							member_id,
							model.fields.newMember,
							A2(
								elm$core$Maybe$withDefault,
								1,
								elm$core$String$toInt(model.fields.newMemberWeight))));
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'MemberAdded':
				if (msg.a.$ === 'Ok') {
					var id = msg.a.a;
					var _n3 = model.project;
					if (_n3.$ === 'Just') {
						var project = _n3.a;
						var member = A5(author$project$Types$Member, id, model.fields.newMember, 1, true, 0.0);
						var newProject = A2(author$project$Main$setMemberToProject, member, project);
						var fields = A2(author$project$Main$setNewMemberName, '', model.fields);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									fields: fields,
									project: elm$core$Maybe$Just(newProject)
								}),
							elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					}
				} else {
					var err = msg.a.a;
					var _n4 = A2(elm$core$Debug$log, 'Error while adding the member', err);
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'MemberEdited':
				if (msg.a.$ === 'Ok') {
					var member = msg.a.a;
					var _n5 = model.project;
					if (_n5.$ === 'Just') {
						var project = _n5.a;
						var newProject = A2(author$project$Main$setEditedProjectMember, member, project);
						var fields = A2(
							author$project$Main$setNewMemberWeight,
							'',
							A2(author$project$Main$setNewMemberName, '', model.fields));
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									fields: fields,
									modal: author$project$Types$Hidden,
									project: elm$core$Maybe$Just(newProject)
								}),
							elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{modal: author$project$Types$Hidden}),
							elm$core$Platform$Cmd$none);
					}
				} else {
					var err = msg.a.a;
					var _n6 = A2(elm$core$Debug$log, 'Error while adding the member', err);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{modal: author$project$Types$Hidden}),
						elm$core$Platform$Cmd$none);
				}
			case 'NewProjectName':
				var value = msg.a;
				var fields = A2(author$project$Main$setNewProjectName, value, model.fields);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{fields: fields}),
					elm$core$Platform$Cmd$none);
			case 'NewProjectPassword':
				var value = msg.a;
				var fields = A2(author$project$Main$setNewProjectPassword, value, model.fields);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{fields: fields}),
					elm$core$Platform$Cmd$none);
			case 'NewProjectEmail':
				var value = msg.a;
				var fields = A2(author$project$Main$setNewProjectEmail, value, model.fields);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{fields: fields}),
					elm$core$Platform$Cmd$none);
			case 'CreateProject':
				var projectID = model.fields.newProjectName;
				var slug = hecrj$elm_slug$Slug$generate(projectID);
				var password = model.fields.newProjectPassword;
				var email = model.fields.newProjectEmail;
				if (slug.$ === 'Just') {
					var fields = A2(
						author$project$Main$setNewProjectEmail,
						'',
						A2(
							author$project$Main$setNewProjectPassword,
							'',
							A2(author$project$Main$setNewProjectName, '', model.fields)));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								auth: A2(author$project$Types$Basic, projectID, password),
								fields: fields
							}),
						A3(author$project$Api$createProject, projectID, password, email));
				} else {
					var fields = A2(author$project$Main$setNewProjectError, 'Invalid project name: ' + projectID, model.fields);
					var _n8 = A2(elm$core$Debug$log, 'Invalid ProjectName', projectID);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{fields: fields}),
						elm$core$Platform$Cmd$none);
				}
			case 'ProjectCreated':
				if (msg.a.$ === 'Ok') {
					var projectID = msg.a.a;
					var password = function () {
						var _n9 = model.auth;
						if (_n9.$ === 'Basic') {
							var user = _n9.a;
							var pass = _n9.b;
							return pass;
						} else {
							return '';
						}
					}();
					var auth = A2(author$project$Types$Basic, projectID, password);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{auth: auth}),
						A2(author$project$Api$fetchProjectInfo, auth, projectID));
				} else {
					var err = msg.a.a;
					var _n10 = A2(elm$core$Debug$log, 'Error while creating the project', err);
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'LoginProjectID':
				var value = msg.a;
				var fields = A2(author$project$Main$setLoginProjectID, value, model.fields);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{fields: fields}),
					elm$core$Platform$Cmd$none);
			case 'LoginPassword':
				var value = msg.a;
				var fields = A2(author$project$Main$setLoginPassword, value, model.fields);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{fields: fields}),
					elm$core$Platform$Cmd$none);
			case 'Login':
				var projectID = model.fields.loginProjectID;
				var password = model.fields.loginPassword;
				var fields = A2(
					author$project$Main$setLoginPassword,
					'',
					A2(author$project$Main$setLoginProjectID, '', model.fields));
				var auth = A2(author$project$Types$Basic, projectID, password);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{auth: auth, fields: fields}),
					A2(author$project$Api$fetchProjectInfo, auth, projectID));
			case 'DemoLogin':
				var fields = A2(
					author$project$Main$setLoginPassword,
					'',
					A2(author$project$Main$setLoginProjectID, '', model.fields));
				var auth = A2(author$project$Types$Basic, 'demo', 'demo');
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{auth: auth, fields: fields}),
					A2(author$project$Api$fetchProjectInfo, auth, 'demo'));
			case 'LogoutUser':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{auth: author$project$Types$Unauthenticated}),
					elm$core$Platform$Cmd$none);
			case 'ProjectFetched':
				if (msg.a.$ === 'Ok') {
					var project = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								project: elm$core$Maybe$Just(project)
							}),
						elm$core$Platform$Cmd$none);
				} else {
					var err = msg.a.a;
					var _n11 = A2(elm$core$Debug$log, 'Error while loading the project', err);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{auth: author$project$Types$Unauthenticated}),
						elm$core$Platform$Cmd$none);
				}
			case 'ChangeLocale':
				var locale = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{locale: locale}),
					elm$core$Platform$Cmd$none);
			case 'EditModal':
				var modal_type = msg.a;
				var _n12 = model.project;
				if (_n12.$ === 'Just') {
					var project = _n12.a;
					if (modal_type.$ === 'MemberModal') {
						var member_id = modal_type.a;
						var getMember = elm$core$List$head(
							A2(
								elm$core$List$filter,
								function (m) {
									return _Utils_eq(m.id, member_id);
								},
								project.members));
						if (getMember.$ === 'Just') {
							var member = getMember.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										fields: A2(
											author$project$Main$setNewMemberWeight,
											elm$core$String$fromInt(member.weight),
											A2(author$project$Main$setNewMemberName, member.name, model.fields)),
										modal: modal_type
									}),
								elm$core$Platform$Cmd$none);
						} else {
							return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
						}
					} else {
						var fields = A2(
							author$project$Main$setNewMemberWeight,
							'',
							A2(author$project$Main$setNewMemberName, '', model.fields));
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{fields: fields, modal: modal_type}),
							elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			default:
				var id = msg.a;
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Types$AddNewBill = {$: 'AddNewBill'};
var author$project$Types$Invite = {$: 'Invite'};
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$div = _VirtualDom_node('div');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var author$project$BillBoard$billBoardHeader = function (t) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('identifier')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$a,
						_List_fromArray(
							[
								elm$html$Html$Attributes$href('#')
							]),
						_List_fromArray(
							[
								elm$html$Html$text(
								t(author$project$Types$Invite))
							]))
					])),
				A2(
				elm$html$Html$a,
				_List_fromArray(
					[
						elm$html$Html$Attributes$id('new-bill'),
						elm$html$Html$Attributes$href('#'),
						elm$html$Html$Attributes$class('btn btn-primary'),
						A2(elm$html$Html$Attributes$attribute, 'data-toggle', 'modal'),
						A2(elm$html$Html$Attributes$attribute, 'data-target', '#bill-form')
					]),
				_List_fromArray(
					[
						elm$html$Html$text(
						t(author$project$Types$AddNewBill))
					]))
			]));
};
var author$project$Types$Delete = {$: 'Delete'};
var author$project$Types$Each = function (a) {
	return {$: 'Each', a: a};
};
var author$project$Types$Edit = {$: 'Edit'};
var elm$core$List$sort = function (xs) {
	return A2(elm$core$List$sortBy, elm$core$Basics$identity, xs);
};
var elm$html$Html$td = _VirtualDom_node('td');
var elm$html$Html$tr = _VirtualDom_node('tr');
var elm$html$Html$Attributes$title = elm$html$Html$Attributes$stringProperty('title');
var elm$core$Basics$not = _Basics_not;
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var elm$core$Basics$isInfinite = _Basics_isInfinite;
var elm$core$Basics$isNaN = _Basics_isNaN;
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$String$fromFloat = _String_fromNumber;
var elm$core$String$length = _String_length;
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3(elm$core$String$repeatHelp, n, chunk, '');
	});
var elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)));
	});
var elm$core$String$reverse = _String_reverse;
var elm$core$String$slice = _String_slice;
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			elm$core$List$any,
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr('0'))) && (!_Utils_eq(
					c,
					_Utils_chr('.')));
			},
			elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var elm$core$Char$fromCode = _Char_fromCode;
var myrho$elm_round$Round$increaseNum = function (_n0) {
	var head = _n0.a;
	var tail = _n0.b;
	if (_Utils_eq(
		head,
		_Utils_chr('9'))) {
		var _n1 = elm$core$String$uncons(tail);
		if (_n1.$ === 'Nothing') {
			return '01';
		} else {
			var headtail = _n1.a;
			return A2(
				elm$core$String$cons,
				_Utils_chr('0'),
				myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			elm$core$String$cons,
			elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var myrho$elm_round$Round$splitComma = function (str) {
	var _n0 = A2(elm$core$String$split, '.', str);
	if (_n0.b) {
		if (_n0.b.b) {
			var before = _n0.a;
			var _n1 = _n0.b;
			var after = _n1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _n0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var myrho$elm_round$Round$toDecimal = function (fl) {
	var _n0 = A2(
		elm$core$String$split,
		'e',
		elm$core$String$fromFloat(
			elm$core$Basics$abs(fl)));
	if (_n0.b) {
		if (_n0.b.b) {
			var num = _n0.a;
			var _n1 = _n0.b;
			var exp = _n1.a;
			var e = A2(
				elm$core$Maybe$withDefault,
				0,
				elm$core$String$toInt(
					A2(elm$core$String$startsWith, '+', exp) ? A2(elm$core$String$dropLeft, 1, exp) : exp));
			var _n2 = myrho$elm_round$Round$splitComma(num);
			var before = _n2.a;
			var after = _n2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				elm$core$Maybe$withDefault,
				'0',
				A2(
					elm$core$Maybe$map,
					function (_n3) {
						var a = _n3.a;
						var b = _n3.b;
						return a + ('.' + b);
					},
					A2(
						elm$core$Maybe$map,
						elm$core$Tuple$mapFirst(elm$core$String$fromChar),
						elm$core$String$uncons(
							_Utils_ap(
								A2(
									elm$core$String$repeat,
									elm$core$Basics$abs(e),
									'0'),
								total))))) : A3(
				elm$core$String$padRight,
				e + 1,
				_Utils_chr('0'),
				total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _n0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if (elm$core$Basics$isInfinite(fl) || elm$core$Basics$isNaN(fl)) {
			return elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _n0 = myrho$elm_round$Round$splitComma(
				myrho$elm_round$Round$toDecimal(
					elm$core$Basics$abs(fl)));
			var before = _n0.a;
			var after = _n0.b;
			var r = elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2(elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					elm$core$String$padRight,
					r,
					_Utils_chr('0'),
					_Utils_ap(before, after)));
			var totalLen = elm$core$String$length(normalized);
			var roundDigitIndex = A2(elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3(elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3(elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? elm$core$String$reverse(
				A2(
					elm$core$Maybe$withDefault,
					'1',
					A2(
						elm$core$Maybe$map,
						myrho$elm_round$Round$increaseNum,
						elm$core$String$uncons(
							elm$core$String$reverse(remains))))) : remains;
			var numLen = elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					elm$core$String$repeat,
					elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				elm$core$String$length(after)) < 0) ? (A3(elm$core$String$slice, 0, numLen - s, num) + ('.' + A3(elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3(
					elm$core$String$padRight,
					s,
					_Utils_chr('0'),
					after))));
			return A2(myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var myrho$elm_round$Round$round = myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _n0 = elm$core$String$uncons(str);
			if (_n0.$ === 'Nothing') {
				return false;
			} else {
				if ('5' === _n0.a.a.valueOf()) {
					if (_n0.a.b === '') {
						var _n1 = _n0.a;
						return !signed;
					} else {
						var _n2 = _n0.a;
						return true;
					}
				} else {
					var _n3 = _n0.a;
					var _int = _n3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						elm$core$Char$toCode(_int));
				}
			}
		}));
var author$project$BillBoard$billInfoView = F2(
	function (t, bill) {
		return A2(
			elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(bill.date)
						])),
					A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(bill.payer)
						])),
					A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(bill.label)
						])),
					A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(
							A2(
								elm$core$String$join,
								', ',
								elm$core$List$sort(bill.owers)))
						])),
					A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							function () {
							var numberOfPeople = elm$core$List$length(bill.owers);
							var amountEach = A2(myrho$elm_round$Round$round, 2, bill.amount / numberOfPeople);
							var amount = A2(myrho$elm_round$Round$round, 2, bill.amount);
							return elm$html$Html$text(
								_Utils_ap(
									amount,
									t(
										author$project$Types$Each(amountEach))));
						}()
						])),
					A2(
					elm$html$Html$td,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('bill-actions')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('edit'),
									elm$html$Html$Attributes$href('#'),
									elm$html$Html$Attributes$title(
									t(author$project$Types$Edit))
								]),
							_List_fromArray(
								[
									elm$html$Html$text(
									t(author$project$Types$Edit))
								])),
							A2(
							elm$html$Html$a,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('delete'),
									elm$html$Html$Attributes$href('#'),
									elm$html$Html$Attributes$title(
									t(author$project$Types$Delete))
								]),
							_List_fromArray(
								[
									elm$html$Html$text(
									t(author$project$Types$Delete))
								]))
						]))
				]));
	});
var author$project$Types$Actions = {$: 'Actions'};
var author$project$Types$ForWhat = {$: 'ForWhat'};
var author$project$Types$ForWhom = {$: 'ForWhom'};
var author$project$Types$HowMuch = {$: 'HowMuch'};
var author$project$Types$When = {$: 'When'};
var author$project$Types$WhoPaid = {$: 'WhoPaid'};
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$html$Html$table = _VirtualDom_node('table');
var elm$html$Html$tbody = _VirtualDom_node('tbody');
var elm$html$Html$th = _VirtualDom_node('th');
var elm$html$Html$thead = _VirtualDom_node('thead');
var author$project$BillBoard$billBoardTable = F2(
	function (t, bills) {
		return A2(
			elm$html$Html$table,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id('bill_table'),
					elm$html$Html$Attributes$class('col table table-striped table-hover')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$thead,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$tr,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$th,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(
											t(author$project$Types$When))
										])),
									A2(
									elm$html$Html$th,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(
											t(author$project$Types$WhoPaid))
										])),
									A2(
									elm$html$Html$th,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(
											t(author$project$Types$ForWhat))
										])),
									A2(
									elm$html$Html$th,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(
											t(author$project$Types$ForWhom))
										])),
									A2(
									elm$html$Html$th,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(
											t(author$project$Types$HowMuch))
										])),
									A2(
									elm$html$Html$th,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(
											t(author$project$Types$Actions))
										]))
								]))
						])),
					A2(
					elm$html$Html$tbody,
					_List_Nil,
					A2(
						elm$core$List$map,
						author$project$BillBoard$billInfoView(t),
						bills))
				]));
	});
var author$project$BillBoard$billBoardView = F2(
	function (t, bills) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('offset-md-3 col-xs-12 col-md-9')
				]),
			_List_fromArray(
				[
					author$project$BillBoard$billBoardHeader(t),
					A2(author$project$BillBoard$billBoardTable, t, bills)
				]));
	});
var author$project$Types$FreeSoftware = {$: 'FreeSoftware'};
var author$project$Types$YouCanContribute = {$: 'YouCanContribute'};
var elm$html$Html$footer = _VirtualDom_node('footer');
var elm$html$Html$p = _VirtualDom_node('p');
var author$project$Footer$footerView = function (t) {
	return A2(
		elm$html$Html$footer,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$a,
						_List_fromArray(
							[
								elm$html$Html$Attributes$href('https://github.com/spiral-project/elm-ihatemoney')
							]),
						_List_fromArray(
							[
								elm$html$Html$text(
								t(author$project$Types$FreeSoftware))
							])),
						elm$html$Html$text(
						t(author$project$Types$YouCanContribute))
					]))
			]));
};
var author$project$Locales$EN$getString = function (id) {
	switch (id.$) {
		case 'AppTitle':
			if (id.a.$ === 'Just') {
				var projectName = id.a.a;
				return 'Account Manager - ' + projectName;
			} else {
				var _n1 = id.a;
				return 'Account Manager';
			}
		case 'Bills':
			return 'Bills';
		case 'Settle':
			return 'Settle';
		case 'Statistics':
			return 'Statistics';
		case 'Options':
			return 'options';
		case 'ProjectSettings':
			return 'Project settings';
		case 'StartNewProject':
			return 'Start a new project';
		case 'Logout':
			return 'Logout';
		case 'TypeUserName':
			return 'Type user name here';
		case 'Add':
			return 'Add';
		case 'Deactivate':
			return 'deactivate';
		case 'Edit':
			return 'edit';
		case 'EditMember':
			return 'Edit this member';
		case 'Delete':
			return 'delete';
		case 'Invite':
			return 'Invite people to join this project!';
		case 'AddNewBill':
			return 'Add a new bill';
		case 'When':
			return 'When?';
		case 'WhoPaid':
			return 'Who paid?';
		case 'ForWhat':
			return 'For what?';
		case 'ForWhom':
			return 'For whom?';
		case 'HowMuch':
			return 'How much?';
		case 'Actions':
			return 'Actions';
		case 'Each':
			var amountEach = id.a;
			return ' (' + (amountEach + ' each)');
		case 'FreeSoftware':
			return 'This is a Free software';
		case 'YouCanContribute':
			return ', you can contribute and improve it!';
		case 'ManageYourExpenses':
			return 'Manage your shared';
		case 'EasilyShared':
			return 'expenses, easily';
		case 'TryDemo':
			return 'Try out the demo';
		case 'SharingHouse':
			return 'You\'re sharing a house?';
		case 'GoingOnHoliday':
			return 'Going on holidays with friends?';
		case 'SimplySharingMoney':
			return 'Simply sharing money with others?';
		case 'WeCanHelp':
			return 'We can help!';
		case 'LogToExistingProject':
			return 'Log to an existing project…';
		case 'ProjectID':
			return 'Project identifier';
		case 'PrivateCode':
			return 'Private code';
		case 'LogIn':
			return 'Log in';
		case 'CantRememberPassword':
			return 'Can\'t remember your password?';
		case 'CreateNewProject':
			return '…or create a new one';
		case 'ProjectName':
			return 'Project name';
		case 'Email':
			return 'Email';
		case 'LetsGetStarted':
			return 'Let\'s get started';
		case 'Name':
			return 'Name';
		case 'Weight':
			return 'Weight';
		default:
			return 'Cancel';
	}
};
var author$project$Locales$FR$getString = function (id) {
	switch (id.$) {
		case 'AppTitle':
			if (id.a.$ === 'Just') {
				var projectName = id.a.a;
				return 'Gestion de compte - ' + projectName;
			} else {
				var _n1 = id.a;
				return 'Gestion de compte';
			}
		case 'Bills':
			return 'Factures';
		case 'Settle':
			return 'Remboursements';
		case 'Statistics':
			return 'Statistiques';
		case 'Options':
			return 'options';
		case 'ProjectSettings':
			return 'Options du projet';
		case 'StartNewProject':
			return 'Nouveau projet';
		case 'Logout':
			return 'Se déconnecter';
		case 'TypeUserName':
			return 'Nouveau Participant';
		case 'Add':
			return 'Ajouter';
		case 'Deactivate':
			return 'désactiver';
		case 'Edit':
			return 'éditer';
		case 'EditMember':
			return 'Éditer le membre';
		case 'Delete':
			return 'supprimer';
		case 'Invite':
			return 'Invitez d’autres personnes à rejoindre ce projet !';
		case 'AddNewBill':
			return 'Nouvelle facture';
		case 'When':
			return 'Quand ?';
		case 'WhoPaid':
			return 'Qui a payé ?';
		case 'ForWhat':
			return 'Pour quoi ?';
		case 'ForWhom':
			return 'Pour qui ?';
		case 'HowMuch':
			return 'Combien ?';
		case 'Actions':
			return 'Actions';
		case 'Each':
			var amountEach = id.a;
			return ' (' + (amountEach + ' chacun)');
		case 'FreeSoftware':
			return 'Ceci est un logiciel libre';
		case 'YouCanContribute':
			return ', vous pouvez y contribuer et l\'améliorer !';
		case 'ManageYourExpenses':
			return 'Gérez vos dépenses';
		case 'EasilyShared':
			return 'partagées, facilement';
		case 'TryDemo':
			return 'Essayez la démo';
		case 'SharingHouse':
			return 'Vous êtes en colocation ?';
		case 'GoingOnHoliday':
			return 'Partez en vacances avec des amis ?';
		case 'SimplySharingMoney':
			return 'Ça vous arrive de partager de l’argent avec d’autres ?';
		case 'WeCanHelp':
			return 'On peut vous aider !';
		case 'LogToExistingProject':
			return 'Se connecter à un projet existant…';
		case 'ProjectID':
			return 'Identifiant du projet';
		case 'PrivateCode':
			return 'Code d’accès';
		case 'LogIn':
			return 'Se connecter';
		case 'CantRememberPassword':
			return 'Vous ne vous souvenez plus du code d’accès ?';
		case 'CreateNewProject':
			return '…ou créez en un nouveau';
		case 'ProjectName':
			return 'Nom de projet';
		case 'Email':
			return 'E-mail';
		case 'LetsGetStarted':
			return 'C’est parti !';
		case 'Name':
			return 'Nom';
		case 'Weight':
			return 'Parts';
		default:
			return 'Annuler';
	}
};
var author$project$Locales$getString = F2(
	function (locale, id) {
		if (locale.$ === 'EN') {
			return author$project$Locales$EN$getString(id);
		} else {
			return author$project$Locales$FR$getString(id);
		}
	});
var author$project$Types$CantRememberPassword = {$: 'CantRememberPassword'};
var author$project$Types$CreateNewProject = {$: 'CreateNewProject'};
var author$project$Types$CreateProject = {$: 'CreateProject'};
var author$project$Types$DemoLogin = {$: 'DemoLogin'};
var author$project$Types$EasilyShared = {$: 'EasilyShared'};
var author$project$Types$Email = {$: 'Email'};
var author$project$Types$GoingOnHoliday = {$: 'GoingOnHoliday'};
var author$project$Types$LetsGetStarted = {$: 'LetsGetStarted'};
var author$project$Types$LogIn = {$: 'LogIn'};
var author$project$Types$LogToExistingProject = {$: 'LogToExistingProject'};
var author$project$Types$Login = {$: 'Login'};
var author$project$Types$LoginPassword = function (a) {
	return {$: 'LoginPassword', a: a};
};
var author$project$Types$LoginProjectID = function (a) {
	return {$: 'LoginProjectID', a: a};
};
var author$project$Types$ManageYourExpenses = {$: 'ManageYourExpenses'};
var author$project$Types$NewProjectEmail = function (a) {
	return {$: 'NewProjectEmail', a: a};
};
var author$project$Types$NewProjectName = function (a) {
	return {$: 'NewProjectName', a: a};
};
var author$project$Types$NewProjectPassword = function (a) {
	return {$: 'NewProjectPassword', a: a};
};
var author$project$Types$PrivateCode = {$: 'PrivateCode'};
var author$project$Types$ProjectID = {$: 'ProjectID'};
var author$project$Types$ProjectName = {$: 'ProjectName'};
var author$project$Types$SharingHouse = {$: 'SharingHouse'};
var author$project$Types$SimplySharingMoney = {$: 'SimplySharingMoney'};
var author$project$Types$TryDemo = {$: 'TryDemo'};
var author$project$Types$WeCanHelp = {$: 'WeCanHelp'};
var elm$html$Html$br = _VirtualDom_node('br');
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$fieldset = _VirtualDom_node('fieldset');
var elm$html$Html$form = _VirtualDom_node('form');
var elm$html$Html$h2 = _VirtualDom_node('h2');
var elm$html$Html$header = _VirtualDom_node('header');
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$label = _VirtualDom_node('label');
var elm$html$Html$legend = _VirtualDom_node('legend');
var elm$html$Html$strong = _VirtualDom_node('strong');
var elm$html$Html$Attributes$for = elm$html$Html$Attributes$stringProperty('htmlFor');
var elm$html$Html$Attributes$name = elm$html$Html$Attributes$stringProperty('name');
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$required = elm$html$Html$Attributes$boolProperty('required');
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var elm$html$Html$Events$alwaysPreventDefault = function (msg) {
	return _Utils_Tuple2(msg, true);
};
var elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var elm$html$Html$Events$onSubmit = function (msg) {
	return A2(
		elm$html$Html$Events$preventDefaultOn,
		'submit',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysPreventDefault,
			elm$json$Json$Decode$succeed(msg)));
};
var author$project$Login$loginView = F3(
	function (t, selectedLocale, fields) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('container-fluid')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$header,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('header'),
							elm$html$Html$Attributes$class('row')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('col-xs-12 col-sm-5 offset-md-2')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$h2,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(
											t(author$project$Types$ManageYourExpenses)),
											A2(elm$html$Html$br, _List_Nil, _List_Nil),
											elm$html$Html$text(
											t(author$project$Types$EasilyShared))
										])),
									A2(
									elm$html$Html$a,
									_List_fromArray(
										[
											elm$html$Html$Attributes$href('#'),
											elm$html$Html$Events$onClick(author$project$Types$DemoLogin),
											elm$html$Html$Attributes$class('tryout btn')
										]),
									_List_fromArray(
										[
											elm$html$Html$text(
											t(author$project$Types$TryDemo))
										]))
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('col-xs-12 col-sm-4')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$p,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('additional-content')
										]),
									_List_fromArray(
										[
											elm$html$Html$text(
											t(author$project$Types$SharingHouse)),
											A2(elm$html$Html$br, _List_Nil, _List_Nil),
											elm$html$Html$text(
											t(author$project$Types$GoingOnHoliday)),
											A2(elm$html$Html$br, _List_Nil, _List_Nil),
											elm$html$Html$text(
											t(author$project$Types$SimplySharingMoney)),
											A2(elm$html$Html$br, _List_Nil, _List_Nil),
											A2(
											elm$html$Html$strong,
											_List_Nil,
											_List_fromArray(
												[
													elm$html$Html$text(
													t(author$project$Types$WeCanHelp))
												]))
										]))
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('row home')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('col-xs-12 col-sm-5 col-md-4 offset-md-2')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$form,
									_List_fromArray(
										[
											elm$html$Html$Attributes$id('authentication-form'),
											elm$html$Html$Attributes$class('form-horizontal'),
											elm$html$Html$Events$onSubmit(author$project$Types$Login)
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$fieldset,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('form-group')
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$legend,
													_List_Nil,
													_List_fromArray(
														[
															elm$html$Html$text(
															t(author$project$Types$LogToExistingProject))
														])),
													A2(
													elm$html$Html$div,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('form-group')
														]),
													_List_fromArray(
														[
															A2(
															elm$html$Html$label,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$for('id')
																]),
															_List_fromArray(
																[
																	elm$html$Html$text(
																	t(author$project$Types$ProjectID))
																])),
															A2(
															elm$html$Html$div,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$class('controls')
																]),
															_List_fromArray(
																[
																	A2(
																	elm$html$Html$input,
																	_List_fromArray(
																		[
																			elm$html$Html$Attributes$class('form-control'),
																			elm$html$Html$Attributes$id('id'),
																			elm$html$Html$Attributes$name('id'),
																			elm$html$Html$Attributes$required(true),
																			elm$html$Html$Attributes$type_('text'),
																			elm$html$Html$Events$onInput(author$project$Types$LoginProjectID),
																			elm$html$Html$Attributes$value(fields.loginProjectID)
																		]),
																	_List_Nil)
																]))
														])),
													A2(
													elm$html$Html$div,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('form-group')
														]),
													_List_fromArray(
														[
															A2(
															elm$html$Html$label,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$for('password')
																]),
															_List_fromArray(
																[
																	elm$html$Html$text(
																	t(author$project$Types$PrivateCode))
																])),
															A2(
															elm$html$Html$div,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$class('controls')
																]),
															_List_fromArray(
																[
																	A2(
																	elm$html$Html$input,
																	_List_fromArray(
																		[
																			elm$html$Html$Attributes$class('form-control'),
																			elm$html$Html$Attributes$id('password'),
																			elm$html$Html$Attributes$name('password'),
																			elm$html$Html$Attributes$required(true),
																			elm$html$Html$Attributes$type_('password'),
																			elm$html$Html$Events$onInput(author$project$Types$LoginPassword),
																			elm$html$Html$Attributes$value(fields.loginPassword)
																		]),
																	_List_Nil)
																]))
														]))
												])),
											A2(
											elm$html$Html$div,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('controls')
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$button,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('btn'),
															elm$html$Html$Attributes$type_('submit')
														]),
													_List_fromArray(
														[
															elm$html$Html$text(
															t(author$project$Types$LogIn))
														])),
													A2(
													elm$html$Html$a,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('password-reminder'),
															elm$html$Html$Attributes$href('#')
														]),
													_List_fromArray(
														[
															elm$html$Html$text(
															t(author$project$Types$CantRememberPassword))
														]))
												]))
										]))
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('col-xs-12 col-sm-5 col-md-3 offset-sm-1')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$form,
									_List_fromArray(
										[
											elm$html$Html$Attributes$id('creation-form'),
											elm$html$Html$Attributes$class('form-horizontal'),
											elm$html$Html$Events$onSubmit(author$project$Types$CreateProject)
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$fieldset,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('form-group')
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$legend,
													_List_Nil,
													_List_fromArray(
														[
															elm$html$Html$text(
															t(author$project$Types$CreateNewProject))
														])),
													A2(
													elm$html$Html$div,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('form-group')
														]),
													_List_fromArray(
														[
															A2(
															elm$html$Html$label,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$for('name')
																]),
															_List_fromArray(
																[
																	elm$html$Html$text(
																	t(author$project$Types$ProjectName))
																])),
															A2(
															elm$html$Html$div,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$class('controls')
																]),
															_List_fromArray(
																[
																	A2(
																	elm$html$Html$input,
																	_List_fromArray(
																		[
																			elm$html$Html$Attributes$class('form-control'),
																			elm$html$Html$Attributes$id('name'),
																			elm$html$Html$Attributes$name('name'),
																			elm$html$Html$Attributes$required(true),
																			elm$html$Html$Attributes$type_('text'),
																			elm$html$Html$Events$onInput(author$project$Types$NewProjectName),
																			elm$html$Html$Attributes$value(fields.newProjectName)
																		]),
																	_List_Nil)
																]))
														])),
													A2(
													elm$html$Html$div,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('form-group')
														]),
													_List_fromArray(
														[
															A2(
															elm$html$Html$label,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$for('password')
																]),
															_List_fromArray(
																[
																	elm$html$Html$text(
																	t(author$project$Types$PrivateCode))
																])),
															A2(
															elm$html$Html$div,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$class('controls')
																]),
															_List_fromArray(
																[
																	A2(
																	elm$html$Html$input,
																	_List_fromArray(
																		[
																			elm$html$Html$Attributes$class('form-control'),
																			elm$html$Html$Attributes$id('password'),
																			elm$html$Html$Attributes$name('password'),
																			elm$html$Html$Attributes$required(true),
																			elm$html$Html$Attributes$type_('password'),
																			elm$html$Html$Events$onInput(author$project$Types$NewProjectPassword),
																			elm$html$Html$Attributes$value(fields.newProjectPassword)
																		]),
																	_List_Nil)
																]))
														])),
													A2(
													elm$html$Html$div,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('form-group')
														]),
													_List_fromArray(
														[
															A2(
															elm$html$Html$label,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$for('contact_email')
																]),
															_List_fromArray(
																[
																	elm$html$Html$text(
																	t(author$project$Types$Email))
																])),
															A2(
															elm$html$Html$div,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$class('controls')
																]),
															_List_fromArray(
																[
																	A2(
																	elm$html$Html$input,
																	_List_fromArray(
																		[
																			elm$html$Html$Attributes$class('form-control'),
																			elm$html$Html$Attributes$id('contact_email'),
																			elm$html$Html$Attributes$name('contact_email'),
																			elm$html$Html$Attributes$required(true),
																			elm$html$Html$Attributes$type_('text'),
																			elm$html$Html$Events$onInput(author$project$Types$NewProjectEmail),
																			elm$html$Html$Attributes$value(fields.newProjectEmail)
																		]),
																	_List_Nil)
																]))
														]))
												])),
											function () {
											var _n0 = fields.newProjectError;
											if (_n0.$ === 'Just') {
												var err = _n0.a;
												return A2(
													elm$html$Html$div,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('errors')
														]),
													_List_fromArray(
														[
															elm$html$Html$text(err)
														]));
											} else {
												return A2(
													elm$html$Html$div,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('controls')
														]),
													_List_fromArray(
														[
															A2(
															elm$html$Html$button,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$class('btn'),
																	elm$html$Html$Attributes$type_('submit')
																]),
															_List_fromArray(
																[
																	elm$html$Html$text(
																	t(author$project$Types$LetsGetStarted))
																]))
														]));
											}
										}()
										]))
								]))
						]))
				]));
	});
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$toUpper = _String_toUpper;
var author$project$Capitalize$toCapital = function (str) {
	return _Utils_ap(
		elm$core$String$toUpper(
			A2(elm$core$String$left, 1, str)),
		A2(elm$core$String$dropLeft, 1, str));
};
var author$project$Types$EditModal = function (a) {
	return {$: 'EditModal', a: a};
};
var elm$html$Html$h3 = _VirtualDom_node('h3');
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var author$project$Modal$modalView = F5(
	function (title, submitTitle, cancelTitle, msg, form) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('modal fade show'),
					A2(elm$html$Html$Attributes$attribute, 'role', 'dialog'),
					A2(elm$html$Html$Attributes$style, 'display', 'block')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('modal-dialog'),
							A2(elm$html$Html$Attributes$attribute, 'role', 'document')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('modal-content')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('modal-header')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$h3,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('modal-title')
												]),
											_List_fromArray(
												[
													elm$html$Html$text(title)
												])),
											A2(
											elm$html$Html$a,
											_List_fromArray(
												[
													elm$html$Html$Attributes$href('#'),
													elm$html$Html$Attributes$class('close'),
													elm$html$Html$Events$onClick(
													author$project$Types$EditModal(author$project$Types$Hidden))
												]),
											_List_fromArray(
												[
													elm$html$Html$text('×')
												]))
										])),
									A2(
									elm$html$Html$form,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('modal-body container'),
											elm$html$Html$Events$onSubmit(msg)
										]),
									_List_fromArray(
										[
											form,
											A2(
											elm$html$Html$div,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('actions')
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$input,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('btn btn-primary'),
															elm$html$Html$Attributes$type_('submit'),
															elm$html$Html$Attributes$value(submitTitle)
														]),
													_List_Nil),
													A2(
													elm$html$Html$input,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('btn'),
															elm$html$Html$Attributes$type_('button'),
															elm$html$Html$Events$onClick(
															author$project$Types$EditModal(author$project$Types$Hidden)),
															elm$html$Html$Attributes$value(cancelTitle)
														]),
													_List_Nil)
												]))
										]))
								]))
						]))
				]));
	});
var author$project$Types$Cancel = {$: 'Cancel'};
var author$project$Types$EditMember = {$: 'EditMember'};
var author$project$Types$Name = {$: 'Name'};
var author$project$Types$NewMemberName = function (a) {
	return {$: 'NewMemberName', a: a};
};
var author$project$Types$NewMemberWeight = function (a) {
	return {$: 'NewMemberWeight', a: a};
};
var author$project$Types$TriggerEditMember = function (a) {
	return {$: 'TriggerEditMember', a: a};
};
var author$project$Types$Weight = {$: 'Weight'};
var elm$html$Html$Attributes$min = elm$html$Html$Attributes$stringProperty('min');
var elm$html$Html$Attributes$step = function (n) {
	return A2(elm$html$Html$Attributes$stringProperty, 'step', n);
};
var author$project$Modal$handleModal = F3(
	function (t, model, project) {
		var _n0 = model.modal;
		if (_n0.$ === 'MemberModal') {
			var member_id = _n0.a;
			var getMember = elm$core$List$head(
				A2(
					elm$core$List$filter,
					function (m) {
						return _Utils_eq(m.id, member_id);
					},
					project.members));
			if (getMember.$ === 'Just') {
				var member = getMember.a;
				return A5(
					author$project$Modal$modalView,
					t(author$project$Types$EditMember),
					author$project$Capitalize$toCapital(
						t(author$project$Types$Edit)),
					t(author$project$Types$Cancel),
					author$project$Types$TriggerEditMember(member_id),
					A2(
						elm$html$Html$fieldset,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('form-group row')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$label,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('col-3'),
												elm$html$Html$Attributes$for('name')
											]),
										_List_fromArray(
											[
												elm$html$Html$text(
												t(author$project$Types$Name))
											])),
										A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('controls col-9')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$input,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('form-control'),
														elm$html$Html$Attributes$id('name'),
														elm$html$Html$Attributes$type_('text'),
														elm$html$Html$Attributes$value(model.fields.newMember),
														elm$html$Html$Events$onInput(author$project$Types$NewMemberName)
													]),
												_List_Nil)
											]))
									])),
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('form-group row')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$label,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('col-3'),
												elm$html$Html$Attributes$for('weight')
											]),
										_List_fromArray(
											[
												elm$html$Html$text(
												t(author$project$Types$Weight))
											])),
										A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('controls col-9')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$input,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('form-control'),
														elm$html$Html$Attributes$id('weight'),
														elm$html$Html$Attributes$type_('number'),
														elm$html$Html$Events$onInput(author$project$Types$NewMemberWeight),
														elm$html$Html$Attributes$min('0'),
														elm$html$Html$Attributes$step('1'),
														elm$html$Html$Attributes$value(model.fields.newMemberWeight)
													]),
												_List_Nil)
											]))
									]))
							])));
			} else {
				return A2(elm$html$Html$div, _List_Nil, _List_Nil);
			}
		} else {
			return A2(elm$html$Html$div, _List_Nil, _List_Nil);
		}
	});
var author$project$Types$Bills = {$: 'Bills'};
var author$project$Types$ChangeLocale = function (a) {
	return {$: 'ChangeLocale', a: a};
};
var author$project$Types$FR = {$: 'FR'};
var author$project$Types$Logout = {$: 'Logout'};
var author$project$Types$LogoutUser = {$: 'LogoutUser'};
var author$project$Types$Options = {$: 'Options'};
var author$project$Types$ProjectSettings = {$: 'ProjectSettings'};
var author$project$Types$Settle = {$: 'Settle'};
var author$project$Types$StartNewProject = {$: 'StartNewProject'};
var author$project$Types$Statistics = {$: 'Statistics'};
var elm$html$Html$h1 = _VirtualDom_node('h1');
var elm$html$Html$li = _VirtualDom_node('li');
var elm$html$Html$nav = _VirtualDom_node('nav');
var elm$html$Html$span = _VirtualDom_node('span');
var elm$html$Html$ul = _VirtualDom_node('ul');
var author$project$NavBar$navBarView = F3(
	function (t, project, selectedLocale) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('container')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$nav,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('navbar navbar-toggleable-sm fixed-top navbar-inverse bg-inverse')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$button,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('navbar-toggler'),
									elm$html$Html$Attributes$type_('button'),
									A2(elm$html$Html$Attributes$attribute, 'data-toggle', 'collapse'),
									A2(elm$html$Html$Attributes$attribute, 'data-target', '#navbarToggler'),
									A2(elm$html$Html$Attributes$attribute, 'aria-controls', 'navbarToggler'),
									A2(elm$html$Html$Attributes$attribute, 'aria-expanded', 'false'),
									A2(elm$html$Html$Attributes$attribute, 'aria-label', 'Toggle navigation')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('navbar-toggler-icon')
										]),
									_List_Nil)
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('collapse navbar-collapse'),
									elm$html$Html$Attributes$id('navbarToggler')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$h1,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											elm$html$Html$a,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('navbar-brand'),
													elm$html$Html$Attributes$href('#')
												]),
											_List_fromArray(
												[
													elm$html$Html$text('#! money?')
												]))
										])),
									A2(
									elm$html$Html$ul,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('navbar-nav')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$li,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('nav-item')
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$a,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('nav-link'),
															elm$html$Html$Attributes$href('#')
														]),
													_List_fromArray(
														[
															A2(
															elm$html$Html$strong,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$class('navbar-nav')
																]),
															_List_fromArray(
																[
																	elm$html$Html$text(project.name)
																]))
														]))
												]))
										])),
									A2(
									elm$html$Html$ul,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('navbar-nav ml-auto mr-auto')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$li,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('nav-item active')
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$a,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('nav-link'),
															elm$html$Html$Attributes$href('#')
														]),
													_List_fromArray(
														[
															elm$html$Html$text(
															t(author$project$Types$Bills))
														]))
												])),
											A2(
											elm$html$Html$li,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('nav-item')
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$a,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('nav-link'),
															elm$html$Html$Attributes$href('#')
														]),
													_List_fromArray(
														[
															elm$html$Html$text(
															t(author$project$Types$Settle))
														]))
												])),
											A2(
											elm$html$Html$li,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('nav-item')
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$a,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('nav-link'),
															elm$html$Html$Attributes$href('#')
														]),
													_List_fromArray(
														[
															elm$html$Html$text(
															t(author$project$Types$Statistics))
														]))
												]))
										])),
									A2(
									elm$html$Html$ul,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('navbar-nav secondary-nav')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$li,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('nav-item dropdown')
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$a,
													_List_fromArray(
														[
															elm$html$Html$Attributes$href('#'),
															elm$html$Html$Attributes$class('nav-link dropdown-toggle'),
															elm$html$Html$Attributes$id('navbarDropdownMenuLink'),
															A2(elm$html$Html$Attributes$attribute, 'data-toggle', 'dropdown'),
															A2(elm$html$Html$Attributes$attribute, 'aria-haspopup', 'true'),
															A2(elm$html$Html$Attributes$attribute, 'aria-expanded', 'false')
														]),
													_List_fromArray(
														[
															elm$html$Html$text(
															'⚙ ' + t(author$project$Types$Options))
														])),
													A2(
													elm$html$Html$ul,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('dropdown-menu dropdown-menu-right'),
															A2(elm$html$Html$Attributes$attribute, 'aria-labelledby', 'navbarDropdownMenuLink')
														]),
													_List_fromArray(
														[
															A2(
															elm$html$Html$li,
															_List_Nil,
															_List_fromArray(
																[
																	A2(
																	elm$html$Html$a,
																	_List_fromArray(
																		[
																			elm$html$Html$Attributes$class('dropdown-item'),
																			elm$html$Html$Attributes$href('#')
																		]),
																	_List_fromArray(
																		[
																			elm$html$Html$text(
																			t(author$project$Types$ProjectSettings))
																		]))
																])),
															A2(
															elm$html$Html$li,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$class('dropdown-divider')
																]),
															_List_Nil),
															A2(
															elm$html$Html$li,
															_List_Nil,
															_List_fromArray(
																[
																	A2(
																	elm$html$Html$a,
																	_List_fromArray(
																		[
																			elm$html$Html$Attributes$class('dropdown-item'),
																			elm$html$Html$Attributes$href('#')
																		]),
																	_List_fromArray(
																		[
																			elm$html$Html$text(
																			t(author$project$Types$StartNewProject))
																		]))
																])),
															A2(
															elm$html$Html$li,
															_List_fromArray(
																[
																	elm$html$Html$Attributes$class('dropdown-divider')
																]),
															_List_Nil),
															A2(
															elm$html$Html$li,
															_List_Nil,
															_List_fromArray(
																[
																	A2(
																	elm$html$Html$a,
																	_List_fromArray(
																		[
																			elm$html$Html$Attributes$class('dropdown-item'),
																			elm$html$Html$Attributes$href('#'),
																			elm$html$Html$Events$onClick(author$project$Types$LogoutUser)
																		]),
																	_List_fromArray(
																		[
																			elm$html$Html$text(
																			t(author$project$Types$Logout))
																		]))
																]))
														]))
												])),
											A2(
											elm$html$Html$li,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class(
													'nav-item' + (_Utils_eq(selectedLocale, author$project$Types$FR) ? ' active' : ''))
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$a,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('nav-link'),
															elm$html$Html$Attributes$href('#'),
															elm$html$Html$Events$onClick(
															author$project$Types$ChangeLocale(author$project$Types$FR))
														]),
													_List_fromArray(
														[
															elm$html$Html$text('fr')
														]))
												])),
											A2(
											elm$html$Html$li,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class(
													'nav-item' + (_Utils_eq(selectedLocale, author$project$Types$EN) ? ' active' : ''))
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$a,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('nav-link'),
															elm$html$Html$Attributes$href('#'),
															elm$html$Html$Events$onClick(
															author$project$Types$ChangeLocale(author$project$Types$EN))
														]),
													_List_fromArray(
														[
															elm$html$Html$text('en')
														]))
												]))
										]))
								]))
						]))
				]));
	});
var author$project$NavBar$simpleNavBarView = F2(
	function (t, selectedLocale) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('container')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$nav,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('navbar navbar-toggleable-sm fixed-top navbar-inverse bg-inverse')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$button,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('navbar-toggler'),
									elm$html$Html$Attributes$type_('button'),
									A2(elm$html$Html$Attributes$attribute, 'data-toggle', 'collapse'),
									A2(elm$html$Html$Attributes$attribute, 'data-target', '#navbarToggler'),
									A2(elm$html$Html$Attributes$attribute, 'aria-controls', 'navbarToggler'),
									A2(elm$html$Html$Attributes$attribute, 'aria-expanded', 'false'),
									A2(elm$html$Html$Attributes$attribute, 'aria-label', 'Toggle navigation')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$span,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('navbar-toggler-icon')
										]),
									_List_Nil)
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('collapse navbar-collapse'),
									elm$html$Html$Attributes$id('navbarToggler')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$h1,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											elm$html$Html$a,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('navbar-brand'),
													elm$html$Html$Attributes$href('#')
												]),
											_List_fromArray(
												[
													elm$html$Html$text('#! money?')
												]))
										])),
									A2(
									elm$html$Html$ul,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('navbar-nav ml-auto mr-auto')
										]),
									_List_Nil),
									A2(
									elm$html$Html$ul,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('navbar-nav secondary-nav')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$li,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class(
													'nav-item' + (_Utils_eq(selectedLocale, author$project$Types$FR) ? ' active' : ''))
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$a,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('nav-link'),
															elm$html$Html$Attributes$href('#'),
															elm$html$Html$Events$onClick(
															author$project$Types$ChangeLocale(author$project$Types$FR))
														]),
													_List_fromArray(
														[
															elm$html$Html$text('fr')
														]))
												])),
											A2(
											elm$html$Html$li,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class(
													'nav-item' + (_Utils_eq(selectedLocale, author$project$Types$EN) ? ' active' : ''))
												]),
											_List_fromArray(
												[
													A2(
													elm$html$Html$a,
													_List_fromArray(
														[
															elm$html$Html$Attributes$class('nav-link'),
															elm$html$Html$Attributes$href('#'),
															elm$html$Html$Events$onClick(
															author$project$Types$ChangeLocale(author$project$Types$EN))
														]),
													_List_fromArray(
														[
															elm$html$Html$text('en')
														]))
												]))
										]))
								]))
						]))
				]));
	});
var author$project$Types$Deactivate = {$: 'Deactivate'};
var author$project$Types$DeactivateMember = function (a) {
	return {$: 'DeactivateMember', a: a};
};
var author$project$Types$MemberModal = function (a) {
	return {$: 'MemberModal', a: a};
};
var author$project$SideBar$memberInfo = F2(
	function (t, member) {
		var sign = (member.balance > 0) ? '+' : '';
		var className = (member.balance < 0) ? 'negative' : 'positive';
		return A2(
			elm$html$Html$tr,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id('bal-member-1')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$td,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('balance-name')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(member.name),
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('light extra-info')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('(x1)')
								]))
						])),
					A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('action delete')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$button,
									_List_fromArray(
										[
											elm$html$Html$Attributes$type_('button'),
											elm$html$Html$Events$onClick(
											author$project$Types$DeactivateMember(member.id))
										]),
									_List_fromArray(
										[
											elm$html$Html$text(
											t(author$project$Types$Deactivate))
										]))
								]))
						])),
					A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('action edit')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$button,
									_List_fromArray(
										[
											elm$html$Html$Attributes$type_('button'),
											elm$html$Html$Events$onClick(
											author$project$Types$EditModal(
												author$project$Types$MemberModal(member.id)))
										]),
									_List_fromArray(
										[
											elm$html$Html$text(
											t(author$project$Types$Edit))
										]))
								]))
						])),
					A2(
					elm$html$Html$td,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('balance-value ' + className)
						]),
					_List_fromArray(
						[
							elm$html$Html$text(
							_Utils_ap(
								sign,
								A2(myrho$elm_round$Round$round, 2, member.balance)))
						]))
				]));
	});
var author$project$Types$Add = {$: 'Add'};
var author$project$Types$AddMember = {$: 'AddMember'};
var author$project$Types$TypeUserName = {$: 'TypeUserName'};
var elm$html$Html$aside = _VirtualDom_node('aside');
var elm$html$Html$Attributes$placeholder = elm$html$Html$Attributes$stringProperty('placeholder');
var author$project$SideBar$sideBarView = F3(
	function (t, memberField, members) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('row'),
					A2(elm$html$Html$Attributes$style, 'height', '100%')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$aside,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id('sidebar'),
							elm$html$Html$Attributes$class('sidebar col-xs-12 col-md-3 '),
							A2(elm$html$Html$Attributes$style, 'height', '100%')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$form,
							_List_fromArray(
								[
									elm$html$Html$Attributes$id('add-member-form'),
									elm$html$Html$Events$onSubmit(author$project$Types$AddMember),
									elm$html$Html$Attributes$class('form-inline')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('input-group')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$label,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('sr-only'),
													elm$html$Html$Attributes$for('name')
												]),
											_List_fromArray(
												[
													elm$html$Html$text(
													t(author$project$Types$TypeUserName))
												])),
											A2(
											elm$html$Html$input,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('form-control'),
													elm$html$Html$Attributes$id('name'),
													elm$html$Html$Attributes$placeholder(
													t(author$project$Types$TypeUserName)),
													elm$html$Html$Attributes$required(true),
													elm$html$Html$Attributes$type_('text'),
													elm$html$Html$Attributes$value(memberField),
													elm$html$Html$Events$onInput(author$project$Types$NewMemberName)
												]),
											_List_Nil),
											A2(
											elm$html$Html$button,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class(' input-group-addon btn')
												]),
											_List_fromArray(
												[
													elm$html$Html$text(
													t(author$project$Types$Add))
												]))
										]))
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$id('table_overflow')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$table,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('balance table')
										]),
									A2(
										elm$core$List$map,
										author$project$SideBar$memberInfo(t),
										members))
								]))
						]))
				]));
	});
var author$project$Types$AppTitle = function (a) {
	return {$: 'AppTitle', a: a};
};
var author$project$Main$view = function (model) {
	var t = author$project$Locales$getString(model.locale);
	var _n0 = _Utils_Tuple2(model.auth, model.project);
	if ((_n0.a.$ === 'Basic') && (_n0.b.$ === 'Just')) {
		var _n1 = _n0.a;
		var user = _n1.a;
		var password = _n1.b;
		var project = _n0.b.a;
		return {
			body: _List_fromArray(
				[
					A3(author$project$NavBar$navBarView, t, project, model.locale),
					A3(author$project$Modal$handleModal, t, model, project),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('container-fluid')
						]),
					_List_fromArray(
						[
							A3(author$project$SideBar$sideBarView, t, model.fields.newMember, project.members),
							A2(author$project$BillBoard$billBoardView, t, project.bills)
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('messages')
						]),
					_List_Nil),
					author$project$Footer$footerView(t)
				]),
			title: t(
				author$project$Types$AppTitle(
					elm$core$Maybe$Just(project.name)))
		};
	} else {
		return {
			body: _List_fromArray(
				[
					A2(author$project$NavBar$simpleNavBarView, t, model.locale),
					A3(author$project$Login$loginView, t, model.locale, model.fields),
					author$project$Footer$footerView(t)
				]),
			title: t(
				author$project$Types$AppTitle(elm$core$Maybe$Nothing))
		};
	}
};
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$contains = _String_contains;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$document = _Browser_document;
var author$project$Main$main = elm$browser$Browser$document(
	{init: author$project$Main$init, subscriptions: author$project$Main$subscriptions, update: author$project$Main$update, view: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));