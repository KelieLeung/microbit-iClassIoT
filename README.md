# Makecode Extension for iClass IoT Wifi Module
This library provides a Microsoft MakeCode extension for iClass IoT Wifi Module, see https://www.iclassict.com/

## Initialize the iClass IoT Wifi Module
```blocks
  iClassIoT.init(P0, P1, 9600)
```

## Connect to WiFi
Connect to the WiFi
```blocks
  iClassIoT.connectWiFi("demo", "testtest")
```

## Connect to IFTTT
Trigger the IFTTT event with value(s)
```blocks
  iClassIoT.triggerIFTTT("the_event", "ajgfeeefgkgfbejgjkds", "value1", "value2", "value3")
```

## Supported targets

* for PXT/microbit

## License
MIT
