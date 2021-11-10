/** 
 * MakeCode extension for iClass IoT Module
 */
//% color=#05A6FF icon="\uf1eb" block="iClass IoT"
namespace iClassIoT {
    //% blockHidden=true
    function sendCommand(command: string, wait: number = 10) {
        serial.writeString(command + "\r\n")
        basic.pause(wait)
    }

    //% weight=50
    //% block="Initialize iClass IoT TX %tx RX %rx Baudrate %baudrate"
    export function init(tx: SerialPin, rx: SerialPin, baudrate: BaudRate) {
        serial.redirect(tx, rx, baudrate)
        serial.setTxBufferSize(128)
        serial.setRxBufferSize(128)
        sendCommand("AT+RST")
        basic.pause(1000)
        sendCommand("ATE0")
        sendCommand("AT+CWAUTOCONN=0")
        let response = "";
        while (true) {
            response = response + serial.readString();
            if (response.includes("OK")) {
                break
            }
        }
        sendCommand("AT+CWQAP")
        response = "";
        while (true) {
            response = response + serial.readString();
            if (response.includes("OK")) {
                break
            }
        }
    }

    //% weight=40
    //% block="Connect WiFi SSID %ssid Password %password"
    export function connectWiFi(ssid: string, password: string) {
        sendCommand("AT+CWJAP=\"" + ssid + "\",\"" + password + "\"")
        let response = "";
        while (true) {
            response = response + serial.readString();
            if (response.includes("OK")) {
                break
            }
        }
        response = "";
        while (true) {
            response = response + serial.readString();
            if (response.includes("OK") || response.includes("FAIL")) {
                break
            }
        }
    }

    //% weight=30
    //% block="Trigger IFTTT Event Name %eventname Key %key Value 1 %value1 Value 2 %value2 Value 3 %value3"
    export function triggerIFTTT(eventname: string, key: string, value1: string, value2: string, value3: string) {
        sendCommand("AT+CIPSTART=\"TCP\",\"maker.ifttt.com\",80")
        basic.pause(1000)
        let response = "";
        while (true) {
            response = response + serial.readString();
            if (response.includes("OK") || response.includes("CONNECT") || response.includes("ERROR")) {
                break
            }
        }
        if (response.includes("CONNECT")) {
            let request = "GET https://maker.ifttt.com/trigger/" + eventname + "/with/key/" + key + "?value1=" + value1 + "&value2=" + value2 + "&value3=" + value3
            let strsize = request.length + 2;
            if (strsize < 200) {
                sendCommand("AT+CIPSEND=" + strsize)
                basic.pause(500)
                response = response + serial.readString();
                sendCommand(request)
                basic.pause(1000)
                response = "";
                while (true) {
                    response = response + serial.readString();
                    if (response.includes("OK") || response.includes("SEND") || response.includes("ERROR")) {
                        break
                    }
                }
            }
        }
    }
    
}