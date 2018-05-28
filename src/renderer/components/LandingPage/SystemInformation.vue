<template>
  <div>
    <div class="title">Information</div>
    <div class="items">
      <div class="item">
        <div class="name">Path:</div>
        <div class="value">{{ path }}</div>
      </div>
      <div class="item">
        <div class="name">Route Name:</div>
        <div class="value">{{ name }}</div>
      </div>
      <div class="item">
        <div class="name">Vue.js:</div>
        <div class="value">{{ vue }}</div>
      </div>
      <div class="item">
        <div class="name">Electron:</div>
        <div class="value">{{ electron }}</div>
      </div>
      <div class="item">
        <div class="name">Node:</div>
        <div class="value">{{ node }}</div>
      </div>
      <div class="item">
        <div class="name">Platform:</div>
        <div class="value">{{ platform }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import fs from 'fs'
  import SerialPort from 'serialport'
  import VirtualSerialPort from  'virtual-serialport'
  export default {
    created () {
      let SP = process.env.NODE_ENV === 'DEV' ? VirtualSerialPort : SerialPort
      var sp = new SP('/dev/ttyS0', { baudrate: 57600 })

      sp.on("data", function(data) {
        console.log("Message from device: ", data)
      })

      sp.on('open', function (err) {
        sp.on("dataToDevice", function(data) {
          sp.writeToComputer(`****** ${data} *******`)
          console.log('data writtent to device : ', data)          
        })
        sp.write('The Quick Brown Fox')
        sp.drain(function (err) {
          // console.log('Drain error : ', err)
        })
      })
    },
    data () {
      return {
        electron: process.versions['atom-shell'],
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version
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
