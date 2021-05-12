<template>
  <App id="terminal">
    <div class="content">
      <!-- <button @click="run">连接SSH</button> -->
      <div id="xterm" class="xterm" style="height:100%;" />
    </div>
  </App>
</template>

<script lang="ts">
import {
  Component,
  Ref,
  Vue,
  InjectReactive,
  Watch
} from 'vue-property-decorator'
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
@Component({
  name: 'AppResource',
  components: {}
})
export default class extends Vue {
  @InjectReactive()
  public window

  async created () {
    console.log(this.window, 'resource.window')
  }

  private socketURI = 'ws://172.24.107.38:4001'
  private socket: any = null
  private initSocket () {
    this.socket = new WebSocket(this.socketURI)
    this.socketOnClose()
    this.socketOnOpen()
    this.socketOnError()
  }

  private term: any = null
  private initTerm () {
    const term = new Terminal({
      fontSize: 14,
      cursorBlink: true,
      theme: {
        foreground: '#33c361', // 字体
        background: '#060101', // 背景色
        cursor: 'help' // 设置光标
      }
    })
    const attachAddon = new AttachAddon(this.socket)
    const fitAddon = new FitAddon()
    term.loadAddon(attachAddon)
    term.loadAddon(fitAddon)
    term.open(document.getElementById('xterm'))
    fitAddon.fit()
    term.focus()
    this.term = term
  }

  run () {
    // console.log(this.term, 'term')
    // this.term.write('ssh root@139.198.168.110')
    this.socket.send('ssh root@139.198.168.110')
    this.term.focus()
    // this.term.onKey()
  }

  socketOnOpen () {
    this.socket.onopen = () => {
      // 链接成功后
      this.initTerm()
    }
  }

  socketOnClose () {
    this.socket.onclose = () => {
      // console.log('close socket')
    }
  }

  socketOnError () {
    this.socket.onerror = () => {
      // console.log('socket 链接失败')
    }
  }

  mounted () {
    this.$nextTick(() => {
      this.initSocket()
    })
  }

  beforeDestroy () {
    this.socket.close()
    this.term.dispose()
  }
}
</script>

<style lang="less" scoped>
#terminal {
  .content {
    overflow: hidden;
    background-color: rgb(0, 0, 0);
    padding-left: 10px;
  }
}
.xterm {
}
</style>
