/* jshint node: true */

'use strict';

var moment = require('moment');
var util = require('util');
var _ = require('lodash');
var isNaturalNumber = require('is-natural-number');

(function(moment) {
	var roundNumber = function(number) {
		return parseFloat(number.toFixed(2));
	};

	var isApproximatelyNaturalNumber = function(number) {
		return isNaturalNumber(roundNumber(number));
	};

	moment.duration.fn.formatAsFrequency = function(unit, options) {
		options = options || {};
		_.defaults(options, this.formatAsFrequency.defaults);

		var unitDuration = moment.duration(1, unit);
		var isValidUnit = unitDuration.asMilliseconds() > 0;
		if (!isValidUnit) {
			throw new Error(util.format('%s is not a valid moment unit', unit));
		}

		var intervalInMs = this.asMilliseconds();
		var unitDurationInMs = unitDuration.asMilliseconds();

		var unitSingular = moment.normalizeUnits(unit);
		var unitPlural = unitSingular + 's';

		if (intervalInMs === unitDurationInMs) {
			return util.format('%s %s', options.everyString, unitSingular);
		}

		if (intervalInMs < unitDurationInMs) {
			var numberOfIntervalsPerUnit = unitDurationInMs / intervalInMs;
			if (isApproximatelyNaturalNumber(numberOfIntervalsPerUnit)) {
				return util.format('%d %s %s %s', roundNumber(numberOfIntervalsPerUnit), options.timesString, options.perString, unitSingular);
			}

			return util.format('%d%s%d %s %s %s', Math.floor(numberOfIntervalsPerUnit), options.separatorString, Math.ceil(numberOfIntervalsPerUnit), options.timesString, options.perString, unitSingular);
		}

		var numberOfUnitsPerInterval = intervalInMs / unitDuration;
		if (isApproximatelyNaturalNumber(numberOfUnitsPerInterval)) {
			return util.format('%s %d %s', options.everyString, roundNumber(numberOfUnitsPerInterval), unitPlural);
		}

		return util.format('%s %d%s%d %s', options.everyString, Math.floor(numberOfUnitsPerInterval), options.separatorString, Math.ceil(numberOfUnitsPerInterval), unitPlural);

	};

	moment.duration.fn.formatAsFrequency.defaults = {
			everyString: 'every',
			perString: 'per',
			timesString: 'times',
			separatorString: '-'
	};
})(moment);