iClassIoT.init(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate9600)
iClassIoT.connectWiFi("demodemo2", "testtest")
basic.forever(function () {
    iClassIoT.triggerIFTTT(
    "data",
    "cdJYytacXx3IzY-rFUkpU6",
    "1",
    "2",
    "3"
    )
})
