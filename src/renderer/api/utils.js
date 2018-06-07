import _ from 'lodash'
import lockers from '../api/lockers'

export function responseMessageToComputer (data) {
    if (data.includes('OPEN')) {
        return `${data}`
    } else if (data.includes('deligram')) {
        let result = convertIntToBinary(Math.random().toString().substr(2))
        return `deligram${result}`
    }
}

export function executeRespectiveCallback (data, callbackMap) {
    let result
    if (data.includes('OPEN')) {
        data = data.replace('OPEN', '')
        data = data.match(/\d+/)[0]
        result = mapOpenResult(data)
        callbackMap.openBox(null, result)
    } else if (data.includes('deligram')) {
        data = data.replace('deligram', '')
        result = mapQueryResult(data)
        callbackMap.queryBox(null, result)
    }
}

export const convertSelectedLockersToCommand = function (selectedLockers) {
    let command = 0
    for (let lockerId of selectedLockers) {
        command = command | 1 << (lockerId - 1)
    }
    return command
}

const getLockerResponsePrefix = function (data) {
    return data[0]
}

const mapOpenResult = function (openResult) {
    let openedLockers = convertIntToBinary(openResult).split('').reverse()
    let result = []
    for (let index in openedLockers) {
        if (openedLockers[index] === '1') {
            let lockerId = parseInt(index) + 1
            result.push(lockerId)
        }
    }
    return result
}

const mapQueryResult = function (queryResult) {
    let _lockers = _.cloneDeep(lockers)
    let queryResultArray = queryResult.split('')
    for (let index in _lockers) {
        if (queryResultArray[index] === '0') {
            _lockers[index].status = 'Unavailable'
        } else {
            _lockers[index].status = 'Available'
        }
    }
    return _lockers
}

const convertIntToBinary = function (data) {
    return parseInt(data).toString(2)
}