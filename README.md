# Moment Duration Format Frequency

**Format plugin for the Moment Duration object.**

This is a plugin to the Moment.js JavaScript date library to add frequency formatting to Moment Durations.


---

## Installation

**Node.js**

`npm install moment-duration-format-frequency`


## Usage

### Module

To use this plugin as a module, use the `require` function:
```
require("moment-duration-format-frequency");
```

The plugin does not export anything, so there is no need to assign the require output to a variable.

The plugin depends on moment.js.


### Basics

The duration format method can format moment durations as human readable frequencies:

```
moment.duration(1.5, 'weeks').formatAsFrequency('weeks');
// "every 1-2 weeks"

moment.duration(0.23, 'weeks').formatAsFrequency('weeks');
// "4-5 times per week"

moment.duration(3, 'weeks').formatAsFrequency('weeks');
// "every 3 weeks"

moment.duration(0.25, 'weeks').formatAsFrequency('weeks');
// "4 times per week"

moment.duration(3, 'years').formatAsFrequency('years');
// "every 3 years"
```

### Customization

Individual strings can be customized:

```
moment.duration.fn.formatAsFrequency.defaults.everyString = 'alle';

moment.duration(3, 'years').formatAsFrequency('years');
// "alle 3 years"
```