/* jshint node: true */

'use strict';

var chai = require('chai');
var expect = chai.expect;
var moment = require('moment');

require('./../lib/momentDurationFormatFrequency');

describe('moment-duration-format-frequency', function() {
	it('should work with frequencies greater than 1 per unit', function() {
		var everyOneAndAHalfWeeks = moment.duration(1.5, 'weeks');
		
		expect(everyOneAndAHalfWeeks.formatAsFrequency('weeks')).to.eql('every 1-2 weeks');
	});

	it('should work with frequencies less than 1 per unit', function() {
		var fourToFiveTimesPerWeek = moment.duration(0.23, 'weeks');
		
		expect(fourToFiveTimesPerWeek.formatAsFrequency('weeks')).to.eql('4-5 times per week');
	});

	it('should work with frequencies of 1 per unit', function() {
		var everyThreeWeeks = moment.duration(3, 'weeks');

		expect(everyThreeWeeks.formatAsFrequency('weeks')).to.eql('every 3 weeks');
	});

	it('should work with frequencies whose inverse is a natural number', function() {
		var fourTimesPerWeek = moment.duration(0.25, 'weeks');

		expect(fourTimesPerWeek.formatAsFrequency('weeks')).to.eql('4 times per week');
	});

	it('should work with years unit as well', function() {
		var everyThreeYears = moment.duration(3, 'years');

		expect(everyThreeYears.formatAsFrequency('years')).to.eql('every 3 years');
	});

	describe('defaults', function() {
		it('everyString should be overwritable', function() {
			moment.duration.fn.formatAsFrequency.defaults.everyString = 'alle';

			var everyThreeYears = moment.duration(3, 'years');
			expect(everyThreeYears.formatAsFrequency('years')).to.eql('alle 3 years');
		});
	});
});