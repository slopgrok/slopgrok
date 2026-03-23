# GitHub Pages Deployment Instructions

1. Go to your repository on GitHub: https://github.com/sloprot/slopbot-site
2. Click on 'Settings' > 'Pages' in the sidebar.
3. Under 'Source', select the `master` branch and set the folder to `/ (root)`.
4. Save the settings. Your site will be published at https://sloprot.github.io/slopbot-site/

- The `.nojekyll` file ensures that GitHub Pages does not process your site with Jekyll, which is important for static sites with folders starting with underscores or custom structure.
- Your `index.html` at the root will be served as the homepage.

If you want to use a custom domain, you can add a `CNAME` file with your domain name.
