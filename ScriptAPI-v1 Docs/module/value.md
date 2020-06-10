## Adding values to modules
Values will be visible in the ClickGUI and can be changed by the user. If a module is using settings instead of hard-coded values, it is more customizable for the user.
```js
// Values must be registered manuelly
this.addValues = function(values) {
    values.add(myValue1);
    values.add(myValue2);
}
```

### Available value types
```js
// BoolValue - Either true or false
var myBoolValue = value.createBoolean(valueName, defaultValue);

// BlockValue - Used for selecting a block
var myBlockValue = value.createBlock(valueName, defaultBlockId);

// FloatValue - Slider allowing the user to select a floating-point number
var myFloatValue = value.createFloat(valueName, defaultValue, minValue, maxValue);

// IntegerValues - Slider allowing the user to select an integer number
var myIntValue = value.createInteger(valueName, defaultValue, minValue, maxValue);

// ListValue - Allowing the user to select one item from the list of available values
var myList = value.createList(valueName, [possibleValue1, possibleValue2, possibleValue3], defaultValue);

// TextValue - Allowing the user to specify any string as its value
var myTextValue = value.createText(valueName, defaultValue);
```

### Setting and getting a value
```js
// BoolValue - Either true or false
var myBoolValue = value.createBoolean("MyBoolValue", true);
myBoolValue.get(); // true
myBoolValue.set(false); // Sets value to false
```