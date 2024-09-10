//校验手机格式
export const validatePhone = (rule, value, callback) => {
  if (value) {
    let reg = /^1[3-9]\d{9}$/;
    if (reg.test(value) === false) {
      callback(new Error("手机格式不正确"))
    } else {
      callback();
    }
  } else {
    callback();
  }
};
//输入范围框
export const interval=(rule, value, callback,formData)=>{
  let flag = value.filter(item => item).length == 2 //判断是否都有值
  let flag2 = parseInt(value[0]) <= parseInt(value[1]) //判断最小值是否小于最大值
  if (flag && flag2) {
      return callback();
  }
  if (!flag) {
      callback(new Error('请填写取值范围'))
  } else {
      if (flag2) {
          callback()
      } else {
          return callback(new Error('最小值不能大于最大值'))
      }
  }
}


//修改密码校验
export function validatePasswordChange(rule, value, callback) {
  if (value === '' || value === undefined || value == null) {
    callback(new Error('新密码不能为空'))
  } else {
    let r1 = "(?![a-zA-Z]+$)(?![A-Z0-9]+$)";
    let r2 = "(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)";
    let r3 = "(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)";
    let r4 = "[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,32}$";
    const reg = eval("/" + r1 + r2 + r3 + r4 + "/");
    const reg2 = /(\w)*(\w)\2{2}(\w)*/g;
    const reg4 = /(\s)/;
    const reg5 = /[^\x00-\xff]/;
    if (reg4.test(value)) {
      callback(new Error('密码不能包含空格'))
    } else if (reg5.test(value)) {
      callback(new Error('不能包含中文字符'))
    } else if (value.length < 8) {
      callback(new Error('密码长度需在8位及以上'))
    } else if (((!reg.test(value)) && value !== '')) {
      callback(new Error('密码不满足任意三种组合'))
    } else if (isKeyBoardContinuousChar(value)) {
      callback(new Error('口令设置应避免3位以上（含3位）键盘排序密码'))
    } else if (reg2.test(value)) {
      callback(new Error('密码不能出现连续三个相同的字符'))
    } else {
      callback()
    }
  }
};
export function isKeyBoardContinuousChar(str) {
  var c1 = [
    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?']
  ];
  var c2 = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
  ];
  str = str.split("");
  //获取坐标位置
  var y = [];
  var x = [];
  for (let c = 0; c < str.length; c++) {
    y[c] = 0;//当做~`键处理
    x[c] = -1;
    keyBoardContinuousCharPosition1(str, c, c1, x, y)
    if (x[c] != -1) continue;
    keyBoardContinuousCharPosition2(str, c, c2, x, y)
  }

  //匹配坐标连线
  for (let c = 1; c < str.length - 1; c++) {
    if (y[c - 1] == y[c] && y[c] == y[c + 1]) {
      return keyBoardContinuousCharLineX(x, c)
    } else if (x[c - 1] == x[c] && x[c] == x[c + 1]) {
      return keyBoardContinuousCharLineY(y, c)
    }
  }
  return false;
}
function keyBoardContinuousCharPosition1(str, c, c1, x, y) {
  for (let i = 0; i < c1.length; i++) {
    for (let j = 0; j < c1[i].length; j++) {
      if (str[c] == c1[i][j]) {
        y[c] = i;
        x[c] = j;
      }
    }
  }
}
function keyBoardContinuousCharPosition2(str, c, c2, x, y) {
  for (let i = 0; i < c2.length; i++) {
    for (let j = 0; j < c2[i].length; j++) {
      if (str[c] == c2[i][j]) {
        y[c] = i;
        x[c] = j;
      }
    }
  }
}
function keyBoardContinuousCharLineX(x, c) {
  if ((x[c - 1] + 1 == x[c] && x[c] + 1 == x[c + 1]) || (x[c + 1] + 1 == x[c] && x[c] + 1 == x[c - 1])) {
    return true;
  }
}
function keyBoardContinuousCharLineY(y, c) {
  if ((y[c - 1] + 1 == y[c] && y[c] + 1 == y[c + 1]) || (y[c + 1] + 1 == y[c] && y[c] + 1 == y[c - 1])) {
    return true;
  }
}


//新旧密码不一致校验
export function validatePassword(rule, value, callback, formData) {
  if (value === "") {
    callback(new Error("请确认新密码"));
  } else if (value !== formData.password) {

    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

