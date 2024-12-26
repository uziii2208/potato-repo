# How to Reset and Update Web Content from GitHub

This guide explains how to completely clean the `/var/www/html` directory and replace its content by cloning a repository from GitHub. This ensures a fresh deployment without conflicts or cache issues.

---

## Steps to Refresh Web Content

### 1. **Remove Existing Content**
Delete all files and directories (including the `.git` directory) in `/var/www/html` by running:
```bash
sudo rm -rf /var/www/html/*
sudo rm -rf /var/www/html/.git
```

### 2. Clone the GitHub Repository
After cleaning the directory, clone the repository into /var/www/html:

```bash
sudo git clone https://github.com/uziii2208/potato-repo.git /var/www/html
```
### 3. Verify the Git Repository
Navigate to the /var/www/html directory and check the Git status:
```bash
cd /var/www/html
```

```bash
sudo git status
```

### 4. Set Correct Permissions
To ensure the web server can serve the content correctly, set the appropriate ownership and permissions:

```bash
sudo chown -R www-data:www-data /var/www/html
```

```bash
sudo chmod -R 755 /var/www/html
```

---

### Notes
Updating the Repository:
- If you make changes to your repository and want to update the server, repeat the above steps to ensure a clean deployment.

Clearing Cache:
- After deploying new content, clear your browser cache or server-side cache (NGINX, Apache, etc.) to prevent issues with outdated content.

Repository Details:

- GitHub URL: potato-repo
- Purpose: Serve web content hosted in /var/www/html.

By following this guide, you ensure a clean and conflict-free deployment of your web application.