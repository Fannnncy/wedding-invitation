# 发布到 GitHub Pages

本项目已包含 `.github/workflows/deploy-pages.yml`。它会在每次推送到 `main` 分支时自动构建并发布网站。

## 首次发布

1. 在 GitHub 创建一个**公开仓库**，例如 `wedding-invitation`。创建时不要初始化 README、`.gitignore` 或许可证。
2. 在本项目根目录打开终端，执行下面命令（将链接替换为你的仓库地址）：

   ```bash
   git init
   git add .
   git commit -m "Publish wedding invitation"
   git branch -M main
   git remote add origin https://github.com/你的用户名/wedding-invitation.git
   git push -u origin main
   ```

3. 打开仓库 **Settings → Pages**，在 **Build and deployment** 下把 Source 设为 **GitHub Actions**。
4. 等待仓库的 **Actions** 页面中 `Deploy wedding invitation to GitHub Pages` 显示成功。

访问地址通常为：

```text
https://你的用户名.github.io/wedding-invitation/?version=clouds
https://你的用户名.github.io/wedding-invitation/?version=plain
```

## 后续修改

修改 `app-clouds.js`、`app-plain.js` 或素材后，提交并推送到 `main` 分支即可自动发布：

```bash
git add .
git commit -m "Update invitation"
git push
```

> GitHub Pages 不会显示 CloudBase 的测试访问提示，但中国大陆网络或微信内的访问速度、稳定性可能不如国内云服务。
