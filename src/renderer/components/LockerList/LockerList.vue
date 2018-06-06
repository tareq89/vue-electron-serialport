<template>
    <div>
        <ul>
            <li v-for="locker in lockers" :key="locker.id">
                <div>{{ locker.id }}</div>
                <div><button @click="openBox(locker)">open</button></div>
            </li>
        </ul>
    </div>
</template>


<script>
import lockers from '../../api/lockers'
import { openBox, queryBox } from '../../api/index.js'

export default {    
    data () {
        return {
            lockers: lockers
        }
    },
    methods: {
        openBox (locker) {
            openBox(locker.command, function (err, success) {
                if (success) {
                    alert(`${locker.id} is opened!`)
                }
            })
        },
        queryBox () {

        }
    }
}
</script>
