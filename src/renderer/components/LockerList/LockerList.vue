<template>
    <div>
        <div class="buttons">
            <button @click="queryBox">Query Locker Status</button>
            <button @click="multipleOpen = !multipleOpen; selectedLockers = []">Select multiple Locker</button>
            <button class="buttons--open-multiple" @click="openMultipleBox" v-if="multipleOpen">Open Multiple Locker</button>
        </div>
        <ul>
            <li :class="['locker', {'locker-unavailable': locker.status === 'Unavailable'}, {'locker-available': locker.status === 'Available'}]"
             v-for="(locker, index) in lockers" :key="index">
                <div v-if="multipleOpen">
                    <input class="locker--select" type="checkbox" :value="index+1" v-model="selectedLockers">
                </div>
                <div class="locker--name">{{ locker.id }}</div>
                <div class="locker-status">{{ locker.status }}</div>
                <div class="locker-open" v-if="!multipleOpen">
                    <button class="locker-open-button" @click="openBox(index+1)">Open</button>
                </div>
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
            lockers: lockers,
            multipleOpen: false,
            selectedLockers: []
        }
    },
    methods: {
        openBox (index) {
            this.selectedLockers = []
            this.selectedLockers.push(index)
            openBox(this.selectedLockers, function (err, result) {
                alert(`Opened Lockers : ${result}`)
            })
        },
        openMultipleBox () {
            openBox(this.selectedLockers, function (err, result) {
                alert(`Opened Lockers : ${result}`)
            })
            this.multipleOpen = false
        },
        queryBox () {
            const vm = this
            queryBox(function(err, result) {
                vm.lockers = result
            })
        }
    }
}
</script>


<style scoped>
.buttons button {
    height: 100px;
    width: 300px;
    font-size: 1.5em;
}

.buttons--open-multiple {
    float: right;
}

.locker {
    border: 1px solid black;
    display: inline-block;
    margin: 20px;
    padding: 10px;
    width: 220px;
    height: 200px;
    color: white;
    position: relative;
}

.locker-available {
    background-color: #58c158;
}

.locker-unavailable {
    background-color: #dc4e4e;    
}

.locker--select {
    height: 50px;
    width: 50px;
}

.locker--name {
    font-size: 1.5em;
    text-align: center;
}

.locker-status {
    font-size: 1.2em;
    text-align: center;
}

.locker-open {
    text-align: center;
    position: absolute;
    bottom: 0;

}

.locker-open-button {
    width: 200px;
    height: 50px;
    font-size: 1.2em;
}

</style>
