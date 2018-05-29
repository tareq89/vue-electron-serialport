<template>
  <div>
    <form>
      <div>
        <label for="message">Message to device</label><br>
        <input type="text" v-model="messageToDevice">
        <input type="submit" value="submit message" @click="writeToDevice">
      </div>
    </form>
    <br>
    <div>
      <h1>Message from device</h1>
      <p v-if="messageFromDevice"><b>{{messageFromDevice}}</b></p>
      <p v-else>----</p>
    </div>

  </div>
</template>

<script>  
  import SerialPort from 'serialport'
  import VirtualSerialPort from  'virtual-serialport'
  import { setTimeout } from 'timers';
  export default {
    created () {
      let SP = process.env.NODE_ENV === 'DEV' ? VirtualSerialPort : SerialPort
      this.sp = new SP('/dev/ttyS0', { baudrate: 57600 })
      let vm = this

      this.sp.on('open', function (err) {        
      })

      if (process.env.NODE_ENV === 'DEV') {
        this.sp.on("dataToDevice", function(data) {
          vm.sp.writeToComputer(`****** ${data} *******`)
        })
      }
      
      this.sp.on("data", function(data) {
        setTimeout(() => {
          vm.messageFromDevice = data          
        }, 1000);
      })
    },
    data () {
      return {
        messageToDevice: null,
        messageFromDevice: null,
        sp: null
      }
    },
    watch: {
      messageFromDevice: function (newVal, oldVal) {
        setTimeout(() => {
          this.messageFromDevice = null
        }, 2000);
      }
    },
    methods: {
      writeToDevice () {
        this.sp.write(this.messageToDevice)
        this.sp.drain(function (err) {})
        this.messageToDevice = null
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
