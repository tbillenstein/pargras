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


(function(window)
{
	const nodeEnv = typeof module === 'object' && module && typeof module.exports === 'object';

	if (nodeEnv)
	{
		module.exports = Pargras;
	}
	else
	{
		/* istanbul ignore next */
		window.Pargras = Pargras;
	}

	/**
	 * Pargras is a minimalistic helper around function arguments for Node.js and the browser.
	 * Pargras has a fluent interface and supports adding, removing and altering arguments
	 * before applying them to a function.
	 *
	 * @param args Function arguments object.
	 * @constructor
	 * @example
	 * // Instantiate the arguments helper.
	 * const args = new Pargras(arguments);
	 *
	 * // Remove first and last parameter, then call Math.min() with the resulting arguments.
	 * var min = args.shift().pop().applyTo(Math.min);
	 *
	 * // More examples to be be found in the unit tests.
	 */
	function Pargras(args)
	{
		'use strict';

		var argsArray,
			i,
			l;

		// Test for valid constructor parameter.
		if (!isArguments(args))
		{
			throw new Error("Parameter is no arguments object");
		}

		// Convert arguments to array.
		argsArray = new Array(args.length);

		for (i = 0, l = argsArray.length; i < l; i++)
		{
			argsArray[i] = args[i];
		}

		/**
		 * Return constructor arguments as an array.
		 *
		 * @returns {any[]}
		 */
		this.array = function()
		{
			return argsArray;
		};

		/**
		 * Return the number of arguments passed to the constructor.
		 *
		 * @returns {Number}
		 */
		this.length = function()
		{
			return argsArray.length;
		};

		/**
		 * Change the value of the nth argument passed to constructor.
		 *
		 * @param n Index of argument to be altered.
		 * @param value New value to be set.
		 * @returns {Pargras}
		 */
		this.set = function(n, value)
		{
			if (n < argsArray.length)
			{
				argsArray[n] = value;
			}

			return this;
		};

		/**
		 * Return the value of the nth argument passed to constructor.
		 *
		 * @param n Index of argument to be returned.
		 * @returns {any}
		 */
		this.get = function(n)
		{
			return argsArray[n];
		};

		/**
		 * Remove first argument passed to constructor.
		 *
		 * @returns {Pargras}
		 */
		this.shift = function()
		{
			argsArray.shift();

			return this;
		};

		/**
		 * Remove last argument passed to constructor.
		 *
		 * @returns {Pargras}
		 */
		this.pop = function()
		{
			argsArray.pop();

			return this;
		};

		/**
		 * Add one or more elements to the beginning of the constructor arguments.
		 *
		 * @returns {Pargras}
		 */
		this.unshift = function(/* element1[, ...[, elementN]] */)
		{
			var i;

			for (i = arguments.length - 1; i >= 0; i--)
			{
				argsArray.unshift(arguments[i]);
			}

			return this;
		};

		/**
		 * Add one or more elements to the end of the constructor arguments.
		 *
		 * @returns {Pargras}
		 */
		this.push = function(/* element1[, ...[, elementN]] */)
		{
			var i,
				l = arguments.length;

			for (i = 0; i < l; i++)
			{
				argsArray.push(arguments[i]);
			}

			return this;
		};

		/**
		 * Apply arguments and an optional 'this' argument to the given function.
		 *
		 * @param func Function to be called.
		 * @param thisArg Optional this argument.
		 * @returns {*} Returns the called functions return value.
		 */
		this.applyTo = function(func, thisArg)
		{
			return func.apply(thisArg || null, argsArray);
		};

		function isArguments(value)
		{
			return value != null && typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, 'callee');
		}
	}
})(this);
