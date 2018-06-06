import _ from 'lodash'
import lockers from '../api/lockers'

export function responseMessageToComputer (data) {
    let prefix = data[0]

    switch (prefix) {
        case 'o':
            let actualData = data.substr(1).trim()
            let locker = _.find(lockers, (locker) => {
                return locker.command === actualData
            })
            return `${prefix}${locker.response}`
        case 'q':
            let result = queryResult()
            return `q${result}`
            break            
    }
}

export function executeRespectiveCallback (data, callbackMap) {
    switch (getLockerResponsePrefix(data)) {
        case 'o':
            callbackMap.openBox(null, data)
            break
        case 'q':
            data = data.substr(1)
            let result = mapQueryResult(data)
            callbackMap.queryBox(null, result)
            break
    }
}

const getLockerResponsePrefix = function (data) {
    return data[0]
}

const queryResult = function (data) {    
    return parseInt(Math.random().toString().substr(2)).toString(2).substr(1,26)
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