# Deploying to Cloudflare Pages

This Next.js application is configured for deployment on Cloudflare Pages.

## Configuration Details

1. **Build Output Directory**: The application is configured to build to the `dist` directory instead of the default `.next` directory.

2. **Static Export**: The application uses Next.js's static export feature to generate static HTML/CSS/JS files.

3. **Build Command**: Use `npm run build` as your build command in Cloudflare Pages.

4. **Node.js Version**: This project requires Node.js 20.x.

## Deployment Steps

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. In the Cloudflare Pages dashboard:
   - Connect your Git repository
   - Set the build command to `npm run build`
   - Set the build output directory to `dist`
   - Set the Node.js version to 20.x

3. Deploy your site

## Troubleshooting

If you encounter any issues with the deployment:

- Check that the `output: 'export'` and `distDir: 'dist'` settings are correctly set in `next.config.js`
- Ensure that your application doesn't use any features that are incompatible with static exports
- Review the build logs for any specific errors