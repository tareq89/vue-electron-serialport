require('dotenv').config()
import SerialPort from 'serialport'
import VirtualSerialPort from 'virtual-serialport'
import { 
    executeRespectiveCallback,
    responseMessageToComputer
} from './utils'

let lockerSerialPort = null
let callbackMap = {}
let SP = process.env.NODE_ENV === 'DEV' ? VirtualSerialPort : SerialPort
lockerSerialPort = new SP('/dev/ttyS0', { baudrate: 57600 })

lockerSerialPort.on('open', function(error) {})

lockerSerialPort.on('data', function (data) {
    executeRespectiveCallback(data, callbackMap)
})

if (process.env.NODE_ENV === 'DEV') {
    lockerSerialPort.on("dataToDevice", function(data) {
        data = responseMessageToComputer(data)
        lockerSerialPort.writeToComputer(`${data}`)
    })
}

export function openBox (boxid, callback) {
    let messageToDevice = process.env.NODE_ENV === 'DEV'? `o${boxid}\n` : `${boxid}\n`
    lockerSerialPort.write(messageToDevice)
    callbackMap.openBox = callback
}

export function queryBox (callback) {
    let messageToDevice = process.env.NODE_ENV === 'DEV'? `qdeligram?\n` : `deligram?\n`
    lockerSerialPort.write(messageToDevice)
    callbackMap.queryBox = callback
}