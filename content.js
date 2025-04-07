console.log('Content script loaded as a module.');
import { authenticator } from 'otplib';

// 设置你的 2FA secret key
const secretKey = ''; // 替换为你的实际 secret key

function autoFillInputs() {
  // 自动填充用户名输入框
  const usernameInput = document.getElementById('Enter user name');
  if (usernameInput) {
    usernameInput.value = ''; // 替换为实际的用户名
    console.log('Username input filled.');
  } else {
    console.warn('Username input field (id="Enter user name") not found.');
  }

  // 自动填充密码输入框
  const passwordInput = document.getElementById('passwd');
  if (passwordInput) {
    passwordInput.value = ''; // 替换为实际的密码
    console.log('Password input filled.');
  } else {
    console.warn('Password input field (id="passwd") not found.');
  }

  // 自动填充 2FA 验证码到 id = passwd1 的输入框
  const passwd1Input = document.getElementById('passwd1');
  if (passwd1Input) {
    const code = authenticator.generate(secretKey);
    passwd1Input.value = code;
    console.log('2FA code input filled:', code);
  } else {
    console.warn('2FA input field (id="passwd1") not found.');
  }

  // 自动点击 id = Log_On 的按钮
  const logOnButton = document.getElementById('Log_On');
  if (logOnButton) {
    logOnButton.click();
    console.log('Log_On button clicked.');
  } else {
    console.warn('Log_On button (id="Log_On") not found.');
  }
}

// 页面加载完成后执行自动填充
if (document.readyState === 'complete') {
  autoFillInputs();
} else {
  window.addEventListener('load', autoFillInputs);
}
