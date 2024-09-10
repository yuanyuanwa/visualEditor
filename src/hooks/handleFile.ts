import { ref, onMounted, onUnmounted, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus';
import { loginValid, doLogin } from '/@/api/login'
import { publicKey } from './publicKey'

import {
  rsa_setPublicKey,
  rsa_encrypt,
} from '/@/utils/rsa_ecb.js'


export function useFile() {
  //获取验证码
  let show = ref(true)
  const timeCount = ref(60)
  const dis = ref(false)
  const countDown = ref()
  let isNeedMsg = ref(false)

  const countdownFunc = () => {
    dis.value = true
    show.value = false
    countDown.value = setInterval(() => {
      setTimeout(() => {
        if (timeCount.value > 1 && timeCount.value <= 60) {
          timeCount.value--
        } else {
          show.value = true
          dis.value = false
          timeCount.value = 60
          clearInterval(countDown.value)
        }
      }, 0)
    }, 1000)
  }

  const getMsg = (timeStamp: any, type: any, isdis?: any) => {
    if (loginForm.username == '') {
      ElMessage.error('请先输入手机号');
      return
    }
    if (isdis) {
      return
    }
    let Key: any = publicKey
    rsa_setPublicKey(Key);
    let data: any = {
      account: loginForm.username,
      timeStamp: timeStamp,
      nonce: getMathRandom()
    }
    data = rsa_encrypt(JSON.stringify(data))
    loginValid({ registerKey: data }).then((res: any) => {
      if (res.status == 200 && res.data.code == 0) {
        if (type == 'pc') {
          ElMessage.success('验证码已发送至您绑定的手机，请注意查收');
        }
        countdownFunc()
      } else {
        ElMessage.error(res.data.message);
      }
    })
      .catch((err: any) => {
        ElMessage.error('请求失败');
      });

  }

  //登录
  const loginFormRef = ref<FormInstance>()
  const loginForm = reactive({
    username: '',
    password: '',
  })
  const loginFormRules = reactive<FormRules>({
    username: [
      { required: true, message: '不能为空', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '不能为空', trigger: 'blur' },
    ],
  })
  const loginSubmit = async (formEl: FormInstance | undefined, func: any, timeStamp: any, agreement: any, isShowAgreement: any, handleShake: any, changeLoading: any) => {
    if (isShowAgreement && !agreement) {
      handleShake()
      return
    }
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {

        let data: any = {}
        // let encryptor = new JSEncrypt()
        let Key: any = publicKey
        // encryptor.setPublicKey(Key)
        rsa_setPublicKey(Key);
        if (isNeedMsg.value) {
          data = {
            account: loginForm.username,
            authCard: loginForm.password,
            timeStamp: timeStamp,
            nonce: getMathRandom()
          }
        } else {
          data = {
            account: loginForm.username,
            authCard: loginForm.password,
            timeStamp: timeStamp,
            nonce: getMathRandom()
          }
        }
        data = rsa_encrypt(JSON.stringify(data))
        //调用登录的方法 
        changeLoading(true)
        doLogin({ loginKey: data }).then((res: any) => {
          if (res.status == 200 && res.data.code == 0) {
            // 调用父组件方法
            if (func()) {
              func()
            }
          } else {
            ElMessage.error(res.data.message);
          }
          changeLoading(false)
        })
          .catch((err: any) => {
            changeLoading(false)
            ElMessage.error('请求失败');
          });


      }
    })
  }


  const getMathRandom = () => {
    let result = ''
    for (var i = 0; i < 6; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result
  }
  onMounted(() => {
  });

  onUnmounted(() => {
  });
  return { show, timeCount, dis, getMsg, loginFormRef, loginForm, loginFormRules, loginSubmit, isNeedMsg }
}

