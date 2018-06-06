import _ from 'lodash'
import lockers from '../api/lockers'

export function responseMessageToComputer (data) {
    let prefix = data[0]
    let actualData = data.substr(1).trim()
    let locker = _.find(lockers, (locker) => {
        return locker.command === actualData
    })
    return `${prefix}${locker.response}`
}

export function executeRespectiveCallback (data, callbackMap) {
    switch (getLockerResponsePrefix(data)) {
        case 'o':
            callbackMap.openBox(null, data)
            break
        case 'q':
            callbackMap.queryBox(null, data)
            break
    }
}

const getLockerResponsePrefix = function (data) {
    return data[0]
}