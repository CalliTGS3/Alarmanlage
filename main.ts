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
let EmpfindlichkeitGeraeusch = 70
Eingeschaltet = false
let Debug = true
if (Debug) {
    serial.redirectToUSB()
}
led.setBrightness(0)
basic.forever(function () {
    if (Eingeschaltet) {
        basic.pause(10)
        Licht = input.lightLevel()
        basic.pause(10)
        Geraeusch = input.soundLevel()
        if (Debug) {
            serial.writeNumber(Geraeusch)
            serial.writeLine("")
        }
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
