input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Eingeschaltet = true
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    Eingeschaltet = false
})
let Alarm = false
let Bewegung = 0
let Licht = 0
let Eingeschaltet = false
let EmpfindlichkeitLicht = 120
let EmpfindlichkeitBewegung = 1024
Eingeschaltet = false
let Debug = true
if (Debug) {
    serial.redirectToUSB()
}
basic.forever(function () {
    if (Eingeschaltet) {
        basic.pause(10)
        Licht = input.lightLevel()
        basic.pause(10)
        Bewegung = input.acceleration(Dimension.Strength)
        if (Debug) {
            serial.writeNumber(Bewegung)
            serial.writeLine("")
        }
        if (Licht < EmpfindlichkeitLicht && Bewegung >= EmpfindlichkeitBewegung) {
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
