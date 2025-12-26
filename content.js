console.log('Content script loaded as a module.');
import { authenticator } from 'otplib';

// 设置你的 2FA secret key
const secretKey = ''; // 替换为你的实际 secret key

// 功能：自动填充表单
function autoFillInputs() {
  // 检查 sessionStorage，防止重复自动登录
  if (sessionStorage.getItem('autoLoginAttempted')) {
    console.log('Auto login already attempted in this session.');
    return;
  }
  sessionStorage.setItem('autoLoginAttempted', 'true');

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

// 功能：移除有道广告
function removeYoudaoAds() {
  // 查找广告元素的 ID 或类名
  const adBanners = document.querySelectorAll('.top-banner-outer-container, .top-banner-wrap');
  if (adBanners.length > 0) {
    adBanners.forEach((ad) => ad.remove());
    console.log('Youdao ad banner removed.');
  } else {
    console.log('No Youdao ad banner found.');
  }
}

// 功能：动态移除有道广告
function observeAndRemoveYoudaoAds() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const adBanner = document.querySelector('.top-banner-wrap');
        if (adBanner) {
          adBanner.remove();
          console.log('Youdao ad banner removed via MutationObserver.');
          break;
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// 根据页面 URL 执行对应功能
function executePageSpecificLogic() {
  const hostname = window.location.hostname;

  if (hostname.includes('')) {
    // 执行自动填充功能
    if (document.readyState === 'complete') {
      autoFillInputs();
    } else {
      window.addEventListener('load', autoFillInputs);
    }
  } else if (hostname.includes('youdao.com')) {
    // 执行移除广告功能
    if (document.readyState === 'complete') {
      removeYoudaoAds();
      observeAndRemoveYoudaoAds();
    } else {
      window.addEventListener('load', removeYoudaoAds);
      window.addEventListener('load', observeAndRemoveYoudaoAds);
    }
  }
}

// 执行页面逻辑
executePageSpecificLogic();
