input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Eingeschaltet = true
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    Eingeschaltet = false
})
let Alarm = false
let Geraeusch = 0
let Licht = 0
let Eingeschaltet = false
let EmpfindlichkeitLicht = 120
let EmpfindlichkeitGeraeusch = 50
Eingeschaltet = false
led.setBrightness(0)
serial.redirectToUSB()
basic.forever(function () {
    if (Eingeschaltet) {
        Licht = input.lightLevel()
        basic.pause(100)
        Geraeusch = input.soundLevel()
        serial.writeNumber(Geraeusch)
        serial.writeLine("")
        if (Licht < EmpfindlichkeitLicht && Geraeusch >= EmpfindlichkeitGeraeusch) {
            Alarm = true
        }
        if (Alarm) {
            basic.setLedColor(0xff0000)
        } else {
            basic.setLedColor(0x00ff00)
        }
    } else {
        Alarm = false
        basic.setLedColor(0x007fff)
    }
})
