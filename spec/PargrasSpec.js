/**
 * Pargras - Minimalistic helper around function arguments for Node.js and the browser.
 *
 * @copyright: Copyright (c) 2016-present, tbillenstein
 *
 * @author: tbillenstein <tb@thomasbillenstein.com> (https://thomasbillenstein.com)
 *
 * @license This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var Pargras = Pargras || require('../pargras');

describe("Pargras", function()
{
	it("should check constructor parameter.", function()
	{
		// How to use Pargras correctly.
		expect(new Pargras(arguments).array()).toEqual([]);

		expect(function() { new Pargras(); }).toThrowError("Parameter is no arguments object");
		expect(function() { new Pargras([]); }).toThrowError("Parameter is no arguments object");
		expect(function() { new Pargras({}); }).toThrowError("Parameter is no arguments object");
		expect(function() { new Pargras(1); }).toThrowError("Parameter is no arguments object");
		expect(function() { new Pargras('a'); }).toThrowError("Parameter is no arguments object");
		expect(function() { new Pargras(null); }).toThrowError("Parameter is no arguments object");
		expect(function() { new Pargras(undefined); }).toThrowError("Parameter is no arguments object");
	});

	it("should return arguments as an array.", function()
	{
		(function()
		{
			expect(new Pargras(arguments).array()).toEqual([]);
		})();

		(function()
		{
			expect(new Pargras(arguments).array()).toEqual([1]);
		})(1);

		(function()
		{
			expect(new Pargras(arguments).array()).toEqual([1, 2, 3]);
		})(1, 2, 3);
	});

	it("should return arguments length.", function()
	{
		(function()
		{
			expect(new Pargras(arguments).length()).toEqual(0);
		})();

		(function()
		{
			expect(new Pargras(arguments).length()).toEqual(1);
		})(1);

		(function()
		{
			expect(new Pargras(arguments).length()).toEqual(5);
		})(1, 2, 3, 4, 5);
	});

	it("should alter arguments values.", function()
	{
		(function()
		{
			const args = new Pargras(arguments);

			expect(args.get(0)).toBe(1);
			expect(args.get(1)).toBe('a');
			expect(args.get(2)).toBe(3);
			expect(args.get(3)).toBeUndefined();

			args.set(0, 'c');
			args.set(2, 'b');

			expect(args.array()).toEqual(['c', 'a', 'b']);
		})(1, 'a', 3);
	});

	it("should remove first argument (shift).", function()
	{
		(function()
		{
			const args = new Pargras(arguments);

			expect(args.shift().array()).toEqual([2, 3]);
			expect(args.shift().array()).toEqual([3]);
			expect(args.shift().array()).toEqual([]);
		})(1, 2, 3);
	});

	it("should handle shift() on empty arguments.", function()
	{
		(function()
		{
			const args = new Pargras(arguments);

			expect(args.shift().array()).toEqual([]);
			expect(args.shift().array()).toEqual([]);
			expect(args.shift().array()).toEqual([]);
		})();
	});

	it("should remove last argument (pop).", function()
	{
		(function()
		{
			const args = new Pargras(arguments);

			expect(args.pop().array()).toEqual([1, 2]);
			expect(args.pop().array()).toEqual([1]);
			expect(args.pop().array()).toEqual([]);
		})(1, 2, 3);
	});

	it("should handle pop() on empty arguments.", function()
	{
		(function()
		{
			const args = new Pargras(arguments);

			expect(args.pop().array()).toEqual([]);
			expect(args.pop().array()).toEqual([]);
			expect(args.pop().array()).toEqual([]);
		})();
	});

	it("should prepend arguments (unshift).", function()
	{
		(function()
		{
			const args = new Pargras(arguments);

			expect(args.unshift('a').array()).toEqual(['a', 1, 2, 3]);
			expect(args.unshift('b', 'c').array()).toEqual(['b', 'c', 'a', 1, 2, 3]);
			expect(args.unshift().array()).toEqual(['b', 'c', 'a', 1, 2, 3]);
		})(1, 2, 3);
	});

	it("should append arguments (push).", function()
	{
		(function()
		{
			const args = new Pargras(arguments);

			expect(args.push('a').array()).toEqual([1, 2, 3, 'a']);
			expect(args.push('b', 'c').array()).toEqual([1, 2, 3, 'a', 'b', 'c']);
			expect(args.push().array()).toEqual([1, 2, 3, 'a', 'b', 'c']);
		})(1, 2, 3);
	});

	it("should apply to function.", function()
	{
		(function()
		{
			const args = new Pargras(arguments);

			expect(Math.max.apply(null, args.array())).toBe(3);
		})(1, 3, 2);

		(function()
		{
			const args = new Pargras(arguments);

			args.set(0, 5);

			expect(Math.max.apply(null, args.array())).toBe(5);
		})(1, 3, 2);

		(function()
		{
			const args = new Pargras(arguments);

			expect(Math.min.apply(null, args.array())).toBe(1);

			// Remove first argument.
			args.shift();

			expect(Math.min.apply(null, args.array())).toBe(2);
		})(1, 3, 2);
	});

	it("should apply to function using applyTo().", function()
	{
		(function()
		{
			const args = new Pargras(arguments);

			expect(args.applyTo(Math.max)).toBe(3);
		})(1, 3, 2);

		(function()
		{
			const args = new Pargras(arguments);

			args.set(0, 5);

			expect(args.applyTo(Math.max)).toBe(5);
		})(1, 3, 2);

		(function()
		{
			const args = new Pargras(arguments);

			expect(args.applyTo(Math.min)).toBe(1);

			// Remove first argument.
			args.shift();

			expect(args.applyTo(Math.min)).toBe(2);
		})(1, 3, 2);

		(function()
		{
			const args = new Pargras(arguments);

			const self = this;

			function callee(a, b)
			{
				expect(a).toBe(3);
				expect(b).toBe(2);
				expect(this).toBe(self);
			}

			args.shift().applyTo(callee, this);
		})(1, 3, 2);
	});
});

describe("Pargras README examples.", function()
{
	it("should pass the README example #1 (Usage).", function()
	{
		function specialMin()
		{
			// Instantiate the arguments helper.
			const args = new Pargras(arguments);

			// Remove first and last parameter and call Math.min() with the resulting arguments.
			return args.shift().pop().applyTo(Math.min);
		}

		var smin = specialMin(0, 2, 3, 4, 1);
		// -> 2

		expect(smin).toBe(2);
	});

	it("should pass the README example #2 (Return the function arguments as an array).", function()
	{
		function afunc()
		{
			// Instantiate the arguments helper.
			const args = new Pargras(arguments);

			// Return the function arguments as an array.
			return args.array();
		}

		var r = afunc(0, 1, "two", true);
		// -> [ 0, 1, "two", true ]

		expect(r).toEqual([ 0, 1, "two", true ]);
	});

	it("should pass the README example #3 (Return the number of arguments passed to a function).", function()
	{
		function afunc()
		{
			// Instantiate the arguments helper.
			const args = new Pargras(arguments);

			// Return the number of arguments passed to function.
			return args.length();
		}

		var l = afunc(0, 1, "two", true);
		// -> 4

		expect(l).toEqual(4);
	});

	it("should pass the README example #4 (Alter an argument value).", function()
	{
		function afunc()
		{
			// Instantiate the arguments helper.
			const args = new Pargras(arguments);

			// Check value.
			expect(args.get(1)).toBe("banana");
			// -> "banana"

			// Alter second argument value.
			args.set(1, 'altered');

			// Check value again.
			expect(args.get(1)).toBe("altered");
			// -> "altered"

			// Return sorted arguments.
			return args.array().sort();
		}

		var r = afunc("peach", "banana", "apple");
		// -> [ "altered", "apple", "peach" ]

		expect(r).toEqual([ "altered", "apple", "peach" ]);
	});

	it("should pass the README example #5 (Alter arguments and apply them to another function).", function()
	{
		function afunc()
		{
			// Instantiate the arguments helper.
			const args = new Pargras(arguments);

			// Alter arguments.
			args.shift().pop().unshift('one').push('four');

			// Apply to console.log().
			args.applyTo(console.log);

			return args.array();
		}

		var a = afunc(1, 2, 3, 4);
		// -> [ "one", 2, 3, "four" ]

		expect(a).toEqual([ "one", 2, 3, "four" ]);
	});
});
