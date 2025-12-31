# AutoComplete

AutoComplete 是一个 Chrome 浏览器插件，目前有两个功能：

- 实时屏蔽所有网易系网页的横幅广告。
- 自动填充云桌面的用户名、密码和 2FA 验证码，并自动点击登录按钮。

## 使用方法

- 打开项目目录中的 `manifest.json` 文件，找到以下代码片段：

    ```json
    "host_permissions": [""],
    "content_scripts": [
        {
        "matches": [""],
        "js": ["dist/content.bundle.js"],
        "run_at": "document_end"
        }
    ],
    ```

- 修改 `host_permissions` 和 `content_scripts.matches` 的值为云桌面的 [URL](https://en.wikipedia.org/wiki/URL) 以及网易有道查词和翻译的 URL（以逗号分隔，支持通配符）。
- 打开项目目录中的 `content.js` 文件，找到以下代码片段：

    ```js
    // 设置你的 2FA secret key
    const secretKey = ''; // 替换为你的实际 secret key

    // 功能：自动填充表单
    function autoFillInputs() {
      // 自动填充用户名输入框
      const usernameInput = document.getElementById('Enter user name');
      if (usernameInput) {
        usernameInput.value = ''; // 替换为实际的用户名
        console.log('Username input filled.');
      }

      // 自动填充密码输入框
      const passwordInput = document.getElementById('passwd');
      if (passwordInput) {
        passwordInput.value = ''; // 替换为实际的密码
        console.log('Password input filled.');
      }
    }

    ...

    // 根据页面 URL 执行对应功能
    function executePageSpecificLogic() {
      const hostname = window.location.hostname;

      if (hostname.includes('')) { // 替换为云桌面的 host
        // 执行自动填充功能
        if (document.readyState === 'complete') {
          autoFillInputs();
        } else {
          window.addEventListener('load', autoFillInputs);
        }
      }
    }
    ```

- 修改以下内容为你的实际信息并保存。
    - `secretKey`：替换为你的 2FA 密钥。
    - `usernameInput.value`：替换为你的用户名。
    - `passwordInput.value`：替换为你的密码。
    - `hostname.includes('')`：单引号中填入云桌面 URL 中的 host 部分，如有疑问请参考[这里](https://github.com/yunguoran/notes/blob/master/frontend/html/HTML.md#urluniform-resource-locator%E7%AE%80%E4%BB%8B)对于 URL 中 host 部分的说明。
- 本地打包项目。
    - 确保你已经安装了 [NVM for Windows](https://github.com/coreybutler/nvm-windows) 和 [Node.js](https://nodejs.org/en)，`Node.js` 版本为 `v22.14.0`。
    - 执行 `npm install` 在本地安装以下依赖：
        - `buffer@6.0.3`。
        - `crypto-browserify@3.12.1`。
        - `otplib@12.0.1`。
        - `process@0.11.10`。
        - `safe-buffer@5.2.1`。
        - `stream-browserify@3.0.0`。
        - `vm-browserify@1.1.2`。
        - `webpack-cli@6.0.1`。
        - `webpack@5.98.0`。
    - 使用 `npx webpack` 打包项目。
- 打包完成后，生成的文件会位于 `dist` 文件夹中。

### 在 Chrome 中加载插件

- 打开 Chrome 浏览器，进入扩展程序管理页面：
    - 地址栏输入 `chrome://extensions/` 并回车。
- 打开右上角的 *Developer mode*。
- 点击 *Load unpacked*。
- 选择该项目。
- 加载完成后，插件会出现在扩展程序列表中。

## 注意

- Chrome 是跨平台的，因此该插件是平台无关的。
- 如您只想使用此插件的部分功能，那么在 `host_permissions` 和 `content_scripts.matches` 处，仅需配置你需要使用功能相关的 URL 即可，没有配置的 URL 部分代码不会生效。
- 此项目仅测试了 [Happy path](https://en.wikipedia.org/wiki/Happy_path)，如有其他疑问请自行研究。
- 使用前请仔细阅读使用说明，使用不当由此造成的任何损失与本人无关。
