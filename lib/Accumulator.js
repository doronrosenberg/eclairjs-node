/*
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Accumulable = require('./Accumulable.js')();

var gKernelP;

/**
 * A simpler value of {@link Accumulable} where the result type being accumulated is the same
 * as the types of elements being merged, i.e. variables that are only "added" to through an
 * associative operation and can therefore be efficiently supported in parallel. They can be used
 * to implement counters (as in MapReduce) or sums. EclairJS supports accumulators of numeric
 * value types.
 *
 * An accumulator is created from an initial value `v` by calling [[SparkContext#accumulator]].
 * Tasks running on the cluster can then add to it using the [[Accumulable#add]].
 * However, they cannot read its value. Only the driver program can read the accumulator's value,
 * using its value method.
 *
 *
 * @example
 *    var accum = sparkContext.accumulator(0);
 *    sparkContext.parallelize([1, 2, 3, 4])
 *                .foreach(function(x, accum) {
 *					accum.add(x);
 *				});
 *    print(accum.value()); // displays 10
 *
 * @classdesc
 * @param {number} initialValue
 * @param {module:eclairjs.AccumulableParam} param
 * @param {string} name human-readable name for use in Spark's web UI
 * @constructor
 * @memberof module:eclairjs
 * @augments Accumulable
 */
function Accumulator() {
  if (arguments.length == 2) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: Accumulator,
      args: Utils.wrapArguments(arguments),
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

Accumulator.prototype = Accumulable.prototype;

Accumulator.moduleLocation = '/Accumulator';

module.exports = function(kP) {
  gKernelP = kP;

  return Accumulator;
};